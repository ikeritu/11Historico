import { useMemo, useState } from "react";

import { canChangeFormationWithOnePlayer } from "../career/careerRules";
import { FORMATIONS } from "../data/formations";
import { resolvePlayerSlotPlacement } from "../domain/positionRules";
import type { Formation, FormationSlot, SelectedPlayer } from "../types/game";

import "./CareerFormationChangePicker.css";

interface CareerFormationChangePickerProps {
  currentFormation: Formation;
  selectedPlayers: SelectedPlayer[];
  nextSeasonLabel: string;
  onConfirmFormationChange: (formation: Formation, remappedPlayers: SelectedPlayer[]) => void;
  onCancel: () => void;
}

interface FormationOption {
  formation: Formation;
  remappedPlayers: SelectedPlayer[];
  reason: string;
  movementLabel: string;
}

const LINE_LABELS: Record<FormationSlot["line"], string> = {
  goalkeeper: "portería",
  defense: "defensa",
  midfield: "medio",
  attack: "ataque",
};

function buildMovementLabel(result: ReturnType<typeof canChangeFormationWithOnePlayer>): string {
  if (!result.removedLine || !result.addedLine) return "Misma estructura de líneas";

  return `Mueve 1 jugador: ${LINE_LABELS[result.removedLine]} → ${LINE_LABELS[result.addedLine]}`;
}

function remapPlayersToFormation(
  selectedPlayers: SelectedPlayer[],
  formation: Formation,
): SelectedPlayer[] | undefined {
  const slots = [...formation.slots].sort((a, b) => {
    const order: Record<FormationSlot["line"], number> = {
      goalkeeper: 0,
      defense: 1,
      midfield: 2,
      attack: 3,
    };

    return order[a.line] - order[b.line];
  });

  const players = [...selectedPlayers].sort(
    (a, b) => b.playerSeason.overall - a.playerSeason.overall,
  );

  function search(
    slotIndex: number,
    remainingPlayers: SelectedPlayer[],
    placedPlayers: SelectedPlayer[],
  ): SelectedPlayer[] | undefined {
    if (slotIndex >= slots.length) {
      return remainingPlayers.length === 0 ? placedPlayers : undefined;
    }

    const slot = slots[slotIndex];
    const candidates = remainingPlayers
      .map((player, index) => ({
        player,
        index,
        placement: resolvePlayerSlotPlacement(player.playerSeason, slot),
      }))
      .filter((item) => item.placement.canPlace)
      .sort((a, b) => b.player.playerSeason.overall - a.player.playerSeason.overall);

    for (const candidate of candidates) {
      const nextRemaining = remainingPlayers.filter((_, index) => index !== candidate.index);
      const nextPlaced: SelectedPlayer[] = [
        ...placedPlayers,
        {
          slotId: slot.id,
          position: candidate.placement.assignedPosition ?? slot.allowedPositions[0],
          playerSeason: candidate.player.playerSeason,
        },
      ];

      const result = search(slotIndex + 1, nextRemaining, nextPlaced);
      if (result) return result;
    }

    return undefined;
  }

  return search(0, players, []);
}

export function CareerFormationChangePicker({
  currentFormation,
  selectedPlayers,
  nextSeasonLabel,
  onConfirmFormationChange,
  onCancel,
}: CareerFormationChangePickerProps) {
  const [selectedFormationId, setSelectedFormationId] = useState<string | undefined>();

  const options = useMemo<FormationOption[]>(() => {
    return FORMATIONS
      .filter((formation) => formation.id !== currentFormation.id)
      .map((formation) => {
        const compatibility = canChangeFormationWithOnePlayer(currentFormation, formation);
        if (!compatibility.canChange) return undefined;

        const remappedPlayers = remapPlayersToFormation(selectedPlayers, formation);
        if (!remappedPlayers) return undefined;

        return {
          formation,
          remappedPlayers,
          reason: compatibility.reason,
          movementLabel: buildMovementLabel(compatibility),
        } satisfies FormationOption;
      })
      .filter((item): item is FormationOption => Boolean(item));
  }, [currentFormation, selectedPlayers]);

  const selectedOption = options.find((option) => option.formation.id === selectedFormationId);

  return (
    <main className="career-formation-change-screen">
      <section className="career-formation-change-card">
        <p className="eyebrow">Modo carrera Athletic · premio especial</p>
        <h1>Cambiar formación compatible</h1>
        <p className="career-formation-change-lead">
          Has desbloqueado un ajuste táctico para la temporada {nextSeasonLabel}. Solo aparecen sistemas que mueven como máximo un jugador entre líneas y mantienen tu once válido.
        </p>

        <section className="career-formation-change-current" aria-label="Formación actual">
          <span>Formación actual</span>
          <strong>{currentFormation.name}</strong>
          <small>{selectedPlayers.length}/11 jugadores conservados</small>
        </section>

        {options.length === 0 ? (
          <section className="career-formation-change-empty">
            <strong>No hay formaciones compatibles para este once.</strong>
            <p>
              Tu plantilla actual no encaja de forma segura en otra formación con un único movimiento entre líneas. Puedes volver y elegir otra recompensa.
            </p>
          </section>
        ) : (
          <div className="career-formation-change-grid">
            {options.map((option) => {
              const isSelected = option.formation.id === selectedFormationId;

              return (
                <button
                  key={option.formation.id}
                  type="button"
                  className={`career-formation-option ${isSelected ? "career-formation-option-selected" : ""}`}
                  onClick={() => setSelectedFormationId(option.formation.id)}
                >
                  <span>Nueva formación</span>
                  <strong>{option.formation.name}</strong>
                  <small>{option.movementLabel}</small>
                  <em>{option.reason}</em>
                </button>
              );
            })}
          </div>
        )}

        {selectedOption && (
          <section className="career-formation-change-confirm" aria-label="Confirmar cambio de formación">
            <div>
              <span>Cambio seleccionado</span>
              <strong>{currentFormation.name} → {selectedOption.formation.name}</strong>
              <small>Se recolocan automáticamente los 11 jugadores actuales en puestos válidos.</small>
            </div>
          </section>
        )}

        <div className="career-formation-change-actions">
          <button
            type="button"
            className="primary-home-button"
            disabled={!selectedOption}
            onClick={() => {
              if (!selectedOption) return;
              onConfirmFormationChange(selectedOption.formation, selectedOption.remappedPlayers);
            }}
          >
            Confirmar formación
          </button>
          <button type="button" className="secondary-home-button" onClick={onCancel}>
            Volver a recompensas
          </button>
        </div>
      </section>
    </main>
  );
}

export default CareerFormationChangePicker;
