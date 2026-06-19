# v0.14.4 — Fix mojibake en nombres y textos

Corrige patrones de codificación rota dentro de `src`.

## Ejemplos corregidos

```text
IÃ±igo -> Iñigo
MartÃ­nez -> Martínez
HistÃ³rico -> Histórico
AtlÃ©tico -> Atlético
AlavÃ©s -> Alavés
Â¿ -> ¿
Âº -> º
```

## Qué toca

Escanea y corrige textos en:

```text
src/**/*.ts
src/**/*.tsx
src/**/*.json
src/**/*.css
src/**/*.md
src/**/*.html
```

## Qué no toca lógicamente

```text
motor de Liga
motor de Copa
ratings
balance
draft
```

## Uso

```powershell
cd "D:\Proyectos\⚽ Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-14-4-mojibake-names-fix.ps1
npm.cmd run build
```

## Informe

```text
reports/v0_14_4_mojibake_names_fix_report.txt
```
