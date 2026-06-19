# v0.13.5d — Limpieza fuerte de ruleta

El parche anterior no cazó el patrón real. Este hace una limpieza más agresiva.

## Cambios

- Reemplaza cualquier contenido de `.season-assigned-badge` por texto plano:
  `Temporada asignada`
- Oculta por CSS cualquier `span`, `svg` o `::before` que quedase dentro del badge.
- El botón vuelve a texto limpio:
  `Empezar ronda X`
- Elimina `Â·`.
- Acelera timeouts habituales y animaciones del remate.

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-13-5d-season-reveal-hard-cleanup.ps1
npm.cmd run build
npm.cmd run dev
```
