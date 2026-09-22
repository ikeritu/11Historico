# v0.24.5a — Global Ranking Europa Fields

## Objetivo

Exponer en la UI de ranking (local y global) el desglose de títulos europeos por competición (Champions League / Europa League / Conference League), que ya viajaba dentro de `trophyCounts` en cada entrada de ranking pero no se mostraba en ninguna tabla de forma diferenciada.

Fase puramente de cliente, sin tocar `apps-script/globalRankingBackend.gs` ni el formato del payload enviado al backend: eso queda explícitamente para **v0.24.5b — Backend Ranking Migration**.

## Diagnóstico previo

- `CareerLocalRankingEntry` y `CareerGlobalRankingSubmitPayload`/`CareerGlobalRankingEntry` (`src/types/career.ts`) ya incluyen `trophyCounts: CareerTrophyCounts`, con `champions`/`europaLeague`/`conference` como contadores independientes.
- Ese `trophyCounts` ya viaja íntegro al backend (`globalRankingService.ts`) y ya se recibe de vuelta al cargar el ranking global (con validación explícita de que el campo exista).
- `CareerLocalRanking.tsx` ya mostraba un total europeo agregado ("Europa N"), pero sumando los tres contadores a mano en cada render, sin desglose por competición.
- `CareerGlobalRanking.tsx` no mostraba absolutamente nada sobre Europa.

Es decir: los datos ya existían de punta a punta (cliente → backend → cliente); el hueco era puramente de presentación.

## Cambios incluidos

- `src/career/careerRanking.ts`: nuevas funciones puras `getEuropeanTrophyBreakdown` y `formatEuropeanTrophyBreakdownLabel`, fuente única de verdad para calcular el desglose/etiqueta europea a partir de `CareerTrophyCounts`.
- `src/components/CareerLocalRanking.tsx`: el total europeo de la columna "Palmarés" ahora usa el helper compartido (en vez de sumar a mano); nueva columna dedicada "Europa" con el desglose por competición.
- `src/components/CareerGlobalRanking.tsx`: nueva columna "Europa" con el mismo desglose, alineando el ranking global con el local.
- QA `qa:global-ranking-europa-fields`, añadida a `qa:tech-debt` y a GitHub Actions.

## Fuera de alcance

- `apps-script/globalRankingBackend.gs` (sin tocar).
- Formato del payload de envío/recepción del ranking global (sigue enviando `trophyCounts` tal cual, sin campos nuevos).
- Ranking local (estructura de almacenamiento sin cambios).
- Ruleta de la Suerte, Liga, Copa, Supercopa.
- `dist`.

## QA

`scripts/qaGlobalRankingEuropaFields.ts` valida:

- El desglose calcula correctamente cada competición y el total, ignorando Liga/Copa/Supercopa.
- La etiqueta omite competiciones en 0 y muestra un texto explícito ("Sin títulos europeos") cuando no hay ninguno.
- El ranking local usa el helper compartido (ya no suma los tres contadores a mano) y tiene columna de Europa.
- El ranking global muestra el desglose europeo y lee `trophyCounts` de cada entrada.
- No se añade ningún campo nuevo al payload (`trophyCounts` viaja igual que antes).
- `apps-script/globalRankingBackend.gs` queda intacto.
- Registro en `package.json` (`qa:tech-debt`) y en `.github/workflows/deploy.yml`.
