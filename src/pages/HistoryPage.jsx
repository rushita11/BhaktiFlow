import { ArrowLeft, CalendarDays, Clock3, Flower2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import { useJaap } from "../context/JaapContext";
import { getMantra } from "../data/mantras";

const formatDate = (timestamp) => new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(timestamp);

export default function HistoryPage() {
  const navigate = useNavigate();
  const { history, MALA_SIZE } = useJaap();

  return (
    <div className="screen history-page">
      <header className="page-header">
        <button className="icon-button soft" onClick={() => navigate(-1)}><ArrowLeft size={20} /></button>
        <div><span className="eyebrow">Your journey</span><h1>Session History</h1></div>
      </header>

      {history.length === 0 ? (
        <section className="empty-state"><div>🌸</div><h2>No sessions yet</h2><p>Complete your first Naam Jaap session and it will appear here.</p><button className="primary-button compact" onClick={() => navigate("/")}>Begin Jaap</button></section>
      ) : (
        <div className="history-list">
          {history.map((item, index) => {
            const mantra = getMantra(item.mantraId);
            return (
              <article className="history-card" key={`${item.completedAt}-${index}`}>
                <div className="history-symbol">{mantra.devanagari.slice(0, 1)}</div>
                <div className="history-content"><strong>{mantra.label} Naam Jaap</strong><span><CalendarDays size={14} /> {formatDate(item.completedAt)}</span></div>
                <div className="history-numbers"><strong>{item.count}</strong><span><Flower2 size={13} /> {Math.floor(item.count / MALA_SIZE)} mala</span><span><Clock3 size={13} /> {Math.floor(item.seconds / 60)}m</span></div>
              </article>
            );
          })}
        </div>
      )}
      <BottomNav />
    </div>
  );
}
