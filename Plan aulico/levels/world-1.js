/**
 * Mundo 1 · El Portal Inverso ("El código logarítmico")
 * Semana 1: construir la relación entre escritura exponencial, logarítmica e
 * inversa antes de iniciar el análisis matemático de funciones.
 *
 * Los tres niveles recorren el mismo ciclo: disparador, exploración o
 * predicción, puente a la carpeta, carga, comprobación, conclusión y reto.
 */

import { formatNumber } from "../js/math.js";

const exponential2 = (x) => 2 ** x;
const identity = (x) => x;

export const world1Levels = [
  {
    id: 1,
    world: 1,
    status: "ready",
    title: "La calculadora desconfigurada",
    mission: "Reconstruir las equivalencias entre el lenguaje exponencial y el logarítmico",
    topic: "Ecuación logarítmica aplicando la definición",
    prerequisite: null,
    stars: 3,
    starNames: {
      exploration: "Equivalencias reconstruidas",
      conclusion: "Conclusión registrada",
      challenge: "Reto de desbloqueo"
    },
    narrative:
      "La calculadora que traduce entre lenguaje exponencial y logarítmico perdió parte de sus equivalencias. Para repararla hay que reconstruirlas.",
    steps: [
      {
        kind: "brief",
        phase: "Disparador",
        kicker: "Misión",
        kickerKind: "narrative",
        title: "La calculadora perdió sus equivalencias",
        text:
          "La calculadora de Logaria traducía en las dos direcciones: de lenguaje logarítmico a exponencial y al revés. Después de la falla conserva las expresiones sueltas, pero perdió los vínculos entre ellas.",
        math: "\\log_{c}(a) = b \\quad \\Longleftrightarrow \\quad c^{\\,b} = a",
        note:
          "Esa doble escritura es la definición de logaritmo y es la única herramienta que vas a necesitar en todo el nivel.",
        continueLabel: "Aceptar la misión"
      },
      {
        kind: "match",
        phase: "Exploración",
        kicker: "Reparación",
        kickerKind: "exploration",
        star: "exploration",
        title: "Uní cada logaritmo con su potencia",
        prompt:
          "Tocá una tarjeta de la izquierda y después la potencia que explica su valor. Sobran dos potencias: no todas tienen pareja.",
        leftTitle: "Escritura logarítmica",
        rightTitle: "Potencia",
        pairs: [
          { left: "\\log_{2}(32)", right: "2^{5}" },
          { left: "\\log_{3}(81)", right: "3^{4}" },
          { left: "\\log_{5}(25)", right: "5^{2}" },
          { left: "\\log_{4}(64)", right: "4^{3}" }
        ],
        distractors: ["2^{4}", "5^{3}"],
        hints: [
          "Preguntate qué potencia da como resultado el número que está adentro del logaritmo.",
          "¿Qué número aparece dentro del logaritmo que elegiste? Buscá la potencia que llega exactamente a ese número.",
          "Calculá cada potencia de la columna derecha y anotá su resultado al lado; después buscá la coincidencia."
        ],
        pairMessage: "Equivalencia correcta. Seguí con la siguiente.",
        successMessage:
          "Las cuatro equivalencias volvieron a su lugar. En todas, el logaritmo es el exponente de su potencia.",
        continueLabel: "Seguir"
      },
      {
        kind: "prediction",
        phase: "Predicción",
        kicker: "Predicción",
        kickerKind: "prediction",
        title: "Una estimación antes de calcular",
        prompt:
          "La calculadora todavía no puede resolver $\\log_{2}(100)$, y 100 no es una potencia de 2. ¿Entre qué dos números enteros consecutivos está ese valor?",
        options: ["Entre 5 y 6", "Entre 6 y 7", "Entre 9 y 10"],
        recordKey: "prediccionOrden",
        expectedIndex: 1,
        note:
          "Tu predicción queda registrada y no se corrige ahora. La vamos a contrastar cuando la calculadora vuelva a funcionar.",
        continueLabel: "Registrar la predicción"
      },
      {
        kind: "paper",
        phase: "Hoja",
        kicker: "Puente a la carpeta",
        kickerKind: "paper",
        title: "Abrí tu cuaderno y resolvé por definición",
        prompt:
          "La calculadora no puede calcular. Necesita el valor de la incógnita de estas cuatro ecuaciones.",
        math: "\\log_{2}(x) = 6 \\qquad \\log_{3}(x) = 4 \\qquad \\log_{x}(49) = 2 \\qquad \\log_{5}(125) = x",
        tasks: [
          "Escribí cada ecuación en su forma exponencial antes de resolverla. Por ejemplo, $\\log_{2}(x) = 6$ se escribe $2^{6} = x$.",
          "Resolvé la potencia y anotá el valor de la incógnita.",
          "Prestá atención a la tercera: ahí la incógnita es la base, no el resultado.",
          "Dejá escrita la transformación completa de cada una, no solamente el resultado."
        ],
        confirmLabel: "Ya resolví las cuatro en la carpeta"
      },
      {
        kind: "fields",
        phase: "Carga",
        kicker: "Carga de resultados",
        kickerKind: "check",
        title: "Cargá los valores obtenidos",
        prompt: "Ingresá el valor de la incógnita de cada ecuación. La calculadora comprueba una por una.",
        columns: 2,
        fields: [
          {
            label: "$\\log_{2}(x) = 6$ · valor de x",
            expected: 64,
            hints: [
              "Revisá la primera: ¿ya la pasaste a forma exponencial?",
              "$\\log_{2}(x) = 6$ significa que 2 elevado a 6 da x. ¿Cuánto vale esa potencia?",
              "Multiplicá 2 por sí mismo de a un factor por vez y anotá cada resultado parcial."
            ]
          },
          {
            label: "$\\log_{3}(x) = 4$ · valor de x",
            expected: 81,
            hints: [
              "Revisá la segunda.",
              "¿Qué indica $\\log_{3}(x) = 4$: elevar 3 a la cuarta o elevar 4 a la tercera?",
              "Calculá $3 \\cdot 3 \\cdot 3 \\cdot 3$ paso a paso."
            ]
          },
          {
            label: "$\\log_{x}(49) = 2$ · valor de x",
            expected: 7,
            hints: [
              "Revisá la tercera: acá la incógnita es la base.",
              "La ecuación dice que la base elevada al cuadrado da 49. ¿Qué base cumple eso?",
              "Buscá un número que multiplicado por sí mismo dé 49."
            ]
          },
          {
            label: "$\\log_{5}(125) = x$ · valor de x",
            expected: 3,
            hints: [
              "Revisá la cuarta: acá la incógnita es el propio logaritmo.",
              "¿A qué exponente hay que elevar 5 para obtener 125?",
              "Escribí 125 como producto de factores 5 y contá cuántos usaste."
            ]
          }
        ],
        successMessage: "Las cuatro ecuaciones quedaron resueltas. La calculadora recuperó su tabla de traducción.",
        continueLabel: "Encender la calculadora"
      },
      {
        kind: "check",
        phase: "Comprobación",
        kicker: "Comprobación",
        kickerKind: "check",
        title: "La calculadora vuelve a traducir",
        prompt: "Con tus valores, la calculadora puede mostrar otra vez las dos escrituras de cada ecuación.",
        facts: [
          ["Ecuación 1", "$\\log_{2}(64) = 6$ porque $2^{6} = 64$"],
          ["Ecuación 2", "$\\log_{3}(81) = 4$ porque $3^{4} = 81$"],
          ["Ecuación 3", "$\\log_{7}(49) = 2$ porque $7^{2} = 49$"],
          ["Ecuación 4", "$\\log_{5}(125) = 3$ porque $5^{3} = 125$"]
        ],
        contrast: {
          recordKey: "prediccionOrden",
          expectedIndex: 1,
          whenRight:
            "Tu estimación coincide: $2^{6} = 64$ es menor que 100 y $2^{7} = 128$ es mayor, así que $\\log_{2}(100)$ está entre 6 y 7.",
          whenWrong:
            "El valor está entre 6 y 7: $2^{6} = 64$ es menor que 100 y $2^{7} = 128$ es mayor. Ubicar un logaritmo entre dos enteros es buscar entre qué dos potencias de la base cae el número."
        },
        note:
          "Un logaritmo no siempre da un número entero: $\\log_{2}(100)$ existe aunque 100 no sea una potencia de 2.",
        continueLabel: "Registrar la conclusión"
      },
      {
        kind: "conclusion",
        phase: "Conclusión",
        kicker: "Conclusión",
        kickerKind: "exploration",
        star: "conclusion",
        title: "¿Qué dice la definición?",
        prompt: "Marcá todas las afirmaciones que la reparación de la calculadora permite sostener.",
        multiple: true,
        options: [
          "$\\log_{c}(a) = b$ significa exactamente lo mismo que $c^{b} = a$.",
          "El logaritmo devuelve el exponente al que hay que elevar la base.",
          "$\\log_{c}(1) = 0$ cualquiera sea la base.",
          "$\\log_{c}(0)$ vale 0 para cualquier base.",
          "Todo logaritmo da como resultado un número entero."
        ],
        correct: [0, 1, 2],
        hints: [
          "Volvé a las cuatro equivalencias que reconstruiste: ¿qué afirmación describe lo que hiciste en cada una?",
          "¿A qué exponente hay que elevar una base para obtener 1? ¿Y para obtener 0?",
          "Mirá de nuevo la estimación de $\\log_{2}(100)$: ¿ese valor era entero?"
        ],
        successMessage: "Conclusión registrada. Copiala en la carpeta con un ejemplo propio de cada afirmación.",
        continueLabel: "Ir al reto de desbloqueo"
      },
      {
        kind: "fields",
        phase: "Reto",
        kicker: "Reto de desbloqueo",
        kickerKind: "challenge",
        star: "challenge",
        final: true,
        title: "Una ecuación que no apareció antes",
        prompt: "Resolvé $\\log_{6}(x) = 2$ en la carpeta y cargá las dos respuestas: la escritura equivalente y el valor.",
        paperNote:
          "En la hoja: escribí primero la forma exponencial equivalente y recién después calculá el valor de x.",
        fields: [
          {
            type: "choice",
            label: "Escritura exponencial equivalente",
            options: ["$6^{2} = x$", "$x^{2} = 6$", "$2^{6} = x$"],
            expected: 0,
            hints: [
              "En $\\log_{c}(a) = b$, ¿qué papel cumple cada número?",
              "El resultado del logaritmo es el exponente y la base del logaritmo es la base de la potencia. ¿Cuál es cada uno acá?",
              "Compará con un caso que ya resolviste: $\\log_{2}(x) = 6$ se escribía $2^{6} = x$."
            ]
          },
          {
            type: "number",
            label: "Valor de x",
            expected: 36,
            hints: [
              "Calculá la potencia que escribiste en la respuesta anterior.",
              "¿Cuánto vale 6 elevado al cuadrado?",
              "Multiplicá 6 por sí mismo."
            ]
          }
        ],
        successMessage: "Resolviste una ecuación nueva por definición y escribiste su forma equivalente.",
        continueLabel: "Cerrar el nivel"
      }
    ],
    unlock: {
      title: "Calculadora reparada",
      text:
        "Reconstruiste las equivalencias, resolviste cuatro ecuaciones por definición y superaste una ecuación nueva sin ayuda directa.",
      paperNote:
        "Dejá escrito en la carpeta cómo se pasa de $\\log_{c}(a) = b$ a $c^{b} = a$, con un ejemplo propio en cada dirección."
    }
  },

  {
    id: 2,
    world: 1,
    status: "ready",
    title: "La máquina que hace y deshace",
    mission: "Construir la máquina que deshace cada operación",
    topic: "Concepto de función inversa",
    prerequisite: 1,
    stars: 3,
    starNames: {
      exploration: "Máquina explorada",
      conclusion: "Conclusión registrada",
      challenge: "Reto de desbloqueo"
    },
    narrative:
      "Una máquina transforma entradas, pero se perdió el mecanismo que permitía volver. Hay que construir la máquina que deshace cada operación.",
    steps: [
      {
        kind: "brief",
        phase: "Disparador",
        kicker: "Misión",
        kickerKind: "narrative",
        title: "La máquina perdió su camino de vuelta",
        text:
          "La máquina sigue funcionando en un sentido: entra un número, se le aplican dos operaciones y sale otro. El problema es que el camino de vuelta se borró y sin él no se puede recuperar ninguna entrada.",
        math: "x \\;\\to\\; \\times 2 \\;\\to\\; +3 \\;\\to\\; y",
        note: "Tu misión es reconstruir la máquina inversa y comprobar que devuelve exactamente el valor de partida.",
        continueLabel: "Aceptar la misión"
      },
      {
        kind: "machine",
        phase: "Exploración",
        kicker: "Laboratorio",
        kickerKind: "exploration",
        star: "exploration",
        title: "Probá la máquina",
        prompt:
          "Ingresá distintos valores y observá qué sale. Necesitás al menos tres entradas diferentes para tener material con qué razonar.",
        machine: {
          label: "x \\to \\times 2 \\to +3 \\to y",
          operations: [
            { label: "× 2", apply: (value) => value * 2 },
            { label: "+ 3", apply: (value) => value + 3 }
          ]
        },
        minTries: 3,
        inputLabel: "Valor de entrada",
        successMessage: "Con esas pruebas ya tenés material para buscar el camino de vuelta.",
        continueLabel: "Anticipar el camino inverso"
      },
      {
        kind: "prediction",
        phase: "Predicción",
        kicker: "Predicción",
        kickerKind: "prediction",
        title: "¿En qué orden se deshace?",
        prompt: "Para volver de y a x hay que deshacer las dos operaciones. ¿En qué orden conviene aplicarlas?",
        options: [
          "Primero dividir por 2 y después restar 3",
          "Primero restar 3 y después dividir por 2",
          "El orden no cambia el resultado"
        ],
        recordKey: "prediccionOrden",
        expectedIndex: 1,
        note: "Tu predicción queda registrada. La vamos a contrastar cuando la máquina inversa esté armada.",
        continueLabel: "Registrar la predicción"
      },
      {
        kind: "paper",
        phase: "Hoja",
        kicker: "Puente a la carpeta",
        kickerKind: "paper",
        title: "Abrí tu cuaderno",
        prompt: "La máquina inversa no se puede armar por ensayo: primero hay que decidirla en la hoja.",
        tasks: [
          "Elegí tres valores de entrada y completá una tabla de dos columnas: x e y.",
          "Para uno de esos pares, escribí el camino de ida operación por operación.",
          "Escribí qué operación deshace cada una: ¿cuál deshace $\\times 2$? ¿Cuál deshace $+3$?",
          "Anotá en qué orden hay que aplicarlas para volver de y a x y escribí por qué en ese orden."
        ],
        confirmLabel: "Ya lo resolví en la carpeta"
      },
      {
        kind: "sequence",
        phase: "Carga",
        kicker: "Carga de resultados",
        kickerKind: "check",
        title: "Armá la máquina inversa",
        prompt: "Elegí las dos operaciones que deshacen la máquina y colocalas en el orden que decidiste en la carpeta.",
        from: "y",
        to: "x",
        pool: [
          { id: "restar3", label: "− 3" },
          { id: "dividir2", label: "÷ 2" },
          { id: "sumar3", label: "+ 3" },
          { id: "por2", label: "× 2" }
        ],
        answer: ["restar3", "dividir2"],
        orderHint:
          "Las dos operaciones son las correctas, pero el orden no. En la máquina directa, $+3$ fue la última en aplicarse: la vuelta tiene que empezar por deshacer esa.",
        hints: [
          "Fijate qué operación deshace cada una de las dos originales.",
          "En el camino de ida, ¿cuál fue la última operación que tocó al número?",
          "Para volver se deshacen en el orden inverso: la última de la ida es la primera de la vuelta."
        ],
        successMessage: "La máquina inversa quedó armada.",
        continueLabel: "Comprobar con valores"
      },
      {
        kind: "fields",
        phase: "Carga · valores",
        kicker: "Carga de resultados",
        kickerKind: "check",
        title: "Recuperá dos entradas",
        prompt: "Usá tu máquina inversa para recuperar el valor de entrada a partir de cada salida.",
        columns: 2,
        fields: [
          {
            label: "Si $y = 17$, ¿cuál era x?",
            expected: 7,
            hints: [
              "Aplicá tu cadena inversa a 17, paso por paso.",
              "¿Cuánto da $17 - 3$? ¿Y ese resultado dividido por 2?",
              "Comprobalo al revés: si entra tu respuesta en la máquina directa, ¿sale 17?"
            ]
          },
          {
            label: "Si $y = 9$, ¿cuál era x?",
            expected: 3,
            hints: [
              "Aplicá la misma cadena a 9.",
              "¿Cuánto da $9 - 3$? ¿Y dividido por 2?",
              "Comprobalo al revés: multiplicá tu respuesta por 2 y sumale 3."
            ]
          }
        ],
        successMessage: "Las dos entradas son correctas: la máquina inversa funciona.",
        continueLabel: "Ver las dos máquinas"
      },
      {
        kind: "check",
        phase: "Comprobación",
        kicker: "Comprobación",
        kickerKind: "check",
        title: "Las dos máquinas, una al lado de la otra",
        prompt: "Así queda el mecanismo completo, de ida y de vuelta.",
        facts: [
          ["Máquina directa", "$x \\to \\times 2 \\to +3 \\to y$"],
          ["Máquina inversa", "$y \\to -3 \\to \\div 2 \\to x$"],
          ["Comprobación", "$7 \\to 14 \\to 17$ y, de vuelta, $17 \\to 14 \\to 7$"],
          ["Regla", "cada operación se invierte y además se invierte el orden"]
        ],
        contrast: {
          recordKey: "prediccionOrden",
          expectedIndex: 1,
          whenRight:
            "Tu predicción coincide: se empieza deshaciendo la última operación de la ida, es decir, restando 3.",
          whenWrong:
            "El orden correcto empieza por restar 3. Si primero dividís por 2, estarías dividiendo también al 3 que se había sumado después: probá con $y = 17$ y vas a ver que no vuelve a 7."
        },
        note:
          "Una máquina y su inversa se cancelan: si aplicás una y después la otra, volvés siempre al valor de partida.",
        continueLabel: "Registrar la conclusión"
      },
      {
        kind: "conclusion",
        phase: "Conclusión",
        kicker: "Conclusión",
        kickerKind: "exploration",
        star: "conclusion",
        title: "¿Qué aprendiste sobre deshacer?",
        prompt: "Marcá todas las afirmaciones que tu trabajo con la máquina permite sostener.",
        multiple: true,
        options: [
          "Para deshacer una secuencia hay que invertir cada operación y también el orden.",
          "La operación que deshace $\\times 2$ es $\\div 2$.",
          "Si se aplica la máquina y después su inversa, se vuelve al valor inicial.",
          "El orden de las operaciones inversas no modifica el resultado.",
          "La máquina inversa devuelve el mismo valor para cualquier entrada."
        ],
        correct: [0, 1, 2],
        hints: [
          "Probá cada afirmación con uno de los pares de tu tabla antes de marcarla.",
          "¿Qué pasó cuando probaste dividir primero y restar después?",
          "Fijate si alguna afirmación dice que la máquina inversa da siempre lo mismo: ¿coincide con los valores que recuperaste?"
        ],
        successMessage: "Conclusión registrada. Copiala en la carpeta con la tabla que la respalda.",
        continueLabel: "Ir al reto de desbloqueo"
      },
      {
        kind: "sequence",
        phase: "Reto · máquina",
        kicker: "Reto de desbloqueo",
        kickerKind: "challenge",
        title: "Una máquina nueva",
        prompt: "El sistema propone otra máquina de dos operaciones: $x \\to \\times 3 \\to -1 \\to y$. Armá su inversa.",
        from: "y",
        to: "x",
        pool: [
          { id: "sumar1", label: "+ 1" },
          { id: "dividir3", label: "÷ 3" },
          { id: "restar1", label: "− 1" },
          { id: "por3", label: "× 3" }
        ],
        answer: ["sumar1", "dividir3"],
        orderHint:
          "Las operaciones son las correctas, pero el orden no. ¿Cuál fue la última que se aplicó en la ida?",
        hints: [
          "¿Qué operación deshace una resta? ¿Y una multiplicación?",
          "Escribí el camino de ida de un número cualquiera y recorrelo al revés.",
          "La última operación de la ida es la primera de la vuelta."
        ],
        successMessage: "La inversa de la máquina nueva está bien armada.",
        continueLabel: "Recuperar las entradas"
      },
      {
        kind: "fields",
        phase: "Reto · valores",
        kicker: "Reto de desbloqueo",
        kickerKind: "challenge",
        star: "challenge",
        final: true,
        title: "Recuperá las dos entradas",
        prompt: "Calculá en la carpeta y cargá los valores de entrada que produjeron estas salidas.",
        paperNote:
          "En la hoja: escribí el recorrido inverso completo para cada salida, no solamente el resultado final.",
        columns: 2,
        fields: [
          {
            label: "Si $y = 14$, ¿cuál era x?",
            expected: 5,
            hints: [
              "Aplicá tu cadena inversa a 14.",
              "¿Cuánto da $14 + 1$? ¿Y ese resultado dividido por 3?",
              "Comprobalo al revés: multiplicá tu respuesta por 3 y restale 1."
            ]
          },
          {
            label: "Si $y = 26$, ¿cuál era x?",
            expected: 9,
            hints: [
              "Aplicá la misma cadena a 26.",
              "¿Cuánto da $26 + 1$? ¿Y dividido por 3?",
              "Comprobalo al revés con la máquina directa."
            ]
          }
        ],
        successMessage: "Recuperaste las dos entradas con una máquina que armaste vos.",
        continueLabel: "Cerrar el nivel"
      }
    ],
    unlock: {
      title: "Mecanismo reconstruido",
      text:
        "Armaste dos máquinas inversas y recuperaste valores de entrada a partir de sus salidas. Eso es exactamente lo que hace una función inversa.",
      paperNote:
        "Dejá escrito en la carpeta: por qué la máquina inversa invierte también el orden de las operaciones, con un contraejemplo del orden equivocado."
    }
  },

  {
    id: 3,
    world: 1,
    status: "ready",
    title: "El espejo",
    mission: "Recalibrar el espejo del plano usando pares de puntos intercambiados",
    topic: "La logarítmica como inversa de la exponencial",
    prerequisite: 2,
    stars: 3,
    starNames: {
      exploration: "Espejo explorado",
      conclusion: "Conclusión registrada",
      challenge: "Reto de desbloqueo"
    },
    narrative:
      "El espejo del plano cartesiano está descalibrado y solo puede reconstruirse usando pares de puntos de una exponencial y su inversa.",
    steps: [
      {
        kind: "brief",
        phase: "Disparador",
        kicker: "Misión",
        kickerKind: "narrative",
        title: "El espejo está descalibrado",
        text:
          "En el plano quedaron la curva $y = 2^{x}$ y la recta $y = x$, que funciona como espejo. La curva reflejada está oculta y el botón «reflejar» no responde: el sistema necesita tres puntos correctos para recalibrarse.",
        curves: [
          { fn: exponential2, kind: "base" },
          { fn: identity, kind: "guide", dashed: true }
        ],
        graph: {
          range: { xMin: -3, xMax: 9, yMin: -3, yMax: 9 },
          square: true,
          description:
            "Plano cartesiano con la curva creciente y = 2 elevado a x y la recta y = x en gris punteado. No hay ninguna curva reflejada."
        },
        legend: [
          { kind: "base", label: "y = 2^x" },
          { kind: "guide", label: "recta y = x (el espejo)" }
        ],
        note: "El botón «reflejar» se habilita únicamente con los puntos que calcules vos.",
        continueLabel: "Aceptar la misión"
      },
      {
        kind: "prediction",
        phase: "Predicción",
        kicker: "Predicción",
        kickerKind: "prediction",
        title: "¿Por dónde va a pasar la curva reflejada?",
        prompt:
          "La exponencial pasa por $(1, 2)$, $(2, 4)$ y $(3, 8)$. Si la reflejamos respecto de la recta $y = x$, ¿por qué puntos va a pasar la curva reflejada?",
        options: [
          "Por $(2, 1)$, $(4, 2)$ y $(8, 3)$",
          "Por $(1, 2)$, $(2, 4)$ y $(3, 8)$",
          "Por $(-1, -2)$, $(-2, -4)$ y $(-3, -8)$"
        ],
        recordKey: "prediccionReflejo",
        expectedIndex: 0,
        note: "Tu predicción queda registrada y no se corrige ahora.",
        continueLabel: "Registrar la predicción"
      },
      {
        kind: "paper",
        phase: "Hoja",
        kicker: "Puente a la carpeta",
        kickerKind: "paper",
        title: "Abrí tu cuaderno y reflejá los puntos",
        prompt: "El espejo necesita tres puntos reflejados, calculados a mano.",
        tasks: [
          "Copiá los tres puntos de la exponencial: $(1, 2)$, $(2, 4)$ y $(3, 8)$. Comprobá cada uno con su potencia de 2.",
          "Escribí al lado el punto que se obtiene al intercambiar las coordenadas: $(x, y) \\to (y, x)$.",
          "Dibujá la recta $y = x$ y ubicá a mano los tres puntos intercambiados.",
          "Anticipá qué forma va a tener la curva que pasa por esos tres puntos nuevos."
        ],
        confirmLabel: "Ya reflejé los tres puntos en la carpeta"
      },
      {
        kind: "points",
        phase: "Carga",
        kicker: "Carga de resultados",
        kickerKind: "check",
        title: "Cargá los puntos reflejados",
        prompt:
          "Para cada punto de la exponencial, ingresá las dos coordenadas de su reflejo. Con los tres puntos correctos se activa la reflexión.",
        askFor: "both",
        givenLabel: "Punto de $y = 2^{x}$",
        tableCaption: "Escribí las coordenadas del punto reflejado que calculaste en la carpeta.",
        curves: [
          { fn: exponential2, kind: "base" },
          { fn: identity, kind: "guide", dashed: true }
        ],
        revealCurves: [{ params: { c: 2, a: 1, k: 0, b: 0 }, kind: "transformed" }],
        fixedPoints: [
          { x: 1, y: 2, kind: "base", label: "(1; 2)" },
          { x: 2, y: 4, kind: "base", label: "(2; 4)" },
          { x: 3, y: 8, kind: "base", label: "(3; 8)" }
        ],
        graph: {
          range: { xMin: -3, xMax: 9, yMin: -3, yMax: 9 },
          square: true,
          description:
            "Plano con la exponencial, la recta y = x y los puntos reflejados que se van agregando al cargarlos."
        },
        legend: [
          { kind: "base", label: "y = 2^x y sus puntos" },
          { kind: "guide", label: "recta y = x" },
          { kind: "student", label: "tus puntos reflejados" }
        ],
        readout: [["Estado del espejo", "esperando tres puntos correctos"]],
        readoutRevealed: [
          ["Estado del espejo", "recalibrado"],
          ["Función original", "y = 2^x"],
          ["Curva reflejada", "y = log₂(x)"]
        ],
        rows: [
          {
            given: "$(1, 2)$",
            x: 2,
            y: 1,
            label: "el reflejo de (1, 2)",
            hints: [
              "Revisá el reflejo de $(1, 2)$: fijate qué coordenada escribiste primero.",
              "Reflejar respecto de $y = x$ intercambia el orden de las coordenadas. ¿Cuál era la segunda del punto original?",
              "Lo que era la segunda coordenada pasa a ser la primera, y al revés. Ninguna coordenada cambia de valor."
            ]
          },
          {
            given: "$(2, 4)$",
            x: 4,
            y: 2,
            label: "el reflejo de (2, 4)",
            hints: [
              "Revisá el reflejo de $(2, 4)$.",
              "¿Qué coordenada del punto original tiene que quedar sobre el eje x?",
              "Aplicá la misma regla que usaste en el primer punto: se intercambian, no se calculan de nuevo."
            ]
          },
          {
            given: "$(3, 8)$",
            x: 8,
            y: 3,
            label: "el reflejo de (3, 8)",
            hints: [
              "Revisá el reflejo de $(3, 8)$.",
              "El punto original está muy arriba; su reflejo tiene que quedar muy a la derecha. ¿Coincide con lo que cargaste?",
              "Intercambiá las coordenadas del punto original sin modificar sus valores."
            ]
          }
        ],
        successMessage:
          "El espejo se recalibró: la reflexión de los tres puntos define la curva de la función inversa.",
        continueLabel: "Ver la reflexión completa"
      },
      {
        kind: "check",
        phase: "Comprobación",
        kicker: "Comprobación",
        kickerKind: "check",
        title: "Aparece la función inversa",
        prompt:
          "La curva reflejada es $y = \\log_{2}(x)$. Las dos funciones son la misma relación leída en dos direcciones.",
        curves: [
          { fn: exponential2, kind: "base" },
          { fn: identity, kind: "guide", dashed: true },
          { params: { c: 2, a: 1, k: 0, b: 0 }, kind: "transformed" }
        ],
        points: [
          { x: 1, y: 2, kind: "base", label: "(1; 2)" },
          { x: 2, y: 1, kind: "student", label: "(2; 1)" },
          { x: 3, y: 8, kind: "base", label: "(3; 8)" },
          { x: 8, y: 3, kind: "student", label: "(8; 3)" }
        ],
        graph: {
          range: { xMin: -3, xMax: 9, yMin: -3, yMax: 9 },
          square: true,
          description:
            "La exponencial y su reflejo, la curva logarítmica, dispuestas simétricamente respecto de la recta y = x."
        },
        legend: [
          { kind: "base", label: "y = 2^x" },
          { kind: "guide", label: "recta y = x" },
          { kind: "transformed", label: "y = log₂(x)" }
        ],
        asymptote: 0,
        readout: [
          ["Función original", "y = 2^x"],
          ["Función inversa", "y = log₂(x)"],
          ["Eje de simetría", "la recta y = x"],
          ["Ejemplo", "2³ = 8 se lee también como log₂(8) = 3"]
        ],
        facts: [
          ["Misma relación", "$2^{3} = 8$ es lo mismo que $\\log_{2}(8) = 3$"],
          ["Simetría", "cada punto $(a, b)$ de la exponencial se refleja en $(b, a)$ de la logarítmica"],
          ["Qué se intercambia", "lo que en la exponencial era el exponente, en la logarítmica es el resultado"]
        ],
        contrast: {
          recordKey: "prediccionReflejo",
          expectedIndex: 0,
          whenRight:
            "Tu predicción coincide con la reflexión: los puntos son $(2, 1)$, $(4, 2)$ y $(8, 3)$.",
          whenWrong:
            "La curva reflejada pasa por $(2, 1)$, $(4, 2)$ y $(8, 3)$. Reflejar respecto de $y = x$ no cambia el valor de las coordenadas: cambia el orden en que se escriben."
        },
        continueLabel: "Entrar al laboratorio"
      },
      {
        kind: "lab",
        phase: "Exploración",
        kicker: "Laboratorio",
        kickerKind: "exploration",
        star: "exploration",
        title: "Movelo y mirá el reflejo",
        prompt:
          "Elegí un valor de x sobre la exponencial y observá dónde queda su reflejo en la curva inversa.",
        values: { x: 1 },
        controls: [
          { key: "x", label: "Valor de x", type: "range", min: -2, max: 3, step: 0.5, value: 1 }
        ],
        graph: {
          range: { xMin: -3, xMax: 9, yMin: -3, yMax: 9 },
          square: true
        },
        legend: [
          { kind: "base", label: "punto sobre y = 2^x" },
          { kind: "student", label: "su reflejo sobre y = log₂(x)" },
          { kind: "guide", label: "recta y = x" }
        ],
        build: (values) => {
          const y = 2 ** values.x;
          return {
            curves: [
              { fn: exponential2, kind: "base" },
              { fn: identity, kind: "guide", dashed: true },
              { params: { c: 2, a: 1, k: 0, b: 0 }, kind: "transformed" }
            ],
            points: [
              { x: values.x, y, kind: "base", label: `(${formatNumber(values.x)}; ${formatNumber(y)})` },
              { x: y, y: values.x, kind: "student", label: `(${formatNumber(y)}; ${formatNumber(values.x)})` }
            ],
            asymptote: 0,
            description: `Punto (${formatNumber(values.x)}; ${formatNumber(y)}) sobre la exponencial y su reflejo sobre la logarítmica.`,
            readout: [
              ["Punto en la exponencial", `(${formatNumber(values.x)}; ${formatNumber(y)})`],
              ["Su reflejo en la inversa", `(${formatNumber(y)}; ${formatNumber(values.x)})`],
              ["Lectura exponencial", `2^${formatNumber(values.x)} = ${formatNumber(y)}`],
              ["Lectura logarítmica", `log₂(${formatNumber(y)}) = ${formatNumber(values.x)}`]
            ]
          };
        },
        requirements: [
          { id: "negativo", label: "Probar un valor de x negativo", test: (values) => values.x < 0 },
          { id: "mayor", label: "Probar un valor de x mayor que 1", test: (values) => values.x > 1 }
        ],
        tip:
          "Prestá atención a los valores negativos de x: el reflejo nunca cruza al lado izquierdo del plano, se acerca al eje y sin tocarlo.",
        successMessage:
          "Exploración completa. Anotá en la carpeta qué pasa con el reflejo cuando x es negativo.",
        continueLabel: "Registrar la conclusión"
      },
      {
        kind: "conclusion",
        phase: "Conclusión",
        kicker: "Conclusión",
        kickerKind: "exploration",
        star: "conclusion",
        title: "¿Qué relación quedó establecida?",
        prompt: "Marcá todas las afirmaciones que la reflexión y el laboratorio permiten sostener.",
        multiple: true,
        options: [
          "Una función y su inversa son simétricas respecto de la recta $y = x$.",
          "Si $(a, b)$ pertenece a la función, entonces $(b, a)$ pertenece a su inversa.",
          "La inversa de $y = 2^{x}$ es $y = \\log_{2}(x)$.",
          "La inversa de $y = 2^{x}$ es $y = x^{2}$.",
          "La curva logarítmica también pasa por valores de x negativos."
        ],
        correct: [0, 1, 2],
        hints: [
          "Comprobá cada afirmación con uno de los puntos que cargaste.",
          "Probá la cuarta opción con un punto concreto: si $x = 3$, ¿cuánto da $x^{2}$ y cuánto daba la exponencial?",
          "En el laboratorio, ¿el punto reflejado apareció alguna vez a la izquierda del eje y?"
        ],
        successMessage: "Conclusión registrada. Copiala en la carpeta con el par de puntos que la respalda.",
        continueLabel: "Ir al reto de desbloqueo"
      },
      {
        kind: "graph-choice",
        phase: "Reto · elección",
        kicker: "Reto de desbloqueo",
        kickerKind: "challenge",
        title: "¿Cuál puede ser la inversa?",
        prompt:
          "El sistema muestra tres curvas. Solo una puede ser la inversa de $y = 3^{x}$. Elegí cuál y después vas a tener que justificarlo con un par de puntos.",
        range: { xMin: -1, xMax: 10, yMin: -4, yMax: 4 },
        options: [
          {
            label: "Curva creciente",
            curves: [{ params: { c: 3, a: 1, k: 0, b: 0 }, kind: "transformed" }],
            description: "Crece y corta el eje x en (1, 0)."
          },
          {
            label: "Curva decreciente",
            curves: [{ params: { c: 1 / 3, a: 1, k: 0, b: 0 }, kind: "transformed" }],
            description: "Decrece y corta el eje x en (1, 0)."
          },
          {
            label: "Curva creciente elevada",
            curves: [{ params: { c: 3, a: 1, k: 0, b: 2 }, kind: "transformed" }],
            description: "Crece, pasa por (1, 2) y corta el eje x cerca de x = 0,11."
          }
        ],
        correct: 0,
        hints: [
          "La exponencial $y = 3^{x}$ pasa por $(0, 1)$. ¿Por qué punto tiene que pasar entonces su inversa?",
          "La inversa de una exponencial creciente también crece: eso descarta una de las tres. Entre las dos que quedan, comprobá el punto $(1, 0)$.",
          "Como $3^{0} = 1$, la inversa pasa por $(1, 0)$. Fijate cuál de las curvas pasa exactamente por ese punto."
        ],
        successMessage: "Elección correcta. Ahora justificala con un par de puntos.",
        continueLabel: "Justificar la elección"
      },
      {
        kind: "fields",
        phase: "Reto · justificación",
        kicker: "Reto de desbloqueo",
        kickerKind: "challenge",
        star: "challenge",
        final: true,
        title: "Justificá con un par de puntos",
        prompt:
          "La curva $y = 3^{x}$ pasa por el punto $(2, 9)$, porque $3^{2} = 9$. ¿Qué punto tiene que pertenecer entonces a su inversa?",
        paperNote: "En la hoja: escribí el par intercambiado y la lectura logarítmica que le corresponde.",
        columns: 2,
        fields: [
          {
            label: "Primera coordenada del punto de la inversa",
            expected: 9,
            hints: [
              "Volvé a la regla que usaste con el espejo.",
              "¿Qué coordenada del punto original pasa a ocupar el primer lugar?",
              "La segunda coordenada del punto original se convierte en la primera del reflejo."
            ]
          },
          {
            label: "Segunda coordenada del punto de la inversa",
            expected: 2,
            hints: [
              "La otra coordenada del punto original.",
              "Escribilo también como logaritmo: $\\log_{3}(9) = ?$",
              "El exponente de la potencia $3^{2} = 9$ es el resultado del logaritmo."
            ]
          }
        ],
        successMessage:
          "El punto $(9, 2)$ pertenece a la inversa: $\\log_{3}(9) = 2$ porque $3^{2} = 9$.",
        continueLabel: "Cerrar el nivel"
      }
    ],
    unlock: {
      title: "Espejo recalibrado",
      text:
        "Reconstruiste la reflexión respecto de la recta $y = x$ y reconociste la función logarítmica como la inversa de la exponencial. Con esto queda cerrado el Mundo 1.",
      paperNote:
        "Dejá escrito en la carpeta: un par de puntos $(a, b)$ y $(b, a)$ con sus dos lecturas, la exponencial y la logarítmica."
    }
  }
];
