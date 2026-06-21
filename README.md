# Futbol11 — Athletic Club Histórico

Juego web en React + TypeScript para construir un once histórico del Athletic Club, elegir entrenador y simular LaLiga 25/26 + Copa del Rey.

## Estado actual

Versión estable de trabajo: `v0.16.5_UX_CLEANUP_BETA_READINESS`.

Base cerrada antes de esta fase:

- `v0.15.8_BALANCE_LIGA_OK`: balance de Liga aceptado y congelado.
- `v0.16.0_COPA_DEL_REY_REALISTA_OK`: Copa del Rey realista aceptada y congelada.

No reabrir balance de Liga/Copa salvo decisión expresa.

## Incluye

- Histórico Athletic 1928/29–2025/26, sin temporadas sin Liga nacional.
- Modo Fácil con selector de rangos históricos.
- Modo Normal sin cambios de lógica.
- Modo Leyenda.
- Draft histórico con variedad de temporadas.
- Validación de posiciones y jugadores repetidos.
- Entrenadores históricos.
- Simulación visual con botón único `Simular` / `Parar simulación`.
- LaLiga 25/26 balanceada.
- Copa del Rey con factor sorpresa.
- Pantalla final con clasificación, Copa, historial local y mejor partida.
- Auditorías por PowerShell.
- Versión visible en interfaz.

## Requisitos

- Node.js 20 o superior recomendado.
- npm.

## Instalación

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

## Flujo de juego

1. Elegir dificultad.
2. En Modo Fácil, elegir rango de temporadas.
3. Elegir formación.
4. Completar el draft de 11 jugadores.
5. Elegir entrenador.
6. Revisar el Athletic Club Histórico creado.
7. Simular Liga y Copa.
8. Revisar resultado final, clasificación e historial.

## Mantenimiento

No subir al repositorio:

- `node_modules/`
- carpetas `_export*`
- archivos `.zip` o `.rar`

`dist/` puede regenerarse con `npm.cmd run build`.

## Nota sobre datos

Las plantillas combinan fuentes oficiales, referencias históricas y estimaciones para gameplay. Los ratings no son datos oficiales: son valores internos para equilibrar el juego.


## Beta privada local v0.17.0

Esta versión está pensada para prueba online pública.

Comandos principales en Windows PowerShell:

```powershell
npm.cmd install
npm.cmd run dev
```

Auditorías disponibles:

```powershell
npm.cmd run audit:balance:100
npm.cmd run audit:copa:100
```

Documentos útiles:

- `docs/v0_17_0_checklist_tester_externo.md`
- `docs/v0_17_0_feedback_template.md`

Liga y Copa están cerradas. No reabrir balance salvo decisión expresa.


## Beta online v0.18.0

Esta versión está preparada para publicarse en GitHub Pages.

Comandos principales:

```powershell
npm.cmd install
npm.cmd run build
npm.cmd run dev
```

Despliegue recomendado:

1. Subir el proyecto a un repositorio de GitHub.
2. Activar GitHub Pages con origen **GitHub Actions**.
3. Hacer push a `main`.
4. El workflow `.github/workflows/deploy.yml` compila y publica la carpeta `dist`.

Documentación:

- `docs/v0_18_0_BETA_ONLINE_GITHUB_PAGES_READY.md`
- `docs/v0_18_0_github_pages_deploy.md`
