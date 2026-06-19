# v0.13.5c — Limpieza de ruleta

Corrige el remate visual de la ruleta tras la prueba en pantalla.

## Cambios

- Elimina el icono verde extraño antes de `Temporada asignada`.
- Corrige el mojibake del botón: `Â·`.
- Usa texto ASCII seguro: `Temporada asignada - Empezar ronda`.
- Acelera ligeramente el remate visual.
- Mantiene la ruleta base.

## Archivos tocados

```text
src/components/SeasonReveal.tsx
src/components/SeasonReveal.css
```

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-13-5c-season-reveal-typo-speed-cleanup.ps1
npm.cmd run build
npm.cmd run dev
```
