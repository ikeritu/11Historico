# v0.14.2e — Restore build + mantener Ko-fi

Este parche restaura `leagueSimulator.ts` desde un backup sano y mantiene/añade Ko-fi.

## Por qué

Los intentos de Copa `v0.14.2`, `v0.14.2c` y `v0.14.2d` dejaron un bloque suelto en `leagueSimulator.ts`.

## Qué hace

```text
1. Restaura leagueSimulator.ts desde backup sano.
2. Mantiene v0.14.1.
3. Añade o mantiene Ko-fi.
4. No reintenta Copa.
```

## Uso

```powershell
cd "D:\Proyectos\⚽ Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-14-2e-restore-build-keep-kofi.ps1
npm.cmd run build
```
