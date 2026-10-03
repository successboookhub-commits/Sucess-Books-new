import { createRoot, hydrateRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";

const router = getRouter();

function mountApp() {
  const rootElement = document.getElementById("root") || document.body;
  if (!rootElement) return;

  if (rootElement.hasChildNodes() && rootElement.id === "root") {
    try {
      hydrateRoot(rootElement, <RouterProvider router={router} />);
      return;
    } catch (err) {
      console.warn("[Hydration Warning - Falling back to createRoot]:", err);
    }
  }

  createRoot(rootElement).render(<RouterProvider router={router} />);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountApp);
} else {
  mountApp();
}
