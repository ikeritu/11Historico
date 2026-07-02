# v0.22.9b — Special reward player-only fix

## Objetivo

Corregir dos problemas detectados en validación manual de `v0.22.9a`:

1. El premio especial `Jugador + alineación` obligaba a cambiar de formación.
2. En un cambio a sistemas con más ataque, un `MP` puro podía terminar ocupando un hueco de delantero.

## Cambios

- Añadida opción explícita para mantener la formación actual y cambiar solo el jugador retirado.
- La opción aparece en la pantalla de `Cambiar jugador o formación compatible` como `Mantener formación`.
- Si se mantiene formación, el draft posterior cubre exactamente el hueco del jugador retirado.
- Añadida comprobación estricta de línea natural para el draft posterior a un cambio de formación.
- Un jugador solo puede cubrir el hueco si la posición asignada pertenece a la línea abierta.
- `resolvePlayerSlotPlacement` prioriza posiciones naturales de la línea del slot antes de comodines tácticos.

## QA añadida

- Premio especial permite mantener formación y solo cambiar jugador.
- Mantener formación conserva 10 jugadores y deja exactamente 1 hueco.
- El hueco corresponde al slot retirado.
- Un sustituto natural de la línea abierta encaja.
- Un jugador de otra línea no encaja en el hueco.
- Un `MP` puro no puede ser colocado como delantero en draft estricto.
- Un jugador `MP/SD` sí puede ser asignado como `SD` natural.

## No tocado

- Balance.
- Ratings históricos.
- Plantillas.
- Simulación de Liga/Copa.
- Ranking local.
