# v0.22.9 — Local ranking basic

## Objetivo

Guardar las mejores carreras localmente en el navegador al llegar a Game Over, sin backend ni ranking global.

## Implementado

- Nueva capa `src/career/careerRanking.ts` para cálculo puro del ranking.
- Nueva persistencia `src/storage/careerLocalRankingStorage.ts` usando `localStorage` independiente de la partida guardada.
- Nueva pantalla `CareerLocalRanking` con Top local.
- Guardado automático al llegar a `career_game_over`.
- Campos guardados:
  - temporadas superadas,
  - puntos arcade,
  - puntuación de supervivencia,
  - puntuación de palmarés,
  - palmarés final,
  - mejor posición liguera,
  - última temporada,
  - última posición liguera,
  - versión del juego,
  - fecha ISO.
- Orden del ranking:
  1. puntos arcade,
  2. temporadas superadas,
  3. palmarés,
  4. mejor posición liguera,
  5. fecha más reciente.
- Botones añadidos:
  - `Nueva carrera`,
  - `Ver ranking local`,
  - `Borrar ranking local`.

## QA automática

Nuevo comando:

```bash
npm run qa:career-ranking
```

Valida:

- Game Over suma títulos vigentes al palmarés final.
- Fórmula de puntos arcade.
- Entrada con campos obligatorios.
- Mejor posición de carrera.
- Orden del ranking local.
- Límite Top 100.

## Fuera de alcance

- No hay backend.
- No hay ranking global.
- No se piden nicks.
- No hay protección anti-spam.
- No se modifica balance.
- No se modifican ratings históricos.
- No se modifican plantillas.
