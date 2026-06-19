# v0.14.2d — Copa segura + Ko-fi standalone

Versión corregida tras el fallo de `v0.14.2c`.

## Hace

```text
1. Rollback preventivo si leagueSimulator.ts sigue roto.
2. Copa segura:
   - pequeño en casa tiene opción de sorpresa
   - pequeño fuera baja mucho su probabilidad
   - rondas avanzadas reducen efecto cenicienta
3. Ko-fi integrado:
   - SupportButton.tsx
   - SupportButton.css
   - GameHome
   - FinalSummary
```

## Uso

```powershell
cd "D:\Proyectos\⚽ Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-14-2d-copa-safe-kofi-standalone.ps1
npm.cmd run build
```
