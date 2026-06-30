import type { FinalGameSummary, SelectedPlayer, TeamRating } from "../types/game";
import type { CareerObjectiveResult, CareerSeasonResult, CareerTrophyCounts } from "../types/career";
import { calculatePalmaresScore } from "../career/careerRules";

import "./CareerSeasonOutcome.css";

interface CareerSeasonOutcomeProps {
  summary: FinalGameSummary;
  seasonResult: CareerSeasonResult;
  objectiveResult: CareerObjectiveResult;
  onViewFullSummary: () => void;
  onRestart?: () => void;
  onContinueCareer?: () => void;
  selectedPlayers?: SelectedPlayer[];
  teamRating?: TeamRating;
  completedSeasons?: number;
  trophyCounts?: CareerTrophyCounts;
}

function getSelectedPlayersAverage(selectedPlayers: SelectedPlayer[] = []): number | undefined {
  if (selectedPlayers.length === 0) return undefined;

  return Math.round(
    selectedPlayers.reduce((sum, selected) => sum + selected.playerSeason.overall, 0) /
      selectedPlayers.length
  );
}

function getCareerOutcomeNote(seasonResult: CareerSeasonResult, objectiveResult: CareerObjectiveResult): string {
  if (seasonResult.isRelegated) {
    return "Carrera terminada por descenso. Ni la Copa ni la Supercopa evitan este Game Over.";
  }

  if (!objectiveResult.survives) {
    return "Carrera terminada: te quedaste fuera de Europa y no ganaste la Copa del Rey.";
  }

  if (seasonResult.wonLeague) {
    return "Temporada histórica: campeón de Liga. Premio especial desbloqueado.";
  }

  if (seasonResult.wonCopa) {
    return "Temporada salvada por Copa. Premio especial desbloqueado.";
  }

  if (seasonResult.wonSupercopa && objectiveResult.qualifiedForEurope) {
    return "Temporada salvada por Europa y Supercopa ganada. Premio especial desbloqueado.";
  }

  return "Temporada salvada por Europa. Elige cambiar 1 jugador o cambiar entrenador antes de seguir.";
}


function getGameOverTrophyCounts(
  trophyCounts: CareerTrophyCounts | undefined,
  seasonResult: CareerSeasonResult,
): CareerTrophyCounts {
  const base = trophyCounts ?? {
    champions: 0,
    liga: 0,
    europaLeague: 0,
    copa: 0,
    conference: 0,
    supercopa: 0,
  };

  return {
    ...base,
    liga: base.liga + (seasonResult.wonLeague ? 1 : 0),
    copa: base.copa + (seasonResult.wonCopa ? 1 : 0),
    supercopa: base.supercopa + (seasonResult.wonSupercopa ? 1 : 0),
  };
}

function CareerGameOverArcadeSummary({
  seasonResult,
  objectiveResult,
  completedSeasons = 0,
  trophyCounts,
}: {
  seasonResult: CareerSeasonResult;
  objectiveResult: CareerObjectiveResult;
  completedSeasons?: number;
  trophyCounts?: CareerTrophyCounts;
}) {
  const finalTrophies = getGameOverTrophyCounts(trophyCounts, seasonResult);
  const palmaresScore = calculatePalmaresScore(finalTrophies);
  const survivalScore = completedSeasons * 10;
  const arcadeScore = survivalScore + palmaresScore;
  const mainCause = seasonResult.isRelegated
    ? "Descenso"
    : objectiveResult.qualifiedForEurope
      ? "Objetivo fallido por Copa/descenso"
      : "Sin plaza europea ni Copa";

  return (
    <section className="career-arcade-summary" aria-label="Resumen arcade de carrera">
      <div className="career-arcade-summary-header">
        <span>Resumen de carrera</span>
        <strong>{arcadeScore}</strong>
        <small>puntos arcade</small>
      </div>

      <div className="career-arcade-grid">
        <article>
          <span>Temporadas superadas</span>
          <strong>{completedSeasons}</strong>
          <small>+{survivalScore} pts</small>
        </article>
        <article>
          <span>Última Liga</span>
          <strong>{seasonResult.leaguePosition}.º</strong>
          <small>{mainCause}</small>
        </article>
        <article>
          <span>Palmarés</span>
          <strong>{palmaresScore}</strong>
          <small>pts por títulos</small>
        </article>
      </div>

      <div className="career-arcade-trophy-row">
        <span>Ligas {finalTrophies.liga}</span>
        <span>Copas {finalTrophies.copa}</span>
        <span>Supercopas {finalTrophies.supercopa}</span>
        <span>Europa {finalTrophies.europaLeague + finalTrophies.conference + finalTrophies.champions}</span>
      </div>
    </section>
  );
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
  onContinueCareer,
  selectedPlayers = [],
  teamRating,
  completedSeasons = 0,
  trophyCounts,
}: CareerSeasonOutcomeProps) {
  const survived = objectiveResult.survives;
  const xiAverage = getSelectedPlayersAverage(selectedPlayers);

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

        {(xiAverage || teamRating) && (
          <p className="career-outcome-team-rating-note">
            {xiAverage ? <>Media XI actual: <strong>{xiAverage}</strong></> : null}
            {xiAverage && teamRating ? " · " : null}
            {teamRating ? <>Rating visible equipo: <strong>{teamRating.overall}</strong></> : null}
          </p>
        )}

        <p className="career-outcome-note">
          {getCareerOutcomeNote(seasonResult, objectiveResult)}
        </p>

        {!survived && (
          <CareerGameOverArcadeSummary
            seasonResult={seasonResult}
            objectiveResult={objectiveResult}
            completedSeasons={completedSeasons}
            trophyCounts={trophyCounts}
          />
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
        </div>
      </section>
    </main>
  );
}

export default CareerSeasonOutcome;
