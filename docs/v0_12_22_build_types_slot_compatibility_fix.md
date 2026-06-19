# v0.12.22 build fix — compatibilidad de slots

## Errores corregidos

El parche QA anterior dejó estos errores:

```text
canPlayerUseTacticalSlot is declared but its value is never read
MC-C / MC-I / MC-D no pertenecen a PlayerPosition
Cannot find name PlayerPosition en teamRating.ts
```

## Causa

`MC-I`, `MC-C`, `MC-D` son etiquetas tácticas o variantes de slot, pero el tipo `PlayerPosition` no las acepta como literal en arrays tipados.

## Solución

Se cambia la comparación a `string[]` internamente:

```ts
player.positions.find((position) => acceptedLabels.includes(String(position)))
```

Así se puede comparar con etiquetas tácticas sin romper TypeScript, pero se sigue devolviendo una posición real del jugador.

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\fix-v0-12-22-build-types-slot-compatibility.ps1
npm.cmd run build
npm.cmd run dev
```
