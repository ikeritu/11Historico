# v0.13.8 — Bloque final 2020/21-2025/26

Añade las cuatro temporadas que faltaban según la auditoría corregida:

```text
2021/22
2022/23
2024/25
2025/26
```

No toca las que ya existían:

```text
2020/21
2023/24
```

## Archivos tocados

```text
src/data/athletic/seasons.ts
src/data/athletic/seasonCatalog.ts
```

## Uso

```powershell
cd "D:\Proyectos\⚽ Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-13-8-2020s-final-squads.ps1
npm.cmd run build
powershell -ExecutionPolicy Bypass -File .\audit-v0-13-7c-playable-seasons-count-fix.ps1
```

## Objetivo de auditoría después de aplicar

```text
Temporadas catalogadas: 95
Temporadas con status playable en catalogo: 95
Temporadas con status planned en catalogo: 0
Temporadas con plantilla en seasons.ts: 95
Duplicados reales de temporada en seasons.ts: 0
Catalogo playable sin plantilla: 0
Plantilla en seasons.ts pero catalogo no playable: 0
```
