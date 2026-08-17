/**
 * Renderizadores de pasos.
 *
 * Cada paso de un nivel se describe como datos y se dibuja acá. Todos reciben
 * el mismo `helper` y comparten las reglas del proyecto:
 *  - nada se grafica ni se colorea antes de la producción del estudiante;
 *  - el error no reinicia nada: primero un indicio, después una pregunta
 *    orientadora y recién entonces una pista más explícita;
 *  - el botón de avanzar se habilita solo cuando el paso quedó resuelto.
 */

import { el, paragraph, feedbackBox } from "./ui.js";
import {
  renderMath,
  withMath,
  makeLogFunction,
  logFunctionLatex,
  latexToPlainText,
  formatNumber
} from "./math.js";
import { createGraph, createLegend } from "./graph.js";
import {
  validatePoint,
  validateNumber,
  validateIntervalSet,
  validateChoice,
  validateMultiChoice,
  validateSequence,
  gradedHint
} from "./validators.js";
import { getLevelProgress, awardStar, registerAttempt, saveNote } from "./progress.js";

/* ---------------------------------------------------------
   Utilidades comunes
   --------------------------------------------------------- */

/** Una curva puede describirse con parámetros de logaritmo o con una función. */
function toCurve(spec) {
  if (typeof spec.fn === "function") return { ...spec };
  return { ...spec, fn: makeLogFunction(spec.params || spec) };
}

function toCurves(list) {
  return (list || []).map(toCurve);
}

function paperPanel(text, title = "En la carpeta") {
  const panel = el("div", { class: "paper-task" }, [el("h3", { text: title })]);
  panel.appendChild(paragraph(text));
  return panel;
}

/** Lista de datos término/valor, con matemática admitida en el valor. */
function factsList(rows) {
  const box = el("div", { class: "facts" });
  const list = el("dl");
  rows.forEach(([term, value]) => {
    list.appendChild(el("dt", { text: term }));
    const dd = el("dd");
    dd.appendChild(withMath(value));
    list.appendChild(dd);
  });
  box.appendChild(list);
  return box;
}

/**
 * Un paso narrativo o de predicción puede mostrar el plano sin actividad, para
 * que el estudiante tenga qué observar antes de anticipar.
 */
function maybeGraph(step, body) {
  if (!step.curves) return;
  const host = el("div");
  body.appendChild(host);
  createGraph(host, {
    range: step.graph?.range,
    square: step.graph?.square,
    description: step.graph?.description,
    curves: toCurves(step.curves),
    points: step.points || [],
    readout: step.readout || []
  });
  if (step.legend) body.appendChild(createLegend(step.legend));
}

function optionButton(text, index, onClick) {
  const button = el("button", {
    class: "option",
    type: "button",
    "aria-pressed": "false",
    onClick: () => onClick(index)
  }, [el("span", { class: "option-mark", text: String.fromCharCode(65 + index) })]);
  button.appendChild(el("span", {}, [withMath(text)]));
  return button;
}

/* ---------------------------------------------------------
   Disparador
   --------------------------------------------------------- */

function brief({ body, step, unlockNext }) {
  if (step.math) body.appendChild(renderMath(step.math, { display: true }));
  if (step.text) body.appendChild(paragraph(step.text, "narrative"));
  maybeGraph(step, body);
  if (step.facts) body.appendChild(factsList(step.facts));
  if (step.note) body.appendChild(paragraph(step.note, "muted"));
  unlockNext();
}

/* ---------------------------------------------------------
   Predicción
   --------------------------------------------------------- */

function prediction(helper) {
  const { body, step, level, feedback, unlockNext, footer, grantStar } = helper;
  let selected = null;
  let attempts = 0;
  let resolved = false;

  if (step.math) body.appendChild(renderMath(step.math, { display: true }));
  maybeGraph(step, body);

  const list = el("div", { class: "options", role: "group", "aria-label": "Opciones" });
  const buttons = step.options.map((text, index) => {
    const button = optionButton(text, index, select);
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
      feedback("info", "Predicción registrada. Anotala también en tu carpeta antes de seguir.");
    }
  }

  function check() {
    if (selected === null || resolved) return;
    saveNote(level.id, step.recordKey, selected);
    const result = validateChoice(selected, step.expectedIndex);

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
    feedback(
      attempts === 1 ? "close" : "wrong",
      gradedHint(step.hints, attempts) || "Revisá tu razonamiento y volvé a intentarlo."
    );
    checkButton.disabled = true;
    selected = null;
    buttons.forEach((button) => button.setAttribute("aria-pressed", "false"));
  }
}

/* ---------------------------------------------------------
   Puente a la hoja
   --------------------------------------------------------- */

function paper({ body, step, unlockNext }) {
  if (step.math) body.appendChild(renderMath(step.math, { display: true }));

  const panel = el("div", { class: "paper-task" }, [el("h3", { text: "En la carpeta" })]);
  const list = el("ol");
  (step.tasks || []).forEach((task) => {
    const item = el("li");
    item.appendChild(withMath(task));
    list.appendChild(item);
  });
  panel.appendChild(list);
  body.appendChild(panel);

  const field = el("div", { class: "field" });
  const label = el("label", { class: "checkbox-label", for: "paper-confirm" });
  const checkbox = el("input", { type: "checkbox", id: "paper-confirm", class: "checkbox" });
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

/* ---------------------------------------------------------
   Carga de puntos
   --------------------------------------------------------- */

function points(helper) {
  const { body, step, level, feedback, unlockNext, footer, grantStar } = helper;
  const askBoth = step.askFor === "both";

  if (step.paperNote) body.appendChild(paperPanel(step.paperNote));

  const fn = step.fn ? makeLogFunction(step.fn) : null;
  const baseCurves = toCurves(step.curves);
  const revealCurves = step.revealCurves
    ? toCurves(step.revealCurves)
    : fn
      ? [{ fn, kind: "base" }]
      : [];
  const revealOnSuccess = step.revealCurveOnSuccess ?? Boolean(step.final || step.revealCurves);

  const graphHost = el("div");
  body.appendChild(graphHost);
  const graph = createGraph(graphHost, {
    range: step.graph?.range,
    square: step.graph?.square,
    description: step.graph?.description,
    curves: baseCurves,
    points: (step.fixedPoints || []).map((point) => ({ ...point, kind: point.kind || "base" })),
    asymptote: step.showAsymptote === false ? null : null,
    readout: []
  });
  if (step.legend) body.appendChild(createLegend(step.legend));

  const head = el("tr", {}, [
    step.givenLabel ? el("th", { scope: "col" }, [withMath(step.givenLabel)]) : null,
    el("th", { scope: "col", text: askBoth ? "x" : "x" }),
    el("th", { scope: "col", text: askBoth ? "y" : "f(x)" }),
    el("th", { scope: "col", text: "Estado" })
  ].filter(Boolean));

  const table = el("table", { class: "points-table" }, [
    el("caption", { text: step.tableCaption || "Escribí el valor que obtuviste en la carpeta." }),
    el("thead", {}, [head])
  ]);
  const tbody = el("tbody");
  table.appendChild(tbody);

  const rows = step.rows.map((row) => {
    const inputY = el("input", {
      type: "text",
      inputmode: "text",
      autocomplete: "off",
      "aria-label": askBoth
        ? `Segunda coordenada del punto ${row.label || row.x}`
        : `Valor de f(x) para x igual a ${row.x}`
    });
    const inputX = askBoth
      ? el("input", {
        type: "text",
        inputmode: "text",
        autocomplete: "off",
        "aria-label": `Primera coordenada del punto ${row.label || row.x}`
      })
      : null;

    const state = el("span", { class: "point-state", text: "Sin cargar" });
    const cells = [];
    if (step.givenLabel) {
      const given = el("th", { scope: "row" });
      given.appendChild(withMath(row.given));
      cells.push(given);
    }
    cells.push(askBoth
      ? el("td", {}, [inputX])
      : el("th", { scope: "row", text: String(row.x).replace(".", ",") }));
    cells.push(el("td", {}, [inputY]));
    cells.push(el("td", {}, [state]));

    const tr = el("tr", {}, cells);
    tbody.appendChild(tr);
    return { row, inputX, inputY, state, tr, attempts: 0, solved: false };
  });
  body.appendChild(table);

  const checkButton = el("button", { class: "btn btn-secondary", text: "Comprobar puntos", onClick: check });
  footer.appendChild(checkButton);

  function refreshGraph({ revealed = false } = {}) {
    const solvedPoints = rows.filter((item) => item.solved).map((item) => ({
      x: item.row.x,
      y: item.row.y,
      kind: "student",
      label: `(${formatNumber(item.row.x)}; ${formatNumber(item.row.y)})`
    }));
    const fixed = (step.fixedPoints || []).map((point) => ({ ...point, kind: point.kind || "base" }));

    graph.update({
      points: [...fixed, ...solvedPoints],
      curves: revealed ? [...baseCurves, ...revealCurves] : baseCurves,
      asymptote: revealed && fn ? fn.boundary : null,
      readout: [
        ...((revealed && step.readoutRevealed) || step.readout || []),
        ...(revealed && fn ? [["Función reconstruida", latexToPlainText(logFunctionLatex(step.fn))]] : []),
        ["Puntos correctos", `${solvedPoints.length} de ${rows.length}`]
      ]
    });
  }

  function readPoint(item) {
    return askBoth
      ? { x: item.inputX.value.trim(), y: item.inputY.value.trim() }
      : { x: item.row.x, y: item.inputY.value.trim() };
  }

  function axisMessage(reason) {
    if (!askBoth) return "";
    if (reason === "x") return "La primera coordenada de ese punto no coincide.";
    if (reason === "y") return "La segunda coordenada de ese punto no coincide.";
    if (reason === "both") return "Las dos coordenadas de ese punto necesitan revisión.";
    return "";
  }

  function check() {
    const pending = [];
    let anyChecked = false;

    rows.forEach((item) => {
      if (item.solved) return;
      const value = readPoint(item);
      if (!String(value.y) || (askBoth && !String(value.x))) {
        item.state.textContent = "Sin cargar";
        delete item.state.dataset.result;
        delete item.tr.dataset.result;
        return;
      }
      anyChecked = true;
      const result = validatePoint(value, { x: item.row.x, y: item.row.y });

      if (result.ok) {
        item.solved = true;
        item.inputY.disabled = true;
        if (item.inputX) item.inputX.disabled = true;
        item.tr.dataset.result = "correct";
        item.state.dataset.result = "correct";
        item.state.textContent = "✓ Ubicado";
      } else {
        item.attempts += 1;
        registerAttempt(level.id);
        item.tr.dataset.result = "wrong";
        item.state.dataset.result = "wrong";
        item.state.textContent = "Revisar";
        const hint = gradedHint(item.row.hints, item.attempts) || "Revisá ese punto.";
        pending.push({ item, message: `${axisMessage(result.reason)} ${hint}`.trim() });
      }
    });

    const solved = rows.filter((item) => item.solved).length;
    refreshGraph({ revealed: solved === rows.length && revealOnSuccess });

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
      const others = pending.slice(1).map(({ item }) => item.row.label || `x = ${formatNumber(item.row.x)}`);
      const extra = others.length ? ` También conviene revisar ${others.join(" y ")}.` : "";
      feedback(pending.length === 1 ? "close" : "wrong", `${pending[0].message}${extra}`);
    } else {
      feedback("info", `Van ${solved} de ${rows.length} puntos. Completá los que faltan.`);
    }
  }

  refreshGraph();
}

/* ---------------------------------------------------------
   Comprobación
   --------------------------------------------------------- */

function check(helper) {
  const { body, step, level, unlockNext } = helper;

  const fn = step.fn ? makeLogFunction(step.fn) : null;
  const curves = step.curves ? toCurves(step.curves) : fn ? [{ fn, kind: "base" }] : [];

  if (curves.length) {
    const graphHost = el("div");
    body.appendChild(graphHost);
    createGraph(graphHost, {
      range: step.graph?.range,
      square: step.graph?.square,
      description: step.graph?.description,
      curves,
      points: (step.points || []).map((point) => ({
        ...point,
        kind: point.kind || "student",
        label: point.label ?? `(${formatNumber(point.x)}; ${formatNumber(point.y)})`
      })),
      asymptote: step.asymptote ?? (fn ? fn.boundary : null),
      readout: step.readout || []
    });
    if (step.legend) body.appendChild(createLegend(step.legend));
  }

  if (step.facts) body.appendChild(factsList(step.facts));

  if (step.contrast) {
    const saved = getLevelProgress(level.id).notes?.[step.contrast.recordKey];
    const right = saved === step.contrast.expectedIndex;
    body.appendChild(feedbackBox(
      right ? "correct" : "info",
      right ? step.contrast.whenRight : step.contrast.whenWrong,
      "Tu predicción"
    ));
  }

  if (step.note) body.appendChild(paragraph(step.note, "muted"));
  unlockNext();
}

/* ---------------------------------------------------------
   Laboratorio
   --------------------------------------------------------- */

function lab(helper) {
  const { body, step, feedback, unlockNext, grantStar } = helper;
  const values = { ...(step.values || step.fn) };
  const met = new Set();

  const graphHost = el("div");
  const controlsHost = el("div", { class: "lab-controls" });
  body.append(controlsHost, graphHost);

  const graph = createGraph(graphHost, {
    range: step.graph?.range,
    square: step.graph?.square,
    curves: [],
    readout: []
  });
  if (step.legend) body.appendChild(createLegend(step.legend));

  const requirementList = el("ul", { class: "requirement-list", "aria-live": "polite" });
  const requirementItems = (step.requirements || []).map((requirement) => ({
    requirement,
    item: el("li", { text: `○ ${requirement.label}` })
  }));
  requirementItems.forEach(({ item }) => requirementList.appendChild(item));

  step.controls.forEach((control) => {
    controlsHost.appendChild(buildControl(control, (value) => {
      values[control.key] = value;
      update();
    }));
  });

  if (step.tip) body.appendChild(paragraph(step.tip, "muted"));
  if (requirementItems.length) {
    body.appendChild(el("h3", { class: "section-title", text: "Para completar la exploración" }));
    body.appendChild(requirementList);
  }

  /** Vista por omisión: una única curva logarítmica con sus datos. */
  function defaultBuild(current) {
    const fn = makeLogFunction(current);
    return {
      curves: [{ fn, kind: current.c === step.fn.c && current.a === step.fn.a ? "base" : "transformed" }],
      asymptote: fn.boundary,
      description: `Curva de f(x) con base ${current.c} y factor ${current.a}.`,
      readout: [
        ["Función", latexToPlainText(logFunctionLatex(current))],
        ["Comportamiento", fn.increasing ? "creciente" : "decreciente"],
        ["Valores de x admitidos", `x > ${formatNumber(fn.boundary)}`],
        ["Corte con el eje x", `x = ${formatNumber((1 + current.k) / current.a)}`]
      ]
    };
  }

  function update() {
    const view = step.build ? step.build(values) : defaultBuild(values);
    graph.update({
      curves: toCurves(view.curves),
      points: view.points || [],
      asymptote: view.asymptote ?? null,
      description: view.description || "",
      readout: view.readout || []
    });

    requirementItems.forEach(({ requirement, item }) => {
      if (requirement.test(values)) met.add(requirement.id);
      const ok = met.has(requirement.id);
      item.textContent = `${ok ? "✓" : "○"} ${requirement.label}`;
      item.dataset.state = ok ? "done" : "todo";
    });

    if (requirementItems.length && met.size === requirementItems.length) {
      grantStar();
      unlockNext();
      feedback("correct", step.successMessage || "Exploración completa. Anotá en la carpeta lo que observaste antes de continuar.");
    }
  }

  update();
}

function buildControl(control, onChange) {
  const wrapper = el("div", { class: "control" });
  const id = `control-${control.key}`;
  wrapper.appendChild(el("div", { class: "control-head" }, [el("label", { for: id, text: control.label })]));

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
      type: "range", id, min: control.min, max: control.max, step: control.step, value: control.value
    });
    // Accesibilidad matemática: además del slider, siempre un campo exacto.
    const number = el("input", {
      type: "number", min: control.min, max: control.max, step: control.step, value: control.value,
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

/* ---------------------------------------------------------
   Conclusión
   --------------------------------------------------------- */

function conclusion(helper) {
  const { body, step, level, feedback, unlockNext, footer, grantStar } = helper;
  const selected = new Set();
  let attempts = 0;

  const list = el("div", { class: "options", role: "group", "aria-label": "Conclusiones posibles" });
  const buttons = step.options.map((text, index) => {
    const button = optionButton(text, index, toggle);
    list.appendChild(button);
    return button;
  });
  body.appendChild(list);
  body.appendChild(el("p", { class: "field-help", text: "Podés marcar más de una. Se comprueban todas juntas." }));

  const checkButton = el("button", { class: "btn btn-secondary", text: "Comprobar conclusión", onClick: run });
  checkButton.disabled = true;
  footer.appendChild(checkButton);

  function toggle(index) {
    if (selected.has(index)) selected.delete(index);
    else selected.add(index);
    buttons[index].setAttribute("aria-pressed", String(selected.has(index)));
    delete buttons[index].dataset.result;
    checkButton.disabled = selected.size === 0;
  }

  function run() {
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
      : "Marcaste al menos una afirmación que la actividad no respalda.";
    feedback(attempts === 1 ? "close" : "wrong", `${detail} ${gradedHint(step.hints, attempts) || ""}`.trim());
  }
}

/* ---------------------------------------------------------
   Emparejar equivalencias
   --------------------------------------------------------- */

function match(helper) {
  const { body, step, level, feedback, unlockNext, grantStar } = helper;
  let activeLeft = null;
  let attempts = 0;
  const solved = new Set();

  const counter = el("p", { class: "muted", "aria-live": "polite" });

  const grid = el("div", { class: "match-grid" });
  const leftColumn = el("div", { class: "match-column" }, [
    el("h3", { class: "match-title", text: step.leftTitle || "Escritura logarítmica" })
  ]);
  const rightColumn = el("div", { class: "match-column" }, [
    el("h3", { class: "match-title", text: step.rightTitle || "Potencia" })
  ]);
  grid.append(leftColumn, rightColumn);

  const leftCards = step.pairs.map((pair, index) => {
    const card = el("button", {
      class: "match-card", type: "button", "aria-pressed": "false",
      dataset: { card: pair.left },
      onClick: () => selectLeft(index)
    }, [withMath(pair.left)]);
    leftColumn.appendChild(card);
    return card;
  });

  const rightItems = shuffle([
    ...step.pairs.map((pair, index) => ({ text: pair.right, pairIndex: index })),
    ...(step.distractors || []).map((text) => ({ text, pairIndex: -1 }))
  ]);

  const rightCards = rightItems.map((item, index) => {
    const card = el("button", {
      class: "match-card", type: "button",
      dataset: { card: item.text },
      onClick: () => selectRight(index)
    }, [withMath(item.text)]);
    rightColumn.appendChild(card);
    return card;
  });

  body.append(grid, counter);
  updateCounter();

  function updateCounter() {
    counter.textContent = `${solved.size} de ${step.pairs.length} equivalencias reconstruidas.`;
  }

  function selectLeft(index) {
    if (solved.has(index)) return;
    activeLeft = activeLeft === index ? null : index;
    leftCards.forEach((card, i) => {
      card.setAttribute("aria-pressed", String(i === activeLeft));
      if (!solved.has(i)) delete card.dataset.result;
    });
  }

  function selectRight(index) {
    const item = rightItems[index];
    if (rightCards[index].disabled) return;

    if (activeLeft === null) {
      feedback("info", "Elegí primero una tarjeta de la columna izquierda.");
      return;
    }

    if (item.pairIndex === activeLeft) {
      solved.add(activeLeft);
      leftCards[activeLeft].dataset.result = "matched";
      leftCards[activeLeft].disabled = true;
      leftCards[activeLeft].setAttribute("aria-pressed", "false");
      rightCards[index].dataset.result = "matched";
      rightCards[index].disabled = true;
      activeLeft = null;
      updateCounter();

      if (solved.size === step.pairs.length) {
        grantStar();
        feedback("correct", step.successMessage || "Calculadora en condiciones de seguir.");
        unlockNext();
      } else {
        feedback("correct", step.pairMessage || "Equivalencia correcta. Seguí con la siguiente.");
      }
      return;
    }

    attempts += 1;
    registerAttempt(level.id);
    rightCards[index].dataset.result = "wrong";
    setTimeout(() => {
      // Puede haberse emparejado bien mientras tanto: solo se limpia el error.
      if (rightCards[index].dataset.result === "wrong") delete rightCards[index].dataset.result;
    }, 900);
    feedback(
      attempts === 1 ? "close" : "wrong",
      gradedHint(step.hints, attempts) || "Esa potencia no corresponde a ese logaritmo."
    );
  }
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/* ---------------------------------------------------------
   Formulario de carga (valores, intervalos y elecciones)
   --------------------------------------------------------- */

function fields(helper) {
  const { body, step, level, feedback, unlockNext, footer, grantStar } = helper;

  if (step.math) body.appendChild(renderMath(step.math, { display: true }));
  if (step.paperNote) body.appendChild(paperPanel(step.paperNote));

  const grid = el("div", { class: `field-grid ${step.columns === 2 ? "cols-2" : ""}` });
  body.appendChild(grid);

  const items = step.fields.map((field, index) => {
    const wrapper = el("div", { class: "field" });
    const id = `field-${index}`;
    const label = el("label", { for: id });
    label.appendChild(withMath(field.label));
    wrapper.appendChild(label);

    const note = el("p", { class: "field-note" });
    const item = { field, wrapper, note, attempts: 0, solved: false, selected: null };

    if (field.type === "choice") {
      const options = el("div", { class: "options options-compact", role: "group" });
      item.buttons = field.options.map((text, optionIndex) => {
        const button = optionButton(text, optionIndex, (chosen) => {
          if (item.solved) return;
          item.selected = chosen;
          item.buttons.forEach((other, i) => other.setAttribute("aria-pressed", String(i === chosen)));
        });
        options.appendChild(button);
        return button;
      });
      wrapper.appendChild(options);
    } else {
      const input = el("input", {
        type: "text", id, inputmode: "text", autocomplete: "off",
        placeholder: field.placeholder || ""
      });
      item.input = input;
      wrapper.appendChild(input);
    }

    if (field.help) wrapper.appendChild(el("p", { class: "field-help", text: field.help }));
    wrapper.appendChild(note);
    grid.appendChild(wrapper);
    return item;
  });

  const checkButton = el("button", {
    class: "btn btn-secondary",
    text: step.checkLabel || "Comprobar respuestas",
    onClick: run
  });
  footer.appendChild(checkButton);

  function validateItem(item) {
    const { field } = item;
    if (field.type === "choice") {
      if (item.selected === null) return null;
      return validateChoice(item.selected, field.expected);
    }
    const raw = item.input.value.trim();
    if (!raw) return null;
    if (field.type === "interval") return validateIntervalSet(raw, field.expected, field.tolerance);
    return validateNumber(raw, field.expected, field.tolerance ?? 0.001);
  }

  function run() {
    let anyChecked = false;
    const pending = [];

    items.forEach((item) => {
      if (item.solved) return;
      const result = validateItem(item);
      if (result === null) {
        item.wrapper.dataset.result = "";
        item.note.textContent = "";
        return;
      }
      anyChecked = true;

      if (result.ok) {
        item.solved = true;
        item.wrapper.dataset.result = "correct";
        item.note.dataset.result = "correct";
        item.note.textContent = "✓ Correcto";
        if (item.input) item.input.disabled = true;
        if (item.buttons) {
          item.buttons.forEach((button, index) => {
            button.disabled = true;
            if (index === item.field.expected) button.dataset.result = "correct";
          });
        }
      } else {
        item.attempts += 1;
        registerAttempt(level.id);
        item.wrapper.dataset.result = "wrong";
        item.note.dataset.result = "wrong";
        const reasonNote = result.reason === "openness"
          ? "Los extremos son los correctos, pero revisá si el intervalo es abierto o cerrado. "
          : result.reason === "unreadable"
            ? "No pudimos interpretar esa escritura. "
            : "";
        const hint = gradedHint(item.field.hints, item.attempts) || "Revisá ese valor.";
        item.note.textContent = "";
        item.note.appendChild(withMath(`${reasonNote}${hint}`));
        pending.push(item);
      }
    });

    const solved = items.filter((item) => item.solved).length;

    if (!anyChecked && solved < items.length) {
      feedback("info", "Completá al menos una respuesta antes de comprobar.");
      return;
    }

    if (solved === items.length) {
      checkButton.remove();
      grantStar();
      feedback("correct", step.successMessage || "Todas las respuestas son correctas.");
      unlockNext();
      return;
    }

    feedback(
      pending.length === 1 ? "close" : "wrong",
      `Van ${solved} de ${items.length}. Revisá las respuestas marcadas: cada una tiene su indicación.`
    );
  }
}

/* ---------------------------------------------------------
   Máquina de operaciones
   --------------------------------------------------------- */

function machine(helper) {
  const { body, step, feedback, unlockNext, grantStar } = helper;
  const tried = new Set();

  const diagram = el("p", { class: "machine-diagram" }, [
    withMath(step.machine.label)
  ]);
  body.appendChild(diagram);

  const controls = el("div", { class: "control" });
  controls.appendChild(el("div", { class: "control-head" }, [
    el("label", { for: "machine-input", text: step.inputLabel || "Valor de entrada" })
  ]));
  const row = el("div", { class: "control-row" });
  const input = el("input", { type: "number", id: "machine-input", step: "any", placeholder: "x" });
  const runButton = el("button", { class: "btn btn-secondary", text: "Procesar", onClick: run });
  row.append(input, runButton);
  controls.appendChild(row);
  body.appendChild(controls);

  const table = el("table", { class: "points-table" }, [
    el("caption", { text: "Registro de pruebas. Copialo también en tu carpeta." }),
    el("thead", {}, [
      el("tr", {}, [
        el("th", { scope: "col", text: "Entrada (x)" }),
        // La última operación produce la salida, así que no lleva columna propia.
        ...step.machine.operations.slice(0, -1).map((operation) => el("th", { scope: "col", text: operation.label })),
        el("th", { scope: "col", text: "Salida (y)" })
      ])
    ])
  ]);
  const tbody = el("tbody");
  table.appendChild(tbody);
  body.appendChild(table);

  const progressNote = el("p", { class: "muted", "aria-live": "polite" });
  body.appendChild(progressNote);
  updateNote();

  function updateNote() {
    const missing = Math.max(0, (step.minTries || 3) - tried.size);
    progressNote.textContent = missing
      ? `Probá ${missing} ${missing === 1 ? "entrada distinta más" : "entradas distintas más"} para completar la exploración.`
      : "Exploración completa.";
  }

  function run() {
    const raw = input.value.trim();
    const value = Number(raw.replace(",", "."));
    if (!raw || Number.isNaN(value)) {
      feedback("info", "Escribí un número para probar la máquina.");
      return;
    }

    let current = value;
    const cells = [el("th", { scope: "row", text: formatNumber(value) })];
    const last = step.machine.operations.length - 1;
    step.machine.operations.forEach((operation, index) => {
      current = operation.apply(current);
      if (index < last) cells.push(el("td", { text: formatNumber(current) }));
    });
    cells.push(el("td", { class: "machine-output", text: formatNumber(current) }));
    tbody.appendChild(el("tr", {}, cells));

    tried.add(value);
    updateNote();
    input.value = "";

    if (tried.size >= (step.minTries || 3)) {
      grantStar();
      unlockNext();
      feedback("correct", step.successMessage || "Ya tenés suficientes pruebas para buscar la regla inversa.");
    }
  }
}

/* ---------------------------------------------------------
   Cadena de operaciones inversas
   --------------------------------------------------------- */

function sequence(helper) {
  const { body, step, level, feedback, unlockNext, footer, grantStar } = helper;
  const chosen = [];
  let attempts = 0;

  const chain = el("p", { class: "chain", "aria-live": "polite" });
  body.appendChild(chain);

  const pool = el("div", { class: "chip-row" });
  step.pool.forEach((operation) => {
    pool.appendChild(el("button", {
      class: "chip", type: "button", text: operation.label,
      onClick: () => add(operation.id)
    }));
  });
  body.appendChild(el("h3", { class: "section-title", text: "Operaciones disponibles" }));
  body.appendChild(pool);

  const undo = el("button", {
    class: "btn btn-ghost", text: "Quitar la última", onClick: removeLast
  });
  body.appendChild(el("div", { class: "btn-row" }, [undo]));

  const checkButton = el("button", { class: "btn btn-secondary", text: "Comprobar la cadena", onClick: run });
  checkButton.disabled = true;
  footer.appendChild(checkButton);

  function label(id) {
    return step.pool.find((operation) => operation.id === id)?.label || "?";
  }

  function render() {
    const parts = [step.from || "y"];
    for (let i = 0; i < step.answer.length; i += 1) {
      parts.push(chosen[i] ? label(chosen[i]) : "?");
    }
    parts.push(step.to || "x");
    chain.textContent = parts.join("  →  ");
    checkButton.disabled = chosen.length !== step.answer.length;
    undo.disabled = chosen.length === 0;
  }

  function add(id) {
    if (chosen.length >= step.answer.length) {
      feedback("info", "La cadena ya está completa. Quitá una operación si querés cambiarla.");
      return;
    }
    chosen.push(id);
    render();
  }

  function removeLast() {
    chosen.pop();
    render();
  }

  function run() {
    const result = validateSequence(chosen, step.answer);
    if (result.ok) {
      grantStar();
      checkButton.remove();
      undo.disabled = true;
      pool.querySelectorAll("button").forEach((button) => { button.disabled = true; });
      feedback("correct", step.successMessage || "La cadena inversa está bien armada.");
      unlockNext();
      return;
    }

    attempts += 1;
    registerAttempt(level.id);
    const message = result.reason === "order" && step.orderHint
      ? step.orderHint
      : gradedHint(step.hints, attempts) || "Revisá qué operaciones elegiste y en qué orden.";
    feedback(attempts === 1 ? "close" : "wrong", message);
  }

  render();
}

/* ---------------------------------------------------------
   Elección de gráfica
   --------------------------------------------------------- */

function graphChoice(helper) {
  const { body, step, level, feedback, unlockNext, footer, grantStar } = helper;
  let selected = null;
  let attempts = 0;

  const grid = el("div", { class: "graph-choice" });
  const buttons = step.options.map((option, index) => {
    const button = el("button", {
      class: "graph-option", type: "button", "aria-pressed": "false",
      onClick: () => select(index)
    });
    button.appendChild(el("span", { class: "graph-option-label", text: `${String.fromCharCode(65 + index)} · ${option.label}` }));

    const host = el("div");
    button.appendChild(host);
    createGraph(host, {
      range: option.range || step.range,
      square: option.square ?? step.square,
      description: option.description,
      curves: toCurves(option.curves),
      readout: []
    });

    button.appendChild(el("span", { class: "graph-option-alt", text: option.description }));
    grid.appendChild(button);
    return button;
  });
  body.appendChild(grid);

  const checkButton = el("button", { class: "btn btn-secondary", text: "Comprobar elección", onClick: run });
  checkButton.disabled = true;
  footer.appendChild(checkButton);

  function select(index) {
    selected = index;
    buttons.forEach((button, i) => {
      button.setAttribute("aria-pressed", String(i === index));
      delete button.dataset.result;
    });
    checkButton.disabled = false;
  }

  function run() {
    if (selected === null) return;
    const result = validateChoice(selected, step.correct);
    if (result.ok) {
      buttons[selected].dataset.result = "correct";
      buttons.forEach((button) => { button.disabled = true; });
      checkButton.remove();
      grantStar();
      feedback("correct", step.successMessage || "Esa es la gráfica que puede ser la inversa.");
      unlockNext();
      return;
    }

    attempts += 1;
    registerAttempt(level.id);
    buttons[selected].dataset.result = "wrong";
    feedback(
      attempts === 1 ? "close" : "wrong",
      gradedHint(step.hints, attempts) || "Comprobá con un par de puntos intercambiados."
    );
    checkButton.disabled = true;
    selected = null;
    buttons.forEach((button) => button.setAttribute("aria-pressed", "false"));
  }
}

/* ---------------------------------------------------------
   Registro
   --------------------------------------------------------- */

export const STEP_RENDERERS = {
  brief,
  prediction,
  paper,
  points,
  check,
  lab,
  conclusion,
  match,
  fields,
  machine,
  sequence,
  "graph-choice": graphChoice
};
