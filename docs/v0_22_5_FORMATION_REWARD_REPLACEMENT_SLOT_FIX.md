# v0.22.5 — Formation reward replacement slot fix

## Objetivo

Corregir el premio especial de cambio de formación para que no coloque jugadores fuera de rol tras elegir una formación nueva.

## Flujo validado

1. El usuario elige el jugador que sale.
2. Con ese jugador fuera, se muestran formaciones compatibles con los diez jugadores restantes y con un hueco válido para el jugador eliminado.
3. El usuario confirma la nueva alineación.
4. Se hace un draft de sustituto.
5. El usuario aplica el cambio o cancela y avanza a la siguiente temporada conservando plantilla y formación originales.

## Restricción añadida

En el draft posterior al cambio de formación, el sustituto debe tener una posición natural en la línea abierta. Esto evita casos como forzar un mediapunta puro en una línea de ataque solo porque una regla secundaria lo permita como emergencia.

## No toca

- Simulación.
- Balance Liga/Copa.
- Supercopa.
- Ascensos/descensos.
- Calendario dinámico.
- Ratings históricos.
