# v0.12.19 — Compatibilidad estricta de puestos de banda

## Bug

El juego permitía esto:

```text
Puesto libre: MD
Jugador: Endika
Posiciones: ED / DC
Encaja en: MD
```

Eso no es correcto según el criterio actual del juego. Si falta `MD`, debe salir un jugador con `MD` real.

## Cambio

Se endurece la función `canPlayerFillSlot`:

```text
MD -> requiere MD
MI -> requiere MI
LD -> requiere LD
LI -> requiere LI
CAD -> CAD o LD
CAI -> CAI o LI
ED -> ED o MD
EI -> EI o MI
```

## Resultado esperado

Si falta `MD`:

```text
Susaeta ED / MD -> valido
Endika ED / DC -> no valido para MD
```

Además, el resorteo de temporada compatible buscará temporadas que realmente tengan un jugador con `MD`.

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\fix-v0-12-19-strict-wide-slot-compatibility.ps1
npm.cmd run build
npm.cmd run dev
```
