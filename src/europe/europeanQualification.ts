// src/europe/europeanQualification.ts
//
// Europa Career Foundation (v0.24.0a) — reglas puras de clasificación europea.
//
// Reglas de Liga (fijas):
//   1º-4º  -> Champions League
//   5º-6º  -> Europa League
//   7º     -> Conference League
//   8º o peor -> sin Europa
//
// Regla de Copa del Rey:
//   Ganar la Copa garantiza como mínimo Europa League. Si la plaza de Liga ya
//   es igual o mejor (Champions o Europa League), la Copa no cambia nada. Si
//   la plaza de Liga es peor (Conference o ninguna), la Copa la mejora hasta
//   Europa League.
//
// Esta fase NO simula reasignación por campeón de Copa externo al usuario
// (fuentes "copa_runner_up_reallocation" y "league_reallocation" quedan
// reservadas para una fase futura con datos fiables de campeón de Copa).

import type {
  EuropeanCompetition,
  EuropeanQualificationResult,
} from "./europeanTypes";

export interface ResolveEuropeanQualificationInput {
  leaguePosition: number;
  userWonCopa: boolean;
  seasonNumber?: number;
}

const COMPETITION_PRIORITY: Record<EuropeanCompetition, number> = {
  champions_league: 3,
  europa_league: 2,
  conference_league: 1,
};

const NO_QUALIFICATION_PRIORITY = 0;

export function getEuropeanCompetitionLabel(competition: EuropeanCompetition | null): string {
  if (competition === "champions_league") return "Champions League";
  if (competition === "europa_league") return "Europa League";
  if (competition === "conference_league") return "Conference League";
  return "Sin clasificación europea";
}

export function getEuropeanCompetitionShortLabel(competition: EuropeanCompetition | null): string {
  if (competition === "champions_league") return "Champions";
  if (competition === "europa_league") return "Europa League";
  if (competition === "conference_league") return "Conference";
  return "Sin Europa";
}

export function getEuropeanCompetitionBadgeLabel(competition: EuropeanCompetition | null): string {
  if (competition === "champions_league") return "UCL";
  if (competition === "europa_league") return "UEL";
  if (competition === "conference_league") return "UECL";
  return "—";
}

export function compareEuropeanQualificationPriority(
  a: EuropeanCompetition | null,
  b: EuropeanCompetition | null,
): number {
  const priorityA = a ? COMPETITION_PRIORITY[a] : NO_QUALIFICATION_PRIORITY;
  const priorityB = b ? COMPETITION_PRIORITY[b] : NO_QUALIFICATION_PRIORITY;
  return priorityA - priorityB;
}

export function isEuropeanQualified(input: { qualified: boolean } | null | undefined): boolean {
  return Boolean(input?.qualified);
}

function getLeaguePositionCompetition(leaguePosition: number): EuropeanCompetition | null {
  if (leaguePosition >= 1 && leaguePosition <= 4) return "champions_league";
  if (leaguePosition === 5 || leaguePosition === 6) return "europa_league";
  if (leaguePosition === 7) return "conference_league";
  return null;
}

export function resolveEuropeanQualification(
  input: ResolveEuropeanQualificationInput,
): EuropeanQualificationResult {
  const { leaguePosition, userWonCopa } = input;
  const leagueCompetition = getLeaguePositionCompetition(leaguePosition);
  const leaguePriority = leagueCompetition ? COMPETITION_PRIORITY[leagueCompetition] : NO_QUALIFICATION_PRIORITY;
  const copaGuaranteedPriority = COMPETITION_PRIORITY.europa_league;

  if (userWonCopa && leaguePriority < copaGuaranteedPriority) {
    const upgradedFromConference = leagueCompetition === "conference_league";

    return {
      qualified: true,
      competition: "europa_league",
      source: "copa_winner",
      label: "Clasificado a Europa League",
      shortLabel: "Europa League",
      explanation: upgradedFromConference
        ? "La Copa del Rey mejora tu plaza europea: pasas de Conference League a Europa League."
        : "Clasificado a Europa League por ganar la Copa del Rey.",
      priority: copaGuaranteedPriority,
    };
  }

  if (leagueCompetition) {
    return {
      qualified: true,
      competition: leagueCompetition,
      source: "league_position",
      label: `Clasificado a ${getEuropeanCompetitionLabel(leagueCompetition)}`,
      shortLabel: getEuropeanCompetitionShortLabel(leagueCompetition),
      explanation: `Clasificado a ${getEuropeanCompetitionLabel(leagueCompetition)} por posición final en Liga (${leaguePosition}.º).`,
      priority: leaguePriority,
    };
  }

  return {
    qualified: false,
    competition: null,
    source: "none",
    label: "Sin clasificación europea",
    shortLabel: "Sin Europa",
    explanation: "El Athletic no se ha clasificado para competición europea esta temporada.",
    priority: NO_QUALIFICATION_PRIORITY,
  };
}
