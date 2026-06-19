# Fix TacticalSlotLabel MC / SD

El script anterior no tocó correctamente `src/types/game.ts`, por eso seguían saliendo errores de `MC` y `SD`.

Este nuevo script sustituye el bloque completo:

```ts
export type TacticalSlotLabel = ...
```

y añade explícitamente:

```ts
| "MC"
| "SD"
```

## Ejecutar

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\fix-v0-12-3-tacticalslotlabel-mc-sd.ps1
npm.cmd run build
```
