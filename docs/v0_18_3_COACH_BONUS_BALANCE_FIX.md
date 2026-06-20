# v0.18.3 — Coach bonus balance fix

## Objetivo

Corregir el bonus de entrenador para que no eleve siempre la media del equipo en torno a +5 puntos.

## Cambios aplicados

- Bonus general del entrenador basado en su media:
  - Entrenador 80 o menos: +1 punto de media.
  - Entrenador 81 a 85: +2 puntos de media.
  - Entrenador 86 o más: +3 puntos de media.
- Bonus específico de competición limitado a +1:
  - Liga: si `management >= 86`, +1 solo en Liga.
  - Copa: si `cup >= 86`, +1 solo en Copa.
  - Europa: si `europe >= 86`, +1 solo en competición europea futura.
- Eliminada la escala anterior de competición que podía dar hasta +3.
- Añadida explicación visual del bonus en la selección de entrenador y resumen del equipo.

## No se ha tocado

- Ratings de jugadores.
- Balance de Liga base.
- Balance de Copa base.
- Draft.
- Layout móvil.
- Simulación general de rivales.

## Nota

La Liga y la Copa ya estaban cerradas. Este cambio corrige únicamente el efecto del entrenador sobre la media del Athletic histórico y su bonus específico por competición.
