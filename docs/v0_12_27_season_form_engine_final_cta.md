# v0.12.27 — Season Form Engine + CTA final visible

## Objetivo

Corregir la repetición de descensos en Liga y hacer más visible el botón para jugar otra temporada.

## Problema

La Liga repetía demasiado:

```text
Alavés
Oviedo
Osasuna
```

en el mismo orden.

La Copa ya variaba más, pero la Liga seguía con demasiada dependencia de ratings fijos, calendario estable y semillas repetibles.

## Cambios de Liga

Se añade un motor de forma de temporada:

```text
Nueva temporada -> nuevo leagueSeasonSalt
Cada equipo -> forma de temporada estable durante esa Liga
Nueva partida -> forma distinta
```

La forma de temporada cambia el rendimiento de cada rival durante esa temporada.

### Elasticidad por nivel

```text
Grandes -> variación pequeña
Zona alta -> variación media
Zona media -> variación mayor
Zona baja -> variación alta
```

Esto permite que:

```text
Oviedo pueda bajar muchas veces, pero no siempre.
Alavés pueda salvarse algunos años.
Osasuna no baje siempre.
Girona, Levante, Elche, Espanyol o Getafe también entren en riesgo.
```

## Cambios de pantalla final

Se añade un CTA principal visible:

```text
Jugar otra temporada
```

Aparece justo después del encabezado de final de temporada.

También se cambia el botón secundario de:

```text
Nueva partida
```

a:

```text
Jugar otra temporada
```

## Archivos modificados

```text
src/simulation/leagueSimulator.ts
src/components/FinalSummary.tsx
src/components/FinalSummary.css
```

## Restricciones respetadas

```text
No toca draft.
No toca reglas de posiciones.
No toca Copa.
No duplica helpers.
```

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-12-27-season-form-engine-final-cta.ps1
npm.cmd run build
npm.cmd run dev
```

## QA recomendado

Simula 10 temporadas y apunta:

```text
Liga 1 - Copa - Descendidos
Liga 2 - Copa - Descendidos
...
Liga 10 - Copa - Descendidos
```

Aprobado si:

```text
No bajan siempre Alavés, Oviedo y Osasuna en el mismo orden.
El botón “Jugar otra temporada” se ve nada más terminar la temporada.
```
