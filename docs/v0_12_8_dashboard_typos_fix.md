# v0.12.8 dashboard typo/mojibake fix

Corrige textos raros en el dashboard, especialmente:

```text
Ãrea a vigilar
```

Lo cambia por:

```text
Area a vigilar
```

También evita acentos en etiquetas sensibles del dashboard para reducir problemas de codificación:

- Físico -> Fisico
- Portería -> Porteria
- Área a vigilar -> Area a vigilar

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\fix-v0-12-8-dashboard-typos.ps1
npm.cmd run build
npm.cmd run dev
```
