# v0.14.2f — Fix directo leagueSimulator + mantener Ko-fi

Este parche repara directamente el `leagueSimulator.ts` que subiste.

## Corrige

```text
Cannot find name 'fixture'
A 'return' statement can only be used within a function body
```

La causa era un bloque duplicado/suelto después de `getCupRivalFromFixture`.

## No toca

```text
Ko-fi
componentes
plantillas
ratings
v0.14.1 draft sin repetición
```

## Uso

Descomprime el ZIP en la raíz del proyecto y ejecuta:

```powershell
cd "D:\Proyectos\⚽ Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-14-2f-fix-leagueSimulator-build-keep-kofi.ps1
npm.cmd run build
```
