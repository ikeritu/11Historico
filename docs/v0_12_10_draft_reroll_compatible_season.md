# v0.12.10 — Resorteo de temporada compatible

## Cambio de criterio

Antes, si faltaba un puesto como `MD` y salía una temporada sin jugadores compatibles, se abría todo el archivo histórico.

Ahora se hace lo que pediste:

```text
Falta MD.
Sale Athletic 1932/33.
No hay MD compatible.
Se sortea otra temporada hasta que salga una con MD compatible.
```

## Comportamiento

- Si la temporada sorteada tiene al menos un jugador compatible, se usa normalmente.
- Si no tiene ningún jugador compatible con los puestos libres, se resortea una temporada.
- La nueva temporada se elige entre las que sí tienen al menos un jugador compatible.
- Se mantiene el bloqueo de duplicados.
- Se muestra un aviso indicando temporada original y nueva temporada.

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\fix-v0-12-10-draft-reroll-compatible-season.ps1
npm.cmd run build
npm.cmd run dev
```
