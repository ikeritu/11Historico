# Fix v0.12.25 — limpiar helpers duplicados

## Problema

Tras aplicar `v0.12.25`, el build falla con muchos errores:

```text
TS2393: Duplicate function implementation
normalizeSimulationName
getTeamSeasonVariance
applyTeamSeasonVariance
getCupChaosMultiplier
applyCupChaos
```

## Causa

El parche de varianza insertó los helpers muchas veces dentro de `leagueSimulator.ts`.

## Solución

Este fix elimina todos esos bloques duplicados y devuelve `leagueSimulator.ts` a un estado compilable.

## Importante

Este fix revierte la parte de varianza de la v0.12.25. Es decir:

```text
Primero recuperamos build estable.
Después ajustaremos Copa/descensos de forma más quirúrgica.
```

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\fix-v0-12-25-rollback-duplicate-simulation-helpers.ps1
npm.cmd run build
```

El script crea backup:

```text
src\simulation\leagueSimulator.ts.backup_before_v0_12_25_cleanup
```

## Siguiente paso

Si el build pasa, no volver a aplicar el parche v0.12.25 anterior.

Para corregir Villarreal/Copa/descensos, conviene subir o pegar el `leagueSimulator.ts` actual y ajustar directamente las funciones reales de simulación.
