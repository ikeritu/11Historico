# v0.13.10c — Dani García 2023/24 rating fix

Corrige el único salto grande restante tras `v0.13.10b`.

## Cambio

```text
Dani García 2023/24: 73 -> 79
```

## Uso

```powershell
cd "D:\Proyectos\⚽ Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-13-10c-dani-garcia-rating-fix.ps1
npm.cmd run build
powershell -ExecutionPolicy Bypass -File .\audit-v0-13-9d-standalone-historical-quality.ps1
```
