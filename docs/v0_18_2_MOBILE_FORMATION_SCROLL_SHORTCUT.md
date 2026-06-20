# v0.18.2 — Mobile formation scroll shortcut

## Objetivo

Mejorar el flujo móvil del draft después de `v0.18.1_MOBILE_DRAFT_LAYOUT_FIX`.

## Cambio aplicado

- El resumen móvil del draft (`formación · jugadores elegidos · temporada`) pasa a ser un atajo táctil.
- Al tocar la formación, la pantalla baja suavemente hasta el campo del once.
- Se añade texto auxiliar `Ver campo ↓` en móvil.
- Se añade `scroll-margin-top` para que el campo no quede tapado por la barra superior.

## Alcance

No se modifican:

- Balance de Liga.
- Copa del Rey.
- Ratings.
- Lógica deportiva.
- Draft ni compatibilidad de posiciones.
- Simulación.
- GitHub Pages workflow.

## Archivos principales

- `src/components/PlayerRound.tsx`
- `src/components/PlayerRound.css`
- `src/config/appVersion.ts`
- `package.json`
- `package-lock.json`
