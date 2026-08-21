import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const root = process.cwd();
const port = Number.parseInt(process.env.PORT ?? "4173", 10);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation"
};

createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  const safePath = normalize(pathname).replace(/^(\.\.(\/|\\|$))+/, "");
  let target = join(root, safePath);

  if (existsSync(target) && statSync(target).isDirectory()) {
    target = join(target, "index.html");
  }

  if (!existsSync(target) || !statSync(target).isFile() || !target.startsWith(root)) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Introuvable");
    return;
  }

  response.writeHead(200, {
    "cache-control": "no-store",
    "content-type": contentTypes[extname(target)] ?? "application/octet-stream"
  });
  createReadStream(target).pipe(response);
}).listen(port, "127.0.0.1", () => {
  process.stdout.write(`Le Contradicteur : http://127.0.0.1:${port}\n`);
});
