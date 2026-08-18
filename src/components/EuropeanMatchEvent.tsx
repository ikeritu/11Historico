// src/components/EuropeanMatchEvent.tsx
//
// European UI Matchday View (v0.24.2a) + European Progress UI (v0.24.2b).
// Tarjeta visual de evento europeo: competición, fase, rival, rating,
// progreso, resultado, calendario europeo y copy narrativo. No suma títulos
// europeos al palmarés todavía.

import { getEuropeanCompetitionLabel } from "../europe/europeanQualification";
import { getEuropeanTournamentPhaseLabel, getEuropeanTournamentSummary } from "../europe/europeanTournament";
import type { EuropeanCompetition, EuropeanTournamentMatch, EuropeanTournamentState } from "../europe/europeanTypes";
import EuropeanProgressPanel from "./EuropeanProgressPanel";

import "./EuropeanMatchEvent.css";

interface EuropeanMatchEventProps {
  tournament: EuropeanTournamentState;
  match: EuropeanTournamentMatch;
  userTeamRating: number;
  onSimulate: () => void;
  onContinue: () => void;
}

function getResultLabel(match: EuropeanTournamentMatch): string {
  if (match.result === "win") return "Victoria";
  if (match.result === "draw") return "Empate";
  return "Derrota";
}

function getResultClass(match: EuropeanTournamentMatch): string {
  if (match.result === "win") return "european-match-result european-match-result-win";
  if (match.result === "draw") return "european-match-result european-match-result-draw";
  return "european-match-result european-match-result-loss";
}

function getCompetitionClass(competition: EuropeanCompetition): string {
  if (competition === "champions_league") return "european-match-event-card european-match-event-card-champions";
  if (competition === "europa_league") return "european-match-event-card european-match-event-card-europa";
  return "european-match-event-card european-match-event-card-conference";
}

function getCompetitionBadge(competition: EuropeanCompetition): string {
  if (competition === "champions_league") return "CHAMPIONS";
  if (competition === "europa_league") return "EUROPA";
  return "CONFERENCE";
}

function getPhaseNarrative(tournament: EuropeanTournamentState, match: EuropeanTournamentMatch): string {
  if (tournament.completed && tournament.champion) {
    return "El Athletic ha conquistado Europa; el título queda pendiente de integrarse en el palmarés histórico.";
  }
  if (tournament.eliminated) return "El sueño europeo termina aquí, pero la temporada nacional continúa.";
  if (match.phase === "final") return "Final europea: una noche para entrar en la historia.";
  if (match.phase === "semifinal") return "Semifinal europea: el Athletic sigue vivo y tiene la final a un paso.";
  if (match.isHome) return "Noche grande en San Mamés: Europa vuelve a Bilbao.";
  return "Salida europea exigente: toca competir lejos de San Mamés.";
}

function getProgressPercent(tournament: EuropeanTournamentState): number {
  const played = tournament.matches.filter((candidate) => candidate.status === "played").length;
  const total = Math.max(tournament.matches.length, 1);
  return Math.min(100, Math.round((played / total) * 100));
}

export function EuropeanMatchEvent({
  tournament,
  match,
  userTeamRating,
  onSimulate,
  onContinue,
}: EuropeanMatchEventProps) {
  const summary = getEuropeanTournamentSummary(tournament);
  const isPlayed = match.status === "played";
  const homeAwayText = match.isHome
    ? "El Athletic jugará como local"
    : "El Athletic jugará como visitante";
  const progressPercent = getProgressPercent(tournament);
  const phaseLabel = getEuropeanTournamentPhaseLabel(match.phase);

  return (
    <section className={getCompetitionClass(match.competition)} aria-label="Evento europeo">
      <div className="european-match-event-hero">
        <div>
          <p className="european-match-event-eyebrow">Noche europea</p>
          <h2>{getEuropeanCompetitionLabel(match.competition)}</h2>
          <p className="european-match-event-phase">
            {phaseLabel} · Jornada europea {match.matchday}
          </p>
        </div>
        <span className="european-match-event-badge">{getCompetitionBadge(match.competition)}</span>
      </div>

      <p className="european-match-event-narrative">{getPhaseNarrative(tournament, match)}</p>

      <div className="european-match-event-scoreboard" aria-label="Previa europea">
        <article className="european-match-event-team european-match-event-team-user">
          <span>Athletic Club</span>
          <strong>{Math.round(userTeamRating)}</strong>
          <small>{match.isHome ? "Local · San Mamés" : "Visitante"}</small>
        </article>
        <div className="european-match-event-versus">VS</div>
        <article className="european-match-event-team european-match-event-team-rival">
          <span>{match.opponent.name}</span>
          <strong>{match.opponent.rating}</strong>
          <small>{match.opponent.country}</small>
        </article>
      </div>

      {isPlayed && (
        <div className="european-match-event-result">
          <span className="european-match-event-result-label">Resultado europeo</span>
          <div className={getResultClass(match)}>
            <strong>
              {match.isHome ? match.userGoals : match.opponentGoals}
              {" - "}
              {match.isHome ? match.opponentGoals : match.userGoals}
            </strong>
            <span>{getResultLabel(match)}</span>
          </div>
        </div>
      )}

      <div className="european-match-event-summary">
        <div className="european-match-event-summary-header">
          <span>Progreso europeo</span>
          <strong>{summary.statusText}</strong>
        </div>
        <div className="european-match-event-progress" aria-hidden="true">
          <div style={{ width: `${progressPercent}%` }} />
        </div>
        <p>
          {summary.phaseLabel} · {summary.matchesPlayed}/{summary.totalMatches} jugados · {summary.points} pts ·{" "}
          {summary.wins}V {summary.draws}E {summary.losses}D · GF {summary.goalsFor} / GC {summary.goalsAgainst}
        </p>
        <p className="european-match-event-status">{summary.statusText}</p>
      </div>

      <EuropeanProgressPanel tournament={tournament} currentMatchId={match.id} />

      <div className="european-match-event-grid">
        <article>
          <span>Rival</span>
          <strong>{match.opponent.name}</strong>
          <small>{match.opponent.country}</small>
        </article>
        <article>
          <span>Rating rival</span>
          <strong>{match.opponent.rating}</strong>
          <small>Tu rating: {Math.round(userTeamRating)}</small>
        </article>
        <article>
          <span>Sede</span>
          <strong>{match.isHome ? "San Mamés" : "Fuera de casa"}</strong>
          <small>{homeAwayText}</small>
        </article>
      </div>

      <div className="european-match-event-actions">
        {!isPlayed && (
          <button type="button" className="secondary-league-button european-match-event-button" onClick={onSimulate}>
            Simular partido europeo
          </button>
        )}

        {isPlayed && (
          <button type="button" className="secondary-league-button european-match-event-button" onClick={onContinue}>
            Continuar temporada
          </button>
        )}
      </div>
    </section>
  );
}

export default EuropeanMatchEvent;
