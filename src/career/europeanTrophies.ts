import type { CareerTrophyCounts } from "../types/career";
import type { EuropeanCompetition, EuropeanTournamentState } from "../europe/europeanTypes";

export type EuropeanCareerTrophyKey = "champions" | "europaLeague" | "conference";

export function getEuropeanCareerTrophyKey(
  competition: EuropeanCompetition,
): EuropeanCareerTrophyKey {
  if (competition === "champions_league") return "champions";
  if (competition === "europa_league") return "europaLeague";
  return "conference";
}

export function getEuropeanCareerTrophyLabel(
  competition: EuropeanCompetition,
): string {
  if (competition === "champions_league") return "Champions League";
  if (competition === "europa_league") return "Europa League";
  return "Conference League";
}

export function hasPendingEuropeanTrophy(
  tournament: EuropeanTournamentState | null | undefined,
): tournament is EuropeanTournamentState {
  return Boolean(
    tournament &&
      tournament.completed &&
      tournament.champion &&
      !tournament.europeanTrophyAwarded,
  );
}

export function addEuropeanTrophyToCounts(
  trophyCounts: CareerTrophyCounts,
  tournament: EuropeanTournamentState | null | undefined,
): CareerTrophyCounts {
  if (!hasPendingEuropeanTrophy(tournament)) return trophyCounts;

  const trophyKey = getEuropeanCareerTrophyKey(tournament.competition);

  return {
    ...trophyCounts,
    [trophyKey]: trophyCounts[trophyKey] + 1,
  };
}

export function markEuropeanTrophyAwarded(
  tournament: EuropeanTournamentState,
  awardedAt = new Date().toISOString(),
): EuropeanTournamentState {
  if (!hasPendingEuropeanTrophy(tournament)) return tournament;

  return {
    ...tournament,
    europeanTrophyAwarded: true,
    europeanTrophyAwardedAt: awardedAt,
  };
}

export function awardEuropeanTrophyToCareer(params: {
  trophyCounts: CareerTrophyCounts;
  tournament: EuropeanTournamentState | null | undefined;
  awardedAt?: string;
}): { trophyCounts: CareerTrophyCounts; tournament: EuropeanTournamentState | null | undefined; awarded: boolean } {
  if (!hasPendingEuropeanTrophy(params.tournament)) {
    return {
      trophyCounts: params.trophyCounts,
      tournament: params.tournament,
      awarded: false,
    };
  }

  const nextTrophyCounts = addEuropeanTrophyToCounts(params.trophyCounts, params.tournament);

  return {
    trophyCounts: nextTrophyCounts,
    tournament: markEuropeanTrophyAwarded(params.tournament, params.awardedAt),
    awarded: true,
  };
}
