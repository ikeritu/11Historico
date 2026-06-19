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
} from "./types/game";

import type { UserLeagueSimulationContext } from "./simulation/leagueSimulator";

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

import {
  clearSavedGameState,
  hasSavedGameState,
  loadGameState,
  saveGameState,
} from "./storage/localGameStorage";

import "./App.css";

const TOTAL_PLAYER_ROUNDS = 11;

type AppScreen = "home" | "season_reveal" | GamePhase;

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
    if (screen === "home") return;

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
  }

  function handleNewGame() {
    clearSavedGameState();
    resetGameState();
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
    setScreen("finished");
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

  const shouldShowProgress = screen !== "home";

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
        />
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
          initialContext={leagueContext}
          onContextChange={setLeagueContext}
          onFinishLeague={handleFinishLeague}
        />
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
          onShare={handleCopyShareText}
        />
      )}
    </div>
  );
}


