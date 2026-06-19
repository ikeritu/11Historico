# v0.15.5 · Balance zona baja + test 100 sims

## Cambios

- Ajuste quirúrgico de zona baja/media:
  - CA Osasuna: subida de estabilidad, defensa, portería y mentalidad.
  - Deportivo Alavés: pequeño ajuste defensivo y de estabilidad.
  - Real Oviedo: sigue siendo candidato claro al descenso, pero deja de estar tan condenado.
- La auditoría CLI pasa a usar 100 simulaciones por defecto.
- Añadido script directo:

```powershell
npm.cmd run audit:balance:100
```

## No tocado

- Athletic histórico.
- Copa del Rey.
- Villarreal.
- Madrid / Barça / Atlético.
- Simulación visual del juego.
- Draft y modos.

## Test recomendado

```powershell
npm.cmd run audit:balance:100
```

O manual:

```powershell
npm.cmd run audit:balance -- --sims=100 --profile=balanced --difficulty=normal --range=all
```
