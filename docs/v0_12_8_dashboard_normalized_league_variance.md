# v0.12.8 — Dashboard normalizado + varianza de Liga

## Problema 1

El dashboard de habilidades mostraba valores demasiado altos aunque la media del jugador/equipo fuera baja.

## Solución

Se normaliza solo la visualización del dashboard:

- No cambia los datos internos del jugador.
- No cambia el cálculo de partidos.
- Limita valores visuales absurdamente altos respecto a la media.
- Mezcla `skill real` + `overall` para que el radar sea más coherente.

Ejemplo aproximado:

- Jugador media 72 con skill 92 ya no mostrará 92 en dashboard.
- Jugador media 88 sí podrá mostrar valores altos.

## Problema 2

En Liga descendían siempre equipos parecidos: Alavés, Oviedo y Osasuna.

## Solución

Se añade varianza de temporada a los rivales al crear la Liga:

- Una temporada un equipo puede rendir por encima.
- Otro puede rendir por debajo.
- Los equipos de zona baja ya no quedan condenados automáticamente.
- Alavés/Oviedo/Osasuna reciben un pequeño plus aleatorio de supervivencia para evitar patrón fijo.

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-12-8-dashboard-normalized-league-variance.ps1
npm.cmd run build
npm.cmd run dev
```
