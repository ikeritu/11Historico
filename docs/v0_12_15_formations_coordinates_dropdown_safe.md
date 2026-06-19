# v0.12.15 — Formaciones revisadas + menú desplegable

## Corrige el error del script anterior

El script `v0.12.14` podía romperse por caracteres mojibake dentro del propio `.ps1`.

Esta versión es segura: no incluye cadenas raras en las llamadas `.Replace()`.

## Cambios

### 1. Coordenadas de nuevas alineaciones

Añade coordenadas en `TacticalPitch.tsx` para:

- 3-4-3
- 5-4-1
- 3-6-1
- 3-3-4
- 4-2-4
- 4-6-0
- 5-2-3

### 2. Menú desplegable de alineaciones

Añade un selector arriba de la pantalla de formaciones:

```text
Ir a alineacion
[Selecciona una alineacion]
```

Al elegir una, se selecciona y hace scroll hasta su tarjeta.

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-12-15-formations-coordinates-dropdown-safe.ps1
npm.cmd run build
npm.cmd run dev
```
