import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import App from "./App";
import "./styles/site.css";

const root = document.getElementById("root")!;

// The production build ships prerendered HTML (scripts/prerender.mjs); dev serves an empty root.
if (root.hasChildNodes()) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
