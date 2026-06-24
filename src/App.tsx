// src/App.tsx

import { useEffect, useMemo, useState } from "react";

import type {
  EasyModeSeasonRangeId,
  FinalGameSummary,
  Formation,
  GameDifficulty,
  GamePhase,
  SelectedCoach,
  SelectedPlayer,
  SeasonId,
  TeamRating,
  RivalTeam,
} from "./types/game";

import type { UserLeagueSimulationContext } from "./simulation/leagueSimulator";
import {
  createNextCareerLeagueTransition,
  getInitialCareerLeagueRivals,
  getInitialCareerSecondDivisionPool,
} from "./simulation/leagueSimulator";
import type { CareerObjectiveResult, CareerPromotionTransition, CareerSeasonResult, CareerTrophyCounts } from "./types/career";

import { getPlayerIdentityKey, resolvePlayerSlotPlacement } from "./domain/positionRules";

import { getAvailableAthleticSeasons } from "./data/athleticSeasons";
import {
  DEFAULT_EASY_MODE_SEASON_RANGE_ID,
  getAthleticSeasonsForEasyModeRange,
} from "./data/easyModeSeasonRanges";

import GameHome from "./components/GameHome";
import PhaseProgress from "./components/PhaseProgress";
import FormationSelector from "./components/FormationSelector";
import SeasonReveal from "./components/SeasonReveal";
import PlayerRound from "./components/PlayerRound";
import CoachRound from "./components/CoachRound";
import TeamSummary from "./components/TeamSummary";
import LeagueSimulatorView from "./components/LeagueSimulatorView";
import FinalSummary from "./components/FinalSummary";
import CareerSeasonOutcome from "./components/CareerSeasonOutcome";
import CareerInterseasonReward from "./components/CareerInterseasonReward";
import CareerPlayerReplacementPicker from "./components/CareerPlayerReplacementPicker";

import {
  clearSavedGameState,
  hasSavedGameState,
  loadGameState,
  saveGameState,
} from "./storage/localGameStorage";

import {
  CAREER_INITIAL_SEASON_LABEL,
  CAREER_RELEGATION_POSITION,
  evaluateCareerObjective,
  getEuropeanQualification,
} from "./career/careerRules";

import "./App.css";

const TOTAL_PLAYER_ROUNDS = 11;


function createEmptyCareerTrophyCounts(): CareerTrophyCounts {
  return {
    champions: 0,
    liga: 0,
    europaLeague: 0,
    copa: 0,
    conference: 0,
    supercopa: 0,
  };
}

function getCareerSeasonLabelFromIndex(index: number): string {
  const startYear = 2025 + Math.max(0, index);
  const endYear = String((startYear + 1) % 100).padStart(2, "0");

  return `${startYear}/${endYear}`;
}

function addCareerTrophiesFromSeason(
  trophyCounts: CareerTrophyCounts,
  seasonResult: CareerSeasonResult,
): CareerTrophyCounts {
  return {
    ...trophyCounts,
    liga: trophyCounts.liga + (seasonResult.wonLeague ? 1 : 0),
    copa: trophyCounts.copa + (seasonResult.wonCopa ? 1 : 0),
    supercopa: trophyCounts.supercopa + (seasonResult.wonSupercopa ? 1 : 0),
  };
}

type AppScreen =
  | "home"
  | "career_preview"
  | "career_season_result"
  | "career_game_over"
  | "career_interseason_reward"
  | "career_player_replacement_pick"
  | "career_player_replacement_draft"
  | "season_reveal"
  | GamePhase;

function getSeasonYearNumber(season: SeasonId): number {
  const [startYear] = season.split("/");
  const parsed = Number(startYear);

  return Number.isFinite(parsed) ? parsed : 0;
}

function getSeasonDecadeBucket(season: SeasonId): number {
  const year = getSeasonYearNumber(season);

  return Math.floor(year / 10) * 10;
}

function pickRandomSeason(
  seasons: SeasonId[],
  excludedSeasons: Set<SeasonId> = new Set(),
  previousSeason?: SeasonId
): SeasonId {
  if (seasons.length === 0) {
    throw new Error("No hay temporadas disponibles en athleticSeasons.ts");
  }

  const eligibleSeasons = seasons.filter((season) => !excludedSeasons.has(season));
  const uniquePool = eligibleSeasons.length > 0 ? eligibleSeasons : seasons;

  const previousDecade = previousSeason ? getSeasonDecadeBucket(previousSeason) : undefined;
  const variedPool = previousDecade === undefined
    ? uniquePool
    : uniquePool.filter((season) => getSeasonDecadeBucket(season) !== previousDecade);

  const pool = variedPool.length > 0 ? variedPool : uniquePool;
  const index = Math.floor(Math.random() * pool.length);

  return pool[index];
}

function createRandomPlayerRoundSeasons(totalRounds: number, seasons: SeasonId[] = getAvailableAthleticSeasons()): SeasonId[] {
  const usedSeasons = new Set<SeasonId>();
  const selectedSeasons: SeasonId[] = [];

  for (let roundIndex = 0; roundIndex < totalRounds; roundIndex += 1) {
    const previousSeason = selectedSeasons[selectedSeasons.length - 1];
    const nextSeason = pickRandomSeason(seasons, usedSeasons, previousSeason);
    selectedSeasons.push(nextSeason);
    usedSeasons.add(nextSeason);
  }

  return selectedSeasons;
}

function getDraftSeasonPool(params: {
  difficulty: GameDifficulty;
  easyModeSeasonRangeId: EasyModeSeasonRangeId;
}): SeasonId[] {
  return params.difficulty === "normal"
    ? getAthleticSeasonsForEasyModeRange(params.easyModeSeasonRangeId)
    : getAvailableAthleticSeasons();
}

function createGameId(): string {
  return `game_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}


function buildCareerSeasonResult(summary: FinalGameSummary, seasonLabel = CAREER_INITIAL_SEASON_LABEL): CareerSeasonResult {
  const wonCopa = Boolean(summary.cupTrophyWon);

  return {
    seasonLabel,
    leaguePosition: summary.leaguePosition,
    wonLeague: summary.leaguePosition === 1,
    wonCopa,
    wonSupercopa: false,
    isRelegated: summary.leaguePosition >= CAREER_RELEGATION_POSITION,
    europeanQualification: getEuropeanQualification(summary.leaguePosition, wonCopa),
  };
}


interface TeamValidationResult {
  valid: boolean;
  errors: string[];
}


function validateSelectedTeam(params: {
  formation?: Formation;
  selectedPlayers: SelectedPlayer[];
}): TeamValidationResult {
  const { formation, selectedPlayers } = params;
  const errors: string[] = [];

  if (!formation) {
    errors.push("No hay formación seleccionada.");
    return { valid: false, errors };
  }

  if (selectedPlayers.length !== TOTAL_PLAYER_ROUNDS) {
    errors.push(`El once está incompleto: ${selectedPlayers.length}/${TOTAL_PLAYER_ROUNDS} jugadores.`);
  }

  const seenNames = new Map<string, string>();
  const seenSlots = new Map<string, string>();

  for (const selected of selectedPlayers) {
    const normalizedName = getPlayerIdentityKey(selected.playerSeason);
    const previousName = seenNames.get(normalizedName);

    if (previousName) {
      errors.push(`Jugador repetido: ${selected.playerSeason.name}.`);
    } else {
      seenNames.set(normalizedName, selected.playerSeason.name);
    }

    const previousSlot = seenSlots.get(selected.slotId);

    if (previousSlot) {
      errors.push(
        `Puesto ocupado dos veces: ${selected.slotId} (${previousSlot} y ${selected.playerSeason.name}).`
      );
    } else {
      seenSlots.set(selected.slotId, selected.playerSeason.name);
    }

    const slot = formation.slots.find((item) => item.id === selected.slotId);

    if (!slot) {
      errors.push(`Puesto no encontrado en la formación: ${selected.slotId}.`);
      continue;
    }

    const placement = resolvePlayerSlotPlacement(selected.playerSeason, slot);

    if (!placement.canPlace) {
      errors.push(
        placement.reason ?? `${selected.playerSeason.name} no puede ocupar ${slot.label}.`
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

function sanitizeSelectedPlayers(params: {
  formation?: Formation;
  selectedPlayers: SelectedPlayer[];
}): SelectedPlayer[] {
  const { formation, selectedPlayers } = params;

  if (!formation) return [];

  const usedNames = new Set<string>();
  const usedSlots = new Set<string>();
  const cleaned: SelectedPlayer[] = [];

  for (const selected of selectedPlayers) {
    const normalizedName = getPlayerIdentityKey(selected.playerSeason);
    const slot = formation.slots.find((item) => item.id === selected.slotId);

    if (!slot) continue;
    if (usedNames.has(normalizedName)) continue;
    if (usedSlots.has(selected.slotId)) continue;
    if (!resolvePlayerSlotPlacement(selected.playerSeason, slot).canPlace) continue;

    usedNames.add(normalizedName);
    usedSlots.add(selected.slotId);
    cleaned.push(selected);
  }

  return cleaned;
}

export default function App() {
  const savedGame = useMemo(() => loadGameState(), []);
  const [screen, setScreen] = useState<AppScreen>("home");
  const [isCareerMode, setIsCareerMode] = useState<boolean>(() => savedGame?.isCareerMode ?? false);
  const [careerSeasonResult, setCareerSeasonResult] = useState<CareerSeasonResult | undefined>(() => savedGame?.careerSeasonResult);
  const [careerObjectiveResult, setCareerObjectiveResult] = useState<CareerObjectiveResult | undefined>(() => savedGame?.careerObjectiveResult);
  const [careerCompletedSeasons, setCareerCompletedSeasons] = useState(() => savedGame?.careerCompletedSeasons ?? 0);
  const [careerSeasonLabel, setCareerSeasonLabel] = useState(() => savedGame?.careerSeasonLabel ?? CAREER_INITIAL_SEASON_LABEL);
  const [careerTrophyCounts, setCareerTrophyCounts] = useState<CareerTrophyCounts>(() => savedGame?.careerTrophyCounts ?? createEmptyCareerTrophyCounts());
  const [careerLeagueRivals, setCareerLeagueRivals] = useState<RivalTeam[]>(() => savedGame?.careerLeagueRivals ?? getInitialCareerLeagueRivals());
  const [careerSecondDivisionPool, setCareerSecondDivisionPool] = useState<RivalTeam[]>(() => savedGame?.careerSecondDivisionPool ?? getInitialCareerSecondDivisionPool());
  const [careerPromotionTransition, setCareerPromotionTransition] = useState<CareerPromotionTransition | undefined>(() => savedGame?.careerPromotionTransition);
  const [replacementDraftSeason, setReplacementDraftSeason] = useState<SeasonId | undefined>();
  const [replacementRemovedPlayer, setReplacementRemovedPlayer] = useState<SelectedPlayer | undefined>();

  const [gameId, setGameId] = useState<string>(() => savedGame?.gameId ?? createGameId());
  const [phase, setPhase] = useState<GamePhase>(() => savedGame?.phase ?? "formation_selection");
  const [difficulty, setDifficulty] = useState<GameDifficulty>(() => savedGame?.difficulty ?? "dificil");
  const [easyModeSeasonRangeId, setEasyModeSeasonRangeId] = useState<EasyModeSeasonRangeId>(
    () => savedGame?.easyModeSeasonRangeId ?? DEFAULT_EASY_MODE_SEASON_RANGE_ID
  );

  const [selectedFormation, setSelectedFormation] = useState<Formation | undefined>(() => savedGame?.selectedFormation);
  const [playerRoundSeasons, setPlayerRoundSeasons] = useState<SeasonId[]>(() => savedGame?.playerRoundSeasons ?? []);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(() => savedGame?.currentRoundIndex ?? 0);
  const [selectedPlayers, setSelectedPlayers] = useState<SelectedPlayer[]>(() => savedGame?.selectedPlayers ?? []);
  const [selectedCoach, setSelectedCoach] = useState<SelectedCoach | undefined>(() => savedGame?.selectedCoach);
  const [teamRating, setTeamRating] = useState<TeamRating | undefined>(() => savedGame?.teamRating);
  const [leagueContext, setLeagueContext] = useState<UserLeagueSimulationContext | undefined>(() => savedGame?.leagueContext);
  const [finalSummary, setFinalSummary] = useState<FinalGameSummary | undefined>(() => savedGame?.finalSummary);
  const [lastSelection, setLastSelection] = useState<SelectedPlayer | undefined>();
  const [teamValidationErrors, setTeamValidationErrors] = useState<string[]>([]);

  const currentSeason = playerRoundSeasons[currentRoundIndex];
  const currentDraftSeasonPool = useMemo(
    () => getDraftSeasonPool({ difficulty, easyModeSeasonRangeId }),
    [difficulty, easyModeSeasonRangeId]
  );

  const isPlayerSelectionReady = Boolean(
    selectedFormation && currentSeason && phase === "player_selection" && screen === "player_selection"
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    window.requestAnimationFrame(scrollToTop);
  }, [screen]);

  useEffect(() => {
    if (screen === "home" || screen === "career_preview") return;

    saveGameState({
      gameId,
      phase,
      difficulty,
      easyModeSeasonRangeId,
      selectedFormation,
      playerRoundSeasons,
      currentRoundIndex,
      selectedPlayers,
      selectedCoach,
      teamRating,
      leagueContext,
      finalSummary,
      isCareerMode,
      careerSeasonResult,
      careerObjectiveResult,
      careerCompletedSeasons,
      careerSeasonLabel,
      careerTrophyCounts,
      careerLeagueRivals,
      careerSecondDivisionPool,
      careerPromotionTransition,
    });
  }, [
    gameId,
    phase,
    difficulty,
    easyModeSeasonRangeId,
    screen,
    selectedFormation,
    playerRoundSeasons,
    currentRoundIndex,
    selectedPlayers,
    selectedCoach,
    teamRating,
    leagueContext,
    finalSummary,
    isCareerMode,
    careerSeasonResult,
    careerObjectiveResult,
    careerCompletedSeasons,
    careerSeasonLabel,
    careerTrophyCounts,
    careerLeagueRivals,
    careerSecondDivisionPool,
    careerPromotionTransition,
  ]);

  function resetGameState() {
    setGameId(createGameId());
    setPhase("formation_selection");
    setSelectedFormation(undefined);
    setPlayerRoundSeasons([]);
    setCurrentRoundIndex(0);
    setSelectedPlayers([]);
    setSelectedCoach(undefined);
    setTeamRating(undefined);
    setLeagueContext(undefined);
    setFinalSummary(undefined);
    setLastSelection(undefined);
    setTeamValidationErrors([]);
    setIsCareerMode(false);
    setCareerSeasonResult(undefined);
    setCareerObjectiveResult(undefined);
    setCareerCompletedSeasons(0);
    setCareerSeasonLabel(CAREER_INITIAL_SEASON_LABEL);
    setCareerTrophyCounts(createEmptyCareerTrophyCounts());
    setCareerLeagueRivals(getInitialCareerLeagueRivals());
    setCareerSecondDivisionPool(getInitialCareerSecondDivisionPool());
    setCareerPromotionTransition(undefined);
    setReplacementDraftSeason(undefined);
    setReplacementRemovedPlayer(undefined);
  }

  function handleNewGame() {
    clearSavedGameState();
    resetGameState();
    setScreen("formation_selection");
  }

  function handleOpenCareerPreview() {
    setScreen("career_preview");
  }

  function handleStartCareer() {
    clearSavedGameState();
    resetGameState();
    setIsCareerMode(true);
    setCareerSeasonResult(undefined);
    setCareerObjectiveResult(undefined);
    setCareerCompletedSeasons(0);
    setCareerSeasonLabel(CAREER_INITIAL_SEASON_LABEL);
    setCareerTrophyCounts(createEmptyCareerTrophyCounts());
    setCareerLeagueRivals(getInitialCareerLeagueRivals());
    setCareerSecondDivisionPool(getInitialCareerSecondDivisionPool());
    setCareerPromotionTransition(undefined);
    setReplacementDraftSeason(undefined);
    setReplacementRemovedPlayer(undefined);
    setScreen("formation_selection");
  }


  function handleContinueGame() {
    const loadedGame = loadGameState();
    if (!loadedGame) return;

    setGameId(loadedGame.gameId);
    setPhase(loadedGame.phase);
    setDifficulty(loadedGame.difficulty ?? "dificil");
    setEasyModeSeasonRangeId(loadedGame.easyModeSeasonRangeId ?? DEFAULT_EASY_MODE_SEASON_RANGE_ID);
    setSelectedFormation(loadedGame.selectedFormation);
    setPlayerRoundSeasons(loadedGame.playerRoundSeasons);
    setCurrentRoundIndex(loadedGame.currentRoundIndex);
    const cleanedPlayers = sanitizeSelectedPlayers({
      formation: loadedGame.selectedFormation,
      selectedPlayers: loadedGame.selectedPlayers ?? [],
    });

    setSelectedPlayers(cleanedPlayers);
    setTeamValidationErrors([]);
    setSelectedCoach(loadedGame.selectedCoach);
    setTeamRating(loadedGame.teamRating);
    setLeagueContext(loadedGame.leagueContext);
    setFinalSummary(loadedGame.finalSummary);
    setIsCareerMode(loadedGame.isCareerMode ?? false);
    setCareerSeasonResult(loadedGame.careerSeasonResult);
    setCareerObjectiveResult(loadedGame.careerObjectiveResult);
    setCareerCompletedSeasons(loadedGame.careerCompletedSeasons ?? 0);
    setCareerSeasonLabel(loadedGame.careerSeasonLabel ?? CAREER_INITIAL_SEASON_LABEL);
    setCareerTrophyCounts(loadedGame.careerTrophyCounts ?? createEmptyCareerTrophyCounts());
    setCareerLeagueRivals(loadedGame.careerLeagueRivals ?? getInitialCareerLeagueRivals());
    setCareerSecondDivisionPool(loadedGame.careerSecondDivisionPool ?? getInitialCareerSecondDivisionPool());
    setCareerPromotionTransition(loadedGame.careerPromotionTransition);
    setReplacementDraftSeason(undefined);
    setReplacementRemovedPlayer(undefined);
    setLastSelection(undefined);
    setScreen(loadedGame.phase);
  }

  function handleSelectFormation(formation: Formation) {
    setSelectedFormation(formation);
    setSelectedPlayers([]);
    setSelectedCoach(undefined);
    setTeamRating(undefined);
    setLeagueContext(undefined);
    setFinalSummary(undefined);
    setLastSelection(undefined);
    setTeamValidationErrors([]);
    setCurrentRoundIndex(0);
    setPlayerRoundSeasons(createRandomPlayerRoundSeasons(TOTAL_PLAYER_ROUNDS, currentDraftSeasonPool));
    setPhase("player_selection");
    setScreen("season_reveal");
  }

  function handleStartDraftAfterReveal() {
    setPhase("player_selection");
    setScreen("player_selection");
  }

  function handleSelectPlayer(selection: SelectedPlayer) {
    if (!selectedFormation) return;

    const nextPlayers = [...selectedPlayers, selection];
    const validation = validateSelectedTeam({
      formation: selectedFormation,
      selectedPlayers: nextPlayers,
    });

    const duplicateOrCriticalErrors = validation.errors.filter(
      (error) =>
        error.includes("Jugador repetido") ||
        error.includes("Puesto ocupado dos veces") ||
        error.includes("no puede jugar") ||
        error.includes("solo acepta")
    );

    if (duplicateOrCriticalErrors.length > 0) {
      setTeamValidationErrors(duplicateOrCriticalErrors);
      return;
    }

    setTeamValidationErrors([]);
    setLastSelection(selection);
    setSelectedPlayers(nextPlayers);
    const nextRoundIndex = currentRoundIndex + 1;

    if (nextRoundIndex >= TOTAL_PLAYER_ROUNDS) {
      const finalValidation = validateSelectedTeam({
        formation: selectedFormation,
        selectedPlayers: nextPlayers,
      });

      if (!finalValidation.valid) {
        setTeamValidationErrors(finalValidation.errors);
        return;
      }

      setCurrentRoundIndex(nextRoundIndex);
      setPhase("coach_selection");
      setScreen("coach_selection");
      return;
    }

    setCurrentRoundIndex(nextRoundIndex);
    setPhase("player_selection");
    setScreen("season_reveal");
  }

  function handleSkipRound() {
    setPlayerRoundSeasons((previous) => {
      const usedSeasons = new Set<SeasonId>(
        previous.filter((season, index) => Boolean(season) && index !== currentRoundIndex)
      );
      const previousSeason = currentRoundIndex > 0 ? previous[currentRoundIndex - 1] : undefined;

      const copy = [...previous];
      copy[currentRoundIndex] = pickRandomSeason(currentDraftSeasonPool, usedSeasons, previousSeason);
      return copy;
    });
  }

  function handleSelectCoach(selection: SelectedCoach) {
    const validation = validateSelectedTeam({
      formation: selectedFormation,
      selectedPlayers,
    });

    if (!validation.valid) {
      setTeamValidationErrors(validation.errors);
      setPhase("player_selection");
      setScreen("player_selection");
      return;
    }

    setTeamValidationErrors([]);
    setSelectedCoach(selection);
    setPhase("team_summary");
    setScreen("team_summary");
  }

  function handleStartLeagueSimulation(nextTeamRating: TeamRating) {
    const validation = validateSelectedTeam({
      formation: selectedFormation,
      selectedPlayers,
    });

    if (!validation.valid) {
      setTeamValidationErrors(validation.errors);
      setPhase("player_selection");
      setScreen("player_selection");
      return;
    }

    setTeamValidationErrors([]);
    setTeamRating(nextTeamRating);
    setLeagueContext(undefined);
    setPhase("league_simulation");
    setScreen("league_simulation");
  }

  function handleFinishLeague(summary: FinalGameSummary) {
    setFinalSummary(summary);
    setPhase("finished");

    if (isCareerMode) {
      const seasonResult = buildCareerSeasonResult(summary, careerSeasonLabel);
      const objectiveResult = evaluateCareerObjective(seasonResult);

      setCareerSeasonResult(seasonResult);
      setCareerObjectiveResult(objectiveResult);
      setScreen(objectiveResult.survives ? "career_season_result" : "career_game_over");
      return;
    }

    setScreen("finished");
  }

  function handleContinueCareerAfterSeason() {
    if (!careerSeasonResult || !careerObjectiveResult?.survives || !finalSummary) return;

    const nextCompletedSeasons = careerCompletedSeasons + 1;
    setCareerCompletedSeasons(nextCompletedSeasons);
    setCareerSeasonLabel(getCareerSeasonLabelFromIndex(nextCompletedSeasons));
    setCareerTrophyCounts((previous) => addCareerTrophiesFromSeason(previous, careerSeasonResult));
    if (finalSummary.table) {
      const transition = createNextCareerLeagueTransition({
        previousTable: finalSummary.table,
        currentRivals: careerLeagueRivals,
        secondDivisionPool: careerSecondDivisionPool,
        completedSeasons: nextCompletedSeasons,
      });

      setCareerLeagueRivals(transition.nextRivals);
      setCareerSecondDivisionPool(transition.nextSecondDivisionPool);
      setCareerPromotionTransition({
        relegated: transition.relegated,
        promoted: transition.promoted,
        secondDivisionPool: transition.nextSecondDivisionPool,
      });
    } else {
      setCareerPromotionTransition(undefined);
    }
    setLeagueContext(undefined);
    setFinalSummary(undefined);
    setTeamRating(undefined);
    setReplacementDraftSeason(undefined);
    setReplacementRemovedPlayer(undefined);
    setPhase("team_summary");
    setScreen("career_interseason_reward");
  }

  function handleChooseCareerCoachChange() {
    setSelectedCoach(undefined);
    setTeamRating(undefined);
    setLeagueContext(undefined);
    setFinalSummary(undefined);
    setCareerSeasonResult(undefined);
    setCareerObjectiveResult(undefined);
    setCareerPromotionTransition(undefined);
    setReplacementDraftSeason(undefined);
    setReplacementRemovedPlayer(undefined);
    setPhase("coach_selection");
    setScreen("coach_selection");
  }

  function handleChooseCareerPlayerChange() {
    if (!selectedFormation) return;

    setTeamRating(undefined);
    setLeagueContext(undefined);
    setFinalSummary(undefined);
    setReplacementDraftSeason(undefined);
    setReplacementRemovedPlayer(undefined);
    setPhase("player_selection");
    setScreen("career_player_replacement_pick");
  }

  function handleSelectPlayerToReplace(selection: SelectedPlayer) {
    const nextPlayers = selectedPlayers.filter(
      (item) => !(item.slotId === selection.slotId && item.playerSeason.id === selection.playerSeason.id)
    );

    setSelectedPlayers(nextPlayers);
    setReplacementRemovedPlayer(selection);
    setReplacementDraftSeason(pickRandomSeason(currentDraftSeasonPool));
    setCurrentRoundIndex(nextPlayers.length);
    setLastSelection(undefined);
    setTeamValidationErrors([]);
    setPhase("player_selection");
    setScreen("career_player_replacement_draft");
  }

  function handleCancelPlayerReplacement() {
    if (replacementRemovedPlayer) {
      setSelectedPlayers((previous) => {
        const alreadyRestored = previous.some(
          (item) => item.slotId === replacementRemovedPlayer.slotId &&
            item.playerSeason.id === replacementRemovedPlayer.playerSeason.id
        );

        return alreadyRestored ? previous : [...previous, replacementRemovedPlayer];
      });
    }

    setReplacementDraftSeason(undefined);
    setReplacementRemovedPlayer(undefined);
    setTeamValidationErrors([]);
    setScreen("career_interseason_reward");
  }

  function handleSelectReplacementPlayer(selection: SelectedPlayer) {
    if (!selectedFormation) return;

    const nextPlayers = [...selectedPlayers, selection];
    const validation = validateSelectedTeam({
      formation: selectedFormation,
      selectedPlayers: nextPlayers,
    });

    if (!validation.valid) {
      setTeamValidationErrors(validation.errors);
      return;
    }

    setSelectedPlayers(nextPlayers);
    setLastSelection(selection);
    setReplacementDraftSeason(undefined);
    setReplacementRemovedPlayer(undefined);
    setTeamValidationErrors([]);
    setCurrentRoundIndex(nextPlayers.length);
    setCareerSeasonResult(undefined);
    setCareerObjectiveResult(undefined);
    setPhase("team_summary");
    setScreen("team_summary");
  }

  function handleRestart() {
    clearSavedGameState();
    resetGameState();
    setScreen("home");
  }

  function handleCopyShareText(shareText: string) {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      void navigator.clipboard.writeText(shareText);
      return;
    }
    window.alert(shareText);
  }

  const shouldShowProgress = ![
    "home",
    "career_preview",
    "career_season_result",
    "career_game_over",
    "career_interseason_reward",
    "career_player_replacement_pick",
  ].includes(screen);

  return (
    <div className="app-shell">
      {shouldShowProgress && (
        <PhaseProgress
          phase={phase}
          playerProgress={{
            selected: selectedPlayers.length,
            total: TOTAL_PLAYER_ROUNDS,
          }}
        />
      )}

      {shouldShowProgress && teamValidationErrors.length > 0 && (
        <section className="team-validation-banner">
          <div>
            <strong>Revisa tu once antes de continuar</strong>
            <ul>
              {teamValidationErrors.slice(0, 4).map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => {
              if (!selectedFormation) return;

              const cleanedPlayers = sanitizeSelectedPlayers({
                formation: selectedFormation,
                selectedPlayers,
              });

              setSelectedPlayers(cleanedPlayers);
              setCurrentRoundIndex(cleanedPlayers.length);
              setPhase("player_selection");
              setScreen("season_reveal");
              setTeamValidationErrors([]);
            }}
          >
            Limpiar duplicados
          </button>
        </section>
      )}

      {screen === "home" && (
        <GameHome
          hasSavedGame={hasSavedGameState()}
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
          easyModeSeasonRangeId={easyModeSeasonRangeId}
          onEasyModeSeasonRangeChange={setEasyModeSeasonRangeId}
          onNewGame={handleNewGame}
          onContinueGame={handleContinueGame}
          onCareerPreview={handleOpenCareerPreview}
        />
      )}

      {screen === "career_preview" && (
        <main className="career-preview-screen">
          <section className="career-preview-card">
            <p className="eyebrow">Modo carrera Athletic</p>
            <h1>Sobrevive temporada a temporada</h1>
            <p>
              Base preparada para el futuro modo carrera: empieza en 2025/26,
              clasifica a Europa o gana la Copa, y evita el descenso para seguir vivo.
            </p>

            <div className="career-preview-grid">
              <article>
                <strong>Objetivo</strong>
                <span>Clasifícate para Europa o gana la Copa del Rey. Si no, Game Over.</span>
              </article>
              <article>
                <strong>Entre temporadas</strong>
                <span>Cambiar un jugador o cambiar entrenador. Si ganas Liga, podrás ajustar formación compatible.</span>
              </article>
              <article>
                <strong>Progresión</strong>
                <span>Los rivales subirán poco a poco y la Copa será cada año más exigente.</span>
              </article>
              <article>
                <strong>Ranking arcade</strong>
                <span>Top 100 global futuro por temporadas superadas y puntos de palmarés.</span>
              </article>
            </div>

            <div className="career-preview-actions">
              <button type="button" className="primary-home-button" onClick={handleStartCareer}>
                Empezar carrera 2025/26
              </button>
              <button type="button" className="secondary-home-button" onClick={handleNewGame}>
                Jugar partida rápida
              </button>
              <button type="button" className="secondary-home-button" onClick={() => setScreen("home")}>
                Volver
              </button>
            </div>
          </section>
        </main>
      )}

      {screen === "formation_selection" && (
        <FormationSelector
          selectedFormationId={selectedFormation?.id}
          onSelectFormation={handleSelectFormation}
        />
      )}

      {screen === "season_reveal" && selectedFormation && currentSeason && (
        <SeasonReveal
          formation={selectedFormation}
          finalSeason={currentSeason}
          availableSeasons={currentDraftSeasonPool}
          roundNumber={currentRoundIndex + 1}
          totalRounds={TOTAL_PLAYER_ROUNDS}
          onStartDraft={handleStartDraftAfterReveal}
        />
      )}

      {isPlayerSelectionReady && selectedFormation && currentSeason && (
        <PlayerRound
          roundNumber={currentRoundIndex + 1}
          totalRounds={TOTAL_PLAYER_ROUNDS}
          season={currentSeason}
          formation={selectedFormation}
          selectedPlayers={selectedPlayers}
          lastSelection={lastSelection}
          onSelectPlayer={handleSelectPlayer}
          onSkipRound={handleSkipRound}
        />
      )}

      {screen === "coach_selection" && selectedFormation && (
        <CoachRound onSelectCoach={handleSelectCoach} />
      )}

      {screen === "team_summary" && selectedFormation && selectedCoach && (
        <TeamSummary
          formation={selectedFormation}
          selectedPlayers={selectedPlayers}
          selectedCoach={selectedCoach}
          onStartLeagueSimulation={handleStartLeagueSimulation}
          onBackToCoach={() => setScreen("coach_selection")}
          modeLabel={isCareerMode ? `Carrera Athletic · ${careerSeasonLabel}` : undefined}
          startButtonLabel={isCareerMode ? "Jugar temporada de carrera" : undefined}
        />
      )}

      {screen === "league_simulation" && selectedFormation && selectedCoach && teamRating && (
        <LeagueSimulatorView
          gameId={gameId}
          difficulty={difficulty}
          formation={selectedFormation}
          selectedPlayers={selectedPlayers}
          selectedCoach={selectedCoach}
          teamRating={teamRating}
          isCareerMode={isCareerMode}
          leagueRivals={isCareerMode ? careerLeagueRivals : undefined}
          initialContext={leagueContext}
          onContextChange={setLeagueContext}
          onFinishLeague={handleFinishLeague}
        />
      )}

      {(screen === "career_season_result" || screen === "career_game_over") && finalSummary && careerSeasonResult && careerObjectiveResult && (
        <CareerSeasonOutcome
          summary={finalSummary}
          seasonResult={careerSeasonResult}
          objectiveResult={careerObjectiveResult}
          onViewFullSummary={() => setScreen("finished")}
          onContinueCareer={careerObjectiveResult.survives ? handleContinueCareerAfterSeason : undefined}
          onRestart={handleRestart}
        />
      )}

      {screen === "career_interseason_reward" && selectedFormation && careerSeasonResult && careerObjectiveResult && (
        <CareerInterseasonReward
          completedSeasons={careerCompletedSeasons}
          nextSeasonLabel={careerSeasonLabel}
          formation={selectedFormation}
          selectedPlayers={selectedPlayers}
          selectedCoach={selectedCoach}
          seasonResult={careerSeasonResult}
          objectiveResult={careerObjectiveResult}
          trophyCounts={careerTrophyCounts}
          promotionTransition={careerPromotionTransition}
          onChoosePlayerChange={handleChooseCareerPlayerChange}
          onChooseCoachChange={handleChooseCareerCoachChange}
          onRestart={handleRestart}
        />
      )}

      {screen === "career_player_replacement_pick" && selectedFormation && (
        <CareerPlayerReplacementPicker
          formation={selectedFormation}
          selectedPlayers={selectedPlayers}
          nextSeasonLabel={careerSeasonLabel}
          onSelectPlayerToReplace={handleSelectPlayerToReplace}
          onCancel={() => setScreen("career_interseason_reward")}
        />
      )}

      {screen === "career_player_replacement_draft" && selectedFormation && replacementDraftSeason && (
        <PlayerRound
          roundNumber={1}
          totalRounds={1}
          season={replacementDraftSeason}
          formation={selectedFormation}
          selectedPlayers={selectedPlayers}
          lastSelection={lastSelection}
          onSelectPlayer={handleSelectReplacementPlayer}
          onSkipRound={() => setReplacementDraftSeason(pickRandomSeason(currentDraftSeasonPool))}
        />
      )}

      {screen === "career_player_replacement_draft" && replacementRemovedPlayer && (
        <div className="career-replacement-floating-actions">
          <span>
            Sustituyendo a {replacementRemovedPlayer.playerSeason.name} ({replacementRemovedPlayer.position})
          </span>
          <button type="button" onClick={handleCancelPlayerReplacement}>
            Cancelar cambio
          </button>
        </div>
      )}

      {screen === "finished" && finalSummary && selectedFormation && selectedCoach && teamRating && (
        <FinalSummary
          summary={finalSummary}
          difficulty={difficulty}
          formation={selectedFormation}
          selectedPlayers={selectedPlayers}
          selectedCoach={selectedCoach}
          teamRating={teamRating}
          onRestart={handleRestart}
          onReturnToCareer={isCareerMode && careerSeasonResult && careerObjectiveResult ? () => setScreen(careerObjectiveResult.survives ? "career_season_result" : "career_game_over") : undefined}
          onShare={handleCopyShareText}
        />
      )}
    </div>
  );
}


