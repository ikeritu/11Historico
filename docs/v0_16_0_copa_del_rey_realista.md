# v0.16.0 · Copa del Rey realista

Base: `v0.15.8_BALANCE_LIGA_OK_BASE_LIMPIA`.

## Objetivo

Mejorar la sensación copera sin reabrir el balance de Liga:

- Más riesgo en primeras rondas.
- Más peligro de equipos modestos jugando en casa.
- Menos eliminatorias de trámite para favoritos fuera de casa.
- Mantener variedad de campeones sin convertir la Copa en una lotería.

## Cambios

- Ajustado `getCupRoundChaos` con más volatilidad en dieciseisavos/octavos y leve ajuste en rondas finales.
- Reforzado el boost de underdog local, especialmente si el favorito juega fuera.
- Ajustado el desempate de Copa para que un pequeño local que aguanta el empate tenga más opciones reales de sorpresa.
- Añadido comando de auditoría copera:

```powershell
npm.cmd run audit:copa:100
```

## No tocado

- Balance de Liga cerrado en v0.15.8.
- Ratings históricos del Athletic.
- Draft.
- Modos Fácil / Normal / Leyenda.
- Simulación visual.
- Ajustes de descensos ya cerrados.
