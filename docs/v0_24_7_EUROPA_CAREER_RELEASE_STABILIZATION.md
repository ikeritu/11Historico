# v0.24.7 — Europa Career Release Stabilization

## Objetivo

Cerrar el arco completo de "Europa Career" como versión pública estable, siguiendo el mismo significado que ya tenía "release stabilization" en este proyecto ([v0.23.1](./v0_23_1_RELEASE_STABILIZATION.md)): higiene de versión y documentación, no producto nuevo. Concretamente:

1. Corregir metadatos de versión (`appVersion.ts`, `README.md`, `qa:release-stabilization`) que seguían apuntando a `v0.24.2a`, diez fases por detrás de lo realmente desplegado.
2. Corregir `CHANGELOG.md`, que tenía cabeceras y bloques de entradas duplicados, y le faltaban 9 entradas de fase.
3. Dar a todo el arco europeo un único punto de entrada de documentación (este documento), ya que hasta ahora cada fase solo enlazaba a la inmediatamente anterior.

No es una fase de producto: no cambia probabilidades, ratings históricos, balance de Liga/Copa/Supercopa, la Ruleta de la Suerte ni ninguna funcionalidad ya entregada.

## Mapa completo del arco Europa Career

| Fase | Título | Qué añadió |
| --- | --- | --- |
| v0.24.0c | [Europa Qualification Foundation](./v0_24_0c_EUROPA_QUALIFICATION_FOUNDATION.md) | Reglas puras de clasificación europea por posición de Liga/Copa; persistencia del estado europeo en la partida guardada. |
| v0.24.1c | [European Tournament Calendar](./v0_24_1c_EUROPEAN_TOURNAMENT_CALENDAR.md) | Torneo europeo jugable (fase inicial de 6 partidos + semifinal + final), motor de partido reutilizando `matchEngine.ts`, integración en el calendario de Liga. |
| v0.24.2a | [European UI Matchday View](./v0_24_2a_EUROPEAN_UI_MATCHDAY_VIEW.md) | Tarjeta de evento "Noche europea": narrativa, badge por competición, marcador, progreso, responsive móvil. |
| v0.24.2b | [European Progress UI](./v0_24_2b_EUROPEAN_PROGRESS_UI.md) | Panel consultivo de progreso: KPIs, objetivo por fase, calendario europeo completo. |
| v0.24.3a | [European Knockouts](./v0_24_3a_EUROPEAN_KNOCKOUTS.md) | Semifinal/final como partidos únicos con jerarquía visual y textos de consecuencia explícitos. |
| v0.24.3b | [European Trophies + Palmarés](./v0_24_3b_EUROPEAN_TROPHIES_PALMARES.md) | Infraestructura para sumar títulos europeos al palmarés (`europeanTrophies.ts`), con guardarraíl anti-duplicado. |
| v0.24.4a | [European Rewards / Prestige](./v0_24_4a_EUROPEAN_REWARDS_PRESTIGE.md) | Recompensa de prestigio (bonus de rating + narrativa) por el rendimiento europeo; cableó de verdad el título europeo al palmarés real (v0.24.3b había dejado la infraestructura sin conectar en `App.tsx`). |
| v0.24.4b | [European Balance QA](./v0_24_4b_EUROPEAN_BALANCE_QA.md) | QA de balance dedicada a los riesgos del bonus de prestigio: no acumulación entre temporadas, techo de rating. |
| v0.24.5a | [Global Ranking Europa Fields](./v0_24_5a_GLOBAL_RANKING_EUROPA_FIELDS.md) | Desglose de títulos europeos por competición en la UI de ranking local y global. |
| v0.24.5b | [Backend Ranking Migration](./v0_24_5b_BACKEND_RANKING_MIGRATION.md) | Columnas estructuradas de títulos en el backend de Apps Script, sin romper compatibilidad con el cliente. |
| v0.24.6a | [European Mobile Polish](./v0_24_6a_EUROPEAN_MOBILE_POLISH.md) | Correcciones de responsive en pantallas europeas recientes. |
| v0.24.6b | [European Visual Polish](./v0_24_6b_EUROPEAN_VISUAL_POLISH.md) | Sistema de color por competición extendido a todas las pantallas europeas; acento visual en la columna Europa del ranking. |
| **v0.24.7** | **Europa Career Release Stabilization** (este documento) | Higiene de versión/documentación; cierre del arco. |

Sub-fases anteriores (`v0.24.0a`/`v0.24.0b`, `v0.24.1a`/`v0.24.1b`) se entregaron sin doc propio, incorporadas directamente en `v0.24.0c`/`v0.24.1c`.

## Estado final del sistema europeo

- **Clasificación**: 1º-4º Champions League, 5º-6º Europa League, 7º Conference League; la Copa del Rey garantiza como mínimo Europa League.
- **Torneo jugable**: fase inicial de 6 partidos (10+ puntos clasifica a semifinal), semifinal y final a partido único.
- **Palmarés**: ganar la final suma el título real al palmarés al cerrar la temporada (v0.24.3b + cableado de v0.24.4a), sin duplicados posibles.
- **Prestigio**: bonus de rating por rendimiento europeo (campeón +1.0/+0.75/+0.5 según competición, finalista +0.25, resto solo narrativa), nunca acumulable entre temporadas, verificado en `qa:european-balance`.
- **Ranking**: el desglose de títulos por competición es visible en ranking local y global, y viaja también en columnas propias del backend de Apps Script (aparte del JSON `trophyCounts`, que sigue siendo la fuente de verdad para el cliente).
- **UI**: cada competición (Champions/Europa League/Conference) tiene su propia identidad de color en todas las pantallas europeas y en el ranking; el conjunto es responsive desde móvil estrecho hasta escritorio.

## Cambios incluidos en esta fase

- `src/config/appVersion.ts`: `APP_VERSION`/`APP_VERSION_NAME`/`APP_STATUS` actualizados a `v0.24.7` y a una descripción que refleja el estado real y completo de Europa Career (antes describía solo la base de v0.24.2a, incluyendo la frase ya falsa "Títulos europeos aún no se añaden al palmarés").
- `package.json`: campo `version` actualizado a `0.24.7`.
- `README.md`: "Versión pública actual" actualizada.
- `scripts/qaReleaseStabilization.ts`: constantes y aserciones actualizadas al nuevo release; sigue validando lo mismo que ya validaba (metadatos de versión, protección de `.env*`, ausencia de Deployment ID real filtrado, seguridad de la guía de Apps Script, presencia de docs de release, registro de scripts QA críticos).
- `CHANGELOG.md`:
  - Eliminadas 6 cabeceras `# Changelog` repetidas (quedaba una sola al principio del archivo tras años de entradas prependidas correctamente, pero con la cabecera duplicada cada vez) y 3 bloques de entradas completas duplicadas por triplicado (`v0.23.3b`, `v0.23.2b6`, `v0.23.2b`). Verificado por comparación de conjuntos que el listado de versiones documentadas es idéntico antes y después del arreglo — no se perdió ninguna entrada única, solo las repeticiones.
  - Añadidas las 9 entradas que faltaban: `v0.24.2b` a `v0.24.6b`.
- Este documento, como punto de entrada único para todo el arco Europa Career.

## Fuera de alcance

- Cualquier cambio de producto (mecánica, balance, UI nueva): esta fase es solo higiene de release.
- Ranking global backend más allá de lo ya migrado en v0.24.5b.
- Ruleta de la Suerte, Liga, Copa, Supercopa.
- `dist`.

## QA

`npm run qa:release-stabilization` sigue validando lo mismo que antes (ver arriba), ahora contra el release `v0.24.7`. No se añade una QA nueva dedicada a esta fase: es la QA de release stabilization ya existente, actualizada, la que cierra el arco.

Validación completa ejecutada: `npm run typecheck`, `npm run qa:tech-debt` (incluye `qa:release-stabilization`), `npm run lint:src`, `npm run build`.
