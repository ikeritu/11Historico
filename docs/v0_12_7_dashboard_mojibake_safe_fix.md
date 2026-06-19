# v0.12.7 dashboard mojibake safe fix

El script anterior se rompía porque el propio archivo `.ps1` quedó guardado con caracteres mojibake dentro de strings.

Este nuevo script usa solo ASCII y construye los caracteres problemáticos por código Unicode, por lo que PowerShell no debería romperse al parsearlo.

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\fix-v0-12-7-dashboard-mojibake-safe.ps1
npm.cmd run build
npm.cmd run dev
```
