# v0.12.6 — Dashboard de habilidades en draft

## Cambio

Se elimina del panel izquierdo:

- Puestos libres
- Encajan en esta búsqueda
- Ya elegidos

Esa información ya está suficientemente representada en `Tu once`.

## Nuevo panel

Se sustituye por un dashboard de habilidades:

- Media provisional del equipo
- Radar de habilidades
- Ritmo
- Tiro
- Pase
- Regate
- Defensa
- Físico
- Portería
- Mentalidad
- Punto fuerte
- Área a vigilar

## Comportamiento

Si seleccionas un jugador antes de colocarlo, el dashboard lo incluye como previsualización.
Así puedes ver cómo afectaría al perfil del equipo antes de hacer clic en el campo.

## Aplicación

Ejecutar desde `D:\Proyectos\Futbol11`:

```powershell
powershell -ExecutionPolicy Bypass -File .\apply-v0-12-6-player-skills-dashboard.ps1
npm.cmd run build
```
