# v0.13.0b — Build fix plantillas posguerra

## Problema

El parche v0.13.0 insertó jugadores como objetos simples:

```ts
{ name, positions, overall, dataConfidence, tacticalSlotLabels }
```

Pero el tipo real `PlayerSeason` exige también:

```text
id
playerId
canonicalPlayerId
season
matches
minutes
goals
assists
skills
ratingMethod
sourceRefs
```

Por eso TypeScript generó `TS2740`.

## Solución

Este parche elimina el bloque 1939/40-1949/50 insertado y lo reinserta usando `makePlayer(...)`, igual que las plantillas existentes.

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-13-0b-postwar-playerseason-build-fix.ps1
npm.cmd run build
```

## Qué toca

```text
src/data/athletic/seasons.ts
```

## Qué no toca

```text
draft
positionRules
liga
copa
UI
seasonCatalog.ts
```
