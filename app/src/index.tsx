import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Editor from "./Editor";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/editor" element={<Editor />} />
    </Routes>
  </BrowserRouter>
);
