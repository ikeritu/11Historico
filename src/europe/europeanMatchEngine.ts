// src/europe/europeanMatchEngine.ts
//
// European Match Engine Integration (v0.24.1b) — simula partidos europeos
// reutilizando el motor de partidos existente (`simulateMatch` en
// `src/simulation/matchEngine.ts`), en vez de crear un motor nuevo.
//
// Como `EuropeanOpponent` solo tiene un rating global (no desglose por
// línea como `RivalTeam`), se construyen adaptadores mínimos: un
// `TeamRating`/`RivalTeam` con reparto uniforme a partir del rating recibido.
// Esto reutiliza fielmente las fórmulas de expected-goals, ventaja de
// local/visitante y varianza ya ajustadas y probadas para Liga/Copa, sin
// tocar `matchEngine.ts` ni sus probabilidades.

import { simulateMatch } from "../simulation/matchEngine";
import type { RivalTeam, RivalTeamRatings, TeamRating } from "../types/game";
import type { EuropeanCompetition, EuropeanMatchOutcome } from "./europeanTypes";

export interface SimulateEuropeanMatchInput {
  /** Rating global del usuario ya con ratingDelta/dificultad de temporada aplicados. */
  userTeamRating: number;
  /** Rating global del rival europeo (`EuropeanOpponent.rating`). */
  opponentRating: number;
  isHome: boolean;
  competition: EuropeanCompetition;
  seed?: string | number;
}

export interface SimulateEuropeanMatchOutput {
  userGoals: number;
  opponentGoals: number;
  result: EuropeanMatchOutcome;
}

function clampRating(value: number): number {
  return Math.max(40, Math.min(99, Math.round(value)));
}

function buildUniformTeamRating(overall: number): TeamRating {
  const clamped = clampRating(overall);

  return {
    attack: clamped,
    defense: clamped,
    control: clamped,
    physical: clamped,
    mentality: clamped,
    goalkeeping: clamped,
    overall: clamped,
    profileLabel: "Europa",
    strengths: [],
    weaknesses: [],
  };
}

function buildUniformRivalTeam(rating: number, competition: EuropeanCompetition): RivalTeam {
  const clamped = clampRating(rating);
  const ratings: RivalTeamRatings = {
    attack: clamped,
    midfield: clamped,
    defense: clamped,
    goalkeeping: clamped,
    mentality: clamped,
    overall: clamped,
  };

  return {
    id: `european_rival_${competition}`,
    name: "Rival europeo",
    shirtIcon: "🇪🇺",
    ratings,
  };
}

function seedToNumber(seed?: string | number): number | undefined {
  if (typeof seed === "number") return seed;
  if (typeof seed !== "string") return undefined;

  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0;
  }

  return hash;
}

/**
 * Simula un partido europeo reutilizando `simulateMatch`. No genera
 * estadísticas individuales (goleadores/asistentes): esta fase solo necesita
 * el marcador y el resultado.
 */
export function simulateEuropeanMatch(input: SimulateEuropeanMatchInput): SimulateEuropeanMatchOutput {
  const { userTeamRating, opponentRating, isHome, competition, seed } = input;

  const teamRating = buildUniformTeamRating(userTeamRating);
  const rival = buildUniformRivalTeam(opponentRating, competition);

  const matchResult = simulateMatch({
    fixtureId: `european_${competition}`,
    matchday: 0,
    rival,
    venue: isHome ? "home" : "away",
    teamRating,
    selectedPlayers: [],
    seed: seedToNumber(seed),
  });

  const userGoals = isHome ? matchResult.homeGoals : matchResult.awayGoals;
  const opponentGoals = isHome ? matchResult.awayGoals : matchResult.homeGoals;

  const result: EuropeanMatchOutcome = matchResult.userTeamWon
    ? "win"
    : matchResult.userTeamDrew
      ? "draw"
      : "loss";

  return { userGoals, opponentGoals, result };
}
