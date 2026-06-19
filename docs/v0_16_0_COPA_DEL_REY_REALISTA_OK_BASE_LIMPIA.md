# Futbol11 · v0.16.0_COPA_DEL_REY_REALISTA_OK_BASE_LIMPIA

## Estado
Versión congelada como base limpia validada tras cerrar la fase de Copa del Rey realista.

## Base de partida
- `v0.15.8_BALANCE_LIGA_OK_BASE_LIMPIA`
- Balance de Liga cerrado por decisión del usuario.
- No reabrir Valencia ni zona baja salvo petición expresa del usuario.

## Cambios consolidados en v0.16.0
- Copa del Rey más realista.
- Mayor peligro en dieciseisavos y octavos.
- Mayor factor sorpresa para equipos modestos.
- Mayor efecto de localía copera para equipos pequeños.
- Favoritos fuera de casa algo menos seguros.
- Finales y semifinales menos automáticas para la élite.
- Auditoría específica de Copa por PowerShell.

## Comandos de auditoría

```powershell
npm.cmd run audit:copa:100
```

```powershell
npm.cmd run audit:balance:100
```

## Validación de Copa aceptada
Último test aceptado por el usuario con perfil `balanced`, 100 simulaciones:

- Athletic campeón de Copa: 18/100.
- Athletic eliminado en dieciseisavos: 33/100.
- Athletic eliminado en octavos: 16/100.
- Athletic eliminado antes de cuartos: 49/100.
- Copas ganadas por élite: 35/100.
- Campeones variados: Athletic, Atlético, Real Madrid, Villarreal, FC Barcelona, Betis, Osasuna, Celta.

## Criterio de cierre
La Copa queda aceptada porque:

- Athletic puede ganar, pero ya no tiene autopista.
- Hay riesgo real de eliminación temprana.
- Madrid y Barça no monopolizan.
- Equipos medios pueden ganar o llegar lejos.
- La Liga no se reabre.

## No tocar salvo nueva decisión expresa
- Balance de Liga.
- Valencia.
- Villarreal / Betis / Rayo.
- Athletic histórico.
- Ratings base.
- Draft.
- Modos Fácil / Normal / Leyenda.
- Simulación visual.

## Siguiente fase recomendada
`v0.16.5_UX_CLEANUP_OK`

Objetivo: limpieza visual y experiencia de usuario antes de beta privada.
