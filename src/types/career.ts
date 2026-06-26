import type { Formation, FormationSlot, MatchResult, RivalTeam } from "./game";

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


export type CareerSupercopaParticipantSource =
  | "league_champion"
  | "league_runner_up"
  | "cup_champion"
  | "cup_runner_up"
  | "league_replacement";

export interface CareerSupercopaParticipant {
  teamId: string;
  teamName: string;
  source: CareerSupercopaParticipantSource;
  sourceLabel: string;
}

export interface CareerSupercopaQualification {
  seasonLabel: string;
  participants: CareerSupercopaParticipant[];
  userQualified: boolean;
  reason: string;
}

export interface CareerSupercopaResult {
  seasonLabel: string;
  participants: CareerSupercopaParticipant[];
  results: MatchResult[];
  played: boolean;
  won: boolean;
  eliminatedRoundName?: "Semifinal" | "Final";
  championTeamId: string;
  championTeamName: string;
  runnerUpTeamId?: string;
  runnerUpTeamName?: string;
}

export interface CareerPromotionTransition {
  relegated: RivalTeam[];
  promoted: RivalTeam[];
  secondDivisionPool: RivalTeam[];
}

export interface CareerState {
  currentSeasonIndex: number;
  currentSeasonLabel: string;
  completedSeasons: number;
  trophyCounts: CareerTrophyCounts;
  lastSeasonResult?: CareerSeasonResult;
  secondDivisionPool: RivalTeam[];
  lastPromotionTransition?: CareerPromotionTransition;
}

export type CareerRewardChoice = "player" | "coach";

export type CareerRewardFlow =
  | "standard_player"
  | "standard_coach"
  | "player_formation"
  | "coach_bonus";

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
