/**
 * Mundo 2 · El Bosque de las Bases ("Primer territorio")
 * Semana 2: explorar f(x) = log_c(ax), distinguir para qué sirve la base y
 * comenzar el análisis de dominio, imagen, cero, ordenada y signo.
 *
 * El Nivel 4 es la rebanada vertical completa del proyecto: recorre el ciclo
 * disparador → predicción → hoja → carga → comprobación → exploración →
 * conclusión → reto, y sirve de modelo para los demás niveles.
 */

export const world2Levels = [
  {
    id: 4,
    world: 2,
    status: "ready",
    title: "Se rompió el graficador",
    mission: "Recuperar el graficador cargando puntos calculados en la carpeta",
    topic: "f(x) = log_c(ax) con c > 1 y 0 < c < 1",
    prerequisite: 3,
    stars: 3,
    starNames: {
      exploration: "Exploración del laboratorio",
      conclusion: "Conclusión registrada",
      challenge: "Reto de desbloqueo"
    },
    narrative:
      "El graficador de Logaria dejó de dibujar. El sistema todavía conoce la función, pero no puede ubicar un solo punto en el plano. La única forma de repararlo es darle puntos correctos, calculados por ustedes.",
    steps: [
      {
        kind: "brief",
        phase: "Disparador",
        kicker: "Misión",
        kickerKind: "narrative",
        title: "El graficador se rompió",
        text:
          "El graficador necesita cuatro puntos para recuperarse. Mientras no los tenga, la cuadrícula queda vacía y la opción de graficar automáticamente permanece deshabilitada.",
        math: "f(x) = \\log_{2}(x)",
        note:
          "En este nivel la pantalla no va a resolver el cálculo. Va a comprobar lo que produzcas en la carpeta.",
        continueLabel: "Aceptar la misión"
      },
      {
        kind: "prediction",
        phase: "Predicción",
        kicker: "Predicción",
        kickerKind: "prediction",
        title: "Antes de calcular, anticipá",
        prompt:
          "Todavía no hay ningún punto en el plano. ¿Cómo pensás que se comporta $f(x) = \\log_{2}(x)$ a medida que x crece?",
        options: [
          "Crece: a valores de x más grandes le corresponden valores de f más grandes",
          "Decrece: a valores de x más grandes le corresponden valores de f más chicos",
          "Se mantiene constante"
        ],
        recordKey: "prediccionCrecimiento",
        expectedIndex: 0,
        note:
          "Tu predicción queda registrada y no se corrige ahora. La vamos a contrastar con el gráfico cuando el graficador esté reparado.",
        continueLabel: "Registrar la predicción"
      },
      {
        kind: "paper",
        phase: "Hoja",
        kicker: "Puente a la carpeta",
        kickerKind: "paper",
        title: "Abrí tu cuaderno y calculá los puntos",
        prompt:
          "El graficador no puede calcular. Necesita los cuatro pares $(x, f(x))$ para $x = 1$, $x = 2$, $x = 4$ y $x = 8$.",
        math: "f(x) = \\log_{2}(x)",
        tasks: [
          "Copiá la función y armá una tabla con las cuatro entradas: x = 1, 2, 4 y 8.",
          "Para cada valor escribí la pregunta que resuelve el logaritmo: $\\log_{2}(4)$ es el exponente al que hay que elevar 2 para obtener 4.",
          "Anotá la transformación completa, no solo el resultado: $\\log_{2}(4) = 2$ porque $2^{2} = 4$.",
          "Antes de volver a la pantalla, dibujá en la hoja un bosquejo de la curva que pasaría por esos cuatro puntos."
        ],
        confirmLabel: "Ya lo resolví en la carpeta"
      },
      {
        kind: "points",
        phase: "Carga",
        kicker: "Carga de resultados",
        kickerKind: "check",
        title: "Cargá los puntos calculados",
        prompt:
          "Ingresá el valor de $f(x)$ que obtuviste para cada x. Cada punto correcto queda ubicado en el plano; el graficador todavía no une la curva.",
        fn: { c: 2, a: 1, k: 0, b: 0 },
        graph: {
          range: { xMin: -1, xMax: 10, yMin: -4, yMax: 4 },
          description:
            "Plano cartesiano vacío entre x = −1 y x = 10. Los puntos correctos se van agregando a medida que se cargan."
        },
        legend: [
          { kind: "student", label: "Puntos que cargás vos" },
          { kind: "base", label: "Curva del graficador (aparece al final)" }
        ],
        rows: [
          {
            x: 1,
            y: 0,
            hints: [
              "Revisá el punto con x = 1: fijate qué coordenada y cargaste.",
              "¿A qué exponente hay que elevar 2 para obtener 1?",
              "Escribí 1 como potencia de 2: $1 = 2^{?}$. Ese exponente es el valor que buscás."
            ]
          },
          {
            x: 2,
            y: 1,
            hints: [
              "Revisá el punto con x = 2.",
              "¿Qué exponente de 2 da como resultado 2?",
              "Escribí $2 = 2^{?}$ y usá ese exponente como valor de f(2)."
            ]
          },
          {
            x: 4,
            y: 2,
            hints: [
              "Revisá el punto con x = 4.",
              "¿Cuántas veces hay que multiplicar 2 por sí mismo para llegar a 4?",
              "Escribí 4 como potencia de 2 y leé el exponente que aparece."
            ]
          },
          {
            x: 8,
            y: 3,
            hints: [
              "Revisá el punto con x = 8.",
              "¿8 es una potencia de 2? ¿Con qué exponente?",
              "Escribí $8 = 2^{?}$: ese exponente es f(8)."
            ]
          }
        ],
        successMessage:
          "Los cuatro puntos son correctos. El graficador recuperó la información que le faltaba.",
        continueLabel: "Reparar el graficador"
      },
      {
        kind: "check",
        phase: "Comprobación",
        kicker: "Comprobación",
        kickerKind: "check",
        title: "El graficador vuelve a funcionar",
        prompt:
          "Con tus cuatro puntos el sistema pudo reconstruir la curva. Compará el gráfico con el bosquejo de tu carpeta.",
        fn: { c: 2, a: 1, k: 0, b: 0 },
        graph: {
          range: { xMin: -1, xMax: 10, yMin: -4, yMax: 4 },
          description:
            "Curva creciente de f(x) = log en base 2 de x, que pasa por (1, 0), (2, 1), (4, 2) y (8, 3) y se acerca al eje y sin tocarlo."
        },
        showPoints: true,
        points: [
          { x: 1, y: 0 },
          { x: 2, y: 1 },
          { x: 4, y: 2 },
          { x: 8, y: 3 }
        ],
        legend: [
          { kind: "student", label: "Los puntos que calculaste" },
          { kind: "base", label: "Curva reconstruida por el graficador" },
          { kind: "asymptote", label: "Frontera del dominio (x = 0)" }
        ],
        readout: [
          ["Función", "f(x) = log₂(x)"],
          ["Puntos cargados", "(1, 0) · (2, 1) · (4, 2) · (8, 3)"],
          ["Corte con el eje x", "(1, 0)"],
          ["Comportamiento", "creciente"],
          ["Valores de x admitidos", "x > 0"]
        ],
        contrast: {
          recordKey: "prediccionCrecimiento",
          expectedIndex: 0,
          whenRight:
            "Tu predicción coincide con el gráfico: la curva crece. Anotá en la carpeta en qué te apoyaste para anticiparlo.",
          whenWrong:
            "Tu predicción no coincide con el gráfico: la curva crece. Volvé a tu tabla y observá qué pasa con f(x) cuando x pasa de 1 a 2, de 2 a 4 y de 4 a 8."
        },
        note:
          "La curva se acerca al eje y pero nunca lo toca: x = 0 no pertenece al dominio, así que esta función no tiene ordenada al origen.",
        continueLabel: "Entrar al laboratorio"
      },
      {
        kind: "lab",
        phase: "Exploración",
        kicker: "Laboratorio",
        kickerKind: "exploration",
        star: "exploration",
        title: "Cambiá la base y observá",
        prompt:
          "El graficador está operativo. Modificá la base c y el factor a de $f(x) = \\log_{c}(ax)$ y observá qué cambia en la curva.",
        fn: { c: 2, a: 1, k: 0, b: 0 },
        graph: {
          range: { xMin: -1, xMax: 10, yMin: -4, yMax: 4 }
        },
        controls: [
          {
            key: "c",
            label: "Base c",
            type: "select",
            value: 2,
            options: [
              { value: 0.5, label: "1/2" },
              { value: 0.25, label: "1/4" },
              { value: 2, label: "2" },
              { value: 3, label: "3" },
              { value: 10, label: "10" }
            ]
          },
          {
            key: "a",
            label: "Factor a",
            type: "range",
            value: 1,
            min: 0.5,
            max: 3,
            step: 0.5
          }
        ],
        requirements: [
          { id: "mayor", label: "Probar una base mayor que 1", test: (v) => v.c > 1 },
          { id: "menor", label: "Probar una base entre 0 y 1", test: (v) => v.c < 1 },
          { id: "factor", label: "Probar un factor a distinto de 1", test: (v) => v.a !== 1 }
        ],
        tip: "Mirá siempre qué ocurre con el punto donde la curva corta el eje x.",
        continueLabel: "Registrar la conclusión"
      },
      {
        kind: "conclusion",
        phase: "Conclusión",
        kicker: "Conclusión",
        kickerKind: "exploration",
        star: "conclusion",
        title: "¿Qué regularidades encontraste?",
        prompt:
          "Marcá todas las afirmaciones que tu exploración en el laboratorio permite sostener. Podés volver al laboratorio antes de responder.",
        multiple: true,
        options: [
          "Si la base es mayor que 1, la función crece.",
          "Si la base está entre 0 y 1, la función decrece.",
          "Cualquiera sea la base, la función vale 0 cuando su argumento vale 1.",
          "La curva corta el eje y en algún punto.",
          "Para valores de x negativos la función devuelve valores negativos."
        ],
        correct: [0, 1, 2],
        hints: [
          "Revisá una por una: ¿podés señalar en el laboratorio una curva que respalde cada afirmación?",
          "¿Qué valor toma la función cuando su argumento vale 1, con base 2, con base 3 y con base 1/2?",
          "Fijate si alguna afirmación habla de un punto que la curva nunca alcanza: ¿existe f(0)?"
        ],
        successMessage:
          "Conclusión registrada. Copiala en tu carpeta con un ejemplo propio de cada afirmación.",
        continueLabel: "Ir al reto de desbloqueo"
      },
      {
        kind: "prediction",
        phase: "Reto · predicción",
        kicker: "Reto de desbloqueo",
        kickerKind: "challenge",
        title: "Otra función averiada",
        prompt:
          "El sistema encontró una segunda función dañada. Antes de calcular un solo punto: ¿la curva de $g(x) = \\log_{1/2}(x)$ va a ser creciente o decreciente?",
        options: ["Creciente", "Decreciente", "No se puede saber sin graficarla"],
        recordKey: "retoPrediccion",
        expectedIndex: 1,
        graded: true,
        hints: [
          "Compará la base con 1 antes de decidir.",
          "¿Qué observaste en el laboratorio cuando la base era menor que 1?",
          "Calculá $\\log_{1/2}(2)$: ¿a qué exponente hay que elevar 1/2 para obtener 2? Mirá el signo de ese exponente."
        ],
        successMessage: "Anticipación correcta. Ahora hay que sostenerla con puntos calculados.",
        continueLabel: "Comprobar la anticipación"
      },
      {
        kind: "points",
        phase: "Reto · carga",
        kicker: "Reto de desbloqueo",
        kickerKind: "challenge",
        star: "challenge",
        final: true,
        title: "Recuperá la segunda curva",
        prompt:
          "Calculá en la carpeta los tres puntos de $g(x) = \\log_{1/2}(x)$ y cargalos acá. El gráfico aparece recién cuando los tres sean correctos.",
        paperNote:
          "En la hoja: escribí cada valor de x como potencia de 1/2 y anotá el exponente. Por ejemplo, $2 = (1/2)^{-1}$.",
        fn: { c: 0.5, a: 1, k: 0, b: 0 },
        graph: {
          range: { xMin: -1, xMax: 10, yMin: -4, yMax: 3 },
          description:
            "Plano cartesiano vacío. Los puntos de la función decreciente aparecen a medida que se cargan correctamente."
        },
        legend: [
          { kind: "student", label: "Puntos que cargás vos" },
          { kind: "base", label: "Curva reconstruida" }
        ],
        rows: [
          {
            x: 1,
            y: 0,
            hints: [
              "Revisá el punto con x = 1.",
              "¿A qué exponente hay que elevar 1/2 para obtener 1?",
              "Cualquier base elevada a 0 da 1: ese dato alcanza para resolverlo."
            ]
          },
          {
            x: 2,
            y: -1,
            hints: [
              "Revisá el punto con x = 2: prestá atención al signo.",
              "¿(1/2) elevado a qué exponente da 2?",
              "Invertir la base cambia el signo del exponente: escribí $2 = (1/2)^{?}$."
            ]
          },
          {
            x: 8,
            y: -3,
            hints: [
              "Revisá el punto con x = 8.",
              "Escribí 8 como potencia de 1/2.",
              "Como $8 = 2^{3}$ y $2 = (1/2)^{-1}$, el exponente que buscás es negativo."
            ]
          }
        ],
        successMessage:
          "Los tres puntos son correctos y coinciden con tu anticipación: la curva decrece.",
        continueLabel: "Cerrar el nivel"
      }
    ],
    unlock: {
      title: "Reto superado",
      text:
        "Recuperaste el graficador y reconstruiste una función nueva sin ayuda directa. El nivel queda registrado con sus estrellas y el recorrido avanza al siguiente nivel disponible.",
      paperNote:
        "Antes de salir, dejá escrito en la carpeta: qué le pasa a la curva cuando la base es mayor que 1 y qué le pasa cuando está entre 0 y 1."
    }
  },
  {
    id: 5,
    world: 2,
    status: "draft",
    title: "Detective de la gráfica",
    mission: "Reconstruir la ficha de análisis que perdió el analizador",
    topic: "Dominio, imagen, cero y ordenada al origen",
    prerequisite: 4,
    stars: 3,
    narrative:
      "El analizador de propiedades perdió sus etiquetas. La gráfica está visible, pero hay que reconstruir su ficha.",
    plan: {
      program:
        "Se puede mover un punto por la curva y leer coordenadas, pero no se muestran dominio, imagen, cero ni ordenada.",
      paper:
        "Responder con una breve justificación: ¿qué valores de x pueden ingresar?, ¿qué valores de y aparecen?, ¿dónde corta el eje x?, ¿existe corte con el eje y?",
      back:
        "Se cargan las cuatro propiedades y la aplicación ilumina en el gráfico la que se selecciona, para verificar.",
      challenge:
        "Completar correctamente la ficha de análisis de una segunda función, sin la ayuda del resaltado."
    }
  },
  {
    id: 6,
    world: 2,
    status: "draft",
    title: "Territorios positivos y negativos",
    mission: "Recuperar los colores del mapa determinando dónde la función es positiva y negativa",
    topic: "Conjuntos de positividad y negatividad",
    prerequisite: 5,
    stars: 3,
    narrative:
      "El mapa perdió los colores que indican cuándo la función está por encima o por debajo del eje x.",
    plan: {
      program: "La gráfica se muestra sin colores y se pueden seleccionar intervalos del eje x.",
      paper:
        "Dibujar un esquema de la gráfica, marcar el cero, sombrear dónde f(x) > 0 y f(x) < 0 y escribir los intervalos.",
      back:
        "Se ingresan o seleccionan los intervalos; el sistema colorea solo después de la respuesta y permite comparar con el esquema de papel.",
      challenge:
        "Dada otra función, identificar cero, positividad y negatividad en una única misión sin pistas."
    }
  }
];
