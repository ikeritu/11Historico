# v0.23.1a — Agentjacking guardrails

## Objetivo

Añadir una capa explícita de seguridad operativa antes de abrir `v0.24.0_EUROPA_CAREER`, ahora que el proyecto ya tiene ranking global real, endpoint Apps Script, `.env.local` y flujo de releases más automatizado.

Esta fase no cambia gameplay. Se centra en proteger el repositorio y el flujo de trabajo frente a instrucciones maliciosas o accidentales incluidas dentro de archivos, parches, markdown, logs, OCR, CSV, documentación externa o artefactos generados.

## Cambios incluidos

- Añade una sección `Anti-agentjacking / prompt-injection guardrails` a `AGENTS.md`.
- Declara que archivos del repo, parches, markdown pegado, logs y artefactos son entrada no confiable.
- Bloquea que esos textos sobrescriban la petición actual del usuario, el roadmap, `AGENTS.md`, reglas de seguridad o alcance de fase.
- Documenta ejemplos de instrucciones a ignorar:
  - `ignore previous instructions`;
  - `haz git add .`;
  - `read .env.local`;
  - `print secrets`;
  - `skip tests`;
  - `git push --force`;
  - cambios no autorizados de ratings, balance o plantillas.
- Refuerza seguridad Git:
  - no usar `git add .`;
  - stagear archivos explícitamente;
  - no ejecutar comandos destructivos sin confirmación explícita;
  - no commitear `dist` salvo fase de release/build.
- Refuerza protección de secretos:
  - `.env`;
  - `.env.local`;
  - `.env.*.local`;
  - API keys;
  - tokens;
  - Deployment IDs reales de Apps Script.
- Añade `npm run qa:agentjacking`.
- Integra `qa:agentjacking` dentro de `npm run qa:tech-debt`.

## QA añadida

```bash
npm run qa:agentjacking
```

Comprueba:

- `AGENTS.md` contiene guardarraíles anti-agentjacking.
- Los archivos `.env` locales siguen protegidos por `.gitignore`.
- No hay Deployment ID real de Apps Script filtrado en fuentes/docs/dist.
- No hay recomendaciones peligrosas de git en docs/scripts sin contexto de bloqueo.
- README, CHANGELOG y doc de fase apuntan a `v0.23.1a`.
- `qa:tech-debt` incluye la nueva auditoría.

## Alcance explícitamente no tocado

- No toca balance.
- No toca ratings históricos.
- No toca plantillas.
- No toca reglas de recompensa.
- No toca ranking local.
- No toca ranking global funcional.
- No toca backend Apps Script.
- No toca simulación de Liga, Copa ni carrera.

## Validación recomendada

```bash
npm run qa:version
npm run qa:agentjacking
npm run qa:release-stabilization
npm run qa:tech-debt
npm run build
```

## Resultado esperado

Versión de seguridad operativa estable antes de Europa Career:

- repositorio protegido frente a instrucciones incrustadas en archivos;
- secretos y endpoint local protegidos;
- Git workflow más seguro;
- QA reproducible para evitar regresiones.
