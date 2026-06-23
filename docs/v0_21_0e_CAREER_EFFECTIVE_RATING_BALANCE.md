# v0.21.0e — Career effective rating balance

## Objetivo

Probar una capa de dificultad específica de modo carrera sin tocar las medias históricas visibles de los jugadores ni el balance base de partida rápida.

## Regla aplicada

En modo carrera, antes de simular Liga/Copa, cada rating colectivo superior a 80 se comprime así:

```text
rating efectivo = 80 + (rating visible - 80) * 0.55
```

Ejemplos:

```text
80 -> 80
85 -> 83
90 -> 86
95 -> 88
```

## Alcance

- Solo afecta a `LeagueSimulatorView` cuando `isCareerMode=true`.
- No cambia ratings de jugadores en `seasons.ts`.
- No cambia el resumen visual del equipo.
- No cambia partida rápida.
- No cambia motor base de Liga/Copa fuera de carrera.

## Motivo

El usuario probó dos temporadas de carrera y ganó Liga + Copa dos años seguidos. La hipótesis es que el once histórico visible puede ser muy alto, pero en carrera debe existir una media efectiva más competitiva para evitar que el modo se vuelva trivial.

## Validación mínima

- Build OK.
- La web muestra `v0.21.0e`.
- Partida rápida sigue usando rating sin compresión.
- Modo carrera aplica compresión efectiva al simular.
- Revisar varias temporadas para ver si baja la frecuencia de dobletes.
