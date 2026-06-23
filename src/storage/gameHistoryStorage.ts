// src/storage/gameHistoryStorage.ts

import type {
  FinalGameSummary,
  Formation,
  SelectedCoach,
  GameDifficulty,
  TeamRating,
} from "../types/game";

export interface GameHistoryEntry {
  gameId: string;
  playedAt: string;

  formationName: string;
  coachName: string;
  difficulty: GameDifficulty;

  leaguePosition: number;
  points: number;
  wins: number;
  draws: number;
  losses: number;

  goalsFor: number;
  goalsAgainst: number;
  cleanSheets: number;

  teamOverall: number;

  topScorerName?: string;
  topScorerGoals?: number;

  topAssisterName?: string;
  topAssisterAssists?: number;

  finalCategory: string;
}

const GAME_HISTORY_STORAGE_KEY = "futbol11_game_history_v1";
const MAX_HISTORY_ENTRIES = 5;

function safeParseHistory(rawValue: string | null): GameHistoryEntry[] {
  if (!rawValue) return [];

  try {
    const parsed = JSON.parse(rawValue);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter((entry): entry is GameHistoryEntry => {
      return (
        typeof entry === "object" &&
        entry !== null &&
        typeof entry.gameId === "string" &&
        typeof entry.playedAt === "string" &&
        typeof entry.formationName === "string" &&
        typeof entry.coachName === "string" &&
        (typeof entry.difficulty === "string" || typeof entry.difficulty === "undefined") &&
        typeof entry.leaguePosition === "number" &&
        typeof entry.points === "number"
      );
    });
  } catch {
    return [];
  }
}

export function loadGameHistory(): GameHistoryEntry[] {
  if (typeof window === "undefined") return [];

  return safeParseHistory(window.localStorage.getItem(GAME_HISTORY_STORAGE_KEY));
}

export function saveGameHistory(history: GameHistoryEntry[]): void {
  if (typeof window === "undefined") return;

  try {
    const cleanHistory = history.slice(0, MAX_HISTORY_ENTRIES);
    window.localStorage.setItem(GAME_HISTORY_STORAGE_KEY, JSON.stringify(cleanHistory));
  } catch {
    // No bloquea el flujo de partida si localStorage está lleno o deshabilitado.
  }
}

export function clearGameHistory(): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(GAME_HISTORY_STORAGE_KEY);
  } catch {
    // No bloquea la UI si localStorage no está disponible.
  }
}

export function buildHistoryEntry(params: {
  summary: FinalGameSummary;
  formation: Formation;
  selectedCoach: SelectedCoach;
  teamRating: TeamRating;
  difficulty?: GameDifficulty;
}): GameHistoryEntry {
  const { summary, formation, selectedCoach, teamRating, difficulty } = params;

  return {
    gameId: summary.gameId,
    playedAt: new Date().toISOString(),

    formationName: summary.formationName || formation.name,
    coachName: summary.coachName || selectedCoach.coachSeason.name,
    difficulty: difficulty ?? summary.difficulty ?? "dificil",

    leaguePosition: summary.leaguePosition,
    points: summary.points,
    wins: summary.wins,
    draws: summary.draws,
    losses: summary.losses,

    goalsFor: summary.goalsFor,
    goalsAgainst: summary.goalsAgainst,
    cleanSheets: summary.cleanSheets,

    teamOverall: teamRating.overall,

    topScorerName: summary.topScorer?.playerName,
    topScorerGoals: summary.topScorer?.goals,

    topAssisterName: summary.topAssister?.playerName,
    topAssisterAssists: summary.topAssister?.assists,

    finalCategory: summary.finalCategory,
  };
}

export function upsertGameHistoryEntry(entry: GameHistoryEntry): GameHistoryEntry[] {
  const currentHistory = loadGameHistory();

  const withoutSameGame = currentHistory.filter((item) => item.gameId !== entry.gameId);
  const nextHistory = [entry, ...withoutSameGame].slice(0, MAX_HISTORY_ENTRIES);

  saveGameHistory(nextHistory);

  return nextHistory;
}


export function getBestGameHistoryEntry(
  history: GameHistoryEntry[]
): GameHistoryEntry | undefined {
  if (history.length === 0) return undefined;

  return [...history].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (a.leaguePosition !== b.leaguePosition) return a.leaguePosition - b.leaguePosition;

    const goalDifferenceA = a.goalsFor - a.goalsAgainst;
    const goalDifferenceB = b.goalsFor - b.goalsAgainst;

    return goalDifferenceB - goalDifferenceA;
  })[0];
}
