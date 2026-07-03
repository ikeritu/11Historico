# v0.23.2b5 — Palmarés Supercopa + Game Over Showcase

## Objetivo

Revisar que el palmarés muestre todos los títulos ganados en modo carrera y añadir una vitrina visible en la pantalla de Game Over.

## Cambios

- `PalmaresTrophyCase` acepta ahora `CareerTrophyCounts`.
- La vitrina puede funcionar en modo partida suelta o modo carrera.
- El modo carrera mapea todos los contadores de títulos:
  - Liga.
  - Copa del Rey.
  - Supercopa de España.
  - Champions League.
  - Europa League.
  - Conference League.
- La pantalla de Game Over muestra una vitrina de palmarés con los trofeos acumulados.
- El Game Over suma la temporada actual antes de mostrar la vitrina.
- El resumen completo recibe el palmarés acumulado visible cuando procede de modo carrera.

## QA

- Añadido `npm run qa:palmares-showcase`.
- Integrado en `npm run qa:tech-debt`.

## Límites

- No toca balance de Liga/Copa.
- No toca probabilidades de Ruleta de la Suerte.
- No toca ratings históricos ni plantillas base.
- No implementa todavía premios reales de cambio de jugador/entrenador desde la ruleta.
