# v0.24.4b — European Balance QA

## Objetivo

Auditar que la campaña europea y, en particular, el bonus de prestigio introducido en [v0.24.4a](./v0_24_4a_EUROPEAN_REWARDS_PRESTIGE.md) no rompan el balance del juego. Esta fase no añade mecánica nueva: es una QA de balance dedicada a los dos riesgos concretos que introdujo la fase anterior.

## Riesgos auditados

1. **Que el bonus de prestigio se acumule temporada tras temporada.** El bonus se aplica una vez (`handleStartLeagueSimulation`) y se resetea a 0 inmediatamente después; si ese reset fallara, ganar la Champions varias temporadas seguidas podría inflar el rating del usuario sin límite.
2. **Que, incluso aplicado correctamente, el bonus máximo (+1.0) deje las competiciones europeas triviales** o supere el techo de rating de 100 ya establecido (`applyCareerRatingBonus`/`clampRating`).

## Cambios incluidos

- Nuevo `scripts/qaEuropeanBalance.ts`, registrado en `qa:tech-debt` y en GitHub Actions.
- No se toca ningún archivo de producción: es una fase de QA pura sobre la mecánica ya existente.

## Qué valida la QA

- El bonus de campeón mantiene el orden Champions (+1.0) > Europa League (+0.75) > Conference (+0.5), y todos superan el bonus de finalista (+0.25).
- Ganar la Champions 4 temporadas seguidas, reseteando el bonus entre temporadas (como hace `handleStartLeagueSimulation`), nunca hace crecer el bonus por encima de +1.0 en ninguna de ellas.
- Aunque el bonus previo no se reseteara (caso defensivo), `awardEuropeanPrestigeToCareer` usa `Math.max`, así que nunca se supera el techo por competición.
- Aplicar el bonus máximo de prestigio (+1.0) a un equipo ya cerca del techo de rating (99.5) nunca lo deja por encima de 100.
- Con un equipo al techo de rating (100) contra el rival más fuerte posible de Champions (94), la victoria sigue sin ser automática (no 100%) ni imposible (>0 victorias en muestra de 50).
- Las tres competiciones europeas mantienen su orden de dificultad esperado (Conference ≥ Europa League ≥ Champions en tasa de victorias, misma diferencia de rating relativa).
- El bonus de temporada (prestigio u otras recompensas, como renovar entrenador) solo se combina con `Math.max`, nunca se suma.
- El módulo de prestigio europeo no toca el simulador de Liga, el ranking global ni la Ruleta de la Suerte.

## Fuera de alcance

- No repite las comprobaciones de forma/goles de `qaEuropeanMatchEngine.ts` (resultado siempre win/draw/loss, influencia de rating/localía): esas ya están cubiertas.
- No audita el balance histórico de Liga/Copa (eso lo cubre `audit:balance`/`audit:balance:100`, sin cambios en esta fase).
- Ranking global backend, ranking local, Ruleta de la Suerte, Supercopa.
- `dist`.

## QA

`npm run qa:european-balance` ejecuta las 9 comprobaciones anteriores. Se añade a `qa:tech-debt` y a `.github/workflows/deploy.yml`.
