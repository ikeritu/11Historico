# v0.23.2c — Luck Wheel Real Rewards

## Objetivo

Ejecutar de verdad los premios de la Ruleta de la Suerte que hasta ahora quedaban registrados como pendientes:

- Cambio de jugador.
- Cambio de entrenador.
- +1.0 de media y cambio de jugador.

La fase no cambia probabilidades, balance, ratings históricos, ranking, palmarés ni Europa Career.

## Cambios principales

- `LeagueSimulatorView` persiste `requiresPlayerChange` y `requiresCoachChange` en el estado de la ruleta.
- Al resolver una ruleta con premio de jugador, la simulación se pausa y se abre el flujo real de sustitución.
- Al resolver una ruleta con premio de entrenador, la simulación se pausa y se abre el flujo real de selección de técnico.
- El cambio de jugador reutiliza el flujo existente de sustitución compatible.
- El cambio de entrenador reutiliza `CoachRound`.
- Al terminar o cancelar el cambio se vuelve a la simulación de Liga/Copa, conservando `leagueContext`.
- Los premios de media (`+0.5`, `+1`, `-0.5`, `-1`) siguen funcionando mediante `ratingDelta` aplicado hasta final de temporada.

## Seguridad funcional

- No se modifica el motor de partidos.
- No se cambian probabilidades de ruleta.
- No se toca la validación de alineaciones.
- No se permite duplicar jugadores porque se reutiliza `validateSelectedTeam`.
- El cambio de entrenador recalcula la media base y mantiene el delta de ruleta en el contexto.
- El cambio de jugador recalcula la media base y mantiene el delta de ruleta en el contexto.

## QA

Añadido:

```bash
npm run qa:luck-wheel-real-rewards
```

Integrado en:

```bash
npm run qa:tech-debt
```

Validaciones principales:

- Versionado `v0.23.2c`.
- Tipos `luck_wheel_player` y `luck_wheel_coach`.
- Callbacks desde `LeagueSimulatorView` hacia `App`.
- Persistencia de flags de cambio.
- Retorno a `league_simulation` tras ejecutar o cancelar.
- Textos del modal actualizados para indicar que el premio ya es ejecutable.

## Validación recomendada en Windows

```powershell
cmd /c "npm run qa:version"
cmd /c "npm run lint:src"
cmd /c "npm run qa:luck-wheel-real-rewards"
cmd /c "npm run qa:season-luck-wheel-ui"
cmd /c "npm run qa:tech-debt"
cmd /c "npm run build"
```
