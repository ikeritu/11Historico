# v0.23.3b — Hooks Simulation Deps Cleanup

## Objetivo

Cerrar la deuda de hooks señalada por la auditoría técnica antes de seguir añadiendo gameplay.

La fase se centra en calidad React/CI, especialmente en el bucle de simulación de temporada y en los avisos `react-hooks/*` detectados por ESLint.

## Cambios aplicados

- `LeagueSimulatorView` usa `useCallback` para estabilizar funciones críticas usadas por efectos y bucles de simulación:
  - `commitContext`
  - `maybeOfferSeasonLuckWheel`
  - `finishIfReady`
  - helpers de ventana de disparo de ruleta
- El efecto de simulación automática declara sus dependencias reales, reduciendo riesgo de closures obsoletos.
- Se evita el `setState` síncrono directo dentro del efecto de simulación automática.
- `CoachRound` elimina el reset síncrono innecesario dentro de `useEffect`.
- `SeasonReveal` sustituye el booleano derivado por `revealedSeason`, evitando reset síncrono dentro del efecto.
- `FinalSummary` elimina el efecto usado para derivar histórico local y lo inicializa de forma lazy.
- `BalanceAuditPanel` memoiza `runAudit` y declara dependencias reales.
- `CareerGlobalSubmitPanel` agrupa estado de endpoint para evitar dependencias artificiales en `useMemo`.
- Limpiezas menores de lint:
  - `prefer-const` en `matchEngine`.
  - parámetro de posiciones histórico marcado explícitamente como consumido.

## CI y QA

- Añade `qa:hooks-simulation-deps`.
- Integra `qa:hooks-simulation-deps` en `qa:tech-debt`.
- Activa `npm run lint:src` en GitHub Actions.
- Mantiene `typecheck`, QA técnica y build antes del deploy.

## Fuera de alcance

- No cambia probabilidades de ruleta.
- No cambia ratings históricos.
- No cambia balance de Liga/Copa.
- No cambia palmarés, ranking ni Europa Career.
- No hace el refactor grande de `App.tsx`; queda como deuda planificada.

## Validación esperada

```bash
npm run qa:version
npm run lint:src
npm run qa:hooks-simulation-deps
npm run qa:tech-debt
npm run build
```
