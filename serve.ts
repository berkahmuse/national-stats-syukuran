// A tiny static server for app/ (Node 22, standard library only), so the
// site can be run locally without a build step: `node serve.ts` serves app/
// on http://localhost:8083 (`--port <n>` for another port). Development
// convenience only — not a web server for the internet.

import { createReadStream, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("./app", import.meta.url)));
const port = Number(process.argv.includes("--port")
  ? process.argv[process.argv.indexOf("--port") + 1]
  : 8083);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
};

const server = createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const file = resolve(join(root, normalize(path).replace(/^(\.\.[/\\])+/, "")));
  if (!file.startsWith(root + sep) && file !== root) {
    res.writeHead(403); res.end("Forbidden"); return;
  }
  let target = file;
  try {
    if (statSync(target).isDirectory()) target = join(target, "index.html");
    const stream = createReadStream(target);
    res.writeHead(200, { "Content-Type": MIME[extname(target)] || "application/octet-stream" });
    stream.pipe(res);
  } catch {
    res.writeHead(404); res.end("Not found");
  }
});

server.listen(port, () => {
  console.log(`BharatNumbers at http://localhost:${port}`);
});
