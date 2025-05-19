import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/tailwind.css";
import App from "./App";

if (process.env.NODE_ENV === "development") {
  const errorHandler = (event) => {
    if (event.type === "error") {
      console.error("Runtime Error:", event.error);
    }
    if (event.type === "unhandledrejection") {
      console.error("Unhandled Promise Rejection:", event.reason);
    }
  };

  window.addEventListener("error", errorHandler);
  window.addEventListener("unhandledrejection", errorHandler);
}

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);