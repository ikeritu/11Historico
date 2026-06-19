# v0.13.9d — Fix CJS para auditoría histórica

Corrige el error `require is not defined in ES module scope`.

El proyecto usa `"type": "module"`, así que Node interpreta los `.js` como módulos ESM. Esta versión genera una copia del script `v0.13.9c` usando `.cjs` para el temporal.

## Uso

```powershell
cd "D:\Proyectos\⚽ Futbol11"
powershell -ExecutionPolicy Bypass -File .\audit-v0-13-9d-historical-quality-cjs-fix.ps1
notepad .\reports\v0_13_9d_historical_quality_audit_cjs_fix.txt
```
