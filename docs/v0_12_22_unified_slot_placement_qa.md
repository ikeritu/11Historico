# v0.12.22 — QA fix: compatibilidad y colocación unificadas

## Diagnóstico QA

El error no era solo de Ander Herrera. Había una incoherencia de lógica:

1. `getAvailableSlotsForPlayer` decía que un jugador encajaba.
2. La UI mostraba botones como `Anadir en MC`.
3. Pero al colocar, `getValidPositionForSlot` usaba otra regla más simple:
   ```ts
   player.positions.find((position) => slot.allowedPositions.includes(position))
   ```
4. Resultado: el jugador aparecía compatible, pero `handleSlotClick` no encontraba posición válida y no hacía nada.

## Caso real

```text
Ander Herrera
MC-D / MC-I / MCD

Hueco libre:
MC
```

La UI decía:

```text
Puede jugar en: MCD · MC · MC
```

Pero al pulsar `Anadir en MC`, no se colocaba.

## Solución

Se unifica la matriz de compatibilidad en:

- `canPlayerFillSlot`
- `getValidPositionForSlot`

Ahora ambas funciones usan las mismas reglas.

## Reglas clave

```text
MC   -> MC, MC-C, MC-I, MC-D, MCD
MCD  -> MCD, MC, MC-C
MC-I -> MC-I, MC, MI, MCD
MC-D -> MC-D, MC, MD, MCD

MD -> MD real
MI -> MI real
LD -> LD real
LI -> LI real
```

## Resultado esperado

```text
Ander Herrera MC-D / MC-I / MCD
-> puede colocarse en MC, MC-I, MC-D o MCD según huecos disponibles.

Iraragorri MP / SD
-> no debe colocarse en MC.

Endika ED / DC
-> no debe colocarse en MD.
```

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\fix-v0-12-22-unified-slot-placement-qa.ps1
npm.cmd run build
npm.cmd run dev
```
