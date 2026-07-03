# v0.23.2a — Season Luck Wheel engine

## Objetivo

Preparar el motor lógico de la futura **Ruleta de la Suerte de temporada** antes de tocar UI, animaciones o pausa real de simulación.

Esta fase deja cerrados:

- probabilidades,
- premios,
- penalizaciones,
- textos narrativos,
- barra de precisión lógica,
- límite de uso por temporada,
- QA automática.

No implementa todavía el modal visual ni la animación de giro. Eso queda para `v0.23.2b_SEASON_LUCK_WHEEL_UI`.

## Reglas cerradas

- Máximo **1 ruleta por temporada**.
- Si se ofrece y el usuario rechaza, la ruleta queda consumida sin efecto.
- La futura UI debe pausar la simulación cuando aparezca la oferta.
- El motor devuelve `shouldPauseSimulation: true` para que la UI pueda integrarlo sin reinterpretar reglas.
- Los resultados no modifican ratings históricos ni plantillas base.
- Los cambios de media se modelan como modificadores de temporada.

## Probabilidad general

| Grupo | Probabilidad |
|---|---:|
| Positivo | 40% |
| Neutro | 40% |
| Negativo | 20% |

## Premios positivos internos

Estos porcentajes aplican dentro del bloque positivo:

| Premio | Peso interno |
|---|---:|
| `+0.5` media de temporada | 40% |
| Cambio de jugador | 30% |
| Cambio de entrenador | 20% |
| `+1.0` media de temporada | 8% |
| `+1.0` media + cambio de jugador | 2% |

## Penalizaciones internas

Estos porcentajes aplican dentro del bloque negativo:

| Penalización | Peso interno |
|---|---:|
| `-0.5` media de temporada | 90% |
| `-1.0` media de temporada | 10% |

## Barra de precisión

La fase define una barra lógica de precisión con posición `0..1`.

- Centro perfecto: más opciones positivas.
- Zona buena: mejora moderada.
- Zona equilibrada: mantiene 40/40/20.
- Zona exterior: aumenta riesgo.
- Extremos: más opciones negativas.

| Zona | Positivo | Neutro | Negativo |
|---|---:|---:|---:|
| Centro perfecto | 65% | 30% | 5% |
| Zona buena | 50% | 35% | 15% |
| Equilibrada | 40% | 40% | 20% |
| Exterior | 25% | 45% | 30% |
| Extremo | 10% | 40% | 50% |

## Eventos disparadores preparados

- Eliminación Copa del Rey.
- Eliminación europea.
- Mitad de temporada.
- Mala racha.
- Buena racha.

La integración real de esos eventos queda para la fase UI/simulación.

## Textos narrativos

La fase añade bancos de texto:

- 20 frases de aparición, repartidas por evento disparador.
- 20 frases para resultado positivo.
- 20 frases para resultado neutro.
- 20 frases para resultado negativo.

## Archivos principales

- `src/career/seasonLuckWheel.ts`
- `src/career/seasonLuckWheelText.ts`
- `scripts/qaSeasonLuckWheel.ts`

## QA

Nuevo script:

```powershell
cmd /c "npm run qa:season-luck-wheel"
```

Valida:

- suma de probabilidades 40/40/20,
- pesos internos positivos,
- pesos internos negativos,
- centro de barra mejora opciones positivas,
- extremos empeoran opciones,
- premios visibles para futura ruleta,
- máximo 1 ruleta por temporada,
- rechazo sin efecto,
- resolución de premios raros,
- `+0.5`, `+1`, `-0.5`, `-1` como deltas de temporada,
- no mutación de ratings base,
- textos mínimos completos.

## Fuera de alcance

- No hay modal visual todavía.
- No hay animación de giro todavía.
- No hay botón parar todavía.
- No se pausa la simulación real todavía.
- No se integra con eliminación real de Copa/Europa todavía.
- No se abre Europa Career todavía.
- No se tocan ratings históricos.
- No se tocan plantillas base.
- No se toca ranking local/global.
