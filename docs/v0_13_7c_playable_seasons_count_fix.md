# v0.13.7c — Auditoría corregida

La auditoría v0.13.7b marcaba falsos duplicados porque contaba cada `season: "xxxx/xx"` de los jugadores.

Esta versión cuenta solo cabeceras de temporada:

```ts
{
  season: "1983/84",
  coach: ...
}
```

## Uso

```powershell
cd "D:\Proyectos\⚽ Futbol11"
powershell -ExecutionPolicy Bypass -File .\audit-v0-13-7c-playable-seasons-count-fix.ps1
notepad .\reports\v0_13_7c_playable_seasons_audit_count_fix.txt
```
