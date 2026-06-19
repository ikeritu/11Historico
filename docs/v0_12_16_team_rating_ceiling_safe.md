# v0.12.16 safe — Techo de valoración del equipo

El script anterior fallaba porque buscaba un bloque `numericRating` exacto y tu archivo `teamRating.ts` ya tenía una estructura distinta.

Esta versión es más robusta:

- No sustituye el bloque completo.
- Inserta `cappedRating` justo después de `numericRating`.
- Cambia el return para usar `cappedRating`.

## Regla aplicada

```text
Valoración general máxima ≈ media del once + 5
Ataque / Defensa / Control máximo ≈ media + 8
Físico / Mentalidad / Portería máximo ≈ media + 10
```

Ejemplo:

```text
Media del once: 85
Valoración general máxima: 90
```

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\fix-v0-12-16-team-rating-ceiling-safe.ps1
npm.cmd run build
npm.cmd run dev
```
