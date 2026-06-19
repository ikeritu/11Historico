# v0.12.13 — Más alineaciones reales

## Añadidas

- 3-4-3
- 5-4-1
- 3-6-1
- 3-3-4
- 4-2-4
- 4-6-0
- 5-2-3

## Criterio

Se añaden como sistemas jugables reales, pero manteniendo el equilibrio:

- Los sistemas ofensivos tienen más ataque, pero más riesgo.
- Los sistemas defensivos tienen más defensa, pero menos ataque/control.
- El 4-6-0 permite jugar sin delantero puro.
- El 3-3-4 y 4-2-4 son sistemas extremos para partidas más locas.

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-12-13-extra-formations.ps1
npm.cmd run build
npm.cmd run dev
```
