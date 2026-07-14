# Patrón FAQPage schema para /preguntas-frecuentes

No hace falta escribir preguntas nuevas — `/preguntas-frecuentes` ya tiene el contenido. Solo hay que envolver cada pregunta/respuesta existente en este patrón y pegarlo como `<script type="application/ld+json">` en esa página:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "TEXTO EXACTO DE LA PREGUNTA 1 (copiar de la página)",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TEXTO EXACTO DE LA RESPUESTA 1 (copiar de la página, sin HTML)"
      }
    },
    {
      "@type": "Question",
      "name": "TEXTO EXACTO DE LA PREGUNTA 2",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TEXTO EXACTO DE LA RESPUESTA 2"
      }
    }
  ]
}
```

Repetir el bloque `{ "@type": "Question", ... }` por cada FAQ real del sitio. Importante: el texto de `name`/`text` debe coincidir con lo que el usuario ve en la página — Google penaliza FAQPage schema con contenido que no está visible.

Aplica el mismo patrón a cualquier categoría de producto que tenga sección de preguntas (ej. "¿cuánto tarda un roller?", "¿hacen envíos a todo el país?").
