import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "leaflet/dist/leaflet.css";
import "@/styles/globals.css";
import { applyTranslations } from "@/i18n/applyTranslations";
import App from "@/app";

applyTranslations();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
