# v0.24.2a — European UI Matchday View

## Objetivo

Pulir la tarjeta de evento europeo introducida en `v0.24.1c`, haciendo que la "Noche europea" sea más clara, visual y útil sin cambiar el motor de torneo ni sumar títulos europeos al palmarés.

## Qué implementa

- Badge visual por competición: Champions, Europa League y Conference League.
- Variantes visuales por competición en `EuropeanMatchEvent.css`.
- Marcador previo Athletic vs rival con rating propio, rating rival y sede.
- Copy narrativo según fase y contexto: local, visitante, semifinal, final, eliminación o campeón pendiente de palmarés.
- Bloque de progreso europeo con partidos jugados, puntos, balance V/E/D y goles a favor/en contra.
- Barra de progreso del torneo.
- Botones táctiles y responsive móvil reforzado.

## Qué NO implementa todavía

- No suma Champions League, Europa League ni Conference League al palmarés histórico.
- No modifica el ranking local/global.
- No toca backend Apps Script.
- No cambia ratings históricos ni probabilidades de Ruleta de la Suerte.
- No cambia el formato simplificado del torneo europeo.
- No implementa todavía una vista global completa de progreso europeo; eso queda para `v0.24.2b`.

## Decisiones de diseño

La pantalla sigue siendo una tarjeta integrada en `LeagueSimulatorView`, no una vista europea independiente. Esta decisión mantiene el flujo estable: la Liga continúa siendo el eje de la temporada y Europa aparece como evento bloqueante cuando toca jugar.

El texto "Campeón europeo pendiente de integración en palmarés" se conserva deliberadamente para evitar afirmar que el título ya cuenta en la vitrina histórica antes de `v0.24.3b`.

## Próximos pasos

- `v0.24.2b_EUROPEAN_PROGRESS_UI`: vista global del torneo, calendario europeo completo y estado de partidos pendientes/jugados.
- `v0.24.3a_EUROPEAN_KNOCKOUTS`: pulido específico de semifinal/final y estados de avance.
- `v0.24.3b_EUROPEAN_TROPHIES_PALMARES`: sumar títulos europeos al palmarés.
