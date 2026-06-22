# v0.20.0 — Pre-career foundation

## Objetivo

Preparar la base visual y documental del futuro modo carrera Athletic sin implementar todavía una carrera completa.

## Reglas cerradas para el modo carrera

- Temporada inicial: 2025/26.
- El Athletic continúa si clasifica a Champions, Europa League o Conference, o si gana la Copa del Rey.
- Si desciende, hay Game Over aunque haya ganado la Copa.
- Clasificación europea MVP: Top 4 Champions, 5º Europa League, 6º Conference.
- Si el campeón de Copa ya entra en Champions, 5º y 6º van a Europa League y 7º a Conference.
- Si gana Liga o Copa, juega Supercopa al inicio de la siguiente temporada. La Supercopa cuenta para palmarés, no para salvar temporada.
- Entre temporadas se podrá cambiar 1 jugador o cambiar entrenador.
- Si gana Liga o competición europea, el cambio de jugador permitirá además elegir una formación compatible.
- Cambio de jugador: primero se descarta un jugador, después se elige formación compatible si aplica, luego se sortea un año y se elige entre jugadores compatibles.
- Si no hay candidatos compatibles, se resortea automáticamente.
- El jugador descartado podrá volver a aparecer en el futuro.
- Cambio de entrenador: salen 3 candidatos y no puede aparecer el entrenador actual.
- Dificultad de rivales: temporadas 1-3 +0.5, 4-6 +1, 7+ +1.5.
- Copa: +0.15 de dificultad por temporada.
- Ranking global MVP futuro con Google Sheets + Apps Script, informal y sin login.

## Ranking futuro

Top 100 separado por:

1. Temporadas superadas.
2. Puntos de palmarés.

Scoring:

- Champions: 10
- Liga: 8
- Europa League: 6
- Copa del Rey: 5
- Conference: 4
- Supercopa: 2

## Alcance de esta versión

Incluye:

- Entrada visual `Modo carrera Athletic`.
- Pantalla informativa de reglas.
- Documentación de reglas.
- Versión visible v0.20.0.

No incluye todavía:

- Carrera jugable completa.
- Estado persistente de carrera.
- Ranking global real.
- Google Apps Script.
- Europa jugable.
- Cambios de balance.

## Validación

- `npm run build` OK.
- Prueba manual de portada, partida rápida y pantalla informativa de modo carrera.
