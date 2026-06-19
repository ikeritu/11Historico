# v0.14.7 — Draft con variedad real de temporadas

## Objetivo

Reducir la sensación de repetición fea en el draft sin tocar ratings, plantillas, Liga ni Copa.

## Cambios

- El draft sigue generando 11 temporadas sin repetir temporada exacta cuando hay pool suficiente.
- Ahora intenta evitar también que dos rondas consecutivas caigan en la misma década, siempre que haya alternativa disponible.
- El botón de resorteo/salto de ronda usa la misma lógica de variedad.
- La ruleta visual de temporada usa el pool completo disponible para el modo/rango elegido, no solo las 11 temporadas ya sorteadas.

## Importante

- Modo Fácil mantiene su selector de rangos.
- Modo Normal no cambia reglas de dificultad ni balance.
- Modo Leyenda no cambia reglas de dificultad ni balance.
- Si un rango pequeño no permite evitar década repetida, el juego prioriza no romper el sorteo y usa el pool disponible.

## Validación

- `npm run build` OK.
