/**
 * Plano cartesiano de Logaria (SVG).
 *
 * Convención cromática estable en todos los niveles:
 *   azul = función original · violeta = función transformada
 *   turquesa = producción del estudiante · ámbar = asíntota o frontera
 *
 * El gráfico nunca dibuja la curva antes de que el estudiante produzca:
 * es quien lo usa el que decide cuándo pasar `showCurve: true`.
 */

import { formatNumber } from "./math.js";

const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * En pantallas angostas el plano usa un lienzo más chico: al escalarse al ancho
 * disponible, los números de los ejes quedan legibles sin obligar a hacer zoom.
 */
const LAYOUTS = {
  wide: { width: 640, height: 440, padding: 34, font: 13 },
  compact: { width: 400, height: 340, padding: 30, font: 16 }
};

/**
 * Lienzo cuadrado: se usa cuando la actividad necesita que las dos escalas
 * coincidan, por ejemplo para que la recta y = x se vea a 45° y la simetría
 * entre una función y su inversa sea creíble.
 */
const SQUARE_LAYOUTS = {
  wide: { width: 460, height: 460, padding: 34, font: 13 },
  compact: { width: 360, height: 360, padding: 30, font: 15 }
};

const COLORS = {
  base: "var(--graph-function-base)",
  transformed: "var(--graph-function-transformed)",
  student: "var(--graph-student)",
  target: "var(--graph-function-transformed)",
  asymptote: "var(--graph-asymptote)",
  guide: "var(--graph-axis)"
};

export function createGraph(container, initial = {}) {
  const state = {
    range: { xMin: -1, xMax: 10, yMin: -4, yMax: 4 },
    curves: [],
    points: [],
    asymptote: null,
    grid: true,
    ...initial
  };

  const shell = document.createElement("div");
  shell.className = "graph-shell";
  container.appendChild(shell);

  const readout = document.createElement("div");
  readout.className = "graph-readout";
  container.appendChild(readout);

  let { width: WIDTH, height: HEIGHT, padding: PADDING, font: FONT } = LAYOUTS.wide;

  function pickLayout() {
    // Antes de estar en el documento el contenedor no tiene ancho medible:
    // en ese caso se decide con el ancho de la ventana.
    const available = shell.clientWidth || container.clientWidth || window.innerWidth;
    const set = state.square ? SQUARE_LAYOUTS : LAYOUTS;
    const layout = available < 480 ? set.compact : set.wide;
    WIDTH = layout.width;
    HEIGHT = layout.height;
    PADDING = layout.padding;
    FONT = layout.font;
  }

  function toScreen(x, y) {
    const { xMin, xMax, yMin, yMax } = state.range;
    return {
      sx: PADDING + ((x - xMin) / (xMax - xMin)) * (WIDTH - PADDING * 2),
      sy: HEIGHT - PADDING - ((y - yMin) / (yMax - yMin)) * (HEIGHT - PADDING * 2)
    };
  }

  function element(tag, attributes) {
    const node = document.createElementNS(SVG_NS, tag);
    Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
    return node;
  }

  function drawGrid(svg) {
    const { xMin, xMax, yMin, yMax } = state.range;
    for (let x = Math.ceil(xMin); x <= xMax; x += 1) {
      const { sx } = toScreen(x, 0);
      svg.appendChild(element("line", {
        x1: sx, y1: PADDING, x2: sx, y2: HEIGHT - PADDING,
        stroke: "var(--graph-grid)", "stroke-width": 1, opacity: x === 0 ? 0 : .55
      }));
    }
    for (let y = Math.ceil(yMin); y <= yMax; y += 1) {
      const { sy } = toScreen(0, y);
      svg.appendChild(element("line", {
        x1: PADDING, y1: sy, x2: WIDTH - PADDING, y2: sy,
        stroke: "var(--graph-grid)", "stroke-width": 1, opacity: y === 0 ? 0 : .55
      }));
    }
  }

  function drawAxes(svg) {
    const { xMin, xMax, yMin, yMax } = state.range;
    const origin = toScreen(0, 0);
    const axisY = Math.min(Math.max(origin.sy, PADDING), HEIGHT - PADDING);
    const axisX = Math.min(Math.max(origin.sx, PADDING), WIDTH - PADDING);

    svg.appendChild(element("line", {
      x1: PADDING, y1: axisY, x2: WIDTH - PADDING, y2: axisY,
      stroke: "var(--graph-axis)", "stroke-width": 1.6
    }));
    svg.appendChild(element("line", {
      x1: axisX, y1: PADDING, x2: axisX, y2: HEIGHT - PADDING,
      stroke: "var(--graph-axis)", "stroke-width": 1.6
    }));

    const step = xMax - xMin > 14 ? 2 : 1;
    for (let x = Math.ceil(xMin); x <= xMax; x += step) {
      if (x === 0) continue;
      const { sx } = toScreen(x, 0);
      const label = element("text", {
        x: sx, y: axisY + FONT + 3, fill: "var(--graph-axis)",
        "font-size": FONT, "text-anchor": "middle"
      });
      label.textContent = String(x).replace("-", "−");
      svg.appendChild(label);
    }
    for (let y = Math.ceil(yMin); y <= yMax; y += 1) {
      if (y === 0) continue;
      const { sy } = toScreen(0, y);
      const label = element("text", {
        x: axisX - 8, y: sy + FONT / 3, fill: "var(--graph-axis)",
        "font-size": FONT, "text-anchor": "end"
      });
      label.textContent = String(y).replace("-", "−");
      svg.appendChild(label);
    }

    const labelX = element("text", { x: WIDTH - PADDING + 4, y: axisY + 4, fill: "var(--graph-axis)", "font-size": FONT });
    labelX.textContent = "x";
    svg.appendChild(labelX);
    const labelY = element("text", { x: axisX + 6, y: PADDING - 8, fill: "var(--graph-axis)", "font-size": FONT });
    labelY.textContent = "y";
    svg.appendChild(labelY);
  }

  function drawAsymptote(svg) {
    if (state.asymptote === null || state.asymptote === undefined) return;
    const { sx } = toScreen(state.asymptote, 0);
    if (sx < PADDING || sx > WIDTH - PADDING) return;
    svg.appendChild(element("line", {
      x1: sx, y1: PADDING, x2: sx, y2: HEIGHT - PADDING,
      stroke: COLORS.asymptote, "stroke-width": 2, "stroke-dasharray": "7 6"
    }));
    const label = element("text", {
      x: sx + 6, y: PADDING + FONT + 1, fill: COLORS.asymptote, "font-size": FONT, "font-weight": 600
    });
    label.textContent = `x = ${formatNumber(state.asymptote)}`;
    svg.appendChild(label);
  }

  function drawCurve(svg, curve) {
    const { xMin, xMax, yMin, yMax } = state.range;
    const steps = 480;
    const segments = [];
    let current = [];

    for (let i = 0; i <= steps; i += 1) {
      const x = xMin + ((xMax - xMin) * i) / steps;
      const y = curve.fn(x);
      if (!Number.isFinite(y) || y < yMin - 2 || y > yMax + 2) {
        if (current.length > 1) segments.push(current);
        current = [];
        continue;
      }
      const { sx, sy } = toScreen(x, y);
      current.push(`${sx.toFixed(2)},${sy.toFixed(2)}`);
    }
    if (current.length > 1) segments.push(current);

    segments.forEach((points) => {
      svg.appendChild(element("polyline", {
        points: points.join(" "),
        fill: "none",
        stroke: COLORS[curve.kind] || COLORS.base,
        "stroke-width": curve.width || 2.6,
        "stroke-linecap": "round",
        "stroke-dasharray": curve.dashed ? "6 6" : "none",
        opacity: curve.faded ? .45 : 1
      }));
    });
  }

  function drawPoint(svg, point) {
    const { sx, sy } = toScreen(point.x, point.y);
    if (sx < PADDING - 4 || sx > WIDTH - PADDING + 4) return;
    const color = COLORS[point.kind] || COLORS.student;

    svg.appendChild(element("circle", {
      cx: sx, cy: sy, r: point.kind === "ghost" ? FONT / 3 : FONT / 2,
      fill: point.hollow ? "var(--background)" : color,
      stroke: color, "stroke-width": 2,
      opacity: point.kind === "ghost" ? .5 : 1
    }));

    if (point.label) {
      const label = element("text", {
        x: sx + FONT / 1.6, y: sy - FONT / 1.6, fill: color, "font-size": FONT, "font-weight": 600
      });
      label.textContent = point.label;
      svg.appendChild(label);
    }
  }

  function render() {
    pickLayout();
    shell.innerHTML = "";
    const svg = element("svg", {
      viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
      role: "img",
      "aria-label": state.description || "Plano cartesiano de la actividad"
    });

    if (state.grid) drawGrid(svg);
    drawAxes(svg);
    drawAsymptote(svg);
    state.curves.forEach((curve) => drawCurve(svg, curve));
    state.points.forEach((point) => drawPoint(svg, point));

    shell.appendChild(svg);
    renderReadout();
  }

  /**
   * Alternativa textual del gráfico: el README pide que la información
   * matemática central no dependa exclusivamente de poder verlo.
   */
  function renderReadout() {
    const rows = state.readout || [];
    if (!rows.length) {
      readout.hidden = true;
      return;
    }
    readout.hidden = false;
    readout.innerHTML = "";
    const list = document.createElement("dl");
    rows.forEach(([term, value]) => {
      const dt = document.createElement("dt");
      dt.textContent = term;
      const dd = document.createElement("dd");
      dd.textContent = value;
      list.append(dt, dd);
    });
    readout.appendChild(list);
  }

  render();

  // El primer dibujado puede ocurrir antes de que el contenedor esté en el
  // documento y tenga ancho medible. Al rotar el teléfono o proyectar en
  // pantalla grande, el plano también se vuelve a dibujar.
  let lastLayoutWidth = WIDTH;

  function refreshLayout() {
    pickLayout();
    if (WIDTH !== lastLayoutWidth) {
      lastLayoutWidth = WIDTH;
      render();
    }
  }

  if (typeof ResizeObserver === "function") {
    new ResizeObserver(refreshLayout).observe(shell);
  }
  window.addEventListener("resize", refreshLayout);

  return {
    update(patch) {
      Object.assign(state, patch);
      render();
    },
    get state() {
      return state;
    }
  };
}

/** Leyenda textual reutilizable, para no depender solo del color. */
export function createLegend(items) {
  const legend = document.createElement("p");
  legend.className = "legend";
  items.forEach(({ kind, label }) => {
    const span = document.createElement("span");
    const swatch = document.createElement("i");
    swatch.style.background = COLORS[kind] || COLORS.base;
    span.append(swatch, document.createTextNode(label));
    legend.appendChild(span);
  });
  return legend;
}
