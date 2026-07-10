# v0.24.1c — European Tournament Calendar

Primera versión jugable de "Europa Career": torneo europeo simplificado,
integración con el motor de partidos existente e integración con el
calendario de Liga. Documenta también tres subfases internas que se
entregan en un único commit/tag:

- **v0.24.1a** — European Tournament Skeleton (tipos, rivales y reglas de
  avance puras).
- **v0.24.1b** — European Match Engine Integration (reutiliza el motor de
  partidos existente).
- **v0.24.1c** — European Calendar Integration (partidos europeos como
  eventos de temporada).

## Qué se implementa

- Formato europeo simplificado en `src/europe/europeanTournament.ts`: fase
  inicial de 6 partidos, semifinal a partido único y final a partido único.
  Clasificar a semifinales requiere ≥10 puntos en la fase inicial (3 por
  victoria, 1 por empate); con menos de 10 puntos el equipo queda eliminado.
  Perder la semifinal elimina; ganarla lleva a la final.
- Rivales genéricos (sin nombres ni escudos reales) en
  `src/europe/europeanOpponents.ts`, con rating por competición: Champions
  League 82-94, Europa League 76-88, Conference League 70-82. Selección
  determinista por semilla para no romper la reproducibilidad de partidas.
- `src/europe/europeanCalendar.ts` reparte los partidos europeos entre las
  jornadas de Liga: fase inicial en jornadas 4/8/12/16/20/24, semifinal en
  la jornada 30 y final en la 36 (para una Liga de 38 jornadas). Si el
  número de jornadas es distinto, usa los mismos porcentajes
  (15/25/35/45/55/65/80/95%) evitando la primera y la última jornada.
- `src/europe/europeanMatchEngine.ts` reutiliza el motor de partidos real
  (`src/simulation/matchEngine.ts`, sin modificarlo) mediante adaptadores
  que convierten un rating global de usuario/rival en el desglose completo
  que espera `simulateMatch`. El rating del usuario y el del rival influyen
  en el resultado igual que en Liga/Copa, y hay ventaja de local.
- Integración en el calendario de carrera: si la última clasificación
  europea guardada (`europeanCareer.currentQualification` /
  `getLatestEuropeanQualification`) indica `qualified: true`, se crea el
  torneo para la temporada siguiente al pulsar "Continuar" tras terminar
  una temporada (`handleContinueCareerAfterSeason` en `App.tsx`). El torneo
  se guarda en `europeanCareer.currentTournament`.
- `LeagueSimulatorView` detecta la jornada europea pendiente
  (`shouldPlayEuropeanMatchAtLeagueMatchday`) y muestra la tarjeta de evento
  `EuropeanMatchEvent` (competición, fase, rival, condición de local/
  visitante, rating del rival, resultado tras simular y estado del torneo).
  La simulación automática y "saltar hasta el próximo evento" se detienen
  en la jornada europea igual que ya hacían con la Copa del Rey.
- QA dedicada: `qa:european-tournament`, `qa:european-match-engine` y
  `qa:european-calendar`, integradas en `qa:tech-debt` y en el workflow de
  GitHub Pages antes del build.

## Qué NO se implementa todavía

- Eliminatorias a doble partido ni fase de grupos clásica: se usa el
  formato simplificado descrito arriba (decisión documentada más abajo).
- Suma de títulos europeos al palmarés de carrera. Ganar la final europea
  se registra internamente (`tournament.champion = true`,
  `tournament.phase = "completed"`) pero **no** incrementa
  `CareerTrophyCounts` ni aparece en la vitrina de palmarés. El texto de UI
  usado tras ganar la final es explícitamente "Campeón europeo pendiente de
  integración en palmarés", para no insinuar que el título ya cuenta. Esa
  integración queda planificada para v0.24.3b.
- Vista de detalle de la jornada europea (marcador jornada a jornada, tabla
  de la fase inicial, etc.) más allá de la tarjeta básica de evento; queda
  para v0.24.2a/v0.24.2b.
- Ranking europeo global.

## Formato elegido y reglas de avance

Se optó por un formato simplificado en vez de una fase de grupos clásica
(varios rivales simultáneos) o eliminatorias a doble partido, porque:

1. El calendario de Liga solo tiene huecos discretos para partidos
   adicionales (igual que ya ocurre con la Copa del Rey a partido único), y
   una fase de grupos con jornadas cruzadas entre varios rivales no encaja
   en el modelo de "un partido por jornada de Liga" que ya usa el motor de
   simulación.
2. El resto de la carrera (Copa del Rey, Supercopa) ya usa eliminatoria a
   partido único; mantener esa misma convención para semifinal y final es
   consistente con el resto del juego y no requiere lógica de ida/vuelta.

Reglas de avance:

- Fase inicial: 6 partidos (alternando local/visitante), 3 puntos por
  victoria, 1 por empate. ≥10 puntos clasifica a semifinales; con menos de
  10 el torneo termina en eliminación.
- Semifinal: partido único. Ganar lleva a la final; perder elimina.
- Final: partido único. Ganar marca `champion: true` (sin palmarés
  todavía); perder termina el torneo sin título.

## Integración con el motor de partidos

`simulateEuropeanMatch()` no crea un motor nuevo: llama a la función real
`simulateMatch()` de `src/simulation/matchEngine.ts` (sin modificarla) con
`selectedPlayers: []`, ya que los partidos europeos de esta fase no generan
eventos de gol individuales, solo resultado y goles totales. Los
adaptadores `buildUniformTeamRating()`/`buildUniformRivalTeam()` reparten
el rating global de usuario/rival de forma uniforme entre los sub-ratings
que exige `simulateMatch` (ataque, defensa, control, físico, mentalidad,
portería), y se conserva la ventaja de local/visitante y la varianza ya
existentes en el motor. Una QA dedicada (`qa:european-match-engine`)
comprueba explícitamente que `matchEngine.ts` no fue modificado y que el
rating de usuario y de rival influyen en el resultado.

## Integración con el calendario

- `getEuropeanMatchdaySlots(totalLeagueMatchdays)` calcula las jornadas
  asignadas a cada partido europeo (fase inicial, semifinal, final),
  usando jornadas fijas para una Liga estándar de 38 jornadas y porcentajes
  equivalentes para ligas de otro tamaño.
- `shouldPlayEuropeanMatchAtLeagueMatchday(tournament, leagueMatchday)`
  devuelve el partido europeo pendiente (si lo hay) para la jornada de
  Liga indicada; se usa tanto para bloquear la simulación automática como
  "saltar hasta el próximo evento", como para decidir cuándo mostrar la
  tarjeta de evento europeo.
- El torneo se crea una única vez por temporada (comprobando
  `currentTournament?.seasonNumber` antes de crear uno nuevo) y los
  partidos de semifinal/final solo se añaden si no existen ya, evitando
  duplicados tanto al continuar la carrera como al recargar una partida
  guardada.

## Persistencia

- `EuropeanCareerState.currentTournament?: EuropeanTournamentState | null`
  se guarda dentro de `europeanCareer` en `SavedGameState`, igual que el
  resto del estado europeo.
- `normalizeEuropeanCareerState()` acepta partidas guardadas sin
  `currentTournament` (partidas antiguas, incluidas las de antes de
  v0.24.0c y v0.24.1c) y lo normaliza a `null` o a un torneo válido y
  saneado (`normalizeEuropeanTournament`), reconstruyendo campos que
  falten y reasignando jornadas si es necesario.
- No se ha tocado el formato de ningún otro campo de `SavedGameState`.

## QA añadida

- `qa:european-tournament` — valida que sin clasificación no se crea
  torneo, que Champions/Europa League/Conference generan 6 partidos con el
  rango de rating correcto, IDs únicos y alternancia local/visitante,
  `getNextEuropeanMatch`, actualización de estadísticas al aplicar
  resultados, avance a semifinal (≥10 puntos) y eliminación (<10 puntos), y
  que semifinal/final nunca se duplican aunque se llame varias veces.
- `qa:european-match-engine` — valida que el resultado siempre es válido
  (goles enteros ≥0, resultado win/draw/loss), que un rival más débil gana
  con más frecuencia en muestreo repetido, que una final de Champions
  contra un rival fuerte no es un resultado trivial (ni 100% ni 0% de
  victorias), que el rating de usuario y de rival influyen en el
  resultado, que la ventaja de local se refleja, y que el módulo no
  modifica `matchEngine.ts` ni importa UI/React.
- `qa:european-calendar` — valida que sin clasificación no hay torneo ni
  evento, que clasificar crea el torneo para la temporada siguiente, que
  no se duplica al recargar (round-trip JSON), que las 6 jornadas de fase
  inicial son distintas, que Europa cuenta como evento para la simulación
  automática y para "saltar hasta el próximo evento" (comprobado sobre el
  código fuente de `LeagueSimulatorView.tsx`), que la Ruleta de la Suerte
  sigue intacta, que simular un partido actualiza el torneo y se propaga a
  `App.tsx`, que no aparecen más eventos tras la eliminación, que no se
  duplican eventos/partidos tras completar el torneo, y que
  `normalizeEuropeanCareerState` normaliza `currentTournament` para
  partidas antiguas.

Las tres quedan integradas en `qa:tech-debt` y en el workflow de GitHub
Pages, antes del `build`.

## Riesgos conocidos

- Vite reporta un aviso de chunk grande (`(!) Some chunks are larger than
  500 kB after minification`) en el build de producción; es un aviso
  preexistente del bundling general de la app, no relacionado con Europa
  Career, y no bloquea el build ni la QA.
- El entorno de verificación usado para este cambio no puede ejecutar
  `vite build --ssr` / `npm run build` de forma nativa (falta el binario
  `@rolldown/binding-linux-x64-gnu` para Linux en un `node_modules`
  instalado para Windows). La lógica de los tres scripts QA nuevos se
  verificó ejecutándolos directamente con
  `node --experimental-strip-types` contra el código TypeScript; se
  recomienda ejecutar `npm run qa:tech-debt` y `npm run build` en la
  máquina Windows habitual antes de publicar, tal como se detalla en las
  instrucciones de prueba del informe de entrega.

## Próximos pasos

- **v0.24.2a** — European UI Matchday View (vista de detalle de la
  jornada europea).
- **v0.24.2b** — European Progress UI (tabla de fase inicial, progreso
  visual del torneo).
- **v0.24.3a** — European Knockouts (si se decide enriquecer semifinal/
  final más allá del partido único actual).
- **v0.24.3b** — European Trophies + Palmarés (suma real de títulos
  europeos a `CareerTrophyCounts` y a la vitrina de palmarés).
