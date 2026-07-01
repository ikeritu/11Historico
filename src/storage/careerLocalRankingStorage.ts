import { limitCareerLocalRanking } from "../career/careerRanking";
import type { CareerLocalRankingEntry } from "../types/career";

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
  try {
    const previousEntries = loadCareerLocalRanking();
    const nextEntries = limitCareerLocalRanking([entry, ...previousEntries]);

    window.localStorage.setItem(CAREER_LOCAL_RANKING_STORAGE_KEY, JSON.stringify(nextEntries));
    return nextEntries;
  } catch (error) {
    console.warn("No se pudo guardar la carrera en el ranking local.", error);
    return [];
  }
}

export function clearCareerLocalRanking(): void {
  try {
    window.localStorage.removeItem(CAREER_LOCAL_RANKING_STORAGE_KEY);
  } catch (error) {
    console.warn("No se pudo borrar el ranking local de carrera.", error);
  }
}
