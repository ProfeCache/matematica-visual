/**
 * Validadores de Logaria.
 *
 * Decisión registrada en el README: se valida el significado matemático, no la
 * forma textual exacta. Un mismo intervalo puede escribirse con notación de
 * intervalo, con desigualdad o eligiéndolo en el gráfico, y las tres formas
 * deben aceptarse.
 */

const INFINITE = Number.POSITIVE_INFINITY;

/* ---------------------------------------------------------
   Números
   --------------------------------------------------------- */

/** Acepta "1/2", "0,5", "-3", "inf", "∞". Devuelve NaN si no es interpretable. */
export function parseNumber(raw) {
  if (typeof raw === "number") return raw;
  if (raw === null || raw === undefined) return NaN;

  let text = String(raw).trim().toLowerCase();
  if (!text) return NaN;

  text = text
    .replace(/\s+/g, "")
    .replace(/−/g, "-")
    .replace(/,/g, ".");

  if (/^[+]?(inf(inito)?|∞)$/.test(text)) return INFINITE;
  if (/^-(inf(inito)?|∞)$/.test(text)) return -INFINITE;

  const fraction = text.match(/^([+-]?\d*\.?\d+)\/([+-]?\d*\.?\d+)$/);
  if (fraction) {
    const denominator = Number(fraction[2]);
    if (denominator === 0) return NaN;
    return Number(fraction[1]) / denominator;
  }

  if (!/^[+-]?\d*\.?\d+$/.test(text)) return NaN;
  return Number(text);
}

export function validateNumber(raw, expected, tolerance = 0.05) {
  const value = parseNumber(raw);
  if (Number.isNaN(value)) return { ok: false, reason: "empty", value };
  return { ok: Math.abs(value - expected) <= tolerance, reason: "value", value };
}

/* ---------------------------------------------------------
   Puntos
   --------------------------------------------------------- */

/**
 * Compara un par ordenado con el esperado.
 * Tolerancia por omisión ±0,05, según la escala habitual de los gráficos.
 */
export function validatePoint(input, expected, tolerance = 0.05) {
  const x = parseNumber(input.x);
  const y = parseNumber(input.y);

  if (Number.isNaN(x) || Number.isNaN(y)) {
    return { ok: false, reason: "empty", axis: null };
  }
  const okX = Math.abs(x - expected.x) <= tolerance;
  const okY = Math.abs(y - expected.y) <= tolerance;

  if (okX && okY) return { ok: true, reason: "match", axis: null, value: { x, y } };
  if (okX && !okY) return { ok: false, reason: "y", axis: "y", value: { x, y } };
  if (!okX && okY) return { ok: false, reason: "x", axis: "x", value: { x, y } };
  return { ok: false, reason: "both", axis: "both", value: { x, y } };
}

/* ---------------------------------------------------------
   Intervalos
   --------------------------------------------------------- */

/** Un tramo: { min, max, minOpen, maxOpen }. Un conjunto: lista de tramos. */
function piece(min, max, minOpen = true, maxOpen = true) {
  return { min, max, minOpen, maxOpen };
}

function normalizeText(raw) {
  return String(raw ?? "")
    .toLowerCase()
    .replace(/−/g, "-")
    .replace(/\s+/g, " ")
    .replace(/infinito|infty|inf\b/g, "∞")
    .trim();
}

function parseBound(raw) {
  const text = String(raw).trim();
  if (/^[+]?∞$/.test(text)) return INFINITE;
  if (/^-∞$/.test(text)) return -INFINITE;
  return parseNumber(text);
}

function parseChunk(chunkRaw) {
  const chunk = chunkRaw.trim().replace(/;/g, ",");
  if (!chunk) return null;

  if (/^(r|reales|todos los reales|todo r)$/.test(chunk)) return [piece(-INFINITE, INFINITE)];
  if (/^(∅|vacio|vacío|ninguno|no hay|conjunto vacio|conjunto vacío)$/.test(chunk)) return [];

  // Notación de intervalo: (3, ∞) · [2, 5) · ]3, 5[
  const interval = chunk.match(/^([[\]()])\s*([^,]+)\s*,\s*([^,\]()[]+)\s*([[\]()])$/);
  if (interval) {
    const min = parseBound(interval[2]);
    const max = parseBound(interval[3]);
    if (Number.isNaN(min) || Number.isNaN(max)) return null;
    const minOpen = interval[1] === "(" || interval[1] === "]";
    const maxOpen = interval[4] === ")" || interval[4] === "[";
    return [piece(min, max, minOpen || !Number.isFinite(min), maxOpen || !Number.isFinite(max))];
  }

  // Desigualdad doble: 1 < x < 4 · 2 ≤ x < 7
  const double = chunk.match(/^([^<>≤≥]+)\s*(<=|<|≤)\s*[a-z]\s*(<=|<|≤)\s*([^<>≤≥]+)$/);
  if (double) {
    const min = parseBound(double[1]);
    const max = parseBound(double[4]);
    if (Number.isNaN(min) || Number.isNaN(max)) return null;
    return [piece(min, max, double[2] === "<", double[3] === "<")];
  }

  // Desigualdad simple: x > 3 · 3 < x · x ≥ -2
  const simple = chunk.match(/^(.+?)\s*(<=|>=|<|>|≤|≥)\s*(.+)$/);
  if (simple) {
    const left = simple[1].trim();
    const operator = simple[2];
    const right = simple[3].trim();
    const leftIsVar = /^[a-z]$/.test(left);
    const rightIsVar = /^[a-z]$/.test(right);
    if (!leftIsVar && !rightIsVar) return null;

    const bound = parseBound(leftIsVar ? right : left);
    if (Number.isNaN(bound)) return null;

    // Con la variable a la derecha, la desigualdad se lee al revés.
    const flipped = rightIsVar
      ? { "<": ">", ">": "<", "<=": ">=", ">=": "<=", "≤": "≥", "≥": "≤" }[operator]
      : operator;

    const open = flipped === "<" || flipped === ">";
    if (flipped === ">" || flipped === "≥" || flipped === ">=") return [piece(bound, INFINITE, open, true)];
    return [piece(-INFINITE, bound, true, open)];
  }

  return null;
}

/** Convierte texto libre en una lista de tramos, o `null` si no se entiende. */
export function parseIntervalSet(raw) {
  const text = normalizeText(raw);
  if (!text) return null;

  const chunks = text.split(/∪|\bu\b|\by\b|\+\+/).map((chunk) => chunk.trim()).filter(Boolean);
  if (!chunks.length) return null;

  const pieces = [];
  for (const chunk of chunks) {
    const parsed = parseChunk(chunk);
    if (parsed === null) return null;
    pieces.push(...parsed);
  }
  return mergePieces(pieces);
}

function mergePieces(pieces) {
  const sorted = [...pieces].sort((a, b) => a.min - b.min);
  const merged = [];
  for (const current of sorted) {
    const last = merged[merged.length - 1];
    if (last && (current.min < last.max || (current.min === last.max && (!current.minOpen || !last.maxOpen)))) {
      if (current.max > last.max) {
        last.max = current.max;
        last.maxOpen = current.maxOpen;
      }
    } else {
      merged.push({ ...current });
    }
  }
  return merged;
}

function samePiece(a, b, tolerance) {
  const sameBound = (x, y) => {
    if (!Number.isFinite(x) || !Number.isFinite(y)) return x === y;
    return Math.abs(x - y) <= tolerance;
  };
  return sameBound(a.min, b.min) && sameBound(a.max, b.max) && a.minOpen === b.minOpen && a.maxOpen === b.maxOpen;
}

/**
 * `expected` puede escribirse igual que la respuesta del estudiante:
 * "x > 3", "(3, ∞)" y "3 < x" se consideran el mismo conjunto.
 */
export function validateIntervalSet(raw, expected, tolerance = 0.05) {
  const answer = parseIntervalSet(raw);
  if (answer === null) return { ok: false, reason: "unreadable" };

  const target = Array.isArray(expected) && expected.every((item) => typeof item === "object")
    ? mergePieces(expected)
    : parseIntervalSet(Array.isArray(expected) ? expected.join(" ∪ ") : expected);

  if (target === null) return { ok: false, reason: "unreadable" };
  if (answer.length !== target.length) return { ok: false, reason: "shape", answer };

  const ok = answer.every((item, index) => samePiece(item, target[index], tolerance));
  if (ok) return { ok: true, reason: "match", answer };

  // Mismos extremos pero abierto/cerrado distinto: es un error frecuente y
  // merece una devolución específica.
  const sameBounds = answer.every((item, index) => {
    const other = target[index];
    const close = (x, y) => (!Number.isFinite(x) || !Number.isFinite(y) ? x === y : Math.abs(x - y) <= tolerance);
    return close(item.min, other.min) && close(item.max, other.max);
  });
  return { ok: false, reason: sameBounds ? "openness" : "bounds", answer };
}

/* ---------------------------------------------------------
   Opciones
   --------------------------------------------------------- */

export function validateChoice(selectedIndex, correctIndex) {
  return { ok: selectedIndex === correctIndex, reason: "choice" };
}

export function validateMultiChoice(selected, correct) {
  const a = [...selected].sort();
  const b = [...correct].sort();
  const ok = a.length === b.length && a.every((value, index) => value === b[index]);
  const missing = b.filter((value) => !a.includes(value)).length;
  const extra = a.filter((value) => !b.includes(value)).length;
  return { ok, reason: ok ? "match" : missing && !extra ? "missing" : "extra", missing, extra };
}

/* ---------------------------------------------------------
   Secuencias de operaciones
   --------------------------------------------------------- */

/**
 * Compara una cadena de operaciones con la esperada.
 * Distingue el error de orden del error de operaciones porque son dos
 * dificultades distintas: invertir cada operación y además invertir el orden.
 */
export function validateSequence(answer, expected) {
  const ok = answer.length === expected.length && answer.every((item, index) => item === expected[index]);
  if (ok) return { ok: true, reason: "match" };

  const sameItems =
    answer.length === expected.length &&
    [...answer].sort().join("|") === [...expected].sort().join("|");
  return { ok: false, reason: sameItems ? "order" : "items" };
}

/* ---------------------------------------------------------
   Superposición de curvas
   --------------------------------------------------------- */

/**
 * Compara dos funciones evaluándolas en puntos de control.
 * No se exige coincidencia píxel a píxel: alcanza con que la curva del
 * estudiante quede dentro de la tolerancia gráfica en todos los controles.
 */
export function validateOverlay(studentFn, targetFn, samples, tolerance = 0.2) {
  let worst = 0;
  let worstX = null;
  for (const x of samples) {
    const a = studentFn(x);
    const b = targetFn(x);
    if (!Number.isFinite(a) || !Number.isFinite(b)) return { ok: false, reason: "domain", x };
    const difference = Math.abs(a - b);
    if (difference > worst) {
      worst = difference;
      worstX = x;
    }
  }
  return { ok: worst <= tolerance, reason: worst <= tolerance ? "match" : "distance", worst, worstX };
}

/* ---------------------------------------------------------
   Retroalimentación gradual
   --------------------------------------------------------- */

/**
 * Primer error: indicio. Segundo: pregunta orientadora. Recién después, pista
 * explícita. Nunca el procedimiento completo.
 */
export function gradedHint(hints, attempt) {
  if (!hints || !hints.length) return null;
  const index = Math.min(Math.max(attempt, 1) - 1, hints.length - 1);
  return hints[index];
}
