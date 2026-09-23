# v0.24.8 — Public Release UX Hardening

## Objetivo

Mejorar la comprensión inicial del juego antes del lanzamiento público: que una persona nueva entienda en pocos segundos qué es Once histórico Zurigorri, qué debe hacer, qué ocurre si falla y por qué merece la pena jugar una carrera.

Esta fase es de UX pública, no de gameplay. No cambia balance, probabilidades, ratings, motor de simulación, ranking backend, Ruleta de la Suerte, Liga, Copa, Supercopa ni la lógica europea ya cerrada en `v0.24.7`.

## Cambios incluidos

- Portada reorientada a carrera pública con el mensaje principal: `Construye tu Athletic histórico y sobrevive temporada a temporada`.
- Tres pilares visibles desde la portada:
  1. Elige jugadores históricos.
  2. Compite en Liga, Copa y Europa.
  3. Gana títulos y entra al ranking.
- Botones principales más claros:
  - `Jugar carrera` como acción principal.
  - `Cómo funciona` como ayuda contextual.
  - `Ver ranking` como prueba social.
- Sección `Cómo funciona` con explicación corta del objetivo, Game Over, supervivencia, palmarés y Europa.
- Ajustes de estilo responsive en la home para mantener la portada clara en móvil.
- Nuevo documento de QA manual pública: `docs/MANUAL_QA_PUBLIC_RELEASE.md`.
- Nueva QA automática: `qa:public-release-ux`.

## Fuera de alcance

- No añade mecánicas nuevas.
- No modifica simulación ni probabilidades.
- No modifica Apps Script ni ranking backend.
- No toca `dist`.
- No cambia el scoring ni el balance de Europa Career.

## QA

Nueva QA específica:

```bash
npm run qa:public-release-ux
```

Valida que:

- La portada contiene el mensaje principal.
- Existen los tres pilares explicativos.
- Existe acceso a `Cómo funciona`.
- Se explica objetivo, Game Over, supervivencia, palmarés y Europa.
- La QA está registrada en `package.json`, `qa:tech-debt` y GitHub Actions.
- Existen el documento de fase y el checklist manual.

Validación esperada antes de merge:

```bash
npm run typecheck
npm run qa:public-release-ux
npm run qa:tech-debt
npm run lint:src
npm run build
```
