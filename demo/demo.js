import { mountStoryboards } from "../assets/storyboard.js";

const previewUrl = new URL("../data/ui-preview.json", import.meta.url);

function text(selector, value) {
  const element = document.querySelector(selector);
  if (element && typeof value === "string") element.textContent = value;
}

function renderList(selector, values) {
  const list = document.querySelector(selector);
  if (!list || !Array.isArray(values)) return;
  list.replaceChildren();
  values.forEach((value) => {
    const item = document.createElement("li");
    item.textContent = value;
    list.append(item);
  });
}

function renderRuptures(ruptures) {
  const root = document.querySelector("[data-demo-ruptures]");
  if (!root || !Array.isArray(ruptures)) return;
  root.replaceChildren();
  ruptures.forEach((rupture) => {
    const item = document.createElement("div");
    item.className = "rupture-item";
    const fact = document.createElement("p");
    fact.textContent = rupture.fact;
    const meta = document.createElement("small");
    meta.textContent = `${rupture.owner} · ${rupture.lift}`;
    item.append(fact, meta);
    root.append(item);
  });
}

function renderPreview(data) {
  if (data?.kind !== "ui_preview" || data?.evaluationStatus !== "NON_EVALUABLE" || data?.aiCalls !== 0) return;
  text("[data-demo-verdict]", data.targetReport.verdict);
  text("[data-demo-instruction]", data.targetReport.instruction);
  text("[data-demo-convergence]", data.targetReport.convergence);
  text("[data-demo-not-instructed]", data.targetReport.notInstructed);
  text("[data-demo-provenance]", data.targetReport.provenance);
  renderRuptures(data.targetReport.ruptures);
  renderList("[data-demo-questions]", data.targetReport.questions);
  renderList("[data-demo-missing]", data.targetReport.missing);
  renderList("[data-demo-resists]", data.targetReport.resists);
}

mountStoryboards();

fetch(previewUrl)
  .then((response) => {
    if (!response.ok) throw new Error(`Aperçu indisponible (${response.status})`);
    return response.json();
  })
  .then(renderPreview)
  .catch(() => {
    document.documentElement.dataset.previewFallback = "true";
  });
