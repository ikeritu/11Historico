# v0.21.0d — Critical audit fixes

Parche pequeño posterior a `v0.21.0c` centrado en bugs confirmados por auditoría.

## Cambios

- Bonus de entrenador en Copa funcional: `UserLeagueSimulationContext` conserva `selectedCoach` y el simulador aplica el +1 de Copa cuando `coach.skills.cup >= 86`.
- Corrección de mojibake visible en formaciones y textos internos de Copa.
- Corrección de 11 posiciones duplicadas en plantillas históricas, manteniendo secundarios conservadores compatibles con el rol del jugador.
- `gameHistoryStorage` protegido con `try/catch` para no romper el flujo si `localStorage` falla.
- Eliminados archivos sueltos sin referencias: backup antiguo de `leagueSimulator` y carpeta `patch_files`.

## Fuera de alcance

- No se toca balance de Liga/Copa.
- No se refactoriza React.
- No se centraliza todavía la lógica duplicada de bonus, labels o badges.
- No se implementa Supercopa ni Europa jugable.
