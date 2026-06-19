# v0.12.23 — UX limpieza de draft

## Objetivo

Evitar que el usuario pueda seleccionar un jugador que luego no puede colocar en el once.

## Problema anterior

El juego podía permitir este flujo:

```text
1. Seleccionas jugador.
2. El jugador realmente no tiene hueco libre válido.
3. No se puede colocar.
4. Aparece un estado raro de limpiar/cancelar selección.
```

Funcionalmente no rompía siempre, pero era mala experiencia.

## Cambio

Ahora:

```text
Jugador compatible -> seleccionable
Jugador no compatible -> visible pero bloqueado
Jugador ya elegido -> visible pero bloqueado
```

## Ajustes

- `handleSelectPlayer` comprueba antes de seleccionar si el jugador tiene slots disponibles.
- Si no tiene hueco, no activa la selección.
- El botón muestra `No compatible` cuando no se puede elegir.
- El panel derecho pide seleccionar un jugador compatible.
- Si por cualquier cambio de estado una selección deja de ser válida, se limpia automáticamente.

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-12-23-draft-ux-cleanup.ps1
npm.cmd run build
npm.cmd run dev
```

## Pruebas recomendadas

- Jugador ya elegido: debe estar bloqueado.
- Jugador sin puesto libre: debe estar bloqueado.
- Jugador compatible: debe poder seleccionarse y colocarse.
- Caso Ander Herrera en MC/MCD: debe poder colocarse.
- Caso Iraragorri MP/SD con hueco MC: no debe poder seleccionarse para MC.
- Caso Susaeta ED/MD con hueco MD: debe poder colocarse.
