# v0.13.5e — Limpieza segura ASCII de ruleta

El v0.13.5d falló porque el `.ps1` contenía caracteres especiales corruptos y PowerShell rompió el parseo.

Esta versión evita caracteres problemáticos dentro del propio script.

## Corrige

- Badge limpio: `Temporada asignada`.
- Oculta cualquier icono residual (`span`, `svg`, `::before`).
- Botón limpio: `Empezar ronda X`.
- Corrige el separador corrupto mediante caracteres generados por código.
- Acelera ligeramente el remate visual.

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-13-5e-season-reveal-ascii-safe-cleanup.ps1
npm.cmd run build
npm.cmd run dev
```
