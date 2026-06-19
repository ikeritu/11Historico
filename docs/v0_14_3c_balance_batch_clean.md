# v0.14.3c — Auditoría balance corregida

Corrige la auditoría batch:

```text
- salida más limpia
- nombres ASCII seguros
- conteo Alaves corregido
- umbral Villarreal menos agresivo
- alerta Copa demasiado abierta
```

## Uso

```powershell
cd "D:\Proyectos\⚽ Futbol11"
powershell -ExecutionPolicy Bypass -File .\audit-v0-14-3c-balance-batch-clean.ps1
```

## Salidas

```text
reports/v0_14_3c_balance_batch_report.txt
reports/v0_14_3c_balance_batch_results.json
```

No modifica el juego.
