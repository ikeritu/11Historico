# v0.14.4c — Fix build import no usado

Corrige el error:

```text
src/data/athletic/seasons.ts: 'decodeMojibakeText' is declared but its value is never read.
```

## Uso

```powershell
cd "D:\Proyectos\⚽ Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-14-4c-unused-mojibake-import-fix.ps1
npm.cmd run build
```

No toca Liga, Copa, ratings ni balance.
