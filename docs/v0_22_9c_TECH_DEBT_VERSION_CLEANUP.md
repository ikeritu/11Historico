# v0.22.9c — Tech debt version cleanup

## Objetivo

Cerrar una fase corta de limpieza técnica antes de abrir `v0.23.0_GLOBAL_RANKING`.

La prioridad es dejar alineadas las versiones visibles, el `package.json`, el `package-lock.json`, la documentación y una QA automática mínima que evite volver a publicar builds con metadatos inconsistentes.

## Cambios

- `appVersion.ts` actualizado a `v0.22.9c`.
- `package.json` actualizado a `0.22.9-c.0`, formato semver válido para representar la fase pública `v0.22.9c`.
- `package-lock.json` alineado con `package.json`.
- Nuevo script `qa:version` para validar consistencia de versión.
- Nuevo script `qa:tech-debt` para encadenar:
  - `qa:version`,
  - `qa:formation-reward`,
  - `qa:career-ranking`.
- `CHANGELOG.md` y `README.md` actualizados.

## Criterios de aceptación

- `npm run qa:version` termina en OK.
- `npm run qa:formation-reward` sigue pasando.
- `npm run qa:career-ranking` sigue pasando.
- `npm run build` termina en OK.
- No se toca balance de Liga/Copa.
- No se tocan ratings históricos.
- No se tocan plantillas.
- No se abre ranking global todavía.

## Notas

El paquete npm usa `0.22.9-c.0` porque `0.22.9c` no es una versión semver válida. La versión visible del juego sigue siendo `v0.22.9c`.

El warning de Vite por chunk grande queda registrado como deuda técnica futura, pero no bloquea esta fase.
