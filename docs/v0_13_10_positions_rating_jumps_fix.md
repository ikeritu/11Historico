# v0.13.10 — Corrección fina de posiciones y saltos de rating

Corrige los problemas accionables detectados en `v0.13.9e`.

## Corrige posiciones

```text
CAI -> LI
CAD -> LD
```

Afecta a casos como:

```text
Larrakoetxea
Tabuenka
Iraola
Capa
Yuri
De Marcos
```

## Corrige saltos de rating

Ajustes quirúrgicos:

```text
1983/84 Noriega 70 -> 81
1983/84 Urkiaga 75 -> 82
1983/84 Urtubi 75 -> 82
1983/84 Gallego 70 -> 79
1993/94 Andrinua 76 -> 82
2011/12 Koikili 70 -> 76
2015/16 Iturraspe 75 -> 80
2023/24 Yeray 76 -> 82
2023/24 Dani García 73 -> 79
2023/24 Jauregizar 70 -> 76
```

## Uso

```powershell
cd "D:\Proyectos\⚽ Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-13-10-positions-rating-jumps-fix.ps1
npm.cmd run build
powershell -ExecutionPolicy Bypass -File .\audit-v0-13-9d-historical-quality-cjs-fix-generated.ps1
```
