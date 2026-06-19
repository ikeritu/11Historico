# v0.13.7e — Reparación robusta duplicado 1976/77

La auditoría corregida detecta:

```text
1976/77 aparece 2 veces
```

El parche v0.13.7d era demasiado estricto con el formato de líneas, por eso podía decir que no estaba duplicada.

Esta versión usa detección robusta por texto completo y conteo de llaves.

## Uso

```powershell
cd "D:\Proyectos\⚽ Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-13-7e-robust-remove-duplicate-1976-77.ps1
npm.cmd run build
powershell -ExecutionPolicy Bypass -File .\audit-v0-13-7c-playable-seasons-count-fix.ps1
```

El objetivo es que la auditoría diga:

```text
Duplicados reales: 0
```
