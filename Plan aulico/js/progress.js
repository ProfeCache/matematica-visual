/**
 * Progreso local y anónimo de Logaria.
 *
 * Decisión registrada en el README: se usa `logaria-progress-v2` y se migra
 * automáticamente desde `logaria-progress-v1` si existe un avance anterior.
 * No se guardan nombres, correos ni ningún dato personal.
 */

const KEY_V2 = "logaria-progress-v2";
const KEY_V1 = "logaria-progress-v1";

const listeners = new Set();

function emptyProgress() {
  return { version: 2, levels: {}, updatedAt: null };
}

function emptyLevel() {
  return { unlocked: false, completed: false, stars: 0, attempts: 0, notes: {} };
}

/**
 * v1 guardaba `{ completed: [indiceBase0], sides: [indiceBase0] }`.
 * Cada nivel superado en v1 se convierte en un nivel completado con una
 * estrella (la del reto), que es lo único que aquella versión validaba.
 */
function migrateFromV1(rawV1) {
  const progress = emptyProgress();
  const completed = Array.isArray(rawV1?.completed) ? rawV1.completed : [];
  const sides = Array.isArray(rawV1?.sides) ? rawV1.sides : [];

  completed.forEach((index) => {
    const id = Number(index) + 1;
    if (!Number.isFinite(id)) return;
    progress.levels[id] = {
      ...emptyLevel(),
      unlocked: true,
      completed: true,
      stars: 1,
      notes: { migratedFrom: "v1" }
    };
  });

  sides.forEach((index) => {
    const id = Number(index) + 1;
    if (!Number.isFinite(id)) return;
    const level = progress.levels[id] || { ...emptyLevel(), unlocked: true };
    level.notes = { ...level.notes, sideMission: true, migratedFrom: "v1" };
    progress.levels[id] = level;
  });

  progress.migratedFromV1 = true;
  return progress;
}

function read() {
  try {
    const rawV2 = localStorage.getItem(KEY_V2);
    if (rawV2) {
      const parsed = JSON.parse(rawV2);
      if (parsed && typeof parsed === "object") {
        return { ...emptyProgress(), ...parsed, levels: parsed.levels || {} };
      }
    }
    const rawV1 = localStorage.getItem(KEY_V1);
    if (rawV1) {
      const migrated = migrateFromV1(JSON.parse(rawV1));
      write(migrated);
      return migrated;
    }
  } catch (error) {
    console.warn("No se pudo leer el progreso guardado:", error);
  }
  return emptyProgress();
}

function write(next) {
  try {
    next.updatedAt = new Date().toISOString();
    localStorage.setItem(KEY_V2, JSON.stringify(next));
  } catch (error) {
    console.warn("No se pudo guardar el progreso:", error);
  }
}

let state = read();

function notify() {
  listeners.forEach((fn) => fn(state));
}

export function onProgressChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getLevelProgress(id) {
  return { ...emptyLevel(), ...(state.levels[String(id)] || {}) };
}

export function updateLevelProgress(id, patch) {
  const current = getLevelProgress(id);
  state.levels[String(id)] = { ...current, ...patch };
  write(state);
  notify();
  return state.levels[String(id)];
}

export function registerAttempt(id) {
  const current = getLevelProgress(id);
  return updateLevelProgress(id, { attempts: current.attempts + 1 });
}

/**
 * Marca el nivel como superado. `stars` nunca baja: se conserva el mejor
 * resultado obtenido por el estudiante.
 */
export function completeLevel(id, stars = 1) {
  const current = getLevelProgress(id);
  return updateLevelProgress(id, {
    unlocked: true,
    completed: true,
    stars: Math.max(current.stars, stars)
  });
}

export function awardStar(id, starKey) {
  const current = getLevelProgress(id);
  const earned = { ...(current.notes.earnedStars || {}), [starKey]: true };
  const stars = Math.max(current.stars, Object.keys(earned).length);
  return updateLevelProgress(id, { stars, notes: { ...current.notes, earnedStars: earned } });
}

export function saveNote(id, key, value) {
  const current = getLevelProgress(id);
  return updateLevelProgress(id, { notes: { ...current.notes, [key]: value } });
}

export function resetProgress() {
  state = emptyProgress();
  write(state);
  notify();
}

export function getSummary(levels) {
  const completed = levels.filter((level) => getLevelProgress(level.id).completed).length;
  const stars = levels.reduce((total, level) => total + getLevelProgress(level.id).stars, 0);
  return { completed, total: levels.length, stars };
}

export function wasMigrated() {
  return Boolean(state.migratedFromV1);
}
