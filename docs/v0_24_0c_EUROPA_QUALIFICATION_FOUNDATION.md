# v0.24.0c — Europa Qualification Foundation

Primera base de "Europa Career": reglas de clasificación europea, tarjeta de
UI y persistencia del estado europeo dentro de la carrera. Documenta también
tres subfases internas que se entregan en un único commit/tag:

- **v0.24.0a** — Europa Career Rulebook Foundation (tipos y reglas puras).
- **v0.24.0b** — Europa Qualification UI (tarjeta de resumen).
- **v0.24.0c** — European Season State Persistence (guardado en la carrera).

## Qué se implementa

- Tipos y función pura `resolveEuropeanQualification()` en `src/europe/` que
  determinan a qué competición europea se clasificaría el Athletic al final
  de temporada, junto con helpers de etiquetas y prioridad.
- Componente `EuropeanQualificationCard` integrado en `CareerSeasonOutcome`
  (pantalla de fin de temporada / Game Over) y en `FinalSummary` (resumen
  completo de carrera), mostrando la clasificación de la **próxima**
  temporada.
- Persistencia del estado europeo dentro de `SavedGameState`
  (`europeanCareer`): clasificación actual, histórico por temporada, mejor
  competición alcanzada y total de clasificaciones. Se actualiza cada vez
  que termina una temporada de carrera (`handleFinishLeague` en `App.tsx`) y
  se reinicia solo al empezar una carrera nueva.
- QA dedicada: `qa:european-qualification`, `qa:european-qualification-ui` y
  `qa:european-persistence`, integradas en `qa:tech-debt` y en el workflow de
  GitHub Pages antes del build.

## Qué NO se implementa todavía

- Partidos europeos, calendario europeo, eliminatorias ni simulación de
  torneos europeos.
- Ranking europeo global.
- Suma de títulos europeos al palmarés de carrera (`CareerTrophyCounts`
  sigue sin incrementar `champions`, `europaLeague` ni `conference` desde
  esta fase; esos campos ya existían en el tipo y en la vitrina de
  palmarés, pero permanecen a 0 hasta que exista un torneo europeo jugable).
- Reasignación de plaza por campeón de Copa **externo** al usuario
  (`copa_runner_up_reallocation` y `league_reallocation` quedan definidos en
  `EuropeanQualificationSource` para uso futuro, pero no se calculan en esta
  fase por no existir todavía datos fiables de campeón de Copa ajeno al
  usuario).

## Reglas de clasificación

Posición de Liga (fija):

- 1º-4º → Champions League.
- 5º-6º → Europa League.
- 7º → Conference League.
- 8º o peor → sin clasificación europea.

Copa del Rey:

- Ganar la Copa garantiza como mínimo Europa League.
- Si la plaza de Liga ya es Champions o Europa League, la Copa no cambia
  nada (no hay downgrade).
- Si la plaza de Liga es Conference o ninguna, la Copa la mejora hasta
  Europa League.

Prioridad de competición: Champions League (3) > Europa League (2) >
Conference League (1) > sin Europa (0).

## Decisiones de diseño

### Coexistencia deliberada con el mecanismo interno existente

El repositorio ya tenía un tipo `EuropeanCompetition` y una función
`getEuropeanQualification()` en `src/types/career.ts` /
`src/career/careerRules.ts`. Ese mecanismo es interno y decide si la
carrera **sobrevive** (Game Over o no) al final de temporada, con una
lógica de reasignación de plazas ligeramente distinta (desplaza el hueco de
Europa League/Conference cuando se gana la Copa, en vez de garantizar un
mínimo fijo).

Se ha decidido **no tocar** ese mecanismo, porque:

1. Es lógica de negocio ya estable de la que depende la condición de
   Game Over de la carrera (fuera del alcance de esta fase y protegida por
   las normas del proyecto).
2. Las reglas pedidas para "Europa Career Foundation" son más ricas
   (`label`, `shortLabel`, `explanation`, `priority`, `source`) y con una
   semántica de posiciones distinta (5º-6º ambos Europa League fijo, en
   vez de desplazar el hueco).

El nuevo módulo `src/europe/` es completamente independiente: mismo nombre
de tipo `EuropeanCompetition` pero en un espacio de nombres distinto (no se
exporta nada compartido entre ambos). Si en el futuro se decide unificar
ambos sistemas, deberá ser una fase explícita y documentada.

### Por qué se guarda también la "no clasificación"

`appendEuropeanQualification()` añade una entrada al histórico incluso
cuando `qualified` es `false`. Se decidió así (en vez de omitir la entrada)
para que el histórico de `europeanCareer.history` refleje **todas** las
temporadas jugadas de la carrera, no solo las que lograron plaza europea.

### QA de reglas sin dependencias nuevas

El encargo original sugería ejecutar los scripts QA nuevos con `tsx`, pero
el proyecto no tiene `tsx` como dependencia y todo `qa:*` existente sigue el
patrón `vite build --ssr scripts/X.ts ... && node .audit-dist/X.js`. Los
tres scripts nuevos siguen ese mismo patrón para no añadir una dependencia
nueva y mantener consistencia con el resto del repositorio.

## Compatibilidad con partidas antiguas

- `europeanCareer` es un campo opcional en `SavedGameState`. Las partidas
  guardadas antes de esta fase no lo tienen; al cargarlas,
  `normalizeEuropeanCareerState(savedGame?.europeanCareer)` construye un
  estado vacío y seguro (`history: []`, `currentQualification: null`,
  `totalQualifications: 0`).
- No se ha tocado el formato de ningún otro campo de `SavedGameState`.
- No se han modificado ratings históricos, probabilidades de la ruleta ni
  balance de Liga/Copa/Supercopa.

## QA añadida

- `qa:european-qualification` — ejecuta `resolveEuropeanQualification()`
  contra los casos de posición de Liga y Copa del Rey descritos arriba
  (incluidos los 9 casos de aceptación) y valida los helpers de
  etiquetas/prioridad.
- `qa:european-qualification-ui` — comprueba que `EuropeanQualificationCard`
  existe y usa los textos correctos, que `CareerSeasonOutcome` y
  `FinalSummary` la integran, que ningún texto insinúa que ya se ha ganado
  un título europeo, y que el palmarés sigue mostrando Champions, Europa
  League y Conference.
- `qa:european-persistence` — comprueba la normalización de partidas
  antiguas, los casos de guardado (4º puesto, 7º puesto, 8º + Copa,
  temporada sin Europa), que no se dupliquen entradas para la misma
  temporada y que el estado sobreviva a un ciclo de serialización JSON.

Las tres quedan integradas en `qa:tech-debt` y en el workflow de GitHub
Pages, antes del `build`.

## Próximos pasos

- Calendario y partidos europeos.
- Eliminatorias / fase de grupos según competición.
- Suma real de títulos europeos al palmarés cuando exista torneo jugable.
- Ranking europeo global.
- Reasignación de plaza por campeón de Copa externo al usuario.
