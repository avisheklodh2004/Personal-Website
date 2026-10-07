import { renderToString } from "react-dom/server";
import App from "./App";

/** Renders the page to HTML at build time so crawlers get the content without running JS. */
export function render() {
  return renderToString(<App />);
}
