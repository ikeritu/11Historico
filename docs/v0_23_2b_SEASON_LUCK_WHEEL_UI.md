# v0.23.2b — Season Luck Wheel UI

## Objetivo

Integrar visualmente la Ruleta de la Suerte de temporada preparada en `v0.23.2a` sin tocar ratings históricos, plantillas base ni balance estructural.

## Alcance

- Añade `SeasonLuckWheelModal` con modal contextual de ruleta.
- Muestra premios visibles en la ruleta:
  - `+0.5 media`
  - `Cambio de jugador`
  - `Cambio de entrenador`
  - `+1.0 media`
  - `+1.0 media + jugador`
  - `Sin efecto`
  - `-0.5 media`
  - `-1.0 media`
- Añade animación de giro de la ruleta.
- Añade barra de precisión con flecha móvil y botón `Parar flecha`.
- El centro de la barra aumenta opciones positivas; los extremos aumentan opciones negativas.
- Añade botones `Jugar ruleta` y `No jugar`.
- Si la ruleta aparece durante simulación automática, la simulación se detiene.
- Integra triggers iniciales:
  - mitad de temporada,
  - eliminación en Copa del Rey.
- Persiste el estado de ruleta dentro del contexto de liga.
- Aplica `ratingDelta` al rating usado por la simulación de temporada.

## Limitaciones deliberadas

- El cambio real de jugador y el cambio real de entrenador quedan registrados como premio, pero su ejecución jugable queda para una iteración posterior.
- No se toca Europa todavía.
- No se modifica el rating histórico de jugadores ni entrenadores.
- No se modifica la plantilla base.
- No se modifica ranking local/global.

## QA

Nueva QA:

```powershell
cmd /c "npm run qa:season-luck-wheel-ui"
```

Integrada en:

```powershell
cmd /c "npm run qa:tech-debt"
```

Validaciones cubiertas:

- Existe modal y CSS.
- El modal permite jugar, rechazar, parar y continuar.
- La ruleta usa premios del motor v0.23.2a.
- Existe animación de giro.
- Existe barra de precisión y marcador/flecha.
- `LeagueSimulatorView` integra modal, pausa, triggers y efecto de rating.
- El contexto de liga persiste `seasonLuckWheel`.
