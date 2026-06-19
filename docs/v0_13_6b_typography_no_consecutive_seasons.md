# v0.13.6b — Tipografía y no repetición consecutiva de temporada

## Corrige

1. Revisa nombres problemáticos del bloque 2000s:
   - `Joaquín Caparrós`
   - `Mané`
   - `Expósito`
   - `Iñaki Saez`

2. Evita que el draft genere dos rondas consecutivas con la misma temporada exacta.

## Importante

No elimina la posibilidad de que una temporada vuelva a salir más adelante. Solo bloquea esto:

```text
Ronda 3: 2007/08
Ronda 4: 2007/08
```

Sí permite algo como:

```text
Ronda 3: 2007/08
Ronda 7: 2007/08
```

porque eso mantiene aleatoriedad sin dar sensación de bug.

## Archivos tocados

```text
src/App.tsx
src/data/athletic/seasons.ts
```

## Uso

```powershell
cd "D:\Proyectos\⚽ Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-13-6b-typography-no-consecutive-seasons.ps1
npm.cmd run build
npm.cmd run dev
```
