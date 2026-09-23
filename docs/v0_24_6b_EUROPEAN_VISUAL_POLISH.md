# v0.24.6b — European Visual Polish

## Objetivo

Coherencia visual entre pantallas europeas, no responsive (eso ya lo cubrió [v0.24.6a](./v0_24_6a_EUROPEAN_MOBILE_POLISH.md)). Concretamente: extender el sistema de color por competición (azul Champions / naranja Europa League / verde Conference) que ya existía en `EuropeanMatchEvent.css` a las otras dos pantallas europeas, que hasta ahora mostraban las tres competiciones de forma visualmente idéntica.

## Diagnóstico previo

- `EuropeanMatchEvent.css` ya tenía un sistema de color por competición completo y funcionando: `.european-match-event-card-champions` (azul `rgba(128,190,255,0.55)`), `-europa` (naranja `rgba(255,185,105,0.48)`), `-conference` (verde `rgba(95,225,160,0.48)`).
- `EuropeanProgressPanel.tsx` y `EuropeanQualificationCard.tsx` no tenían ninguna clase condicional por competición: Champions, Europa League y Conference se veían exactamente igual en esas dos pantallas.
- La columna "Europa" añadida a los rankings en v0.24.5a se renderizaba con el mismo blanco/rosa que Liga/Copa/Supercopa/Puntos — sin ninguna distinción visual pese a representar un logro de una categoría distinta (continental vs. nacional).
- Revisado como referencia (no tocado): `PalmaresTrophyCase.tsx` ya distingue Champions/Europa League/Conference por forma de trofeo (no por color) — es un sistema visual legítimo y distinto, y no se toca en esta fase.

## Cambios incluidos

- `EuropeanQualificationCard.tsx`/`.css`: nueva `getCompetitionModifierClass` que añade `european-qualification-card-champions/-europa/-conference` cuando hay clasificación con competición conocida. Mismos tonos exactos (`rgba(128,190,255,...)`/`rgba(255,185,105,...)`/`rgba(95,225,160,...)`) que `EuropeanMatchEvent.css`, documentados con un comentario que remite a la fuente por si cambian ahí.
- `EuropeanProgressPanel.tsx`/`.css`: misma idea, `getCompetitionModifierClass` añade `european-progress-panel-champions/-europa/-conference` sobre `tournament.competition`. Champions reafirma el azul ya usado por defecto en el panel; Europa League/Conference sobrescriben borde y fondo.
- `CareerLocalRanking.tsx`/`.css` y `CareerGlobalRanking.tsx`/`.css`: la celda "Europa" gana una clase dedicada (`career-ranking-europa-cell`/`career-global-ranking-europa-cell`) con el mismo azul "identidad europea" (`#cfe0ff`) ya usado en el resto de pantallas europeas, para distinguirla de un vistazo del resto de columnas. **Verificado en vivo** a escritorio con datos de prueba en `localStorage`.
- QA `qa:european-visual-polish`, añadida a `qa:tech-debt` y a GitHub Actions.

## Verificación

- **En vivo**: columna "Europa" del ranking local, comprobada con una entrada de prueba sembrada y luego limpiada de `localStorage` — el texto pasa de blanco/rosa uniforme a azul `#cfe0ff`, distinguible de un vistazo.
- **Por código, no en vivo**: `EuropeanQualificationCard`/`EuropeanProgressPanel` reutilizan exactamente el mismo patrón de clase condicional (`getCompetitionClass`/`getEventClass`) ya usado y en producción en `EuropeanMatchEvent.tsx`, y los mismos valores de color exactos que ese archivo ya tiene desplegados. Alcanzar esas dos pantallas en vivo requiere progresar una carrera completa hasta clasificación/torneo europeo, lo cual no se ha hecho en esta fase; la confianza viene de reutilizar un patrón y unos valores ya probados en el mismo código base, no de una verificación visual directa de esas dos pantallas.

## Fuera de alcance

- `PalmaresTrophyCase.tsx` (su propio sistema de forma-por-competición, ya establecido, no se toca).
- Responsive/móvil (v0.24.6a).
- Estructura de datos, backend, Ruleta de la Suerte, Liga, Copa, Supercopa.
- `dist`.

## QA

`scripts/qaEuropeanVisualPolish.ts` valida (por texto fuente, ya que son ajustes de CSS/JSX):

- `EuropeanQualificationCard` y `EuropeanProgressPanel` distinguen visualmente Champions/Europa League/Conference.
- Los tonos reutilizados coinciden exactamente con los ya definidos en `EuropeanMatchEvent.css`.
- La columna Europa de ambos rankings tiene el acento azul europeo.
- El polish visual se mantiene puramente en CSS/clases, sin tocar lógica de negocio (`careerSeasonRatingBonus` u otra).
- Registro en `package.json` (`qa:tech-debt`) y en `.github/workflows/deploy.yml`.
