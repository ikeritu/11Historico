# v0.12.10 safe fix

El script anterior fallaba por usar `-replace` con una concatenación que PowerShell interpretó como tres argumentos.

Esta versión usa `[regex]::Replace(...)` y `.Replace(...)` para evitar ese error.

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\fix-v0-12-10-draft-reroll-compatible-season-safe.ps1
npm.cmd run build
npm.cmd run dev
```
