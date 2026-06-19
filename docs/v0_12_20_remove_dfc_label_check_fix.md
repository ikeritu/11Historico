# v0.12.20 build fix — eliminar comparación `DFC`

## Error

TypeScript indica:

```text
This comparison appears to be unintentional because ...
slot.label === "DFC"
```

El tipo `TacticalSlotLabel` ya no incluye `"DFC"` simple, solo:

```text
DFC-I
DFC-C
DFC-D
```

Por eso la comparación `slot.label === "DFC"` es imposible.

## Solución

Se elimina ese bloque de `canPlayerFillSlot`.

Los centrales siguen cubiertos por:

```text
DFC-I -> DFC o LI
DFC-C -> DFC
DFC-D -> DFC o LD
```

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\fix-v0-12-20-remove-dfc-label-check.ps1
npm.cmd run build
```
