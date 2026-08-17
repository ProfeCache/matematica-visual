/**
 * Mundo 6 · La Fortaleza Final ("Desafío final")
 * Semana 6: recuperar y articular lo aprendido mediante ejercitación, revisión
 * global y una producción final en la que el estudiante diseña una función.
 */

export const world6Levels = [
  {
    id: 16,
    world: 6,
    status: "draft",
    title: "Ruta de entrenamiento",
    mission: "Completar micro-retos en al menos tres rutas diferentes",
    topic: "Ejercitación",
    prerequisite: 15,
    stars: 3,
    narrative:
      "Antes del trabajo final hay que recorrer las rutas de entrenamiento y recuperar cada idea del recorrido.",
    plan: {
      program:
        "Rutas de ecuaciones, inversa, dominio, transformaciones, análisis gráfico y signo; cada ruta con micro-retos.",
      paper:
        "Algunos micro-retos activan el modo «sin graficador»: resolver una ecuación, completar una tabla o dibujar un bosquejo antes de continuar.",
      back:
        "Las respuestas se cargan en la aplicación y el gráfico aparece solo después de la resolución. El progreso queda registrado por área.",
      challenge: "Completar una cantidad mínima de micro-retos en al menos tres rutas diferentes."
    }
  },
  {
    id: 17,
    world: 6,
    status: "draft",
    title: "Escape logarítmico",
    mission: "Abrir las cinco cerraduras y completar el código final",
    topic: "Revisión",
    prerequisite: 16,
    stars: 3,
    narrative:
      "Cinco cerraduras protegen el acceso al trabajo final, una por cada idea central del recorrido: ecuaciones, inversa, dominio, transformaciones y análisis gráfico.",
    plan: {
      program: "Cada cerradura entrega un problema y devuelve un dígito o símbolo del código final.",
      paper:
        "Cada cerradura entrega un problema que debe desarrollarse en la hoja. La aplicación no acepta solo una opción múltiple: exige cargar un valor, intervalo, punto o parámetro obtenido.",
      back:
        "Cada respuesta correcta entrega un dígito o símbolo del código final. Ante un error, la aplicación habilita una pista conceptual, nunca el procedimiento completo.",
      challenge: "Abrir las cinco cerraduras y completar el código. No se puede acceder al Nivel 18 sin superar esta revisión."
    }
  },
  {
    id: 18,
    world: 6,
    status: "draft",
    title: "Creá tu propia función",
    mission: "Diseñar una función que cumpla todas las condiciones del desafío",
    topic: "Trabajo final integrador",
    prerequisite: 17,
    stars: 3,
    narrative:
      "La misión final ya no consiste en descubrir una función dada: el estudiante debe diseñarla.",
    plan: {
      program:
        "El sistema genera o permite elegir condiciones: creciente o decreciente, frontera del dominio, cero, desplazamiento vertical y algún punto obligatorio.",
      paper:
        "Diseñar primero en la hoja una función posible, justificar los parámetros elegidos, calcular al menos tres puntos de control y anticipar la gráfica.",
      back:
        "Se carga la función en el laboratorio, se comparan los puntos calculados con la gráfica y se corrigen decisiones si es necesario. Al finalizar, el programa genera una ficha con ecuación, gráfica y propiedades.",
      challenge:
        "Presentar una función que cumpla todas las condiciones del desafío y completar correctamente su análisis. Este reto cierra la aventura y habilita el registro final de logros."
    }
  }
];
