---
title: "Cómo funciona realmente la IA"
seoTitle: "Cómo funciona realmente la IA: tokens, ventanas de contexto, alucinaciones, razonamiento y multimodalidad"
kicker: "Nota de Campo de IA 01"
date: "2026-03-08"
updated: "2026-03-08"
excerpt: "Una explicación casual pero precisa sobre tokens, ventanas de contexto, alucinaciones, modelos de razonamiento, multimodalidad y lo que la gente realmente se encuentra al usar IA todos los días."
tags: ["IA", "LLMs", "Modelos de Razonamiento", "Multimodalidad"]
coverImage: "/blog/llm-context-cover.svg"
coverAlt: "Portada editorial abstracta sobre cómo los sistemas de IA procesan contexto, tokens e información recuperada"
featured: true
published: false
---

Hay algo raro que pasa con las conversaciones sobre IA en internet.

La gente usa estas herramientas todos los días, pero la capa de explicación suele ser demasiado vaga o demasiado académica. Casi siempre terminas con una de dos versiones:

- "la IA ya es básicamente magia"
- o una pared de jerga que hace que la gente normal se vaya de inmediato

Así que esta es la versión del medio.

No está simplificada de más. Tampoco está escrita como paper. Es solo una mirada práctica de lo que realmente está pasando cuando usas ChatGPT, Gemini, Claude o cualquier modelo parecido.

## Con qué se está encontrando la gente de verdad

Aunque alguien nunca haya dicho las palabras *token* o *ventana de contexto*, probablemente ya ha visto sus efectos.

Por ejemplo:

- pegas una cadena larga de correos y la IA "olvida" algo del comienzo,
- subes un PDF desordenado y responde con seguridad inventándose un detalle,
- haces una pregunta de seguimiento y contesta como si nunca hubiera visto la instrucción anterior,
- usas voz, imagen y texto juntos y notas que responde distinto a un chat solo de texto,
- notas que algunos modelos se sienten más lentos pero mejores para pensar con estructura.

Eso no son rarezas aleatorias. Casi siempre tiene que ver con cómo estos sistemas procesan la entrada.

---

## 1. La IA no lee como las personas

Cuando tú ves una frase, ves palabras y significado.

Un modelo de lenguaje no funciona así.

Convierte tu entrada en **tokens** y luego predice cuál debería ser el siguiente token a partir de patrones vistos durante el entrenamiento.

Ese es el primer cambio mental importante:

> El modelo no está leyendo una frase y "entendiéndola como una persona". Está operando sobre patrones de tokens y probabilidades.

## 2. Los tokens son la unidad real de entrada

Un token no es exactamente una palabra. Es un fragmento de texto.

A veces una palabra corta es un token. A veces una palabra larga se divide en varios tokens. La puntuación, el formato de JSON, la sintaxis del código y los espacios también afectan el conteo.

### Ejemplo cotidiano

Una persona normal puede pegar esto en un asistente de IA:

```text
Reescribe este mensaje para que suene más profesional, pero manteniendo un tono cercano.
```

Y debajo pegar una cadena de 20 correos.

Lo que esa persona cree que mandó:

```text
Una instrucción simple + algo de contexto
```

Lo que ve el modelo:

```text
Una secuencia grande de tokens con instrucciones, firmas, marcas de tiempo, nombres, respuestas citadas y ruido de formato
```

Eso importa porque **el costo, la velocidad y los límites de memoria se miden en tokens**.

## 3. Las ventanas de contexto son presupuestos de memoria para una sola petición

Cuando la gente escucha "ventana de contexto de 128k", suele imaginar una memoria de trabajo gigante e inteligente.

Lo que realmente significa es:

```text
El modelo puede procesar hasta esta cantidad de tokens en la interacción actual.
```

Ese presupuesto incluye:

- instrucciones del sistema,
- tu mensaje,
- historial anterior del chat,
- definiciones de herramientas,
- documentos recuperados,
- ejemplos,
- y la salida que el modelo está a punto de generar.

### Ejemplo simple

Si un modelo soporta una ventana de contexto de 128k y permites hasta 4k tokens de salida, entonces el presupuesto de entrada queda más o menos así:

```text
128k totales - 4k reservados para la salida = 124k para la entrada
```

Así que la ventana de contexto no es una medalla. Es un presupuesto.

## 4. Por qué la gente siente que la IA "se olvidó"

Esta es una de las quejas más comunes.

Alguien dice:

```text
Ya le había dicho que quería la respuesta en español.
```

Normalmente pasó una de estas tres cosas:

1. esa instrucción anterior quedó fuera del contexto útil actual,
2. demasiada información nueva diluyó la instrucción anterior,
3. la estructura del prompt hizo que el mensaje más reciente pesara más.

En otras palabras, el modelo no se despertó con ganas de ignorarte. Está trabajando dentro de un presupuesto limitado de tokens e intentando predecir la mejor siguiente respuesta con lo que tiene más disponible y más relevante en ese momento.

## 5. La IA predice, no sabe las cosas como la gente imagina

Esta parte es clave.

Un LLM **no** tiene una mini mente privada donde realmente comprende hechos como una persona. Predice los siguientes tokens probables a partir de patrones.

Por eso puede sonar muy informado y aun así estar equivocado.

### Un ejemplo fácil de relacionar

Alguien pregunta:

```text
¿Puedes resumir la política de cancelación de este documento?
```

Si el documento está sucio, incompleto o fue mal extraído, el modelo puede producir una respuesta que *suena exactamente como una política de cancelación* aunque la fuente no lo respalde del todo.

Eso no sucede porque el modelo sea malvado o perezoso, sino porque su trabajo es completar el patrón con la respuesta que parezca más plausible. Es en ese proceso donde surgen las alucinaciones.

## 6. Las alucinaciones suelen ser conjeturas muy pulidas

A veces la gente imagina una alucinación como un fallo rarísimo.

En realidad es una forma bastante normal de fallar en sistemas diseñados para predecir texto plausible.

Las alucinaciones suelen pasar cuando:

- el material fuente es débil,
- la pregunta sugiere que debería existir una respuesta,
- el prompt premia completar más que acertar,
- el modelo tiene señal parcial, pero no suficiente base.

### Ejemplo cotidiano

Un estudiante sube apuntes de clase y pregunta:

```text
¿Cuáles fueron las tres críticas principales del profesor al artículo?
```

Si los apuntes solo mencionan una crítica claramente y dejan dos insinuadas de forma vaga, el modelo puede igual darte una respuesta limpia en tres partes porque esa forma se siente estadísticamente natural.

Muchas veces prefiere completar el patrón antes que decir:

```text
Solo tengo evidencia clara para una.
```

Por eso importan tanto los prompts con base y restricciones.

## 7. Los mejores prompts suelen ser cuestión de restricciones, no de trucos

A la gente le encantan los hacks de prompts, pero la mejora más útil suele ser simplemente poner mejores límites.

En vez de esto:

```text
Resume este documento.
```

Haz esto:

```text
Resume este documento en 5 viñetas. Si una afirmación es incierta, indícalo explícitamente.
Usa solo la información que aparece en el texto proporcionado.
```

Eso no vuelve perfecto al modelo, pero reduce el espacio donde puede aparecer una respuesta convincente pero inventada.

## 8. La IA normalmente no aprende de tu conversación

Otro malentendido muy común: la gente cree que el modelo los está aprendiendo en tiempo real.

Normalmente no.

Durante una sesión de chat, el modelo no se está reentrenando con tus mensajes. Solo está usando el contexto actual.

Si parece que "te recuerda", casi siempre viene de la capa del producto:

- historial guardado,
- memoria de perfil,
- recuperación de conversaciones anteriores,
- lógica de la app que vuelve a insertar detalles útiles.

### Ejemplo cotidiano

Si le dices a un asistente:

```text
Tengo una panadería y prefiero respuestas concisas.
```

Solo podrá reutilizar eso después **si la aplicación lo guarda y se lo vuelve a pasar**.

Eso es memoria del producto, no aprendizaje en tiempo real.

## 9. Los modelos de razonamiento siguen prediciendo, solo que con otro estilo de trabajo

Los modelos de razonamiento pueden sentirse distintos porque suelen rendir mejor en tareas de varios pasos, lógica estructurada, matemáticas o planeación más compleja.

Pero no son criaturas mágicas por fuera del universo LLM.

Siguen siendo sistemas de predicción.

La diferencia suele estar en cómo fueron entrenados, afinados o guiados para trabajar mejor con problemas paso a paso.

### Forma simple de pensarlo

- un modelo de chat normal suele optimizar respuestas rápidas y fluidas,
- un modelo orientado a razonamiento suele ser mejor para bajar el ritmo, descomponer y mantener estructura.

### Ejemplo cotidiano

Si preguntas:

```text
¿Me conviene comprar o arrendar un carro si manejo 12.000 millas al año y planeo tenerlo durante 6 años?
```

Un modelo normal puede darte una respuesta suave y genérica muy rápido.

Uno más fuerte en razonamiento tiene más probabilidad de dividirlo en:

- supuestos de costo anual,
- horizonte de mantenimiento,
- tiempo real de propiedad,
- tradeoff de reventa,
- incertidumbre de la estimación.

Sigue prediciendo texto. Solo que produce mejor texto con estructura de razonamiento.

## 10. Multimodalidad solo significa que el modelo puede trabajar con algo más que texto

Cuando la gente escucha *multimodal*, la palabra suena más intimidante de lo que realmente es.

Normalmente solo significa que el sistema puede recibir o generar más de un tipo de información, como:

- texto,
- imágenes,
- audio,
- video,
- documentos.

### Ejemplos cotidianos

- Subes una captura de una hoja de cálculo y preguntas qué resalta.
- Tomas una foto de un electrodoméstico dañado y preguntas qué pieza estás viendo.
- Grabas una nota de voz y le pides al modelo convertirla en un correo profesional.
- Subes la foto de un menú y pides un resumen traducido.

Eso es multimodalidad en la práctica.

Lo importante es que multimodal no significa perfecto. Un modelo igual puede leer mal una gráfica, perder texto dentro de una imagen o inferir con demasiada seguridad algo que no se ve.

## 11. La recuperación de información suele ser la diferencia entre un juguete y un producto real

Si un modelo necesita información externa, una de las mejores estrategias no es pegar todo dentro del prompt.

Es recuperar solo las partes más relevantes.

Esa es la idea básica detrás de retrieval-augmented generation.

### Ejemplo cotidiano

Imagina un chatbot de soporte para un proveedor de internet.

Versión mala:

- recibe un bloque gigante con todos los documentos de ayuda.

Versión mejor:

- busca en la base documental,
- selecciona los fragmentos más relevantes,
- pasa solo esos fragmentos al prompt,
- responde usando esa evidencia.

La versión mejor casi siempre es más rápida, más barata y menos propensa a alucinar.

## 12. Usar herramientas no es lo mismo que actuar de forma autónoma

Si un modelo dice que quiere llamar una herramienta, normalmente eso significa que está proponiendo una acción estructurada.

No es lo mismo que hacer la acción realmente.

### Ejemplo

```json
{
  "herramienta": "consultarClima",
  "argumentos": {
    "ciudad": "Cartagena"
  }
}
```

Eso se parece más a:

```text
"Creo que el siguiente paso útil es pedirle esta información al servicio del clima."
```

Tu aplicación sigue decidiendo si se ejecuta o no.

Esa diferencia importa para:

- seguridad,
- permisos,
- facturación,
- logs,
- efectos secundarios.

## 13. Por qué la IA a veces parece muy inteligente y muy tonta en el mismo minuto

Esto desconcierta a la gente todo el tiempo.

Un modelo puede:

- reescribir tu correo de forma excelente,
- resumir un documento de 15 páginas,
- explicar un bug de código,

y acto seguido:

- inventarse una cita,
- saltarse un número dentro de una tabla,
- responder una pregunta distinta a la que hiciste.

Eso pasa porque estos sistemas no están construidos sobre una sola habilidad llamada "inteligencia". Son paquetes de fortalezas y debilidades que aparecen distinto según la estructura de la tarea, la calidad del contexto y el nivel de grounding.

## 14. Un modelo mental útil para el día a día

Aquí va la forma más simple y útil que conozco para pensarlo:

> Los sistemas de chat con IA son máquinas de predicción de patrones que operan dentro de un presupuesto limitado de contexto, normalmente envueltas en funciones de producto que las hacen parecer más consistentes de lo que realmente son.

Suena menos emocionante que "cerebro digital", pero se acerca mucho más a cómo se comportan estas herramientas.

## 15. Qué debería sacar de aquí un usuario normal

No necesitas convertirte en ingeniero de ML para usar bien la IA.

Pero unos cuantos hábitos ayudan muchísimo:

- dale entrada más limpia,
- divide tareas grandes en partes pequeñas,
- pídele que diga cuándo algo es incierto,
- no confundas confianza con prueba,
- usa fuentes o retrieval cuando la precisión importa,
- recuerda que las conversaciones largas siguen teniendo límites.

## Reflexión final

El cambio más útil es este:

Deja de pensar en la IA como algo que *sabe*.

Empieza a verla como un sistema que **predice**, bajo restricciones, usando patrones, contexto y la evidencia que le des.

Cuando la ves así, gran parte de su comportamiento raro deja de sentirse misterioso.
