# v0.12.6 build fix

El parche del dashboard eliminó el panel visual de puestos libres, pero quedaron variables antiguas en `PlayerRound.tsx`.

Este fix elimina:

- `occupiedSlotIds`
- `compatibleOpenSlotLabels`
- `incompatibleOpenSlotLabels`
- dependencias residuales de `openSlots`

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\fix-v0-12-6-player-dashboard-build.ps1
npm.cmd run build
```
