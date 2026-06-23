import type { Formation, SelectedCoach, SelectedPlayer } from "../types/game";
import type { CareerObjectiveResult, CareerSeasonResult, CareerTrophyCounts } from "../types/career";
import { calculatePalmaresScore } from "../career/careerRules";

import "./CareerInterseasonReward.css";

interface CareerInterseasonRewardProps {
  completedSeasons: number;
  nextSeasonLabel: string;
  formation: Formation;
  selectedPlayers: SelectedPlayer[];
  selectedCoach?: SelectedCoach;
  seasonResult: CareerSeasonResult;
  objectiveResult: CareerObjectiveResult;
  trophyCounts: CareerTrophyCounts;
  onChoosePlayerChange: () => void;
  onChooseCoachChange: () => void;
  onRestart: () => void;
}

function getQualificationLabel(result: CareerSeasonResult): string {
  if (result.europeanQualification === "champions") return "Champions League";
  if (result.europeanQualification === "europa_league") return "Europa League";
  if (result.europeanQualification === "conference") return "Conference League";
  return "Sin Europa";
}

export function CareerInterseasonReward({
  completedSeasons,
  nextSeasonLabel,
  formation,
  selectedPlayers,
  selectedCoach,
  seasonResult,
  objectiveResult,
  trophyCounts,
  onChoosePlayerChange,
  onChooseCoachChange,
  onRestart,
}: CareerInterseasonRewardProps) {
  const palmaresScore = calculatePalmaresScore(trophyCounts);
  const leagueChampionBonus = seasonResult.wonLeague;

  return (
    <main className="career-reward-screen">
      <section className="career-reward-card">
        <p className="eyebrow">Modo carrera Athletic · entre temporadas</p>
        <h1>Temporada superada. Toca decidir.</h1>
        <p className="career-reward-lead">
          {objectiveResult.reason} Ahora preparas la temporada {nextSeasonLabel} con una mejora controlada.
        </p>

        <div className="career-reward-grid">
          <article>
            <span>Temporadas superadas</span>
            <strong>{completedSeasons}</strong>
            <small>Siguiente: {nextSeasonLabel}</small>
          </article>
          <article>
            <span>Última Liga</span>
            <strong>{seasonResult.leaguePosition}.º</strong>
            <small>{getQualificationLabel(seasonResult)}</small>
          </article>
          <article>
            <span>Copa del Rey</span>
            <strong>{seasonResult.wonCopa ? "Campeón" : "Sin título"}</strong>
            <small>{seasonResult.wonCopa ? "+5 palmarés" : "Sin puntos"}</small>
          </article>
          <article>
            <span>Palmarés</span>
            <strong>{palmaresScore} pts</strong>
            <small>Ligas {trophyCounts.liga} · Copas {trophyCounts.copa}</small>
          </article>
        </div>

        {leagueChampionBonus && (
          <div className="career-reward-bonus">
            <strong>Premio extra por ganar Liga</strong>
            <span>
              El cambio de formación compatible queda preparado para la siguiente subfase fina.
              En esta versión se mantiene estable el bucle: cambias 1 jugador o entrenador y sigues carrera.
            </span>
          </div>
        )}

        <div className="career-reward-current-team">
          <article>
            <span>Formación actual</span>
            <strong>{formation.name}</strong>
          </article>
          <article>
            <span>Once</span>
            <strong>{selectedPlayers.length}/11</strong>
          </article>
          <article>
            <span>Entrenador</span>
            <strong>{selectedCoach?.coachSeason.name ?? "Sin entrenador"}</strong>
          </article>
        </div>

        <div className="career-reward-actions">
          <button type="button" className="primary-home-button" onClick={onChoosePlayerChange}>
            Cambiar 1 jugador
          </button>
          <button type="button" className="secondary-home-button" onClick={onChooseCoachChange}>
            Cambiar entrenador
          </button>
          <button type="button" className="secondary-home-button" onClick={onRestart}>
            Salir al inicio
          </button>
        </div>
      </section>
    </main>
  );
}

export default CareerInterseasonReward;
