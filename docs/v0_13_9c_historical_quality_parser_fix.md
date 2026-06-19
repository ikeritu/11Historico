# v0.13.9c — Auditoría de calidad histórica, parser fix

Corrige la auditoría v0.13.9b, que daba `0 jugadores` en temporadas antiguas porque exigía `tacticalSlotLabels`.

Esta versión usa Node y parsea `makePlayer(...)` por balanceo de paréntesis.

## Uso

```powershell
cd "D:\Proyectos\⚽ Futbol11"
powershell -ExecutionPolicy Bypass -File .\audit-v0-13-9c-historical-quality-parser-fix.ps1
notepad .\reports\v0_13_9c_historical_quality_audit_parser_fix.txt
```
