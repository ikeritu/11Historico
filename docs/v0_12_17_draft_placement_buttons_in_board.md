# v0.12.17 — Botones de colocación en panel Tu once

## Bug

Tras un resorteo de temporada, el jugador encaja en el puesto restante:

```text
Susaeta
ED / MD
Encaja en: MD
```

Pero al seleccionarlo no se puede colocar en el campo.

## Solución

Se añade en el panel derecho `Tu once` un botón directo:

```text
Añadir en MD
```

Esto usa la misma función interna que el clic del campo:

```ts
handleSlotClick(slot)
```

## Ventaja

Aunque el marcador del campo no responda por cualquier motivo visual/de capas, el jugador se puede colocar y la partida no queda bloqueada.

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\fix-v0-12-17-draft-placement-buttons-in-board.ps1
npm.cmd run build
npm.cmd run dev
```
