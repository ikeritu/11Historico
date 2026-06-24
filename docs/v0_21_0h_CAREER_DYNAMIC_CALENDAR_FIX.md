# v0.21.0h — Career dynamic calendar fix

## Objetivo

Corregir el bloqueo detectado al iniciar la segunda temporada de modo carrera tras introducir ascensos y descensos dinámicos.

## Problema

La carrera cambiaba los equipos de Primera, pero seguía usando el calendario fijo 2025/26 del Athletic con rivales originales. Si un rival había descendido o había subido un equipo nuevo, la simulación podía intentar aplicar resultados contra equipos que ya no estaban en la tabla de Primera.

## Solución

- Generar un calendario específico de carrera a partir de los 19 rivales actuales.
- Mantener 38 jornadas, ida y vuelta contra esos rivales.
- Resolver ratings de equipos ascendidos desde la lista dinámica de rivales de la temporada.
- Mantener intacta la partida rápida y el calendario real base.

## Fuera de alcance

- No se toca rating efectivo 0.55.
- No se añade Supercopa.
- No se añade Europa jugable.
- No se toca el balance base Liga/Copa fuera de carrera.
