# v0.12.7 — Entrenador, bonus por competición y final de Copa

## Cambios

### 1. Selección de entrenadores

Se elimina el texto residual:

- "Entrenadores asignados"
- "Elige uno de los tres técnicos finales."

También se añade CSS de respaldo para ocultarlo si queda en otra variante del componente.

### 2. Bonus de entrenadores

Se añade lógica para que las etiquetas/puntuaciones de entrenador tengan impacto:

- `Copa`: pequeño plus en partidos de Copa.
- `Liga`: usa `Gestión` como bonus de regularidad en Liga.
- `Europa`: queda preparada para el futuro simulador europeo.

El boost es intencionadamente pequeño:

- 80-85: +1
- 86-91: +2
- 92+: +3
- confianza baja reduce un poco el efecto

No debe romper el juego ni convertir al entrenador en más importante que los jugadores.

### 3. Pantalla final de Copa

Si el Athletic cae eliminado y se simula el resto del torneo, en pantalla final ya no se listan cuartos/semis sueltas.

Ahora solo se muestra:

- Final simulada

El resumen de campeón/subcampeón sigue apareciendo arriba.

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-12-7-coach-bonuses-final-cup-cleanup.ps1
npm.cmd run build
```
