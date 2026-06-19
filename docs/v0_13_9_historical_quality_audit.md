# v0.13.9 — Auditoría de calidad histórica

No modifica el juego. Genera un informe de calidad sobre las 95 temporadas jugables.

## Revisa

```text
ratings extremos
jugadores 90+
temporadas con demasiados 85+
temporadas con demasiados 80+
temporadas potencialmente sobrevaloradas
nombres duplicados dentro de la misma temporada
posiciones o tacticalSlotLabels raros/vacíos
saltos grandes de rating por jugador
resumen por década
```

## Uso

```powershell
cd "D:\Proyectos\⚽ Futbol11"
powershell -ExecutionPolicy Bypass -File .\audit-v0-13-9-historical-quality.ps1
notepad .\reports\v0_13_9_historical_quality_audit.txt
```
