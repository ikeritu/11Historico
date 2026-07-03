# v0.23.1 — Release stabilization

Fase corta de estabilización posterior al ranking global real.

## Objetivo

Cerrar una versión pública estable antes de abrir `v0.24.0_EUROPA_CAREER`, sin añadir gameplay nuevo ni tocar balance.

## Incluye

- Versionado público estable `v0.23.1`.
- `package.json` y `package-lock.json` alineados a `0.23.1`.
- Nuevo script `npm run qa:release-stabilization`.
- `npm run qa:tech-debt` incorpora la QA de estabilización.
- Comprobación de que `.env`, `.env.local` y `.env.*.local` están protegidos por `.gitignore`.
- Comprobación de que no se filtra un Deployment ID real de Apps Script en fuentes/docs/dist.
- Comprobación de que la guía de Apps Script sigue usando `/exec` y documenta `.env.local`.
- README y CHANGELOG actualizados a la versión estable.

## No incluye

- No cambia balance de Liga/Copa.
- No toca ratings históricos.
- No modifica plantillas.
- No cambia reglas de recompensas.
- No cambia ranking local.
- No cambia backend Apps Script ya validado.
- No abre todavía Europa Career.

## Validación recomendada

```powershell
cmd /c "npm run qa:version"
cmd /c "npm run qa:release-stabilization"
cmd /c "npm run qa:tech-debt"
cmd /c "npm run build"
```

Validación real opcional del backend global:

```powershell
$env:VITE_GLOBAL_RANKING_ENDPOINT = "https://script.google.com/macros/s/TU_DEPLOYMENT_ID/exec"
cmd /c "npm run qa:global-ranking-real"
```

Smoke test real de escritura, solo si se quiere crear una entrada QA en Google Sheets:

```powershell
$env:FUTBOL11_GLOBAL_RANKING_WRITE_QA = "1"
cmd /c "npm run qa:global-ranking-real"
Remove-Item Env:FUTBOL11_GLOBAL_RANKING_WRITE_QA
```

## Criterio de cierre

- QA de versión OK.
- QA release stabilization OK.
- QA técnica OK.
- Build OK.
- `.audit-dist` limpio.
- `git status -sb` limpio.
- Tag `v0.23.1_RELEASE_STABILIZATION` creado y subido.
