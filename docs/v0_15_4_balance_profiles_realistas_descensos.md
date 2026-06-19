# v0.15.4 — Balance profiles realistas + descensos

Cambios:

- La auditoría por PowerShell mantiene la UI limpia del juego.
- Nuevos perfiles CLI:
  - `legendary`: techo histórico.
  - `strong`: once muy bueno.
  - `balanced`: once competitivo normal para balance real.
  - `weak`: once flojo/mal draft.
  - `random`: once viable aleatorio, no optimizado.
- `balanced` deja de construir un once casi legendario.
- Añadida tabla completa de descensos en consola.
- Soft fix Villarreal v0.15.4:
  - subida ligera de ratings base.
  - temporada media más estable.
  - pequeño ajuste en simulación rival-vs-rival para reducir descensos anómalos.

Comandos recomendados:

```powershell
npm.cmd run audit:balance -- --sims=50 --profile=balanced --difficulty=normal --range=all
npm.cmd run audit:balance -- --sims=50 --profile=strong --difficulty=normal --range=all
npm.cmd run audit:balance -- --sims=50 --profile=weak --difficulty=normal --range=all
```
