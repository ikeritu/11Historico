# v0.12.14 — Revisión de nuevas alineaciones

## Corrige

### Coordenadas visuales

Añade coordenadas específicas en `TacticalPitch.tsx` para:

- 3-4-3
- 5-4-1
- 3-6-1
- 3-3-4
- 4-2-4
- 4-6-0
- 5-2-3

Esto corrige problemas como:

- 4-6-0 parecía tener un jugador menos.
- 3-3-4 parecía perder un medio.
- 3-6-1 parecía perder un medio.
- 3-4-3 parecía perder un medio y delantera mal colocada.
- 5-2-3 tenía la delantera mal distribuida.

### Errores tipográficos

Limpia mojibake tipo:

- `clÃ¡sico` -> `clásico`
- `MÃ¡xima` -> `Máxima`
- `DifÃ­cil` -> `Difícil`
- `tÃ©cnica` -> `técnica`
- `posesiÃ³n` -> `posesión`
- `lÃ­nea` -> `línea`

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\fix-v0-12-14-review-extra-formations.ps1
npm.cmd run build
npm.cmd run dev
```
