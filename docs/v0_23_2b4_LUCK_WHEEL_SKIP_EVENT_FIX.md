# v0.23.2b4 — Luck Wheel Skip Event Fix

## Objetivo

Corregir el flujo de simulación rápida para que la Ruleta de la Suerte también pueda aparecer cuando el usuario pulsa **Saltar hasta próximo evento** o simula de golpe, siempre que se cruce un disparador válido antes del límite de dos tercios de Liga.

## Problema detectado

En v0.23.2b3 la ruleta funcionaba al simular partido a partido, pero podía no aparecer si la temporada se simulaba completa de una vez. El salto largo llegaba al final o a Copa y solo evaluaba el último resultado, por lo que podía saltarse el trigger de mitad de temporada.

## Solución

- `LeagueSimulatorView` simula internamente partido a partido al usar la acción rápida.
- Tras cada partido se evalúa `maybeOfferSeasonLuckWheel`.
- Si aparece la ruleta, se detiene el salto, se guarda el contexto y se muestra el modal.
- Se mantiene el límite máximo de dos tercios de Liga.
- La ruleta no aparece al cierre de temporada.

## No cambia

- No cambia el motor 40/40/20.
- No cambia pesos internos de premios.
- No cambia ratings históricos.
- No cambia plantillas.
- No cambia ranking local/global.
- No implementa todavía cambios reales de jugador/entrenador.

## Validación esperada

- `npm run qa:version`
- `npm run qa:season-luck-wheel-ui`
- `npm run qa:tech-debt`
- `npm run build`
