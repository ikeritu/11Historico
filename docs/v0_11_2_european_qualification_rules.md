# v0.11.2 — Clasificación europea corregida

## Cambio principal

Se corrige la lógica de plazas europeas de la tabla final.

## Regla aplicada

- 1º-4º Liga: Champions.
- 5º Liga: Europa League.
- Campeón de Copa del Rey: Europa League.
- Si el campeón de Copa ya está clasificado por Liga para Champions o Europa League, la plaza copera pasa al siguiente equipo de Liga.
- Conference: siguiente equipo libre no clasificado para Champions o Europa League.

## Matiz del juego

Actualmente la Copa solo simula el camino del Athletic Club Histórico.

Por eso:

- Si el Athletic Club Histórico gana la Copa, se aplica la regla completa.
- Si el Athletic Club Histórico no gana la Copa, no se inventa automáticamente un campeón copero ni se asume que la plaza se hereda por Liga.
- En ese caso, la tabla muestra Conference como provisional y añade una nota explicativa.

## Casos

Athletic gana Copa y queda 8º:

- Athletic: Europa League por campeón de Copa.
- 5º: Europa League vía Liga.
- 6º: Conference.

Athletic gana Copa y queda 3º:

- Athletic: Champions.
- 5º: Europa League vía Liga.
- 6º: Europa League por plaza Copa heredada.
- 7º: Conference.

Athletic no gana Copa:

- 1º-4º: Champions.
- 5º: Europa League.
- 6º: Conference provisional.
- La plaza de Copa queda pendiente hasta que el juego simule un campeón copero completo.
