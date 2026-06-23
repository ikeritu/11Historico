# v0.21.0c — Interseason rewards

## Objetivo

Cerrar el primer bucle de modo carrera multi-temporada sin abrir todavía ranking global, Supercopa ni Europa jugable.

## Cambios

- Si el usuario supera la temporada, aparece un botón **Continuar carrera**.
- La pantalla entre temporadas resume temporada superada, próxima temporada, clasificación europea y palmarés básico.
- Recompensas disponibles:
  - Cambiar 1 jugador.
  - Cambiar entrenador.
- Cambio de jugador:
  - El usuario elige qué jugador sale.
  - Se sortea una temporada histórica.
  - Se muestran jugadores compatibles con el hueco libre.
  - Al elegir sustituto, el equipo vuelve al resumen para jugar la siguiente temporada.
- Cambio de entrenador:
  - El entrenador actual se descarta.
  - Se vuelve directamente a la selección de entrenador.

## Límites intencionados

- Sin ranking global todavía.
- Sin Supercopa jugable todavía.
- Sin Europa jugable todavía.
- El premio de cambio de formación compatible por ganar Liga queda señalado, pero no se fuerza en esta subfase para no romper el bucle estable.

## Validación mínima

- `npm run build` debe pasar.
- Una carrera superada debe permitir continuar.
- El cambio de jugador debe dejar el once en 11/11 y volver al resumen.
- El cambio de entrenador debe ir a selección de entrenador y continuar flujo.
