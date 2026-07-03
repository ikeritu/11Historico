# v0.23.0d — Global ranking real submit QA

## Objetivo

Cerrar la primera validación técnica del ranking global real conectado a Google Sheets + Apps Script, sin añadir nuevas mecánicas de juego.

Esta fase no cambia balance, ratings históricos, plantillas, recompensas ni ranking local.

## Cambios

- `appVersion.ts` actualizado a `v0.23.0d`.
- `package.json` / `package-lock.json` actualizados a `0.23.0-d.0`.
- Nuevo script:

```powershell
npm run qa:global-ranking-real
```

- Nuevo QA real contra el endpoint definido por `VITE_GLOBAL_RANKING_ENDPOINT`:
  - `health` del Apps Script.
  - carga del Top 100.
  - envío real opcional de carrera QA.
  - comprobación de aparición en Top global.
  - bloqueo de duplicado al reenviar la misma carrera.

- `globalRankingService` expone utilidades puras para:
  - construir URL de health,
  - construir URL de Top,
  - comprobar estado del backend.

## Uso seguro

Por defecto, `npm run qa:global-ranking-real` no escribe en Google Sheets. Solo comprueba `health` y carga del Top 100.

Para ejecutar un envío real de prueba:

```powershell
$env:FUTBOL11_GLOBAL_RANKING_WRITE_QA = "1"
npm run qa:global-ranking-real
Remove-Item Env:FUTBOL11_GLOBAL_RANKING_WRITE_QA
```

La prueba de escritura crea una carrera QA con nick `QA-Futbol11` y un `careerId` único. Después intenta reenviar la misma carrera para confirmar que Apps Script responde como duplicado.

## Checklist

- [x] Healthcheck real del backend.
- [x] Carga real del Top 100.
- [x] Smoke test de escritura real opcional.
- [x] Verificación de duplicado real opcional.
- [x] Endpoint leído desde `VITE_GLOBAL_RANKING_ENDPOINT`.
- [x] `.env.local` sigue fuera del repo.
- [x] No toca balance.
- [x] No toca ratings históricos.
- [x] No toca plantillas.
- [x] No toca reglas de recompensa.

## Validación esperada

```text
QA Global Ranking Real Backend
✓ Backend Apps Script responde health
✓ Top global real carga sin romper la app
✓ Smoke test de escritura omitido: define FUTBOL11_GLOBAL_RANKING_WRITE_QA=1 para enviar una carrera QA real.
QA global ranking real backend OK
```

Con escritura activada:

```text
✓ Envío real al ranking global funciona
✓ La carrera enviada aparece en el Top global real
✓ Duplicado real queda bloqueado por Apps Script
```
