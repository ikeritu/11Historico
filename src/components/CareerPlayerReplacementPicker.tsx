import type { Formation, SelectedPlayer } from "../types/game";
import TacticalPitch from "./TacticalPitch";

import "./CareerPlayerReplacementPicker.css";

interface CareerPlayerReplacementPickerProps {
  formation: Formation;
  selectedPlayers: SelectedPlayer[];
  nextSeasonLabel: string;
  onSelectPlayerToReplace: (selection: SelectedPlayer) => void;
  onCancel: () => void;
}

export function CareerPlayerReplacementPicker({
  formation,
  selectedPlayers,
  nextSeasonLabel,
  onSelectPlayerToReplace,
  onCancel,
}: CareerPlayerReplacementPickerProps) {
  return (
    <main className="career-replace-screen">
      <section className="career-replace-card">
        <header className="career-replace-header">
          <div>
            <p className="eyebrow">Modo carrera Athletic · {nextSeasonLabel}</p>
            <h1>Elige el jugador que quieres cambiar</h1>
            <p>
              Saldrá un jugador del once actual. Después se sorteará una temporada histórica y elegirás un sustituto compatible.
            </p>
          </div>
          <button type="button" className="secondary-home-button" onClick={onCancel}>
            Volver
          </button>
        </header>

        <div className="career-replace-layout">
          <section className="career-replace-board">
            <TacticalPitch formation={formation} selectedPlayers={selectedPlayers} showNames compact />
          </section>

          <section className="career-replace-list" aria-label="Jugadores del once actual">
            {selectedPlayers.map((selection) => (
              <article key={`${selection.slotId}-${selection.playerSeason.id}`} className="career-replace-player-card">
                <div>
                  <strong>{selection.playerSeason.name}</strong>
                  <span>
                    {selection.position} · {selection.playerSeason.season} · Media {selection.playerSeason.overall}
                  </span>
                </div>
                <button type="button" onClick={() => onSelectPlayerToReplace(selection)}>
                  Cambiar
                </button>
              </article>
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}

export default CareerPlayerReplacementPicker;
