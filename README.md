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
- Si falta una decisión que cambia mucho el resultado, preguntar antes de implementarla. Las que ya están identificadas están reunidas en *[Decisiones pendientes antes de implementar](#decisiones-pendientes-antes-de-implementar)*: leer esa sección antes de tocar `Plan aulico/`.
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

- **Nivel o edad:** **[PENDIENTE]** _Sexto año de secundaria, edad de 17 años_ (La Aventura Logarítmica corresponde a función logarítmica de escuela secundaria, pero el curso exacto no está definido en el documento fuente.)
- **Conocimientos previos:** función exponencial, potencias y lectura de gráficos en el plano cartesiano.
- **Contexto de uso:** clase de seis semanas con carpeta o cuaderno siempre a mano; se usa en celular y también proyectado en computadora para trabajo colectivo.

## Parte visual

### Definiciones

- **[DEFINIDO]** La matemática debe poder comprenderse mediante representaciones visuales.
- **[DEFINIDO]** La interfaz debe adaptarse a pantallas de celular (diseño móvil primero) y además poder proyectarse en computadora.
- **[DEFINIDO]** El estado de cada nodo del mapa (disponible, superado, bloqueado) debe ser visible.
- **[DEFINIDO]** Buen contraste, controles grandes y textos legibles.
- **[DEFINIDO]** Paleta de colores: _## Identidad visual de Logaria

La interfaz de **Logaria** debe transmitir una combinación de:

* matemática;
* tecnología;
* exploración;
* aventura;
* claridad visual;
* profesionalismo docente.

El objetivo es evitar una estética excesivamente infantil o de videojuego genérico. La aplicación debe conservar una identidad lúdica y atractiva para estudiantes, pero al mismo tiempo verse como una herramienta educativa seria y cuidada.

---

## Paleta de colores

Usar la siguiente paleta como base de toda la aplicación:

```css
:root {
  --background: #0F172A;
  --surface: #1E293B;

  --primary: #3B82F6;
  --secondary: #8B5CF6;
  --exploration: #14B8A6;

  --challenge: #F59E0B;
  --success: #22C55E;
  --error: #EF4444;

  --text-primary: #F8FAFC;
  --text-secondary: #CBD5E1;

  --border: #334155;
  --axis: #94A3B8;
}
```

### Función de cada color

| Color          | HEX       | Uso                                                              |
| -------------- | --------- | ---------------------------------------------------------------- |
| Azul noche     | `#0F172A` | Fondo principal                                                  |
| Azul pizarra   | `#1E293B` | Tarjetas, paneles y menús                                        |
| Azul eléctrico | `#3B82F6` | Acciones principales, botones y función base                     |
| Violeta        | `#8B5CF6` | Identidad de Logaria, mundos, portales y funciones transformadas |
| Turquesa       | `#14B8A6` | Exploración, laboratorios y puntos del estudiante                |
| Ámbar          | `#F59E0B` | Retos, estrellas, recompensas y asíntotas                        |
| Verde          | `#22C55E` | Respuesta correcta, misión completada                            |
| Rojo           | `#EF4444` | Error o respuesta que debe revisarse                             |
| Blanco azulado | `#F8FAFC` | Texto principal                                                  |
| Gris claro     | `#CBD5E1` | Texto secundario                                                 |
| Gris azulado   | `#334155` | Bordes y cuadrícula                                              |

---

## Significado pedagógico de los colores

Los colores no deben utilizarse únicamente de forma decorativa. Deben conservar un significado estable durante toda la experiencia.

* **Azul:** información, acción principal o función de referencia.
* **Violeta:** narrativa, mundos, portales y transformaciones.
* **Turquesa:** exploración matemática y producción del estudiante.
* **Ámbar:** desafío, misión especial, recompensa o elemento a observar.
* **Verde:** respuesta correcta o objetivo alcanzado.
* **Rojo:** error o elemento que necesita ser revisado.

No depender exclusivamente del color para comunicar correcto/incorrecto. Utilizar también iconos, texto y feedback visible.

---

## Tipografías

Utilizar como máximo dos tipografías principales.

### Space Grotesk

Usar **Space Grotesk** para:

* logo de Logaria;
* nombres de mundos;
* títulos de niveles;
* pantallas de desbloqueo;
* recompensas;
* elementos narrativos destacados.

Pesos recomendados:

```css
font-weight: 600;
font-weight: 700;
```

### Inter

Usar **Inter** para:

* consignas;
* explicaciones;
* botones;
* menús;
* tarjetas;
* formularios;
* tablas;
* ayudas;
* feedback;
* textos de interfaz.

Pesos recomendados:

```css
font-weight: 400; /* texto normal */
font-weight: 500; /* controles */
font-weight: 600; /* subtítulos */
font-weight: 700; /* elementos destacados */
```

Ejemplo:

```css
body {
  font-family: "Inter", sans-serif;
  background: var(--background);
  color: var(--text-primary);
}

h1,
h2,
h3,
.world-title,
.level-title,
.logo {
  font-family: "Space Grotesk", sans-serif;
}
```

---

## Expresiones matemáticas

Las expresiones matemáticas no deben escribirse utilizando manualmente la tipografía general de la interfaz.

Cuando sea posible utilizar:

* KaTeX;
* MathJax;
* otra herramienta específica de renderizado matemático.

Ejemplo:

[
f(x)=\log_c(ax-k)
]

Debe existir una diferencia visual clara entre el lenguaje natural de la consigna y el lenguaje matemático.

---

## Gráficos matemáticos

Mantener una convención cromática estable en todos los graficadores.

```css
--graph-grid: #334155;
--graph-axis: #94A3B8;

--graph-function-base: #3B82F6;
--graph-function-transformed: #8B5CF6;
--graph-student: #14B8A6;

--graph-asymptote: #F59E0B;
```

### Convención

* **Función original:** azul.
* **Función transformada:** violeta.
* **Producción o puntos del estudiante:** turquesa.
* **Asíntota o elemento destacado:** ámbar.
* **Ejes:** gris claro.
* **Cuadrícula:** gris azulado oscuro.

Esta convención debe conservarse entre niveles siempre que sea matemáticamente posible.

---

## Tarjetas y paneles

Las tarjetas deben utilizar fondos ligeramente más claros que el fondo general.

Ejemplo:

```css
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
}
```

Evitar:

* bordes excesivamente gruesos;
* demasiadas sombras;
* efectos brillantes constantes;
* degradados en todas las superficies;
* demasiados colores dentro de una misma tarjeta.

Priorizar jerarquía, espacio y legibilidad.

---

## Botones

### Acción principal

```css
background: #3B82F6;
color: #F8FAFC;
```

Ejemplos:

* Continuar
* Comprobar
* Iniciar nivel
* Volver al mapa

### Acción secundaria

Utilizar fondo transparente o `#1E293B` con borde visible.

### Acción completada

Utilizar verde únicamente cuando represente una acción efectivamente completada.

---

## Degradados

Los degradados pueden utilizarse de manera limitada para reforzar la identidad de Logaria.

Degradado principal:

```css
background: linear-gradient(
  90deg,
  #3B82F6,
  #8B5CF6
);
```

Reservarlo principalmente para:

* logo;
* portales;
* desbloqueos;
* mundos especiales;
* recompensas;
* elementos narrativos importantes.

No utilizar degradados como fondo de todos los botones o tarjetas.

---

## Estilo general

La interfaz debe sentirse:

**moderna + matemática + tecnológica + exploratoria + profesional**

Evitar que se vea:

* infantil;
* excesivamente caricaturesca;
* sobrecargada;
* similar a un juego móvil genérico;
* llena de efectos visuales sin función pedagógica.

La gamificación debe estar presente principalmente en:

* mapa de mundos;
* desbloqueo de niveles;
* estrellas;
* misiones;
* progreso;
* narrativa.

Dentro de las actividades matemáticas debe priorizarse la claridad.

---

## Principio de diseño

La estética debe acompañar la filosofía didáctica de Logaria:

**Explorar → predecir → hacer matemática → comprobar → explicar → desbloquear.**

La interfaz no debe resolver la matemática por el estudiante.

Los elementos visuales, animaciones, colores y gráficos deben utilizarse para favorecer:

* la observación;
* la formulación de conjeturas;
* la experimentación;
* la comparación;
* la visualización de propiedades;
* la interpretación de errores;
* la construcción progresiva del conocimiento.

---

## Identidad visual resumida

```text
LOGARIA

Fondo:
#0F172A

Superficies:
#1E293B

Principal:
#3B82F6

Secundario / Logaria:
#8B5CF6

Exploración:
#14B8A6

Desafíos:
#F59E0B

Correcto:
#22C55E

Error:
#EF4444

Texto principal:
#F8FAFC

Texto secundario:
#CBD5E1

Títulos:
Space Grotesk

Interfaz:
Inter

Matemática:
KaTeX / MathJax
```

Esta identidad visual debe mantenerse de manera consistente en todos los mundos, niveles, laboratorios y futuras ampliaciones de Logaria.
_

### Ideas visuales

- **[IDEA]** Recursos del laboratorio: rastros de curvas anteriores, congelar la curva previa para comparar, resaltar sobre el gráfico la propiedad seleccionada, animación de reflexión respecto de `y = x`.

### Evitar

- **[DEFINIDO]** Evitar que el gráfico aparezca antes de la producción del estudiante: el sistema colorea, grafica o valida recién después de la respuesta.
- **[DEFINIDO]** ## Estilos, colores y recursos visuales que no se deben utilizar

Para mantener una identidad visual coherente, profesional y vinculada con la matemática, la tecnología y la exploración, en **Logaria** se deben evitar los siguientes recursos:

### Estilos visuales a evitar

* Estética excesivamente infantil o caricaturesca.
* Interfaces que parezcan un juego móvil genérico.
* Estilo tipo “Candy Crush” llevado de manera literal.
* Exceso de elementos decorativos sin función pedagógica.
* Interfaces recargadas con demasiadas tarjetas, botones o información simultánea.
* Diseño excesivamente futurista, “cyberpunk” o de videojuego de ciencia ficción.
* Estética escolar tradicional basada en pizarrones, tizas, reglas, cuadernos o lápices como decoración constante.
* Uso excesivo de efectos 3D.
* Elementos con apariencia plástica o brillante.
* Estilo skeuomórfico que intente imitar objetos reales.
* Diseños donde cada nivel tenga una estética completamente diferente.
* Cambios bruscos de estilo entre el mapa, los laboratorios y las actividades.
* Uso de fondos con demasiados detalles que dificulten leer gráficos o consignas.

---

## Colores a evitar

No incorporar colores nuevos de manera arbitraria fuera de la paleta definida.

Evitar especialmente:

* colores neón extremadamente saturados;
* rosas fluorescentes;
* verdes fluorescentes;
* amarillos demasiado brillantes como fondo;
* combinaciones de muchos colores saturados simultáneamente;
* fondos completamente negros `#000000`;
* blanco puro `#FFFFFF` utilizado como fondo principal;
* grandes superficies rojas;
* grandes superficies verdes;
* degradados arcoíris;
* combinaciones que reduzcan el contraste entre texto y fondo.

El rojo y el verde deben utilizarse principalmente como **colores de estado**, no como colores decorativos permanentes.

---

## Degradados

Evitar:

* degradados en todas las tarjetas;
* degradados en todos los botones;
* degradados con tres o más colores;
* degradados arcoíris;
* degradados extremadamente luminosos.

El degradado azul-violeta de Logaria debe reservarse para elementos importantes como:

* logo;
* portales;
* desbloqueos;
* mundos destacados;
* recompensas;
* momentos narrativos especiales.

---

## Sombras y brillos

Evitar:

* sombras muy grandes;
* sombras negras demasiado intensas;
* efecto glow permanente;
* bordes luminosos alrededor de todos los elementos;
* luces de neón;
* animaciones de brillo constantes.

Las sombras deben ser discretas y utilizarse únicamente para separar niveles de profundidad.

---

## Bordes y formas

Evitar:

* bordes excesivamente gruesos;
* bordes de varios colores;
* marcos decorativos complejos;
* esquinas excesivamente redondeadas que hagan que toda la interfaz parezca infantil;
* formas irregulares sin una función clara.

Mantener un sistema consistente de radios y bordes.

Como referencia general:

```css
border-radius: 12px;
border-radius: 16px;
```

No utilizar un radio diferente arbitrariamente para cada componente.

---

## Tipografías que no deben utilizarse

Evitar:

* Comic Sans;
* tipografías manuscritas;
* fuentes estilo cómic;
* fuentes excesivamente decorativas;
* tipografías pixeladas;
* fuentes de videojuegos arcade;
* tipografías futuristas difíciles de leer;
* mezclar muchas familias tipográficas.

La aplicación debe mantenerse principalmente en:

* **Space Grotesk** para títulos y narrativa;
* **Inter** para interfaz y textos;
* **KaTeX/MathJax** para matemática.

---

## Iconografía

Evitar:

* emojis como elemento principal de la interfaz;
* iconos de estilos diferentes mezclados;
* ilustraciones infantiles;
* iconos excesivamente detallados;
* iconos puramente decorativos sin significado.

Preferir iconos simples, geométricos y consistentes.

Cuando un icono represente una acción importante debe acompañarse de texto si existe riesgo de ambigüedad.

Por ejemplo:

**✓ Comprobar**

en lugar de utilizar solamente:

**✓**

---

## Animaciones

Evitar:

* animaciones constantes;
* elementos que se muevan sin interacción del estudiante;
* rebotes repetitivos;
* flashes;
* partículas permanentes;
* transiciones excesivamente largas;
* animaciones que retrasen el acceso a una actividad.

Las animaciones deben aparecer principalmente cuando existe un propósito claro:

* desbloquear un nivel;
* completar una misión;
* mostrar una transformación;
* indicar una relación matemática;
* proporcionar feedback.

---

## Recursos visuales matemáticos

Evitar gráficos sobrecargados.

No utilizar simultáneamente:

* demasiadas funciones;
* demasiados colores;
* etiquetas innecesarias;
* cuadrículas demasiado visibles;
* animaciones que oculten el comportamiento matemático.

Los gráficos deben priorizar siempre la lectura matemática.

La estética nunca debe dificultar observar:

* crecimiento y decrecimiento;
* dominio;
* imagen;
* desplazamientos;
* asíntotas;
* intersecciones;
* puntos relevantes;
* comportamiento de una función.

---

## Feedback de respuestas

Evitar que el feedback se limite únicamente a:

* rojo = incorrecto;
* verde = correcto.

Siempre que sea posible acompañar el color con información textual.

Ejemplo adecuado:

> **Revisá el desplazamiento horizontal. Observá nuevamente dónde quedó ubicada la asíntota.**

Evitar mensajes como:

> **ERROR**

o:

> **RESPUESTA INCORRECTA**

sin ninguna orientación adicional.

---

## Principio general

Ante una decisión entre una interfaz más llamativa y una interfaz más clara, se debe priorizar siempre:

**claridad > decoración**

**matemática > efectos visuales**

**exploración > automatización**

**consistencia > variedad**

La identidad visual de Logaria debe sentirse atractiva y diferente de una plataforma escolar tradicional, pero los recursos gráficos nunca deben competir con el contenido matemático.
_

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
- **[DEFINIDO]** según la actividad._
- **[PENDIENTE]** Contraste y tamaño mínimo de texto:## Contraste y tamaño mínimo de texto

Para garantizar legibilidad y accesibilidad en **Logaria**, especialmente en celulares y pantallas de aula, se deben respetar criterios mínimos de contraste y tamaño tipográfico.

### Contraste

* El texto normal debe tener una relación de contraste mínima de **4.5:1** respecto del fondo.
* El texto grande puede utilizar un contraste mínimo de **3:1**.
* Los botones, bordes importantes, controles interactivos y estados visuales deben mantener un contraste suficiente respecto de los elementos que los rodean.
* No utilizar texto gris muy tenue sobre fondos oscuros.
* No utilizar color como único recurso para comunicar información.

En la paleta definida, priorizar:

```css
--background: #0F172A;
--surface: #1E293B;

--text-primary: #F8FAFC;
--text-secondary: #CBD5E1;
```

El texto principal debe utilizar `#F8FAFC` sobre fondos oscuros.

El texto secundario puede utilizar `#CBD5E1`, siempre que conserve buena legibilidad.

Evitar textos importantes con baja opacidad, por ejemplo:

```css
opacity: 0.4;
```

Especialmente en consignas, botones, resultados y ayudas.

---

## Tamaño mínimo de texto

El tamaño base recomendado para la interfaz es:

```css
font-size: 16px;
```

No utilizar textos de lectura habitual por debajo de **14 px**.

### Escala recomendada

```css
--text-xs: 14px;
--text-sm: 16px;
--text-md: 18px;
--text-lg: 22px;
--text-xl: 28px;
--text-2xl: 36px;
```

### Uso

* **14 px:** etiquetas auxiliares, datos secundarios o información breve.
* **16 px:** texto base de interfaz.
* **18 px:** consignas y explicaciones importantes.
* **22 px:** subtítulos.
* **28 px:** títulos de nivel.
* **36 px o más:** nombres de mundos, pantallas de apertura o títulos principales.

---

## Consignas matemáticas

Las consignas deben tener como mínimo:

```css
font-size: 18px;
line-height: 1.5;
```

Esto es especialmente importante porque representan el contenido central que el estudiante debe interpretar.

Evitar consignas extensas en tamaños pequeños.

---

## Expresiones matemáticas

Las expresiones matemáticas deben ser iguales o ligeramente mayores que el texto que las rodea.

Como referencia:

```css
.math {
  font-size: 1.1em;
}
```

Cuando una fórmula sea central en una actividad, puede presentarse entre **20 px y 24 px** o su equivalente relativo.

No reducir las fórmulas para hacerlas entrar en un espacio pequeño.

En dispositivos angostos, preferir desplazamiento horizontal o reorganización del contenido antes que disminuir excesivamente su tamaño.

---

## Botones

El texto de los botones debe tener como mínimo:

```css
font-size: 16px;
font-weight: 600;
```

Los botones importantes no deben contener texto diminuto.

Ejemplos:

* Comprobar
* Continuar
* Volver al mapa
* Iniciar misión

---

## Tamaño de controles interactivos

Además del texto, los elementos que el estudiante debe tocar o seleccionar deben ser suficientemente grandes.

Como referencia mínima:

```css
min-width: 44px;
min-height: 44px;
```

Esto se aplica especialmente a:

* botones;
* controles `+` y `−`;
* sliders;
* casillas;
* puntos interactivos;
* navegación entre niveles.

---

## Diseño responsive

No utilizar tamaños fijos que solo funcionen correctamente en computadora.

Preferir unidades relativas:

```css
rem
em
clamp()
```

Ejemplo:

```css
.level-title {
  font-size: clamp(1.5rem, 4vw, 2.25rem);
}
```

Esto permite mantener una jerarquía tipográfica adecuada entre celular, tablet y computadora.

---

## Regla general

Nunca reducir el texto simplemente para lograr que entre dentro de una tarjeta o botón.

Ante un problema de espacio, priorizar:

1. ampliar el componente;
2. reorganizar el contenido;
3. permitir salto de línea;
4. adaptar la disposición para móvil.

Reducir la tipografía debe ser la última opción.

### Criterio final

La interfaz debe poder leerse cómodamente sin esfuerzo y sin necesidad de hacer zoom.

**Texto base:** mínimo `16 px`.

**Texto auxiliar:** nunca menor a `14 px`.

**Consignas:** recomendado `18 px`.

**Contraste:** mínimo `4.5:1` para texto normal y `3:1` para texto grande.
 __
- **[PENDIENTE]** Sonido, subtítulos o alternativas textuales: _## Sonido, subtítulos y alternativas textuales

### Sonido

**Logaria no debe utilizar sonido.**

No incorporar:

* música de fondo;
* efectos de sonido;
* sonidos al presionar botones;
* sonidos de respuesta correcta o incorrecta;
* sonidos al desbloquear niveles;
* narraciones automáticas;
* voces sintetizadas;
* audio ambiental;
* alertas sonoras.

La experiencia debe poder utilizarse completamente en silencio.

Esta decisión responde también al contexto de uso en el aula: varios estudiantes pueden utilizar la aplicación simultáneamente desde celulares o computadoras sin generar distracciones ni interferencias.

Por lo tanto, **ninguna acción, información o feedback puede depender del audio**.

---

## Feedback visual en lugar de sonido

Toda información que normalmente podría comunicarse mediante un sonido debe tener una alternativa visual clara.

Por ejemplo, al completar correctamente un desafío se puede utilizar:

* cambio visual de estado;
* animación breve;
* mensaje textual;
* icono;
* cambio de color;
* aparición de estrellas;
* desbloqueo visual del siguiente nivel.

Ejemplo:

> ✓ **¡Reto superado! El siguiente nivel fue desbloqueado.**

Nunca depender únicamente de una animación o cambio de color.

---

## Subtítulos

Como la aplicación no utilizará videos o narraciones con audio como parte central de la experiencia, **no será necesario incorporar un sistema general de subtítulos**.

Sin embargo, si en una futura versión se incorpora algún recurso audiovisual externo, toda información relevante debe estar disponible también en formato textual.

Un video nunca debe ser la única forma de acceder a una explicación matemática.

---

## Alternativas textuales

Los elementos visuales que transmitan información relevante deben contar, cuando corresponda, con una alternativa textual comprensible.

Esto se aplica especialmente a:

* imágenes;
* ilustraciones;
* iconos;
* botones;
* gráficos;
* diagramas;
* indicadores de progreso.

### Imágenes

Las imágenes con contenido relevante deben incluir texto alternativo mediante `alt`.

Ejemplo:

```html
<img
  src="grafico-logaritmica.png"
  alt="Gráfico de una función logarítmica creciente con asíntota vertical en x igual a 0."
>
```

Las imágenes puramente decorativas deben utilizar:

```html
alt=""
```

para evitar que los lectores de pantalla anuncien información innecesaria.

---

## Iconos

Los iconos que representen una acción no deben utilizarse sin contexto cuando su significado pueda resultar ambiguo.

Evitar:

```text
↻
```

Preferir:

```text
↻ Reiniciar gráfico
```

O proporcionar una etiqueta accesible:

```html
<button aria-label="Reiniciar gráfico">
  ↻
</button>
```

---

## Gráficos matemáticos

Los gráficos son una parte central de Logaria, pero la información matemática importante no debe depender exclusivamente de poder verlos.

Cuando sea pertinente, acompañar el gráfico con información textual como:

* función representada;
* valores de los parámetros;
* coordenadas de puntos importantes;
* posición de la asíntota;
* dominio;
* comportamiento creciente o decreciente.

Por ejemplo:

> Función actual: (f(x)=\log_2(x-3))
> Asíntota vertical: (x=3)

Esto no significa describir automáticamente todo el gráfico, sino garantizar que los elementos matemáticos centrales también puedan identificarse mediante información textual.

---

## Animaciones

Las animaciones tampoco deben ser la única forma de transmitir una transformación matemática.

Si una curva se desplaza, además de mostrar el movimiento se debe indicar qué parámetro cambió.

Ejemplo:

> `k = 3`
> La asíntota vertical se encuentra ahora en (x=3).

---

## Principio general

La experiencia debe cumplir la siguiente regla:

**Todo lo importante debe poder comprenderse sin sonido.**

Por lo tanto:

```text
SONIDO:
No utilizar.

MÚSICA:
No utilizar.

EFECTOS SONOROS:
No utilizar.

NARRACIÓN AUTOMÁTICA:
No utilizar.

FEEDBACK:
Visual + textual.

IMÁGENES:
Texto alternativo cuando sea necesario.

ICONOS:
Acompañados de texto o aria-label.

GRÁFICOS:
Complementados con información matemática textual relevante.
```

La ausencia de sonido es una **decisión de diseño permanente de Logaria** y no debe modificarse sin una decisión explícita posterior.
_

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

> **[PENDIENTE]** Notación de los parámetros: el documento fuente escribe a veces `logc(ax - k)` y a veces `logc(ax + k)` para el Mundo 5. Acá se usa `- k` en todo el recorrido, igual que en el Mundo 3. Ver *[Decisiones pendientes antes de implementar](#decisiones-pendientes-antes-de-implementar)*, duda 1.

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

## Decisiones pendientes antes de implementar

> Cada una de estas dudas cambia el resultado. La IA **no debe resolverlas por su cuenta**: hay que preguntarlas antes de escribir código que dependa de ellas. Cuando una se resuelva, pasarla al *Registro de decisiones* y borrarla de acá.

### 1. Notación del parámetro `k` · **[PENDIENTE]**

- **La duda:** el documento fuente escribe `logc(ax - k)` en el mapa de mundos y `logc(ax + k)` en el texto del Nivel 13.
- **Provisorio:** se usa `- k` en todo el recorrido, por coherencia con el Mundo 3.
- **Por qué importa:** cambia el signo de las respuestas y de las consignas de los niveles 7 a 15, y también la dirección del desplazamiento que se trabaja como error frecuente.
- **Bloquea a:** Mundos 3, 4 y 5 completos.
  -Respuesta para Notacion del parámetro "k":
   -Decisión 1. Notación del parámetro k
Decisión adoptada: utilizar de manera consistente la forma log_c(ax - k) en los Mundos 3, 4 y 5.
Se descarta la alternancia entre “+ k” y “- k” para evitar que la propia aplicación introduzca una dificultad artificial. La convención elegida también permite trabajar de forma explícita uno de los errores más frecuentes al estudiar transformaciones horizontales: interpretar el signo interno como si indicara directamente el sentido del desplazamiento.
Ejemplo didáctico: si f(x) = log_c(x), entonces g(x) = log_c(x - 3) representa un desplazamiento de 3 unidades hacia la derecha. La aparente oposición entre “-3” dentro de la expresión y “+3” en la dirección del movimiento puede convertirse en una pregunta de exploración y no solamente en una regla para memorizar.
Consecuencia para los niveles
Las consignas, respuestas esperadas, pistas, errores frecuentes y validaciones de los niveles 7 a 15 deberán construirse con la misma convención de signo.

### 2. Nombres de mundos y niveles · **[PENDIENTE]**

- **La duda:** existen dos conjuntos de nombres distintos. La implementación actual usa los de Logaria ("El Portal Inverso", "El espejo de las funciones"); el documento fuente usa otros ("El código logarítmico", "La calculadora desconfigurada"). No son variantes del mismo nombre: son dos narrativas paralelas.
- **Opciones:** (a) adoptar los del documento y reescribir el mapa; (b) conservar los de Logaria y tratar los del documento solo como referencia interna; (c) mezclar, con nombre de mundo de un lado y de nivel del otro.
- **Por qué importa:** afecta todos los textos visibles de la experiencia, y el README prohíbe inventar contenido narrativo nuevo.
- **Bloquea a:** cualquier reescritura del mapa de `Plan aulico/index.html`.
 -Respuesta Duda Nombre de mundos y niveles:
  -Decisión adoptada: conservar Logaria como narrativa visible principal y utilizar los nombres del documento fuente como nombres de niveles, misiones o referencias internas cuando corresponda.
La solución establece una jerarquía narrativa estable, en lugar de mezclar dos sistemas de nombres al mismo nivel. De este modo se mantiene la identidad del mapa y, a la vez, se aprovechan denominaciones del documento fuente que resultan adecuadas para situaciones problemáticas concretas.
UNIVERSO: LOGARIA
    ↓
MUNDO: El Portal Inverso
    ↓
NIVEL: La calculadora desconfigurada
    ↓
MISIÓN: reconstruir los valores faltantes para recuperar el graficador
La arquitectura narrativa queda entonces organizada como: Universo → Mundo → Nivel → Misión.

### 3. Cómo se abre y se distribuye la aplicación · **[PENDIENTE]**

- **La duda:** ¿el recorrido sigue siendo un HTML que se abre con doble clic (`file://`), o se va a servir desde una URL?
- **Por qué importa:** con `file://` los módulos ES no cargan, así que la definición de niveles tendría que ir en un `<script>` clásico y no en archivos importados. Es la restricción que decide cómo se separan los datos del HTML, que es un criterio ya definido en el documento.
- **Bloquea a:** la prioridad 1 (definición de niveles por datos).
 -Respuesta de duda Como se abre y se distribuye la aplicación:
  - Decisión adoptada: diseñar Logaria como una aplicación web servida desde una URL, utilizando GitHub Pages como forma principal de acceso.
La aplicación no se diseñará bajo la restricción de abrir el archivo directamente mediante file://. Esto habilita el uso de módulos ES y una separación clara entre estructura, datos, lógica de validación, progreso y estilos. Para el aula, además, simplifica el acceso desde computadoras y celulares: el estudiante ingresa mediante un enlace y no necesita manipular carpetas o archivos locales.
Plan aulico/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── progress.js
│   ├── validators.js
│   └── levels.js
├── levels/
│   ├── world-1.js
│   ├── world-2.js
│   ├── world-3.js
│   └── ...
└── assets/
Los niveles deberán definirse principalmente como datos. Esto permitirá modificar consignas, prerequisitos, estrellas o tipos de reto sin reescribir la estructura visual del mapa.
{
  id: 4,
  world: 2,
  title: "Se rompió el graficador",
  type: "points",
  stars: 3,
  prerequisite: 3
}

### 4. Tolerancia de las validaciones · **[PENDIENTE]**

- **La duda:** con qué margen se da por correcta una respuesta que no es de opción múltiple: puntos cargados, intervalos escritos de distintas formas equivalentes y sobre todo la superposición de una curva propia sobre una curva objetivo (niveles 9 y 15).
- **Por qué importa:** demasiado estricta, el estudiante se traba sin entender por qué; demasiado laxa, el reto deja de validar el aprendizaje. Es una decisión pedagógica, no técnica.
- **Bloquea a:** los validadores de punto, intervalo y superposición.
 -Respuesta de duda Tolerancia de las validaciones:
  -Decisión adoptada: validar significado matemático y equivalencia, evitando comparar únicamente la forma textual exacta escrita por el estudiante.
La aplicación debe aceptar distintas representaciones matemáticamente equivalentes siempre que el tipo de actividad lo permita. Por ejemplo, un mismo intervalo podría expresarse con notación de intervalo, desigualdad o selección gráfica. El objetivo del validador no será detectar una cadena de caracteres específica, sino comprobar si la producción representa correctamente el objeto matemático solicitado.
Tipo de respuesta	Criterio	Tolerancia / regla	Sentido pedagógico
Puntos	Comparación numérica con tolerancia	±0,05 o ±0,1 según la escala del gráfico	Evita penalizar diferencias mínimas de lectura o redondeo.
Intervalos	Interpretación de expresiones equivalentes	Sin igualdad textual estricta	Debe reconocer formas matemáticamente equivalentes.
Superposición de curvas	Comparación sobre varios puntos de control	Tolerancia gráfica pequeña	No se exige coincidencia píxel a píxel.
Feedback gradual. El resultado de la validación deberá transformarse en una intervención didáctica. Se priorizarán mensajes que orienten la revisión por encima de un simple “incorrecto”.
Casi: Revisá el desplazamiento horizontal antes de volver a mover la curva.
Todavía no: Observá dónde se encuentra la asíntota y comparala con la curva objetivo.
Correcto: Reconstrucción completada. Explicá ahora qué cambió y por qué.

### 5. Alcance y forma de entrega · **[PENDIENTE]**

- **La duda:** los 18 niveles con laboratorio propio no entran en una sola tanda de trabajo. ¿Se entrega mundo por mundo, con el mapa siempre jugable y los niveles todavía no migrados señalados como tales?
- **Propuesta:** empezar por una rebanada vertical completa con el **Nivel 4 ("Se rompió el graficador")**, porque ejercita el ciclo entero —predicción, modo hoja, carga de puntos, validación, reconstrucción de la curva y reto nuevo—. Si ese nivel funciona, el resto es contenido y variantes de validador, no arquitectura nueva.
- **Por qué importa:** define si el archivo queda a medio migrar entre entregas.
 -Respuesta duda Alcance y forma de entrega:
  -Decisión adoptada: implementar el proyecto de manera incremental, manteniendo siempre el mapa coherente y comenzando por una rebanada vertical completa del Nivel 4: “Se rompió el graficador”.
Este nivel se toma como prototipo funcional porque contiene el ciclo completo que se desea repetir con variantes en el resto del recorrido: predicción, salida de la pantalla, trabajo en hoja, carga de resultados, validación, reconstrucción gráfica, explicación y desbloqueo.
OBSERVAR
   ↓
CONJETURAR
   ↓
TRABAJAR EN LA HOJA
   ↓
VOLVER A LA APLICACIÓN
   ↓
INTRODUCIR RESULTADOS
   ↓
RECIBIR FEEDBACK
   ↓
RECONSTRUIR
   ↓
EXPLICAR
   ↓
DESBLOQUEAR
La implementación se organizará en fases:
•	Fase 1: Mapa completo visible y navegación base.
•	Fase 2: Nivel 4 completamente jugable y validado.
•	Fase 3: Migración y construcción completa del Mundo 1.
•	Fase 4: Construcción del Mundo 2.
•	Fases siguientes: Migración de los mundos restantes reutilizando componentes y validadores ya probados.
Los niveles aún no desarrollados se mostrarán bloqueados o identificados como “Próximamente”, evitando presentar como jugable una sección incompleta.

### 6. Progreso ya guardado en los navegadores · **[PENDIENTE]**

- **La duda:** el avance actual se guarda con la clave `logaria-progress-v1`. Al cambiar el modelo de niveles hay que decidir si se migra el progreso existente o se reinicia.
- **Por qué importa:** si algún curso ya venía usando la experiencia, un cambio de clave sin migración le borra el recorrido.
- **Bloquea a:** la prioridad 3 (progreso y estrellas).
 -Respuesta duda Progreso ya guardado en los navegadores:
  -Decisión adoptada: crear una nueva versión de persistencia, logaria-progress-v2, con migración automática desde logaria-progress-v1 cuando exista información previa.
El cambio de modelo de niveles no debe eliminar el avance de un grupo que ya haya utilizado la experiencia. La aplicación comprobará primero si existe la versión nueva; en caso contrario buscará la versión anterior y realizará la migración compatible.
¿Existe logaria-progress-v2?
   ├── Sí → cargar v2
   └── No
        ├── ¿Existe logaria-progress-v1? → migrar a v2
        └── No → crear progreso nuevo
La nueva estructura de progreso deberá poder registrar algo más que el nivel máximo desbloqueado, por ejemplo:
{
  levelId: 4,
  unlocked: true,
  completed: true,
  stars: 2,
  attempts: 3
}
En esta etapa se priorizará un progreso local y anónimo. No es necesario almacenar nombres, correos u otros datos personales para que la mecánica pedagógica funcione.

### 7. Curso y edad del grupo · **[PENDIENTE]**

- **La duda:** el documento fuente no indica el curso exacto (ver *Público*).
- **Por qué importa:** define el nivel de vocabulario y cuánta formalización algebraica se puede exigir en los puentes a la carpeta.

---
 -Respuesta de duda Curso y edad del grupo:
  -Decisión adoptada: diseñar el recorrido para 6.º año de secundaria, incorporando apoyos breves para recuperar conocimientos previos que el grupo necesite durante la experiencia.
El año escolar funciona como referencia para el vocabulario, la complejidad de las consignas y el nivel de formalización algebraica. Sin embargo, el diseño no supondrá que todos los saberes previos están consolidados. Cuando una dificultad previa impida avanzar, la aplicación podrá ofrecer una misión breve de recuperación en lugar de convertir esa dificultad en un bloqueo permanente.
Entre los conocimientos susceptibles de recuperación se contemplan:
•	potencias y propiedades de potencias;
•	exponentes negativos;
•	lectura e interpretación de gráficos;
•	dominio e imagen;
•	coordenadas cartesianas;
•	transformaciones y desplazamientos de funciones.
Principio de diseño
El programa no parte de “son de sexto, deberían saberlo”, sino de “son estudiantes de sexto y necesitan herramientas para seguir construyendo desde lo que efectivamente pueden recuperar y poner en juego”.

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
