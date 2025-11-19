import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TeamPage from "./pages/TeamPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/team/:teamName" element={<TeamPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
