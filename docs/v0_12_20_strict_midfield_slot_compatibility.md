# v0.12.20 — Compatibilidad estricta de mediocampo

## Bug

El juego seguía ofreciendo jugadores que no correspondían al puesto libre.

Ejemplo:

```text
Puesto libre: MC
Jugador: Iraragorri
Posiciones: MP / SD
El juego decía: Encaja en MC
```

Eso no es correcto. Si falta `MC`, el jugador debe tener `MC` real.

## Cambio

Se endurece `canPlayerFillSlot` por etiqueta táctica:

```text
MC   -> requiere MC
MC-I -> MC o MI
MC-C -> MC o MCD
MC-D -> MC o MD
MCD  -> MCD o MC

MD   -> requiere MD
MI   -> requiere MI
LD   -> requiere LD
LI   -> requiere LI
```

Y mantiene alternativas razonables:

```text
MP -> MP o SD
SD -> SD, MP o DC
DC -> DC o SD
ED -> ED o MD
EI -> EI o MI
CAD -> CAD o LD
CAI -> CAI o LI
```

## Resultado esperado

```text
Iraragorri MP / SD ya no debe salir como compatible para MC.
Susaeta ED / MD sí debe salir como compatible para MD.
Un MC real sí debe poder ocupar MC.
```

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\fix-v0-12-20-strict-midfield-slot-compatibility.ps1
npm.cmd run build
npm.cmd run dev
```
