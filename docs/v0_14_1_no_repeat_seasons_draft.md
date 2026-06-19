# v0.14.1 — No repetir temporada dentro del draft

Corrige el único aviso de `v0.14.0`: podía repetirse una temporada exacta dentro del mismo draft.

## Cambios

```text
createRandomPlayerRoundSeasons:
- genera 11 temporadas sin repetir

handleSkipRound:
- al saltar una ronda excluye las temporadas ya usadas en el resto del draft
```

No toca ratings, plantillas, Liga ni Copa.

## Uso

```powershell
cd "D:\Proyectos\⚽ Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-14-1-no-repeat-seasons-draft.ps1
npm.cmd run build
powershell -ExecutionPolicy Bypass -File .\audit-v0-14-1-no-repeat-draft-balance.ps1
```

## Objetivo

```text
Drafts demasiado fuertes: 0/10
Drafts demasiado flojos: 0/10
Drafts con repetidas: 0/10
```
