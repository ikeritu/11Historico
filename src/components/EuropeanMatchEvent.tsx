// src/components/EuropeanMatchEvent.tsx
//
// European Calendar Integration (v0.24.1c). Tarjeta básica (no premium) que
// muestra el partido europeo pendiente o recién jugado dentro de la
// simulación de temporada. No implica que el título europeo ya se haya
// sumado al palmarés.

import { getEuropeanCompetitionLabel } from "../europe/europeanQualification";
import { getEuropeanTournamentPhaseLabel, getEuropeanTournamentSummary } from "../europe/europeanTournament";
import type { EuropeanTournamentMatch, EuropeanTournamentState } from "../europe/europeanTypes";

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

  return (
    <section className="european-match-event-card" aria-label="Evento europeo">
      <p className="european-match-event-eyebrow">Noche europea</p>
      <h2>{getEuropeanCompetitionLabel(match.competition)}</h2>
      <p className="european-match-event-phase">{getEuropeanTournamentPhaseLabel(match.phase)}</p>

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
        <span>Resumen de torneo</span>
        <p>
          {summary.phaseLabel} · {summary.matchesPlayed}/{summary.totalMatches} jugados · {summary.points} pts ·{" "}
          {summary.wins}V {summary.draws}E {summary.losses}D
        </p>
        <p className="european-match-event-status">{summary.statusText}</p>
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
