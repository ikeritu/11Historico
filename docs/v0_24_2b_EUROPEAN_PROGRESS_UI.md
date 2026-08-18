# v0.24.2b — European Progress UI

## Objetivo

Añadir una vista consultiva de progreso europeo para que el jugador pueda ver el estado completo del torneo sin depender solo del evento puntual de jornada.

## Alcance incluido

- Nuevo componente `EuropeanProgressPanel`.
- Nuevo CSS `EuropeanProgressPanel.css` con layout responsive.
- Integración dentro de `EuropeanMatchEvent`.
- KPIs europeos visibles:
  - partidos jugados / totales,
  - puntos,
  - victorias / empates / derrotas,
  - goles a favor / goles en contra.
- Objetivo contextual por fase:
  - fase inicial: alcanzar 10 puntos,
  - semifinal: ganar para alcanzar la final,
  - final: ganar para levantar el título,
  - eliminado / campeón / completado.
- Bloque de próxima noche europea.
- Calendario europeo completo con:
  - fase,
  - rival,
  - jornada de Liga asociada,
  - sede,
  - país,
  - resultado o estado pendiente.
- Resaltado del partido europeo actual.
- Nueva QA `qa:european-progress-ui`.
- Integración de la QA en `qa:tech-debt`.
- GitHub Actions validará pull requests contra `main`, permitiendo trabajar sin entorno local durante viaje.

## Fuera de alcance

- No se añaden títulos europeos al palmarés.
- No se modifica el motor de simulación europeo.
- No se cambian las reglas de clasificación europea.
- No se modifica la Ruleta de la Suerte.
- No se modifica el ranking global.
- No se actualiza todavía backend ni migraciones.

## Validación prevista

- `npm run typecheck`
- `npm run lint:src`
- `npm run qa:european-progress-ui`
- `npm run qa:tech-debt`
- `npm run build`

En modo viaje, esta validación debe ejecutarse mediante GitHub Actions en pull request.
