// src/components/LeagueSimulatorView.tsx

import { useEffect, useMemo, useState } from "react";

import type {
  Formation,
  GameDifficulty,
  MatchResult,
  SelectedCoach,
  SelectedPlayer,
  TeamRating,
  RivalTeam,
} from "../types/game";

import {
  canFinishSeason,
  createFinalLeagueSummary,
  createUserLeagueSimulation,
  getCupRivalDisplayName,
  getCupStatusLabel,
  getCurrentLeagueDiagnosis,
  getPendingCupFixture,
  simulateFullCupAndLeague,
  simulateFullUserLeague,
  simulateNextCupMatch,
  simulateNextUserLeagueMatch,
  type UserLeagueSimulationContext,
} from "../simulation/leagueSimulator";

import {
  getDisplayTable,
  getUserLeagueSummary,
  USER_TEAM_NAME,
} from "../simulation/leagueTable";

import "./LeagueSimulatorView.css";

interface LeagueSimulatorViewProps {
  gameId: string;
  difficulty: GameDifficulty;
  formation: Formation;
  selectedPlayers: SelectedPlayer[];
  selectedCoach: SelectedCoach;
  teamRating: TeamRating;
  isCareerMode?: boolean;
  leagueRivals?: RivalTeam[];
  initialContext?: UserLeagueSimulationContext;
  onContextChange?: (context: UserLeagueSimulationContext) => void;
  onFinishLeague?: (summary: ReturnType<typeof createFinalLeagueSummary>) => void;
}

const AUTO_SIMULATION_DELAY_MS = 1300;

function getResultBadge(result: MatchResult): string {
  if (result.userTeamWon) return "Victoria";
  if (result.userTeamDrew) return "Empate";
  return "Derrota";
}

function getResultClass(result: MatchResult): string {
  if (result.userTeamWon) return "result-badge result-badge-win";
  if (result.userTeamDrew) return "result-badge result-badge-draw";
  return "result-badge result-badge-loss";
}

function getDifficultyLabel(difficulty: GameDifficulty): string {
  if (difficulty === "normal") return "Fácil";
  if (difficulty === "leyenda") return "Leyenda";
  return "Normal";
}

function normalizeTeamNameForKit(teamName: string): string {
  return teamName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getTeamKitClass(teamName: string): string {
  const normalizedName = normalizeTeamNameForKit(teamName);

  if (
    normalizedName.includes("athletic club historico") ||
    normalizedName.includes("athletic historico") ||
    normalizedName.includes("zurigorri")
  ) {
    return "team-kit-athletic";
  }

  if (normalizedName.includes("sevilla")) {
    return "team-kit-sevilla";
  }

  if (normalizedName.includes("real madrid")) return "team-kit-real-madrid";
  if (normalizedName.includes("barcelona") || normalizedName.includes("fc barcelona")) return "team-kit-barcelona";
  if (normalizedName.includes("atletico")) return "team-kit-atletico";
  if (normalizedName.includes("valencia")) return "team-kit-valencia";
  if (normalizedName.includes("betis")) return "team-kit-betis";
  if (normalizedName.includes("real sociedad")) return "team-kit-sociedad";
  if (normalizedName.includes("osasuna")) return "team-kit-osasuna";
  if (normalizedName.includes("celta")) return "team-kit-celta";
  if (normalizedName.includes("alaves")) return "team-kit-alaves";
  if (normalizedName.includes("elche")) return "team-kit-elche";
  if (normalizedName.includes("getafe")) return "team-kit-getafe";
  if (normalizedName.includes("girona")) return "team-kit-girona";
  if (normalizedName.includes("levante")) return "team-kit-levante";
  if (normalizedName.includes("rayo")) return "team-kit-rayo";
  if (normalizedName.includes("espanyol")) return "team-kit-espanyol";
  if (normalizedName.includes("mallorca")) return "team-kit-mallorca";
  if (normalizedName.includes("oviedo")) return "team-kit-oviedo";
  if (normalizedName.includes("villarreal")) return "team-kit-villarreal";
  if (normalizedName.includes("mirandes")) return "team-kit-mirandes";
  if (normalizedName.includes("zaragoza")) return "team-kit-zaragoza";
  if (normalizedName.includes("sporting")) return "team-kit-sporting";
  if (normalizedName.includes("tenerife")) return "team-kit-tenerife";
  if (normalizedName.includes("racing")) return "team-kit-racing";
  if (normalizedName.includes("deportivo de la coruna") || normalizedName.includes("coruna")) return "team-kit-deportivo";
  if (normalizedName.includes("albacete")) return "team-kit-albacete";
  if (normalizedName.includes("alcoyano")) return "team-kit-alcoyano";
  if (normalizedName.includes("cultural")) return "team-kit-cultural";
  if (normalizedName.includes("cadiz")) return "team-kit-cadiz";
  if (normalizedName.includes("malaga")) return "team-kit-malaga";
  if (normalizedName.includes("numancia")) return "team-kit-numancia";
  if (normalizedName.includes("almeria")) return "team-kit-almeria";
  if (normalizedName.includes("alcorcon")) return "team-kit-alcorcon";
  if (normalizedName.includes("badajoz")) return "team-kit-badajoz";
  if (normalizedName.includes("castellon")) return "team-kit-castellon";
  if (normalizedName.includes("eibar")) return "team-kit-eibar";
  if (normalizedName.includes("burgos")) return "team-kit-burgos";
  if (normalizedName.includes("las palmas")) return "team-kit-las-palmas";
  if (normalizedName.includes("cordoba")) return "team-kit-cordoba";
  if (normalizedName.includes("granada")) return "team-kit-granada";
  if (normalizedName.includes("huesca")) return "team-kit-huesca";
  if (normalizedName.includes("barakaldo")) return "team-kit-barakaldo";
  if (normalizedName.includes("sestao")) return "team-kit-sestao";
  if (normalizedName.includes("portugalete")) return "team-kit-portugalete";

  return "team-kit-default";
}

function TeamKitIcon({ teamName, compact = false }: { teamName: string; compact?: boolean }) {
  return (
    <span
      className={`team-kit-icon ${getTeamKitClass(teamName)} ${
        compact ? "team-kit-icon-compact" : ""
      }`}
      aria-label={`Camiseta ${teamName}`}
      title={teamName}
    >
      <span className="team-kit-sleeve team-kit-sleeve-left" />
      <span className="team-kit-body" />
      <span className="team-kit-sleeve team-kit-sleeve-right" />
    </span>
  );
}

function TeamWithKit({ teamName }: { teamName: string }) {
  return (
    <span className="team-with-kit">
      <TeamKitIcon teamName={teamName} />
      <span>{teamName}</span>
    </span>
  );
}

function ScoreTeam({ teamName, goals }: { teamName: string; goals: number }) {
  return (
    <span className="score-team">
      <TeamKitIcon teamName={teamName} />
      <span>{teamName}</span>
      <strong>{goals}</strong>
    </span>
  );
}

function normalizeLeagueContext(
  initialContext: UserLeagueSimulationContext | undefined,
  selectedCoach: SelectedCoach,
  leagueRivals?: RivalTeam[]
): UserLeagueSimulationContext {
  if (!initialContext || !initialContext.cupState) {
    return {
      ...createUserLeagueSimulation({ rivals: leagueRivals }),
      selectedCoach,
    };
  }

  return {
    ...initialContext,
    selectedCoach,
  };
}

const CAREER_EFFECTIVE_RATING_BASE = 80;
const CAREER_EFFECTIVE_RATING_FACTOR = 0.55;

function compressCareerRating(value: number): number {
  if (value <= CAREER_EFFECTIVE_RATING_BASE) return value;

  return (
    CAREER_EFFECTIVE_RATING_BASE +
    (value - CAREER_EFFECTIVE_RATING_BASE) * CAREER_EFFECTIVE_RATING_FACTOR
  );
}

function applyCareerEffectiveRating(teamRating: TeamRating, isCareerMode: boolean): TeamRating {
  if (!isCareerMode) return teamRating;

  const clampCompressed = (value: number) =>
    Math.max(40, Math.min(99, Math.round(compressCareerRating(value))));

  return {
    ...teamRating,
    attack: clampCompressed(teamRating.attack),
    defense: clampCompressed(teamRating.defense),
    control: clampCompressed(teamRating.control),
    physical: clampCompressed(teamRating.physical),
    mentality: clampCompressed(teamRating.mentality),
    goalkeeping: clampCompressed(teamRating.goalkeeping),
    overall: clampCompressed(teamRating.overall),
  };
}

function applyDifficultyToTeamRating(
  teamRating: TeamRating,
  difficulty: GameDifficulty,
  isCareerMode: boolean
): TeamRating {
  const careerRating = applyCareerEffectiveRating(teamRating, isCareerMode);
  const modifier = difficulty === "normal" ? 2 : difficulty === "leyenda" ? -4 : 0;

  const clamp = (value: number) => Math.max(40, Math.min(99, Math.round(value + modifier)));

  return {
    ...careerRating,
    attack: clamp(careerRating.attack),
    defense: clamp(careerRating.defense),
    control: clamp(careerRating.control),
    physical: clamp(careerRating.physical),
    mentality: clamp(careerRating.mentality),
    goalkeeping: clamp(careerRating.goalkeeping),
    overall: clamp(careerRating.overall),
  };
}

export function LeagueSimulatorView({
  gameId,
  difficulty,
  formation,
  selectedPlayers,
  selectedCoach,
  teamRating,
  isCareerMode = false,
  leagueRivals,
  initialContext,
  onContextChange,
  onFinishLeague,
}: LeagueSimulatorViewProps) {
  const [context, setContext] = useState<UserLeagueSimulationContext>(
    () => normalizeLeagueContext(initialContext, selectedCoach, leagueRivals)
  );

  const [lastResult, setLastResult] = useState<MatchResult | undefined>(undefined);
  const [isAutoSimulating, setIsAutoSimulating] = useState(false);

  const effectiveTeamRating = useMemo(
    () => applyDifficultyToTeamRating(teamRating, difficulty, isCareerMode),
    [teamRating, difficulty, isCareerMode]
  );

  const userSummary = useMemo(
    () =>
      getUserLeagueSummary({
        table: context.state.table,
      }),
    [context.state.table]
  );

  const displayTable = useMemo(
    () => getDisplayTable(context.state.table),
    [context.state.table]
  );

  const recentResults = useMemo(
    () => [...context.state.results].filter((result) => result.userTeamPlayed).reverse().slice(0, 5),
    [context.state.results]
  );

  const recentCupResults = useMemo(
    () => [...context.cupState.results].reverse().slice(0, 3),
    [context.cupState.results]
  );

  const diagnosis = getCurrentLeagueDiagnosis(context);
  const pendingCupFixture = getPendingCupFixture(context);
  const userRow = userSummary.row;
  const userPosition = userSummary.position;
  const leagueMatchesPlayed = userRow?.played ?? 0;
  const leagueProgressLabel = `Jornada ${Math.min(leagueMatchesPlayed + 1, 38)} / 38`;

  function commitContext(nextContext: UserLeagueSimulationContext) {
    const contextWithCoach = {
      ...nextContext,
      selectedCoach,
    };

    setContext(contextWithCoach);
    onContextChange?.(contextWithCoach);
  }

  function finishIfReady(nextContext: UserLeagueSimulationContext) {
    if (!canFinishSeason(nextContext)) return false;

    const summary = createFinalLeagueSummary({
      gameId,
      formationName: formation.name,
      coachName: selectedCoach.coachSeason.name,
      context: nextContext,
    });

    summary.difficulty = difficulty;
    onFinishLeague?.(summary);

    return true;
  }

  useEffect(() => {
    if (!isAutoSimulating) return undefined;

    if (context.state.completed || getPendingCupFixture(context)) {
      setIsAutoSimulating(false);
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      const simulation = simulateNextUserLeagueMatch({
        context,
        teamRating: effectiveTeamRating,
        selectedPlayers,
      });

      commitContext(simulation.context);
      setLastResult(simulation.result);

      const shouldStop =
        !simulation.result ||
        Boolean(simulation.stoppedForCup) ||
        simulation.context.state.completed ||
        Boolean(getPendingCupFixture(simulation.context)) ||
        finishIfReady(simulation.context);

      if (shouldStop) {
        setIsAutoSimulating(false);
      }
    }, AUTO_SIMULATION_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [context, effectiveTeamRating, isAutoSimulating, selectedPlayers]);

  function handleSimulateFullSeason() {
    setIsAutoSimulating(false);

    const nextContext = simulateFullUserLeague({
      context,
      teamRating: effectiveTeamRating,
      selectedPlayers,
    });

    commitContext(nextContext);

    const lastUserLeagueResult = [...nextContext.state.results]
      .reverse()
      .find((result) => result.userTeamPlayed);

    setLastResult(lastUserLeagueResult);
    finishIfReady(nextContext);
  }

  function handleSimulateNextCupMatch() {
    setIsAutoSimulating(false);

    const simulation = simulateNextCupMatch({
      context,
      teamRating: effectiveTeamRating,
      selectedPlayers,
    });

    commitContext(simulation.context);
    setLastResult(simulation.result);
    finishIfReady(simulation.context);
  }

  function handleSimulateFullCupAndFinishSeason() {
    setIsAutoSimulating(false);

    const nextContext = simulateFullCupAndLeague({
      context,
      teamRating: effectiveTeamRating,
      selectedPlayers,
    });

    commitContext(nextContext);

    const lastUserResult = [...nextContext.cupState.results, ...nextContext.state.results]
      .reverse()
      .find((result) => result.userTeamPlayed);

    setLastResult(lastUserResult);
    finishIfReady(nextContext);
  }

  function handleToggleAutoSimulation() {
    if (context.state.completed || pendingCupFixture) return;
    setIsAutoSimulating((current) => !current);
  }

  return (
    <section className="league-simulator-view">
      <header className="league-header">
        <div>
          <p className="eyebrow">LaLiga 25/26 + Copa del Rey</p>
          <h1>Simulación de temporada</h1>
          <p>
            Partida rápida: simula Liga y Copa con ritmo partido a partido. Puedes dejar correr
            la simulación automática o saltar hasta el próximo evento.
          </p>
        </div>

        <div className="league-main-card">
          <span>Posición actual</span>
          <strong>{userPosition ?? "--"}º</strong>
          <small>{userRow ? `${userRow.points} puntos · ${leagueMatchesPlayed}/38` : "Sin partidos"}</small>
          <em>Dificultad {getDifficultyLabel(difficulty)}</em>
        </div>
      </header>

      <div className="league-layout">
        <main className="league-main-panel">
          <div className={`league-actions-card ${isAutoSimulating ? "league-actions-card-running" : ""}`}>
            <div>
              <h2>{pendingCupFixture ? "Toca Copa del Rey" : context.state.completed ? "Liga terminada" : "Próximo paso"}</h2>
              <p>{isAutoSimulating ? `${leagueProgressLabel} · Simulación automática en marcha.` : diagnosis}</p>
            </div>

            {pendingCupFixture ? (
              <div className="league-buttons">
                <button type="button" onClick={handleSimulateNextCupMatch}>
                  Simular partido de Copa
                </button>

                <button
                  type="button"
                  className="secondary-league-button"
                  onClick={handleSimulateFullCupAndFinishSeason}
                >
                  Simular Copa y terminar temporada
                </button>
              </div>
            ) : (
              <div className="league-buttons">
                <button
                  type="button"
                  className={isAutoSimulating ? "stop-league-button" : "secondary-league-button"}
                  onClick={handleToggleAutoSimulation}
                  disabled={context.state.completed}
                >
                  {isAutoSimulating ? "Parar simulación" : "Simular"}
                </button>

                <button
                  type="button"
                  className="tertiary-league-button"
                  onClick={handleSimulateFullSeason}
                  disabled={context.state.completed || isAutoSimulating}
                >
                  Saltar hasta próximo evento
                </button>
              </div>
            )}
          </div>

          {pendingCupFixture && (
            <section className="cup-event-card">
              <span>Copa del Rey</span>
              <h2>{pendingCupFixture.roundName}</h2>
              <p>
                Rival: {getCupRivalDisplayName(pendingCupFixture.rivalTeamId)} · Partido {pendingCupFixture.venue === "home" ? "en San Mamés" : "fuera de casa"}
              </p>
            </section>
          )}

          {lastResult && (
            <article className="last-result-card">
              <div className="last-result-top">
                <span className={getResultClass(lastResult)}>{getResultBadge(lastResult)}</span>
                <span>{lastResult.competition === "cup" ? lastResult.roundName : `Jornada ${lastResult.matchday}`}</span>
              </div>

              <div className="last-result-scoreboard">
                <ScoreTeam teamName={lastResult.homeTeamName} goals={lastResult.homeGoals} />
                <span className="score-separator">-</span>
                <ScoreTeam teamName={lastResult.awayTeamName} goals={lastResult.awayGoals} />
              </div>

              {lastResult.goalEvents.length > 0 ? (
                <ul className="goal-events-list">
                  {lastResult.goalEvents.map((event, index) => (
                    <li key={`${event.minute}_${event.teamName}_${index}`}>
                      <strong>{event.minute}'</strong>
                      <TeamWithKit teamName={event.teamName} />
                      {event.scorerName && <em>{event.scorerName}</em>}
                      {event.assistName && <small>Asistencia: {event.assistName}</small>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-league-message">Partido sin goles.</p>
              )}
            </article>
          )}

          <section className="season-stats-card">
            <h2>Estadísticas del Athletic Club Histórico</h2>

            <div className="season-stats-grid">
              <div>
                <span>Goles a favor</span>
                <strong>{context.userTeamStats.goalsFor}</strong>
              </div>
              <div>
                <span>Goles en contra</span>
                <strong>{context.userTeamStats.goalsAgainst}</strong>
              </div>
              <div>
                <span>Porterías a cero</span>
                <strong>{context.userTeamStats.cleanSheets}</strong>
              </div>
              <div>
                <span>Partidos Liga</span>
                <strong>{userRow?.played ?? 0}/38</strong>
              </div>
            </div>
          </section>

          <section className="scorers-card">
            <div>
              <h2>Máximos goleadores</h2>
              <ol>
                {context.userTeamStats.topScorers.slice(0, 5).map((player) => (
                  <li key={`scorer_${player.playerId}`}>
                    <span>{player.playerName}</span>
                    <strong>{player.goals}</strong>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2>Máximos asistentes</h2>
              <ol>
                {context.userTeamStats.topAssisters.slice(0, 5).map((player) => (
                  <li key={`assist_${player.playerId}`}>
                    <span>{player.playerName}</span>
                    <strong>{player.assists}</strong>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </main>

        <aside className="league-side-panel">
          <section className="table-card">
            <h2>Clasificación</h2>

            <div className="league-table">
              <div className="league-table-head">
                <span>#</span>
                <span>Equipo</span>
                <span>Pts</span>
                <span>DG</span>
              </div>

              {displayTable.map((row, index) => (
                <div
                  key={row.teamId}
                  className={`league-table-row ${
                    row.teamName === USER_TEAM_NAME ? "league-table-row-user" : ""
                  }`}
                >
                  <span>{index + 1}</span>
                  <span>{row.teamName}</span>
                  <strong>{row.points}</strong>
                  <span>{row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="recent-results-card">
            <h2>Copa del Rey</h2>
            <p className="cup-status-text">{getCupStatusLabel(context.cupState)}</p>

            <div className="recent-results-list">
              {recentCupResults.map((result) => (
                <article key={result.fixtureId}>
                  <span>{result.roundName}</span>
                  <strong className="recent-result-scoreline">
                    <TeamWithKit teamName={result.homeTeamName} />
                    <span>{result.homeGoals}-{result.awayGoals}</span>
                    <TeamWithKit teamName={result.awayTeamName} />
                  </strong>
                  <small className={getResultClass(result)}>{getResultBadge(result)}</small>
                </article>
              ))}
            </div>
          </section>

          <section className="recent-results-card">
            <div className="recent-results-heading">
              <h2>Últimos resultados de Liga</h2>
              <span>{leagueMatchesPlayed}/38</span>
            </div>

            {recentResults.length === 0 && (
              <p className="empty-league-message">Aún no se ha simulado ningún partido.</p>
            )}

            <div className="recent-results-list">
              {recentResults.map((result) => (
                <article key={result.fixtureId}>
                  <span>J{result.matchday}</span>
                  <strong className="recent-result-scoreline">
                    <TeamWithKit teamName={result.homeTeamName} />
                    <span>{result.homeGoals}-{result.awayGoals}</span>
                    <TeamWithKit teamName={result.awayTeamName} />
                  </strong>
                  <small className={getResultClass(result)}>{getResultBadge(result)}</small>
                </article>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}

export default LeagueSimulatorView;
