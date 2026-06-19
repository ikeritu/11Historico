# v0.13.0c — Transform raw postwar players to makePlayer

## Problema

El parche v0.13.0 insertó los jugadores de 1939/40-1949/50 como objetos simples, pero el tipo `PlayerSeason` exige campos generados por `makePlayer(...)`.

Error típico:

```text
TS2740: Type '{ name: string; positions: PlayerPosition[]; overall: number; ... }'
is missing the following properties from type 'PlayerSeason':
id, playerId, canonicalPlayerId, season, ...
```

## Solución

Convierte únicamente las líneas de jugador simple dentro de las temporadas:

```text
1939/40
1940/41
1941/42
1942/43
1943/44
1944/45
1945/46
1946/47
1947/48
1948/49
1949/50
```

De:

```ts
{ name: "Zarra", positions: ["DC"] as PlayerPosition[], overall: 90, dataConfidence: 0.55, tacticalSlotLabels: ["DC"] },
```

A:

```ts
makePlayer({ name: "Zarra", season: "1942/43", positions: ["DC"] as PlayerPosition[], overall: 90, sourceRefs: ["manual-athletic-1942-43-post-war-gameplay-squad"], dataConfidence: 0.55, tacticalSlotLabels: ["DC"] }),
```

## Qué toca

```text
src/data/athletic/seasons.ts
```

## Qué no toca

```text
draft
positionRules
Liga
Copa
UI
seasonCatalog.ts
```

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-13-0c-transform-raw-players-to-makeplayer-fix.ps1
npm.cmd run build
```
