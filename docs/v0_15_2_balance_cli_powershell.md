# v0.15.2 — Auditoría de balance por PowerShell

## Objetivo

Permitir ejecutar simulaciones masivas sin abrir el navegador.

## Comandos añadidos

```powershell
npm run audit:balance
npm run audit:balance -- --sims=100 --difficulty=normal --range=recent
npm run audit:balance -- --sims=250 --difficulty=leyenda --out=reports/balance_250.json --csv=reports/balance_250.csv
```

## Qué hace

- Construye un once automático competitivo con la formación indicada.
- Aplica dificultad: `facil`, `normal` o `leyenda`.
- Simula temporadas completas de Liga y Copa.
- Muestra por consola:
  - media de posición del Athletic,
  - puntos medios,
  - ligas/copas del Athletic,
  - campeones más repetidos,
  - descensos de Villarreal,
  - alertas rápidas de balance.
- Opcionalmente exporta JSON y CSV.

## Nota técnica

El comando no usa el once que esté en el navegador, porque PowerShell no puede leer el estado de una partida en localStorage. Para esta fase de balance usa un once automático construido desde la base histórica.
