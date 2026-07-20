import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell";
import HomePage from "./pages/HomePage";
import JaapPage from "./pages/JaapPage";
import SummaryPage from "./pages/SummaryPage";
import HistoryPage from "./pages/HistoryPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="jaap" element={<JaapPage />} />
        <Route path="summary" element={<SummaryPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
