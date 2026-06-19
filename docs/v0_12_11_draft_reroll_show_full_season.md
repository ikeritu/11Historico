# v0.12.11 — Resorteo compatible mostrando plantilla completa

## Cambio

Antes:

```text
Falta MD.
Sale 1929/30 sin MD.
Se resortea 1934/35.
Solo aparecen jugadores compatibles con MD.
```

Ahora:

```text
Falta MD.
Sale 1929/30 sin MD.
Se resortea 1934/35.
Aparece toda la plantilla 1934/35.
```

Los jugadores que no encajan en el puesto restante seguirán apareciendo deshabilitados con el aviso normal:

```text
No encaja en ningún puesto libre.
```

## Motivo

Así se mantiene la sensación de que realmente ha salido otra temporada completa, no una lista filtrada artificial.

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\fix-v0-12-11-draft-reroll-show-full-season.ps1
npm.cmd run build
npm.cmd run dev
```
