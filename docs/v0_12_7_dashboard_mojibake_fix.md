# v0.12.7 dashboard mojibake fix

Corrige los caracteres raros del dashboard de habilidades.

El problema venía de la raya larga `—`, que en Windows/PowerShell quedó convertida en caracteres tipo `â€”`.

El fix sustituye esos valores por un guion normal `-`.

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\fix-v0-12-7-dashboard-mojibake.ps1
npm.cmd run build
npm.cmd run dev
```
