import type { Formation, FormationSlot } from "./game";

export type EuropeanCompetition =
  | "champions"
  | "europa_league"
  | "conference"
  | "none";

export type CareerTrophy =
  | "champions"
  | "liga"
  | "europa_league"
  | "copa"
  | "conference"
  | "supercopa";

export interface CareerTrophyCounts {
  champions: number;
  liga: number;
  europaLeague: number;
  copa: number;
  conference: number;
  supercopa: number;
}

export interface CareerSeasonResult {
  seasonLabel: string;
  leaguePosition: number;
  wonLeague: boolean;
  wonCopa: boolean;
  wonSupercopa: boolean;
  isRelegated: boolean;
  europeanQualification: EuropeanCompetition;
}

export interface CareerObjectiveResult {
  survives: boolean;
  reason: string;
  isGameOver: boolean;
  qualifiedForEurope: boolean;
  wonCopa: boolean;
  isRelegated: boolean;
}

export interface CareerState {
  currentSeasonIndex: number;
  currentSeasonLabel: string;
  completedSeasons: number;
  trophyCounts: CareerTrophyCounts;
  lastSeasonResult?: CareerSeasonResult;
}

export type CareerRewardChoice = "player" | "coach";

export interface FormationLineCounts {
  goalkeeper: number;
  defense: number;
  midfield: number;
  attack: number;
}

export interface FormationChangeEligibility {
  canChange: boolean;
  reason: string;
  from: Formation["id"];
  to: Formation["id"];
  removedLine?: FormationSlot["line"];
  addedLine?: FormationSlot["line"];
}
