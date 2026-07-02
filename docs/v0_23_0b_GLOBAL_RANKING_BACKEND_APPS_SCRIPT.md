# v0.23.0b — Global Ranking Backend Apps Script

## Objetivo

Conectar la base frontend de ranking global a un backend real mínimo basado en Google Sheets + Apps Script, manteniendo el ranking local separado y sin tocar balance, ratings, plantillas ni simulación.

## Cambios incluidos

- Añade `apps-script/globalRankingBackend.gs` como backend copiables a Google Apps Script.
- Usa `VITE_GLOBAL_RANKING_ENDPOINT` como endpoint configurable del Web App de Apps Script.
- El servicio global interpreta respuestas envoltorio de Apps Script:
  - `ok: true`, `status: submitted`, `entry` para envíos.
  - `ok: true`, `status: loaded`, `entries` para Top 100.
  - `ok: false`, `status: duplicate` para carreras repetidas.
- El envío usa `Content-Type: text/plain;charset=utf-8` para simplificar compatibilidad con Apps Script.
- La pantalla Ranking global pasa de “foundation pendiente” a “Apps Script configurable”.
- El panel de Game Over muestra backend conectado o pendiente según `VITE_GLOBAL_RANKING_ENDPOINT`.
- Amplía la QA global con casos de envoltorio Apps Script, duplicados y carga Top 100.
- Actualiza versión visible a `v0.23.0b` y versión npm a `0.23.0-b.0`.

## Contrato de backend

### GET

```text
?action=top&limit=100
```

Devuelve:

```json
{
  "ok": true,
  "status": "loaded",
  "message": "Ranking global cargado.",
  "entries": []
}
```

### POST

Recibe JSON con:

- `careerId`
- `nick`
- `completedSeasons`
- `arcadeScore`
- `palmaresScore`
- `survivalScore`
- `trophyCounts`
- `bestLeaguePosition`
- `lastSeasonLabel`
- `lastLeaguePosition`
- `gameVersion`
- `createdAt`
- `submittedAt`

Devuelve:

```json
{
  "ok": true,
  "status": "submitted",
  "message": "Carrera enviada al ranking global.",
  "entry": {}
}
```

Si ya existe `careerId`:

```json
{
  "ok": false,
  "status": "duplicate",
  "message": "Esta carrera ya estaba registrada en el ranking global."
}
```

## Configuración local

Crear o editar `.env.local`:

```env
VITE_GLOBAL_RANKING_ENDPOINT=https://script.google.com/macros/s/TU_DEPLOYMENT_ID/exec
```

Después reiniciar Vite:

```powershell
cmd /c "npm run dev"
```

## QA

```powershell
cmd /c "npm run qa:global-ranking"
cmd /c "npm run qa:tech-debt"
cmd /c "npm run build"
```

## Fuera de alcance

- No añade autenticación real.
- No añade anti-spam avanzado por IP o cuenta.
- No sustituye el ranking local.
- No abre Europa Career.
- No toca balance ni ratings históricos.

## Estado

Preparado para desplegar el Apps Script real y probar envío/carga desde navegador.
