import { deckMeta, slides } from "../assets/deck-content.js";

const stage = document.querySelector("#deck-stage");
const previousButton = document.querySelector("[data-previous]");
const nextButton = document.querySelector("[data-next]");
const currentLabel = document.querySelector("[data-current]");
const totalLabel = document.querySelector("[data-total]");
const progressBar = document.querySelector("[data-progress-bar]");
const notesDialog = document.querySelector("[data-notes-dialog]");
let currentIndex = 0;
let touchStartX = null;

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const list = (items = [], className = "deck-list") => `<ul class="${className}">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;

function common(slide) {
  return `
    <p class="deck-slide__eyebrow">${escapeHtml(slide.eyebrow)}</p>
    <h2>${escapeHtml(slide.title)}</h2>
    <p class="deck-slide__statement">${escapeHtml(slide.statement)}</p>
  `;
}

function renderCover(slide) {
  return `
    <p class="deck-slide__eyebrow">${escapeHtml(slide.eyebrow)}</p>
    <div class="deck-cover__main">
      <h1>${escapeHtml(slide.title)}</h1>
    </div>
    <aside class="deck-cover__aside" aria-label="Principe de la méthode">
      <span>5≠1</span>
      <p>${escapeHtml(slide.kicker)}</p>
    </aside>
    <p class="deck-slide__statement">${escapeHtml(slide.statement)}</p>
  `;
}

function renderEditorial(slide) {
  return `${common(slide)}
    <div class="deck-editorial__body">
      <blockquote class="deck-callout">${escapeHtml(slide.callout)}</blockquote>
      ${list(slide.items)}
    </div>`;
}

function renderSplit(slide) {
  return `${common(slide)}
    <div class="deck-split__body">
      <section class="deck-panel"><p class="deck-panel__label">MÉTHODE</p><h3>${escapeHtml(slide.left.title)}</h3>${list(slide.left.items)}</section>
      <section class="deck-panel"><p class="deck-panel__label">RESPONSABILITÉ</p><h3>${escapeHtml(slide.right.title)}</h3>${list(slide.right.items)}</section>
    </div>
    <p class="deck-footer-line">${escapeHtml(slide.footer)}</p>`;
}

function renderFlow(slide) {
  return `${common(slide)}
    <div class="deck-flow__steps">${slide.steps.map((step) => `<div class="deck-flow-step"><strong>${escapeHtml(step.label)}</strong><span>${escapeHtml(step.detail)}</span></div>`).join("")}</div>`;
}

function renderComparison(slide) {
  return `${common(slide)}
    <div class="deck-comparison__body">
      <section class="deck-panel"><p class="deck-panel__label">${escapeHtml(slide.left.label)}</p><h3>${escapeHtml(slide.left.title)}</h3><p>${escapeHtml(slide.left.detail)}</p></section>
      <section class="deck-panel"><p class="deck-panel__label">${escapeHtml(slide.right.label)}</p><h3>${escapeHtml(slide.right.title)}</h3><p>${escapeHtml(slide.right.detail)}</p></section>
    </div>
    <p class="deck-footer-line">${escapeHtml(slide.footer)}</p>`;
}

function renderPersonas(slide) {
  return `${common(slide)}
    <div class="deck-personas__list">${slide.personas.map((persona) => `
      <div class="deck-persona">
        <span class="deck-persona__id">${escapeHtml(persona.id)}</span>
        <span class="deck-persona__name">${escapeHtml(persona.name)}</span>
        <span class="deck-persona__question">« ${escapeHtml(persona.question)} »</span>
      </div>`).join("")}
    </div>`;
}

function renderLedger(slide) {
  return `${common(slide)}
    <div class="deck-ledger__body">
      <section class="deck-panel"><p class="deck-panel__label">CE QUE LE CONTRÔLE DEVRA ÉTABLIR</p>${list(slide.established)}</section>
      <section class="deck-panel"><p class="deck-panel__label">CE QU’IL NE POURRA PAS ÉTABLIR</p>${list(slide.notEstablished)}</section>
    </div>`;
}

function renderBoundary(slide) {
  return `${common(slide)}
    <div class="deck-boundary__path">${slide.path.map((step) => `
      <section class="deck-boundary-step">
        <span class="deck-boundary-step__state">${escapeHtml(step.state)}</span>
        <h3>${escapeHtml(step.label)}</h3>
        <p>${escapeHtml(step.detail)}</p>
      </section>`).join("")}
    </div>
    <p class="deck-footer-line">${escapeHtml(slide.footer)}</p>`;
}

function renderClosing(slide) {
  return `${common(slide)}
    <div class="deck-closing__body">
      ${list(slide.asks)}
      <p class="deck-kicker">${escapeHtml(slide.kicker)}</p>
    </div>`;
}

const renderers = {
  cover: renderCover,
  editorial: renderEditorial,
  split: renderSplit,
  flow: renderFlow,
  comparison: renderComparison,
  personas: renderPersonas,
  ledger: renderLedger,
  boundary: renderBoundary,
  closing: renderClosing
};

function renderDeck() {
  document.title = `Deck — ${deckMeta.title}`;
  totalLabel.textContent = String(slides.length).padStart(2, "0");
  slides.forEach((slide, index) => {
    const article = document.createElement("article");
    article.id = slide.id;
    article.className = `deck-slide deck-${slide.layout}${index === 0 ? " is-active" : ""}`;
    article.dataset.number = slide.number;
    article.dataset.slideIndex = String(index);
    article.setAttribute("aria-label", `Diapositive ${index + 1} sur ${slides.length} : ${slide.title}`);
    article.setAttribute("aria-hidden", index === 0 ? "false" : "true");
    article.innerHTML = (renderers[slide.layout] || renderEditorial)(slide);
    stage.append(article);
  });

  const initialId = location.hash.slice(1);
  const initialIndex = slides.findIndex((slide) => slide.id === initialId);
  goTo(initialIndex >= 0 ? initialIndex : 0, false);
}

function goTo(index, updateHash = true) {
  currentIndex = Math.max(0, Math.min(slides.length - 1, index));
  document.querySelectorAll(".deck-slide").forEach((element, elementIndex) => {
    const active = elementIndex === currentIndex;
    element.classList.toggle("is-active", active);
    element.setAttribute("aria-hidden", active ? "false" : "true");
  });
  currentLabel.textContent = String(currentIndex + 1).padStart(2, "0");
  progressBar.style.width = `${((currentIndex + 1) / slides.length) * 100}%`;
  previousButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === slides.length - 1;
  if (updateHash) history.replaceState(null, "", `#${slides[currentIndex].id}`);
}

function showNotes() {
  const slide = slides[currentIndex];
  document.querySelector("[data-notes-number]").textContent = slide.number;
  document.querySelector("[data-notes-body]").textContent = slide.notes;
  const sourceList = document.querySelector("[data-notes-sources]");
  sourceList.replaceChildren();
  slide.sources.forEach((source) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = `../${source}`;
    link.textContent = source;
    item.append(link);
    sourceList.append(item);
  });
  notesDialog.showModal();
}

previousButton.addEventListener("click", () => goTo(currentIndex - 1));
nextButton.addEventListener("click", () => goTo(currentIndex + 1));
document.querySelector("[data-notes]").addEventListener("click", showNotes);
document.querySelector("[data-close-notes]").addEventListener("click", () => notesDialog.close());
notesDialog.addEventListener("click", (event) => {
  if (event.target === notesDialog) notesDialog.close();
});
document.querySelector("[data-fullscreen]").addEventListener("click", async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch {
    document.documentElement.dataset.fullscreenUnavailable = "true";
  }
});

document.addEventListener("keydown", (event) => {
  if (notesDialog.open) return;
  const interactive = event.target.closest?.("button, a, input, textarea, select");
  if (interactive && event.key === " ") return;
  if (["ArrowRight", "PageDown", " "].includes(event.key)) {
    event.preventDefault();
    goTo(currentIndex + 1);
  }
  if (["ArrowLeft", "PageUp"].includes(event.key)) {
    event.preventDefault();
    goTo(currentIndex - 1);
  }
  if (event.key === "Home") {
    event.preventDefault();
    goTo(0);
  }
  if (event.key === "End") {
    event.preventDefault();
    goTo(slides.length - 1);
  }
});

stage.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0]?.clientX ?? null;
}, { passive: true });

stage.addEventListener("touchend", (event) => {
  if (touchStartX === null) return;
  const delta = (event.changedTouches[0]?.clientX ?? touchStartX) - touchStartX;
  if (Math.abs(delta) > 50) goTo(currentIndex + (delta < 0 ? 1 : -1));
  touchStartX = null;
}, { passive: true });

renderDeck();
