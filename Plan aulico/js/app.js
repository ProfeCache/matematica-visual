/**
 * Arranque y navegación de Logaria.
 *
 * La aplicación se sirve desde una URL (GitHub Pages), así que puede usar
 * módulos ES y mantener los datos separados de la interfaz.
 * Rutas: #/mapa y #/nivel/<id>.
 */

import { renderMapView } from "./map-view.js";
import { renderLevelView } from "./level-view.js";
import { levels } from "./levels.js";
import { getSummary, onProgressChange } from "./progress.js";

const root = document.getElementById("contenido");

function goToMap() {
  window.location.hash = "#/mapa";
}

function goToLevel(id) {
  window.location.hash = `#/nivel/${id}`;
}

function updateTopbarProgress() {
  const summary = getSummary(levels);
  const percentage = summary.total ? Math.round((summary.completed / summary.total) * 100) : 0;
  const fill = document.getElementById("progressFill");
  const text = document.getElementById("progressText");
  if (fill) fill.style.width = `${percentage}%`;
  if (text) text.textContent = `${summary.completed} de ${summary.total} niveles superados · ${summary.stars} ★`;
}

function route() {
  const hash = window.location.hash || "#/mapa";
  const levelMatch = hash.match(/^#\/nivel\/(\d+)$/);

  if (levelMatch) {
    renderLevelView(root, Number(levelMatch[1]), { goToMap, goToLevel });
  } else {
    renderMapView(root, { goToLevel });
  }
  updateTopbarProgress();
  window.scrollTo({ top: 0, behavior: "auto" });
}

window.addEventListener("hashchange", route);
onProgressChange(() => {
  updateTopbarProgress();
  if (!/^#\/nivel\//.test(window.location.hash)) route();
});

/**
 * KaTeX se carga con `defer`. Si llega después del primer dibujado, se vuelve
 * a renderizar para que las fórmulas no queden en su alternativa textual.
 */
window.addEventListener("load", () => {
  if (window.katex && root.querySelector(".math-fallback")) route();
});

route();
