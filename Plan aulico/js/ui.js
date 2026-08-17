/**
 * Piezas de interfaz compartidas.
 * Todo el feedback es visual + textual: Logaria no usa sonido.
 */

import { withMath } from "./math.js";

export function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(props).forEach(([key, value]) => {
    if (value === null || value === undefined || value === false) return;
    if (key === "class") node.className = value;
    else if (key === "text") node.textContent = value;
    else if (key === "html") node.innerHTML = value;
    else if (key.startsWith("on") && typeof value === "function") node.addEventListener(key.slice(2).toLowerCase(), value);
    else if (key === "dataset") Object.assign(node.dataset, value);
    else node.setAttribute(key, value === true ? "" : value);
  });
  (Array.isArray(children) ? children : [children])
    .filter((child) => child !== null && child !== undefined && child !== false)
    .forEach((child) => node.appendChild(typeof child === "string" ? document.createTextNode(child) : child));
  return node;
}

/** Párrafo que admite matemática entre signos $: "el dominio es $x > 0$". */
export function paragraph(text, className = "") {
  const node = el("p", { class: className });
  node.appendChild(withMath(text));
  return node;
}

export function showToast(message, duration = 4200) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => { toast.hidden = true; }, duration);
}

const TONE_TAGS = {
  correct: "Correcto",
  close: "Casi",
  wrong: "Todavía no",
  info: "Para tener en cuenta"
};

/**
 * Recuadro de devolución. Nunca dice solo «incorrecto»: el texto siempre
 * orienta qué revisar.
 */
export function feedbackBox(tone, text, tagOverride) {
  const box = el("div", { class: "feedback", dataset: { tone }, role: "status", "aria-live": "polite" });
  box.appendChild(el("span", { class: "feedback-tag", text: `${tagOverride || TONE_TAGS[tone] || ""}:` }));
  box.appendChild(paragraph(text));
  return box;
}

export function starsRow(earned, total, names = {}) {
  const row = el("span", { class: "stars", "aria-label": `${earned} de ${total} estrellas` });
  const keys = Object.keys(names);
  for (let i = 0; i < total; i += 1) {
    const star = el("span", { class: i < earned ? "" : "star-off", text: "★" });
    if (keys[i]) star.title = names[keys[i]];
    row.appendChild(star);
  }
  return row;
}

export function clearNode(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}
