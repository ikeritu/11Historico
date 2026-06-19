# v0.12.3 build fix

Corrige los errores detectados tras aplicar el parche visual:

- `SD` no estaba incluido en `TacticalSlotLabel`.
- `MC` no estaba incluido en `TacticalSlotLabel`.
- Parámetro `positions` no usado en `getTacticalSlotLabelsForPlayer`.
- Función `getTeamIdByName` no usada en `leagueSimulator.ts`.

## Uso

Copia `fix-v0-12-3-build-errors.ps1` en `D:\Proyectos\Futbol11` y ejecútalo desde PowerShell:

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\fix-v0-12-3-build-errors.ps1
npm.cmd run build
```
