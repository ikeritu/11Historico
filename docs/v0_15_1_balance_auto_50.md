# v0.15.1 — Auditoría automática de balance 50 sims

## Objetivo

Evitar que el usuario tenga que lanzar manualmente la auditoría de balance Liga/Copa.

## Cambios

- La auditoría de balance se ejecuta automáticamente al entrar en la pantalla de simulación.
- Por defecto lanza 50 temporadas completas con el once seleccionado.
- Los botones 10/25/50 se mantienen solo para repetir la auditoría si se desea.
- El texto del panel se actualiza para explicar que no hay que simular una a una.
- No se toca el motor deportivo, ratings, draft, modos ni parámetros de Copa/Liga.

## Validación

- `npm run build`: OK.
