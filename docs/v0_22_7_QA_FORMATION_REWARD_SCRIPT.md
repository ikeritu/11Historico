# v0.22.7 — QA formation reward script

Añade un script de QA automático para validar el premio de cambio de formación sin depender de carreras manuales.

## Comando

```powershell
npm.cmd run qa:formation-reward
```

## Cobertura

- Liga ganada desbloquea premio especial.
- Copa ganada desbloquea premio especial.
- Solo Europa no desbloquea cambio de formación.
- Supercopa sola no desbloquea cambio de formación.
- Supercopa + Europa desbloquea cambio de formación.
- 4-3-3 → 4-2-4 exige liberar un medio y abrir hueco de ataque.
- Ningún jugador conservado cambia de línea natural.
- El draft queda restringido al hueco/línea abierta.
- Cancelar conserva plantilla y formación original.
