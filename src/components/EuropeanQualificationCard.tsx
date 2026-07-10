// src/components/EuropeanQualificationCard.tsx
//
// Europa Qualification UI (v0.24.0b). Muestra si el Athletic se ha
// clasificado para competición europea la próxima temporada y por qué.
// No implica que la competición europea ya se haya jugado.

import type { EuropeanQualificationResult } from "../europe/europeanTypes";

import "./EuropeanQualificationCard.css";

interface EuropeanQualificationCardProps {
  result: EuropeanQualificationResult;
}

function getReasonLabel(result: EuropeanQualificationResult): string {
  if (result.source === "league_position") return "Por posición en Liga";
  if (result.source === "copa_winner") {
    return result.explanation.toLowerCase().includes("mejora")
      ? "La Copa mejora tu plaza europea"
      : "Por ganar la Copa del Rey";
  }
  return "";
}

function getNarrative(result: EuropeanQualificationResult): string {
  if (result.competition === "champions_league") {
    return "El Athletic jugará la Champions League la próxima temporada.";
  }
  if (result.competition === "europa_league") {
    return "El Athletic jugará la Europa League la próxima temporada.";
  }
  if (result.competition === "conference_league") {
    return "El Athletic jugará la Conference League la próxima temporada.";
  }
  return "El Athletic no se ha clasificado para competición europea esta temporada.";
}

export function EuropeanQualificationCard({ result }: EuropeanQualificationCardProps) {
  const reasonLabel = getReasonLabel(result);

  return (
    <section
      className={`european-qualification-card ${
        result.qualified ? "european-qualification-card-qualified" : "european-qualification-card-none"
      }`}
      aria-label="Clasificación europea"
    >
      <p className="european-qualification-eyebrow">
        {result.qualified ? "Clasificación europea" : "Sin billete europeo"}
      </p>

      <strong className="european-qualification-competition">
        {result.qualified ? result.label : "Sin clasificación europea"}
      </strong>

      {result.qualified && reasonLabel && (
        <span className="european-qualification-reason">{reasonLabel}</span>
      )}

      <p className="european-qualification-narrative">{getNarrative(result)}</p>

      {result.qualified && (
        <small className="european-qualification-note">
          La plaza europea queda guardada para la próxima temporada.
        </small>
      )}
    </section>
  );
}

export default EuropeanQualificationCard;
