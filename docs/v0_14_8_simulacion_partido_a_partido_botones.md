# v0.14.8 — Simulación partido a partido y nuevos botones

Base: `v0.14.7_VALIDADO_BASE_LIMPIA`.

## Cambios

- La pantalla de simulación de temporada incorpora un modo de avance automático partido a partido.
- El botón principal de simulación automática cambia dinámicamente:
  - `Simular partido a partido`
  - `Parar simulación`
- Se mantiene el botón manual `Simular siguiente partido`.
- Se añade `Saltar hasta próximo evento` para mantener el avance instantáneo que ya existía.
- La simulación automática se detiene sola si:
  - aparece una eliminatoria de Copa del Rey pendiente,
  - termina la Liga,
  - termina la temporada,
  - no queda partido simulable.
- Se añade indicador visual de progreso `x/38` en la cabecera y últimos resultados.

## No tocado

- No se cambia el motor de resultados.
- No se cambian ratings.
- No se cambia el balance de Liga/Copa.
- No se cambia la lógica de modos Fácil/Normal/Leyenda.

## Validación

- `npm run build` OK.
