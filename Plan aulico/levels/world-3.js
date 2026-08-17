/**
 * Mundo 3 · Las Cavernas Horizontales ("La frontera se mueve")
 * Semana 3: incorporar el parámetro k en f(x) = log_c(ax − k) y vincular la
 * transformación horizontal con la condición de existencia del logaritmo.
 *
 * Convención de signo definida en el README: siempre «− k».
 */

export const world3Levels = [
  {
    id: 7,
    world: 3,
    status: "draft",
    title: "La frontera cambia de lugar",
    mission: "Descubrir qué controla la posición de la barrera vertical",
    topic: "f(x) = log_c(ax − k)",
    prerequisite: 6,
    stars: 3,
    narrative:
      "Apareció una barrera vertical en el plano y el sistema no sabe dónde ubicarla. Hay que descubrir qué controla su posición.",
    plan: {
      program:
        "Hay sliders para a y k, pero el movimiento se bloquea después de una primera observación, para obligar a anticipar.",
      paper:
        "Para valores dados de a y k, resolver $ax - k > 0$ y predecir si al aumentar k la región permitida se mueve a la derecha o a la izquierda.",
      back:
        "Se introduce el valor de la frontera y se coloca manualmente una línea vertical; recién entonces se habilita el slider de k para constatar la predicción.",
      challenge:
        "Determinar en la carpeta el dominio de una función nueva y ubicar correctamente su frontera antes de ver la gráfica."
    }
  },
  {
    id: 8,
    world: 3,
    status: "draft",
    title: "El detector de dominio está fuera de servicio",
    mission: "Decidir qué valores de x pueden ingresar al logaritmo",
    topic: "Dominio, imagen, cero y ordenada",
    prerequisite: 7,
    stars: 3,
    narrative:
      "El programa puede dibujar parte de la curva, pero no sabe qué puntos son válidos porque el detector del argumento dejó de funcionar.",
    plan: {
      program:
        "Propone valores de x; algunos producen argumentos positivos y otros no. Hay que decidir cuáles pueden ingresar al logaritmo.",
      paper:
        "Completar una tabla con x, $ax - k$ y la decisión «admite / no admite»; después resolver formalmente la desigualdad del dominio y, cuando corresponda, el cero.",
      back:
        "Se cargan los valores válidos y el intervalo de dominio. Los puntos rechazados quedan marcados fuera de la zona permitida y el sistema reconstruye la curva.",
      challenge: "Analizar una función distinta y completar dominio, imagen y cero correctamente."
    }
  },
  {
    id: 9,
    world: 3,
    status: "draft",
    title: "Reconstrucción forense",
    mission: "Reconstruir la información que pudo producir la gráfica encontrada",
    topic: "Análisis completo y signo",
    prerequisite: 8,
    stars: 3,
    narrative:
      "Solo quedó una captura de una gráfica. Hay que reconstruir la información que pudo producirla.",
    plan: {
      program:
        "Se muestra una gráfica objetivo, su frontera y algunos puntos, pero se oculta la ecuación.",
      paper:
        "Anotar observaciones: crecimiento o decrecimiento, frontera, cero, posible valor de k, conjuntos de positividad y negatividad. No hace falta adivinar todos los parámetros de inmediato.",
      back:
        "Con controles limitados se ajustan parámetros para acercar la curva al objetivo y luego se completa la ficha de análisis.",
      challenge:
        "Conseguir una superposición aceptable y responder correctamente dominio, cero y signo de la función reconstruida."
    }
  }
];
