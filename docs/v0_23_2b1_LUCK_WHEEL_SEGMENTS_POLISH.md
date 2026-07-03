# v0.23.2b1 — Luck Wheel Segments Polish

Pulido visual de la Ruleta de la Suerte de temporada sobre `v0.23.2b_SEASON_LUCK_WHEEL_UI`.

## Objetivo

Mejorar la lectura y credibilidad de la ruleta con más quesitos sin modificar el motor de probabilidades cerrado en `v0.23.2a`.

## Cambios

- Ruleta visual con 12 segmentos.
- Puntero fijo fuera del disco.
- Disco girando por debajo del puntero.
- Centro `AUPA` fijo.
- Resultado visual alineado con el resultado lógico resuelto por el motor.
- Etiquetas largas divididas en dos líneas cortas.
- Distribución visual de premios:
  - 3 segmentos `+0.5 media`.
  - 3 segmentos `Sin efecto`.
  - 1 segmento `Cambio de jugador`.
  - 1 segmento `Cambio de entrenador`.
  - 1 segmento `+1.0 media`.
  - 1 segmento `+1.0 media + jugador`.
  - 1 segmento `-0.5 media`.
  - 1 segmento `-1.0 media`.

## Reglas no modificadas

- Probabilidad general: 40% positivo, 40% neutro, 20% negativo.
- Pesos positivos internos: 40% `+0.5`, 30% cambio de jugador, 20% cambio de entrenador, 8% `+1.0`, 2% `+1.0 + jugador`.
- Pesos negativos internos: 90% `-0.5`, 10% `-1.0`.
- Máximo 1 ruleta por temporada.
- Rechazo sin efecto.
- Pausa de simulación cuando aparece oferta.

## QA

- `npm run qa:season-luck-wheel` mantiene la lógica de probabilidades.
- `npm run qa:season-luck-wheel-ui` comprueba la UI, 12 quesitos, repetición visual controlada y puntero fijo.
- `npm run qa:tech-debt` integra las QA críticas.

## Fuera de alcance

- Ejecutar realmente el cambio de jugador.
- Ejecutar realmente el cambio de entrenador.
- Europa Career.
- Cambios de ratings históricos, plantillas, balance o ranking.
