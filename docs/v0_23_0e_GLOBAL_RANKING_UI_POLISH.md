# v0.23.0e — Global ranking UI polish

## Objetivo

Pulir la experiencia del ranking global real antes de seguir ampliando backend o Europa Career.

La fase se centra en que el usuario pueda activar el endpoint de Apps Script desde el propio navegador, aunque Vite no haya leído `.env.local`, y en dejar mensajes más claros para estados reales de conexión, carga, envío y ranking vacío.

## Cambios

- Añade configuración local del endpoint Apps Script en navegador:
  - `CareerGlobalEndpointConfig.tsx`.
  - `CareerGlobalEndpointConfig.css`.
- `globalRankingService` ahora soporta endpoint por prioridad:
  1. endpoint explícito usado por QA,
  2. endpoint guardado en `localStorage`,
  3. `VITE_GLOBAL_RANKING_ENDPOINT`,
  4. estado pendiente.
- Añade validación clara de endpoint:
  - exige `https://`,
  - exige dominio Apps Script,
  - exige URL pública `/exec`, no `/dev`.
- La pantalla `Ranking global` permite guardar endpoint local y recargar el Top 100.
- El panel de Game Over permite configurar endpoint si no está activo.
- Mensajes actualizados:
  - backend pendiente,
  - ranking global vacío,
  - endpoint guardado,
  - envío disponible.
- Añade QA nueva:
  - `npm run qa:global-ranking-ui`.
- Integra la QA en:
  - `npm run qa:tech-debt`.
- Actualiza versionado:
  - `appVersion.ts` → `v0.23.0e`.
  - `package.json` / `package-lock.json` → `0.23.0-e.0`.

## Qué NO toca

- No toca balance.
- No toca ratings históricos.
- No toca plantillas.
- No toca reglas de recompensa.
- No toca ranking local.
- No cambia el backend Apps Script.

## Validación esperada

```powershell
cmd /c "npm run qa:global-ranking-ui"
cmd /c "npm run qa:tech-debt"
cmd /c "npm run build"
```

## Prueba manual recomendada

1. Abrir `Ranking global`.
2. Si aparece backend pendiente, pegar la URL `/exec` de Apps Script.
3. Guardar endpoint.
4. Pulsar `Recargar ranking`.
5. Confirmar que ya no aparece `Backend pendiente`.
6. Llegar a Game Over.
7. Enviar carrera con nick válido.
8. Confirmar que pasa a pantalla de ranking global y aparece la entrada.
