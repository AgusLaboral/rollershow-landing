# Auditoría consolidada — Rollershow SEO + GEO (2026-07-14)

Informes fuente completos con evidencia y URLs: [_informes/auditoria-tecnica.md](_informes/auditoria-tecnica.md) y [_informes/visibilidad-serps.md](_informes/visibilidad-serps.md).

## Diagnóstico en una frase
Rollershow **rankea decente en genéricas por marca fuerte y homepage sólida**, pero es **técnicamente invisible para motores de IA y ausente en todo long-tail** (local, comparativas, guías) — terreno que hoy domina Casa Roller con SEO local programático y PR pagada.

## Hallazgos críticos (🔴)

1. **No existe robots.txt real** — el servidor devuelve el HTML de la página 404 del CMS. Ningún bot (Google, GPTBot, ClaudeBot, PerplexityBot, Google-Extended) tiene directivas explícitas ni referencia al sitemap.
2. **Cero JSON-LD en todo el sitio.** Ni Organization, ni LocalBusiness, ni Product, ni FAQPage, ni AggregateRating. Las "7.200+ opiniones" que muestra la home no generan ni un rich snippet.
3. **Cero H1 en todas las páginas auditadas** (home, /roller, fichas de tela, /showrooms, /preguntas-frecuentes).
4. **`/cotizar` da 404.** El cotizador real vive en `/cotizar/principal`, indexado con un title genérico viejo ("Cortinas Roller - Innovación y estética") — la página de conversión más importante del sitio está mal etiquetada.
5. **19 de 20 imágenes de la home sin `alt`.**
6. **Cero contenido editorial**: no hay blog, no hay páginas por ciudad/local (solo /showrooms genérica). Home con ~175 palabras de texto real.
7. **Las reviews viven fuera del ecosistema indexable**: widget de EmbedSocial bajo razón social "INTERCORTINAS SRL", no son Google Reviews públicas ni tienen schema — no le rinden nada a SEO ni a GEO.

## Hallazgos altos (🟡)

- Google Business Profile de ambos locales: sin señal fuerte visible — hay que auditarlo directo en Maps y optimizarlo.
- Subdominio `tienda.rollershow.com.ar` indexado con título "Tienda Online de intercortinas" — señal de marca confusa.
- CSS render-bloqueante (8-11 stylesheets por template).
- Sin tienda oficial visible en MercadoLibre (canal muy citado por IA en queries transaccionales).
- Sin ninguna mención en prensa/PR — Casa Roller sí tiene, y esas notas ya funcionan como fuente citada por IA.

## Lo único que ya está bien encaminado (🟢)

- **sitemap.xml** existe, 172 URLs, bien estructurado.
- **`llms.txt` existe y es excelente**: describe la empresa, ambos showrooms con dirección/horarios, familias de producto y hasta documenta la API v2 de cotización. Mejor que el SEO clásico del sitio — no requiere más inversión, mantenerlo actualizado alcanza.
- Titles, canonicals y Open Graph de home están bien resueltos.
- URLs limpias y jerárquicas.
- Presencia de marca limpia (sin resultados negativos), redes activas (IG, YouTube, FB, Pinterest, TikTok, LinkedIn).

## Mapa competitivo

| Competidor | Qué hace mejor que Rollershow |
|---|---|
| **Casa Roller** | Cientos de páginas locales por barrio/ciudad (incluida **Villa Carlos Paz**, la plaza de Rollershow); PR pagada en medios locales; página de testimonios pública |
| **Roller Motion** | Blog con guías que capturan intención de recomendación ("¿cuál es la mejor opción...") — exactamente lo que un LLM cita |
| **MercadoLibre / sellers** | Presentes en casi toda SERP transaccional, ratings visibles |

Rollershow rankea homepage en genéricas (~pos. 2-6: "precio", "a medida", "Buenos Aires") pero está **ausente** en: blackout+ciudad, "fábrica de cortinas roller", guías/comparativas, y pierde su propia plaza (Carlos Paz) frente a Casa Roller.
