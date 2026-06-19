# v0.12.5 — Copa del Rey realista

## Objetivo

Hacer que la Copa del Rey no se comporte como una liga, sino como una competición de partido único con más opciones de sorpresa.

## Cambios principales

### Sorteo de rivales

Antes el camino de Copa era demasiado fijo porque usaba semillas constantes.

Ahora:
- El camino de Copa se genera con una semilla variable.
- Los rivales salen de forma más aleatoria.
- No se repiten rivales ya usados.
- Los equipos modestos pueden aparecer también en rondas medias/altas.

### Campo del equipo pequeño

Ahora, si el rival es modesto, aumenta la probabilidad de que el Athletic juegue fuera:

- Rival <= 66: muchas opciones de jugar fuera.
- Rival <= 72: bastante probable jugar fuera.
- Rival <= 78: probabilidad algo superior de jugar fuera.

Esto busca el efecto típico de Copa: campo pequeño, partido incómodo y ambiente difícil.

### Factor sorpresa

Se añade lógica específica de Copa:

- Más varianza en dieciseisavos y octavos.
- Los pequeños en casa reciben boost competitivo.
- El favorito fuera de casa puede perder algo de control.
- Las rondas finales tienen menos caos que las primeras.
- En partidos entre equipos IA también se aplica más varianza copera.

## Factores añadidos

- `getCupRoundChaos`
- `getCupUnderdogBoost`
- `applyCupRivalContext`
- `getCupTeamExpectedGoals`

## Resultado esperado

- No siempre deberían llegar los grandes a semifinal/final.
- Un equipo pequeño en casa puede dar una sorpresa real.
- El Athletic sigue siendo favorito contra rivales inferiores, pero ya no es automático.
