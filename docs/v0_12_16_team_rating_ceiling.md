# v0.12.16 — Techo de valoración del equipo

## Problema

En el resumen podía aparecer:

```text
Media del once: 85
Valoración general: 96
```

Eso no era lógico. Pasaba porque el cálculo colectivo combinaba:

- skills internas muy altas
- modificadores de formación
- bonus de entrenador
- buen encaje táctico

y el resultado podía alejarse demasiado de la media real de los 11 jugadores.

## Solución

Se añade un techo basado en la media real del once:

```text
overall máximo ≈ media del once + 5
ataque/defensa/control máximo ≈ media + 8
físico/mentalidad/portería máximo ≈ media + 10
```

Ejemplo:

```text
Media 85
Valoración general máxima: 90
Defensa/Físico/Mentalidad pueden subir algo más si el perfil lo justifica
```

## Importante

No cambia:

- ratings individuales de jugadores
- habilidades reales
- draft
- simulación base

Solo evita que la valoración colectiva se infle de forma absurda.

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\fix-v0-12-16-team-rating-ceiling.ps1
npm.cmd run build
npm.cmd run dev
```
