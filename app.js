const previewUrl = new URL("./data/ui-preview.json", import.meta.url);

function text(element, value) {
  if (element && typeof value === "string") element.textContent = value;
}

function renderLabels(labels) {
  const row = document.querySelector("[data-preview-labels]");
  if (!row || !Array.isArray(labels)) return;
  row.replaceChildren();
  labels.slice(0, 3).forEach((label, index) => {
    const chip = document.createElement("span");
    chip.className = `status-chip${index === 0 ? " status-chip--rupture" : index === 1 ? " status-chip--instruction" : ""}`;
    chip.textContent = label;
    row.append(chip);
  });
}

function renderQuestions(list, questions) {
  if (!list || !Array.isArray(questions)) return;
  list.replaceChildren();
  questions.slice(0, 3).forEach((question) => {
    const item = document.createElement("li");
    item.textContent = question;
    list.append(item);
  });
}

function renderPreview(data) {
  if (data?.kind !== "ui_preview" || data?.evaluationStatus !== "NON_EVALUABLE") return;

  renderLabels(data.labels);
  text(document.querySelector("[data-baseline-prompt]"), `« ${data.baseline.prompt} »`);
  text(document.querySelector("[data-target-status]"), data.targetReport.displayStatus);
  text(document.querySelector("[data-target-verdict]"), data.targetReport.verdict);
  text(document.querySelector("[data-target-instruction]"), data.targetReport.instruction);
  text(document.querySelector("[data-preview-provenance]"), data.targetReport.provenance);

  const rupture = data.targetReport.ruptures?.[0];
  const ruptureRoot = document.querySelector("[data-target-rupture]");
  if (ruptureRoot && rupture) {
    ruptureRoot.replaceChildren(document.createTextNode(rupture.fact));
    const meta = document.createElement("small");
    meta.textContent = `${rupture.owner} · ${rupture.lift}`;
    ruptureRoot.append(meta);
  }
  renderQuestions(document.querySelector("[data-target-questions]"), data.targetReport.questions);
}

fetch(previewUrl)
  .then((response) => {
    if (!response.ok) throw new Error(`Aperçu indisponible (${response.status})`);
    return response.json();
  })
  .then(renderPreview)
  .catch(() => {
    document.documentElement.dataset.previewFallback = "true";
  });
