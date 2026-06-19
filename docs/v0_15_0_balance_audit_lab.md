# v0.15.0 — Laboratorio de balance Liga/Copa

## Objetivo

Preparar la fase de balance sin tocar todavía el motor deportivo. Esta versión añade una herramienta interna para ejecutar muchas temporadas completas con el once actual y detectar patrones raros en Liga/Copa antes de modificar parámetros.

## Cambios incluidos

- Añadido componente interno `BalanceAuditPanel`.
- Añadida hoja de estilos `BalanceAuditPanel.css`.
- Integrado el panel al final de la pantalla de simulación de temporada.
- Permite ejecutar auditorías de:
  - 10 simulaciones.
  - 25 simulaciones.
  - 50 simulaciones.
- Cada simulación crea una temporada nueva desde cero y registra:
  - Campeón de Liga.
  - Posición y puntos del Athletic Club Histórico.
  - Campeón de Copa.
  - Ronda/estado copero del Athletic.
  - Tres descensos.
  - Alertas rápidas de balance.

## Alertas incluidas

- Villarreal desciende.
- Athletic termina por debajo del 10.º puesto.
- Liga y Copa caen en patrón de monopolio de élite.

## Qué NO se ha tocado

- Motor de partidos.
- Ratings.
- Draft.
- Modos Fácil/Normal/Leyenda.
- Simulación visual partido a partido.
- Parámetros de Copa.
- Parámetros de Liga.

## Uso recomendado

1. Crear un once.
2. Ir a la pantalla de simulación.
3. Abrir la sección `Auditoría de balance Liga/Copa`.
4. Ejecutar primero `10 sims`.
5. Si hay patrones sospechosos, ejecutar `25 sims`.
6. Usar `50 sims` solo para confirmar tendencias.

## Criterio de decisión para próximas versiones

- Si Villarreal desciende muchas veces, ajustar protección de equipos 80+.
- Si Madrid/Barça/Atlético monopolizan Copa, subir caos copero o boost local modesto.
- Si Athletic gana demasiado en Modo Fácil, revisar bonus del modo.
- Si Athletic cae demasiado en Modo Leyenda, decidir si es intencionado o excesivo.
- Si Copa tiene campeones variados y Liga mantiene jerarquía, no tocar.
