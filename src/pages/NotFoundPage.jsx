import { useNavigate } from "react-router-dom";
export default function NotFoundPage() {
  const navigate = useNavigate();
  return <div className="screen empty-state"><div>🪷</div><h1>Page not found</h1><p>The page you opened does not exist.</p><button className="primary-button compact" onClick={() => navigate("/")}>Go Home</button></div>;
}
