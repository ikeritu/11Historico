# Futbol11 — Once histórico Zurigorri

Juego web en React + TypeScript para construir un once histórico del Athletic Club, elegir entrenador y simular LaLiga 25/26 + Copa del Rey.

## Estado actual

Versión pública actual: `v0.22.0b_SUPERCOPA_BASIC`.

Base jugable cerrada:

- `v0.15.8_BALANCE_LIGA_OK`: balance de Liga aceptado y congelado.
- `v0.16.0_COPA_DEL_REY_REALISTA_OK`: Copa del Rey realista aceptada y congelada.
- `v0.18.7_PUBLIC_COPY_AND_FEEDBACK_FORM`: beta online con formulario público de feedback.

No reabrir balance de Liga/Copa salvo decisión expresa.

## Enlace online

GitHub Pages:

```text
https://ikeritu.github.io/11Historico/
```

## Qué incluye

- Histórico Athletic 1928/29–2025/26, sin temporadas sin Liga nacional.
- Modo Fácil con selector de rangos históricos.
- Modo Normal.
- Modo Leyenda.
- Draft histórico con variedad de temporadas.
- Validación de posiciones y jugadores repetidos.
- Entrenadores históricos con bonus visible y ajustado.
- Simulación visual con botón único `Simular` / `Parar simulación`.
- LaLiga 25/26 balanceada.
- Copa del Rey con factor sorpresa.
- Resultado final con clasificación, Copa, historial del navegador y mejor partida.
- UX móvil pulida para draft, entrenador y resultado final.
- Botón de feedback público mediante Google Forms.
- Botón para compartir el juego.
- Entrada informativa de Modo carrera Athletic en preparación.
- Reglas puras del modo carrera preparadas para el MVP jugable.
- Flujo básico de carrera con copy de objetivo corregido y techo de media ajustado.
- Flujo básico de una temporada de carrera conectado a Liga y Copa.
- Supercopa básica en modo carrera con 1.º/2.º de Liga + finalistas de Copa.

## Cómo se juega

1. Elige dificultad.
2. En Modo Fácil, elige rango de temporadas.
3. Elige formación.
4. Completa el draft de 11 jugadores.
5. Elige entrenador.
6. Revisa el Athletic Club histórico creado.
7. Simula Liga y Copa.
8. Consulta el resultado final y comparte feedback si quieres.

## Requisitos para desarrollo

- Node.js 20 o superior recomendado.
- npm.

## Instalación local en Windows

```powershell
cd "D:\Proyectos\⚽ Futbol11"
npm.cmd install
```

## Arranque local

```powershell
npm.cmd run dev
```

Abre la URL que indique Vite, normalmente:

```text
http://localhost:5173/
```

## Build de producción

```powershell
npm.cmd run build
```

## Auditorías

Balance Liga:

```powershell
npm.cmd run audit:balance:100
```

Copa del Rey:

```powershell
npm.cmd run audit:copa:100
```

## Despliegue en GitHub Pages

El repositorio debe usar:

```text
Settings → Pages → Source: GitHub Actions
```

El workflow `.github/workflows/deploy.yml` compila el proyecto y publica `dist/`.

## Mantenimiento

No subir al repositorio:

- `node_modules/`
- carpetas `_export*`
- archivos `.zip` o `.rar`

`dist/` puede regenerarse con `npm.cmd run build`.

## Nota sobre datos

Las plantillas combinan fuentes oficiales, referencias históricas y estimaciones para gameplay. Los ratings no son datos oficiales: son valores internos para equilibrar el juego.

## Changelog breve

### v0.21.0k — Career preview cleanup

- Corrige el bloqueo al simular la segunda temporada de carrera.
- Genera el calendario de carrera con la Primera actual tras ascensos/descensos.
- Permite que los ascendidos compitan correctamente en Liga.

### v0.21.0e — Career effective rating balance

- Añade compresión de rating efectiva solo en modo carrera: los ratings visibles se mantienen intactos, pero los valores superiores a 80 se simulan con la fórmula `80 + (rating - 80) * 0.55`.
- La compresión se aplica únicamente al rating usado por la simulación de Liga/Copa en carrera; partida rápida y ratings históricos visibles no se rebajan.
- Objetivo: reducir dobletes demasiado frecuentes sin tocar el balance histórico ya cerrado.

### v0.21.0d — Critical audit fixes

- Modo carrera básico jugable para una temporada.
- Inicio desde 2025/26 reutilizando formación, draft, entrenador, Liga y Copa.
- Evaluación de objetivo al final de temporada: Europa o Copa; descenso = Game Over.
- Pantallas básicas de temporada superada y Game Over de carrera.
- El entrenador se valida directamente al seleccionarlo, sin botón extra de confirmación.
- Sin recompensas, Supercopa, ranking global ni Europa jugable todavía.

### v0.21.0a — Career rules skeleton

- Añadidos tipos mínimos de modo carrera.
- Añadidas reglas puras para objetivo, clasificación europea, dificultad, palmarés y cambio de formación compatible.
- Documentación interna de carrera en `docs/v0_21_0a_CAREER_RULES_SKELETON.md`.
- Sin integrar todavía flujo jugable de carrera, ranking global ni Google Apps Script.
- Sin cambios en motor, Liga, Copa, ratings, draft ni simulación.

### v0.20.0 — Pre-career foundation

- Entrada visual para `Modo carrera Athletic`.
- Pantalla informativa con reglas cerradas de carrera.
- Documentación interna de carrera en `docs/v0_20_0_PRE_CAREER_FOUNDATION.md`.
- Sin cambios en motor, Liga, Copa, ratings, draft ni simulación.

### v0.19.0 — Beta pública estable

- Portada orientada a usuario público.
- Estado visible cambiado a `Beta pública`.
- Botón `Compartir juego`.
- Feedback público mediante Google Forms.
- README público actualizado.
- Changelog simple incorporado.
- Sin cambios en motor, Liga, Copa, ratings, draft ni simulación.

### v0.18.x — Beta online

- Publicación en GitHub Pages.
- Layout móvil del draft mejorado.
- Atajo móvil para ver formación.
- Bonus de entrenador corregido y explicado.
- Resultado final móvil más compacto.
- Reset de scroll al cambiar de fase.
- Formulario público de feedback.

### v0.16.x — Base UX y beta local

- Copa del Rey realista cerrada.
- Pantalla final y portada pulidas.
- Botones de apoyo integrados.

### v0.15.x — Balance Liga cerrado

- Balance de Liga validado y congelado.


## v0.21.0k — Career preview cleanup

La portada de escritorio se simplifica en dos columnas: presentación del juego a la izquierda y acciones principales a la derecha. No toca lógica de simulación ni modo carrera.

## v0.21.0l — Final summary polish

- Pulida la pantalla final de temporada para dar más sensación de cierre/recompensa.
- Añadido titular más claro en carrera, subtítulo de objetivo cumplido y CTAs superiores compactos.
- Reordenadas las estadísticas clave, Copa, entrenador, rating y jugadores destacados.
- No toca simulación, balance, carrera, ascensos/descensos ni calendario dinámico.

