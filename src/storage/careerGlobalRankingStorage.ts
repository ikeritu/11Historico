import { sanitizeGlobalRankingNick } from "../services/globalRankingService";

const CAREER_GLOBAL_NICK_STORAGE_KEY = "once_historico_zurigorri_career_global_nick_v1";
const CAREER_GLOBAL_SUBMITTED_IDS_STORAGE_KEY = "once_historico_zurigorri_career_global_submitted_ids_v1";

function getStorage(): Storage | undefined {
  return typeof window === "undefined" ? undefined : window.localStorage;
}

function parseSubmittedIds(raw: string | null): string[] {
  if (!raw) return [];

  const parsed = JSON.parse(raw) as unknown;

  if (!Array.isArray(parsed)) return [];

  return parsed.filter((item): item is string => typeof item === "string" && item.length > 0);
}

export function loadLastCareerGlobalRankingNick(): string {
  try {
    return sanitizeGlobalRankingNick(getStorage()?.getItem(CAREER_GLOBAL_NICK_STORAGE_KEY) ?? "");
  } catch {
    return "";
  }
}

export function saveLastCareerGlobalRankingNick(nick: string): void {
  try {
    const sanitized = sanitizeGlobalRankingNick(nick);

    if (!sanitized) return;

    getStorage()?.setItem(CAREER_GLOBAL_NICK_STORAGE_KEY, sanitized);
  } catch (error) {
    console.warn("No se pudo guardar el nick del ranking global.", error);
  }
}

export function loadSubmittedCareerGlobalRankingIds(): string[] {
  try {
    return parseSubmittedIds(getStorage()?.getItem(CAREER_GLOBAL_SUBMITTED_IDS_STORAGE_KEY) ?? null);
  } catch (error) {
    console.warn("No se pudieron cargar las carreras enviadas al ranking global.", error);
    return [];
  }
}

export function hasSubmittedCareerGlobalRankingEntry(careerId: string): boolean {
  return loadSubmittedCareerGlobalRankingIds().includes(careerId);
}

export function markCareerGlobalRankingEntrySubmitted(careerId: string): void {
  try {
    if (!careerId) return;

    const ids = loadSubmittedCareerGlobalRankingIds();
    const nextIds = ids.includes(careerId) ? ids : [careerId, ...ids].slice(0, 250);

    getStorage()?.setItem(CAREER_GLOBAL_SUBMITTED_IDS_STORAGE_KEY, JSON.stringify(nextIds));
  } catch (error) {
    console.warn("No se pudo marcar la carrera como enviada al ranking global.", error);
  }
}
