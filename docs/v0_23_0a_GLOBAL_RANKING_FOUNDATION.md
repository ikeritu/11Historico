# v0.23.0a — Global Ranking Foundation

## Objetivo

Preparar el ranking global sin conectar todavía un backend real. Esta fase deja listo el contrato, las pantallas, la validación y la QA para que `v0.23.0B` pueda centrarse solo en Apps Script/Supabase/Firebase.

## Implementado

- Servicio `src/services/globalRankingService.ts`.
- Contrato `CareerGlobalRankingSubmitPayload`.
- Tipos `CareerGlobalRankingEntry`.
- Validación y saneado de nick.
- Submit/load con timeout y control de errores.
- Estado `not_configured` cuando no hay backend.
- Storage separado para último nick y carreras ya enviadas.
- Panel de envío en Game Over.
- Pantalla `Ranking global`.
- Botón `Ranking global` desde Home y Game Over.
- QA `npm run qa:global-ranking`.

## No implementado todavía

- Backend real.
- Google Sheets + Apps Script.
- Supabase/Firebase.
- Ranking global público real.
- Protección anti-spam de servidor.

## QA

Validaciones cubiertas por `qa:global-ranking`:

- Nick saneado y validado.
- Contrato de payload con campos requeridos.
- Payload inválido rechazado antes de enviar.
- Backend no configurado no rompe Game Over.
- Envío correcto con `fetch` mock.
- Error de red controlado.
- Carga sin backend devuelve estado vacío controlado.
- Carga mock ordena y limita Top 100.
- Parser ignora filas inválidas.
- Desempates por mejor posición y fecha.
- Storage global guarda último nick.
- Storage global evita duplicados locales.
- Datos corruptos en storage no rompen.

## Protección de alcance

No toca balance, ratings históricos, plantillas, simulación, ranking local ni reglas de recompensa.
