# v0.12.12 — Botón rápido para colocar jugador

## Bug

En un resorteo compatible, aparece un jugador que encaja en el puesto restante, por ejemplo:

```text
Aroma
ED / MD
Encaja en: MD
```

Pero al seleccionarlo no se puede añadir al once haciendo clic en el campo.

## Solución

Se añade un botón directo en la tarjeta del jugador seleccionado:

```text
Añadir en MD
```

Así no dependes del clic sobre el marcador del campo.

## Comportamiento

- Seleccionas el jugador.
- Si encaja en uno o varios puestos libres, aparecen botones:
  - `Añadir en MD`
  - `Añadir en ED`
  - etc.
- Al pulsarlo, se ejecuta la misma lógica que al hacer clic en el campo.

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\fix-v0-12-12-draft-quick-place-button.ps1
npm.cmd run build
npm.cmd run dev
```
