# v0.14.3b — Auditoría batch sin esbuild

Corrige el fallo de la auditoría anterior:

```text
Cannot find package 'esbuild'
```

Esta versión usa Vite, que ya existe en el proyecto.

## Uso

```powershell
cd "D:\Proyectos\⚽ Futbol11"
powershell -ExecutionPolicy Bypass -File .\audit-v0-14-3b-balance-batch-no-esbuild.ps1
```

## Salidas

```text
reports/v0_14_3b_balance_batch_report.txt
reports/v0_14_3b_balance_batch_results.json
```

No modifica el juego.
