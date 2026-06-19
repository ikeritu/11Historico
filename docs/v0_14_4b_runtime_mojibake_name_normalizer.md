# v0.14.4b — Normalizador defensivo de nombres en runtime

El escaneo de `src` no encontró textos `IÃ±igo`, pero en pantalla seguía apareciendo. Eso apunta a datos transformados en runtime o guardados.

Este parche añade un normalizador defensivo y lo aplica en factories `makePlayer` / `makeCoach`.

## Uso

```powershell
cd "D:\Proyectos\⚽ Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-14-4b-runtime-mojibake-name-normalizer.ps1
npm.cmd run build
```

Después, en navegador:

```js
localStorage.clear();
location.reload();
```

## No toca

```text
Liga
Copa
ratings
balance
simulación
```
