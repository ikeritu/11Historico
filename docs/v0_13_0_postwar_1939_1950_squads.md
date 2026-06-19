# v0.13.0 — Década posguerra 1939/40-1949/50

## Objetivo

Añadir la década completa posterior a la Guerra Civil como bloque jugable.

Temporadas añadidas:

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

## Enfoque

Este bloque se añade como **base jugable histórica**, no como base estadística definitiva.

Por eso las plantillas incluyen:

```text
dataConfidence: 0.48-0.55
ratingMethod: mixed
sourceRefs: manual-athletic-...-post-war-gameplay-squad
```

## Qué toca

```text
src/data/athletic/seasons.ts
src/data/athletic/seasonCatalog.ts
```

## Qué no toca

```text
draft
positionRules
liga
copa
pantalla final
simulación
```

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-13-0-postwar-1939-1950-squads.ps1
npm.cmd run build
npm.cmd run dev
```

## QA recomendado

1. Build.
2. Abrir juego.
3. Verificar que las temporadas 1939/40-1949/50 pueden salir en draft.
4. Probar formaciones exigentes:
   - 3-6-1
   - 4-4-2
   - 5-3-2
5. Verificar que no hay temporadas sin:
   - POR
   - DFC
   - MC/MCD
   - DC/SD
6. Jugar una temporada completa.

## Nota histórica

Los datos están marcados como estimación manual. El objetivo de v0.13.0 es completar jugabilidad de década. La verificación fina de fuentes y estadísticas individuales puede hacerse en una fase posterior.
