// src/europe/europeanTypes.ts
//
// Europa Career Foundation (v0.24.0a).
//
// Tipos puros para la base de reglas de clasificación europea. Esta fase NO
// incluye partidos europeos, calendario, eliminatorias ni ranking europeo:
// solo determina a qué competición se clasificaría el Athletic al final de
// temporada y deja ese dato preparado para fases futuras.
//
// Importante: este módulo es independiente del tipo `EuropeanCompetition`
// heredado de `src/types/career.ts` (usado por `getEuropeanQualification` en
// `src/career/careerRules.ts` para decidir si la carrera sobrevive). Ese
// mecanismo interno no se toca en esta fase. Ver docs/v0_24_0c_EUROPA_QUALIFICATION_FOUNDATION.md
// para la justificación de mantener ambos sistemas por separado.

export type EuropeanCompetition =
  | "champions_league"
  | "europa_league"
  | "conference_league";

export type EuropeanQualificationSource =
  | "league_position"
  | "copa_winner"
  | "copa_runner_up_reallocation"
  | "league_reallocation"
  | "none";

export interface EuropeanQualificationResult {
  qualified: boolean;
  competition: EuropeanCompetition | null;
  source: EuropeanQualificationSource;
  label: string;
  shortLabel: string;
  explanation: string;
  priority: number;
}

export interface EuropeanSeasonEntry {
  seasonNumber: number;
  qualified: boolean;
  competition: EuropeanCompetition | null;
  source: EuropeanQualificationSource;
  explanation: string;
  achievedFromLeaguePosition?: number;
  achievedFromCopa?: boolean;
}

export interface EuropeanCareerState {
  currentQualification?: EuropeanSeasonEntry | null;
  history: EuropeanSeasonEntry[];
  bestCompetition?: EuropeanCompetition | null;
  totalQualifications: number;
}
