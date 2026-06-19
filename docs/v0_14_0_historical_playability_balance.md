# v0.14.0 — Balance jugable final histórico

Auditoría jugable del histórico completo. No modifica el juego.

## Revisa

```text
fuerza media por temporada
temporadas legendarias / fuertes / medias / bajas
distribución por década
10 drafts simulados de 11 rondas
drafts demasiado fuertes
drafts demasiado flojos
repetición de temporadas dentro del draft
```

## Uso

```powershell
cd "D:\Proyectos\⚽ Futbol11"
powershell -ExecutionPolicy Bypass -File .\audit-v0-14-0-historical-playability-balance.ps1
notepad .\reports\v0_14_0_historical_playability_balance.txt
```

## Siguiente paso

Si el informe sale equilibrado, congelar `v0.14.0`.

Si aparecen demasiados drafts fuertes/flojos, preparar `v0.14.1` con ponderación suave por tier.
