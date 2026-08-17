/**
 * Mundo 4 · Las Islas Verticales ("El ascensor")
 * Semana 4: analizar el efecto del parámetro b en f(x) = log_c(ax) + b,
 * comparando qué propiedades cambian y cuáles permanecen.
 */

export const world4Levels = [
  {
    id: 10,
    world: 4,
    status: "draft",
    title: "El ascensor vertical",
    mission: "Recuperar las coordenadas de referencia de la curva original",
    topic: "f(x) = log_c(ax) + b",
    prerequisite: 9,
    stars: 3,
    narrative:
      "El sistema vertical del graficador funciona, pero perdió las coordenadas de referencia de la curva original.",
    plan: {
      program: "Se ve la curva base y un slider para b; antes de moverlo, la aplicación pide una predicción.",
      paper:
        "Elegir tres puntos de la curva base y calcular qué ocurre con sus coordenadas al sumar un valor de b, completando una tabla «antes / después».",
      back:
        "Se cargan los nuevos puntos y se comparan con la curva que produce el slider; se puede congelar la curva anterior para ver el desplazamiento.",
      challenge:
        "Dado un valor de b, calcular y cargar tres puntos transformados y decidir la dirección del desplazamiento sin mover previamente el slider."
    }
  },
  {
    id: 11,
    world: 4,
    status: "draft",
    title: "Qué cambió y qué sobrevivió",
    mission: "Clasificar las propiedades que se conservan al modificar b",
    topic: "Comparación entre b = 0 y b ≠ 0",
    prerequisite: 10,
    stars: 3,
    narrative: "El sistema mezcló las propiedades de dos funciones y hay que clasificarlas.",
    plan: {
      program:
        "Tarjetas con «dominio», «imagen», «cero», «ordenada», «frontera» y «posición vertical», y dos columnas: CAMBIA / NO CAMBIA.",
      paper:
        "Comparar dos funciones con distinto b, completar un cuadro y anotar evidencias tomadas de la gráfica.",
      back: "Se arrastran las tarjetas; al validar, el programa muestra una comparación animada entre las dos curvas.",
      challenge:
        "Analizar una tercera función y responder qué propiedades cambian al modificar b, con al menos una justificación correcta."
    }
  },
  {
    id: 12,
    world: 4,
    status: "draft",
    title: "Misión: mover el cero",
    mission: "Hacer que la curva cruce el eje x en el punto objetivo",
    topic: "Positividad y negatividad",
    prerequisite: 11,
    stars: 3,
    narrative:
      "Para abrir la puerta del mundo siguiente hay que hacer que la curva cruce el eje x en un punto objetivo.",
    plan: {
      program:
        "Se marca un objetivo sobre el eje x. Solo se puede modificar b después de calcular qué valor se necesita.",
      paper:
        "Resolver $f(x) = 0$ para el punto pedido o comparar con la función base; luego determinar los intervalos de positividad y negatividad.",
      back:
        "Se introduce b; si el cero coincide con el objetivo, la aplicación colorea el signo y pide cargar los intervalos calculados.",
      challenge:
        "Construir una función con un cero asignado y completar sus conjuntos de positividad y negatividad."
    }
  }
];
