# v0.12.25 — Varianza de temporada y Copa

## Problema detectado

El usuario reporta dos patrones repetidos:

```text
Villarreal gana siempre o casi siempre la Copa.
Alaves, Osasuna y Oviedo descienden siempre o casi siempre.
```

## Diagnóstico

Eso indica que la simulación está demasiado determinista o que la varianza actual no afecta lo suficiente a:

- equipos de zona baja
- eliminatorias de Copa
- rendimiento por temporada

## Cambio

Este parche añade:

```text
1. Sal aleatoria de simulación por sesión.
2. Varianza de temporada por equipo.
3. Mayor varianza para equipos de zona baja.
4. Caos copero controlado por ronda.
```

## Objetivo

No se busca hacer la simulación absurda, sino evitar patrones fijos.

Resultado esperado tras simular varias temporadas:

```text
Villarreal puede ganar Copa, pero no siempre.
Alaves, Osasuna y Oviedo pueden descender, pero no siempre juntos.
Algunos anos debe salvarse alguno de ellos.
```

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-12-25-season-randomness-and-relegation-variance.ps1
npm.cmd run build
npm.cmd run dev
```

## Prueba QA recomendada

Simula 5 temporadas completas y apunta:

```text
Campeon de Liga
Campeon de Copa
Descendidos
Posicion de Alaves
Posicion de Osasuna
Posicion de Oviedo
```

Criterio de aprobado:

```text
No debe repetirse siempre el mismo campeon de Copa.
No deben descender siempre los mismos tres equipos.
```
