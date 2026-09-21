# v0.24.3a — European Knockouts

## Objetivo

Mejorar la experiencia de semifinal y final europea para que las eliminatorias se entiendan como partidos únicos, con consecuencias claras y mayor jerarquía visual.

## Alcance incluido

- Mejora de los textos de estado del torneo europeo.
- Nuevo bloque narrativo de eliminatoria en `EuropeanMatchEvent`.
- Diferenciación visual de semifinal y final.
- Explicación explícita de qué ocurre si se gana o se pierde una semifinal.
- Explicación explícita de qué ocurre si se gana o se pierde una final.
- Estado de eliminatoria visible en `EuropeanProgressPanel`.
- Nuevos helpers puros en `europeanTournament.ts`:
  - `isEuropeanKnockoutPhase`
  - `getEuropeanKnockoutStageText`
  - `getEuropeanKnockoutStakesText`
- QA específica `qa:european-knockouts`.

## Reglas preservadas

- Fase inicial de 6 partidos.
- 10+ puntos clasifican a semifinal.
- Menos de 10 puntos eliminan.
- Semifinal a partido único.
- Final a partido único.
- Ganar semifinal crea una final única.
- Perder semifinal elimina.
- Ganar final marca `champion: true` y `completed: true`.
- Perder final marca `champion: false` y `completed: true`.

## Fuera de alcance

- No se añaden títulos europeos al palmarés.
- No se modifica `CareerTrophyCounts`.
- No se modifica el ranking global.
- No se modifica la Ruleta de la Suerte.
- No se cambian Liga, Copa ni Supercopa.
- No se añade backend ni migración.
- No se implementan eliminatorias ida/vuelta.

## Validación

La fase añade `scripts/qaEuropeanKnockouts.ts`, que comprueba:

- Clasificación a semifinal con 10 puntos.
- Eliminación con menos de 10 puntos.
- Semifinal ganada genera una única final.
- Semifinal perdida elimina sin crear final.
- Final ganada completa el torneo con `champion: true`.
- Final perdida completa el torneo con `champion: false`.
- Los textos de campeón europeo no afirman que el título ya esté integrado en palmarés.
- `EuropeanMatchEvent` y `EuropeanProgressPanel` muestran estados de semifinal/final/eliminado/finalista/campeón.
- `package.json` y GitHub Actions registran `qa:european-knockouts`.

## Nota de producto

Esta fase deja la experiencia europea más clara y atractiva, pero mantiene el título europeo como estado interno del torneo. La integración real en palmarés queda reservada para `v0.24.3b — European Trophies + Palmarés`.
