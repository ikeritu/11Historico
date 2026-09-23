import { limitCareerLocalRanking } from "../career/careerRanking";
import type { CareerLocalRankingEntry, CareerTrophyCounts } from "../types/career";

const CAREER_LOCAL_RANKING_STORAGE_KEY = "once_historico_zurigorri_career_local_ranking_v1";

function parseCareerLocalRanking(raw: string | null): CareerLocalRankingEntry[] {
  if (!raw) return [];

  const parsed = JSON.parse(raw) as unknown;

  if (!Array.isArray(parsed)) return [];

  return parsed.filter((entry): entry is CareerLocalRankingEntry => {
    if (!entry || typeof entry !== "object") return false;

    const candidate = entry as Partial<CareerLocalRankingEntry>;

    return Boolean(
      candidate.id &&
      typeof candidate.completedSeasons === "number" &&
      typeof candidate.arcadeScore === "number" &&
      typeof candidate.palmaresScore === "number" &&
      typeof candidate.bestLeaguePosition === "number" &&
      candidate.lastSeasonLabel &&
      candidate.gameVersion &&
      candidate.createdAt,
    );
  }).map((entry) => {
    const trophies = entry.trophyCounts as Partial<CareerTrophyCounts> | undefined;
    const safeCount = (value: unknown) => typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : 0;
    return {
      ...entry,
      trophyCounts: {
        liga: safeCount(trophies?.liga),
        copa: safeCount(trophies?.copa),
        supercopa: safeCount(trophies?.supercopa),
        champions: safeCount(trophies?.champions),
        europaLeague: safeCount(trophies?.europaLeague),
        conference: safeCount(trophies?.conference),
      },
    };
  });
}

export function loadCareerLocalRanking(): CareerLocalRankingEntry[] {
  try {
    return limitCareerLocalRanking(
      parseCareerLocalRanking(window.localStorage.getItem(CAREER_LOCAL_RANKING_STORAGE_KEY)),
    );
  } catch (error) {
    console.warn("No se pudo cargar el ranking local de carrera.", error);
    return [];
  }
}

export function saveCareerLocalRankingEntry(entry: CareerLocalRankingEntry): CareerLocalRankingEntry[] {
  const previousEntries = loadCareerLocalRanking();
  const nextEntries = limitCareerLocalRanking([entry, ...previousEntries]);

  try {
    window.localStorage.setItem(CAREER_LOCAL_RANKING_STORAGE_KEY, JSON.stringify(nextEntries));
    return nextEntries;
  } catch (error) {
    console.warn("No se pudo guardar la carrera en el ranking local.", error);
    // Si falla la escritura (p. ej. cuota de localStorage llena), no hay que
    // devolver [] : eso borraría de la vista el ranking ya guardado de
    // verdad. Se devuelven las entradas previas, que sí siguen en disco.
    return previousEntries;
  }
}

export function clearCareerLocalRanking(): void {
  try {
    window.localStorage.removeItem(CAREER_LOCAL_RANKING_STORAGE_KEY);
  } catch (error) {
    console.warn("No se pudo borrar el ranking local de carrera.", error);
  }
}
