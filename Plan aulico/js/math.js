/**
 * Utilidades matemáticas y de renderizado de fórmulas.
 * Las expresiones se muestran con KaTeX; si la librería no está disponible
 * se cae a un texto legible, nunca a una fórmula rota.
 */

export function logBase(value, base) {
  return Math.log(value) / Math.log(base);
}

/**
 * f(x) = log_c(a·x − k) + b  (convención de signo definida en el README).
 * Devuelve la función, su frontera de dominio y su sentido de crecimiento.
 */
export function makeLogFunction({ c = 2, a = 1, k = 0, b = 0 }) {
  const fn = (x) => {
    const argument = a * x - k;
    if (argument <= 0) return NaN;
    return logBase(argument, c) + b;
  };
  fn.params = { c, a, k, b };
  fn.boundary = a === 0 ? null : k / a;
  fn.increasing = (c > 1) === (a > 0);
  return fn;
}

/** Formatea un número para mostrarlo: sin ceros de más y con coma decimal. */
export function formatNumber(value, decimals = 2) {
  if (!Number.isFinite(value)) return value > 0 ? "+∞" : "−∞";
  const rounded = Number(value.toFixed(decimals));
  return String(rounded).replace(".", ",").replace("-", "−");
}

/** Escribe la base como fracción cuando corresponde: 0.5 → \frac{1}{2}. */
export function baseToLatex(c) {
  const inverse = 1 / c;
  if (c < 1 && Math.abs(inverse - Math.round(inverse)) < 1e-9) {
    return `\\frac{1}{${Math.round(inverse)}}`;
  }
  return String(c).replace(".", ",");
}

/** Arma el LaTeX de f(x) = log_c(ax − k) + b omitiendo los términos neutros. */
export function logFunctionLatex({ c = 2, a = 1, k = 0, b = 0 }, name = "f") {
  const factor = a === 1 ? "x" : a === -1 ? "-x" : `${String(a).replace(".", ",")}x`;
  const shift = k === 0 ? "" : k > 0 ? ` - ${String(k).replace(".", ",")}` : ` + ${String(Math.abs(k)).replace(".", ",")}`;
  const vertical = b === 0 ? "" : b > 0 ? ` + ${String(b).replace(".", ",")}` : ` - ${String(Math.abs(b)).replace(".", ",")}`;
  return `${name}(x) = \\log_{${baseToLatex(c)}}(${factor}${shift})${vertical}`;
}

/**
 * Renderiza LaTeX dentro de un elemento. Se usa siempre que haya matemática:
 * el README pide una diferencia visual clara entre la consigna y la fórmula.
 */
export function renderMath(latex, { display = false } = {}) {
  const element = document.createElement(display ? "div" : "span");
  element.className = display ? "math math-block" : "math";
  if (window.katex) {
    try {
      window.katex.render(latex, element, { displayMode: display, throwOnError: false });
      return element;
    } catch (error) {
      console.warn("KaTeX no pudo renderizar la expresión:", error);
    }
  }
  element.classList.add("math-fallback");
  element.textContent = latexToPlainText(latex);
  return element;
}

const SUBSCRIPTS = { "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉", "/": "⁄", "-": "₋" };
const SUPERSCRIPTS = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "-": "⁻", "?": "?" };

function mapChars(text, table) {
  return [...text].map((char) => table[char] ?? char).join("");
}

/**
 * Alternativa textual de una expresión: se usa cuando KaTeX no está disponible
 * y también en las fichas de datos del gráfico, donde el texto debe poder
 * leerse sin depender del renderizado matemático.
 */
export function latexToPlainText(latex) {
  return latex
    .replace(/\\frac\{(\d+)\}\{(\d+)\}/g, "$1/$2")
    .replace(/\\log_\{([^{}]+)\}/g, (_, base) => `log${mapChars(base, SUBSCRIPTS)}`)
    .replace(/\^\{([^{}]+)\}/g, (_, exponent) => mapChars(exponent, SUPERSCRIPTS))
    .replace(/\\cdot/g, "·")
    .replace(/\\left|\\right/g, "")
    .replace(/[{}]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Inserta matemática dentro de texto usando el delimitador $…$. */
export function withMath(text) {
  const fragment = document.createDocumentFragment();
  const parts = String(text).split("$");
  parts.forEach((part, index) => {
    if (index % 2 === 1) {
      fragment.appendChild(renderMath(part));
    } else if (part) {
      fragment.appendChild(document.createTextNode(part));
    }
  });
  return fragment;
}
