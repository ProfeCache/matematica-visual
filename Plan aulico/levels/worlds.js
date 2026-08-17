/**
 * Mundos de Logaria.
 *
 * Jerarquía narrativa definida en el README:
 *   UNIVERSO (Logaria) → MUNDO → NIVEL → MISIÓN
 * El nombre visible del mundo es el de Logaria; `sourceName` guarda el nombre
 * del documento fuente para poder rastrear la correspondencia.
 */

export const worlds = [
  {
    id: 1,
    name: "El Portal Inverso",
    sourceName: "El código logarítmico",
    week: 1,
    topic: "Ecuación por definición, función inversa y la logarítmica como inversa de la exponencial",
    levels: [1, 2, 3]
  },
  {
    id: 2,
    name: "El Bosque de las Bases",
    sourceName: "Primer territorio",
    week: 2,
    topic: "f(x) = log_c(ax) con c > 1 y 0 < c < 1. Dominio, imagen, cero, ordenada y signo",
    levels: [4, 5, 6]
  },
  {
    id: 3,
    name: "Las Cavernas Horizontales",
    sourceName: "La frontera se mueve",
    week: 3,
    topic: "f(x) = log_c(ax − k). La frontera del dominio y el desplazamiento horizontal",
    levels: [7, 8, 9]
  },
  {
    id: 4,
    name: "Las Islas Verticales",
    sourceName: "El ascensor",
    week: 4,
    topic: "f(x) = log_c(ax) + b. Qué cambia y qué se conserva al desplazar verticalmente",
    levels: [10, 11, 12]
  },
  {
    id: 5,
    name: "El Reino de las Transformaciones",
    sourceName: "Control total",
    week: 5,
    topic: "f(x) = log_c(ax − k) + b. Integración de parámetros y análisis completo",
    levels: [13, 14, 15]
  },
  {
    id: 6,
    name: "La Fortaleza Final",
    sourceName: "Desafío final",
    week: 6,
    topic: "Ejercitación, revisión global y trabajo final integrador",
    levels: [16, 17, 18]
  }
];

export function findWorld(id) {
  return worlds.find((world) => world.id === id);
}
