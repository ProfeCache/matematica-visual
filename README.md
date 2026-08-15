# Matemática Visual

Colección de experiencias web interactivas para enseñar matemática de una forma visual, práctica y fácil de explorar.

Este README cumple dos funciones:

1. Es un espacio para anotar y organizar ideas del proyecto.
2. Es el documento de contexto que debe leer una IA antes de proponer o realizar cambios.

---

## Instrucciones para la IA

> Esta sección es una instrucción directa para cualquier IA que trabaje en el proyecto.

Antes de modificar archivos, leer este README completo. Usar las secciones siguientes como fuente de verdad sobre la intención del proyecto.

- Respetar las decisiones marcadas como **Definido**.
- Tratar lo marcado como **Idea** como una posibilidad, no como una orden de implementación.
- Tratar lo marcado como **Pendiente** como una decisión que todavía necesita definición.
- No inventar contenido pedagógico, público objetivo ni requisitos que contradigan este documento.
- Si falta un dato menor, elegir la opción más simple y coherente con el proyecto.
- Si falta una decisión que cambia mucho el resultado, preguntar antes de implementarla.
- Mantener las experiencias simples, visuales, interactivas y utilizables en celular.
- Al terminar un cambio, explicar qué se hizo, qué archivos se tocaron y cómo comprobarlo.

### Convenciones para escribir ideas

Usar una de estas etiquetas al comienzo de cada punto:

- **[DEFINIDO]** Se debe respetar e implementar.
- **[IDEA]** Se puede analizar o desarrollar, pero todavía no es obligatoria.
- **[PENDIENTE]** Falta tomar una decisión.
- **[DESCARTADO]** No se debe implementar.

Cada idea puede escribirse así:

```md
- [IDEA] Nombre breve
  - Objetivo:
  - Descripción:
  - Prioridad: alta / media / baja
  - Página o tema relacionado:
  - Criterio para considerarla terminada:
```

### Documentos fuente

- `AVENTURA LOGARITMICA.docx` (OneDrive, fuera del repositorio): mapeo de niveles, secuenciación didáctica y estructura del programa interactivo de la Aventura Logarítmica. Volcado en este README el 2026-08-14. Ante una duda sobre esa experiencia, este README refleja el documento; si algo no está acá, preguntar.

---

## Visión del proyecto

- **Objetivo principal:** que la matemática se comprenda a partir de representaciones visuales manipulables, y que la pantalla genere la necesidad de producir matemática en papel en lugar de reemplazarla.
- **Problema que busca resolver:** el uso de la tecnología como calculadora que resuelve por el alumno. Acá la aplicación plantea problemas, visualiza relaciones y verifica conjeturas, pero el cálculo y la justificación siguen siendo del estudiante.
- **Resultado esperado:** recorridos por niveles donde el estudiante explora, anticipa, calcula en la carpeta, carga su producción en el programa y recién entonces avanza.

### Principio de ida y vuelta: Aplicación – Hoja – Programa interactivo

- **[DEFINIDO]** La hoja no es un anexo y la aplicación no es un premio posterior. Forman una única actividad: la pantalla crea la necesidad, la hoja permite producir matemáticamente y la pantalla devuelve esa producción como objeto visual que puede ponerse a prueba.
- **[DEFINIDO]** El programa debe indicar explícitamente cuándo trabajar en la carpeta y cuándo volver a la pantalla.

| Momento | Qué ocurre | Función didáctica |
|---|---|---|
| El programa plantea | Aparece una misión, una gráfica incompleta, un error o un problema | Generar necesidad de actuar |
| Predicción | El estudiante anticipa qué cree que ocurrirá | Hacer visible la conjetura |
| Salida a la hoja | La aplicación pide calcular, dibujar, completar una tabla o justificar | Evitar la respuesta puramente automática |
| Regreso al programa | Se ingresan los puntos, intervalos, valores o decisiones obtenidas | Convertir el cálculo en objeto visual |
| Comprobación | El programa grafica, compara o devuelve retroalimentación | Contrastar con la evidencia |
| Desbloqueo | Se propone un ejercicio nuevo que debe resolverse sin ayuda directa | Validar aprendizaje antes de avanzar |

## Público

- **Nivel o edad:** **[PENDIENTE]** _Completar acá._ (La Aventura Logarítmica corresponde a función logarítmica de escuela secundaria, pero el curso exacto no está definido en el documento fuente.)
- **Conocimientos previos:** función exponencial, potencias y lectura de gráficos en el plano cartesiano.
- **Contexto de uso:** clase de seis semanas con carpeta o cuaderno siempre a mano; se usa en celular y también proyectado en computadora para trabajo colectivo.

## Parte visual

### Definiciones

- **[DEFINIDO]** La matemática debe poder comprenderse mediante representaciones visuales.
- **[DEFINIDO]** La interfaz debe adaptarse a pantallas de celular (diseño móvil primero) y además poder proyectarse en computadora.
- **[DEFINIDO]** El estado de cada nodo del mapa (disponible, superado, bloqueado) debe ser visible.
- **[DEFINIDO]** Buen contraste, controles grandes y textos legibles.
- **[PENDIENTE]** Paleta de colores: _Completar acá._
- **[PENDIENTE]** Tipografías: _Completar acá._
- **[PENDIENTE]** Estilo general: _Completar acá._

### Ideas visuales

- **[IDEA]** Recursos del laboratorio: rastros de curvas anteriores, congelar la curva previa para comparar, resaltar sobre el gráfico la propiedad seleccionada, animación de reflexión respecto de `y = x`.

### Evitar

- **[DEFINIDO]** Evitar que el gráfico aparezca antes de la producción del estudiante: el sistema colorea, grafica o valida recién después de la respuesta.
- **[PENDIENTE]** _Anotar estilos, colores o recursos visuales que no querés usar._

## Parte práctica e interacción

### Acciones del estudiante

- **[DEFINIDO]** Predecir antes de manipular cualquier control.
- **[DEFINIDO]** Cargar en la aplicación lo producido en papel: puntos, intervalos, parámetros, ecuaciones o elecciones.
- **[IDEA]** Mover sliders y puntos móviles, arrastrar tarjetas para armar equivalencias o secuencias inversas, seleccionar intervalos sobre el eje x, superponer una curva propia sobre una curva objetivo.

### Actividades o desafíos

- **[DEFINIDO]** Cada nivel termina con un reto de desbloqueo: una situación distinta de la práctica guiada, para impedir que el avance dependa de repetir mecánicamente la misma respuesta.
- **[DEFINIDO]** Mecánicas narrativas recurrentes:
  - **Incidentes tecnológicos:** el graficador, el detector de dominio o el sistema de puntos "se rompe" y no puede continuar hasta que los estudiantes produzcan en papel la información faltante.
  - **Información incompleta:** la pantalla oculta la ecuación, la gráfica o algunos datos para obligar a reconstruirlos.
  - **Laboratorio:** cuando el sistema vuelve a funcionar, el estudiante usa sliders, puntos móviles, rastros, comparación y superposición.
  - **Registro:** la aplicación guarda estrellas, retos superados y conclusiones, y puede pedir que parte de la producción quede escrita en la carpeta.

### Respuesta del sistema

- **[DEFINIDO]** Retroalimentación gradual: primer error, indicio visual o conceptual; segundo error, pregunta orientadora; recién después, una pista más explícita.
- **[DEFINIDO]** El error no reinicia el nivel. El programa ofrece pistas escalonadas y permite volver al cuaderno.
- **[DEFINIDO]** Ante un punto incorrecto, el programa no lo corrige: indica qué coordenada revisar o recuerda la relación exponencial–logarítmica.

## Contenido matemático y pedagógico

### Temas

- **[DEFINIDO]** Función logarítmica (recorrido completo de seis semanas, ver *Aventura Logarítmica*): ecuación por definición, función inversa, `f(x) = logc(ax)`, parámetro `k`, parámetro `b`, función general y análisis completo (dominio, imagen, cero, ordenada al origen, positividad y negatividad).
- Otros temas ya presentes en el repositorio: función exponencial, derivadas, división y restos, área del triángulo.

### Enfoque didáctico

- **[DEFINIDO]** Favorecer la exploración y la comprensión antes que la memorización mecánica.
- **[DEFINIDO]** Ningún nivel se habilita por haberlo abierto: para avanzar hay que completar una actividad y superar un reto de desbloqueo.
- **[DEFINIDO]** El reto puede ser una ecuación, la construcción de una gráfica, la introducción de puntos calculados en la carpeta, la identificación de intervalos o la reproducción de una función objetivo.
- **[DEFINIDO]** La carpeta funciona como espacio de exploración y cálculo; el programa funciona como escenario, laboratorio, verificador y registro de progreso.

### Errores o confusiones que se deben trabajar

- **[DEFINIDO]** Dirección del desplazamiento horizontal: "si aparece `-k` la curva se mueve a la izquierda", ¿verdadero o falso? Se trabaja por experimentación, no por enunciado.
- **[IDEA]** Confundir la condición de existencia del logaritmo con el cero de la función.
- **[IDEA]** Suponer que el dominio o la imagen cambian al modificar `b`.

## Textos y tono

- **Tono deseado:** narrativo y de misión, directo con el estudiante, sin infantilizar. La consigna siempre dice qué hacer y dónde (pantalla o carpeta).
- **Vocabulario a usar:** misión, nivel, mundo, laboratorio, ficha de análisis, frontera del dominio, reto de desbloqueo, predicción, conclusión.
- **Vocabulario a evitar:** **[PENDIENTE]** _Completar acá._
- **Ejemplo de mensaje correcto:** "El graficador se rompió. Necesitamos cuatro puntos para recuperarlo. Abrí tu cuaderno y calculá los puntos."

## Accesibilidad y dispositivos

- **[DEFINIDO]** Las actividades deben poder usarse en celular.
- **[DEFINIDO]** Accesibilidad matemática: además de los sliders, siempre debe existir la posibilidad de ingresar valores exactos por campo numérico.
- **[DEFINIDO]** Buen contraste, controles grandes y textos legibles.
- **[PENDIENTE]** Uso completo con teclado: _sí / no / según la actividad._
- **[PENDIENTE]** Contraste y tamaño mínimo de texto: _Completar acá._
- **[PENDIENTE]** Sonido, subtítulos o alternativas textuales: _Completar acá._

## Ideas por experiencia

Usar este espacio cuando una idea pertenece a una página concreta.

### Función exponencial (`index.html`, `celular.html`, `prueba.html`)

- **[IDEA]** _Completar acá._

### Funciones y derivadas (`derivadas.html`)

- **[IDEA]** _Completar acá._

### División y restos (`restos.html`, `polinomio.html`)

- **[IDEA]** _Completar acá._

### Área del triángulo (`rectangulo.html`)

- **[IDEA]** _Completar acá._

### La medalla perdida (`juego.html`)

- **[IDEA]** _Completar acá._

### Aventura de logaritmos (`Plan aulico/index.html`)

Ver la sección completa [Aventura Logarítmica](#aventura-logarítmica-plan-aulico) más abajo.

---

## Aventura Logarítmica (`Plan aulico/`)

**[DEFINIDO]** Recorrido de 6 semanas, 6 mundos y 18 niveles con progresión por retos. Cada clase tiene un nivel principal y cada nivel combina exploración visual, cálculo, producción en la carpeta y validación dentro de la aplicación.

### Mapa general de mundos

| Mundo | Contenidos | Niveles |
|---|---|---|
| 1 – "El código logarítmico" | Ecuación por definición; función inversa; logarítmica como inversa de la exponencial | 1 a 3 |
| 2 – "Primer territorio" | `f(x) = logc(ax)` con `c > 1` y `0 < c < 1`. Análisis del gráfico | 4 a 6 |
| 3 – "La frontera se mueve" | `f(x) = logc(ax - k)`. Dominio, ceros, imagen, ordenada, signo | 7 a 9 |
| 4 – "El ascensor" | `f(x) = logc(ax) + b`. Desplazamiento vertical y análisis | 10 a 12 |
| 5 – "Control total" | `f(x) = logc(ax - k) + b`. Integración de parámetros y análisis | 13 a 15 |
| 6 – "Desafío final" | Ejercitación, revisión y trabajo final | 16 a 18 |

> **[PENDIENTE]** Notación de los parámetros: el documento fuente escribe a veces `logc(ax - k)` y a veces `logc(ax + k)` para el Mundo 5. Acá se usa `- k` en todo el recorrido, igual que en el Mundo 3. Confirmar antes de implementar.

### Mundo 1 – El código logarítmico

*Semana 1: construir la relación entre escritura exponencial, logarítmica e inversa antes de iniciar el análisis matemático de funciones.*

**Nivel 1 – "La calculadora desconfigurada"** · Ecuación logarítmica aplicando la definición

- *Narrativa:* la calculadora que traduce entre lenguaje exponencial y logarítmico perdió parte de sus equivalencias; para repararla hay que reconstruirlas.
- *En el programa:* muestra pares incompletos como `log2(32) = ?` y `2^? = 32`. Primero se arrastran tarjetas para formar equivalencias; luego aparecen ecuaciones nuevas.
- *Puente a la carpeta:* ante el aviso "la calculadora no puede calcular", resolver 3 o 4 ecuaciones pasando de forma logarítmica a exponencial, escribiendo cada transformación y no solo el resultado.
- *Regreso:* se ingresan los exponentes obtenidos; si coinciden, el sistema completa visualmente ambos lenguajes y habilita una ronda de práctica.
- *Desbloqueo:* resolver una ecuación logarítmica nueva por definición y completar correctamente tanto la escritura exponencial equivalente como el valor de la incógnita.

**Nivel 2 – "La máquina que hace y deshace"** · Concepto de función inversa

- *Narrativa:* una máquina transforma entradas, pero se perdió el mecanismo; hay que construir la máquina que deshace cada operación.
- *En el programa:* una secuencia del tipo `x → ×2 → +3 → y`. Se pueden probar entradas y observar salidas, pero la ruta inversa está vacía.
- *Puente a la carpeta:* elegir tres valores de entrada, completar una tabla x–y y escribir qué operaciones y en qué orden permiten volver de `y` a `x`.
- *Regreso:* se arma la secuencia inversa arrastrando operaciones (`−3`, `÷2`, etc.) y se carga un par de puntos para comprobar el valor inicial.
- *Desbloqueo:* dada una nueva máquina de dos operaciones, construir su inversa y recuperar correctamente dos valores de entrada a partir de sus salidas.

**Nivel 3 – "El espejo"** · La logarítmica como inversa de la exponencial

- *Narrativa:* el espejo del plano cartesiano está descalibrado y solo puede reconstruirse usando pares de puntos de una exponencial y su inversa.
- *En el programa:* se ven `y = 2^x` y la recta `y = x`, pero la curva invertida está oculta y el botón "reflejar" bloqueado.
- *Puente a la carpeta:* con tres puntos de la exponencial, intercambiar coordenadas `(x, y) → (y, x)` y anticipar dónde deberían aparecer los puntos reflejados.
- *Regreso:* se cargan los puntos; si son correctos, se activa la animación de reflexión y aparece `y = log2(x)` conectando ambos gráficos.
- *Desbloqueo:* seleccionar la gráfica que puede ser inversa de una exponencial dada y justificarlo con pares de puntos intercambiados.

### Mundo 2 – Primer territorio

*Semana 2: explorar `f(x) = logc(ax)`, distinguir para qué sirve la base y comenzar el análisis de dominio, imagen, cero, ordenada y signo.*

**Nivel 4 – "Se rompió el graficador"** · `f(x) = logc(ax)` con `c > 1` y `0 < c < 1`

- *Narrativa:* el graficador dejó de dibujar; la única forma de repararlo es darle puntos correctos calculados por los alumnos.
- *En el programa:* se elige una función sencilla (por ejemplo `f(x) = log2(x)` o `f(x) = log2(2x)`). La cuadrícula aparece vacía y "graficar automáticamente" está deshabilitado.
- *Puente a la carpeta:* calcular una tabla de al menos cuatro pares `(x, f(x))`, usando la definición de logaritmo cuando sea posible.
- *Regreso:* se ingresan los puntos uno por uno; con suficientes puntos correctos el programa une la curva y "repara" el graficador. Luego se cambia la base para observar `c > 1` y `0 < c < 1`.
- *Desbloqueo:* calcular en papel tres puntos de una función nueva, cargarlos sin error y anticipar si la curva será creciente o decreciente antes de que el programa la dibuje.

**Nivel 5 – "Detective de la gráfica"** · Dominio, imagen, cero y ordenada al origen

- *Narrativa:* el analizador de propiedades perdió sus etiquetas; la gráfica está visible, pero hay que reconstruir su ficha.
- *En el programa:* se puede mover un punto por la curva y leer coordenadas, pero no se muestran dominio, imagen, cero ni ordenada.
- *Puente a la carpeta:* responder con una breve justificación: ¿qué valores de `x` pueden ingresar?, ¿qué valores de `y` aparecen?, ¿dónde corta el eje x?, ¿existe corte con el eje y?
- *Regreso:* se cargan las cuatro propiedades y la aplicación ilumina en el gráfico la que se selecciona, para verificar.
- *Desbloqueo:* completar correctamente la ficha de análisis de una segunda función, sin la ayuda del resaltado.

**Nivel 6 – "Territorios positivos y negativos"** · Conjuntos de positividad y negatividad

- *Narrativa:* el mapa perdió los colores que indican cuándo la función está por encima o por debajo del eje x.
- *En el programa:* la gráfica se muestra sin colores y se pueden seleccionar intervalos del eje x.
- *Puente a la carpeta:* dibujar un esquema de la gráfica, marcar el cero, sombrear dónde `f(x) > 0` y `f(x) < 0` y escribir los intervalos.
- *Regreso:* se ingresan o seleccionan los intervalos; el sistema colorea solo después de la respuesta y permite comparar con el esquema de papel.
- *Desbloqueo:* dada otra función, identificar cero, positividad y negatividad en una única misión sin pistas.

### Mundo 3 – La frontera se mueve

*Semana 3: incorporar el parámetro `k` en `f(x) = logc(ax - k)` y vincular la transformación horizontal con la condición de existencia del logaritmo.*

**Nivel 7 – "La frontera cambia de lugar"** · `f(x) = logc(ax - k)`

- *Narrativa:* apareció una barrera vertical en el plano y el sistema no sabe dónde ubicarla; hay que descubrir qué controla su posición.
- *En el programa:* hay sliders para `a` y `k`, pero el movimiento se bloquea después de una primera observación, para obligar a anticipar.
- *Puente a la carpeta:* para valores dados de `a` y `k`, resolver `ax - k > 0` y predecir si al aumentar `k` la región permitida se mueve a la derecha o a la izquierda.
- *Regreso:* se introduce el valor de la frontera y se coloca manualmente una línea vertical; recién entonces se habilita el slider de `k` para constatar la predicción.
- *Desbloqueo:* determinar en la carpeta el dominio de una función nueva y ubicar correctamente su frontera antes de ver la gráfica.

**Nivel 8 – "El detector de dominio está fuera de servicio"** · Dominio, imagen, cero y ordenada

- *Narrativa:* el programa puede dibujar parte de la curva, pero no sabe qué puntos son válidos porque el detector del argumento dejó de funcionar.
- *En el programa:* propone valores de `x`; algunos producen argumentos positivos y otros no. Hay que decidir cuáles pueden ingresar al logaritmo.
- *Puente a la carpeta:* completar una tabla con `x`, `ax - k` y la decisión "admite / no admite"; después resolver formalmente la desigualdad del dominio y, cuando corresponda, el cero.
- *Regreso:* se cargan los valores válidos y el intervalo de dominio. Los puntos rechazados quedan marcados fuera de la zona permitida y el sistema reconstruye la curva.
- *Desbloqueo:* analizar una función distinta y completar dominio, imagen y cero correctamente.

**Nivel 9 – "Reconstrucción forense"** · Análisis completo y signo

- *Narrativa:* solo quedó una captura de una gráfica; hay que reconstruir la información que pudo producirla.
- *En el programa:* se muestra una gráfica objetivo, su frontera y algunos puntos, pero se oculta la ecuación.
- *Puente a la carpeta:* anotar observaciones (crecimiento/decrecimiento, frontera, cero, posible valor de `k`, conjuntos de positividad y negatividad). No hace falta adivinar todos los parámetros de inmediato.
- *Regreso:* con controles limitados, se ajustan parámetros para acercar la curva al objetivo y luego se completa la ficha de análisis.
- *Desbloqueo:* conseguir una superposición aceptable y responder correctamente dominio, cero y signo de la función reconstruida.

### Mundo 4 – El ascensor

*Semana 4: analizar el efecto del parámetro `b` en `f(x) = logc(ax) + b`, comparando qué propiedades cambian y cuáles permanecen.*

**Nivel 10 – "El ascensor vertical"** · `f(x) = logc(ax) + b`

- *Narrativa:* el sistema vertical del graficador funciona, pero perdió las coordenadas de referencia de la curva original.
- *En el programa:* se ve la curva base y un slider para `b`; antes de moverlo, la aplicación pide una predicción.
- *Puente a la carpeta:* elegir tres puntos de la curva base y calcular qué ocurre con sus coordenadas al sumar un valor de `b`, completando una tabla "antes / después".
- *Regreso:* se cargan los nuevos puntos y se comparan con la curva que produce el slider; se puede congelar la curva anterior para ver el desplazamiento.
- *Desbloqueo:* dado un valor de `b`, calcular y cargar tres puntos transformados y decidir la dirección del desplazamiento sin mover previamente el slider.

**Nivel 11 – "Qué cambió y qué sobrevivió"** · Comparación entre `b = 0` y `b ≠ 0`

- *Narrativa:* el sistema mezcló las propiedades de dos funciones y hay que clasificarlas.
- *En el programa:* tarjetas con "dominio", "imagen", "cero", "ordenada", "frontera" y "posición vertical", y dos columnas: CAMBIA / NO CAMBIA.
- *Puente a la carpeta:* comparar dos funciones con distinto `b`, completar un cuadro y anotar evidencias tomadas de la gráfica.
- *Regreso:* se arrastran las tarjetas; al validar, el programa muestra una comparación animada entre las dos curvas.
- *Desbloqueo:* analizar una tercera función y responder qué propiedades cambian al modificar `b`, con al menos una justificación correcta.

**Nivel 12 – "Misión: mover el cero"** · Positividad y negatividad

- *Narrativa:* para abrir la puerta del mundo siguiente hay que hacer que la curva cruce el eje x en un punto objetivo.
- *En el programa:* se marca un objetivo sobre el eje x. Solo se puede modificar `b` después de calcular qué valor se necesita.
- *Puente a la carpeta:* resolver `f(x) = 0` para el punto pedido o comparar con la función base; luego determinar los intervalos de positividad y negatividad.
- *Regreso:* se introduce `b`; si el cero coincide con el objetivo, la app colorea el signo y pide cargar los intervalos calculados.
- *Desbloqueo:* construir una función con un cero asignado y completar sus conjuntos de positividad y negatividad.

### Mundo 5 – Control total

*Semana 5: integrar todos los parámetros en `f(x) = logc(ax - k) + b` y pasar de la exploración aislada a la construcción y el análisis global.*

**Nivel 13 – "Panel de control completo"** · `f(x) = logc(ax - k) + b`

- *Narrativa:* se habilitan por primera vez todos los controles del graficador; el desafío es usarlos con intención y no por ensayo ciego.
- *En el programa:* sliders y campos numéricos para `c`, `a`, `k` y `b`; guardar una curva anterior, mostrar rastro y reiniciar.
- *Puente a la carpeta:* antes de tocar los controles, con una función concreta, anticipar crecimiento/decrecimiento, frontera del dominio y desplazamiento vertical.
- *Regreso:* se ingresan los parámetros y se compara la gráfica real con la predicción; el programa pide marcar qué anticipaciones fueron correctas y cuáles deben revisarse.
- *Desbloqueo:* ajustar los cuatro parámetros para cumplir tres condiciones simultáneas dadas por la aplicación.

**Nivel 14 – "Se perdió la ficha técnica"** · Dominio, imagen, cero y ordenada en la función general

- *Narrativa:* la curva funciona, pero la base de datos perdió todas sus propiedades analíticas.
- *En el programa:* la gráfica puede consultarse, pero la ficha está vacía y el botón "analizar" permanece deshabilitado.
- *Puente a la carpeta:* resolver la condición `ax - k > 0`, el dominio, el cero mediante `f(x) = 0` y la existencia de ordenada al origen; registrar también la imagen.
- *Regreso:* cada propiedad se carga en un formulario; al completarlo, el programa destaca gráficamente dominio, cero y posibles intersecciones para verificar.
- *Desbloqueo:* completar la ficha de una segunda función general con todas las propiedades solicitadas.

**Nivel 15 – "Jefe del mundo: ingeniería inversa"** · Análisis completo

- *Narrativa:* el último sistema de seguridad no muestra la ecuación: solo una gráfica y algunas condiciones.
- *En el programa:* se presenta una curva objetivo que el alumno puede consultar junto con algunas condiciones.
- *Puente a la carpeta:* hacer una ficha completa (tipo de crecimiento, dominio, imagen, cero, ordenada si existe, positividad y negatividad) y proponer parámetros posibles.
- *Regreso:* se ajusta una función en el laboratorio para aproximarla a la gráfica objetivo y se cargan todos los intervalos calculados.
- *Desbloqueo:* superar el análisis integral de una gráfica nueva con un mínimo de respuestas correctas (por defecto tres, configurable por el docente). Al lograrlo se abre el mundo final.

### Mundo 6 – Desafío final

*Semana 6: recuperar y articular lo aprendido mediante ejercitación, revisión global y una producción final en la que el estudiante diseña una función.*

**Nivel 16 – "Ruta de entrenamiento"** · Ejercitación

- *En el programa:* rutas de ecuaciones, inversa, dominio, transformaciones, análisis gráfico y signo; cada ruta con micro-retos.
- *Puente a la carpeta:* algunos micro-retos activan el modo "sin graficador": resolver una ecuación, completar una tabla o dibujar un bosquejo antes de continuar.
- *Regreso:* las respuestas se cargan en la app y el gráfico aparece solo después de la resolución. El progreso queda registrado por área.
- *Desbloqueo:* completar una cantidad mínima de micro-retos en al menos tres rutas diferentes.

**Nivel 17 – "Escape logarítmico"** · Revisión

- *Narrativa:* cinco cerraduras protegen el acceso al trabajo final, una por cada idea central del recorrido: 1) ecuaciones, 2) inversa, 3) dominio, 4) transformaciones, 5) análisis gráfico.
- *Puente a la carpeta:* cada cerradura entrega un problema que debe desarrollarse en la hoja. La aplicación no acepta solo una opción múltiple: exige cargar un valor, intervalo, punto o parámetro obtenido.
- *Regreso:* cada respuesta correcta entrega un dígito o símbolo del código final. Ante un error, la app habilita una pista conceptual, nunca el procedimiento completo.
- *Desbloqueo:* abrir las cinco cerraduras y completar el código. No se puede acceder al Nivel 18 sin superar esta revisión.

**Nivel 18 – "Creá tu propia función"** · Trabajo final integrador

- *Narrativa:* la misión final ya no consiste en descubrir una función dada: el estudiante debe diseñarla.
- *En el programa:* el sistema genera o permite elegir condiciones (creciente/decreciente, frontera del dominio, cero, desplazamiento vertical y algún punto obligatorio).
- *Puente a la carpeta:* diseñar primero en la hoja una función posible, justificar los parámetros elegidos, calcular al menos tres puntos de control y anticipar la gráfica.
- *Regreso:* se carga la función en el laboratorio, se comparan los puntos calculados con la gráfica y se corrigen decisiones si es necesario. Al finalizar, el programa genera una ficha con ecuación, gráfica y propiedades.
- *Desbloqueo:* presentar una función que cumpla todas las condiciones del desafío y completar correctamente su análisis. Este reto cierra la aventura y habilita el registro final de logros.

### Estructura funcional del programa

**Pantallas**

- **Inicio:** nombre del recorrido, botón continuar / nueva partida y acceso docente.
- **Mapa:** seis mundos, niveles principales, misiones secundarias y candados, con el estado de cada nodo visible.
- **Nivel:** presenta la historia, la consigna y el objetivo.
- **Laboratorio:** plano cartesiano, sliders, campos de entrada, puntos móviles, rastros, curvas anteriores, asíntota o frontera y reinicio.
- **Modo hoja o carpeta:** bloquea temporalmente ciertas ayudas y da una consigna explícita para resolver en el cuaderno.
- **Carga de resultados:** formulario para ingresar puntos, intervalos, parámetros, ecuaciones o elecciones obtenidas en papel.
- **Reto de desbloqueo:** problema final obligatorio y distinto de la actividad guiada.

**Componentes obligatorios de cada nivel**

| Componente | Función |
|---|---|
| Disparador | Presenta una misión o problema |
| Predicción | Obliga a anticipar antes de manipular |
| Exploración | Permite observar y probar dentro del laboratorio |
| Puente a la hoja | Solicita cálculo, bosquejo, tabla, desarrollo o justificación |
| Carga | Devuelve la producción de la hoja a la aplicación |
| Comprobación | Grafica, compara, resalta o valida |
| Conclusión | Registra una regularidad o idea matemática |
| Reto final | Comprueba el aprendizaje con una situación nueva |

**Progreso y desbloqueo**

- **Condición mínima:** el reto de desbloqueo debe estar aprobado para habilitar el siguiente nivel.
- **Estrellas:** una por exploración, una por conclusión y una por reto. Se puede avanzar con el reto aprobado aunque falten estrellas.
- **Reintentos:** el error no reinicia el nivel; hay pistas escalonadas y se puede volver al cuaderno.
- **Sin atajos:** el botón "siguiente" aparece únicamente cuando el sistema registra el reto como superado.
- **Modo docente:** el profesor puede desbloquear manualmente si una decisión pedagógica lo requiere.

**Modo docente**

- Bloquear o habilitar mundos según el avance real de la clase.
- Elegir qué parámetros aparecen disponibles en cada laboratorio.
- Activar un nivel en modo proyección para exploración colectiva.
- Reiniciar el progreso de un estudiante o grupo.
- Configurar la cantidad de respuestas correctas necesarias para superar un reto.
- Ver un resumen de niveles superados y dificultades frecuentes.
- Agregar en el futuro nuevas misiones secundarias sin modificar el recorrido principal.

### Misiones secundarias para ampliar

Los 18 niveles forman el recorrido mínimo. Las misiones secundarias pueden colgar de cualquier nivel sin alterar la secuencia central.

| Tipo | Ejemplo | Uso |
|---|---|---|
| Archivo teórico | Breve institucionalización sobre dominio o función inversa | Recuperar teoría sin cortar la aventura |
| Error bajo investigación | "Si aparece `-k` la curva se mueve a la izquierda", ¿verdadero o falso? | Trabajar errores frecuentes mediante experimentación |
| Laboratorio libre | Construir una función que pase por ciertos puntos | Explorar más allá de la consigna principal |
| Desafío extra | Problema con menos pistas o parámetros combinados | Profundización para quien avanza más rápido |

### Ejemplo de experiencia completa dentro de un nivel

1. La aplicación anuncia: "El graficador se rompió. Necesitamos cuatro puntos para recuperarlo".
2. Aparece la función y una tabla vacía: "Abrí tu cuaderno y calculá los puntos".
3. El estudiante desarrolla las cuentas en la hoja.
4. Vuelve a la aplicación y carga cada par ordenado.
5. Si un punto es incorrecto, el programa no lo corrige: indica qué coordenada revisar o recuerda la relación exponencial–logarítmica.
6. Cuando los puntos son correctos, la aplicación los ubica y reconstruye la curva.
7. El estudiante compara su anticipación con la gráfica y registra una conclusión.
8. Aparece un nuevo ejercicio sin pasos guiados. Solo al resolverlo se desbloquea el nivel siguiente.

### Criterios para el desarrollo técnico

- **[DEFINIDO]** **Datos separados del HTML:** cada nivel debe definirse como un objeto de datos con `id`, mundo, contenido, actividad, consigna de hoja, validación y reto, para poder agregar misiones sin reescribir la interfaz.
- **[DEFINIDO]** **Validadores específicos:** no todas las respuestas son texto; hacen falta validadores de puntos, intervalos, parámetros, selección gráfica y superposición.
- **[DEFINIDO]** **Diseño móvil primero:** el recorrido debe funcionar desde celular y además proyectarse en computadora para la clase.
- **[DEFINIDO]** **Retroalimentación gradual:** primer error, indicio visual o conceptual; segundo error, pregunta orientadora; recién después, una pista más explícita.
- **[DEFINIDO]** **Accesibilidad matemática:** buen contraste, controles grandes, ingreso de valores exactos además de sliders y textos legibles.

---

## Prioridades actuales

1. **[DEFINIDO]** Migrar la Aventura Logarítmica (`Plan aulico/index.html`) a una definición de niveles por datos, con los 18 niveles y sus 6 mundos según el mapa de arriba.
2. **[DEFINIDO]** Implementar el ciclo obligatorio de cada nivel (disparador, predicción, exploración, puente a la hoja, carga, comprobación, conclusión, reto) con los validadores de puntos e intervalos.
3. **[DEFINIDO]** Implementar el progreso: estrellas, reintentos con pistas escalonadas y bloqueo del botón "siguiente" hasta aprobar el reto.
4. **[PENDIENTE]** Modo docente y misiones secundarias.

## Criterios generales de calidad

Un cambio está terminado cuando:

- responde a una prioridad o instrucción definida en este documento;
- funciona tanto en computadora como en celular;
- no rompe las otras experiencias del proyecto;
- los controles y textos se entienden sin explicación adicional;
- representa correctamente el contenido matemático;
- fue probado en los tamaños de pantalla relevantes;
- respeta el principio de ida y vuelta: la pantalla no resuelve lo que debe producir el estudiante en la carpeta.

## Registro de decisiones

<!-- Sirve para que una decisión importante no se pierda ni sea revertida accidentalmente por una IA. -->

| Fecha | Estado | Decisión | Motivo | Afecta a |
|---|---|---|---|---|
| 2026-08-14 | Definido | La Aventura Logarítmica se organiza en 6 mundos y 18 niveles, uno por clase durante 6 semanas | Alinear el recorrido interactivo con el cronograma de aula | `Plan aulico/` |
| 2026-08-14 | Definido | Ningún nivel se habilita por haberlo abierto: hace falta superar un reto de desbloqueo distinto de la práctica guiada | Evitar el avance por repetición mecánica | `Plan aulico/` |
| 2026-08-14 | Definido | Toda actividad incluye un puente obligatorio a la carpeta y la carga posterior de esa producción en el programa | La aplicación no debe reemplazar el cálculo del estudiante | Proyecto completo |
| 2026-08-14 | Definido | Los niveles se describen como datos, no como HTML fijo | Poder agregar misiones sin reescribir la interfaz | `Plan aulico/` |

## Próximo pedido para la IA

<!-- Escribí acá la tarea concreta. Esta sección tiene prioridad sobre las ideas generales, pero no puede contradecir las decisiones definidas. -->

**Tarea:** _Completar acá._

**Archivos o páginas involucradas:** _Completar acá._

**Debe incluir:**

- _Completar acá._

**No debe incluir:**

- _Completar acá._

**Se considera terminado cuando:**

- _Completar acá._
