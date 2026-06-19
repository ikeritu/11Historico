// src/components/SeasonReveal.tsx

import { useEffect, useMemo, useState } from "react";

import type { Formation, SeasonId } from "../types/game";

import { getAthleticSeasonById, getAvailableAthleticSeasons } from "../data/athleticSeasons";

import "./SeasonReveal.css";

interface SeasonRevealProps {
  formation: Formation;
  finalSeason: SeasonId;
  availableSeasons?: SeasonId[];
  roundNumber?: number;
  totalRounds?: number;
  onStartDraft: () => void;
}

const MIN_REVEAL_MS = 1650;
const TICK_MS = 78;
const VISIBLE_SIDE_ITEMS = 3;

function getSeasonYearNumber(season: SeasonId): number {
  const [startYear] = season.split("/");
  const parsed = Number(startYear);

  return Number.isFinite(parsed) ? parsed : 0;
}

function getSeasonEraLabel(season: SeasonId): string {
  const year = getSeasonYearNumber(season);

  if (year < 1940) return "Era fundacional";
  if (year < 1960) return "Athletic clásico";
  if (year < 1980) return "Fútbol de barro";
  if (year < 2000) return "Generación histórica";
  if (year < 2010) return "Cambio de siglo";
  if (year < 2020) return "Athletic moderno";

  return "Athletic actual";
}

function buildRoulettePool(finalSeason: SeasonId, availableSeasons?: SeasonId[]): SeasonId[] {
  const source = availableSeasons && availableSeasons.length > 0
    ? availableSeasons
    : getAvailableAthleticSeasons();

  const unique = Array.from(new Set([...source, finalSeason]));

  return unique.sort((a, b) => getSeasonYearNumber(a) - getSeasonYearNumber(b));
}

function getWrappedIndex(index: number, total: number): number {
  if (total <= 0) return 0;
  return ((index % total) + total) % total;
}

function getVisibleTimeline(pool: SeasonId[], centerSeason: SeasonId, sideItems = VISIBLE_SIDE_ITEMS) {
  if (pool.length === 0) {
    return [] as Array<{ season: SeasonId; distance: number; key: string }>;
  }

  const centerIndex = Math.max(pool.indexOf(centerSeason), 0);
  const items: Array<{ season: SeasonId; distance: number; key: string }> = [];

  for (let offset = -sideItems; offset <= sideItems; offset += 1) {
    const wrappedIndex = getWrappedIndex(centerIndex + offset, pool.length);
    const season = pool[wrappedIndex] ?? centerSeason;
    items.push({
      season,
      distance: offset,
      key: `${season}_${wrappedIndex}_${offset}`,
    });
  }

  return items;
}

export function SeasonReveal({
  formation,
  finalSeason,
  availableSeasons,
  roundNumber = 1,
  totalRounds = 11,
  onStartDraft,
}: SeasonRevealProps) {
  const roulettePool = useMemo(
    () => buildRoulettePool(finalSeason, availableSeasons),
    [availableSeasons, finalSeason]
  );

  const [displaySeason, setDisplaySeason] = useState<SeasonId>(() => roulettePool[0] ?? finalSeason);
  const [revealed, setRevealed] = useState(false);

  const finalSquad = getAthleticSeasonById(finalSeason);
  const finalPlayersCount = finalSquad?.players.length ?? 0;
  const finalCoachName = finalSquad?.coach.name ?? "Entrenador histórico";

  const visibleTimeline = useMemo(
    () => getVisibleTimeline(roulettePool, displaySeason),
    [displaySeason, roulettePool]
  );

  useEffect(() => {
    setRevealed(false);

    let tick = 0;

    const interval = window.setInterval(() => {
      const nextSeason = roulettePool[tick % roulettePool.length] ?? finalSeason;
      setDisplaySeason(nextSeason);
      tick += 1;
    }, TICK_MS);

    const timeout = window.setTimeout(() => {
      window.clearInterval(interval);
      setDisplaySeason(finalSeason);
      setRevealed(true);
    }, MIN_REVEAL_MS);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [finalSeason, roulettePool]);

  return (
    <section className="season-reveal">
      <div className="season-reveal-card">
        <div className="season-reveal-topline">
          <span className="season-reveal-dot" />
          <span>Sorteo de temporada · Ronda {roundNumber}/{totalRounds}</span>
          <span className="season-reveal-dot season-reveal-dot-red" />
        </div>

        <div className={`season-reveal-number ${revealed ? "season-reveal-number-final" : ""}`}>
          {displaySeason}
        </div>

        <div className="season-reveal-assigned-pill">
          Temporada asignada
        </div>

        <div className="season-reveal-window" aria-label="Timeline de temporadas">
          <div className={`season-reveal-strip ${revealed ? "season-reveal-strip-stopped" : ""}`}>
            {visibleTimeline.map(({ season, distance, key }) => (
              <span
                key={key}
                className={[
                  "season-reveal-chip",
                  season === displaySeason ? "active" : "",
                  `distance-${Math.abs(distance)}`,
                ].join(" ")}
              >
                {season}
              </span>
            ))}
          </div>
        </div>

        <div className="season-reveal-result">
          <span>{revealed ? "Salió" : "Sorteando..."}</span>
          <h1>
            {revealed ? "Athletic Club" : "Buscando generación"}
            <strong>{displaySeason}</strong>
          </h1>

          <p>
            {revealed
              ? `Ronda ${roundNumber}/${totalRounds}: te ha tocado la temporada ${finalSeason}. Elige un jugador de esta generación.`
              : `El bombo está eligiendo la plantilla histórica para la ronda ${roundNumber}/${totalRounds}.`}
          </p>
        </div>

        <div className="season-reveal-meta">
          <article>
            <span>Formación</span>
            <strong>{formation.name}</strong>
          </article>

          <article>
            <span>Plantilla</span>
            <strong>{revealed ? `${finalPlayersCount} jugadores` : "..."}</strong>
          </article>

          <article>
            <span>Entrenador</span>
            <strong>{revealed ? finalCoachName : "..."}</strong>
          </article>

          <article>
            <span>Época</span>
            <strong>{revealed ? getSeasonEraLabel(finalSeason) : "..."}</strong>
          </article>
        </div>

        <button
          type="button"
          className="season-reveal-button"
          onClick={onStartDraft}
          disabled={!revealed}
        >
          {revealed ? `Empezar ronda ${roundNumber}` : "Sorteando temporada..."}
        </button>

        <small className="season-reveal-rule">
          La temporada sorteada no se puede cambiar. Ese es el reto.
        </small>
      </div>
    </section>
  );
}

export default SeasonReveal;
