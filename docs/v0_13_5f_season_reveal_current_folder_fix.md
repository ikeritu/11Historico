# v0.13.5f — Fix ruta real con emoji

El script anterior apuntaba a `D:\Proyectos\Futbol11`, pero el proyecto real está en:

```text
D:\Proyectos\⚽ Futbol11
```

Esta versión usa `(Get-Location).Path`, por lo que debe ejecutarse desde la carpeta real del proyecto.

## Uso

```powershell
cd "D:\Proyectos\⚽ Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-13-5f-season-reveal-current-folder-fix.ps1
npm.cmd run build
npm.cmd run dev
```
