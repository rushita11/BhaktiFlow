import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { JaapProvider } from "./context/JaapContext";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <JaapProvider>
        <App />
      </JaapProvider>
    </BrowserRouter>
  </React.StrictMode>
);
