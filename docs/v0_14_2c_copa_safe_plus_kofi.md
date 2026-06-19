# v0.14.2c — Copa segura + Ko-fi integrado

Rehace `v0.14.2` de forma más segura e incluye Ko-fi.

## Incluye

```text
1. Rollback preventivo si leagueSimulator.ts quedó roto por v0.14.2.
2. Ajuste de Copa por localía:
   - pequeño en casa: opción real de sorpresa
   - pequeño fuera: sorpresa más difícil
   - rondas avanzadas: menor efecto cenicienta
3. Botón Ko-fi integrado:
   - SupportButton.tsx
   - SupportButton.css
   - pantalla inicial
   - resumen final si encuentra final-actions
```

## No toca

```text
plantillas
ratings históricos
draft v0.14.1
Liga
```

## Uso

```powershell
cd "D:\Proyectos\⚽ Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-14-2c-copa-safe-plus-kofi.ps1
npm.cmd run build
```
