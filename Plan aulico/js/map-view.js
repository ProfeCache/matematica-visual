/**
 * Mapa de la aventura: seis mundos, dieciocho niveles.
 * El estado de cada nodo (superado, disponible, bloqueado o en preparación)
 * se comunica con color, texto e icono, nunca solo con color.
 */

import { el, paragraph, starsRow, showToast, clearNode } from "./ui.js";
import { worlds, getWorldLevels, getLevelState, getNextAvailableLevel } from "./levels.js";
import { getLevelProgress, getSummary, resetProgress, wasMigrated } from "./progress.js";
import { levels } from "./levels.js";

const STATE_LABEL = {
  completed: { text: "✓ Superado", badge: "badge-completed" },
  available: { text: "▶ Disponible", badge: "badge-available" },
  locked: { text: "🔒 Bloqueado", badge: "badge-locked" },
  soon: { text: "◷ Próximamente", badge: "badge-soon" }
};

export function renderMapView(root, { goToLevel }) {
  clearNode(root);
  root.appendChild(hero(goToLevel));
  root.appendChild(cycleStrip());

  const heading = el("header", { id: "mapa-mundos" }, [
    el("h2", { class: "section-title", text: "Mapa de la expedición" })
  ]);
  heading.appendChild(paragraph(
    "Un nivel por clase durante seis semanas. Ningún nivel se habilita por haberlo abierto: hay que superar su reto de desbloqueo.",
    "muted"
  ));
  root.appendChild(heading);

  const list = el("section", { class: "world-list", "aria-label": "Mundos y niveles" });
  worlds.forEach((world) => list.appendChild(worldCard(world, goToLevel)));
  root.appendChild(list);

  root.appendChild(localNote());
}

function hero(goToLevel) {
  const summary = getSummary(levels);
  const next = getNextAvailableLevel();

  const section = el("section", { class: "hero" }, [
    el("p", { class: "eyebrow", text: "Universo Logaria · Recorrido de 6 semanas" }),
    el("h1", { text: "La aventura logarítmica" })
  ]);
  section.appendChild(paragraph(
    "La pantalla plantea el problema, la carpeta produce la matemática y la pantalla comprueba. Cada nivel termina con un reto distinto de la práctica guiada."
  ));

  const facts = el("ul", { class: "hero-facts" }, [
    el("li", { text: "6 mundos · 18 niveles" }),
    el("li", { text: plural(summary.completed, "nivel superado", "niveles superados") }),
    el("li", { text: plural(summary.stars, "estrella reunida", "estrellas reunidas") })
  ]);
  section.appendChild(facts);

  const actions = el("div", { class: "btn-row" });
  if (next) {
    actions.appendChild(el("button", {
      class: "btn btn-primary",
      text: summary.completed ? `Continuar en el Nivel ${next.id}` : `Empezar por el Nivel ${next.id}`,
      onClick: () => goToLevel(next.id)
    }));
  }
  actions.appendChild(el("button", {
    class: "btn btn-secondary",
    text: "Ver el mapa completo",
    onClick: () => document.getElementById("mapa-mundos")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }));
  section.appendChild(actions);

  if (!next) {
    section.appendChild(paragraph(
      "Superaste todos los niveles construidos hasta ahora. Los que figuran como «Próximamente» se van incorporando por fases.",
      "muted"
    ));
  }

  if (wasMigrated()) {
    section.appendChild(paragraph(
      "Encontramos un avance guardado de la versión anterior y lo migramos: tus niveles superados siguen registrados.",
      "muted"
    ));
  }
  return section;
}

function cycleStrip() {
  const steps = [
    ["1 · Explorá y predecí", "La pantalla plantea una situación y te pide anticipar antes de tocar cualquier control."],
    ["2 · Trabajá en la carpeta", "La aplicación se detiene y pide cálculo, tabla, bosquejo o justificación."],
    ["3 · Cargá tu producción", "Volvés a la pantalla y entrás los puntos, intervalos o parámetros obtenidos."],
    ["4 · Comprobá y desbloqueá", "El programa grafica, compara y recién entonces habilita el reto final."]
  ];
  const list = el("ul", { class: "cycle", "aria-label": "Cómo se trabaja en cada nivel" });
  steps.forEach(([title, text]) => {
    list.appendChild(el("li", {}, [
      el("b", { text: title }),
      el("span", { text })
    ]));
  });
  return list;
}

function worldCard(world, goToLevel) {
  const card = el("article", { class: "world" });
  const head = el("div", { class: "world-head" }, [
    el("p", { class: "eyebrow", text: `Mundo ${world.id} · Semana ${world.week} · ${world.sourceName}` }),
    el("h3", { class: "world-title", text: world.name }),
    el("p", { class: "world-topic", text: world.topic })
  ]);
  card.appendChild(head);

  const list = el("div", { class: "level-list" });
  getWorldLevels(world.id).forEach((level) => list.appendChild(levelNode(level, goToLevel)));
  card.appendChild(list);
  return card;
}

function levelNode(level, goToLevel) {
  const state = getLevelState(level);
  const progress = getLevelProgress(level.id);
  const label = STATE_LABEL[state];

  const button = el("button", {
    class: "level-node",
    type: "button",
    dataset: { state },
    onClick: () => {
      if (state === "locked") {
        showToast("Ese nivel se habilita al superar el reto del nivel anterior.");
        return;
      }
      goToLevel(level.id);
    }
  });

  button.appendChild(el("span", { class: "level-number", text: `Nivel ${level.id}` }));
  button.appendChild(el("span", { class: "level-title", text: level.title }));
  button.appendChild(el("span", { class: "level-mission", text: level.mission }));

  const foot = el("div", { class: "node-foot" }, [
    el("span", { class: `badge ${label.badge}`, text: label.text })
  ]);
  if (state !== "soon") foot.appendChild(starsRow(progress.stars, level.stars || 3, level.starNames || {}));
  button.appendChild(foot);

  if (state === "locked") button.setAttribute("aria-disabled", "true");
  return button;
}

function plural(count, singular, many) {
  return `${count} ${count === 1 ? singular : many}`;
}

function localNote() {
  const aside = el("aside", { class: "card local-note" });
  aside.appendChild(paragraph(
    "El progreso se guarda solo en este navegador y de forma anónima: no se piden nombres ni correos. Reiniciar borra las estrellas y los niveles superados de este dispositivo."
  ));
  aside.appendChild(el("button", {
    class: "btn btn-ghost",
    text: "Reiniciar recorrido",
    onClick: () => {
      const confirmed = window.confirm("¿Reiniciar el recorrido? Se borran las estrellas y los niveles superados guardados en este navegador.");
      if (!confirmed) return;
      resetProgress();
      showToast("Recorrido reiniciado.");
    }
  }));
  return aside;
}
