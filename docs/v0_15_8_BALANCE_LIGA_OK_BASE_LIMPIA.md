# Futbol11 — v0.15.8 BALANCE_LIGA_OK_BASE_LIMPIA

## Estado

Versión congelada como base limpia tras cerrar la fase de balance de Liga.

## Decisión de producto

La fase de balance de Liga queda cerrada por decisión del usuario sobre la versión `v0.15.8_rayo_betis_villarreal_final_tune`.

Se aceptan los resultados del test de 100 simulaciones con perfil `balanced`, incluyendo que Valencia CF pueda aparecer con riesgo alto de descenso en esa muestra.

No reabrir ajustes de Liga salvo petición expresa.

## Incluye

- Base histórica Athletic completa.
- Modos Fácil, Normal y Leyenda.
- Selector de rangos en Modo Fácil.
- Draft con variedad mejorada.
- Simulación visual simplificada:
  - botón `Simular`,
  - botón `Parar simulación`,
  - ritmo lento de simulación,
  - `Saltar hasta próximo evento`.
- Auditoría por PowerShell.
- Perfiles de auditoría:
  - `legendary`,
  - `strong`,
  - `balanced`,
  - `weak`,
  - `random`.
- Balance de Liga aceptado.

## Resultado de referencia aceptado

Test de 100 simulaciones, perfil `balanced`:

- Media Athletic: 3.6º.
- Athletic: 17/100 Ligas.
- Athletic: 19/100 Copas.
- Villarreal: 2/100 descensos.
- Betis: 10/100 descensos.
- Rayo Vallecano: 16/100 descensos.
- Oviedo: 63/100 descensos.
- Valencia CF: 27/100 descensos, aceptado por criterio de diseño.

## Próxima fase recomendada

`v0.16.0_COPA_REALISTA_OK`

Trabajar Copa del Rey solo si se detecta necesidad real. La Copa actualmente tiene variedad suficiente, pero puede pulirse con:

- factor sorpresa,
- boost local de equipos pequeños,
- revisión de semifinalistas/finalistas,
- ajuste de grandes en eliminatorias.
