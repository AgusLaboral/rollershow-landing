# Plan SEO + GEO Rollershow — por etapas, Pareto-first

Basado en [AUDITORIA.md](AUDITORIA.md) y [RESEARCH.md](RESEARCH.md). Objetivo: (1) que la gente encuentre a Rollershow rápido buscando cortinas en Argentina, (2) que ChatGPT/Gemini/Perplexity la recomiendan, (3) preparar el terreno para capitalizar la app de reviews con fotos cuando exista.

Principio rector: arreglar primero lo que hoy **regala** resultado (bugs técnicos de costo bajísimo), después construir el activo que más apalanca (Google Business Profile + reviews), recién después escalar contenido, y dejar el hub UGC para cuando la app de reviews esté viva.

---

## Fase 0 — Sangrado técnico (esta semana, impacto altísimo / esfuerzo mínimo)

Todo esto es "está roto y cuesta casi nada arreglarlo". No requiere estrategia, requiere ejecución.

1. **robots.txt real** en texto plano (hoy responde el HTML del 404 del CMS). `Allow: /` para todos + explícito para GPTBot/ClaudeBot/Google-Extended/PerplexityBot/CCBot + `Sitemap: https://www.rollershow.com.ar/sitemap.xml`.
2. **Arreglar `/cotizar`** (hoy 404) → redirect 301 a `/cotizar/principal`, y cambiarle el title/meta a algo que refleje la marca actual (hoy dice "Cortinas Roller - Innovación y estética", branding viejo) en la página de conversión más importante del sitio.
3. **H1 en todos los templates** (home, categorías, fichas de tela, showrooms, FAQ) — hoy no hay ninguno.
4. **`alt` en imágenes** — empezar por home (19/20 sin alt) y fichas de tela.
5. **Aclarar el subdominio `tienda.rollershow.com.ar`** — indexado con título "Tienda Online de intercortinas", confunde marca. Decidir si se sigue indexando o se noindexea si no es el canal de venta activo.

## Fase 1 — El activo de mayor apalancamiento: Google Business Profile + reviews (2-4 semanas, impacto alto / esfuerzo bajo)

Esto es lo más rentable de todo el plan y no depende de tocar código del sitio nuevo.

6. **Auditar y optimizar los 2 GBP** (Villa Carlos Paz y CABA): categoría correcta, horarios, fotos reales de cada local (no stock), teléfono propio por local, Google Posts periódicos.
7. **Arrancar YA el pedido sistemático de reviews de Google** — no hace falta esperar la app: proceso simple post-instalación (WhatsApp del técnico/vendedor con deep-link a la reseña de Google del local correspondiente). Pedir a todos, responder todas.
8. **NAP consistente** (nombre/dirección/teléfono idénticos) en web, GBP, redes y los 2-3 directorios argentinos que valgan la pena (Páginas Amarillas, Cylex) — nada de spam de directorios.
9. **JSON-LD Organization + LocalBusiness** (una entidad por sucursal, con geo/horarios/sameAs a redes) en el sitio — esto es lo que le da a Google/IA la fuente estructurada de "dónde está Rollershow".

## Fase 2 — Contenido y arquitectura del sitio nuevo (1-2 meses, impacto alto / esfuerzo medio)

Sobre el sitio Astro (frontend-lab), aplicar la arquitectura de la investigación:

10. **Schema completo**: `Product`+`Offer` y `FAQPage` en categorías/fichas de tela, `AggregateRating` (aun antes del hub UGC, usando el agregado de las 7.200 reviews si se puede verificar la fuente), `BreadcrumbList`.
11. **Página de precios** con rangos "desde $X/m²" — nadie en el nicho lo hace bien, y es contenido transaccional de alta intención.
12. **2 páginas de local** con contenido único (no doorway): mapa, fotos reales, FAQs locales — incluyendo aclarar explícitamente "no tenemos local en Córdoba Capital" para que ninguna IA alucine uno.
13. **4 guías core**: cómo medir, blackout vs sunscreen (comparativa, no informativa genérica — así generan más menciones de marca en IA), guía de precios, glosario de telas.
14. **Consolidar CSS** render-bloqueante (8-11 stylesheets por template hoy).
15. Mapear y ejecutar **redirects 301** de todo lo indexado de la legacy antes de cualquier migración final al sitio nuevo — es el error que más equity destruye si se salta.

## Fase 3 — Activar cuando la app de reviews con fotos esté viva (mediano plazo)

Esto depende del proyecto rollershow-reviews. Cuando exista:

16. **Hub `/reviews` indexable** con `Review`+`AggregateRating` anidados en `Product`, fotos reales con alt/filename descriptivo, sitemap de imágenes.
17. **Insertar reviews con foto en páginas de categoría/tela** ("blackout en dormitorio, Carlos Paz") — contenido único e imposible de copiar.
18. **Pipeline UGC → blog**: posts tipo "10 dormitorios reales con blackout" generados desde las fotos recolectadas, casi sin costo de producción.
19. Integrar en el mismo flujo de la app el pedido de reseña de Google (un solo punto de fricción para ambos objetivos: UGC del sitio + GBP).

## Fase 4 — GEO activo y medición (continuo, arrancar en paralelo a Fase 1)

No es una fase que "termina", es un hábito a instalar desde ya:

20. **Monitoreo manual mensual**: correr ~20 prompts fijos ("dónde comprar cortinas roller a medida en [ciudad]", "mejores marcas de cortinas roller Argentina", etc.) en ChatGPT/Gemini/Perplexity/Claude, registrar si aparece Rollershow y qué cita cada uno. Base para saber si el plan funciona.
21. **Presencia orgánica en Reddit/foros AR** (r/argentina, r/Cordoba, deco/construcción) — respuestas útiles reales, nunca spam.
22. **Digital PR con datos propios**: la base de +400.000 instalaciones y +10 años es un activo único para una nota de prensa ("qué tela elige cada provincia", ahorro energético con blackout) — Casa Roller ya lo está haciendo y funciona como fuente citada por IA.
23. 3-4 **videos de YouTube** (medición, instalación, comparativa) — la señal individual más correlacionada con visibilidad en IA en el estudio de Ahrefs.
24. Revisar en 6 meses si conviene sumar una herramienta de tracking (Otterly, ~USD 29/mes) para serie histórica en vez de solo el sondeo manual.

## Explícitamente fuera de alcance / no hacer

- Invertir más en `llms.txt` — ya está bien hecho, mantenerlo actualizado alcanza (97% de estos archivos nunca se leen según Ahrefs).
- Forzar entrada en Wikipedia.
- Páginas de ciudad donde no hay local físico (doorway pages).
- Comprar reviews, gating de reviews, o cualquier menció n comprada/spam en Reddit.
- Contenido masivo generado por IA sin fotos/experiencia real — es lo que penalizan los updates de 2025 y lo que NO citan los LLMs (ghost citations).

## Por qué este orden

Fase 0 son bugs de costo ~cero con impacto directo en crawleo/indexación — se hacen antes de cualquier estrategia porque no arreglarlos invalida el resto. Fase 1 (GBP + reviews) es el mayor apalancamiento posible sin depender de ningún desarrollo nuevo: es la fuente #1 que consultan tanto Google local como los LLMs para negocio físico, y arranca ya el hábito de pedir reviews que después alimenta tanto GBP como la futura app. Fase 2 construye el terreno de contenido que hoy le regala tráfico long-tail a Casa Roller y Roller Motion. Fase 3 queda deliberadamente atada al proyecto de reviews — no tiene sentido diseñar el hub UGC antes de que exista el flujo de captura. Fase 4 corre en paralelo desde el día 1 porque es la única forma de saber si algo de esto está moviendo la aguja en IA.
