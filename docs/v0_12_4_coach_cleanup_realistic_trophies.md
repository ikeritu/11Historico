# v0.12.4 — Coach cleanup + trofeos SVG realistas

## Cambios

- Oculta el texto de estado en entrenador:
  - "Entrenadores asignados"
  - "Elige uno de los tres técnicos finales."
- Sustituye los trofeos CSS genéricos por SVGs propios más realistas.
- Liga, Copa del Rey y Champions se han redibujado con siluetas más cercanas a las referencias.
- Europa League, Conference y Supercopa también tienen diseños diferenciados.
- Se mantienen contadores x0/x1 y soporte para futuro modo carrera.

## Archivos

- `src/components/CoachRound_extra.css`
- `src/components/PalmaresTrophyCase.tsx`
- `src/components/PalmaresTrophyCase.css`

## Aplicación

Pegar el contenido de `CoachRound_extra.css` al final de `src/components/CoachRound.css`.
