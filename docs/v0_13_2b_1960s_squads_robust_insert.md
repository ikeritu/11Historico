# v0.13.2 — Década 1960/61-1969/70

Añade 10 plantillas jugables de la década de los 60.

## Criterio

- 1960/61-1963/64: transición desde la vieja guardia.
- 1964/65-1967/68: consolidación de Iribar y nuevo bloque.
- 1968/69: temporada reforzada por título de Copa.
- 1969/70: continuidad competitiva.

## Nota

Base jugable provisional. Los ratings están calibrados por contexto, peso histórico y lógica jugable. La fase posterior debe refinar con estadísticas oficiales cuando existan.

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-13-2-1960s-squads.ps1
npm.cmd run build
npm.cmd run dev
```


## v0.13.2b

Este fix usa una inserción más robusta. El parche anterior buscaba el texto exacto:

```text
]; + export function getAthleticSeasonById
```

En la versión local ese marcador no existe, aunque el archivo compila. Esta variante inserta las plantillas antes del último cierre `];` del archivo `seasons.ts`.
