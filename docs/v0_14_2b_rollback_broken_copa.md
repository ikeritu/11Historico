# v0.14.2b — Rollback seguro del parche Copa v0.14.2

El parche `v0.14.2` rompió `leagueSimulator.ts`. Este rollback restaura solo ese archivo desde el backup automático creado antes de aplicar v0.14.2.

## Qué restaura

```text
src/simulation/leagueSimulator.ts
```

Desde:

```text
backup_before_v0_14_2_*/leagueSimulator.ts
```

## Qué no toca

```text
App.tsx
v0.14.1 draft sin repetición
botón Ko-fi si se aplicó después
plantillas
ratings
```

## Uso

```powershell
cd "D:\Proyectos\⚽ Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-14-2b-rollback-broken-copa.ps1
npm.cmd run build
```

Después conviene rehacer `v0.14.2` de forma más quirúrgica, con el archivo `leagueSimulator.ts` real delante.
