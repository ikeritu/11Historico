# v0.18.4 — UI Clarity and Mobile Results Polish

## Objetivo

Pulido visual de beta online centrado en dos puntos:

1. Explicar mejor el impacto del entrenador tras el ajuste de bonus de `v0.18.3`.
2. Hacer más cómoda la pantalla de resultado final en móvil.

## Cambios incluidos

### Claridad del entrenador

- Las tarjetas de entrenador muestran ahora un bloque específico de bonus:
  - Bonus base `+1`, `+2` o `+3` según media del entrenador.
  - Especialidad de competición si existe:
    - Liga: `+1 solo en Liga`.
    - Copa: `+1 solo en Copa`.
    - Europa: `+1 solo en Europa`.
- El banner de entrenador seleccionado también muestra el bonus base.
- En la pantalla final se añade un desglose:
  - Media XI.
  - Bonus base del entrenador.
  - Media visible del equipo.
  - Media aplicada para Liga.
  - Media aplicada para Copa.
  - Media aplicada para Europa futura.

### Resultado final móvil

- La clasificación final en móvil pasa a mostrarse como tarjetas compactas.
- La tabla completa de escritorio se conserva para pantallas grandes.
- Se reduce altura visual de hero, estadísticas y acordeones en móvil.
- Se añade padding inferior seguro para barras del navegador móvil.
- El bloque de Palmarés queda cerrado por defecto para reducir scroll inicial.

## No tocado

- Motor de Liga.
- Motor de Copa.
- Ratings de jugadores.
- Balance de descensos.
- Lógica del draft.
- Simulación.
- Auditorías PowerShell.

## Validación recomendada

```bash
npm install
npm run build
```

Después revisar en móvil:

- Selección de entrenador.
- Resumen final.
- Tabla de clasificación final.
- Acordeones finales.
