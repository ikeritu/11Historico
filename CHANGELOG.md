# Changelog

## v0.23.1 — Release stabilization

- Cierra una versión estable post-ranking global real antes de abrir Europa Career.
- Actualiza versionado público a `v0.23.1` y npm a `0.23.1`.
- Añade `npm run qa:release-stabilization`.
- `npm run qa:tech-debt` incorpora la QA de estabilización.
- Verifica que `.env`, `.env.local` y `.env.*.local` están protegidos por `.gitignore`.
- Verifica que fuentes/docs/dist no filtran Deployment IDs reales de Apps Script.
- Verifica que la guía Apps Script documenta `/exec`, `.env.local` y la configuración segura.
- No toca balance, ratings históricos, plantillas, ranking local, recompensas ni backend Apps Script.

## v0.23.0e — Global ranking UI polish

- Añade configuración local del endpoint Apps Script desde la UI, guardada solo en el navegador.
- `globalRankingService` prioriza endpoint explícito, endpoint guardado en navegador y después `VITE_GLOBAL_RANKING_ENDPOINT`.
- La pantalla Ranking global permite pegar URL `/exec`, guardar endpoint y recargar Top 100.
- El panel de Game Over permite activar el ranking global si el backend aparece pendiente.
- Añade `npm run qa:global-ranking-ui` y lo integra en `npm run qa:tech-debt`.
- Actualiza versionado a `v0.23.0e` / `0.23.0-e.0`.
- No toca balance, ratings históricos, plantillas, recompensas ni ranking local.

## v0.23.0d — Global ranking real submit QA

- Añade `npm run qa:global-ranking-real` para validar contra el backend real de Apps Script configurado por `VITE_GLOBAL_RANKING_ENDPOINT`.
- La QA real comprueba `health`, carga del Top 100 y, opcionalmente, envío real + aparición en ranking + bloqueo de duplicado con `FUTBOL11_GLOBAL_RANKING_WRITE_QA=1`.
- Expone `checkGlobalRankingHealth` y URLs puras de `health`/`top` en `globalRankingService`.
- Documenta el flujo de prueba real con PowerShell sin commitear `.env.local`.
- Actualiza versionado a `v0.23.0d` / `0.23.0-d.0`.
- No toca balance, ratings históricos, plantillas, reglas de recompensa ni ranking local.

## v0.23.0c — Team power progression QA

- Centraliza el cálculo de poder de carrera en `src/career/teamPower.ts`.
- El premio de entrenador `+0.5` se refleja en todas las valoraciones visibles y llega al rating que usa la simulación.
- La pantalla de resumen diferencia rating base, bonus activo, rating de temporada y rating simulado.
- `LeagueSimulatorView` reutiliza el mismo cálculo compartido para compresión de carrera y dificultad.
- Añade `npm run qa:team-power` y lo integra en `npm run qa:tech-debt`.
- No toca balance base, ratings históricos, plantillas, reglas de recompensa ni ranking global.

## v0.23.0b — Global ranking backend Apps Script

- Añade backend mínimo copiables a Apps Script en `apps-script/globalRankingBackend.gs`.
- Conecta el frontend a `VITE_GLOBAL_RANKING_ENDPOINT` para envío real y carga Top 100 desde Google Sheets + Apps Script.
- Interpreta respuestas de Apps Script con `ok/status/message/entry/entries` y clasifica duplicados sin romper Game Over.
- Mantiene ranking local y guardado normal separados.
- Amplía `npm run qa:global-ranking` con casos de envoltorio Apps Script, duplicados y carga de Top 100.
- Actualiza versionado a `v0.23.0b` / `0.23.0-b.0`.
- No toca balance, ratings históricos, plantillas, simulación ni reglas de recompensa.

## v0.23.0a — Global ranking foundation

- Prepara el contrato frontend del ranking global sin conectar todavía backend real.
- Añade servicio `globalRankingService` con submit/load, validación de payload, orden Top 100, timeout y manejo de errores.
- Añade almacenamiento separado para último nick y carreras ya enviadas desde este navegador.
- Añade panel de envío en Game Over y pantalla `Ranking global` en estado preparado/pendiente de backend.
- Añade `npm run qa:global-ranking` y lo integra en `npm run qa:tech-debt`.
- No toca balance, ratings históricos, plantillas, simulación, ranking local ni reglas de recompensa.

## v0.22.9c — Tech debt version cleanup

- Alinea la versión visible del juego con `appVersion.ts`: `v0.22.9c`.
- Actualiza `package.json` y `package-lock.json` a `0.22.9-c.0`, formato semver válido para representar la fase `v0.22.9c`.
- Añade `npm run qa:version` para auditar consistencia entre app, paquete, lockfile, README, CHANGELOG y doc de fase.
- Añade `npm run qa:tech-debt` para encadenar QA de versión, recompensa y ranking local.
- Documenta la fase en `docs/v0_22_9c_TECH_DEBT_VERSION_CLEANUP.md`.
- No toca balance, ratings históricos, plantillas, simulación ni ranking global.

## v0.22.9b — Special reward player-only fix

- El premio especial de Jugador + alineación ya permite mantener la formación actual y cambiar solo el jugador.
- La pantalla de cambio compatible incluye una opción explícita `Mantener formación`.
- El draft posterior al cambio de formación bloquea colocaciones falsas de línea: un MP puro ya no puede cubrir un hueco de delantero.
- La asignación de posición prioriza la posición natural de la línea del slot antes que comodines tácticos.
- QA de recompensa ampliada: mantener formación, hueco exacto del jugador retirado y bloqueo de MP puro como delantero.
- No toca balance, ratings históricos, plantillas ni simulación de Liga/Copa.

## v0.22.9a — Local ranking UX QA

- Muestra el rango de temporadas de cada carrera en el Top local (ejemplo `2025/26–2027/28`).
- Vista móvil del ranking en tarjetas apiladas con etiquetas, sin scroll horizontal.
- Amplía `npm run qa:career-ranking` con persistencia tras recarga simulada, desempates por mejor posición y fecha, datos corruptos, borrado y rango de temporadas.
- Verifica automáticamente que guardar/borrar ranking no toca el guardado normal de partida (claves de `localStorage` separadas).
- Sin backend, sin ranking global, sin cambios de balance ni de simulación.

## v0.22.9 — Local ranking basic

- Guarda automáticamente la carrera al llegar a Game Over.
- Persiste en `localStorage` temporadas superadas, puntos arcade, palmarés, mejor posición, última temporada, versión del juego y fecha.
- Añade pantalla Top local ordenada por puntos arcade, temporadas superadas y palmarés.
- Añade botones `Nueva carrera`, `Ver ranking local` y `Borrar ranking local`.
- Añade `npm run qa:career-ranking` para validar cálculo, orden, límite Top 100 y campos obligatorios.
- Sin backend, sin ranking global, sin tocar balance, ratings históricos ni plantillas.

## v0.22.8a — Career reward cancel snapshot fix

- Guarda snapshot completo al entrar en recompensa de carrera.
- Cancelar `Jugador + alineación` restaura formación, once, entrenador, rating visible, Media XI y estado de carrera ya avanzado.
- Bloquea estados 12/11, duplicados y slots inexistentes en el flujo de recompensa.
- Amplía `npm run qa:formation-reward` con pruebas automáticas de cancelación segura.
- No toca balance, ratings históricos, plantillas ni ranking local.

## v0.22.8 — Game Over arcade summary

- Añade resumen arcade en Game Over con temporadas superadas, palmarés y puntuación.
- Corrige mojibake visible en textos de estado y radar de draft.
- No toca simulación, balance, Supercopa ni ratings históricos.

## v0.22.7 — QA formation reward script

- Añade `npm run qa:formation-reward` para validar automáticamente el premio de cambio de formación.
- Cubre desbloqueo por Liga, Copa y Supercopa + Europa, y bloqueo de Supercopa sin Europa.
- Comprueba que 4-3-3 → 4-2-4 no recoloca jugadores conservados fuera de su línea natural.
- No toca gameplay público, simulación, balance ni ratings.


## v0.22.6 — Formation line strict fix

- Fix: el premio Jugador + alineación ya no recoloca jugadores conservados fuera de su línea natural.
- Fix: el hueco reservado para el draft corresponde a la línea que debe cubrir el sustituto.
- Fix: ganar Liga se comunica como premio especial en la pantalla de temporada.


## v0.22.5 — Formation reward replacement slot fix

- Corrige el flujo de premio Jugador + alineación: elegir jugador saliente → elegir formación compatible → draft del sustituto → aplicar o cancelar y avanzar.
- Las formaciones compatibles reservan un hueco válido para el jugador eliminado.
- El draft posterior exige un sustituto natural de la línea abierta para evitar recolocaciones forzadas fuera de rol.
- Sin cambios en simulación ni balance.

## v0.22.1 — Formation change reward

- Añadido cambio de formación compatible como recompensa especial entre temporadas.
- Se desbloquea si Athletic gana Liga, gana Copa, o gana Supercopa y además se clasifica para Europa.
- La Supercopa por sí sola no salva la temporada ni desbloquea formación si no hay objetivo europeo.
- Solo se muestran formaciones que mueven como máximo un jugador entre defensa, medio y ataque.
- El once actual se recoloca automáticamente en puestos válidos antes de continuar.
- No toca simulación, balance, rating efectivo, ascensos/descensos ni reglas de Supercopa.

## v0.22.0d — Career QA and copy polish

- Objetivo cumplido más concreto en modo carrera: Champions, Europa League, Conference o Copa.
- Copy de Game Over más arcade y explícito.
- La pantalla entre temporadas reutiliza el motivo concreto del objetivo.
- Documentada la validación jugable de Supercopa, recompensa, media/rating y Game Over.
- Sin cambios en simulación, balance, rating efectivo, ascensos/descensos ni Supercopa.

## v0.22.0b — Career rating display fix

- Añadida Media XI actual en la pantalla de temporada superada.
- Renombrado "Media visible equipo" a "Rating visible equipo" para evitar confusión.
- Sin cambios en simulación, balance, Supercopa ni calendario.

## v0.22.0a — Supercopa basic

- Añadida Supercopa básica en modo carrera.
- Participan 1.º y 2.º de Liga + campeón y subcampeón de Copa.
- Si hay duplicados, la plaza se rellena con el siguiente mejor clasificado de Liga.
- Si Athletic está clasificado, juega semifinal y posible final antes de la siguiente Liga.
- Ganar Supercopa suma +2 al palmarés, pero no salva la temporada ni afecta a Europa.
- No toca balance base de Liga/Copa ni rating efectivo.


## v0.21.0l — Final summary polish

- Pulida la pantalla final de temporada para dar más sensación de cierre/recompensa.
- Añadido titular más claro en carrera, subtítulo de objetivo cumplido y CTAs superiores compactos.
- Reordenadas las estadísticas clave, Copa, entrenador, rating y jugadores destacados.
- No toca simulación, balance, carrera, ascensos/descensos ni calendario dinámico.


## v0.21.0k — Career preview cleanup

- Eliminado el botón “Jugar partida rápida” de la pantalla informativa del modo carrera.
- La pantalla de carrera queda centrada en empezar carrera o volver.
- Sin cambios en simulación, calendario, ascensos/descensos ni balance.

## v0.21.0j — Desktop home simplification

- Simplificada la portada de escritorio en layout de dos columnas.
- Añadidos chips informativos de Liga, Copa y modo carrera.
- Reordenadas acciones principales para reducir fricción visual en PC.
- Sin cambios en simulación, carrera, ratings, ascensos/descensos ni calendario.


## v0.21.0i — Mobile home simplification

- Simplificada la portada pública en móvil con enfoque tipo app.
- CTA principal más claro para nueva partida y modo carrera.
- “Cómo se juega” pasa a bloque plegable.
- Apoyo, feedback y versión quedan más discretos.
- No se toca la lógica de simulación, carrera, ascensos/descensos ni rating efectivo.

# Changelog

## v0.22.4 — Career exit copy and coach layout fix

- Refuerza el copy de salida de carrera como `Salir`.
- Corrige el layout de la ficha de entrenador en el resumen completo para separar nombre, temporada, media/bonus y especialidad.
- No toca simulación, balance, Supercopa ni recompensas.


## v0.21.0h — Career dynamic calendar fix

- Corrige el bloqueo al iniciar la segunda temporada de modo carrera tras aplicar ascensos/descensos.
- El calendario de carrera ahora se genera con los 19 rivales actuales de Primera, incluyendo ascendidos y excluyendo descendidos.
- Los equipos ascendidos pueden jugar partidos de Liga y rival-vs-rival con sus ratings propios.
- No toca rating efectivo 0.55, partida rápida, Supercopa ni Europa jugable.


## v0.21.0g — Dynamic promotion pool

- Añadida bolsa dinámica de Segunda División en modo carrera.
- Los descendidos entran en la bolsa y pueden volver a ascender en temporadas futuras.
- Los ascendidos salen de la bolsa mientras juegan en Primera.
- Añadido bloque visual de ascensos y descensos en pantalla entre temporadas.
- No se toca rating efectivo, Supercopa, Europa ni partida rápida.

# Changelog

## v0.21.0f — Career promotion and summary fix

- En modo carrera, los 3 equipos descendidos dejan de estar en la Liga de la temporada siguiente.
- Se incorporan 3 equipos ascendidos desde una bolsa de Segunda/clubes candidatos para mantener una liga de 20 equipos.
- El botón `Ver resumen completo` ya no corta la continuidad del modo carrera: permite volver a la pantalla de carrera para continuar.
- Mantiene la compresión de rating efectiva de v0.21.0e.

## v0.21.0e — Career effective rating balance

- Añade rating efectivo solo para modo carrera con compresión de élite: `80 + (rating - 80) * 0.55`.
- Mantiene intactas las medias visibles de jugadores, el resumen del equipo, la partida rápida y el balance base de Liga/Copa.
- La compresión se aplica justo antes de simular Liga/Copa en carrera, para probar un modo carrera más realista y menos propenso a dobletes consecutivos.

## v0.21.0d — Critical audit fixes

- Corrige el bonus de entrenador en Copa: el contexto de simulación conserva `selectedCoach`, por lo que entrenadores con `cup >= 86` aplican el +1 previsto.
- Corrige mojibake visible en textos de formaciones y comentarios/errores de Copa.
- Corrige 11 posiciones duplicadas en plantillas históricas (`["LI", "LI"]`, `["LD", "LD"]`) con secundarios conservadores.
- Protege el guardado/borrado de historial con `try/catch` para evitar rupturas por `localStorage`.
- Elimina backups/copias sueltas sin referencias de código activo.

## v0.21.0c — Interseason rewards

- Añade pantalla entre temporadas tras superar objetivo en modo carrera.
- Permite continuar carrera cambiando 1 jugador o cambiando entrenador.
- El cambio de jugador obliga a elegir a quién sacar, sortea una temporada histórica y permite fichar un sustituto compatible.
- Mantiene el bucle Liga + Copa para la siguiente temporada.
- Actualiza marcador de temporadas superadas y palmarés básico de Liga/Copa/Supercopa.
- No introduce todavía ranking global, Supercopa jugable ni Europa jugable.


## v0.21.0b — Career flow basic

- El modo carrera Athletic ya permite iniciar una carrera básica desde 2025/26.
- Reutiliza el flujo validado de formación, draft, entrenador, Liga y Copa.
- Evalúa objetivo de carrera al terminar la temporada: Europa o Copa, con descenso como Game Over duro.
- Añadidas pantallas básicas de temporada superada y Game Over de carrera.
- El entrenador queda validado al seleccionarlo; se elimina el paso redundante de confirmar entrenador.
- Sin recompensas entre temporadas, Supercopa, ranking global ni Europa jugable todavía.

## v0.21.0a — Career rules skeleton

- Añadidos tipos mínimos de modo carrera.
- Añadidas reglas puras para objetivo, clasificación europea, dificultad, palmarés y cambio de formación compatible.
- Documentación añadida en `docs/v0_21_0a_CAREER_RULES_SKELETON.md`.
- Sin integrar todavía flujo jugable de carrera, ranking global ni Google Apps Script.
- Sin cambios en motor, Liga, Copa, ratings, draft ni simulación.

## v0.20.0 — Pre-career foundation

- Entrada visual para `Modo carrera Athletic`.
- Pantalla informativa con reglas cerradas del futuro modo carrera.
- Documentación añadida en `docs/v0_20_0_PRE_CAREER_FOUNDATION.md`.
- Sin cambios en motor, Liga, Copa, ratings, draft ni simulación.

## v0.19.0 — Beta pública estable

- Cambio de estado visible a `Beta pública`.
- Portada reescrita para usuario nuevo.
- Añadido botón `Compartir juego`.
- Mantenido botón `Enviar feedback` con Google Forms.
- README actualizado para publicación pública.
- Sin cambios en motor, Liga, Copa, ratings, draft ni simulación.

## v0.18.7 — Public copy and feedback form

- Feedback conectado a Google Forms.
- Limpieza de textos internos de beta local.

## v0.18.6 — Public feedback and coach confirm top

- Botón de confirmar entrenador colocado arriba.
- Canal de feedback público añadido.

## v0.18.5 — Scroll reset on phase change

- Reset automático de scroll al cambiar de fase.

## v0.18.4 — UI clarity and mobile results polish

- Mejor explicación visual del bonus de entrenador.
- Resultado final móvil más compacto.

## v0.18.3 — Coach bonus balance fix

- Bonus de entrenador ajustado por rating y especialidad.

## v0.18.1 — Mobile draft layout fix

- Lista de jugadores más accesible en móvil.
- Campo y habilidades bajan de prioridad en mobile.

## v0.22.0c — Career rewards polish

- Clarifica el tipo de recompensa entre temporadas según el mérito conseguido.
- Distingue recompensa estándar por Europa, premio copero, premio mayor por Liga y Supercopa como palmarés sin recompensa extra.
- Mantiene estable la lógica: cambiar 1 jugador o cambiar entrenador.
- No toca simulación, balance, calendario dinámico, Supercopa ni rating efectivo.

## v0.22.2 - Career reward flow fix

- Elimina el botón Volver al inicio de la pantalla final de temporada para evitar salidas accidentales.
- Reordena los premios: sin título, jugador o entrenador; con título, jugador + alineación o entrenador +0.5.
- El cambio de alineación se decide después de elegir el jugador que sale, evitando bloqueos como 3-3-4 sin opciones.
- El premio de entrenador +0.5 permite cambiar entrenador o mantener el actual aplicando igualmente el bonus.
- Cancelar una rama de recompensa ya iniciada avanza a la siguiente temporada conservando plantilla/formación actual; no vuelve a recompensas.

## v0.22.3 - Career reward lock and recalc fix

- Cambia los botones de salida de carrera de "Volver al inicio" a "Salir" para reducir abandonos accidentales.
- Refuerza el bloqueo de ramas de recompensa: cancelar tras elegir una mejora avanza a la siguiente temporada y no vuelve a "Toca decidir".
- Recalcula la media/rating visible tras cambiar jugador, formación o entrenador.
- Mantiene intactos simulación, balance, Supercopa, ascensos/descensos y ratings históricos.
