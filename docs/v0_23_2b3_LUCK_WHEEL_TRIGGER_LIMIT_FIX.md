# v0.23.2b3 — Luck Wheel Trigger Limit Fix

## Objetivo

Evitar que la Ruleta de la Suerte aparezca al terminar la temporada o en el tramo final de Liga, donde ya no tiene sentido jugable y puede bloquear el flujo hacia el resumen final.

## Cambios

- La ruleta solo puede ofrecerse hasta los dos primeros tercios de la Liga.
- Para una Liga de 38 jornadas, el límite operativo es la jornada 25 (`Math.floor(38 * 2 / 3)`).
- A partir de ese punto, los triggers tardíos se ignoran aunque haya eliminación de Copa o la simulación alcance el final.
- Al resolver o rechazar una ruleta pendiente, la vista llama a `finishIfReady(nextContext)` para cerrar la temporada si ya está lista.

## Qué no cambia

- No cambia la distribución 40% positivo / 40% neutro / 20% negativo.
- No cambia la distribución interna de premios positivos o negativos.
- No cambia ratings históricos, plantillas, balance, ranking local, ranking global ni Europa Career.

## QA

- `npm run qa:season-luck-wheel-ui` comprueba que existe un límite temporal de ruleta basado en `2 / 3` de la Liga.
- La QA verifica que resolver o rechazar una oportunidad pendiente no bloquea una temporada que ya puede cerrarse.
- `npm run qa:tech-debt` incluye la QA de ruleta UI.
