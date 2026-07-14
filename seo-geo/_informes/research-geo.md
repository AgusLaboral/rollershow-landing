# Informe GEO — Cómo lograr que ChatGPT, Gemini, Perplexity y Claude recomienden a Rollershow

Investigación sobre Generative Engine Optimization (AI search optimization), enfocada en una PyME de e-commerce local (cortinas a medida, Argentina, locales en Villa Carlos Paz y CABA). Fuentes 2024-2026.

---

## 1. Cómo eligen fuentes los motores

**Dos mecanismos distintos** que conviene no mezclar:
- **Conocimiento paramétrico (training data)**: lo que el modelo "sabe" de la marca por haber sido entrenado con la web. Se mueve lento (meses/años). Acá pesan menciones acumuladas en fuentes confiables, Wikipedia, foros.
- **Retrieval en tiempo real (RAG/browsing)**: lo que el motor busca al momento de responder. Se mueve rápido y es donde el SEO clásico sigue mandando.

Por motor:
- **ChatGPT**: browsing sobre el **índice de Bing** + conocimiento de entrenamiento. Sesgo fuerte hacia Wikipedia y hacia contenido **fresco** (76% de sus páginas más citadas fueron actualizadas en los últimos 30 días). Para productos, ahora existe **ChatGPT Shopping** con feed de merchants de OpenAI ([Profound](https://www.tryprofound.com/blog/chatgpt-shopping-deep-dive)).
- **Gemini / AI Overviews de Google**: índice de Google. Google confirmó que AI Overviews usa **señales SEO tradicionales**. Rankear top-10 en Google sigue siendo el mejor predictor de aparecer ahí.
- **Perplexity**: retrieval propio (índice vectorial), **dominado por Reddit** y fuentes comunitarias; usa reviews en el ~100% de respuestas locales.
- **Claude**: browsing (Brave/propio) + training data; el menos estudiado, pero responde a las mismas señales de citabilidad.

Dato clave: solo **~11% de solapamiento de dominios citados** entre ChatGPT y Perplexity — hay que trabajar cada superficie ([Enrich Labs](https://www.enrichlabs.ai/blog/generative-engine-optimization-geo-complete-guide-2026)). Las plataformas comunitarias capturan **52,5% de las citas** agregadas (estudio Otterly de 1M de citas). Reddit fue el dominio más citado (40,1% en un análisis de 150k citas — [Brainz](https://www.brainz.digital/blog/reddit-seo-llm-aeo/)).

**Qué señales pesan** (estudio Ahrefs, 75.000 marcas — [ahrefs.com/blog/ai-brand-visibility-correlations](https://ahrefs.com/blog/ai-brand-visibility-correlations/)): menciones en YouTube (correlación 0,737), **menciones de marca en la web** (0,664) y anchor text de marca (0,527) predicen visibilidad en IA **2-3x más que los backlinks** (0,218). La visibilidad en IA es función de la autoridad de marca como señal compuesta, no de trucos on-page.

---

## 2. Tácticas rankeadas por evidencia

### Evidencia FUERTE

1. **SEO clásico bien hecho + rankear en Google/Bing.** Los motores hacen retrieval sobre esos índices; sin indexación y ranking no hay cita. AI Overviews cita mayormente páginas top-10. (Google, Ahrefs, Semrush).
2. **Contenido "citable": estadísticas, citas de fuentes, datos concretos.** El paper GEO de Princeton ([arXiv 2311.09735](https://arxiv.org/abs/2311.09735), KDD 2024, ~10.000 queries) midió +30-40% de visibilidad agregando **estadísticas, quotes y citas de fuentes**. Efecto "ecualizador": las páginas en posición ~5 ganan hasta +115% — ideal para una PyME que no es líder de mercado ([resumen](https://thegeocommunity.com/blogs/generative-engine-optimization/geo-princeton-paper-original-study/)).
3. **Reviews de terceros y Google Business Profile.** Para negocios locales, GBP es LA fuente primaria de los motores. Umbral de entrada observado: **30+ reviews con 4,3★+**; ChatGPT referencia reviews en 58% de respuestas locales, Perplexity en 100% ([EvolveAMZ](https://evolveamz.com/local-business-ai-search-guide/), [Explofi](https://explofi.com/blog/ai-search/how-to-show-up-in-chatgpt-and-google-ai-overviews-as-a-local-business)).
4. **Presencia en Reddit y foros/UGC.** Dominio #1 en citas de LLMs. Para Argentina: hilos genuinos en r/argentina, r/Cordoba, r/BuenosAires, foros de decoración/construcción, respuestas útiles (no spam) donde se mencione la marca en contexto de "cortinas roller a medida".
5. **Frescura del contenido.** Contenido citado por IA es 25,7% más fresco que el orgánico tradicional; actualizar páginas clave regularmente ([Omnibound](https://www.omnibound.ai/blog/generative-engine-optimization-statistics)).
6. **Estructura extraíble: FAQs, listas, comparativas, respuestas directas arriba.** Los LLMs extraen pasajes autocontenidos. Páginas tipo "Cortinas roller blackout vs sunscreen: cuál conviene", "Cuánto cuesta una cortina roller a medida en Argentina [2026]", con la respuesta en las primeras líneas.

### Evidencia MEDIA

7. **Schema.org** (LocalBusiness, Product, FAQPage, Review, Offer). Ayuda a la desambiguación de entidad y a los shopping feeds; la evidencia de que aumente citas per se es correlacional, no causal.
8. **Digital PR / menciones en medios y listas "best of".** Coherente con el hallazgo de Ahrefs (menciones > backlinks). Aparecer en notas de medios argentinos, rankings "mejores cortinas roller", directorios de decoración. Los LLMs citan mucho páginas listicle de terceros — estar en las listas que ellos citan vale más que la propia web.
9. **YouTube.** Correlación más alta del estudio Ahrefs (0,737) y 19% de las citas en respuestas de producto. Videos de instalación/medición/comparativas con la marca nombrada.
10. **Consistencia de entidad (NAP + Wikidata + perfiles).** Mismo nombre/dirección/teléfono en GBP, web, redes, directorios. Wikidata es alcanzable para una PyME; **Wikipedia no** (notabilidad) — no forzarla, se borra y quema la entidad.
11. **Feed de merchant de OpenAI / datos de producto estructurados.** Para e-commerce, sumarse al programa de product feeds de ChatGPT Shopping cuando esté disponible en Argentina ([HubSpot](https://blog.hubspot.com/marketing/chatgpt-product-recommendations)).
12. **Página "sobre nosotros" + datos verificables** (años en el mercado, 2 locales, +10.000 clientes): los motores prefieren afirmaciones atribuibles.

### Especulativa / NO funciona

- **llms.txt: hype.** Ahrefs analizó 137k sitios: **97% de los archivos llms.txt nunca se leen** ([estudio](https://ahrefs.com/blog/llmstxt-study/)). John Mueller (Google): "no es para search", ningún motor mayor lo consume ([SE Ranking](https://seranking.com/blog/llms-txt/)). Costo casi cero si querés ponerlo, pero cero evidencia de beneficio.
- **Keyword stuffing "para LLMs"**: el paper de Princeton midió **cero beneficio y leve degradación**.
- **Spam de menciones / astroturfing en Reddit**: Reddit banea, y los modelos ponderan contexto y antigüedad de cuentas. Riesgo reputacional alto.
- **Contenido masivo generado por IA de baja calidad**: penalizado por Google (helpful content) y no genera las señales de marca que sí correlacionan.
- **"Optimizar para el modelo" con texto oculto / prompt injection en la página**: detectable, riesgo de blacklist.
- **Ghost citations — matiz importante**: Semrush encontró que **62% de las citas no mencionan la marca** en la respuesta ([Ghost Citations Study](https://www.semrush.com/blog/the-ghost-citations-study/)). Las queries **comparativas** ("mejor X", "X vs Y", "recomendame") generan 2,4x más menciones de marca que las informativas → priorizar contenido comparativo/transaccional sobre "qué es una cortina roller".

---

## 3. Cómo medir

1. **Monitoreo manual (gratis, empezar acá)**: batería de ~20 prompts ("¿dónde comprar cortinas roller a medida en Buenos Aires/Carlos Paz/Argentina?", "mejores marcas de cortinas roller Argentina", "cortina blackout a medida precio") corridos mensualmente en ChatGPT, Gemini, Perplexity y Claude, registrando si aparece Rollershow, competidores citados y fuentes linkeadas. Un script/planilla alcanza para una PyME.
2. **Tráfico referral en GA4**: segmentar `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com`. Ojo: convierte muy distinto — hay datos de conversión de referral de ChatGPT de ~15,9% vs 1,76% orgánico ([GrowthPro](https://growthproai.com/ai-search-statistics-local-businesses-2026)); poco volumen, alta intención.
3. **Herramientas** ([comparativa Surmado](https://www.surmado.com/blog/best-ai-visibility-tools-2026)): **Otterly** desde USD 29/mes (entrada razonable para PyME; trackea ChatGPT, Perplexity, AIO, Gemini, sentimiento y citas), **Peec AI** desde €89/mes (mid-market), **Profound** USD 400-500+/mes (enterprise, overkill para Rollershow). Recomendación: manual primero, Otterly si se quiere serie histórica.
4. **KPI razonables**: share of voice en los 20 prompts vs competidores, % de respuestas con mención + link, sentimiento de la mención.

---

## 4. Qué cambia por ser negocio LOCAL bi-ciudad (vs e-commerce nacional)

- **GBP es el activo #1**: dos perfiles completos (Carlos Paz y CABA), categorías correctas, fotos, horarios, Q&A, posts. Es la fuente que ChatGPT/Perplexity consultan para "cerca de mí" y "en [ciudad]".
- **Reviews por local**: el umbral 30+/4,3★ aplica **por perfil**. Cami/postventa (Orne) pueden sistematizar el pedido de review post-instalación — sinergia directa con el proyecto rollershow-reviews.
- **Citations locales consistentes**: directorios AR (Guía Clarín, Páginas Amarillas, MercadoLíder perfil, cámaras de comercio locales), mismo NAP exacto en todos.
- **Páginas de ubicación dedicadas** en el sitio: `/cortinas-roller-carlos-paz` y `/cortinas-roller-buenos-aires` con LocalBusiness schema, dirección, mapa, reviews embebidas y FAQs locales ("¿hacen envíos a Córdoba Capital?" — importante porque NO hay local ahí y la IA puede alucinar uno).
- **Dualidad**: para queries nacionales ("comprar cortinas roller online Argentina") juega el playbook e-commerce (comparativas, feed de producto, menciones); para queries locales juega GBP + reviews. Son dos frentes con contenido distinto.
- Contexto de oportunidad: la adopción de IA para búsqueda local saltó de 6% a ~45% en un año, y ~97% de los negocios no tiene estrategia ([PushLeads](https://pushleads.com/45-of-customers-are-using-chatgpt-to-find-local-services-now-google-business-pro/)) — ventana abierta, pero los números de vendors locales hay que tomarlos con pinzas (fuentes con incentivo comercial).

---

## 5. Plan priorizado (síntesis del agente de research)

1. **Ya** (evidencia fuerte, costo bajo): reviews sistemáticas en ambos GBP; FAQs y comparativas con respuestas directas y datos concretos ("blackout vs sunscreen", "precio por m² 2026"); actualizar fechas/contenido de páginas clave mensualmente; página con estadísticas propias citables ("datos de +10.000 instalaciones": medidas más pedidas, telas más elegidas — nadie más en AR tiene ese dato → imán de citas).
2. **Trimestre**: schema LocalBusiness/Product/FAQ, páginas por ciudad, Wikidata, presencia genuina en Reddit/foros AR, 3-4 videos YouTube (medición/instalación).
3. **Continuo**: monitoreo manual mensual de 20 prompts + referral en GA4; digital PR para entrar en listas "mejores cortinas Argentina".
4. **No hacer**: Wikipedia forzada, llms.txt como estrategia, spam de menciones, contenido IA masivo.

### Fuentes principales
- Paper GEO Princeton/IIT: https://arxiv.org/abs/2311.09735 · https://thegeocommunity.com/blogs/generative-engine-optimization/geo-princeton-paper-original-study/
- Ahrefs: https://ahrefs.com/blog/ai-brand-visibility-correlations/ · https://ahrefs.com/blog/llmstxt-study/
- Semrush: https://www.semrush.com/blog/the-ghost-citations-study/ · https://www.semrush.com/blog/ai-search-seo-traffic-study/ · Kevin Indig: https://www.growth-memo.com/p/the-ghost-citation-problem
- Aleyda Solís: https://www.aleydasolis.com/en/search-engine-optimization/ai-search-trends/ · https://speakerdeck.com/aleyda/whats-moving-the-needle-in-ecommerce-seo-and-ai-search-in-2026
- Profound: https://www.tryprofound.com/blog/chatgpt-shopping-deep-dive · https://www.tryprofound.com/resources/articles/generative-engine-optimization-geo-guide-2025
- Reddit/LLMs: https://www.brainz.digital/blog/reddit-seo-llm-aeo/ · llms.txt: https://seranking.com/blog/llms-txt/ · https://www.mintlify.com/blog/the-value-of-llms-txt-hype-or-real
- Local: https://evolveamz.com/local-business-ai-search-guide/ · https://explofi.com/blog/ai-search/how-to-show-up-in-chatgpt-and-google-ai-overviews-as-a-local-business · https://growthproai.com/ai-search-statistics-local-businesses-2026
- Tools: https://www.surmado.com/blog/best-ai-visibility-tools-2026 · https://discoveredlabs.com/blog/profound-vs-peec-vs-otterly-which-ai-visibility-platform-should-you-buy
- https://ppc.land/microsoft-shows-marketers-how-ai-search-actually-picks-brands-to-recommend/ · https://www.omnibound.ai/blog/generative-engine-optimization-statistics

Nota metodológica: los números de vendors de herramientas GEO (PushLeads, GrowthPro, EvolveAMZ) tienen incentivo comercial — orientativos; lo más sólido: paper de Princeton (experimental) y estudios a escala de Ahrefs/Semrush (correlacionales).
