# v0.13.10b — Build fix CAD/CAI templates

El parche `v0.13.10` convirtió globalmente:

```text
CAD -> LD
CAI -> LI
```

Eso corrige jugadores, pero rompe el objeto `templates`, porque `PlayerPosition` todavía incluye `CAD` y `CAI`.

Este fix restaura `CAD` y `CAI` solo dentro de:

```ts
const templates: Record<PlayerPosition, PlayerSeason["skills"]>
```

## Uso

```powershell
cd "D:\Proyectos\⚽ Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-13-10b-restore-cad-cai-templates-build-fix.ps1
npm.cmd run build
powershell -ExecutionPolicy Bypass -File .\audit-v0-13-9d-historical-quality-cjs-fix-generated.ps1
```
