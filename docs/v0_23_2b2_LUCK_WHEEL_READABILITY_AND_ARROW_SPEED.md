# v0.23.2b2 — Luck Wheel Readability and Arrow Speed

## Objetivo

Pulir la legibilidad y la sensación jugable de la ruleta de temporada sin tocar las probabilidades reales del motor.

## Cambios

- Sustituye textos largos dentro de los 12 quesitos por etiquetas cortas.
- Mantiene una leyenda de premios completos para que el usuario entienda cada abreviatura.
- Mejora la nitidez de los textos del disco con mayor tamaño, contraste, suavizado y `text-rendering`.
- Añade velocidad progresiva a la flecha de precisión:
  - empieza más lenta,
  - acelera con el paso del tiempo,
  - queda limitada por una velocidad máxima para no hacerla injugable.
- Mantiene el puntero fijo y la rueda girando por debajo.
- Mantiene la coherencia entre resultado lógico, premio visible y segmento final.

## Qué no cambia

- No cambia las probabilidades reales 40% positivo / 40% neutro / 20% negativo.
- No cambia los pesos internos de premios positivos o negativos.
- No cambia ratings históricos.
- No cambia plantillas base.
- No cambia ranking local ni ranking global.
- No cambia el roadmap de Europa Career.
- No ejecuta todavía los cambios reales de jugador o entrenador.

## QA

- `npm run qa:version`
- `npm run qa:season-luck-wheel`
- `npm run qa:season-luck-wheel-ui`
- `npm run qa:release-stabilization`
- `npm run qa:agentjacking`
- `npm run qa:tech-debt`
- `npm run build`
