import { Outlet } from "react-router-dom";

export default function AppShell() {
  return (
    <main className="app-background">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <section className="app-frame" aria-label="Radha Naam Jaap application">
        <Outlet />
      </section>
    </main>
  );
}
