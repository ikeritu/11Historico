# v0.13.9e — Extraer secciones accionables de auditoría

Este script no modifica el juego. Solo extrae del informe `v0.13.9d` las partes necesarias para preparar `v0.13.10`.

## Extrae

```text
POSICIONES Y LABELS SOSPECHOSOS
SALTOS GRANDES DE RATING POR JUGADOR
JUGADORES 90+
TEMPORADAS POTENCIALMENTE SOBREVALORADAS
```

## Uso

```powershell
cd "D:\Proyectos\⚽ Futbol11"
powershell -ExecutionPolicy Bypass -File .\extract-v0-13-9e-actionable-audit-sections.ps1
notepad .\reports\v0_13_9e_actionable_audit_sections.txt
```
