import { ArrowRight, Flame, Heart, History, Flower2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import { MANTRAS } from "../data/mantras";
import { useJaap } from "../context/JaapContext";

export default function HomePage() {
  const navigate = useNavigate();
  const { selectedMantraId, setSelectedMantraId, totals, startSession, mantra, history } = useJaap();
  const totalJaap = Object.values(totals).reduce((sum, count) => sum + count, 0);

  const handleStart = () => {
    startSession();
    navigate("/jaap");
  };

  return (
    <div className="screen home-page">
      <header className="topbar">
        <div className="brand-mark"><Flower2 size={24} /></div>
        <div className="brand-copy">
          <span>Radha Naam</span>
          <strong>Daily Bhakti</strong>
        </div>
        <button className="icon-button soft" onClick={() => navigate("/history")} aria-label="Open history">
          <History size={20} />
        </button>
      </header>

      <section className="hero-card">
        <div className="hero-glow" />
        <span className="hero-kicker"><Sparkles size={15} /> A peaceful moment for you</span>
        <h1>हर नाम में<br /><em>प्रेम का प्रकाश</em></h1>
        <p>Pause, breathe, and complete your daily Naam Jaap with mindful focus.</p>
        <div className="hero-symbol">राधे</div>
      </section>

      <section className="stats-grid">
        <article className="stat-card">
          <div className="stat-icon peach"><Heart size={18} /></div>
          <div><strong>{totalJaap.toLocaleString()}</strong><span>Total Jaap</span></div>
        </article>
        <article className="stat-card">
          <div className="stat-icon violet"><Flame size={18} /></div>
          <div><strong>{history.length}</strong><span>Sessions</span></div>
        </article>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div><span className="eyebrow">Select mantra</span><h2>Who is in your heart today?</h2></div>
        </div>
        <div className="mantra-list">
          {MANTRAS.map((item) => (
            <button
              type="button"
              key={item.id}
              className={`mantra-card ${selectedMantraId === item.id ? "selected" : ""}`}
              style={{ background: item.gradient }}
              onClick={() => setSelectedMantraId(item.id)}
            >
              <div className="mantra-letter">{item.devanagari.slice(0, 1)}</div>
              <div className="mantra-copy"><strong>{item.label}</strong><span>{item.subtitle}</span></div>
              <div className="radio-dot" />
            </button>
          ))}
        </div>
      </section>

      <section className="start-panel">
        <div><span>Selected mantra</span><strong>{mantra.devanagari} · {mantra.label}</strong></div>
        <button className="primary-button" onClick={handleStart}>Start Jaap <ArrowRight size={19} /></button>
      </section>

      <BottomNav />
    </div>
  );
}
