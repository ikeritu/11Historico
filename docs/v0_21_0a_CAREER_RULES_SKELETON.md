# v0.21.0a — Career rules skeleton

## Objetivo

Preparar las reglas puras del futuro `v0.21.0_CAREER_MVP` sin tocar todavía el flujo jugable ni el simulador validado.

## Alcance aplicado

- Tipos mínimos de modo carrera en `src/types/career.ts`.
- Reglas puras de carrera en `src/career/careerRules.ts`.
- Versión visible actualizada a `v0.21.0a`.
- Documentación de reglas y límites del MVP.

## Reglas cerradas

### Continuidad

El Athletic continúa si cumple al menos una condición:

1. Clasifica para Champions, Europa League o Conference.
2. Gana la Copa del Rey.

Condición dura: si desciende, es Game Over aunque haya ganado Copa.

### Clasificación europea MVP

- 1º-4º: Champions.
- 5º: Europa League.
- 6º: Conference.
- Si el Athletic gana Copa y ya está en Champions: 5º y 6º van a Europa League, 7º a Conference.

### Supercopa

- Si gana Liga o Copa, juega Supercopa al inicio de la siguiente temporada.
- La Supercopa cuenta para palmarés.
- La Supercopa no sirve para salvar temporada.

### Dificultad

Bonus acumulado de rivales:

- Temporadas 1-3 completadas: +0.5 por temporada.
- Temporadas 4-6 completadas: +1 por temporada.
- Temporada 7+ completada: +1.5 por temporada.
- Límite máximo: +10.

Copa:

- +0.15 por temporada completada.

### Palmarés

- Champions: 10 puntos.
- Liga: 8 puntos.
- Europa League: 6 puntos.
- Copa del Rey: 5 puntos.
- Conference: 4 puntos.
- Supercopa: 2 puntos.

### Cambio de formación compatible

Una formación nueva es compatible si mantiene un portero y exige como máximo:

- quitar un jugador de una línea;
- añadir un jugador en otra línea.

Ejemplo válido: `5-3-2` a `4-3-3`.

Ejemplo no válido: `5-3-2` a `3-4-3`.

## Qué queda fuera

- Modo carrera jugable completo.
- Pantalla entre temporadas funcional.
- Cambio real de jugador.
- Cambio real de entrenador.
- Supercopa jugable.
- Ranking global.
- Google Apps Script.
- Europa jugable.

## Qué no se toca

- Ratings.
- Plantillas históricas.
- Balance de Liga.
- Copa del Rey.
- Draft validado.
- Simulación de partida rápida.
- Motor de partidos.
