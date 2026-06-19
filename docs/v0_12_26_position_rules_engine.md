# v0.12.26 — Motor único de compatibilidad de posiciones

## Problema real corregido

El error no era Muguerza, Ander Herrera o Roberto. El error era arquitectónico:

```text
El draft permitía colocar un jugador usando una regla.
App.tsx volvía a validar el once usando otra regla distinta.
```

Eso generaba mensajes falsos como:

```text
Muguerza no encaja en el perfil táctico DFC-I.
Ander Herrera no encaja en el perfil táctico MC.
Roberto no encaja en el perfil táctico MCD.
```

## Solución aplicada

Se crea un único motor:

```text
src/domain/positionRules.ts
```

Con estas funciones:

```ts
resolvePlayerSlotPlacement(player, slot)
canPlayerFillSlot(player, slot)
getAvailableSlotsForPlayer({ player, formation, selectedPlayers })
isPlayerAlreadySelected(player, selectedPlayers)
getPlayerIdentityKey(player)
```

Ahora la misma regla se usa para:

```text
- mostrar slots compatibles
- seleccionar jugador
- colocar jugador
- validar el once final
- limpiar jugadores inválidos
- bloquear duplicados
```

## Archivos sustituidos

```text
src/domain/positionRules.ts
src/App.tsx
src/components/PlayerRound.tsx
src/simulation/teamRating.ts
```

## Regla de oro

```text
Si el draft deja colocar un jugador, la validación final no puede rechazarlo después.
```

## Cambios importantes

### App.tsx

Se elimina la validación dura basada en `tacticalSlotLabels.includes(slot.label)`.

Antes:

```text
tacticalSlotLabels debía coincidir literalmente con el slot.
```

Ahora:

```text
validateSelectedTeam usa resolvePlayerSlotPlacement.
sanitizeSelectedPlayers usa resolvePlayerSlotPlacement.
```

### PlayerRound.tsx

Se elimina la función local `getValidPositionForSlot`.

Ahora `handleSlotClick` usa:

```ts
const placement = resolvePlayerSlotPlacement(selectedPlayer, slot);
```

### teamRating.ts

Las funciones legacy quedan como wrappers para no romper imports existentes:

```ts
canPlayerFillSlot
getAvailableSlotsForPlayer
isPlayerAlreadySelected
```

pero la regla real vive en `domain/positionRules.ts`.

## Pruebas recomendadas

```text
1. Formación 3-6-1.
2. Colocar Muguerza en DFC-I.
3. Colocar Ander Herrera en MC.
4. Colocar Roberto en MCD.
5. Completar 11/11.
6. Pulsar continuar.
```

Resultado esperado:

```text
No debe aparecer "Revisa tu once antes de continuar" por falsos errores de perfil táctico.
```

Otros casos:

```text
Jugador duplicado real -> debe bloquearse.
Jugador sin hueco libre -> debe bloquearse.
Susaeta ED/MD con hueco MD -> debe colocarse.
Endika ED/DC con hueco MD -> no debe colocarse en MD.
```

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .pply-v0-12-26-position-rules-engine.ps1
npm.cmd run build
npm.cmd run dev
```
