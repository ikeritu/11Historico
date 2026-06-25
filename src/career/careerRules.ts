import type { Formation } from "../types/game";
import type {
  CareerObjectiveResult,
  CareerSeasonResult,
  CareerTrophyCounts,
  EuropeanCompetition,
  FormationChangeEligibility,
  FormationLineCounts,
} from "../types/career";

export const CAREER_INITIAL_SEASON_LABEL = "2025/26";
export const CAREER_RELEGATION_POSITION = 18;

export const CAREER_PALMARES_POINTS: CareerTrophyCounts = {
  champions: 10,
  liga: 8,
  europaLeague: 6,
  copa: 5,
  conference: 4,
  supercopa: 2,
};

export function getEuropeanQualification(
  leaguePosition: number,
  wonCopa: boolean,
): EuropeanCompetition {
  if (leaguePosition >= 1 && leaguePosition <= 4) return "champions";

  const europaLeagueSlots = wonCopa ? [5, 6] : [5];
  if (europaLeagueSlots.includes(leaguePosition)) return "europa_league";

  const conferenceSlot = wonCopa ? 7 : 6;
  if (leaguePosition === conferenceSlot) return "conference";

  return "none";
}

function getCareerObjectiveSuccessReason(result: CareerSeasonResult): string {
  if (result.wonCopa) return "Objetivo cumplido: campeón de Copa del Rey.";
  if (result.europeanQualification === "champions") {
    return "Objetivo cumplido: clasificación a Champions League.";
  }
  if (result.europeanQualification === "europa_league") {
    return "Objetivo cumplido: clasificación a Europa League.";
  }
  if (result.europeanQualification === "conference") {
    return "Objetivo cumplido: clasificación a Conference League.";
  }

  return "Objetivo cumplido: clasificación europea.";
}

export function evaluateCareerObjective(
  result: CareerSeasonResult,
): CareerObjectiveResult {
  if (result.isRelegated) {
    return {
      survives: false,
      reason: "Descenso: Game Over aunque haya ganado Copa.",
      isGameOver: true,
      qualifiedForEurope: result.europeanQualification !== "none",
      wonCopa: result.wonCopa,
      isRelegated: true,
    };
  }

  const qualifiedForEurope = result.europeanQualification !== "none";
  const survives = qualifiedForEurope || result.wonCopa;

  return {
    survives,
    reason: survives
      ? getCareerObjectiveSuccessReason(result)
      : "Objetivo fallido: no clasificó a Europa ni ganó Copa.",
    isGameOver: !survives,
    qualifiedForEurope,
    wonCopa: result.wonCopa,
    isRelegated: false,
  };
}

export function getRivalDifficultyBonus(completedSeasons: number): number {
  if (completedSeasons <= 0) return 0;

  let bonus = 0;
  for (let season = 1; season <= completedSeasons; season += 1) {
    if (season <= 3) bonus += 0.5;
    else if (season <= 6) bonus += 1;
    else bonus += 1.5;
  }

  return Math.min(bonus, 10);
}

export function getCupDifficultyBonus(completedSeasons: number): number {
  return Math.max(0, completedSeasons) * 0.15;
}

export function calculatePalmaresScore(trophies: CareerTrophyCounts): number {
  return (
    trophies.champions * CAREER_PALMARES_POINTS.champions +
    trophies.liga * CAREER_PALMARES_POINTS.liga +
    trophies.europaLeague * CAREER_PALMARES_POINTS.europaLeague +
    trophies.copa * CAREER_PALMARES_POINTS.copa +
    trophies.conference * CAREER_PALMARES_POINTS.conference +
    trophies.supercopa * CAREER_PALMARES_POINTS.supercopa
  );
}

export function getFormationLineCounts(formation: Formation): FormationLineCounts {
  return formation.slots.reduce<FormationLineCounts>(
    (counts, slot) => ({
      ...counts,
      [slot.line]: counts[slot.line] + 1,
    }),
    { goalkeeper: 0, defense: 0, midfield: 0, attack: 0 },
  );
}

export function canChangeFormationWithOnePlayer(
  fromFormation: Formation,
  toFormation: Formation,
): FormationChangeEligibility {
  const fromCounts = getFormationLineCounts(fromFormation);
  const toCounts = getFormationLineCounts(toFormation);

  if (fromCounts.goalkeeper !== 1 || toCounts.goalkeeper !== 1) {
    return {
      canChange: false,
      reason: "Todas las formaciones de carrera deben tener exactamente un portero.",
      from: fromFormation.id,
      to: toFormation.id,
    };
  }

  const lines = ["defense", "midfield", "attack"] as const;
  const removedLines = lines.filter((line) => fromCounts[line] - toCounts[line] === 1);
  const addedLines = lines.filter((line) => toCounts[line] - fromCounts[line] === 1);
  const changedTooMuch = lines.some(
    (line) => Math.abs(fromCounts[line] - toCounts[line]) > 1,
  );

  if (changedTooMuch || removedLines.length > 1 || addedLines.length > 1) {
    return {
      canChange: false,
      reason: "La nueva formación exige cambiar más de un jugador de línea.",
      from: fromFormation.id,
      to: toFormation.id,
    };
  }

  const unchanged = removedLines.length === 0 && addedLines.length === 0;
  if (unchanged) {
    return {
      canChange: true,
      reason: "La formación no cambia la estructura de líneas.",
      from: fromFormation.id,
      to: toFormation.id,
    };
  }

  const canChange = removedLines.length === 1 && addedLines.length === 1;

  return {
    canChange,
    reason: canChange
      ? "Cambio compatible: sale un jugador de una línea y entra otro en otra línea."
      : "La nueva formación no encaja con un único cambio de jugador.",
    from: fromFormation.id,
    to: toFormation.id,
    removedLine: removedLines[0],
    addedLine: addedLines[0],
  };
}
