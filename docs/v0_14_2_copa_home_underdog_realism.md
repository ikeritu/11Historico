# v0.14.2 — Copa home underdog realism

Ajuste de realismo para Copa del Rey.

## Regla

```text
Equipo pequeño en casa:
- conserva una opción real de sorpresa
- partido más cerrado
- posible eliminación copera

Equipo pequeño fuera:
- sorpresa mucho más difícil
- pesa más la diferencia real de nivel

Cenicienta en rondas avanzadas:
- pierde parte del boost por desgaste/presión
- final de equipo pequeño pasa a ser rara
```

## No toca

```text
plantillas
ratings históricos
draft
Liga
Copa path/base de rivales
```

## Uso

```powershell
cd "D:\Proyectos\⚽ Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-14-2-copa-home-underdog-realism.ps1
npm.cmd run build
```

Después conviene jugar 3-5 simulaciones y observar Copa.
