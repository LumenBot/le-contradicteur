const previewUrl = new URL("../data/ui-preview.json", import.meta.url);
const projector = document.querySelector(".projector");
const replayButton = document.querySelector("[data-replay]");
const state = document.querySelector("[data-replay-state]");
const live = document.querySelector("[data-live]");
const progressSegments = [...document.querySelectorAll("[data-progress] span")];
const dialog = document.querySelector("[data-opinions-dialog]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let replayTimers = [];
let previewData = null;

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
  previewData = data;
  text("[data-demo-prompt]", `« ${data.baseline.prompt} »`);
  text("[data-demo-verdict]", data.targetReport.verdict);
  text("[data-demo-instruction]", data.targetReport.instruction);
  text("[data-demo-convergence]", data.targetReport.convergence);
  text("[data-demo-not-instructed]", data.targetReport.notInstructed);
  renderRuptures(data.targetReport.ruptures);
  renderList("[data-demo-questions]", data.targetReport.questions);
  renderList("[data-demo-missing]", data.targetReport.missing);
  renderList("[data-demo-resists]", data.targetReport.resists);
}

function clearReplay() {
  replayTimers.forEach(window.clearTimeout);
  replayTimers = [];
  projector.classList.remove("is-running", "is-complete");
  progressSegments.forEach((segment) => segment.classList.remove("is-active"));
}

function setStage(index, label) {
  progressSegments.forEach((segment, segmentIndex) => segment.classList.toggle("is-active", segmentIndex <= index));
  state.textContent = label;
  live.textContent = label;
}

function startReplay() {
  clearReplay();
  projector.classList.add("is-running");
  replayButton.disabled = true;
  replayButton.textContent = "Rejeu en cours";

  const stages = [
    "PROMPT B0 FIGÉ",
    "5 EMPLACEMENTS D’AVIS",
    "GABARIT SANDBOX-17",
    "FORMAT CIBLE AFFICHÉ"
  ];
  const interval = reducedMotion.matches ? 0 : 520;

  stages.forEach((label, index) => {
    const timer = window.setTimeout(() => setStage(index, label), interval * index);
    replayTimers.push(timer);
  });

  const completeTimer = window.setTimeout(() => {
    projector.classList.remove("is-running");
    projector.classList.add("is-complete");
    replayButton.disabled = false;
    replayButton.textContent = "Rejouer le format";
    live.textContent = "Format cible simulé affiché. Aucun appel IA n’a été effectué.";
  }, interval * stages.length + (reducedMotion.matches ? 0 : 180));
  replayTimers.push(completeTimer);
}

replayButton?.addEventListener("click", startReplay);
document.querySelector("[data-open-opinions]")?.addEventListener("click", () => dialog?.showModal());
document.querySelector("[data-close-opinions]")?.addEventListener("click", () => dialog?.close());
dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

fetch(previewUrl)
  .then((response) => {
    if (!response.ok) throw new Error(`Aperçu indisponible (${response.status})`);
    return response.json();
  })
  .then(renderPreview)
  .catch(() => {
    state.textContent = "APERÇU LOCAL INDISPONIBLE";
  });

if (!previewData) projector.dataset.previewState = "loading";
