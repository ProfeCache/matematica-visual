/**
 * Mundo 1 · El Portal Inverso ("El código logarítmico")
 * Semana 1: construir la relación entre escritura exponencial, logarítmica e
 * inversa antes de iniciar el análisis matemático de funciones.
 *
 * Los tres niveles están descritos como datos, con el plan tomado del
 * documento fuente. Todavía no son jugables (`status: "draft"`).
 */

export const world1Levels = [
  {
    id: 1,
    world: 1,
    status: "draft",
    title: "La calculadora desconfigurada",
    mission: "Reconstruir las equivalencias entre el lenguaje exponencial y el logarítmico",
    topic: "Ecuación logarítmica aplicando la definición",
    prerequisite: null,
    stars: 3,
    narrative:
      "La calculadora que traduce entre lenguaje exponencial y logarítmico perdió parte de sus equivalencias. Para repararla hay que reconstruirlas.",
    plan: {
      program:
        "Muestra pares incompletos como $\\log_2(32) = ?$ y $2^{?} = 32$. Primero se arrastran tarjetas para formar equivalencias; luego aparecen ecuaciones nuevas.",
      paper:
        "Ante el aviso «la calculadora no puede calcular», resolver 3 o 4 ecuaciones pasando de forma logarítmica a exponencial, escribiendo cada transformación y no solo el resultado.",
      back:
        "Se ingresan los exponentes obtenidos; si coinciden, el sistema completa visualmente ambos lenguajes y habilita una ronda de práctica.",
      challenge:
        "Resolver una ecuación logarítmica nueva por definición y completar correctamente tanto la escritura exponencial equivalente como el valor de la incógnita."
    }
  },
  {
    id: 2,
    world: 1,
    status: "draft",
    title: "La máquina que hace y deshace",
    mission: "Construir la máquina que deshace cada operación",
    topic: "Concepto de función inversa",
    prerequisite: 1,
    stars: 3,
    narrative:
      "Una máquina transforma entradas, pero se perdió el mecanismo. Hay que construir la máquina que deshace cada operación.",
    plan: {
      program:
        "Una secuencia del tipo $x \\to \\times 2 \\to +3 \\to y$. Se pueden probar entradas y observar salidas, pero la ruta inversa está vacía.",
      paper:
        "Elegir tres valores de entrada, completar una tabla x–y y escribir qué operaciones y en qué orden permiten volver de y a x.",
      back:
        "Se arma la secuencia inversa arrastrando operaciones (−3, ÷2) y se carga un par de puntos para comprobar el valor inicial.",
      challenge:
        "Dada una nueva máquina de dos operaciones, construir su inversa y recuperar correctamente dos valores de entrada a partir de sus salidas."
    }
  },
  {
    id: 3,
    world: 1,
    status: "draft",
    title: "El espejo",
    mission: "Recalibrar el espejo del plano usando pares de puntos intercambiados",
    topic: "La logarítmica como inversa de la exponencial",
    prerequisite: 2,
    stars: 3,
    narrative:
      "El espejo del plano cartesiano está descalibrado y solo puede reconstruirse usando pares de puntos de una exponencial y su inversa.",
    plan: {
      program:
        "Se ven $y = 2^{x}$ y la recta $y = x$, pero la curva invertida está oculta y el botón «reflejar» permanece bloqueado.",
      paper:
        "Con tres puntos de la exponencial, intercambiar coordenadas (x, y) → (y, x) y anticipar dónde deberían aparecer los puntos reflejados.",
      back:
        "Se cargan los puntos; si son correctos se activa la animación de reflexión y aparece $y = \\log_2(x)$ conectando ambos gráficos.",
      challenge:
        "Seleccionar la gráfica que puede ser inversa de una exponencial dada y justificarlo con pares de puntos intercambiados."
    }
  }
];
