/**
 * Catálogo de niveles.
 *
 * Los niveles se describen como datos (decisión registrada en el README):
 * agregar una misión o cambiar una consigna no debería obligar a reescribir la
 * interfaz. Este módulo solo reúne los archivos por mundo y expone consultas.
 */

import { worlds } from "../levels/worlds.js";
import { world1Levels } from "../levels/world-1.js";
import { world2Levels } from "../levels/world-2.js";
import { world3Levels } from "../levels/world-3.js";
import { world4Levels } from "../levels/world-4.js";
import { world5Levels } from "../levels/world-5.js";
import { world6Levels } from "../levels/world-6.js";

import { getLevelProgress } from "./progress.js";

export const levels = [
  ...world1Levels,
  ...world2Levels,
  ...world3Levels,
  ...world4Levels,
  ...world5Levels,
  ...world6Levels
].sort((a, b) => a.id - b.id);

export { worlds };

export function getLevel(id) {
  return levels.find((level) => level.id === Number(id));
}

export function getWorldLevels(worldId) {
  return levels.filter((level) => level.world === worldId);
}

export function isPlayable(level) {
  return level?.status === "ready";
}

/**
 * Estados posibles de un nodo del mapa:
 *   completed · available · locked · soon
 *
 * Un nivel todavía no construido (`draft`) se muestra como «Próximamente» y no
 * bloquea el recorrido: los prerrequisitos solo miran los niveles jugables, así
 * el mapa se mantiene coherente mientras el proyecto se construye por fases.
 */
export function getLevelState(level) {
  const progress = getLevelProgress(level.id);
  if (progress.completed) return "completed";
  if (!isPlayable(level)) return "soon";

  const previousPlayable = levels
    .filter((item) => item.id < level.id && isPlayable(item))
    .pop();

  if (!previousPlayable) return "available";
  return getLevelProgress(previousPlayable.id).completed ? "available" : "locked";
}

/** Primer nivel jugable que todavía no fue superado. */
export function getNextAvailableLevel() {
  return levels.find((level) => isPlayable(level) && getLevelState(level) === "available") || null;
}

export function getPlayableLevels() {
  return levels.filter(isPlayable);
}
