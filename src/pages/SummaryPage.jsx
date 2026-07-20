import { CheckCircle2, Clock3, Flower2, Home, RotateCcw, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useJaap } from "../context/JaapContext";

const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
};

export default function SummaryPage() {
  const navigate = useNavigate();
  const { session, mantra, malaCount, startSession } = useJaap();

  const restart = () => {
    startSession();
    navigate("/jaap");
  };

  return (
    <div className="screen summary-page">
      <section className="summary-hero">
        <div className="success-orbit"><CheckCircle2 size={44} /></div>
        <span className="eyebrow light">Session complete</span>
        <h1>Beautifully done.</h1>
        <p>Every repetition is a quiet step toward peace and devotion.</p>
      </section>

      <section className="summary-main-card">
        <div className="summary-mantra"><span>{mantra.devanagari}</span><div><small>Your mantra</small><strong>{mantra.label}</strong></div></div>
        <div className="summary-stats-grid">
          <article><Sparkles size={22} /><strong>{session.count}</strong><span>Total Jaap</span></article>
          <article><Flower2 size={22} /><strong>{malaCount}</strong><span>Full Mala</span></article>
          <article><Clock3 size={22} /><strong>{formatTime(session.seconds)}</strong><span>Session Time</span></article>
        </div>
        <div className="blessing-box"><span>“</span><p>जहाँ प्रेम है, वहीं राधा हैं।</p><small>Carry this calm with you today.</small></div>
      </section>

      <div className="summary-actions">
        <button className="primary-button" onClick={restart}><RotateCcw size={19} /> Start Again</button>
        <button className="secondary-button full" onClick={() => navigate("/")}><Home size={19} /> Back to Home</button>
      </div>
    </div>
  );
}
