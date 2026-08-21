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
assert.doesNotMatch(serializedPreview, /Sandbox-17/i, "La preview ne doit pas suggérer une provenance depuis la sandbox numérotée.");

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
const demoLogic = await readFile(join(root, "demo", "demo.js"), "utf8");
const storyboard = await readFile(join(root, "assets", "storyboard.js"), "utf8");
const landing = await readFile(join(root, "index.html"), "utf8");
assert.match(landing, /data-storyboard-mount/, "Le storyboard partagé doit ouvrir la landing page.");
assert.match(demo, /data-storyboard-mount/, "Le storyboard partagé doit ouvrir la démo.");
for (const label of [
  "ILLUSTRATION DE MÉTHODE · PAS UN RUN · AUCUN APPEL IA",
  "SANDBOX",
  "AUCUN APPEL IA",
  "pas avis d’admission"
]) {
  assert.ok(demo.includes(label), `Le badge obligatoire « ${label} » manque dans la démo.`);
}

assert.match(demo, /Cas d’école — gabarit de spécification/, "Le cas d'école doit être nommé sans fausse provenance sandbox.");
assert.doesNotMatch(`${demo}\n${demoLogic}\n${storyboard}`, /replay-progress|Rejeu en cours|SORTIE RÉELLE À CAPTURER|data-open-opinions/i, "La démo ne doit plus emprunter la grammaire d'une exécution ni montrer des cadres vides.");
assert.doesNotMatch(`${landing}\n${demo}`, /PROMPT B0 FIGÉ|data-baseline|placeholder-output|projector-baseline/i, "Le panneau de baseline vide doit rester masqué jusqu'à sa capture réelle.");
assert.match(storyboard, /aria-expanded="false"[^>]+aria-controls=/, "La révélation de l'ancre doit être un contrôle clavier et tactile explicite.");
assert.match(storyboard, /initialize\(root\.querySelector\("\.storyboard"\)\)/, "Les états du storyboard doivent être appliqués au composant visible.");
assert.match(storyboard, /event\.key !== "Enter" && event\.key !== " "/, "Le contrôle d'ancre doit répondre explicitement au clavier.");
assert.doesNotMatch(storyboard, /data-story-card=[^>]+tabindex=/, "Une carte invisible et non interactive ne doit pas entrer dans l'ordre de tabulation.");
assert.ok((storyboard.match(/storyboard__card-status/g) ?? []).length >= 3, "Les unités capturables du storyboard doivent porter leur propre statut.");
assert.doesNotMatch(`${landing}\n${demo}\n${storyboard}`, /\brésultats?\b/i, "L'illustration éditoriale ne doit pas être présentée comme un résultat.");
assert.doesNotMatch(`${landing}\n${demo}`, /n[’']en tirent pas la même conclusion/i, "L'illustration montre des questions divergentes, pas des conclusions opposées observées.");
assert.match(demo, /Le format prévoit explicitement <strong>NON INSTRUIT<\/strong>/, "La démo doit présenter NON INSTRUIT comme une possibilité du format, pas comme un résultat observé.");

process.stdout.write(`Smoke tests OK — ${files.length} ressources statiques contrôlées.\n`);
