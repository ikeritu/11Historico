# v0.22.8a — Career reward cancel snapshot fix

## Objetivo

Cerrar la corrección crítica del flujo de recompensa `Jugador + alineación` antes de abrir `v0.22.9_LOCAL_RANKING_BASIC`.

## Cambios

- Al entrar en recompensa de carrera se guarda un snapshot local de:
  - formación actual;
  - once colocado;
  - entrenador;
  - bonus activo;
  - rating visible;
  - Media XI;
  - temporada/carrera ya avanzada;
  - palmarés, rivales, ascensos/descensos y Supercopa pendiente.
- Cancelar una recompensa de jugador restaura el snapshot completo y vuelve al resumen de equipo de la nueva temporada.
- El flujo `Jugador + alineación` ya no reconstruye la plantilla a partir de estado parcial.
- Se valida el estado intermedio de 10 jugadores antes del draft del sustituto.
- Se bloquean estados de 12/11, jugadores duplicados y slots inexistentes en la formación activa.
- El rating visible solo se recalcula al confirmar un cambio real de jugador/formación/entrenador.

## QA añadida

`npm run qa:formation-reward` amplía la cobertura con:

- cancelar conserva 11/11;
- cancelar conserva formación original;
- cancelar conserva media original;
- cancelar no deja jugador duplicado;
- cancelar no deja posiciones inválidas.

## No tocado

- No se modifica balance.
- No se modifican ratings históricos.
- No se modifican plantillas históricas.
- No se abre ranking local ni ranking global.
- No se toca Europa Career.
