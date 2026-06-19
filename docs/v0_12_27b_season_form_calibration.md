# v0.12.27b — Calibración de varianza por nivel

## Problema

Tras aplicar el Season Form Engine, la Liga dejó de repetir siempre:

```text
Alavés - Oviedo - Osasuna
```

pero apareció un nuevo problema:

```text
Villarreal descendió 2 de 2 simulaciones.
```

Eso indica que la varianza funciona, pero es demasiado agresiva para equipos de zona europea/media-alta.

## Solución

Se recalibra únicamente `getTeamSeasonForm`.

No se toca:

```text
draft
posiciones
Copa
pantalla final
compatibilidad
```

## Nueva lógica

```text
Elite 86+:
-2 a +2

Zona europea/media-alta 81-85:
-3 a +3

Media 78-80:
-4 a +5

Zona baja-media 76-77:
-5 a +6

Zona baja <=75:
-6 a +7
```

## Resultado esperado

```text
Villarreal puede hacer mala temporada.
Villarreal puede quedar lejos de Europa.
Villarreal podría sufrir alguna vez de forma rara.
Villarreal no debería descender 2 de 2 ni repetidamente.
```

La zona de descenso debería rotar más entre:

```text
Oviedo
Alavés
Levante
Girona
Elche
Getafe
Espanyol
Mallorca
Osasuna ocasionalmente
```

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-12-27b-season-form-calibration.ps1
npm.cmd run build
npm.cmd run dev
```

## QA recomendado

Simular 5 ligas:

```text
Liga 1:
Descendidos:

Liga 2:
Descendidos:

Liga 3:
Descendidos:

Liga 4:
Descendidos:

Liga 5:
Descendidos:
```

Aprobado si:

```text
Villarreal no baja repetidamente.
No vuelve el patrón fijo Alavés/Oviedo/Osasuna siempre juntos.
```
