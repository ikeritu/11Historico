# v0.23.3a — Mobile Viewport Fix

## Objetivo

Corregir la deuda móvil señalada por la auditoría técnica: el uso extendido de `100vh` puede cortar contenido en navegadores móviles cuando aparecen o desaparecen las barras del navegador.

## Cambios

- Mantiene cada regla `100vh` como fallback clásico.
- Añade inmediatamente después la regla equivalente con `100dvh`.
- Cubre también `calc(100vh - ...)` con `calc(100dvh - ...)`.
- Añade `scripts/qaMobileViewportFix.ts`.
- Añade `qa:mobile-viewport` a `package.json`.
- Integra la QA móvil en `qa:tech-debt`.
- Añade la QA móvil al workflow de GitHub Pages antes del build.
- Actualiza versionado visible a `v0.23.3a` y package a `0.23.3-a.0`.

## Alcance protegido

No se modifica gameplay, motor de simulación, probabilidades de la ruleta, rating histórico, plantillas base, palmarés, ranking global ni Europa Career.

## QA esperada

```bash
npm run qa:version
npm run qa:tech-health-baseline
npm run qa:mobile-viewport
npm run qa:tech-debt
npm run build
```

## Estado

Preparado para aplicar en Windows, validar, commitear, taggear y subir como `v0.23.3a_MOBILE_VIEWPORT_FIX`.
