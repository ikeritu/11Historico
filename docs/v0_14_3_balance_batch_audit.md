# v0.14.3 — Simulación batch 10 temporadas + control de realismo

Añade una auditoría batch que ejecuta 10 simulaciones y aplica las reglas de decisión fijadas.

## Regla de decisión

```text
Si Oviedo / Alavés / Osasuna bajan mucho: normal.
Si Villarreal baja demasiadas veces: ajuste.
Si Girona baja 2-3 veces en 10: tolerable.
Si Madrid/Barça copan siempre la Copa: retocar.
```

## Uso

```powershell
cd "D:\Proyectos\⚽ Futbol11"
powershell -ExecutionPolicy Bypass -File .\audit-v0-14-3-balance-batch.ps1
```

Opcional, ajustando rating auditado:

```powershell
powershell -ExecutionPolicy Bypass -File .\audit-v0-14-3-balance-batch.ps1 -Runs 10 -Overall 90 -Attack 93 -Defense 93 -Control 93 -Goalkeeping 95
```

## Salidas

```text
reports/v0_14_3_balance_batch_report.txt
reports/v0_14_3_balance_batch_results.json
```

No modifica el juego.
