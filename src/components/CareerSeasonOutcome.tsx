import type { FinalGameSummary } from "../types/game";
import type { CareerObjectiveResult, CareerSeasonResult } from "../types/career";

import "./CareerSeasonOutcome.css";

interface CareerSeasonOutcomeProps {
  summary: FinalGameSummary;
  seasonResult: CareerSeasonResult;
  objectiveResult: CareerObjectiveResult;
  onViewFullSummary: () => void;
  onRestart: () => void;
  onContinueCareer?: () => void;
}

function getEuropeanLabel(result: CareerSeasonResult): string {
  if (result.europeanQualification === "champions") return "Champions League";
  if (result.europeanQualification === "europa_league") return "Europa League";
  if (result.europeanQualification === "conference") return "Conference League";
  return "Sin plaza europea";
}

export function CareerSeasonOutcome({
  summary,
  seasonResult,
  objectiveResult,
  onViewFullSummary,
  onRestart,
  onContinueCareer,
}: CareerSeasonOutcomeProps) {
  const survived = objectiveResult.survives;

  return (
    <main className={`career-outcome-screen ${survived ? "career-outcome-success" : "career-outcome-game-over"}`}>
      <section className="career-outcome-card">
        <p className="eyebrow">Modo carrera Athletic · {seasonResult.seasonLabel}</p>
        <h1>{survived ? "Temporada superada" : "GAME OVER"}</h1>
        <p className="career-outcome-reason">{objectiveResult.reason}</p>

        <div className="career-outcome-grid">
          <article>
            <span>Liga</span>
            <strong>{summary.leaguePosition}.º</strong>
            <small>{summary.points} puntos</small>
          </article>
          <article>
            <span>Europa</span>
            <strong>{getEuropeanLabel(seasonResult)}</strong>
            <small>{objectiveResult.qualifiedForEurope ? "Objetivo cumplido" : "No clasificado"}</small>
          </article>
          <article>
            <span>Copa del Rey</span>
            <strong>{seasonResult.wonCopa ? "Campeón" : summary.cupRoundReached ?? "Sin título"}</strong>
            <small>{seasonResult.wonCopa ? "Objetivo cumplido" : "No salva la temporada"}</small>
          </article>
          <article>
            <span>Descenso</span>
            <strong>{seasonResult.isRelegated ? "Sí" : "No"}</strong>
            <small>{seasonResult.isRelegated ? "Condición dura de Game Over" : "Sigue vivo si cumple objetivo"}</small>
          </article>
          <article>
            <span>Supercopa</span>
            <strong>{seasonResult.wonSupercopa ? "Campeón" : "Sin título"}</strong>
            <small>{seasonResult.wonSupercopa ? "+2 palmarés" : "No salva la temporada"}</small>
          </article>
        </div>

        {survived ? (
          <p className="career-outcome-note">
            Ya puedes continuar carrera: elige cambiar 1 jugador o cambiar entrenador antes de la siguiente temporada.
          </p>
        ) : (
          <p className="career-outcome-note">
            El ranking arcade global llegará en una subfase posterior del MVP.
          </p>
        )}

        <div className="career-outcome-actions">
          {survived && onContinueCareer && (
            <button type="button" className="primary-home-button" onClick={onContinueCareer}>
              Continuar carrera
            </button>
          )}
          <button type="button" className={survived ? "secondary-home-button" : "primary-home-button"} onClick={onViewFullSummary}>
            Ver resumen completo
          </button>
          <button type="button" className="secondary-home-button" onClick={onRestart}>
            Volver al inicio
          </button>
        </div>
      </section>
    </main>
  );
}

export default CareerSeasonOutcome;
