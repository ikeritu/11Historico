# v0.15.3 · CLI profiles + Villarreal soft fix

## Objetivo

Restaurar la pantalla de simulación de temporada a la versión correcta de `v0.14.9_SIMULACION_SIMPLE_LENTA_OK`, sin el panel visual de auditoría dentro del juego, y mantener la auditoría de balance únicamente por PowerShell.

## Cambios

- La pantalla de simulación vuelve a ser la versión limpia:
  - Botón principal `Simular`.
  - Durante la simulación cambia a `Parar simulación`.
  - Ritmo visual lento de 1300 ms.
  - Se mantiene `Saltar hasta próximo evento`.
  - No aparece la herramienta interna de auditoría en la interfaz.

- Añadido comando CLI:
  - `npm run audit:balance`

- Añadidos perfiles de auditoría:
  - `--profile=legendary`: once histórico top, útil para probar techo de rendimiento.
  - `--profile=balanced`: once fuerte pero humano, perfil por defecto recomendado para balance.
  - `--profile=random`: once viable con aleatoriedad reproducible.

- Soft fix Villarreal:
  - Villarreal sigue pudiendo hacer mala temporada.
  - Se reduce la cola negativa de forma para evitar descensos demasiado frecuentes.
  - No se convierte en equipo inmune ni top 4 garantizado.

## Comandos recomendados

```powershell
npm.cmd run audit:balance -- --sims=50 --profile=balanced --difficulty=normal --range=all
npm.cmd run audit:balance -- --sims=50 --profile=legendary --difficulty=normal --range=all
npm.cmd run audit:balance -- --sims=50 --profile=random --difficulty=normal --range=all
```

## Validación

- `npm run build`: OK.
- `npm run audit:balance -- --sims=5 --profile=balanced --difficulty=normal --range=all`: OK.
- `npm run audit:balance -- --sims=5 --profile=random --difficulty=normal --range=all`: OK.
