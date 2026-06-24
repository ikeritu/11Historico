# v0.21.0k — Career preview cleanup

## Objetivo

Eliminar la salida lateral a partida rápida desde la pantalla informativa del modo carrera.

## Cambios

- La pantalla de modo carrera mantiene solo dos acciones: empezar carrera y volver.
- Se elimina el botón “Jugar partida rápida” de esa pantalla para evitar confusión de flujo.
- No se toca la simulación, el calendario dinámico, la bolsa de ascensos/descensos ni el rating efectivo.

## Validación

- `npm run build` OK.
