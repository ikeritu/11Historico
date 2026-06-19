import { useEffect, useMemo, useRef, useState } from "react";

import type {
  GameDifficulty,
  LeagueTableRow,
  SelectedPlayer,
  TeamRating,
} from "../types/game";

import {
  createFinalLeagueSummary,
  createUserLeagueSimulation,
  simulateFullCupAndLeague,
} from "../simulation/leagueSimulator";

import { USER_TEAM_NAME } from "../simulation/leagueTable";

import "./BalanceAuditPanel.css";

interface BalanceAuditPanelProps {
  difficulty: GameDifficulty;
  selectedPlayers: SelectedPlayer[];
  teamRating: TeamRating;
}

interface BalanceAuditRun {
  index: number;
  leagueChampion: string;
  athleticPosition: number;
  athleticPoints: number;
  cupChampion: string;
  cupRound: string;
  relegatedTeams: string[];
  warning: string;
}

interface BalanceAuditAggregate {
  simulations: number;
  athleticAveragePosition: number;
  athleticAveragePoints: number;
  athleticTop4Count: number;
  athleticLeagueTitles: number;
  athleticCupTitles: number;
  villarrealRelegations: number;
  eliteCupTitles: number;
  leagueChampionCounts: Array<[string, number]>;
  cupChampionCounts: Array<[string, number]>;
}

const AUDIT_SIZES = [10, 25, 50] as const;
const DEFAULT_AUTO_AUDIT_SIZE = 50;

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function applyDifficultyToTeamRating(
  teamRating: TeamRating,
  difficulty: GameDifficulty
): TeamRating {
  const modifier = difficulty === "normal" ? 2 : difficulty === "leyenda" ? -4 : 0;
  const apply = (value: number) => clamp(Math.round(value + modifier), 40, 99);

  return {
    ...teamRating,
    attack: apply(teamRating.attack),
    defense: apply(teamRating.defense),
    control: apply(teamRating.control),
    physical: apply(teamRating.physical),
    mentality: apply(teamRating.mentality),
    goalkeeping: apply(teamRating.goalkeeping),
    overall: apply(teamRating.overall),
  };
}

function countByName(values: string[]): Array<[string, number]> {
  const counts = new Map<string, number>();

  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts.entries()].sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return a[0].localeCompare(b[0]);
  });
}

function normalizeName(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function isEliteName(teamName: string): boolean {
  const normalized = normalizeName(teamName);

  return (
    normalized.includes("real madrid") ||
    normalized.includes("barcelona") ||
    normalized.includes("atletico")
  );
}

function getAthleticPosition(table: LeagueTableRow[]): number {
  return table.findIndex((row) => row.teamName === USER_TEAM_NAME) + 1;
}

function createBalanceWarning(params: {
  leagueChampion: string;
  cupChampion: string;
  athleticPosition: number;
  relegatedTeams: string[];
}): string {
  const warnings: string[] = [];
  const normalizedRelegated = params.relegatedTeams.map(normalizeName);

  if (normalizedRelegated.some((name) => name.includes("villarreal"))) {
    warnings.push("Villarreal desciende");
  }

  if (params.athleticPosition > 10) {
    warnings.push("Athletic bajo");
  }

  if (isEliteName(params.leagueChampion) && isEliteName(params.cupChampion)) {
    warnings.push("doblete/monopolio élite");
  }

  if (warnings.length === 0) return "OK";

  return warnings.join(" · ");
}

function createAggregate(rows: BalanceAuditRun[]): BalanceAuditAggregate {
  const simulations = rows.length || 1;
  const athleticAveragePosition =
    rows.reduce((sum, row) => sum + row.athleticPosition, 0) / simulations;
  const athleticAveragePoints =
    rows.reduce((sum, row) => sum + row.athleticPoints, 0) / simulations;
  const athleticTop4Count = rows.filter((row) => row.athleticPosition <= 4).length;
  const athleticLeagueTitles = rows.filter((row) => row.athleticPosition === 1).length;
  const athleticCupTitles = rows.filter((row) => row.cupChampion === USER_TEAM_NAME).length;
  const villarrealRelegations = rows.filter((row) =>
    row.relegatedTeams.some((team) => normalizeName(team).includes("villarreal"))
  ).length;
  const eliteCupTitles = rows.filter((row) => isEliteName(row.cupChampion)).length;

  return {
    simulations,
    athleticAveragePosition,
    athleticAveragePoints,
    athleticTop4Count,
    athleticLeagueTitles,
    athleticCupTitles,
    villarrealRelegations,
    eliteCupTitles,
    leagueChampionCounts: countByName(rows.map((row) => row.leagueChampion)),
    cupChampionCounts: countByName(rows.map((row) => row.cupChampion)),
  };
}

export function BalanceAuditPanel({
  difficulty,
  selectedPlayers,
  teamRating,
}: BalanceAuditPanelProps) {
  const [rows, setRows] = useState<BalanceAuditRun[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [lastRunSize, setLastRunSize] = useState<number | undefined>(undefined);
  const autoAuditSignatureRef = useRef<string | null>(null);

  const aggregate = useMemo(() => createAggregate(rows), [rows]);
  const effectiveTeamRating = useMemo(
    () => applyDifficultyToTeamRating(teamRating, difficulty),
    [difficulty, teamRating]
  );

  const auditSignature = useMemo(
    () => JSON.stringify({
      difficulty,
      teamRating,
      players: selectedPlayers.map((player) => ({
        id: player.playerSeason.id,
        name: player.playerSeason.name,
        season: player.playerSeason.season,
        rating: player.playerSeason.overall,
        position: player.position,
      })),
    }),
    [difficulty, selectedPlayers, teamRating]
  );

  function runAudit(totalSimulations: number) {
    setIsRunning(true);
    setLastRunSize(totalSimulations);

    window.setTimeout(() => {
      const nextRows: BalanceAuditRun[] = [];
      const baseSeed = Date.now() + Math.floor(Math.random() * 1000000);

      for (let index = 0; index < totalSimulations; index += 1) {
        const context = createUserLeagueSimulation();
        const finalContext = simulateFullCupAndLeague({
          context,
          teamRating: effectiveTeamRating,
          selectedPlayers,
          seed: baseSeed + index * 1009,
        });

        const summary = createFinalLeagueSummary({
          gameId: `balance_audit_${baseSeed}_${index}`,
          formationName: "Auditoría interna",
          coachName: "Auditoría interna",
          context: finalContext,
        });

        const table = summary.table ?? [];
        const leagueChampion = table[0]?.teamName ?? "Sin dato";
        const athleticPosition = getAthleticPosition(table) || summary.leaguePosition;
        const relegatedTeams = table.slice(-3).map((row) => row.teamName);
        const cupChampion = summary.cupChampionTeamName ??
          (summary.cupTrophyWon ? USER_TEAM_NAME : "Sin dato");

        nextRows.push({
          index: index + 1,
          leagueChampion,
          athleticPosition,
          athleticPoints: summary.points,
          cupChampion,
          cupRound: summary.cupRoundReached ?? "Sin dato",
          relegatedTeams,
          warning: createBalanceWarning({
            leagueChampion,
            cupChampion,
            athleticPosition,
            relegatedTeams,
          }),
        });
      }

      setRows(nextRows);
      setIsRunning(false);
    }, 40);
  }

  useEffect(() => {
    if (selectedPlayers.length === 0) return;
    if (autoAuditSignatureRef.current === auditSignature) return;

    autoAuditSignatureRef.current = auditSignature;
    runAudit(DEFAULT_AUTO_AUDIT_SIZE);
  }, [auditSignature, selectedPlayers.length]);

  return (
    <section className="balance-audit-card">
      <div className="balance-audit-header">
        <div>
          <span className="balance-audit-eyebrow">Herramienta interna</span>
          <h2>Auditoría automática de balance Liga/Copa</h2>
          <p>
            Al entrar en esta pantalla se lanzan automáticamente 50 temporadas completas con este once.
            No tienes que simularlas una a una. Los botones quedan solo para repetir la auditoría.
          </p>
        </div>

        <div className="balance-audit-buttons">
          {AUDIT_SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => runAudit(size)}
              disabled={isRunning}
            >
              {isRunning && lastRunSize === size ? "Calculando..." : `${size} sims`}
            </button>
          ))}
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="balance-audit-empty">
          Calculando automáticamente 50 simulaciones de control. Espera unos segundos.
        </p>
      ) : (
        <>
          <div className="balance-audit-summary-grid">
            <div>
              <span>Media Athletic</span>
              <strong>{aggregate.athleticAveragePosition.toFixed(1)}º</strong>
              <small>{aggregate.athleticAveragePoints.toFixed(1)} pts</small>
            </div>
            <div>
              <span>Top 4 Athletic</span>
              <strong>{aggregate.athleticTop4Count}/{aggregate.simulations}</strong>
              <small>Ligas: {aggregate.athleticLeagueTitles}</small>
            </div>
            <div>
              <span>Copa Athletic</span>
              <strong>{aggregate.athleticCupTitles}/{aggregate.simulations}</strong>
              <small>Élite Copa: {aggregate.eliteCupTitles}</small>
            </div>
            <div>
              <span>Villarreal descenso</span>
              <strong>{aggregate.villarrealRelegations}/{aggregate.simulations}</strong>
              <small>{aggregate.villarrealRelegations > 0 ? "vigilar" : "OK"}</small>
            </div>
          </div>

          <div className="balance-audit-lists">
            <div>
              <h3>Campeones Liga</h3>
              <ol>
                {aggregate.leagueChampionCounts.slice(0, 5).map(([team, count]) => (
                  <li key={`league_${team}`}>
                    <span>{team}</span>
                    <strong>{count}</strong>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3>Campeones Copa</h3>
              <ol>
                {aggregate.cupChampionCounts.slice(0, 5).map(([team, count]) => (
                  <li key={`cup_${team}`}>
                    <span>{team}</span>
                    <strong>{count}</strong>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="balance-audit-table-wrapper">
            <table className="balance-audit-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Liga</th>
                  <th>Athletic</th>
                  <th>Copa</th>
                  <th>Descensos</th>
                  <th>Lectura</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.index}>
                    <td>{row.index}</td>
                    <td>{row.leagueChampion}</td>
                    <td>{row.athleticPosition}º · {row.athleticPoints} pts</td>
                    <td>{row.cupChampion}</td>
                    <td>{row.relegatedTeams.join(", ")}</td>
                    <td className={row.warning === "OK" ? "balance-ok" : "balance-warning"}>
                      {row.warning}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}

export default BalanceAuditPanel;
