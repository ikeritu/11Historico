# v0.24.6a — European Mobile Polish

## Objetivo

Auditar y corregir huecos concretos de responsive/móvil introducidos por fases europeas recientes (v0.24.4a "Prestigio europeo" y v0.24.5a "columna Europa" en los rankings), sin duplicar la cobertura móvil ya existente de [v0.23.3a](./v0_23_3a_MOBILE_VIEWPORT_FIX.md) (fix de `100vh`/`100dvh`) ni de las fases europeas de UI ya asentadas (v0.24.2a/v0.24.2b).

## Diagnóstico previo

- v0.23.3a ya cubrió el problema de unidades de viewport (`100vh` → par `100vh`/`100dvh`) en toda la app, incluidas las pantallas de ranking. No se toca ni se repite ese trabajo aquí.
- Las tablas de ranking (`CareerLocalRanking.css`/`CareerGlobalRanking.css`) ya tenían un patrón de apilado responsive robusto (`data-label` + flex) con su propio `@media (max-width: 720px)`.
- `EuropeanMatchEvent.css` y `EuropeanProgressPanel.css` ya tenían sus propios `@media` (560px/720px) desde las fases v0.24.2a/v0.24.2b.
- Revisado también y **descartado** como falso positivo: el panel `.career-european-prestige-panel` (v0.24.4a) no necesita un `grid-template-columns` de 2 columnas ni su correspondiente colapso a 1 columna en móvil, porque a diferencia de sus paneles hermanos (`career-promotion-panel`, `career-supercopa-panel`, que sí tienen dos `<div>` uno junto a otro) solo renderiza un único bloque de contenido: ya es de una columna en cualquier ancho.

## Huecos reales encontrados y corregidos

1. **Columna "Europa" de los rankings sin `<span>`** (`CareerLocalRanking.tsx`, `CareerGlobalRanking.tsx`): al añadirse en v0.24.5a como texto suelto, la vista apilada de móvil no le aplicaba el alineado a la derecha que sí reciben el resto de celdas (`td span { text-align: right }`), así que el desglose europeo (p. ej. "Champions 1 · Europa Lg 1 · Conference 1") quedaba pegado a la izquierda, rompiendo la consistencia visual de la tarjeta. Verificado en vivo a 375px de ancho con una entrada de ranking de prueba: antes del fix el texto quedaba a la izquierda sin alinear; después, alineado a la derecha igual que el resto de filas.
2. **Grid de KPIs de `EuropeanMatchEvent` (Rival / Rating rival / Sede) sin colapso forzado a una columna**: `repeat(auto-fit, minmax(140px, 1fr))` seguía permitiendo 2 columnas en un móvil de 375px, dejando las tarjetas cramped. Añadido a la regla existente de colapso a 1 columna dentro del `@media (max-width: 560px)` ya existente.
3. **Botón de acción de `EuropeanMatchEvent` (Simular partido / Continuar temporada) sin ancho completo en móvil**: a diferencia de las pantallas de recompensa entre temporadas y de ranking (que sí hacen sus botones de ancho completo en móvil), el CTA de partido europeo se quedaba al ancho de su texto. Añadida la misma regla `width: 100%` dentro del `@media` ya existente.

## Cambios incluidos

- `src/components/CareerLocalRanking.tsx` / `CareerGlobalRanking.tsx`: la celda "Europa" envuelve su texto en `<span>`.
- `src/components/EuropeanMatchEvent.css`: `.european-match-event-grid` añadido al colapso a 1 columna del `@media (max-width: 560px)`; nueva regla `.european-match-event-actions button { width: 100%; }` en el mismo bloque.
- `.claude/launch.json`: configuración del servidor de desarrollo para poder previsualizar la app en el navegador integrado (usado para verificar el fix de la columna Europa a 375px de ancho antes de cerrar la fase).
- QA `qa:european-mobile-polish`, añadida a `qa:tech-debt` y a GitHub Actions.

## Fuera de alcance

- Rediseño visual (colores, tipografía, espaciados) — eso es v0.24.6b (European Visual Polish).
- `career-european-prestige-panel`: revisado, sin cambios necesarios (ver diagnóstico).
- Ranking local/global: estructura de datos, backend, Ruleta de la Suerte, Liga, Copa, Supercopa.
- `dist`.

## QA

`scripts/qaEuropeanMobilePolish.ts` valida (por texto fuente, ya que son ajustes de CSS/JSX):

- La columna Europa de ambos rankings envuelve su texto en `<span>`.
- Las reglas móviles de alineado de `<span>` en celdas de ranking siguen existiendo (no se rompieron al tocar el archivo).
- El grid de KPIs de `EuropeanMatchEvent` colapsa a una columna por debajo de 560px.
- El botón de acción de `EuropeanMatchEvent` es ancho completo en móvil.
- La cobertura móvil ya existente (`EuropeanProgressPanel`, `EuropeanQualificationCard`) no se ha tocado ni roto.
- Registro en `package.json` (`qa:tech-debt`) y en `.github/workflows/deploy.yml`.

Verificación visual adicional: pantalla de ranking local comprobada en vivo a 375×812 con datos de prueba (sembrados y luego limpiados de `localStorage`), confirmando el alineado correcto antes/después del fix.
