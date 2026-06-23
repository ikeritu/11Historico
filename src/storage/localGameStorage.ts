// src/storage/localGameStorage.ts

import type {
  FinalGameSummary,
  Formation,
  EasyModeSeasonRangeId,
  GameDifficulty,
  GamePhase,
  SelectedCoach,
  SelectedPlayer,
  SeasonId,
  TeamRating,
} from "../types/game";

import type { UserLeagueSimulationContext } from "../simulation/leagueSimulator";

const STORAGE_KEY = "once_historico_zurigorri_saved_game_v1";

export interface SavedGameState {
  gameId: string;
  phase: GamePhase;
  difficulty: GameDifficulty;
  easyModeSeasonRangeId?: EasyModeSeasonRangeId;

  selectedFormation?: Formation;
  playerRoundSeasons: SeasonId[];
  currentRoundIndex: number;

  selectedPlayers: SelectedPlayer[];
  selectedCoach?: SelectedCoach;
  teamRating?: TeamRating;

  leagueContext?: UserLeagueSimulationContext;
  finalSummary?: FinalGameSummary;
  isCareerMode?: boolean;

  savedAt: string;
}

export function saveGameState(state: Omit<SavedGameState, "savedAt">): void {
  try {
    const payload: SavedGameState = {
      ...state,
      savedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn("No se pudo guardar la partida localmente.", error);
  }
}

export function loadGameState(): SavedGameState | undefined {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return undefined;
    }

    const parsed = JSON.parse(raw) as Partial<SavedGameState>;

    return {
      ...parsed,
      gameId: parsed.gameId ?? "",
      phase: parsed.phase ?? "formation_selection",
      difficulty: parsed.difficulty ?? "dificil",
      easyModeSeasonRangeId: parsed.easyModeSeasonRangeId ?? "all",
      playerRoundSeasons: parsed.playerRoundSeasons ?? [],
      currentRoundIndex: parsed.currentRoundIndex ?? 0,
      selectedPlayers: parsed.selectedPlayers ?? [],
      isCareerMode: parsed.isCareerMode ?? false,
      savedAt: parsed.savedAt ?? new Date().toISOString(),
    } as SavedGameState;
  } catch (error) {
    console.warn("No se pudo cargar la partida local.", error);
    return undefined;
  }
}

export function clearSavedGameState(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("No se pudo borrar la partida local.", error);
  }
}

export function hasSavedGameState(): boolean {
  try {
    return Boolean(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return false;
  }
}
