# v0.13.7d — Reparar duplicado real 1976/77

La auditoría corregida ha detectado un duplicado real:

```text
1976/77 aparece 2 veces
```

Este parche elimina el duplicado de forma segura.

## Criterio

- Detecta bloques reales de temporada, no jugadores.
- Si hay más de un bloque `1976/77`, conserva el bloque más completo.
- Prioridad:
  1. más jugadores
  2. más longitud de bloque
  3. si hay empate, conserva el primero
- Genera backup e informe.

## Uso

```powershell
cd "D:\Proyectos\⚽ Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-13-7d-remove-duplicate-1976-77.ps1
npm.cmd run build
powershell -ExecutionPolicy Bypass -File .\audit-v0-13-7c-playable-seasons-count-fix.ps1
notepad .\reports\v0_13_7c_playable_seasons_audit_count_fix.txt
```
