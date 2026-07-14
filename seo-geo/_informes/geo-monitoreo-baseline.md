# Monitoreo GEO — baseline 2026-07-14

Primera corrida de la batería de prompts (ver metodología en [RESEARCH.md](../RESEARCH.md) §"Cómo medir"). Corrida vía WebSearch, que aproxima cómo Google/AI Overviews arma una respuesta — **no es idéntico** a preguntarle directamente a ChatGPT/Gemini/Perplexity/Claude como chatbot; eso hay que correrlo a mano una vez por mes (ver EJECUCION.md). Sirve como primera foto para comparar contra corridas futuras.

## Resultados por prompt

| Prompt | ¿Aparece Rollershow? | Quién domina la respuesta |
|---|---|---|
| "dónde comprar cortinas roller a medida en Argentina, recomendación" | **Sí**, mencionada explícitamente con sus propios datos (402k instaladas, 7.200+ opiniones, garantía hasta 3 años) | Casa Roller aparece primero y como "la empresa con mayor cantidad de reseñas y mejor calificada" |
| "mejores marcas de cortinas roller Argentina 2026" | **No** | Casa Roller y Roller Motion (por su blog/guía 2026); en ML dominan Roller Pro, Shade Master, Roller Market |
| "cortinas roller a medida Villa Carlos Paz" | **Sí**, con dirección y teléfono correctos (0351 700-0201) | Pero comparte listado con 4 competidores locales (Liberty Decoraciones, Casa Roller, Roller Carlos Paz, RollerHouse) — no hay señal de que Rollershow se destaque sobre el resto |
| "fábrica de cortinas roller confiable Buenos Aires" | **No** | Casa Roller, MeleRoller, Sol Técnico, Diseño Roller, Art Windows — Rollershow ni aparece en la lista de "opciones confiables" |
| "cortina blackout a medida precio Buenos Aires recomendada" | **No** | Roller Market, Verónica Home, Casa Roller, Black and Sun |
| "Casa Roller reseñas opiniones clientes" (benchmark competitivo) | — | Casa Roller: **4,9/5, +10.000 reseñas, +500.000 cortinas entregadas** — supera en volumen a las cifras públicas de Rollershow (7.200+ reseñas, 402k instaladas) |

## Lectura

- Rollershow **sí entra en el set de consideración** cuando la query es genérica ("dónde comprar", con marca reconocida) o hiper-local con su propio nombre ("Villa Carlos Paz"), citando incluso sus propios números.
- **Pierde sistemáticamente las queries de "confiabilidad" y "mejores marcas"** — ahí gana Casa Roller casi siempre, apoyada en un volumen de reseñas más alto (10k+ vs 7.2k+) y en contenido de terceros (notas de prensa, blog de Roller Motion) que Rollershow no tiene.
- Señal accionable directa: **el volumen de reseñas de Casa Roller (10k+) ya superó al de Rollershow (7.2k+)** — otro argumento para arrancar ya el pedido sistemático de reviews (ver `assets/whatsapp-pedido-review.md`), no es solo un tema de dónde viven las reseñas sino de cantidad absoluta.

## Próxima corrida
Repetir esta batería (y sumar las 20 completas de RESEARCH.md) en ~30 días para medir si los cambios de Fase 0/1 movieron algo. Guardar cada corrida como archivo nuevo `geo-monitoreo-YYYY-MM-DD.md` para comparar en el tiempo.
