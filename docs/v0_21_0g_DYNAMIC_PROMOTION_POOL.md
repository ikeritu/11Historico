# v0.21.0g — Dynamic promotion pool

## Objetivo

Pulir el modo carrera para que los ascensos y descensos sean persistentes temporada a temporada.

## Cambios

- La bolsa de Segunda División deja de ser una lista fija.
- Los 3 descendidos de Primera se añaden a la bolsa de Segunda para poder ascender en temporadas futuras.
- Los 3 ascendidos salen de la bolsa mientras estén en Primera.
- Se evita que ascienda un equipo que ya juega en Primera.
- Se evita que ascienda el Athletic histórico del usuario.
- La pantalla entre temporadas muestra descendidos y ascendidos.
- Se conserva la bolsa dinámica en guardado local básico.

## Fuera de alcance

- No se simula una Segunda División completa.
- No se añade Supercopa.
- No se toca el factor de rating efectivo 0.55.
- No se toca partida rápida ni balance base Liga/Copa.
