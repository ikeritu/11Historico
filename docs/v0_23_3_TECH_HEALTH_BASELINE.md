# v0.23.3 — Tech Health Baseline

Fase corta de higiene técnica derivada de la auditoría `Auditoria_Futbol11_v2.docx`.

## Objetivo

Reforzar la base de CI/calidad sin tocar gameplay. La fase prepara el proyecto para abordar después móvil, hooks y refactor de `App.tsx` con menor riesgo.

## Cambios

- `typecheck` explícito en `package.json`.
- `build` pasa a ejecutar `npm run typecheck && vite build`.
- `qa:tech-health-baseline` audita configuración técnica crítica.
- `qa:tech-debt` incluye la nueva QA de salud técnica.
- `deploy.yml` usa Node 24 y ejecuta typecheck + QA técnica antes de build.
- `eslint.config.js` ignora ruido histórico/temporal y limita lint a código vivo.
- `.gitignore` protege `.audit-dist/` y documentos locales `Auditoria_*.docx`.

## Decisiones intencionadas

- `lint:src` queda disponible, pero no se activa todavía como bloqueo de deploy porque la auditoría detecta avisos reales de hooks/deps que deben corregirse en una fase específica.
- No se elimina todavía ningún fichero histórico del repositorio. La limpieza destructiva se deja para una fase separada con revisión previa.
- No se modifica el endpoint de ranking global del workflow; la app publicada sigue usando configuración por UI/local según diseño actual.

## QA esperada

```bash
npm run qa:version
npm run qa:tech-health-baseline
npm run qa:tech-debt
npm run build
```

## Fuera de alcance

- Ruleta Real Rewards.
- Móvil `100vh -> 100dvh`.
- Corrección de hooks/deps.
- Refactor de `App.tsx`.
- Europa Career.
