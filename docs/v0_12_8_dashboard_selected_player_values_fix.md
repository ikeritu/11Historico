# v0.12.8 dashboard selected player values fix

## Problema

Al seleccionar un jugador, el dashboard no coincidía con la tarjeta del jugador.

Ejemplo:

- Tarjeta Larrazabal: RIT 89, TIR 60, PAS 80, REG 77, DEF 90, FIS 88, MEN 89
- Dashboard mostraba otros valores porque estaba mezclando el jugador seleccionado con el once ya elegido y además normalizando valores.

## Cambio

Ahora el dashboard funciona así:

- Si hay un jugador seleccionado: muestra las habilidades reales de ese jugador.
- Si no hay jugador seleccionado: muestra la media real de los jugadores ya elegidos.
- Se elimina la normalización visual que alteraba los valores.

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\fix-v0-12-8-dashboard-selected-player-values.ps1
npm.cmd run build
npm.cmd run dev
```
