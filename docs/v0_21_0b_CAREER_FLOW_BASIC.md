# v0.21.0b — Career flow basic

## Objetivo

Conectar el primer flujo jugable del modo carrera Athletic sin añadir todavía recompensas, Supercopa, ranking global ni Europa jugable.

## Incluido

- El botón `Modo carrera Athletic` permite iniciar carrera real desde `2025/26`.
- La carrera reutiliza el flujo validado de partida rápida: formación, draft, entrenador, Liga y Copa.
- Al terminar Liga + Copa se evalúa el objetivo de carrera con las reglas puras de `v0.21.0a`.
- Si el Athletic clasifica a Europa o gana Copa y no desciende, aparece pantalla de temporada superada.
- Si el Athletic desciende, aparece Game Over aunque haya ganado Copa.
- Si no clasifica a Europa ni gana Copa, aparece Game Over.

## Fuera de alcance

- Recompensas entre temporadas.
- Cambio de jugador.
- Cambio de entrenador.
- Cambio de formación.
- Supercopa.
- Ranking local/global.
- Google Apps Script.
- Europa jugable.

## No tocado

- Ratings.
- Plantillas históricas.
- Balance de Liga.
- Balance de Copa.
- Motor de simulación.
- Draft de partida rápida.


## Corrección aplicada

- Copy de objetivo ajustado: clasifícate para Europa o gana la Copa del Rey.
- Techo de media general ajustado para que el entrenador no parezca siempre un +5 fijo.
- Eliminado el botón redundante de confirmar entrenador: al seleccionar técnico queda validado directamente.
