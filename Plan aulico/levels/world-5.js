/**
 * Mundo 5 · El Reino de las Transformaciones ("Control total")
 * Semana 5: integrar todos los parámetros en f(x) = log_c(ax − k) + b y pasar
 * de la exploración aislada a la construcción y el análisis global.
 */

export const world5Levels = [
  {
    id: 13,
    world: 5,
    status: "draft",
    title: "Panel de control completo",
    mission: "Usar todos los controles con intención y no por ensayo ciego",
    topic: "f(x) = log_c(ax − k) + b",
    prerequisite: 12,
    stars: 3,
    narrative:
      "Se habilitan por primera vez todos los controles del graficador. El desafío es usarlos con intención y no por ensayo ciego.",
    plan: {
      program:
        "Sliders y campos numéricos para c, a, k y b; guardar una curva anterior, mostrar rastro y reiniciar.",
      paper:
        "Antes de tocar los controles, con una función concreta, anticipar crecimiento o decrecimiento, frontera del dominio y desplazamiento vertical.",
      back:
        "Se ingresan los parámetros y se compara la gráfica real con la predicción; el programa pide marcar qué anticipaciones fueron correctas y cuáles deben revisarse.",
      challenge: "Ajustar los cuatro parámetros para cumplir tres condiciones simultáneas dadas por la aplicación."
    }
  },
  {
    id: 14,
    world: 5,
    status: "draft",
    title: "Se perdió la ficha técnica",
    mission: "Recuperar todas las propiedades analíticas de la función general",
    topic: "Dominio, imagen, cero y ordenada en la función general",
    prerequisite: 13,
    stars: 3,
    narrative: "La curva funciona, pero la base de datos perdió todas sus propiedades analíticas.",
    plan: {
      program: "La gráfica puede consultarse, pero la ficha está vacía y el botón «analizar» permanece deshabilitado.",
      paper:
        "Resolver la condición $ax - k > 0$, el dominio, el cero mediante $f(x) = 0$ y la existencia de ordenada al origen; registrar también la imagen.",
      back:
        "Cada propiedad se carga en un formulario; al completarlo, el programa destaca gráficamente dominio, cero y posibles intersecciones para verificar.",
      challenge: "Completar la ficha de una segunda función general con todas las propiedades solicitadas."
    }
  },
  {
    id: 15,
    world: 5,
    status: "draft",
    title: "Jefe del mundo: ingeniería inversa",
    mission: "Deducir una función a partir de su gráfica y algunas condiciones",
    topic: "Análisis completo",
    prerequisite: 14,
    stars: 3,
    narrative:
      "El último sistema de seguridad no muestra la ecuación: solo una gráfica y algunas condiciones.",
    plan: {
      program: "Se presenta una curva objetivo que el alumno puede consultar junto con algunas condiciones.",
      paper:
        "Hacer una ficha completa (tipo de crecimiento, dominio, imagen, cero, ordenada si existe, positividad y negatividad) y proponer parámetros posibles.",
      back:
        "Se ajusta una función en el laboratorio para aproximarla a la gráfica objetivo y se cargan todos los intervalos calculados.",
      challenge:
        "Superar el análisis integral de una gráfica nueva con un mínimo de respuestas correctas (por defecto tres, configurable por el docente). Al lograrlo se abre el mundo final."
    }
  }
];
