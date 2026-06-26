# v0.22.1 — Formation change reward

## Objetivo

Añadir el cambio de formación como recompensa especial sin abrir un editor libre ni tocar el balance del simulador.

## Regla de desbloqueo

El botón **Cambiar formación** aparece solo si se cumple uno de estos casos:

- Athletic gana Liga.
- Athletic gana Copa del Rey.
- Athletic gana Supercopa y además se clasifica para Europa por Liga.

La Supercopa ganada por sí sola no salva la temporada y no desbloquea recompensa si no se cumple el objetivo europeo.

## Compatibilidad

Solo se muestran formaciones compatibles con la actual:

- siempre 1 portero,
- máximo 1 jugador movido entre defensa, medio y ataque,
- los 11 jugadores actuales deben poder recolocarse en puestos válidos.

## Alcance

No toca:

- simulación,
- balance Liga/Copa,
- rating efectivo de carrera,
- ascensos/descensos,
- Supercopa,
- ratings históricos.

## Validación

Build validado con `npm run build` en `v0.22.1`.
