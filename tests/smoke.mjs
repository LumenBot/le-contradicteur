import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const root = process.cwd();

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if ([".git", "node_modules", "spec"].includes(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }

  return files;
}

const previewPath = join(root, "data", "ui-preview.json");
const preview = JSON.parse(await readFile(previewPath, "utf8"));
const serializedPreview = JSON.stringify(preview);

assert.equal(preview.kind, "ui_preview", "Le contenu de maquette doit être typé ui_preview.");
assert.equal(preview.evaluationStatus, "NON_EVALUABLE", "La maquette ne doit pas devenir un run évaluable.");
assert.equal(preview.aiCalls, 0, "La maquette doit déclarer zéro appel IA.");
assert.equal(preview.baseline?.status, "AWAITING_CAPTURE", "La baseline doit rester à capturer.");
assert.doesNotMatch(serializedPreview, /\bD0[123]\b/, "Les identifiants expérimentaux sont interdits dans la preview.");
assert.doesNotMatch(serializedPreview, /request[_-]?id|latenc|manifest/i, "La preview ne doit pas fabriquer de trace d'exécution.");

const files = (await walk(root)).filter((path) => [".css", ".html", ".js", ".json"].includes(extname(path)));
const forbiddenInput = /<\s*(input|textarea)\b|contenteditable\s*=|type\s*=\s*["']file["']/i;
const remoteResource = /(?:src|poster)\s*=\s*["']https?:\/\/|url\(\s*["']?https?:\/\//i;

for (const path of files) {
  const content = await readFile(path, "utf8");
  const label = relative(root, path);
  assert.doesNotMatch(content, forbiddenInput, `${label} expose une surface d'ingestion interdite.`);
  assert.doesNotMatch(content, remoteResource, `${label} charge une ressource distante.`);
}

const demo = await readFile(join(root, "demo", "index.html"), "utf8");
for (const label of [
  "MAQUETTE SIMULÉE",
  "SANDBOX",
  "AUCUN APPEL IA",
  "pas avis d’admission"
]) {
  assert.ok(demo.includes(label), `Le badge obligatoire « ${label} » manque dans la démo.`);
}

process.stdout.write(`Smoke tests OK — ${files.length} ressources statiques contrôlées.\n`);
