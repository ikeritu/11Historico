# v0.24.3b — European Trophies + Palmarés

## Objetivo

Preparar la integración segura de títulos europeos en el palmarés de carrera sin tocar todavía ranking global ni recompensas de prestigio.

La fase cubre el mapeo de campeonatos europeos ganados a `CareerTrophyCounts`:

- `champions_league` → `champions`
- `europa_league` → `europaLeague`
- `conference_league` → `conference`

## Cambios incluidos

- Nuevo módulo `src/career/europeanTrophies.ts`.
- Nuevo estado opcional de torneo europeo:
  - `europeanTrophyAwarded`
  - `europeanTrophyAwardedAt`
- Helper anti-duplicado `awardEuropeanTrophyToCareer`.
- `careerRanking.ts` acepta un `EuropeanTournamentState` opcional para calcular el palmarés final con Europa.
- QA `qa:european-trophies-palmares`.
- GitHub Actions ejecuta la nueva QA en PR.

## Reglas de integración

Un torneo europeo solo puede sumar título si cumple todo esto:

1. `completed === true`
2. `champion === true`
3. `europeanTrophyAwarded !== true`

Perder la final, caer en semifinales o tener una final no completada no suma título.

## Guardarraíl anti-duplicado

Cuando se integra un título europeo, el torneo debe marcarse con:

```ts
europeanTrophyAwarded: true
```

Así se evita sumar el mismo título dos veces al recargar partida o volver a pasar por el mismo flujo.

## Fuera de alcance

Esta fase no modifica:

- Ranking global backend.
- Ruleta de la Suerte.
- Liga, Copa o Supercopa.
- Recompensas de prestigio europeo.
- Balance europeo.
- `dist`.

## QA

La fase añade `scripts/qaEuropeanTrophiesPalmares.ts`, que valida:

- Mapeo correcto competición europea → contador de palmarés.
- Solo campeón europeo completado suma título.
- Perder final no suma título.
- Final no completada no suma título.
- Champions, Europa League y Conference suman su contador correcto.
- El guardarraíl `europeanTrophyAwarded` evita duplicados.
- Los helpers de ranking local pueden incluir títulos europeos.
- No se toca ranking global ni Ruleta.
