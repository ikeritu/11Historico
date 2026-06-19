// src/components/FormationSelector.tsx

import type { Formation } from "../types/game";
import { FORMATIONS } from "../data/formations";
import TacticalPitch from "./TacticalPitch";

import "./FormationSelector.css";

interface FormationSelectorProps {
  selectedFormationId?: string;
  onSelectFormation: (formation: Formation) => void;
}

function getModifierLabel(value: number): string {
  if (value > 0) return `+${value}`;
  return `${value}`;
}

function getModifierClass(value: number): string {
  if (value > 0) return "formation-modifier formation-modifier-positive";
  if (value < 0) return "formation-modifier formation-modifier-negative";
  return "formation-modifier formation-modifier-neutral";
}

export function FormationSelector({
  selectedFormationId,
  onSelectFormation,
}: FormationSelectorProps) {
  return (
    <section className="formation-selector">
      <header className="formation-selector-header">
        <p className="eyebrow">Paso 1</p>
        <h1>Elige tu formación</h1>
        <p className="formation-selector-intro">
          Cada sistema cambia la forma de jugar del Once histórico Zurigorri.
          Más defensas reducen goles encajados, más atacantes aumentan el peligro,
          y más centrocampistas mejoran el control del partido.
        </p>
      </header>

      <div className="formation-quick-select">
        <label htmlFor="formationQuickSelect">Ir a alineación</label>
        <select
          id="formationQuickSelect"
          value={selectedFormationId ?? ""}
          onChange={(event) => {
            const formation = FORMATIONS.find((item) => item.id === event.target.value);

            if (formation) {
              onSelectFormation(formation);
              window.setTimeout(() => {
                document
                  .getElementById(`formation-card-${formation.id}`)
                  ?.scrollIntoView({ behavior: "smooth", block: "center" });
              }, 50);
            }
          }}
        >
          <option value="" disabled>
            Selecciona una alineación
          </option>
          {FORMATIONS.map((formation) => (
            <option key={formation.id} value={formation.id}>
              {formation.name}
            </option>
          ))}
        </select>
      </div>

      <div className="formation-grid">
        {FORMATIONS.map((formation) => {
          const isSelected = formation.id === selectedFormationId;

          return (
            <article
              key={formation.id}
              className={`formation-card ${isSelected ? "formation-card-selected" : ""}`}
            >
              <div className="formation-card-top">
                <div>
                  <h2>{formation.name}</h2>
                  <p>{formation.description}</p>
                </div>

                {isSelected && (
                  <span className="selected-badge">Seleccionada</span>
                )}
              </div>

              <TacticalPitch formation={formation} compact />

              <div className="formation-details">
                <div>
                  <h3>Puntos fuertes</h3>
                  <ul>
                    {formation.strengths.slice(0, 3).map((strength) => (
                      <li key={strength}>{strength}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3>Puntos débiles</h3>
                  <ul>
                    {formation.weaknesses.slice(0, 3).map((weakness) => (
                      <li key={weakness}>{weakness}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="formation-modifiers">
                <span className={getModifierClass(formation.modifiers.attack)}>
                  Ataque {getModifierLabel(formation.modifiers.attack)}
                </span>
                <span className={getModifierClass(formation.modifiers.defense)}>
                  Defensa {getModifierLabel(formation.modifiers.defense)}
                </span>
                <span className={getModifierClass(formation.modifiers.control)}>
                  Control {getModifierLabel(formation.modifiers.control)}
                </span>
                <span className={getModifierClass(formation.modifiers.risk)}>
                  Riesgo {getModifierLabel(formation.modifiers.risk)}
                </span>
              </div>

              <button
                type="button"
                className="formation-select-button"
                onClick={() => onSelectFormation(formation)}
              >
                {isSelected ? "Usar esta formación" : "Elegir formación"}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default FormationSelector;

