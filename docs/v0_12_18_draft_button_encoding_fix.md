# v0.12.18 — Fix texto botones de colocación

## Problema

En los botones salía:

```text
AÃ±adir en DFC-I
```

## Solución

Se cambia a texto ASCII seguro:

```text
Anadir en DFC-I
```

Evito la `ñ` para no volver a generar mojibake en PowerShell/Windows.

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\fix-v0-12-18-draft-button-encoding.ps1
npm.cmd run build
npm.cmd run dev
```
