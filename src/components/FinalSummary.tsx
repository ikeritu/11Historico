// src/components/FinalSummary.tsx

import { useEffect, useMemo, useState, type ReactNode } from "react";

import type {
  FinalGameSummary,
  Formation,
  GameDifficulty,
  LeagueTableRow,
  SelectedCoach,
  SelectedPlayer,
  TeamRating,
} from "../types/game";

import SelectedTeamBoard from "./SelectedTeamBoard";
import PalmaresTrophyCase from "./PalmaresTrophyCase";

import {
  buildHistoryEntry,
  getBestGameHistoryEntry,
  loadGameHistory,
  upsertGameHistoryEntry,
  type GameHistoryEntry,
} from "../storage/gameHistoryStorage";

import "./FinalSummary.css";
import SupportButton from "./SupportButton";

interface FinalSummaryProps {
  summary: FinalGameSummary;
  difficulty?: GameDifficulty;
  formation: Formation;
  selectedPlayers: SelectedPlayer[];
  selectedCoach: SelectedCoach;
  teamRating: TeamRating;
  onRestart?: () => void;
  onShare?: (shareText: string) => void;
}

function getMedalEmoji(position: number): string {
  if (position === 1) return "🏆";
  if (position === 2) return "🥈";
  if (position === 3) return "🥉";
  if (position <= 4) return "⭐";
  if (position <= 6) return "🌍";
  return "🔴⚪";
}

function isUserTeam(row: LeagueTableRow): boolean {
  const normalizedName = row.teamName.toLowerCase();

  return (
    row.teamId === "athletic_historico" ||
    row.teamId === "athletic_club_historico" ||
    normalizedName.includes("histórico") ||
    normalizedName.includes("historico") ||
    normalizedName.includes("zurigorri")
  );
}

function getDisplayTeamName(row: LeagueTableRow): string {
  if (isUserTeam(row)) {
    return "Athletic Club Histórico";
  }

  return row.teamName;
}

type LeagueQualificationZone =
  | "champion"
  | "champions"
  | "europa"
  | "conference"
  | "relegation"
  | "middle";

interface LeagueQualificationInfo {
  zone: LeagueQualificationZone;
  label?: string;
  detail?: string;
}

function getRowKey(row: LeagueTableRow, index: number): string {
  return `${row.teamId}_${index}`;
}

function findNextLeagueIndexForEurope(params: {
  table: LeagueTableRow[];
  reservedIndexes: Set<number>;
  startIndex: number;
}): number | undefined {
  const { table, reservedIndexes, startIndex } = params;

  for (let index = startIndex; index < table.length; index += 1) {
    if (!reservedIndexes.has(index)) {
      return index;
    }
  }

  return undefined;
}

function buildLeagueQualificationMap(
  table: LeagueTableRow[],
  summary: FinalGameSummary
): Map<string, LeagueQualificationInfo> {
  const qualificationMap = new Map<string, LeagueQualificationInfo>();
  const reservedEuropeanIndexes = new Set<number>();

  table.forEach((row, index) => {
    const position = index + 1;
    const key = getRowKey(row, index);

    if (position === 1) {
      qualificationMap.set(key, {
        zone: "champion",
        label: "Campeón + Champions",
      });
      reservedEuropeanIndexes.add(index);
      return;
    }

    if (position <= 4) {
      qualificationMap.set(key, {
        zone: "champions",
        label: "Champions",
      });
      reservedEuropeanIndexes.add(index);
      return;
    }

    if (position > table.length - 3) {
      qualificationMap.set(key, {
        zone: "relegation",
        label: "Descenso",
      });
      return;
    }

    qualificationMap.set(key, { zone: "middle" });
  });

  const leagueEuropaIndex = 4; // 5º clasificado.
  if (table[leagueEuropaIndex]) {
    qualificationMap.set(getRowKey(table[leagueEuropaIndex], leagueEuropaIndex), {
      zone: "europa",
      label: "Europa League",
      detail: "Vía Liga",
    });
    reservedEuropeanIndexes.add(leagueEuropaIndex);
  }

  const cupWinnerIndex = table.findIndex((row) => {
    if (!summary.cupChampionTeamId && !summary.cupChampionTeamName) return false;

    return (
      row.teamId === summary.cupChampionTeamId ||
      row.teamName === summary.cupChampionTeamName ||
      (isUserTeam(row) && summary.cupChampionTeamId === "athletic_historico")
    );
  });

  if (cupWinnerIndex >= 0) {
    const cupWinnerAlreadyQualifiedByLeague = reservedEuropeanIndexes.has(cupWinnerIndex);

    if (cupWinnerAlreadyQualifiedByLeague) {
      const passedEuropaIndex = findNextLeagueIndexForEurope({
        table,
        reservedIndexes: reservedEuropeanIndexes,
        startIndex: 5,
      });

      if (typeof passedEuropaIndex === "number") {
        qualificationMap.set(getRowKey(table[passedEuropaIndex], passedEuropaIndex), {
          zone: "europa",
          label: "Europa League",
          detail: "Plaza Copa heredada",
        });
        reservedEuropeanIndexes.add(passedEuropaIndex);
      }
    } else {
      qualificationMap.set(getRowKey(table[cupWinnerIndex], cupWinnerIndex), {
        zone: "europa",
        label: "Europa League",
        detail: "Campeón de Copa",
      });
      reservedEuropeanIndexes.add(cupWinnerIndex);
    }
  }

  const conferenceIndex = findNextLeagueIndexForEurope({
    table,
    reservedIndexes: reservedEuropeanIndexes,
    startIndex: 5,
  });

  if (typeof conferenceIndex === "number") {
    qualificationMap.set(getRowKey(table[conferenceIndex], conferenceIndex), {
      zone: "conference",
      label: "Conference",
    });
    reservedEuropeanIndexes.add(conferenceIndex);
  }

  return qualificationMap;
}

function getLeagueZoneClass(info: LeagueQualificationInfo): string {
  if (info.zone === "champion") return "final-zone-champion";
  if (info.zone === "champions") return "final-zone-champions";
  if (info.zone === "europa") return "final-zone-europe";
  if (info.zone === "conference") return "final-zone-conference";
  if (info.zone === "relegation") return "final-zone-relegation";

  return "final-zone-middle";
}

function getCupSummaryText(summary: FinalGameSummary): string {
  if (summary.cupTrophyWon) return "Campeón de Copa";

  if (summary.cupStatus === "eliminated") {
    const baseLabel = summary.cupUserEliminatedRoundName
      ? `Eliminado en ${summary.cupUserEliminatedRoundName}`
      : summary.cupRoundReached ?? "Eliminado en Copa";

    return summary.cupChampionTeamName
      ? `${baseLabel} · Campeón: ${summary.cupChampionTeamName}`
      : baseLabel;
  }

  return summary.cupRoundReached ?? "Copa no finalizada";
}

function getCupResultClass(result: NonNullable<FinalGameSummary["cupResults"]>[number]): string {
  if (result.userTeamWon) return "final-cup-result final-cup-result-win";
  if (result.userTeamDrew) return "final-cup-result final-cup-result-draw";
  return "final-cup-result final-cup-result-loss";
}

function getCupResultLabel(result: NonNullable<FinalGameSummary["cupResults"]>[number]): string {
  if (result.userTeamWon) return "Victoria";
  if (result.userTeamDrew) return "Empate";
  return "Derrota";
}

function buildShareText(summary: FinalGameSummary): string {
  const topScorer = summary.topScorer
    ? `${summary.topScorer.playerName} (${summary.topScorer.goals} goles)`
    : "Sin datos";

  const topAssister = summary.topAssister
    ? `${summary.topAssister.playerName} (${summary.topAssister.assists} asistencias)`
    : "Sin datos";

  return [
    "Once histórico Zurigorri ⚪🔴",
    "",
    `Resultado final: ${summary.finalCategory}`,
    `Liga: ${summary.leaguePosition}º con ${summary.points} puntos`,
    `Copa del Rey: ${getCupSummaryText(summary)}`,
    `Balance Liga: ${summary.wins}V / ${summary.draws}E / ${summary.losses}D`,
    `Goles: ${summary.goalsFor} a favor / ${summary.goalsAgainst} en contra`,
    `Máximo goleador: ${topScorer}`,
    `Máximo asistente: ${topAssister}`,
    `Porterías a cero: ${summary.cleanSheets}`,
    "",
    "¿Serías capaz de crear un Athletic mejor?",
  ].join("\n");
}

function getDifficultyLabel(difficulty?: GameDifficulty): string {
  if (difficulty === "normal") return "Fácil";
  if (difficulty === "leyenda") return "Leyenda";
  return "Normal";
}

function formatHistoryDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Fecha desconocida";
  }

  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

function ResultStatCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string | number;
  helper?: string;
}) {
  return (
    <article className="final-stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
      {helper && <small>{helper}</small>}
    </article>
  );
}

function LeagueTableFinal({ table, summary }: { table?: LeagueTableRow[]; summary: FinalGameSummary }) {
  if (!table || table.length === 0) {
    return (
      <section className="final-league-table-card final-league-table-empty">
        <div className="final-league-table-header">
          <div>
            <span>LaLiga 25/26</span>
            <h2>Clasificación final completa</h2>
          </div>
        </div>
        <p>
          Esta partida se generó antes de guardar la tabla completa. Empieza una nueva
          partida y simula la Liga para verla aquí.
        </p>
      </section>
    );
  }

  const qualificationMap = buildLeagueQualificationMap(table, summary);

  return (
    <section className="final-league-table-card">
      <div className="final-league-table-header">
        <div>
          <span>LaLiga 25/26</span>
          <h2>Clasificación final completa</h2>
        </div>
        <small>{table.length} equipos</small>
      </div>

      <div className="final-league-zone-legend">
        <span className="zone-dot zone-dot-champion">Campeón</span>
        <span className="zone-dot zone-dot-champions">Champions</span>
        <span className="zone-dot zone-dot-europe">Europa League</span>
        <span className="zone-dot zone-dot-conference">Conference</span>
        <span className="zone-dot zone-dot-relegation">Descenso</span>
      </div>

      <p className="final-league-europe-note">
        Copa del Rey: el campeón va a Europa League. Si ya está clasificado por Liga,
        la plaza pasa al siguiente equipo de la clasificación. Si el campeón de Copa no es
        equipo de Liga, conserva su plaza copera y la Conference queda para el siguiente
        equipo libre de la tabla.
      </p>

      <div className="final-league-table-wrap">
        <table className="final-league-table">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Equipo</th>
              <th>PJ</th>
              <th>V</th>
              <th>E</th>
              <th>D</th>
              <th>GF</th>
              <th>GC</th>
              <th>DG</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>
            {table.map((row, index) => {
              const highlighted = isUserTeam(row);
              const qualificationInfo =
                qualificationMap.get(getRowKey(row, index)) ?? { zone: "middle" };

              return (
                <tr
                  key={`${row.teamId}_${index}`}
                  className={`final-league-table-row ${getLeagueZoneClass(qualificationInfo)} ${
                    highlighted ? "final-league-table-user-row" : ""
                  }`}
                >
                  <td>{index + 1}</td>
                  <td className="final-league-team-cell">
                    <strong>{getDisplayTeamName(row)}</strong>
                    <div className="final-league-team-tags">
                      {qualificationInfo.label && (
                        <span className={`final-league-qualification-tag final-league-qualification-${qualificationInfo.zone}`}>
                          {qualificationInfo.label}
                        </span>
                      )}
                      {qualificationInfo.detail && (
                        <span className="final-league-qualification-detail">
                          {qualificationInfo.detail}
                        </span>
                      )}
                      {highlighted && <span>Tu equipo</span>}
                    </div>
                  </td>
                  <td>{row.played}</td>
                  <td>{row.won}</td>
                  <td>{row.drawn}</td>
                  <td>{row.lost}</td>
                  <td>{row.goalsFor}</td>
                  <td>{row.goalsAgainst}</td>
                  <td>{row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}</td>
                  <td className="final-league-points-cell">{row.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}


function BestGamePanel({ history }: { history: GameHistoryEntry[] }) {
  const bestGame = getBestGameHistoryEntry(history);

  if (!bestGame) {
    return null;
  }

  return (
    <section className="final-best-game-card">
      <div>
        <span>🏆 Mejor partida</span>
        <h2>
          {bestGame.points} puntos · {bestGame.leaguePosition}º
        </h2>
        <p>
          {bestGame.formationName} · {bestGame.coachName} · Dificultad{" "}
          {getDifficultyLabel(bestGame.difficulty)}
        </p>
      </div>

      <div className="final-best-game-meta">
        <strong>
          {bestGame.wins}V / {bestGame.draws}E / {bestGame.losses}D
        </strong>
        <small>
          {bestGame.topScorerName
            ? `Goleador: ${bestGame.topScorerName} (${bestGame.topScorerGoals ?? 0})`
            : "Sin goleador"}
        </small>
      </div>
    </section>
  );
}

function CupSummaryPanel({ summary }: { summary: FinalGameSummary }) {
  const cupResults = summary.cupResults ?? [];
  const simulatedCupFinalResults = (summary.cupSimulatedRemainingResults ?? []).filter(
    (result) => (result.roundName ?? "").toLowerCase() === "final"
  );

  return (
    <section className={`final-cup-card ${summary.cupTrophyWon ? "final-cup-card-won" : ""}`}>
      <div className="final-cup-header">
        <div>
          <span>Copa del Rey</span>
          <h2>{getCupSummaryText(summary)}</h2>
        </div>
        <strong>{summary.cupTrophyWon ? "🏆" : "🏟️"}</strong>
      </div>

      {(summary.cupChampionTeamName || summary.cupRunnerUpTeamName) && (
        <div className="final-cup-winner-box">
          <article>
            <span>Campeón</span>
            <strong>{summary.cupChampionTeamName ?? "Sin datos"}</strong>
          </article>
          <article>
            <span>Subcampeón</span>
            <strong>{summary.cupRunnerUpTeamName ?? "Sin datos"}</strong>
          </article>
        </div>
      )}

      {cupResults.length === 0 ? (
        <p className="final-cup-empty">No hay partidos de Copa registrados.</p>
      ) : (
        <div className="final-cup-results">
          {cupResults.map((result) => (
            <article key={result.fixtureId} className={getCupResultClass(result)}>
              <span>{result.roundName}</span>
              <strong>
                {result.homeTeamName} {result.homeGoals}-{result.awayGoals} {result.awayTeamName}
              </strong>
              <small>{getCupResultLabel(result)}</small>
            </article>
          ))}
        </div>
      )}

      {simulatedCupFinalResults.length > 0 && (
        <div className="final-cup-results final-cup-rest-results">
          <h3>Final simulada</h3>
          {simulatedCupFinalResults.map((result) => (
            <article key={result.fixtureId} className="final-cup-result final-cup-result-neutral">
              <span>{result.roundName}</span>
              <strong>
                {result.homeTeamName} {result.homeGoals}-{result.awayGoals} {result.awayTeamName}
              </strong>
              <small>Simulado</small>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function HistoryPanel({ history }: { history: GameHistoryEntry[] }) {
  if (history.length === 0) {
    return (
      <section className="final-history-card">
        <div className="final-history-header">
          <div>
            <span>Historial local</span>
            <h2>Últimas partidas</h2>
          </div>
        </div>
        <p className="final-history-empty">
          Todavía no hay partidas guardadas en este navegador.
        </p>
      </section>
    );
  }

  return (
    <section className="final-history-card">
      <div className="final-history-header">
        <div>
          <span>Historial local</span>
          <h2>Últimas partidas</h2>
        </div>
        <small>Máximo 5</small>
      </div>

      <div className="final-history-list">
        {history.map((entry, index) => (
          <article
            key={`${entry.gameId}_${entry.playedAt}`}
            className={`final-history-entry ${index === 0 ? "final-history-entry-current" : ""}`}
          >
            <div className="final-history-entry-main">
              <strong>{entry.leaguePosition}º · {entry.points} pts</strong>
              <span>
                {entry.formationName} · {entry.coachName} · {getDifficultyLabel(entry.difficulty)}
              </span>
              <small>
                {entry.wins}V / {entry.draws}E / {entry.losses}D · Rating {entry.teamOverall}
              </small>
            </div>

            <div className="final-history-entry-side">
              <span>{formatHistoryDate(entry.playedAt)}</span>
              <small>
                {entry.topScorerName
                  ? `${entry.topScorerName} (${entry.topScorerGoals ?? 0} goles)`
                  : "Sin goleador"}
              </small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}


function FinalAccordion({
  title,
  eyebrow,
  defaultOpen = true,
  children,
}: {
  title: string;
  eyebrow?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className={`final-accordion ${open ? "final-accordion-open" : ""}`}>
      <button
        type="button"
        className="final-accordion-header"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
      >
        <span>
          {eyebrow && <small>{eyebrow}</small>}
          <strong>{title}</strong>
        </span>
        <b>{open ? "▲" : "▼"}</b>
      </button>

      {open && <div className="final-accordion-content">{children}</div>}
    </section>
  );
}

export function FinalSummary({
  summary,
  difficulty = "dificil",
  formation,
  selectedPlayers,
  selectedCoach,
  teamRating,
  onRestart,
  onShare,
}: FinalSummaryProps) {
  const shareText = buildShareText(summary);

  const initialHistory = useMemo(() => loadGameHistory(), []);
  const [history, setHistory] = useState<GameHistoryEntry[]>(initialHistory);

  useEffect(() => {
    const entry = buildHistoryEntry({
      summary,
      formation,
      selectedCoach,
      teamRating,
      difficulty,
    });

    const nextHistory = upsertGameHistoryEntry(entry);
    setHistory(nextHistory);
  }, [summary, formation, selectedCoach, teamRating]);

  function handleShare() {
    if (onShare) {
      onShare(shareText);
      return;
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      void navigator.clipboard.writeText(shareText);
    }
  }

  return (
    <section className="final-summary">
      <header className="final-summary-header">
        <p className="eyebrow">Final de temporada</p>
        <h1>
          {getMedalEmoji(summary.leaguePosition)} {summary.finalLabel}
        </h1>
        <p>{summary.finalCategory}</p>
      </header>
      {onRestart && (
        <div className="final-primary-cta-bar" aria-label="Acciones de final de temporada">
          <button type="button" className="final-primary-restart-button" onClick={onRestart}>
            Jugar otra temporada
          </button>
          <span>Prueba otro once histórico, otra formación y una nueva simulación.</span>
        </div>
      )}
      <div className="final-summary-layout">
        <main className="final-main-panel">
          <section className="final-hero-card">
            <span>Clasificación final</span>
            <strong>{summary.leaguePosition}º</strong>
            <p>
              {summary.points} puntos · {summary.wins} victorias · {summary.draws} empates ·{" "}
              {summary.losses} derrotas
            </p>
          </section>

          <BestGamePanel history={history} />

          <div className="final-stats-grid">
            <ResultStatCard label="Puntos" value={summary.points} helper="Liga 25/26" />
            <ResultStatCard label="Goles a favor" value={summary.goalsFor} />
            <ResultStatCard label="Goles en contra" value={summary.goalsAgainst} />
            <ResultStatCard label="Porterías a cero" value={summary.cleanSheets} />
            <ResultStatCard label="Copa del Rey" value={summary.cupTrophyWon ? "Campeón" : "-"} helper={getCupSummaryText(summary)} />
          </div>

          <FinalAccordion title="Palmarés" eyebrow="Vitrina histórica" defaultOpen>
            <PalmaresTrophyCase summary={summary} />
          </FinalAccordion>

          <FinalAccordion title="Copa del Rey" eyebrow={getCupSummaryText(summary)} defaultOpen>
            <CupSummaryPanel summary={summary} />
          </FinalAccordion>

          <FinalAccordion title="Clasificación final completa" eyebrow="LaLiga 25/26" defaultOpen>
            <LeagueTableFinal table={summary.table} summary={summary} />
          </FinalAccordion>

          <FinalAccordion title="Historial local" eyebrow="Últimas partidas" defaultOpen={false}>
            <HistoryPanel history={history} />
          </FinalAccordion>

          <FinalAccordion title="Tu once final" eyebrow="Plantilla" defaultOpen={false}>
            <section className="final-board-card">
              <SelectedTeamBoard
                formation={formation}
                selectedPlayers={selectedPlayers}
                title="Once final"
                compact
              />
            </section>
          </FinalAccordion>
        </main>

        <aside className="final-side-panel">
          <section className="final-card">
            <h2>Entrenador</h2>
            <div className="final-coach-card">
              <strong>{selectedCoach.coachSeason.name}</strong>
              <span>Temporada {selectedCoach.coachSeason.season}</span>
              <small>Media {selectedCoach.coachSeason.overall}</small>
            </div>
          </section>

          <section className="final-card">
            <h2>Rating del equipo</h2>
            <div className="final-rating-circle">
              <strong>{teamRating.overall}</strong>
              <span>{teamRating.profileLabel}</span>
            </div>

            <div className="final-rating-list">
              <span>Ataque {teamRating.attack}</span>
              <span>Defensa {teamRating.defense}</span>
              <span>Control {teamRating.control}</span>
              <span>Portería {teamRating.goalkeeping}</span>
            </div>
          </section>

          <section className="final-card">
            <h2>Jugadores destacados</h2>

            <div className="final-player-highlight">
              <span>Máximo goleador</span>
              <strong>{summary.topScorer?.playerName ?? "Sin datos"}</strong>
              <small>{summary.topScorer?.goals ?? 0} goles</small>
            </div>

            <div className="final-player-highlight">
              <span>Máximo asistente</span>
              <strong>{summary.topAssister?.playerName ?? "Sin datos"}</strong>
              <small>{summary.topAssister?.assists ?? 0} asistencias</small>
            </div>
          </section>

          <FinalAccordion title="Compartir resultado" eyebrow="Resumen" defaultOpen={false}>
            <section className="final-card final-card-flat">
              <pre className="share-preview">{shareText}</pre>

              <div className="final-actions">
                <button type="button" onClick={handleShare}>
                  Copiar resumen
                </button>

                {onRestart && (
                  <button type="button" className="secondary-final-button" onClick={onRestart}>
                    Jugar otra temporada
                  </button>
                )}
              </div>
            </section>
          </FinalAccordion>
        </aside>
      </div>
    
        <SupportButton variant="final" />
      </section>
  );
}

export default FinalSummary;



