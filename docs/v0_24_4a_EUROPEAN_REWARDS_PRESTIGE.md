# v0.24.4a — European Rewards / Prestige

## Objetivo

Recompensar de forma moderada y respetuosa con el balance el rendimiento europeo (Champions, Europa League, Conference), integrado en el flujo de transición entre temporadas, sin poder reclamarse dos veces por la misma campaña.

Esta fase es prestigio y forma para la próxima temporada, no palmarés: los títulos europeos ya se suman al palmarés desde `europeanTrophies.ts` ([v0.24.3b](./v0_24_3b_EUROPEAN_TROPHIES_PALMARES.md)); esta fase añade únicamente un bonus de rating puntual y un texto narrativo.

## Reglas de recompensa

| Resultado europeo | Bonus de forma (siguiente temporada) | Título al palmarés |
| --- | --- | --- |
| Campeón de Champions League | +1.0 | Sí (v0.24.3b) |
| Campeón de Europa League | +0.75 | Sí (v0.24.3b) |
| Campeón de Conference League | +0.5 | Sí (v0.24.3b) |
| Finalista (final perdida) | +0.25 | No |
| Eliminado en semifinales | Sin bonus, solo narrativa | No |
| Eliminado en fase inicial | Sin bonus, solo narrativa | No |

El bonus se combina con cualquier otro bonus de rating pendiente (por ejemplo el de renovar entrenador tras ganar Liga/Copa) mediante `Math.max`, nunca se suma: nunca hay stacking de bonus de temporada.

## Cambios incluidos

- Nuevo módulo `src/career/europeanPrestige.ts`:
  - `getEuropeanPrestigeTier` distingue campeón / finalista / semifinal / fase inicial mirando si el torneo llegó a disputar una final o una semifinal (perder la final y perder la semifinal dejan el mismo `completed && !champion`, así que la distinción real es por fase alcanzada, no por esos dos campos).
  - `buildEuropeanPrestigeReward` construye el bonus numérico y el texto narrativo según el tier.
  - `awardEuropeanPrestigeToCareer` aplica el guardarraíl anti-duplicado y combina el bonus con `Math.max`.
- Nuevo estado opcional de torneo europeo:
  - `europeanPrestigeAwarded`
  - `europeanPrestigeAwardedAt`
- `src/europe/europeanCareerState.ts`: `normalizeEuropeanTournament` ahora conserva `europeanTrophyAwarded`/`europeanTrophyAwardedAt`/`europeanPrestigeAwarded`/`europeanPrestigeAwardedAt` al recargar una partida guardada (antes se perdían, lo que podía permitir reclamar dos veces un título o un prestigio tras recargar en el momento exacto entre ganar la final y pasar de temporada).
- `App.tsx`: `handleContinueCareerAfterSeason` encadena `awardEuropeanPrestigeToCareer` sobre el mismo torneo que ya integró el título al palmarés (para que ambas marcas de "ya otorgado" queden en el mismo objeto), aplica el bonus resultante a `careerSeasonRatingBonus` y guarda la recompensa en un nuevo estado `careerEuropeanPrestigeReward` para mostrarla una vez en la pantalla entre temporadas.
- `src/components/CareerInterseasonReward.tsx`: nuevo bloque "Prestigio europeo" que muestra el bonus (si lo hay) y el texto narrativo.
- Persistencia: `careerEuropeanPrestigeReward` se guarda y restaura en `localGameStorage.ts`, igual que el resto del estado de recompensa entre temporadas.
- QA `qa:european-rewards-prestige`, añadida a `qa:tech-debt` y a GitHub Actions.

## Guardarraíl anti-duplicado

Igual que en v0.24.3b, el torneo se marca tras otorgar el prestigio:

```ts
europeanPrestigeAwarded: true
```

Un torneo con esta marca no puede volver a generar bonus ni narrativa, aunque se recalcule sobre el mismo objeto (por ejemplo si `handleContinueCareerAfterSeason` se re-invocara sobre el mismo estado).

## Fuera de alcance

Esta fase no modifica:

- Ranking global backend.
- Ranking local (más allá de que el título europeo ya contaba desde v0.24.3b).
- Ruleta de la Suerte.
- Liga, Copa o Supercopa.
- Cambio de formación desbloqueado por título nacional (mecanismo existente, sin tocar).
- Balance europeo (calendario, rivales, dificultad).
- `dist`.

## QA

`scripts/qaEuropeanRewardsPrestige.ts` valida:

- Campeón de Champions/Europa League/Conference genera el bonus correcto (+1.0 / +0.75 / +0.5).
- Perder la final da recompensa menor (+0.25) sin sumar título al palmarés.
- Perder en semifinales da solo narrativa, sin bonus, sin título.
- Eliminación en fase inicial da solo narrativa, sin bonus, sin título.
- El prestigio no puede reclamarse dos veces sobre el mismo torneo.
- El bonus nunca se acumula: siempre usa el techo `Math.max`.
- Liga, Copa y Supercopa quedan intactas.
- La detección de tier distingue correctamente cada fase de salida europea.
- Ranking global y Ruleta de la Suerte quedan fuera de alcance (no referenciados por el nuevo módulo).
- `App.tsx` conecta el prestigio en la transición de temporada.
- La pantalla entre temporadas muestra el bloque de prestigio.
- La recompensa de prestigio sobrevive a recargar la partida guardada.
- Recargar una partida no borra las marcas de título/prestigio ya otorgados.
- Registro en `package.json` (`qa:tech-debt`) y en `.github/workflows/deploy.yml`.
