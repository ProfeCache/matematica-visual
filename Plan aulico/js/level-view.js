/**
 * Vista de nivel: recorre los componentes obligatorios de cada nivel
 * (disparador, predicción, exploración, puente a la hoja, carga, comprobación,
 * conclusión y reto) a partir de los datos del nivel.
 *
 * Este módulo arma el recorrido y el estado; cada tipo de paso se dibuja en
 * `steps.js`.
 */

import { el, paragraph, feedbackBox, showToast, clearNode, starsRow } from "./ui.js";
import { withMath } from "./math.js";
import { STEP_RENDERERS } from "./steps.js";
import { getLevelProgress, completeLevel, awardStar } from "./progress.js";
import { getLevel, isPlayable, getNextAvailableLevel } from "./levels.js";
import { findWorld } from "../levels/worlds.js";

export function renderLevelView(root, levelId, { goToMap, goToLevel }) {
  const level = getLevel(levelId);
  clearNode(root);

  if (!level) {
    root.appendChild(el("section", { class: "card" }, [
      el("h1", { class: "section-title", text: "No encontramos ese nivel" }),
      paragraph("El enlace apunta a un nivel que no existe en el mapa."),
      el("div", { class: "btn-row" }, [
        el("button", { class: "btn btn-primary", text: "Volver al mapa", onClick: goToMap })
      ])
    ]));
    return;
  }

  root.appendChild(levelHeader(level));

  if (!isPlayable(level)) {
    root.appendChild(draftPanel(level, goToMap));
    return;
  }

  renderPlayableLevel(root, level, { goToMap, goToLevel });
}

/* ---------------------------------------------------------
   Encabezado y nivel en preparación
   --------------------------------------------------------- */

function levelHeader(level) {
  const world = findWorld(level.world);
  const header = el("header", { class: "level-header" }, [
    el("p", { class: "eyebrow", text: `Mundo ${world.id} · ${world.name} · Semana ${world.week}` }),
    el("h1", { class: "level-title", text: `Nivel ${level.id} · ${level.title}` })
  ]);
  header.appendChild(paragraph(level.mission, "level-mission"));
  return header;
}

function draftPanel(level, goToMap) {
  const card = el("section", { class: "card" }, [
    el("span", { class: "badge badge-soon", text: "Próximamente" }),
    el("h2", { class: "section-title", text: "Este nivel todavía está en construcción" })
  ]);

  card.appendChild(paragraph(level.narrative, "narrative"));
  card.appendChild(paragraph(
    "El recorrido se construye por fases y el mapa se mantiene coherente: preferimos mostrar el plan del nivel antes que presentarlo como jugable estando incompleto."
  ));

  const plan = level.plan || {};
  const list = el("ul", { class: "soon-list" });
  const rows = [
    ["Contenido", level.topic],
    ["En el programa", plan.program],
    ["Puente a la carpeta", plan.paper],
    ["Regreso al programa", plan.back],
    ["Reto de desbloqueo", plan.challenge]
  ];
  rows.forEach(([label, text]) => {
    if (!text) return;
    const item = el("li");
    item.appendChild(el("strong", { text: `${label}: ` }));
    item.appendChild(withMath(text));
    list.appendChild(item);
  });
  card.appendChild(list);

  card.appendChild(el("div", { class: "btn-row" }, [
    el("button", { class: "btn btn-primary", text: "Volver al mapa", onClick: goToMap })
  ]));
  return card;
}

/* ---------------------------------------------------------
   Nivel jugable
   --------------------------------------------------------- */

function renderPlayableLevel(root, level, { goToMap, goToLevel }) {
  const steps = level.steps;
  let stepIndex = 0;
  const done = new Set();

  const barSlot = el("div");
  const stepSlot = el("div");
  root.append(barSlot, stepSlot);

  function renderBar() {
    clearNode(barSlot);
    const bar = el("ol", { class: "steps-bar", "aria-label": "Etapas del nivel" });
    steps.forEach((step, index) => {
      const state = done.has(index) ? "done" : index === stepIndex ? "current" : "todo";
      bar.appendChild(el("li", {
        dataset: { state },
        text: `${done.has(index) ? "✓ " : ""}${step.phase}`,
        "aria-current": index === stepIndex ? "step" : null
      }));
    });
    barSlot.appendChild(bar);
  }

  function advance() {
    done.add(stepIndex);
    stepIndex += 1;
    if (stepIndex >= steps.length) {
      renderUnlock();
      return;
    }
    render();
    document.getElementById("contenido")?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function render() {
    renderBar();
    clearNode(stepSlot);
    stepSlot.appendChild(buildStep(steps[stepIndex], { level, advance, goToMap }));
  }

  function renderUnlock() {
    const progress = getLevelProgress(level.id);
    completeLevel(level.id, progress.stars || 1);
    renderBar();
    clearNode(stepSlot);

    const unlock = level.unlock || {};
    const panel = el("section", { class: "card" }, [
      el("div", { class: "unlock" }, [el("h3", { text: unlock.title || "Reto superado" })])
    ]);
    const box = panel.querySelector(".unlock");
    box.appendChild(paragraph(unlock.text || "El nivel quedó completado."));
    const stars = getLevelProgress(level.id).stars;
    box.appendChild(el("p", { class: "reward-stars" }, [
      starsRow(stars, level.stars || 3, level.starNames || {}),
      el("span", { class: "muted", text: `${stars} de ${level.stars || 3} estrellas` })
    ]));

    if (unlock.paperNote) {
      const note = el("div", { class: "paper-task" }, [el("h3", { text: "Antes de cerrar, en la carpeta" })]);
      note.appendChild(paragraph(unlock.paperNote));
      panel.appendChild(note);
    }

    const next = getNextAvailableLevel();
    const buttons = el("div", { class: "btn-row" }, [
      el("button", { class: "btn btn-secondary", text: "Volver al mapa", onClick: goToMap })
    ]);
    if (next && next.id !== level.id) {
      buttons.insertBefore(
        el("button", {
          class: "btn btn-primary",
          text: `Ir al Nivel ${next.id}`,
          onClick: () => goToLevel(next.id)
        }),
        buttons.firstChild
      );
    }
    panel.appendChild(buttons);
    stepSlot.appendChild(panel);

    showToast("Nivel superado. El siguiente nivel quedó desbloqueado.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  render();
}

/* ---------------------------------------------------------
   Construcción de un paso
   --------------------------------------------------------- */

function buildStep(step, ctx) {
  const card = el("section", { class: "card step" });

  if (step.kicker) {
    card.appendChild(el("span", {
      class: "step-kicker",
      dataset: { kind: step.kickerKind || "narrative" },
      text: step.kicker
    }));
  }
  card.appendChild(el("h2", { text: step.title }));
  if (step.prompt) card.appendChild(paragraph(step.prompt, "prompt"));

  const body = el("div");
  const feedbackSlot = el("div");
  const footer = el("div", { class: "btn-row" });
  card.append(body, feedbackSlot, footer);

  const nextButton = el("button", {
    class: "btn btn-primary",
    text: step.continueLabel || "Continuar",
    onClick: ctx.advance
  });
  nextButton.disabled = true;

  const helper = {
    body,
    step,
    level: ctx.level,
    nextButton,
    footer,
    feedback(tone, text, tag) {
      clearNode(feedbackSlot);
      feedbackSlot.appendChild(feedbackBox(tone, text, tag));
    },
    clearFeedback() {
      clearNode(feedbackSlot);
    },
    unlockNext() {
      nextButton.disabled = false;
    },
    grantStar() {
      if (step.star) awardStar(ctx.level.id, step.star);
    }
  };

  // El orden del pie es siempre el mismo: volver, comprobar, avanzar. Los
  // renderizadores insertan su botón de comprobación en el medio.
  footer.appendChild(el("button", { class: "btn btn-ghost", text: "Volver al mapa", onClick: ctx.goToMap }));

  const renderer = STEP_RENDERERS[step.kind];
  if (renderer) {
    renderer(helper);
  } else {
    body.appendChild(paragraph("Este tipo de paso todavía no está implementado."));
    helper.unlockNext();
  }

  footer.appendChild(nextButton);
  return card;
}
