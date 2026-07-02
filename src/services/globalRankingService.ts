import type { CareerGlobalRankingEntry, CareerGlobalRankingSubmitPayload, CareerLocalRankingEntry } from "../types/career";

export const GLOBAL_RANKING_ENDPOINT = "";
export const GLOBAL_RANKING_TIMEOUT_MS = 6000;
export const GLOBAL_RANKING_LIMIT = 100;

export type GlobalRankingStatus =
  | "submitted"
  | "loaded"
  | "not_configured"
  | "invalid_payload"
  | "network_error"
  | "server_error";

export interface GlobalRankingServiceResult {
  ok: boolean;
  status: GlobalRankingStatus;
  message: string;
}

export interface SubmitGlobalRankingResult extends GlobalRankingServiceResult {
  entry?: CareerGlobalRankingEntry;
}

export interface LoadGlobalRankingResult extends GlobalRankingServiceResult {
  entries: CareerGlobalRankingEntry[];
}

type FetchLike = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

interface GlobalRankingRequestOptions {
  endpoint?: string;
  timeoutMs?: number;
  fetcher?: FetchLike;
}

function getEndpoint(endpoint?: string): string {
  return (endpoint ?? GLOBAL_RANKING_ENDPOINT).trim();
}

export function isGlobalRankingConfigured(endpoint?: string): boolean {
  return getEndpoint(endpoint).length > 0;
}

export function sanitizeGlobalRankingNick(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N} _.-]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 24);
}

export function validateGlobalRankingNick(nick: string): string | undefined {
  const sanitized = sanitizeGlobalRankingNick(nick);

  if (sanitized.length < 3) return "El nick debe tener al menos 3 caracteres.";
  if (sanitized.length > 24) return "El nick no puede superar 24 caracteres.";

  return undefined;
}

function hasValidNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

export function buildCareerGlobalRankingPayload(params: {
  nick: string;
  entry: CareerLocalRankingEntry;
  careerId?: string;
  submittedAt?: string;
}): CareerGlobalRankingSubmitPayload {
  const submittedAt = params.submittedAt ?? new Date().toISOString();

  return {
    careerId: params.careerId ?? params.entry.id,
    nick: sanitizeGlobalRankingNick(params.nick),
    completedSeasons: params.entry.completedSeasons,
    arcadeScore: params.entry.arcadeScore,
    palmaresScore: params.entry.palmaresScore,
    survivalScore: params.entry.survivalScore,
    trophyCounts: params.entry.trophyCounts,
    bestLeaguePosition: params.entry.bestLeaguePosition,
    lastSeasonLabel: params.entry.lastSeasonLabel,
    lastLeaguePosition: params.entry.lastLeaguePosition,
    gameVersion: params.entry.gameVersion,
    createdAt: params.entry.createdAt,
    submittedAt,
  };
}

export function validateGlobalRankingPayload(payload: CareerGlobalRankingSubmitPayload): string[] {
  const errors: string[] = [];
  const nickError = validateGlobalRankingNick(payload.nick);

  if (nickError) errors.push(nickError);
  if (!payload.careerId || payload.careerId.length < 6) errors.push("careerId obligatorio.");
  if (!hasValidNumber(payload.completedSeasons) || payload.completedSeasons < 0) errors.push("temporadasSuperadas inválidas.");
  if (!hasValidNumber(payload.arcadeScore) || payload.arcadeScore < 0) errors.push("puntuación arcade inválida.");
  if (!hasValidNumber(payload.palmaresScore) || payload.palmaresScore < 0) errors.push("palmarés inválido.");
  if (!hasValidNumber(payload.bestLeaguePosition) || payload.bestLeaguePosition < 1) errors.push("mejor posición inválida.");
  if (!payload.lastSeasonLabel) errors.push("última temporada obligatoria.");
  if (!payload.gameVersion) errors.push("versión del juego obligatoria.");
  if (!payload.createdAt) errors.push("fecha local obligatoria.");

  return errors;
}

export function toCareerGlobalRankingEntry(payload: CareerGlobalRankingSubmitPayload): CareerGlobalRankingEntry {
  return {
    id: payload.careerId,
    careerId: payload.careerId,
    nick: sanitizeGlobalRankingNick(payload.nick),
    completedSeasons: payload.completedSeasons,
    arcadeScore: payload.arcadeScore,
    palmaresScore: payload.palmaresScore,
    survivalScore: payload.survivalScore,
    trophyCounts: payload.trophyCounts,
    bestLeaguePosition: payload.bestLeaguePosition,
    lastSeasonLabel: payload.lastSeasonLabel,
    lastLeaguePosition: payload.lastLeaguePosition,
    gameVersion: payload.gameVersion,
    createdAt: payload.createdAt,
    submittedAt: payload.submittedAt,
  };
}

function parseGlobalRankingEntry(candidate: unknown): CareerGlobalRankingEntry | undefined {
  if (!candidate || typeof candidate !== "object") return undefined;

  const entry = candidate as Partial<CareerGlobalRankingEntry>;
  const nick = typeof entry.nick === "string" ? sanitizeGlobalRankingNick(entry.nick) : "";

  if (!entry.id || !entry.careerId || !nick) return undefined;
  if (!hasValidNumber(entry.completedSeasons)) return undefined;
  if (!hasValidNumber(entry.arcadeScore)) return undefined;
  if (!hasValidNumber(entry.palmaresScore)) return undefined;
  if (!hasValidNumber(entry.survivalScore)) return undefined;
  if (!hasValidNumber(entry.bestLeaguePosition)) return undefined;
  if (!hasValidNumber(entry.lastLeaguePosition)) return undefined;
  if (!entry.trophyCounts || !entry.lastSeasonLabel || !entry.gameVersion || !entry.createdAt || !entry.submittedAt) return undefined;

  return {
    id: String(entry.id),
    careerId: String(entry.careerId),
    nick,
    completedSeasons: entry.completedSeasons,
    arcadeScore: entry.arcadeScore,
    palmaresScore: entry.palmaresScore,
    survivalScore: entry.survivalScore,
    trophyCounts: entry.trophyCounts,
    bestLeaguePosition: entry.bestLeaguePosition,
    lastSeasonLabel: entry.lastSeasonLabel,
    lastLeaguePosition: entry.lastLeaguePosition,
    gameVersion: String(entry.gameVersion),
    createdAt: String(entry.createdAt),
    submittedAt: String(entry.submittedAt),
  };
}

export function sortCareerGlobalRanking(entries: CareerGlobalRankingEntry[]): CareerGlobalRankingEntry[] {
  return [...entries].sort((left, right) => {
    if (right.arcadeScore !== left.arcadeScore) return right.arcadeScore - left.arcadeScore;
    if (right.completedSeasons !== left.completedSeasons) return right.completedSeasons - left.completedSeasons;
    if (right.palmaresScore !== left.palmaresScore) return right.palmaresScore - left.palmaresScore;
    if (left.bestLeaguePosition !== right.bestLeaguePosition) return left.bestLeaguePosition - right.bestLeaguePosition;
    return new Date(right.submittedAt).getTime() - new Date(left.submittedAt).getTime();
  });
}

export function parseCareerGlobalRanking(raw: unknown): CareerGlobalRankingEntry[] {
  const rawEntries = Array.isArray(raw)
    ? raw
    : raw && typeof raw === "object" && Array.isArray((raw as { entries?: unknown[] }).entries)
      ? (raw as { entries: unknown[] }).entries
      : [];

  return sortCareerGlobalRanking(
    rawEntries
      .map(parseGlobalRankingEntry)
      .filter((entry): entry is CareerGlobalRankingEntry => Boolean(entry)),
  ).slice(0, GLOBAL_RANKING_LIMIT);
}

function buildTopRankingUrl(endpoint: string): string {
  const separator = endpoint.includes("?") ? "&" : "?";
  return `${endpoint}${separator}action=top&limit=${GLOBAL_RANKING_LIMIT}`;
}

async function readJsonSafely(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return undefined;
  }
}

export async function submitGlobalRankingEntry(
  payload: CareerGlobalRankingSubmitPayload,
  options: GlobalRankingRequestOptions = {},
): Promise<SubmitGlobalRankingResult> {
  const errors = validateGlobalRankingPayload(payload);

  if (errors.length > 0) {
    return {
      ok: false,
      status: "invalid_payload",
      message: errors.join(" "),
    };
  }

  const endpoint = getEndpoint(options.endpoint);

  if (!endpoint) {
    return {
      ok: false,
      status: "not_configured",
      message: "Ranking global preparado, pero el backend todavía no está configurado.",
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? GLOBAL_RANKING_TIMEOUT_MS);

  try {
    const fetcher = options.fetcher ?? fetch;
    const response = await fetcher(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      return {
        ok: false,
        status: "server_error",
        message: `El ranking global respondió con error ${response.status}.`,
      };
    }

    const data = await readJsonSafely(response);
    const returnedEntry = parseGlobalRankingEntry(data) ?? toCareerGlobalRankingEntry(payload);

    return {
      ok: true,
      status: "submitted",
      message: "Carrera enviada al ranking global.",
      entry: returnedEntry,
    };
  } catch {
    return {
      ok: false,
      status: "network_error",
      message: "No se pudo contactar con el ranking global. Puedes seguir jugando igualmente.",
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function loadGlobalRanking(
  options: GlobalRankingRequestOptions = {},
): Promise<LoadGlobalRankingResult> {
  const endpoint = getEndpoint(options.endpoint);

  if (!endpoint) {
    return {
      ok: false,
      status: "not_configured",
      message: "Ranking global pendiente de conectar a backend.",
      entries: [],
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? GLOBAL_RANKING_TIMEOUT_MS);

  try {
    const fetcher = options.fetcher ?? fetch;
    const response = await fetcher(buildTopRankingUrl(endpoint), {
      method: "GET",
      signal: controller.signal,
    });

    if (!response.ok) {
      return {
        ok: false,
        status: "server_error",
        message: `El ranking global respondió con error ${response.status}.`,
        entries: [],
      };
    }

    const data = await readJsonSafely(response);
    const entries = parseCareerGlobalRanking(data);

    return {
      ok: true,
      status: "loaded",
      message: entries.length > 0 ? "Ranking global cargado." : "Ranking global sin entradas todavía.",
      entries,
    };
  } catch {
    return {
      ok: false,
      status: "network_error",
      message: "No se pudo cargar el ranking global.",
      entries: [],
    };
  } finally {
    clearTimeout(timeout);
  }
}
