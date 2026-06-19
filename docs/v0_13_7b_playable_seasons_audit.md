# v0.13.7b — Auditoría de temporadas jugables

Este parche no modifica el juego. Solo genera un informe.

## Comprueba

- temporadas catalogadas
- temporadas marcadas como `playable`
- temporadas con plantilla real en `seasons.ts`
- duplicados
- `playable` sin plantilla
- plantillas no marcadas como `playable`
- bloque `2020/21-2025/26`

## Uso

```powershell
cd "D:\Proyectos\⚽ Futbol11"
powershell -ExecutionPolicy Bypass -File .\audit-v0-13-7b-playable-seasons.ps1
notepad .\reports\v0_13_7b_playable_seasons_audit.txt
```
