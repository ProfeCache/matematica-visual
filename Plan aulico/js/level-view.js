/**
 * Vista de nivel: recorre los componentes obligatorios de cada nivel
 * (disparador, predicción, exploración, puente a la hoja, carga, comprobación,
 * conclusión y reto) a partir de los datos del nivel.
 *
 * Reglas que se sostienen acá:
 *  - la curva no aparece antes de la producción del estudiante;
 *  - el error no reinicia el nivel y las pistas son escalonadas;
 *  - el botón «siguiente» solo aparece cuando el reto quedó superado.
 */

import { el, paragraph, feedbackBox, showToast, clearNode, starsRow } from "./ui.js";
import {
  renderMath,
  withMath,
  makeLogFunction,
  logFunctionLatex,
  latexToPlainText,
  formatNumber
} from "./math.js";
import { createGraph, createLegend } from "./graph.js";
import { validatePoint, validateChoice, validateMultiChoice, gradedHint } from "./validators.js";
import {
  getLevelProgress,
  awardStar,
  completeLevel,
  registerAttempt,
  saveNote
} from "./progress.js";
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
    stepSlot.appendChild(buildStep(steps[stepIndex], {
      level,
      advance,
      goToMap
    }));
  }

  function renderUnlock() {
    const progress = getLevelProgress(level.id);
    completeLevel(level.id, progress.stars || 1);
    renderBar();
    clearNode(stepSlot);

    const unlock = level.unlock || {};
    const panel = el("section", { class: "card" }, [
      el("div", { class: "unlock" }, [
        el("h3", { text: unlock.title || "Reto superado" })
      ])
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

  const renderers = {
    brief: renderBrief,
    prediction: renderPrediction,
    paper: renderPaper,
    points: renderPoints,
    check: renderCheck,
    lab: renderLab,
    conclusion: renderConclusion
  };

  const renderer = renderers[step.kind];
  if (renderer) {
    renderer(helper);
  } else {
    body.appendChild(paragraph("Este tipo de paso todavía no está implementado."));
    helper.unlockNext();
  }

  footer.appendChild(el("button", { class: "btn btn-ghost", text: "Volver al mapa", onClick: ctx.goToMap }));
  footer.appendChild(nextButton);
  return card;
}

/* --- Disparador -------------------------------------------------------- */

function renderBrief({ body, step, unlockNext }) {
  if (step.math) body.appendChild(renderMath(step.math, { display: true }));
  if (step.text) body.appendChild(paragraph(step.text, "narrative"));
  if (step.note) body.appendChild(paragraph(step.note, "muted"));
  unlockNext();
}

/* --- Predicción -------------------------------------------------------- */

function renderPrediction(helper) {
  const { body, step, level, feedback, unlockNext, footer, nextButton, grantStar } = helper;
  let selected = null;
  let attempts = 0;
  let resolved = false;

  const list = el("div", { class: "options", role: "group", "aria-label": "Opciones" });
  const buttons = step.options.map((text, index) => {
    const button = el("button", {
      class: "option",
      type: "button",
      "aria-pressed": "false",
      onClick: () => select(index)
    }, [
      el("span", { class: "option-mark", text: String.fromCharCode(65 + index) })
    ]);
    button.appendChild(el("span", {}, [withMath(text)]));
    list.appendChild(button);
    return button;
  });
  body.appendChild(list);

  if (step.note) body.appendChild(paragraph(step.note, "muted"));

  const checkButton = step.graded
    ? el("button", { class: "btn btn-secondary", text: "Comprobar", onClick: check })
    : null;
  if (checkButton) {
    checkButton.disabled = true;
    footer.appendChild(checkButton);
  }

  function select(index) {
    if (resolved) return;
    selected = index;
    buttons.forEach((button, i) => {
      button.setAttribute("aria-pressed", String(i === index));
      delete button.dataset.result;
    });
    if (step.graded) {
      checkButton.disabled = false;
    } else {
      saveNote(level.id, step.recordKey, index);
      unlockNext();
      helper.feedback("info", "Predicción registrada. Anotala también en tu carpeta antes de seguir.");
    }
  }

  function check() {
    if (selected === null || resolved) return;
    const result = validateChoice(selected, step.expectedIndex);
    saveNote(level.id, step.recordKey, selected);

    if (result.ok) {
      resolved = true;
      buttons[selected].dataset.result = "correct";
      buttons.forEach((button) => { button.disabled = true; });
      checkButton.remove();
      grantStar();
      feedback("correct", step.successMessage || "Anticipación correcta.");
      unlockNext();
      return;
    }

    attempts += 1;
    registerAttempt(level.id);
    buttons[selected].dataset.result = "wrong";
    feedback(attempts === 1 ? "close" : "wrong", gradedHint(step.hints, attempts) || "Revisá tu razonamiento y volvé a intentarlo.");
    checkButton.disabled = true;
    selected = null;
    buttons.forEach((button) => button.setAttribute("aria-pressed", "false"));
  }

  if (!step.graded) nextButton.disabled = true;
}

/* --- Puente a la hoja --------------------------------------------------- */

function renderPaper({ body, step, unlockNext }) {
  if (step.math) body.appendChild(renderMath(step.math, { display: true }));

  const panel = el("div", { class: "paper-task" }, [
    el("h3", { text: "En la carpeta" })
  ]);
  const list = el("ol");
  (step.tasks || []).forEach((task) => {
    const item = el("li");
    item.appendChild(withMath(task));
    list.appendChild(item);
  });
  panel.appendChild(list);
  body.appendChild(panel);

  const confirmId = "paper-confirm";
  const field = el("div", { class: "field" });
  const label = el("label", { for: confirmId, style: "display:flex; gap:.6rem; align-items:center; font-size:16px; color:var(--text-primary); cursor:pointer;" });
  const checkbox = el("input", {
    type: "checkbox",
    id: confirmId,
    style: "width:1.35rem; height:1.35rem; min-height:auto; accent-color: var(--exploration);"
  });
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) unlockNext();
  });
  label.append(checkbox, document.createTextNode(step.confirmLabel || "Ya lo resolví en la carpeta"));
  field.appendChild(label);
  field.appendChild(el("p", {
    class: "field-help",
    text: "La aplicación no puede ver tu hoja: el trabajo escrito es parte de la actividad, no un extra."
  }));
  body.appendChild(field);
}

/* --- Carga de puntos ---------------------------------------------------- */

function renderPoints(helper) {
  const { body, step, level, feedback, unlockNext, footer, grantStar } = helper;

  if (step.paperNote) {
    const note = el("div", { class: "paper-task" }, [el("h3", { text: "En la carpeta" })]);
    note.appendChild(paragraph(step.paperNote));
    body.appendChild(note);
  }

  const fn = makeLogFunction(step.fn);
  const graphHost = el("div");
  body.appendChild(graphHost);
  const graph = createGraph(graphHost, {
    range: step.graph?.range,
    description: step.graph?.description,
    curves: [],
    points: [],
    readout: [["Función", "todavía no reconstruida"], ["Puntos correctos", "0"]]
  });
  if (step.legend) body.appendChild(createLegend(step.legend));

  const table = el("table", { class: "points-table" }, [
    el("caption", { text: "Escribí el valor de f(x) que obtuviste en la carpeta." }),
    el("thead", {}, [
      el("tr", {}, [
        el("th", { scope: "col", text: "x" }),
        el("th", { scope: "col", text: "f(x)" }),
        el("th", { scope: "col", text: "Estado" })
      ])
    ])
  ]);
  const tbody = el("tbody");
  table.appendChild(tbody);

  const rows = step.rows.map((row, index) => {
    const input = el("input", {
      type: "text",
      inputmode: "text",
      autocomplete: "off",
      "aria-label": `Valor de f(x) para x igual a ${row.x}`
    });
    const state = el("span", { class: "point-state", text: "Sin cargar" });
    const tr = el("tr", {}, [
      el("th", { scope: "row", text: String(row.x).replace(".", ",") }),
      el("td", {}, [input]),
      el("td", {}, [state])
    ]);
    tbody.appendChild(tr);
    return { row, input, state, tr, attempts: 0, solved: false, index };
  });
  body.appendChild(table);

  const checkButton = el("button", { class: "btn btn-secondary", text: "Comprobar puntos", onClick: check });
  footer.appendChild(checkButton);

  function refreshGraph({ withCurve = false } = {}) {
    const points = rows.filter((item) => item.solved).map((item) => ({
      x: item.row.x,
      y: item.row.y,
      kind: "student",
      label: `(${formatNumber(item.row.x)}; ${formatNumber(item.row.y)})`
    }));
    graph.update({
      points,
      curves: withCurve ? [{ fn, kind: "base" }] : [],
      asymptote: withCurve ? fn.boundary : null,
      readout: [
        ["Función", withCurve ? latexToPlainText(logFunctionLatex(step.fn)) : "todavía no reconstruida"],
        ["Puntos correctos", `${points.length} de ${rows.length}`]
      ]
    });
  }

  function check() {
    const pending = [];
    let anyChecked = false;

    rows.forEach((item) => {
      if (item.solved) return;
      const raw = item.input.value.trim();
      if (!raw) {
        item.state.textContent = "Sin cargar";
        delete item.state.dataset.result;
        delete item.tr.dataset.result;
        return;
      }
      anyChecked = true;
      const result = validatePoint({ x: item.row.x, y: raw }, { x: item.row.x, y: item.row.y });
      if (result.ok) {
        item.solved = true;
        item.input.disabled = true;
        item.tr.dataset.result = "correct";
        item.state.dataset.result = "correct";
        item.state.textContent = "✓ Ubicado";
      } else {
        item.attempts += 1;
        registerAttempt(level.id);
        item.tr.dataset.result = "wrong";
        item.state.dataset.result = "wrong";
        item.state.textContent = "Revisar";
        pending.push({ item, hint: gradedHint(item.row.hints, item.attempts) });
      }
    });

    const solved = rows.filter((item) => item.solved).length;
    const revealCurve = step.revealCurveOnSuccess ?? Boolean(step.final);
    refreshGraph({ withCurve: solved === rows.length && revealCurve });

    if (!anyChecked && solved < rows.length) {
      feedback("info", "Cargá al menos un valor antes de comprobar.");
      return;
    }

    if (solved === rows.length) {
      checkButton.remove();
      grantStar();
      feedback("correct", step.successMessage || "Todos los puntos son correctos.");
      unlockNext();
      return;
    }

    if (pending.length) {
      const first = pending[0];
      const others = pending.slice(1).map(({ item }) => `x = ${formatNumber(item.row.x)}`);
      const extra = others.length ? ` También conviene revisar ${others.join(" y ")}.` : "";
      feedback(pending.length === 1 ? "close" : "wrong", `${first.hint}${extra}`);
    } else {
      feedback("info", `Van ${solved} de ${rows.length} puntos. Completá los que faltan.`);
    }
  }

  refreshGraph();
}

/* --- Comprobación -------------------------------------------------------- */

function renderCheck(helper) {
  const { body, step, level, unlockNext } = helper;
  const fn = makeLogFunction(step.fn);

  const graphHost = el("div");
  body.appendChild(graphHost);
  createGraph(graphHost, {
    range: step.graph?.range,
    description: step.graph?.description,
    curves: [{ fn, kind: "base" }],
    points: step.showPoints ? controlPoints(step) : [],
    asymptote: fn.boundary,
    readout: step.readout || []
  });
  if (step.legend) body.appendChild(createLegend(step.legend));

  if (step.contrast) {
    const saved = getLevelProgress(level.id).notes?.[step.contrast.recordKey];
    const right = saved === step.contrast.expectedIndex;
    body.appendChild(feedbackBox(
      right ? "correct" : "info",
      right ? step.contrast.whenRight : step.contrast.whenWrong,
      right ? "Tu predicción" : "Tu predicción"
    ));
  }

  if (step.note) body.appendChild(paragraph(step.note, "muted"));
  unlockNext();
}

function controlPoints(step) {
  const source = step.points || step.rows || [];
  return source.map((point) => ({
    x: point.x,
    y: point.y,
    kind: "student",
    label: `(${formatNumber(point.x)}; ${formatNumber(point.y)})`
  }));
}

/* --- Laboratorio --------------------------------------------------------- */

function renderLab(helper) {
  const { body, step, feedback, unlockNext, grantStar } = helper;
  const values = { ...step.fn };
  const met = new Set();

  const graphHost = el("div");
  const controlsHost = el("div", { class: "lab-controls" });
  body.append(controlsHost, graphHost);

  const graph = createGraph(graphHost, {
    range: step.graph?.range,
    curves: [{ fn: makeLogFunction(values), kind: "base" }],
    readout: []
  });

  const requirementList = el("ul", { class: "soon-list", "aria-live": "polite" });
  const requirementItems = (step.requirements || []).map((requirement) => {
    const item = el("li", { text: `○ ${requirement.label}` });
    requirementList.appendChild(item);
    return { requirement, item };
  });

  step.controls.forEach((control) => {
    controlsHost.appendChild(buildControl(control, (value) => {
      values[control.key] = value;
      update();
    }));
  });

  if (step.tip) body.appendChild(paragraph(step.tip, "muted"));
  body.appendChild(el("h3", { class: "section-title", text: "Para completar la exploración" }));
  body.appendChild(requirementList);

  function update() {
    const fn = makeLogFunction(values);
    graph.update({
      curves: [{ fn, kind: values.c === step.fn.c && values.a === step.fn.a ? "base" : "transformed" }],
      asymptote: fn.boundary,
      description: `Curva de f(x) con base ${values.c} y factor ${values.a}.`,
      readout: [
        ["Función", latexToPlainText(logFunctionLatex(values))],
        ["Comportamiento", fn.increasing ? "creciente" : "decreciente"],
        ["Valores de x admitidos", `x > ${formatNumber(fn.boundary)}`],
        ["Corte con el eje x", `x = ${formatNumber((1 + values.k) / values.a)}`]
      ]
    });

    requirementItems.forEach(({ requirement, item }) => {
      if (requirement.test(values)) met.add(requirement.id);
      const ok = met.has(requirement.id);
      item.textContent = `${ok ? "✓" : "○"} ${requirement.label}`;
      item.style.color = ok ? "var(--success)" : "var(--text-secondary)";
    });

    if (met.size === requirementItems.length && requirementItems.length) {
      grantStar();
      unlockNext();
      feedback("correct", "Exploraste los tres casos. Anotá en la carpeta qué observaste en cada uno antes de continuar.");
    }
  }

  update();
}

function buildControl(control, onChange) {
  const wrapper = el("div", { class: "control" });
  const id = `control-${control.key}`;
  wrapper.appendChild(el("div", { class: "control-head" }, [
    el("label", { for: id, text: control.label })
  ]));

  const row = el("div", { class: "control-row" });

  if (control.type === "select") {
    const select = el("select", { id });
    control.options.forEach((option) => {
      const node = el("option", { value: String(option.value), text: option.label });
      if (option.value === control.value) node.selected = true;
      select.appendChild(node);
    });
    select.addEventListener("change", () => onChange(Number(select.value)));
    row.appendChild(select);
  } else {
    const range = el("input", {
      type: "range",
      id,
      min: control.min,
      max: control.max,
      step: control.step,
      value: control.value
    });
    // Accesibilidad matemática: además del slider, siempre un campo exacto.
    const number = el("input", {
      type: "number",
      min: control.min,
      max: control.max,
      step: control.step,
      value: control.value,
      "aria-label": `${control.label}, valor exacto`
    });
    range.addEventListener("input", () => {
      number.value = range.value;
      onChange(Number(range.value));
    });
    number.addEventListener("change", () => {
      range.value = number.value;
      onChange(Number(number.value));
    });
    row.append(range, number);
  }

  wrapper.appendChild(row);
  return wrapper;
}

/* --- Conclusión ---------------------------------------------------------- */

function renderConclusion(helper) {
  const { body, step, level, feedback, unlockNext, footer, grantStar } = helper;
  const selected = new Set();
  let attempts = 0;

  const list = el("div", { class: "options", role: "group", "aria-label": "Conclusiones posibles" });
  const buttons = step.options.map((text, index) => {
    const button = el("button", {
      class: "option",
      type: "button",
      "aria-pressed": "false",
      onClick: () => toggle(index)
    }, [el("span", { class: "option-mark", text: String.fromCharCode(65 + index) })]);
    button.appendChild(el("span", {}, [withMath(text)]));
    list.appendChild(button);
    return button;
  });
  body.appendChild(list);
  body.appendChild(el("p", {
    class: "field-help",
    text: "Podés marcar más de una. Se comprueban todas juntas."
  }));

  const checkButton = el("button", { class: "btn btn-secondary", text: "Comprobar conclusión", onClick: check });
  checkButton.disabled = true;
  footer.appendChild(checkButton);

  function toggle(index) {
    if (selected.has(index)) selected.delete(index);
    else selected.add(index);
    buttons[index].setAttribute("aria-pressed", String(selected.has(index)));
    delete buttons[index].dataset.result;
    checkButton.disabled = selected.size === 0;
  }

  function check() {
    const result = validateMultiChoice([...selected], step.correct);
    if (result.ok) {
      buttons.forEach((button, index) => {
        button.disabled = true;
        if (step.correct.includes(index)) button.dataset.result = "correct";
      });
      checkButton.remove();
      saveNote(level.id, "conclusion", [...selected]);
      grantStar();
      feedback("correct", step.successMessage || "Conclusión registrada.");
      unlockNext();
      return;
    }

    attempts += 1;
    registerAttempt(level.id);
    const detail = result.reason === "missing"
      ? "Falta al menos una afirmación que tu exploración sí respalda."
      : "Marcaste al menos una afirmación que el laboratorio no respalda.";
    feedback(attempts === 1 ? "close" : "wrong", `${detail} ${gradedHint(step.hints, attempts) || ""}`.trim());
  }
}
