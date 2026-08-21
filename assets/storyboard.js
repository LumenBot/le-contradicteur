export const illustration = {
  status: "ILLUSTRATION DE MÉTHODE · PAS UN RUN · AUCUN APPEL IA",
  fact: "Nous avons signé une lettre d’intention avec un acteur national de la distribution.",
  readings: [
    {
      id: "A2",
      name: "L’Acheteur",
      horizon: "Horizon · 6 mois",
      text: "Une lettre d’intention n’est pas un euro. Qui signe la première facture, et à quelle date ?"
    },
    {
      id: "A3",
      name: "Le Déjà-Vu",
      horizon: "Horizon · 18 mois",
      text: "Un acteur national qui signe une lettre d’intention s’achète une option. Qu’est-ce qui l’empêche de le construire en interne ?"
    },
    {
      id: "A1",
      name: "L’Interchangeable",
      horizon: "Horizon · maintenant",
      text: "Qui a obtenu cette lettre ? Si c’est une relation personnelle, elle part avec la personne."
    }
  ],
  question: "Cette lettre d’intention, elle vous engage à quoi, et elle les engage à quoi ?",
  instruction: "NON INSTRUIT",
  explanation: "Aucune des trois lectures ne peut conclure avec ce seul fait.",
  provenance: "Trois lectures éditoriales écrites à la main pour illustrer la méthode."
};

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

function template(content, instanceId) {
  return `
    <section class="storyboard" aria-label="Illustration éditoriale de trois lectures d’un même fait">
      <div class="storyboard__status">${escapeHtml(content.status)}</div>
      <div class="storyboard__stage">
        <p class="storyboard__cue">UN SEUL FAIT</p>
        <button class="storyboard__fact" type="button" data-story-anchor aria-expanded="false" aria-controls="${instanceId}" aria-label="Révéler le lien entre le fait et les trois lectures">
          <span class="storyboard__card-status">${escapeHtml(content.status)}</span>
          <q>${escapeHtml(content.fact)}</q>
          <span class="storyboard__fact-note">Phrase éditoriale · cliquez pour révéler l’ancre commune</span>
        </button>

        <div id="${instanceId}" class="storyboard__evidence">
          <div class="storyboard__connections" aria-hidden="true"><span></span><span></span><span></span></div>

          <div class="storyboard__readings">
          ${content.readings.map((reading, index) => `
            <article class="story-reading" data-story-card="${index + 1}">
              <span class="storyboard__card-status">${escapeHtml(content.status)}</span>
              <header class="story-reading__head">
                <span class="story-reading__id">${escapeHtml(reading.id)}</span>
                <div><h3>${escapeHtml(reading.name)}</h3><p>${escapeHtml(reading.horizon)}</p></div>
              </header>
              <blockquote>${escapeHtml(reading.text)}</blockquote>
              <span class="story-reading__anchor">ANCRE · MÊME PHRASE SOURCE</span>
            </article>`).join("")}
          </div>
        </div>

        <div class="story-question" aria-live="polite">
          <span class="storyboard__card-status">${escapeHtml(content.status)}</span>
          <div class="story-question__label">QUESTION AU COMITÉ</div>
          <q>${escapeHtml(content.question)}</q>
          <div class="story-question__instruction"><strong>${escapeHtml(content.instruction)}</strong><span>${escapeHtml(content.explanation)}</span></div>
        </div>
      </div>
      <footer class="storyboard__footer">
        <p>${escapeHtml(content.provenance)} Aucun calcul n’a lieu sur cette page.</p>
        <button class="button button--small" type="button" data-story-replay>Rejouer l’illustration</button>
      </footer>
    </section>`;
}

function initialize(root) {
  const timers = [];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const schedule = reducedMotion.matches
    ? []
    : [
        [2000, "is-card-1"],
        [2400, "is-card-2"],
        [2800, "is-card-3"],
        [4000, "is-reading-1"],
        [5200, "is-reading-2"],
        [6400, "is-reading-3"],
        [8000, "is-anchored"],
        [10000, "is-question"]
      ];

  function clear() {
    timers.splice(0).forEach(window.clearTimeout);
    root.classList.remove(
      "is-card-1", "is-card-2", "is-card-3",
      "is-reading-1", "is-reading-2", "is-reading-3",
      "is-anchored", "is-question"
    );
    root.querySelector("[data-story-anchor]")?.setAttribute("aria-expanded", "false");
  }

  function setAnchored(active) {
    root.classList.toggle("is-anchored", active);
    root.querySelector("[data-story-anchor]")?.setAttribute("aria-expanded", active ? "true" : "false");
  }

  function showAll() {
    root.classList.add(
      "is-card-1", "is-card-2", "is-card-3",
      "is-reading-1", "is-reading-2", "is-reading-3",
      "is-anchored", "is-question"
    );
    root.querySelector("[data-story-anchor]")?.setAttribute("aria-expanded", "true");
  }

  function play() {
    clear();
    if (reducedMotion.matches) {
      showAll();
      return;
    }
    schedule.forEach(([delay, className]) => {
      timers.push(window.setTimeout(() => {
        if (className === "is-anchored") setAnchored(true);
        else root.classList.add(className);
      }, delay));
    });
  }

  root.querySelector("[data-story-replay]")?.addEventListener("click", play);
  const anchorButton = root.querySelector("[data-story-anchor]");
  anchorButton?.addEventListener("click", () => setAnchored(!root.classList.contains("is-anchored")));
  anchorButton?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    setAnchored(!root.classList.contains("is-anchored"));
  });
  anchorButton?.addEventListener("mouseenter", () => setAnchored(true));
  root.querySelectorAll("[data-story-card]").forEach((card) => {
    card.addEventListener("mouseenter", () => setAnchored(true));
  });
  reducedMotion.addEventListener?.("change", () => {
    clear();
    if (reducedMotion.matches) showAll();
    else play();
  });

  play();
}

export function mountStoryboards() {
  document.querySelectorAll("[data-storyboard-mount]").forEach((root, index) => {
    root.innerHTML = template(illustration, `story-anchors-${index + 1}`);
    initialize(root.querySelector(".storyboard"));
  });
}
