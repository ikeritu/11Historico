# v0.23.0c — Team Power Progression QA

## Objetivo

Asegurar que las mejoras de equipo en modo carrera no son solo texto visual: la Media XI, el rating visible, los ratings por línea, el entrenador y el premio temporal `+0.5` deben alimentar el poder efectivo que usa la simulación.

## Cambios

- Centraliza el cálculo de poder de carrera en `src/career/teamPower.ts`.
- El premio de entrenador `+0.5` se aplica a `overall`, ataque, defensa, control, físico, mentalidad y portería.
- La pantalla de resumen muestra:
  - rating visible base,
  - bonus activo de entrenador,
  - rating de temporada,
  - rating que usará la simulación de carrera.
- `LeagueSimulatorView` usa el mismo módulo compartido para aplicar compresión de modo carrera y dificultad.
- Añade `npm run qa:team-power`.
- `npm run qa:tech-debt` incluye también la QA de poder de equipo.

## QA cubierta

- El `+0.5` sube todas las valoraciones visibles.
- El `+0.5` llega al rating simulado de carrera.
- Ataque, defensa, control, físico, mentalidad y portería llegan al poder simulado.
- La dificultad sigue modulando el poder efectivo.
- Los límites de rating siguen siendo seguros.

## Fuera de alcance

- No cambia balance base de Liga/Copa.
- No toca ratings históricos.
- No toca plantillas.
- No cambia reglas de recompensa ni ranking global.
