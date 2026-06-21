# v0.18.5 — Scroll reset on phase change

## Objetivo

Corregir un problema de experiencia móvil: al cambiar de fase, por ejemplo del draft a entrenador o del entrenador al resumen, la pantalla podía conservar el scroll anterior y abrir la nueva fase a media altura.

## Cambios

- Se añade reseteo automático de scroll al cambiar de pantalla/fase principal.
- Cada fase nueva empieza arriba, debajo de la barra de progreso.
- Mejora especialmente en móvil al pasar por:
  - selección de jugadores,
  - entrenador,
  - resumen,
  - simulación,
  - resultado final.

## No se toca

- Motor de Liga.
- Copa.
- Balance.
- Ratings.
- Draft.
- Bonus de entrenador.
- Simulación.

## Validación

- `npm install`
- `npm run build`
