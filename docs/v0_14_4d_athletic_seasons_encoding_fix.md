# v0.14.4d — Fix quirúrgico encoding en athletic/seasons.ts

Corrige los mojibakes reales encontrados en el archivo subido:

```text
JoaquÃ­n CaparrÃ³s -> Joaquín Caparrós
BeÃ±at -> Beñat
JosÃ© Ãngel Ziganda -> José Ángel Ziganda
IÃ±igo Martinez -> Iñigo Martínez
IÃ±aki Williams -> Iñaki Williams
BeÃ±at Prados -> Beñat Prados
```

## Uso

Descomprime el ZIP en la raíz del proyecto y ejecuta:

```powershell
cd "D:\Proyectos\⚽ Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-14-4d-athletic-seasons-encoding-fix.ps1
npm.cmd run build
```

## No toca

```text
Liga
Copa
ratings
balance
simulación
```
