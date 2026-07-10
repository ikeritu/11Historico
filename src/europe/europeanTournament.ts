// src/europe/europeanTournament.ts
//
// European Tournament Skeleton (v0.24.1a) — funciones puras del torneo
// europeo simplificado: fase inicial de 6 partidos, semifinal y final a
// partido único. No incluye todavía formato UEFA completo de 36 equipos ni
// eliminatorias ida/vuelta.
//
// Reglas de avance:
// - Fase inicial (6 partidos): 10+ puntos -> semifinal. Menos de 10 -> eliminado.
// - Semifinal (partido único): gana -> final. Pierde -> eliminado.
// - Final (partido único): gana -> campeón. Pierde -> finalista.
//
// Importante: un "campeón europeo" en esta fase queda registrado solo como
// resultado interno del torneo (`tournament.champion`). NO se suma todavía
// al palmarés histórico (`CareerTrophyCounts`) — esa integración queda para
// v0.24.3b, tal y como pide el encargo de esta fase.

import { getEuropeanMatchdaySlots } from "./europeanCalendar";
import { pickEuropeanOpponents, pickSingleEuropeanOpponent } from "./europeanOpponents";
import { getEuropeanCompetitionLabel } from "./europeanQualification";
import type {
  EuropeanCompetition,
  EuropeanMatchOutcome,
  EuropeanQualificationResult,
  EuropeanSeasonEntry,
  EuropeanTournamentMatch,
  EuropeanTournamentPhase,
  EuropeanTournamentState,
} from "./europeanTypes";

export const EUROPEAN_LEAGUE_PHASE_MATCH_COUNT = 6;
export const EUROPEAN_LEAGUE_PHASE_QUALIFICATION_POINTS = 10;

export interface CreateEuropeanTournamentInput {
  seasonNumber: number;
  qualification: EuropeanSeasonEntry | EuropeanQualificationResult | null | undefined;
  seed?: string | number;
  totalLeagueMatchdays?: number;
}

/**
 * Crea el torneo europeo de una temporada a partir de la clasificación
 * obtenida. Devuelve `null` si no hay clasificación (o no es válida). No
 * simula ningún partido: solo genera el fixture inicial de 6 partidos.
 */
export function createEuropeanTournamentForQualification(
  input: CreateEuropeanTournamentInput,
): EuropeanTournamentState | null {
  const { seasonNumber, qualification, seed, totalLeagueMatchdays } = input;

  if (!qualification || !qualification.qualified || !qualification.competition) {
    return null;
  }

  const competition = qualification.competition;
  const opponents = pickEuropeanOpponents({
    competition,
    count: EUROPEAN_LEAGUE_PHASE_MATCH_COUNT,
    seed: seed ?? `${seasonNumber}_${competition}`,
  });

  const slots = getEuropeanMatchdaySlots(totalLeagueMatchdays);

  const matches: EuropeanTournamentMatch[] = opponents.map((opponent, index) => ({
    id: `euro_${seasonNumber}_${competition}_lp${index + 1}`,
    seasonNumber,
    competition,
    matchday: slots.leaguePhase[index] ?? slots.leaguePhase[slots.leaguePhase.length - 1],
    phase: "league_phase",
    opponent,
    isHome: index % 2 === 0,
    status: "scheduled",
  }));

  return {
    seasonNumber,
    competition,
    phase: "league_phase",
    matches,
    leaguePhasePoints: 0,
    leaguePhasePlayed: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    qualifiedForSemifinal: false,
    eliminated: false,
    completed: false,
    champion: false,
    currentMatchId: matches[0]?.id ?? null,
  };
}

/**
 * Devuelve el siguiente partido `scheduled` del torneo, o `null` si no hay
 * ninguno pendiente (o el torneo está eliminado/completado).
 */
export function getNextEuropeanMatch(
  tournament: EuropeanTournamentState | null | undefined,
): EuropeanTournamentMatch | null {
  if (!tournament || tournament.eliminated || tournament.completed) return null;

  return tournament.matches.find((match) => match.status === "scheduled") ?? null;
}

export interface EuropeanMatchResultInput {
  userGoals: number;
  opponentGoals: number;
  result: EuropeanMatchOutcome;
}

function createFollowUpMatch(params: {
  state: EuropeanTournamentState;
  phase: Extract<EuropeanTournamentPhase, "semifinal" | "final">;
  matchday: number;
  isHome: boolean;
}): EuropeanTournamentMatch {
  const { state, phase, matchday, isHome } = params;

  const opponent = pickSingleEuropeanOpponent({
    competition: state.competition,
    seed: `${state.seasonNumber}_${state.competition}_${phase}`,
    excludeIds: state.matches.map((match) => match.opponent.id),
  });

  return {
    id: `euro_${state.seasonNumber}_${state.competition}_${phase}`,
    seasonNumber: state.seasonNumber,
    competition: state.competition,
    matchday,
    phase,
    opponent,
    isHome,
    status: "scheduled",
  };
}

function advanceToSemifinal(state: EuropeanTournamentState, totalLeagueMatchdays?: number): EuropeanTournamentState {
  const alreadyExists = state.matches.some((match) => match.phase === "semifinal");
  const slots = getEuropeanMatchdaySlots(totalLeagueMatchdays);

  const matches = alreadyExists
    ? state.matches
    : [
        ...state.matches,
        createFollowUpMatch({ state, phase: "semifinal", matchday: slots.semifinal, isHome: true }),
      ];

  const semifinalMatch = matches.find((match) => match.phase === "semifinal");

  return {
    ...state,
    matches,
    phase: "semifinal",
    qualifiedForSemifinal: true,
    currentMatchId: semifinalMatch && semifinalMatch.status === "scheduled" ? semifinalMatch.id : state.currentMatchId,
  };
}

function advanceToFinal(state: EuropeanTournamentState, totalLeagueMatchdays?: number): EuropeanTournamentState {
  const alreadyExists = state.matches.some((match) => match.phase === "final");
  const slots = getEuropeanMatchdaySlots(totalLeagueMatchdays);

  const matches = alreadyExists
    ? state.matches
    : [
        ...state.matches,
        createFollowUpMatch({ state, phase: "final", matchday: slots.final, isHome: false }),
      ];

  const finalMatch = matches.find((match) => match.phase === "final");

  return {
    ...state,
    matches,
    phase: "final",
    currentMatchId: finalMatch && finalMatch.status === "scheduled" ? finalMatch.id : state.currentMatchId,
  };
}

/**
 * Marca un partido como jugado, actualiza estadísticas y avanza de fase
 * cuando corresponde. Es idempotente: si el partido ya estaba `played`, o si
 * la fase siguiente (semifinal/final) ya existe, no la duplica.
 */
export function applyEuropeanMatchResult(
  tournament: EuropeanTournamentState,
  matchId: string,
  outcome: EuropeanMatchResultInput,
  totalLeagueMatchdays?: number,
): EuropeanTournamentState {
  const matchIndex = tournament.matches.findIndex((match) => match.id === matchId);
  if (matchIndex === -1) return tournament;

  const match = tournament.matches[matchIndex];
  if (match.status === "played") return tournament;

  const updatedMatch: EuropeanTournamentMatch = {
    ...match,
    status: "played",
    userGoals: outcome.userGoals,
    opponentGoals: outcome.opponentGoals,
    result: outcome.result,
  };

  const matches = [...tournament.matches];
  matches[matchIndex] = updatedMatch;

  const pointsEarned = outcome.result === "win" ? 3 : outcome.result === "draw" ? 1 : 0;

  let state: EuropeanTournamentState = {
    ...tournament,
    matches,
    wins: tournament.wins + (outcome.result === "win" ? 1 : 0),
    draws: tournament.draws + (outcome.result === "draw" ? 1 : 0),
    losses: tournament.losses + (outcome.result === "loss" ? 1 : 0),
    goalsFor: tournament.goalsFor + outcome.userGoals,
    goalsAgainst: tournament.goalsAgainst + outcome.opponentGoals,
  };

  if (match.phase === "league_phase") {
    state = {
      ...state,
      leaguePhasePoints: state.leaguePhasePoints + pointsEarned,
      leaguePhasePlayed: state.leaguePhasePlayed + 1,
    };

    if (state.leaguePhasePlayed >= EUROPEAN_LEAGUE_PHASE_MATCH_COUNT) {
      if (state.leaguePhasePoints >= EUROPEAN_LEAGUE_PHASE_QUALIFICATION_POINTS) {
        state = advanceToSemifinal(state, totalLeagueMatchdays);
      } else {
        state = { ...state, phase: "eliminated", eliminated: true, completed: true, currentMatchId: null };
      }
    }
  } else if (match.phase === "semifinal") {
    if (outcome.result === "win") {
      state = advanceToFinal(state, totalLeagueMatchdays);
    } else {
      state = { ...state, phase: "eliminated", eliminated: true, completed: true, currentMatchId: null };
    }
  } else if (match.phase === "final") {
    state = {
      ...state,
      phase: "completed",
      completed: true,
      champion: outcome.result === "win",
      currentMatchId: null,
    };
  }

  if (!state.completed && !state.eliminated) {
    const nextScheduled = state.matches.find((candidate) => candidate.status === "scheduled");
    state = { ...state, currentMatchId: nextScheduled?.id ?? null };
  }

  return state;
}

export function getEuropeanTournamentPhaseLabel(phase: EuropeanTournamentPhase): string {
  if (phase === "league_phase") return "Fase inicial";
  if (phase === "semifinal") return "Semifinal";
  if (phase === "final") return "Final";
  if (phase === "completed") return "Torneo completado";
  if (phase === "eliminated") return "Eliminado";
  return "Sin empezar";
}

/**
 * Texto de estado del torneo. Deliberadamente NO dice que un título europeo
 * ya se ha sumado al palmarés (eso llega en v0.24.3b).
 */
export function getEuropeanTournamentStatusText(tournament: EuropeanTournamentState): string {
  if (tournament.eliminated) return "Eliminado de Europa";
  if (tournament.completed && tournament.champion) return "Campeón europeo pendiente de integración en palmarés";
  if (tournament.completed && !tournament.champion) return "Finalista europeo";
  if (tournament.phase === "final") return "Final europea alcanzada";
  if (tournament.phase === "semifinal") return "Clasificado a semifinales";
  return "Fase inicial en marcha";
}

export interface EuropeanTournamentSummary {
  competition: EuropeanCompetition;
  competitionLabel: string;
  phase: EuropeanTournamentPhase;
  phaseLabel: string;
  matchesPlayed: number;
  totalMatches: number;
  points: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  statusText: string;
}

/**
 * Resumen de torneo listo para UI/QA: competición, fase, partidos jugados,
 * puntos y estado.
 */
export function getEuropeanTournamentSummary(tournament: EuropeanTournamentState): EuropeanTournamentSummary {
  const matchesPlayed = tournament.matches.filter((match) => match.status === "played").length;

  return {
    competition: tournament.competition,
    competitionLabel: getEuropeanCompetitionLabel(tournament.competition),
    phase: tournament.phase,
    phaseLabel: getEuropeanTournamentPhaseLabel(tournament.phase),
    matchesPlayed,
    totalMatches: tournament.matches.length,
    points: tournament.leaguePhasePoints,
    wins: tournament.wins,
    draws: tournament.draws,
    losses: tournament.losses,
    goalsFor: tournament.goalsFor,
    goalsAgainst: tournament.goalsAgainst,
    statusText: getEuropeanTournamentStatusText(tournament),
  };
}
