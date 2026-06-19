# v0.12.21 — Bloqueo canónico de jugadores duplicados

## Bug

Julen Guerrero estaba ya alineado, pero el juego volvía a mostrarlo como seleccionable en otra ronda.

Esto ocurre cuando el mismo jugador histórico aparece con identificadores o nombres variantes, por ejemplo:

```text
Guerrero
Julen Guerrero
```

o si una temporada usa `playerId` distinto.

## Solución

Se refuerza `isPlayerAlreadySelected` para bloquear duplicados usando:

1. `playerId`
2. `canonicalPlayerId`, si existe
3. nombre normalizado

El nombre normalizado elimina:

- acentos
- espacios
- símbolos
- nombres comunes tipo Julen / Jose / Ander / etc.
- numerales tipo I / II / III

## Resultado esperado

Si ya tienes alineado a Guerrero:

```text
Julen Guerrero
Guerrero
Guerrero I
```

deberían aparecer bloqueados como:

```text
Este jugador ya fue seleccionado en otra temporada.
```

y no deberían poder volver a elegirse.

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\fix-v0-12-21-canonical-duplicate-player-block.ps1
npm.cmd run build
npm.cmd run dev
```
