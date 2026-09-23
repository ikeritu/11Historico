# v0.24.9 — Share & Retention System

## Objetivo

Añadir una capa ligera de compartición y retención al cierre de carrera, sin abrir mecánicas nuevas ni alterar el balance.

La intención de esta fase es que el jugador pueda cerrar una carrera con un resultado claro, copiarlo y compartirlo, además de recibir señales de progreso como logros y récord personal.

## Qué incluye

### Texto compartible de carrera

Nuevo módulo puro `src/career/shareRetention.ts` para construir un resumen compartible a partir de una entrada real de ranking local.

El texto incluye:

- Temporadas superadas.
- Puntos arcade.
- Palmarés total.
- Mejor posición liguera.
- Última temporada.
- Mejor hito europeo cuando exista.
- Cierre tipo reto: `¿Lo superas?`.

No inventa logros europeos si el palmarés no contiene Champions, Europa League o Conference.

### Panel “Compartir mi carrera”

`CareerSeasonOutcome.tsx` muestra un nuevo panel al terminar la carrera con Game Over y tener una entrada de ranking local.

Incluye:

- Botón `Compartir mi carrera`.
- Previsualización del texto que se copiará.
- Posición en ranking local si está disponible.
- Aviso de `Nuevo récord personal` si la carrera queda primera en el ranking local.
- Logros desbloqueados.

### Logros internos sencillos

Los logros se calculan de forma pura y no se persisten como sistema independiente. Son una capa de presentación derivada de datos ya existentes.

Logros iniciales:

- Primera clasificación europea.
- Primer título europeo.
- Campeón de Champions.
- Campeón de Europa League.
- Campeón de Conference.
- Sobrevive 5 temporadas.
- Top 10 local.

Los logros se deduplican por `id`.

### Récord personal

El nuevo récord personal se detecta usando el ranking local ya guardado. Si la entrada recién generada ocupa la primera posición del ranking local ordenado, se muestra el aviso.

## QA añadida

Nuevo script:

```bash
npm run qa:share-retention
```

Comprueba:

- El texto compartible incluye temporadas, puntos y palmarés.
- No se inventa hito europeo si no hay títulos europeos.
- Champions, Europa League y Conference se detectan correctamente.
- Los logros no se duplican.
- El récord personal depende del ranking local ordenado.
- La UI contiene `Compartir mi carrera`.
- `package.json`, `qa:tech-debt` y GitHub Actions registran la QA.
- El documento de fase existe.

## Fuera de alcance

- No se toca `dist`.
- No se toca Apps Script.
- No se modifica ranking backend.
- No se modifica fórmula de puntuación.
- No se cambian probabilidades, ratings ni motor de simulación.
- No se cambia la lógica europea estructural.
- No se añade login.
- No se añade analítica todavía.
- No se genera imagen/canvas de tarjeta compartible todavía.

## Validación esperada

```bash
npm run typecheck
npm run qa:share-retention
npm run qa:tech-debt
npm run lint:src
npm run build
```

## Riesgo

Bajo. La fase añade helpers puros, presentación y QA. El texto compartible y los logros se derivan de la entrada real de ranking y del palmarés ya existente; no escriben en backend ni alteran simulación.
