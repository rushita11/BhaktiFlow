import { BarChart3, Home, Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
        <Home size={19} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/jaap" className={({ isActive }) => `nav-item nav-main ${isActive ? "active" : ""}`}>
        <Sparkles size={21} />
        <span>Jaap</span>
      </NavLink>
      <NavLink to="/history" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
        <BarChart3 size={19} />
        <span>History</span>
      </NavLink>
    </nav>
  );
}
