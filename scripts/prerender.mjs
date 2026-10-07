// Runs after `vite build` and the SSR build: renders the app into build/index.html
// and preloads the fonts the first paint needs, so the page arrives fully formed.
import { readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const ssrDir = `${root}build-ssr`;
const indexPath = `${root}build/index.html`;

const { render } = await import(pathToFileURL(`${ssrDir}/entry-server.mjs`).href);
const html = render();

const assets = readdirSync(`${root}build/assets`);
const preloads = [/^geist-latin-wght-normal-.*\.woff2$/, /^chess-pieces-.*\.woff2$/]
  .map((pattern) => assets.find((f) => pattern.test(f)))
  .filter(Boolean)
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
  .join("\n    ");

const template = readFileSync(indexPath, "utf8");
if (!template.includes("<!--app-html-->")) throw new Error("build/index.html is missing <!--app-html-->");

writeFileSync(
  indexPath,
  template.replace("<!--app-html-->", html).replace("</head>", `  ${preloads}\n  </head>`)
);
rmSync(ssrDir, { recursive: true, force: true });
console.log(`Prerendered build/index.html (${html.length} chars of markup).`);
