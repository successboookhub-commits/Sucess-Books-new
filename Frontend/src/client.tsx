import { hydrateRoot, createRoot } from "react-dom/client";
import { StartClient } from "@tanstack/react-start/client";
import { getRouter } from "./router";

const router = getRouter();

const rootElement = document.getElementById("root");

if (rootElement && rootElement.hasChildNodes()) {
  try {
    hydrateRoot(rootElement, <StartClient router={router} />);
  } catch (err) {
    console.warn("[Hydration Fallback] Mounting with createRoot:", err);
    createRoot(rootElement).render(<StartClient router={router} />);
  }
} else if (rootElement) {
  createRoot(rootElement).render(<StartClient router={router} />);
} else {
  try {
    hydrateRoot(document, <StartClient router={router} />);
  } catch (err) {
    console.warn("[Document Hydration Fallback]:", err);
    if (document.body) {
      createRoot(document.body).render(<StartClient router={router} />);
    }
  }
}
