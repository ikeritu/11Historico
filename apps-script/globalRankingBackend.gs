/**
 * Futbol11 v0.23.0b — Global Ranking Backend Apps Script
 *
 * Deploy as Web app:
 * - Execute as: Me
 * - Who has access: Anyone
 *
 * Frontend env variable:
 * VITE_GLOBAL_RANKING_ENDPOINT=<web app /exec URL>
 */

const SHEET_NAME = 'RankingGlobal';
const TOP_LIMIT = 100;
const MAX_NICK_LENGTH = 24;
const HEADERS = [
  'id',
  'careerId',
  'nick',
  'completedSeasons',
  'arcadeScore',
  'palmaresScore',
  'survivalScore',
  'trophyCounts',
  'bestLeaguePosition',
  'lastSeasonLabel',
  'lastLeaguePosition',
  'gameVersion',
  'createdAt',
  'submittedAt',
  'serverReceivedAt',
];

function doGet(event) {
  try {
    const params = event && event.parameter ? event.parameter : {};
    const action = String(params.action || 'top');

    if (action === 'health') {
      return jsonOutput_({ ok: true, status: 'healthy', message: 'Futbol11 global ranking backend activo.' });
    }

    if (action !== 'top') {
      return jsonOutput_({ ok: false, status: 'invalid_payload', message: 'Acción no soportada.' });
    }

    const limit = clampNumber_(Number(params.limit || TOP_LIMIT), 1, TOP_LIMIT);
    const entries = getTopEntries_(limit);

    return jsonOutput_({ ok: true, status: 'loaded', message: 'Ranking global cargado.', entries });
  } catch (error) {
    return jsonOutput_(toErrorResponse_(error));
  }
}

function doPost(event) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(5000);

    const payload = parsePostPayload_(event);
    const entry = normalizePayload_(payload);
    const sheet = getRankingSheet_();
    const existingEntries = readEntries_(sheet);

    if (existingEntries.some((existing) => existing.careerId === entry.careerId)) {
      return jsonOutput_({
        ok: false,
        status: 'duplicate',
        message: 'Esta carrera ya estaba registrada en el ranking global.',
      });
    }

    sheet.appendRow(toRow_(entry));

    return jsonOutput_({
      ok: true,
      status: 'submitted',
      message: 'Carrera enviada al ranking global.',
      entry,
    });
  } catch (error) {
    return jsonOutput_(toErrorResponse_(error));
  } finally {
    try {
      lock.releaseLock();
    } catch (_error) {
      // Lock not acquired or already released.
    }
  }
}

function parsePostPayload_(event) {
  const rawBody = event && event.postData && event.postData.contents ? event.postData.contents : '';

  if (rawBody) {
    return JSON.parse(rawBody);
  }

  if (event && event.parameter && event.parameter.payload) {
    return JSON.parse(event.parameter.payload);
  }

  throw new Error('Payload vacío.');
}

function normalizePayload_(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Payload inválido.');
  }

  const nick = sanitizeNick_(payload.nick);
  const careerId = String(payload.careerId || '').trim();
  const submittedAt = String(payload.submittedAt || new Date().toISOString());
  const createdAt = String(payload.createdAt || '');
  const entry = {
    id: careerId,
    careerId,
    nick,
    completedSeasons: toNonNegativeNumber_(payload.completedSeasons, 'completedSeasons'),
    arcadeScore: toNonNegativeNumber_(payload.arcadeScore, 'arcadeScore'),
    palmaresScore: toNonNegativeNumber_(payload.palmaresScore, 'palmaresScore'),
    survivalScore: toNonNegativeNumber_(payload.survivalScore, 'survivalScore'),
    trophyCounts: normalizeTrophyCounts_(payload.trophyCounts),
    bestLeaguePosition: toPositiveNumber_(payload.bestLeaguePosition, 'bestLeaguePosition'),
    lastSeasonLabel: String(payload.lastSeasonLabel || '').trim(),
    lastLeaguePosition: toPositiveNumber_(payload.lastLeaguePosition, 'lastLeaguePosition'),
    gameVersion: String(payload.gameVersion || '').trim(),
    createdAt,
    submittedAt,
    serverReceivedAt: new Date().toISOString(),
  };

  if (careerId.length < 6) throw new Error('careerId obligatorio.');
  if (nick.length < 3) throw new Error('El nick debe tener al menos 3 caracteres.');
  if (!entry.lastSeasonLabel) throw new Error('lastSeasonLabel obligatorio.');
  if (!entry.gameVersion) throw new Error('gameVersion obligatorio.');
  if (!entry.createdAt) throw new Error('createdAt obligatorio.');

  return entry;
}

function sanitizeNick_(value) {
  return String(value || '')
    .normalize('NFKC')
    .replace(/[^\p{L}\p{N} _.-]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_NICK_LENGTH);
}

function normalizeTrophyCounts_(value) {
  const source = value && typeof value === 'object' ? value : {};

  return {
    champions: toSafeInteger_(source.champions),
    liga: toSafeInteger_(source.liga),
    europaLeague: toSafeInteger_(source.europaLeague),
    copa: toSafeInteger_(source.copa),
    conference: toSafeInteger_(source.conference),
    supercopa: toSafeInteger_(source.supercopa),
  };
}

function getRankingSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
  const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  const currentHeaders = headerRange.getValues()[0];
  const needsHeaders = currentHeaders.some((value, index) => value !== HEADERS[index]);

  if (needsHeaders) {
    headerRange.setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function readEntries_(sheet) {
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) return [];

  return sheet.getRange(2, 1, lastRow - 1, HEADERS.length)
    .getValues()
    .map(rowToEntry_)
    .filter(Boolean);
}

function getTopEntries_(limit) {
  return sortEntries_(readEntries_(getRankingSheet_())).slice(0, limit);
}

function sortEntries_(entries) {
  return entries.sort((left, right) => {
    if (right.arcadeScore !== left.arcadeScore) return right.arcadeScore - left.arcadeScore;
    if (right.completedSeasons !== left.completedSeasons) return right.completedSeasons - left.completedSeasons;
    if (right.palmaresScore !== left.palmaresScore) return right.palmaresScore - left.palmaresScore;
    if (left.bestLeaguePosition !== right.bestLeaguePosition) return left.bestLeaguePosition - right.bestLeaguePosition;
    return new Date(right.submittedAt).getTime() - new Date(left.submittedAt).getTime();
  });
}

function toRow_(entry) {
  return [
    entry.id,
    entry.careerId,
    entry.nick,
    entry.completedSeasons,
    entry.arcadeScore,
    entry.palmaresScore,
    entry.survivalScore,
    JSON.stringify(entry.trophyCounts),
    entry.bestLeaguePosition,
    entry.lastSeasonLabel,
    entry.lastLeaguePosition,
    entry.gameVersion,
    entry.createdAt,
    entry.submittedAt,
    entry.serverReceivedAt,
  ];
}

function rowToEntry_(row) {
  try {
    return {
      id: String(row[0] || ''),
      careerId: String(row[1] || ''),
      nick: sanitizeNick_(row[2]),
      completedSeasons: toSafeInteger_(row[3]),
      arcadeScore: toSafeInteger_(row[4]),
      palmaresScore: toSafeInteger_(row[5]),
      survivalScore: toSafeInteger_(row[6]),
      trophyCounts: parseTrophyCountsCell_(row[7]),
      bestLeaguePosition: toSafeInteger_(row[8]),
      lastSeasonLabel: String(row[9] || ''),
      lastLeaguePosition: toSafeInteger_(row[10]),
      gameVersion: String(row[11] || ''),
      createdAt: String(row[12] || ''),
      submittedAt: String(row[13] || ''),
    };
  } catch (_error) {
    return null;
  }
}

function parseTrophyCountsCell_(value) {
  try {
    return normalizeTrophyCounts_(typeof value === 'string' ? JSON.parse(value) : value);
  } catch (_error) {
    return normalizeTrophyCounts_({});
  }
}

function toNonNegativeNumber_(value, label) {
  const number = Number(value);

  if (!Number.isFinite(number) || number < 0) throw new Error(label + ' inválido.');

  return Math.floor(number);
}

function toPositiveNumber_(value, label) {
  const number = Number(value);

  if (!Number.isFinite(number) || number < 1) throw new Error(label + ' inválido.');

  return Math.floor(number);
}

function toSafeInteger_(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? Math.floor(number) : 0;
}

function clampNumber_(value, min, max) {
  if (!Number.isFinite(value)) return max;
  return Math.max(min, Math.min(max, Math.floor(value)));
}

function toErrorResponse_(error) {
  return {
    ok: false,
    status: 'server_error',
    message: error && error.message ? String(error.message) : 'Error interno del ranking global.',
  };
}

function jsonOutput_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
