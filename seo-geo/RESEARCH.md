# Research consolidado — SEO + GEO (2026-07-14)

Informes fuente completos con fuentes citadas: [_informes/research-geo.md](_informes/research-geo.md) y [_informes/research-seo-local-ecommerce.md](_informes/research-seo-local-ecommerce.md).

## Cómo eligen fuentes los motores (resumen)

- **Google/Gemini/AI Overviews**: retrieval sobre el índice de Google. Rankear top-10 clásico sigue siendo el mejor predictor de aparecer citado.
- **ChatGPT**: browsing sobre Bing + conocimiento de entrenamiento; sesgo fuerte a contenido fresco (76% de sus citas más frecuentes se actualizaron en 30 días) y a Wikipedia.
- **Perplexity**: índice propio, dominado por Reddit y comunidades (Reddit = dominio #1 citado en estudios agregados).
- Solo ~11% de solapamiento de fuentes citadas entre ChatGPT y Perplexity → **hay que trabajar cada superficie por separado**, no una sola táctica sirve para todas.
- Señal más correlacionada con visibilidad en IA (estudio Ahrefs, 75k marcas): **menciones de marca en la web** (0,664) y en YouTube (0,737) — 2-3x más peso que los backlinks (0,218). GEO se gana con autoridad de marca compuesta, no con trucos on-page.

## Tácticas por nivel de evidencia

**Evidencia fuerte** (hacer sí o sí): SEO clásico + indexación sana; contenido citable con estadísticas y datos propios (paper Princeton: +30-40% visibilidad); reviews de terceros + Google Business Profile (activo #1 para negocio local, umbral ~30 reviews/4,3★); presencia genuina en Reddit/foros; frescura de contenido; estructura extraíble (FAQs, respuestas directas arriba).

**Evidencia media** (vale la pena, no es el core): schema.org, digital PR/menciones en medios, YouTube, consistencia de entidad (NAP + Wikidata), feeds de producto para IA shopping.

**No hacer / mitos**: **llms.txt como estrategia** (Ahrefs: 97% de los llms.txt nunca se leen — Rollershow ya tiene uno bueno, mantenerlo pero no invertir más ahí); keyword stuffing "para LLMs" (0 beneficio, paper Princeton); spam de menciones/astroturfing en Reddit; contenido IA masivo de baja calidad; forzar entrada en Wikipedia (se borra, quema la entidad).

**Matiz importante**: 62% de las citas de IA no mencionan la marca en el texto de la respuesta (ghost citations) — las queries **comparativas** ("mejor X", "X vs Y") generan 2,4x más menciones de marca que las informativas genéricas. Priorizar contenido comparativo y transaccional sobre "qué es una cortina roller".

## Lo que cambia por ser negocio local bi-ciudad

GBP es el activo #1 para "cerca de mí" y queries por ciudad. Reviews sistemáticas por local (umbral 30+/4,3★ aplica por perfil — sinergia directa con la futura app de reviews). Páginas de ubicación deben tener contenido único (no doorway): mapa, fotos reales, reviews de esa zona, FAQs locales explícitas sobre dónde SÍ y NO hay local (ojo: no hay local en Córdoba Capital, solo Villa Carlos Paz — una IA puede alucinar uno si no está aclarado en el sitio).

## SEO local + e-commerce del nicho (síntesis)

- **Arquitectura**: silo plano por tela (blackout/sunscreen/dobles/motorizadas), páginas de precio con rangos "desde $X", 2 páginas de local únicas, guías (medir, comparativas, glosario de telas), hub de reviews.
- **Publicar precios ayuda** — casi nadie lo hace en el nicho, y el usuario que no encuentra precio se va a quien sí lo muestra.
- **El cotizador/simulador son "link assets"**: las calculadoras generan links naturalmente porque responden preguntas que necesitan un número exacto.
- **Astro es la elección técnica correcta** (HTML server-rendered, sin problemas de hydration) — la regla es que todo el contenido SEO (copy, schema, reviews) esté en el HTML estático, no inyectado por JS cliente.
- **Peores prácticas del nicho**: páginas de ciudad clonadas (doorway), migrar sin mapear redirects 301, copiar descripciones de tela del proveedor (duplicate content compartido con competidores), canibalización de keywords, reviews falsas o filtradas.

## Cómo capitalizar la futura app de reviews con fotos (UGC)

1. Hub `/reviews` indexable con `AggregateRating` + `Review` anidados en schema `Product` (rich snippet de estrellas — permitido cuando son reviews reales recolectadas por la marca).
2. Reviews con foto insertadas en páginas de categoría/tela ("blackout en dormitorio, Carlos Paz") — contenido único que ningún competidor puede copiar, long-tail natural.
3. Posts de blog generados desde UGC ("10 dormitorios reales con blackout") — costo de producción casi cero.
4. Imagen SEO sobre las fotos: filename descriptivo, alt text real, AVIF, sitemap de imágenes.
5. El mismo flujo de recolección debe pedir, en el mismo paso, la reseña en Google del local correspondiente (deep link) — resuelve GBP y UGC-SEO con una sola fricción al cliente.

## Cómo medir

- **Gratis**: batería de ~20 prompts corridos mensualmente a mano en ChatGPT/Gemini/Perplexity/Claude, registrando si aparece Rollershow y qué fuentes citan.
- **Referral en GA4**: segmentar chatgpt.com / perplexity.ai / gemini.google.com — bajo volumen, altísima intención (conversión de referral IA medida hasta ~9x la orgánica en algunos estudios).
- **Herramienta si se quiere serie histórica**: Otterly (~USD 29/mes) es el punto de entrada razonable para una PyME; Peec/Profound son overkill de precio para esta escala.
