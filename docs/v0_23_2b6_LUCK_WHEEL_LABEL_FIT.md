# v0.23.2b6 — Luck Wheel Label Fit

Pulido menor de la Ruleta de la Suerte para mejorar la lectura de los premios dentro de cada quesito.

## Cambios

- Sustituye etiquetas largas dentro de la rueda por abreviaturas compactas:
  - `Jugador` → `Jug.`
  - `Entrenador` → `Entr.`
  - `+1` + `+ Jug.` → `+1` + `Jug.`
- Ajusta ancho, tamaño, interlineado y sombra de las etiquetas de los quesitos para reducir borrosidad y desbordes.
- Mantiene la leyenda externa con el texto completo de cada premio.
- Refuerza `qa:season-luck-wheel-ui` para comprobar que las etiquetas internas son compactas.
- Refuerza QA de integración para dejar claro que `ratingDelta` ya se aplica al rating usado por simulación cuando la ruleta fue aceptada.

## Confirmación de efectos

Los premios de media ya tienen efecto desde la fase UI:

- `+0.5` aplica `ratingDelta = 0.5`.
- `+1.0` aplica `ratingDelta = 1`.
- `-0.5` aplica `ratingDelta = -0.5`.
- `-1.0` aplica `ratingDelta = -1`.

Estos efectos se aplican al rating de temporada usado por la simulación hasta final de campaña.

## Fuera de alcance

- No cambia probabilidades reales.
- No cambia balance.
- No toca ratings históricos ni plantillas base.
- No ejecuta todavía los premios reales de cambio de jugador o cambio de entrenador.
- No toca ranking global/local ni Europa Career.
