# v0.24.5b — Backend Ranking Migration

## Objetivo

Migrar el almacenamiento del backend de ranking global (`apps-script/globalRankingBackend.gs`) para que el desglose de títulos europeos/nacionales sea consultable directamente en Google Sheets (filtrar, ordenar, sumar por columna) sin tener que parsear el JSON de `trophyCounts` a mano.

Esta fase completa lo que [v0.24.5a](./v0_24_5a_GLOBAL_RANKING_EUROPA_FIELDS.md) dejó explícitamente fuera de alcance: tocar el backend real. Sigue siendo, no obstante, una migración mínima y aditiva: no cambia la fórmula de puntuación ni el formato que recibe o envía el cliente.

## Qué cambia

- `HEADERS` gana 6 columnas nuevas **al final** (para no desplazar los índices que ya usan `TEXT_COLUMNS` ni ningún cliente): `championsTitles`, `ligaTitles`, `europaLeagueTitles`, `copaTitles`, `conferenceTitles`, `supercopaTitles`.
- `toRow_` escribe esas 6 columnas a partir del mismo `entry.trophyCounts` que ya se guardaba (vía el nuevo helper `trophyCountsToColumns_`). La columna `trophyCounts` (JSON) sigue escribiéndose exactamente igual que antes: es la fuente de verdad; las columnas nuevas son una vista derivada para la hoja.
- Nueva función `migrateExistingTrophyColumns_()`: migración de un solo uso que rellena esas 6 columnas para las filas ya existentes, leyendo su `trophyCounts` (JSON) tal cual. No toca ninguna otra columna.

## Qué NO cambia (explícitamente fuera de alcance)

- **El formato que recibe/envía el cliente.** `rowToEntry_` (lo que construye la respuesta JSON del `doGet`) no lee ni expone las columnas nuevas. `CareerGlobalRankingEntry`/`CareerGlobalRankingSubmitPayload` en `src/types/career.ts` no cambian. El cliente sigue mandando y recibiendo `trophyCounts` exactamente igual que antes de esta fase.
- **La fórmula de puntuación.** `PALMARES_POINTS` y `computeScores_` no se tocan: esto es una migración de almacenamiento, no un cambio de balance ni de reglas de ranking (ver `AGENTS.md`: los cambios de fórmulas de ranking necesitan autorización explícita de fase, y esta fase solo autoriza migración de columnas).
- Ranking local, Ruleta de la Suerte, Liga, Copa, Supercopa.
- `dist`.

## Paso manual requerido (importante)

Este repositorio no puede desplegar Apps Script por sí mismo: no hay credenciales de Google Apps Script en este entorno. Tras fusionar esta fase, el propio usuario debe, **a mano**, desde el editor de Apps Script de su hoja de ranking:

1. Copiar el contenido actualizado de `apps-script/globalRankingBackend.gs` al proyecto de Apps Script ya desplegado.
2. Volver a desplegar la Web app (o crear una nueva versión del despliegue existente) para que `doGet`/`doPost` usen el código nuevo.
3. Ejecutar una vez, a mano, la función `migrateExistingTrophyColumns_()` desde el propio editor de Apps Script, para rellenar las columnas nuevas en las filas ya existentes. Las filas nuevas se rellenan solas a partir de este despliegue; no hace falta repetir el paso para ellas.

Sin este paso manual, el código en el repositorio no tiene ningún efecto sobre el backend real: es imprescindible que el usuario lo ejecute.

## QA

`scripts/qaGlobalRankingBackendMigration.ts` valida (por texto, ya que Apps Script no se puede ejecutar con Node/Vite):

- Las 6 columnas nuevas se añaden al final de `HEADERS`, sin desplazar las existentes.
- Los índices de `TEXT_COLUMNS` no cambian.
- La columna `trophyCounts` (JSON) se sigue escribiendo igual que antes; las columnas nuevas se derivan del mismo dato.
- `rowToEntry_` (lo que llega al cliente) no expone las columnas nuevas: el formato de red no cambia.
- `migrateExistingTrophyColumns_` existe, lee de `trophyCounts` y escribe solo en las columnas nuevas.
- `PALMARES_POINTS`/`computeScores_` no se tocan.
- La documentación explica el paso manual de despliegue y migración.
- Registro en `package.json` (`qa:tech-debt`) y en `.github/workflows/deploy.yml`.
