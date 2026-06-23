# Plan de pulido — Landings (Ronda 1 de feedback)

> Estado: **planificado, sin ejecutar**. Ejecutamos por fases, una por vez.
> Abarca DOS bases de código distintas:
> - **Landing normal** → `Desktop/rollershow/index.html` (vanilla, se edita directo).
> - **Simulador** → `Desktop/rollershow-simulador/src/pages/simulador.astro` (Astro aparte).
> Cada cambio "para ambas" se aplica dos veces, en dos repos.

## Decisiones cerradas (Agus, ronda 1)

- **Gracias = una sola página universal.** Es la `gracias.astro` que armamos juntos (deployada en GH Pages `rollershow-gracias`). NO se divide en dos. Ambas landings, tras el **último clic de "recibir"**, redirigen a esa misma gracias. La integración/concatenación real en el CMS la puede terminar Nicolás; nosotros dejamos el flujo apuntando ahí.
- **Reviews:** los redacto yo, cortos y realistas, matcheados a la foto del ambiente. Agus los corrige después.
- **Apartado de autoridad:** por ahora SOLO bloque de copy. Sin fotos (evitar stock/genéricas). Si hace falta, Agus pasa fotos reales más adelante.
- **Juego de romper el blackout:** se deja para OTRA ronda. NO eliminar el viejo todavía. La idea de reemplazo (test de luz) hay que **testearla y dejarla estética/funcionalmente correcta ANTES** de sacar la actual. Requiere pensamiento, no apurarlo.

---

## FASE 1 — Fundacional (flujo + mensaje, mueve conversión)

### 1.1 — Mensaje de WhatsApp genérico (ambas)
Problema: mensajes pre-rellenados demasiado específicos que el bot (Ulises) no procesa bien.
- Simulador manda `text=Hola! Quiero simular una cortina Roller` (simulador.astro:1140) → "simular" no lo entiende el bot.
- Landing manda colores específicos `Me interesa el Blackout Blanco, ¿me dan más info?` (index.html:2613-2633).
Acción: unificar TODOS los `wa.me?text=` a una sola intención genérica de cotizar / hacer las cortinas.
- Landing: header, hint, 6 tarjetas del carrusel (2613-2633), submit del form (3413), sticky CTA, FAQ links.
- Simulador: header (1140) + envío final.

### 1.2 — Todo termina en la gracias universal
Hoy: el form de la landing abre WhatsApp y no redirige; el simulador tiene su propio "Paso 6 — Gracias" inline (simulador.astro:1056).
Acción: tras el último clic de "recibir", redirigir a la gracias universal (abrir WhatsApp en pestaña nueva + redirigir la pestaña actual a /gracias). Eliminar el paso 6 inline del simulador a favor de la universal.

### 1.3 — Reescribir el hero (ambas, criterio distinto)
- Landing: "Te ayudamos a acertar con la tela, la medida y el presupuesto" (index.html:2313) está flojo → reescribir en la línea orgánica del resto de la copy.
- Simulador: "Probá la cortina en tu ventana antes de comprar" (simulador.astro:1157) → alinear con la promesa del AD que trae al usuario ("simulá cómo quedaría tu cortina en tu casa") = message match.

### 1.4 — Apartado de autoridad / posicionamiento (ambas)
Sección nueva, SOLO copy: "todas las soluciones premium para control solar" — de cortinas de madera a motorizadas, siempre a medida, única y de alta calidad. Diferencial "los más grosos de Argentina". Sin fotos por ahora.

---

## FASE 2 — Contenido + interacción

### 2.1 — Reviews que no mientan
Los testimonios actuales son fake, no coinciden con la foto del ambiente y usan avatares de randomuser.me (tell de IA). Reescribir cada quote para que matchee la foto real. Resolver avatares (probable: quitar / monograma con inicial). Borradores en el chat, Agus corrige.

#### Reviews APROBADOS por Agus (usar verbatim, solo corregir typo de marca "blakout"→"blackout"; mantener tono casual y minúsculas)

1. Living, Blackout gris — "buscaba algo sobrio para el living y el blackout gris quedó super bien, me asesoró muy bien Antonella gracias por la paciencia" — Roller Blackout · Gris · Palermo
2. Dormitorio, Blackout blanco — "Necesitaba oscuridad para dormir de día y este cumplió re bien, nada que ver con las anteriores que había comprado que tenía huequitos, Micaela me atendió" — Roller Blackout · Blanco · Belgrano
3. Home office, Blackout sand — "buscaba una cortina para dejar de renegar mientras laburo con la pc, esta tela cálida no sabía que venía y en persona se ve inclusive mejor, menos mal que me la recomendó el chico que me asesoró, les debo hacer las del living ahora jaja" — Roller Blackout · Sand · Caballito
4. Estudio, Blackout blanco — "Mandé una foto y dos medidas, al otro día vinieron, instalaron y quedó prolijo, me hubiera gustado igual la otra cadenita que tienen" — Roller Blackout · Blanco · Villa Crespo
5. Living, Sunscreen — "Quería luz pero que no me vean porque mi casa da a la vereda y un patio compartido, puse el sunscreen, re amable Pablo el chico que me atendió" — Roller Sunscreen · Living
6. Dormitorio, Blackout sand — "es la primera vez que compro algo tan caro online sin verlo, me sorprende cómo tienen todo resuelto para mostrarte un producto sin verlo en persona, compré con mis dudas pero llegó justo lo que me dijeron y hasta les sequé la mente para instalarlas pobre Lucía mil gracias por la paciencia, quedaron bellas" — Roller Blackout · Sand · Núñez

Avatares: default = quitarlos (randomuser.me es tell de IA), dejar nombre + tela + barrio.

### 2.2 — Juego de romper el blackout (RONDA FUTURA, no ahora)
Idea de reemplazo: test de luz / fuga de luz (arrastrás un sol detrás de la tela; blackout verdadero = negro, "económica" = pinchazos de luz). Demuestra el trabajo real de la tela en vez de romperla.
CUIDADO: no eliminar la actual hasta tener la nueva testeada y correcta estética + funcionalmente. Requiere desarrollo cuidado.

---

## Orden de ejecución sugerido
1. Fase 1.1 (WhatsApp genérico) — rápido, ambas.
2. Fase 1.2 (redirect a gracias) — flujo.
3. Fase 1.3 (heros).
4. Fase 1.4 (autoridad).
5. Fase 2.1 (reviews) — depende de aprobación de copy.
6. Fase 2.2 (juego) — ronda aparte.
