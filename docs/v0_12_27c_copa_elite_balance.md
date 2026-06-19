# v0.12.27c — Copa elite balance

## Problema

En las pruebas:

```text
Real Madrid ganó 4 de 5 Copas.
```

Eso es demasiado repetitivo para un juego con Copa del Rey a partido único.

## Solución

No se baja al Real Madrid por nombre.

Se ajusta la lógica general de Copa para que los equipos de elite no dominen tanto semifinales/finales.

## Cambio

Se añade `applyCupEliteBalance(...)` dentro de `leagueSimulator.ts`.

Reglas:

```text
Equipo elite favorito 89+ vs rival 80+:
- pequeña penalización de expected goals en cuartos/semis/final

Equipo fuerte no elite 80+ vs elite 89+:
- pequeño boost en cuartos/semis/final

Final:
- se compensa un poco la penalización home/away artificial
```

## Resultado esperado

Madrid y Barça siguen pudiendo ganar bastante, pero no deberían ganar 4/5 de forma habitual.

Ejemplo de rango aceptable en 10 Copas:

```text
Real Madrid: 2-4
Barcelona: 1-3
Athletic/Villarreal/Atlético/Betis/Real Sociedad/Sevilla/Valencia: apariciones ocasionales
```

## Archivos tocados

```text
src/simulation/leagueSimulator.ts
```

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-12-27c-copa-elite-balance.ps1
npm.cmd run build
npm.cmd run dev
```

## QA recomendado

Simular 5 temporadas:

```text
Liga 1 - Copa:
Liga 2 - Copa:
Liga 3 - Copa:
Liga 4 - Copa:
Liga 5 - Copa:
```

Aprobado si:

```text
Real Madrid no gana 4/5 de forma repetida.
La Copa sigue siendo creíble: pueden ganar grandes, pero también algún equipo fuerte no elite.
```
