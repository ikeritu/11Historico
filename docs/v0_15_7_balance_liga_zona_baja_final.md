# v0.15.7 — Balance Liga zona baja final

Objetivo: afinar la zona baja tras el test de 100 simulaciones de v0.15.6, sin tocar Athletic, Copa, grandes, Villarreal, Sevilla ni Alavés.

Cambios:

- Real Oviedo: mejora adicional suave. Sigue siendo principal candidato al descenso, pero se reduce la condena casi automática.
- CA Osasuna: mejora adicional de estabilidad para acercarlo a zona 22-28 descensos / 100.
- Elche CF: mejora suave para reducir descensos estructurales excesivos.
- Girona FC: microayuda para repartir mejor la zona baja.
- Getafe CF: microayuda para repartir mejor la zona baja.

No se toca:

- Motor general de partidos.
- Copa del Rey.
- Athletic histórico.
- Real Madrid, Barcelona, Atlético.
- Villarreal, Sevilla, Alavés y Valencia.
- Simulación visual y botones.

Test recomendado:

```powershell
npm.cmd run audit:balance:100
```


Ajuste posterior de control interno:

- Villarreal: microestabilización de margen tras test interno con 5/100 descensos.
- Alavés: microajuste de seguridad para mantenerlo cerca del objetivo 20-30/100.
