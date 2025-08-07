import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://e2d2adb64a6c9754a4fb2c48d61c6c98@o4509802451763200.ingest.de.sentry.io/4509802456809552",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
