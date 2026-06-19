# Futbol11 v0.10 — Expansión histórica Athletic

## Objetivo

Preparar el proyecto para soportar todas las temporadas del Athletic desde 1928/29 sin convertir `athleticSeasons.ts` en un archivo inmanejable.

## Nueva estructura

```text
src/data/athletic/
  index.ts
  seasons.ts
  seasonCatalog.ts
```

## Qué cambia

- `src/data/athletic/seasons.ts` contiene las 10 plantillas jugables actuales.
- `src/data/athletic/seasonCatalog.ts` contiene el catálogo maestro de temporadas desde 1928/29 hasta 2025/26.
- `src/data/athleticSeasons.ts` queda como archivo de compatibilidad para que no se rompan imports existentes.

## Estado del catálogo

```text
Temporadas catalogadas: 95
Temporadas jugables actuales: 10
Temporadas pendientes: 85
```

## Próximo paso

Añadir las plantillas por bloques históricos:

```text
Bloque 1: 1928/29 - 1935/36
Bloque 2: 1939/40 - 1949/50
Bloque 3: 1950/51 - 1959/60
Bloque 4: 1960/61 - 1969/70
Bloque 5: 1970/71 - 1979/80
Bloque 6: 1980/81 - 1989/90
Bloque 7: 1990/91 - 1999/00
Bloque 8: 2000/01 - 2009/10
Bloque 9: 2010/11 - 2019/20
Bloque 10: 2020/21 - 2025/26
```

## Regla de datos

Cada jugador futuro debe tener:

```text
canonicalPlayerId
name
season
positions
overall
skills
ratingMethod
sourceRefs
dataConfidence
```

## Regla anti-duplicados

El draft debe bloquear por:

```text
1. canonicalPlayerId
2. nombre normalizado como fallback
```
