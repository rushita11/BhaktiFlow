import { ArrowLeft, Image, RotateCcw, Settings2, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import WallpaperPicker from "../components/WallpaperPicker";
import { useJaap } from "../context/JaapContext";

const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((item) => String(item).padStart(2, "0")).join(":");
};

export default function JaapPage() {
  const navigate = useNavigate();
  const {
    mantra, session, malaCount, currentMalaCount, progress, incrementJaap, tickTimer,
    resetSession, finishSession, isMuted, setIsMuted, selectedWallpaper, audioRef
  } = useJaap();
  const [showExit, setShowExit] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [showWallpaper, setShowWallpaper] = useState(false);
  const [floatingWords, setFloatingWords] = useState([]);
  const previousMala = useRef(0);
  const [malaCelebration, setMalaCelebration] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(tickTimer, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (malaCount > previousMala.current) {
      setMalaCelebration(true);
      const timeout = window.setTimeout(() => setMalaCelebration(false), 1200);
      previousMala.current = malaCount;
      return () => window.clearTimeout(timeout);
    }
    previousMala.current = malaCount;
  }, [malaCount]);

  useEffect(() => {
    const handleKey = (event) => {
      if ((event.code === "Space" || event.code === "Enter") && !showExit && !showReset && !showWallpaper) {
        event.preventDefault();
        handleCount();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const handleCount = () => {
    incrementJaap();
    const id = crypto.randomUUID();
    setFloatingWords((items) => [...items, { id, left: 15 + Math.random() * 70 }]);
    window.setTimeout(() => setFloatingWords((items) => items.filter((item) => item.id !== id)), 1700);
    navigator.vibrate?.(18);
  };

  const confirmExit = () => {
    finishSession();
    navigate("/summary");
  };

  return (
    <div
      className={`screen jaap-page ${selectedWallpaper ? "has-wallpaper" : ""}`}
      style={selectedWallpaper ? { backgroundImage: `linear-gradient(rgba(32, 14, 7, .42), rgba(32, 14, 7, .62)), url(${selectedWallpaper})` } : undefined}
    >
      <audio ref={audioRef} src={mantra.audio} preload="auto" />

      <header className="jaap-header">
        <button className="icon-button glass" onClick={() => setShowExit(true)} aria-label="End session"><ArrowLeft size={20} /></button>
        <div className="session-meta"><span>Session time</span><strong>{formatTime(session.seconds)}</strong></div>
        <button className="icon-button glass" onClick={() => setShowWallpaper(true)} aria-label="Choose wallpaper"><Image size={20} /></button>
      </header>

      <div className="chanting-pill"><span>Chanting</span><strong>{mantra.devanagari} {mantra.label}</strong></div>

      <section className="counter-stage" onClick={handleCount} role="button" tabIndex="0" aria-label="Tap to add one jaap">
        {floatingWords.map((item) => (
          <span className="floating-mantra" style={{ left: `${item.left}%` }} key={item.id}>{mantra.devanagari}</span>
        ))}
        <div className="counter-aura aura-one" />
        <div className="counter-aura aura-two" />
        <div className="progress-ring" style={{ "--progress": `${progress * 3.6}deg` }}>
          <div className="counter-core">
            <span className="counter-label">Total Jaap</span>
            <strong>{session.count}</strong>
            <small>Tap anywhere</small>
          </div>
        </div>
        <div className="mala-status">
          <span>Mala {malaCount + 1}</span>
          <strong>{currentMalaCount} / 108</strong>
        </div>
      </section>

      <div className="jaap-actions">
        <button className="action-button" onClick={(event) => { event.stopPropagation(); setIsMuted(!isMuted); }}>
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}<span>{isMuted ? "Sound off" : "Sound on"}</span>
        </button>
        <button className="action-button main-action" onClick={(event) => { event.stopPropagation(); handleCount(); }}>
          <span className="tap-lotus">✦</span><strong>JAAP</strong>
        </button>
        <button className="action-button" onClick={(event) => { event.stopPropagation(); setShowReset(true); }}>
          <RotateCcw size={20} /><span>Reset</span>
        </button>
      </div>

      <div className="jaap-tip"><Settings2 size={15} /> Tip: You can also press Space or Enter.</div>

      {malaCelebration && <div className="celebration-card"><span>🌸</span><strong>{malaCount} Mala Completed</strong><small>Radhe Radhe 🙏</small></div>}

      <Modal
        open={showExit}
        title="End this session?"
        onClose={() => setShowExit(false)}
        footer={<><button className="secondary-button" onClick={() => setShowExit(false)}>Continue Jaap</button><button className="primary-button compact" onClick={confirmExit}>View Summary</button></>}
      >
        <p>Your current progress will be saved in your session history.</p>
        <div className="confirm-stats"><span><small>Jaap</small><strong>{session.count}</strong></span><span><small>Mala</small><strong>{malaCount}</strong></span><span><small>Time</small><strong>{formatTime(session.seconds)}</strong></span></div>
      </Modal>

      <Modal
        open={showReset}
        title="Reset current count?"
        onClose={() => setShowReset(false)}
        footer={<><button className="secondary-button" onClick={() => setShowReset(false)}>Cancel</button><button className="danger-button" onClick={() => { resetSession(); setShowReset(false); }}>Reset</button></>}
      >
        <p>This resets only the current session count and timer. Your previous total remains saved.</p>
      </Modal>

      <WallpaperPicker open={showWallpaper} onClose={() => setShowWallpaper(false)} />
    </div>
  );
}
