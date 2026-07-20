import { createContext, useContext, useMemo, useRef, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { getMantra } from "../data/mantras";

const JaapContext = createContext(null);
const MALA_SIZE = 108;

const emptySession = {
  count: 0,
  seconds: 0,
  startedAt: null,
  completedAt: null,
  mantraId: "radha"
};

export function JaapProvider({ children }) {
  const [selectedMantraId, setSelectedMantraId] = useLocalStorage("selectedMantraId", "radha");
  const [totals, setTotals] = useLocalStorage("jaapTotals", {});
  const [history, setHistory] = useLocalStorage("jaapHistory", []);
  const [wallpapers, setWallpapers] = useLocalStorage("jaapWallpapers", {});
  const [session, setSession] = useState({ ...emptySession, mantraId: selectedMantraId });
  const [isMuted, setIsMuted] = useLocalStorage("jaapMuted", false);
  const audioRef = useRef(null);

  const mantra = getMantra(selectedMantraId);
  const malaCount = Math.floor(session.count / MALA_SIZE);
  const currentMalaCount = session.count % MALA_SIZE;
  const progress = (currentMalaCount / MALA_SIZE) * 100;

  const startSession = () => {
    setSession({
      ...emptySession,
      mantraId: selectedMantraId,
      startedAt: Date.now()
    });
  };

  const incrementJaap = () => {
    setSession((previous) => ({ ...previous, count: previous.count + 1 }));
    setTotals((previous) => ({
      ...previous,
      [selectedMantraId]: (previous[selectedMantraId] || 0) + 1
    }));

    const audio = audioRef.current;
    if (audio && !isMuted) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  };

  const tickTimer = () => setSession((previous) => ({ ...previous, seconds: previous.seconds + 1 }));

  const resetSession = () => {
    setSession((previous) => ({ ...previous, count: 0, seconds: 0, startedAt: Date.now() }));
  };

  const finishSession = () => {
    const finished = { ...session, completedAt: Date.now() };
    if (finished.count > 0) {
      setHistory((previous) => [finished, ...previous].slice(0, 50));
    }
    setSession(finished);
  };

  const selectedWallpaper = wallpapers[selectedMantraId] || null;
  const setWallpaper = (src) => setWallpapers((previous) => ({ ...previous, [selectedMantraId]: src }));

  const value = useMemo(
    () => ({
      MALA_SIZE,
      mantra,
      selectedMantraId,
      setSelectedMantraId,
      totals,
      history,
      session,
      malaCount,
      currentMalaCount,
      progress,
      startSession,
      incrementJaap,
      tickTimer,
      resetSession,
      finishSession,
      isMuted,
      setIsMuted,
      selectedWallpaper,
      setWallpaper,
      audioRef
    }),
    [mantra, selectedMantraId, totals, history, session, malaCount, currentMalaCount, progress, isMuted, selectedWallpaper]
  );

  return <JaapContext.Provider value={value}>{children}</JaapContext.Provider>;
}

export const useJaap = () => {
  const context = useContext(JaapContext);
  if (!context) throw new Error("useJaap must be used inside JaapProvider");
  return context;
};
