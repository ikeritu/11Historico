# v0.22.0d — Career QA and copy polish

## Objetivo

Congelar una pequeña capa de estabilidad tras Supercopa, Media XI/Rating visible y recompensas entre temporadas.

## Cambios

- El objetivo cumplido deja de mostrarse como texto genérico cuando la carrera sobrevive.
- Ahora diferencia entre:
  - clasificación a Champions League,
  - clasificación a Europa League,
  - clasificación a Conference League,
  - campeón de Copa del Rey.
- El Game Over muestra una explicación más clara según descenso o fracaso deportivo.
- La pantalla entre temporadas conserva el motivo concreto de supervivencia.

## Validación manual usada como referencia

Prueba de carrera con varias temporadas:

- Supercopa aparece cuando Athletic clasifica por Liga.
- Supercopa usa 1.º/2.º de Liga + finalistas de Copa.
- Media XI actual y Rating visible equipo se muestran separados.
- Recompensas entre temporadas se explican por mérito.
- Game Over aparece al quedar fuera de Europa y sin Copa.

## Sin cambios

- No cambia simulación.
- No cambia balance de Liga/Copa.
- No cambia rating efectivo de carrera.
- No cambia ascensos/descensos.
- No cambia reglas de Supercopa.
- No añade cambio de formación.
