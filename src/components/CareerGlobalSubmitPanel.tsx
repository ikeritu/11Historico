import { useMemo, useState } from "react";
import type { CareerLocalRankingEntry } from "../types/career";
import {
  buildCareerGlobalRankingPayload,
  getGlobalRankingBackendLabel,
  isGlobalRankingConfigured,
  submitGlobalRankingEntry,
  validateGlobalRankingNick,
} from "../services/globalRankingService";
import CareerGlobalEndpointConfig from "./CareerGlobalEndpointConfig";
import {
  hasSubmittedCareerGlobalRankingEntry,
  loadLastCareerGlobalRankingNick,
  markCareerGlobalRankingEntrySubmitted,
  saveLastCareerGlobalRankingNick,
} from "../storage/careerGlobalRankingStorage";

import "./CareerGlobalSubmitPanel.css";

interface CareerGlobalSubmitPanelProps {
  entry: CareerLocalRankingEntry;
  onViewGlobalRanking: () => void;
}

export function CareerGlobalSubmitPanel({ entry, onViewGlobalRanking }: CareerGlobalSubmitPanelProps) {
  const [nick, setNick] = useState(() => loadLastCareerGlobalRankingNick());
  const [submitted, setSubmitted] = useState(() => hasSubmittedCareerGlobalRankingEntry(entry.id));
  const [message, setMessage] = useState(() => isGlobalRankingConfigured()
    ? "Introduce nick para enviar esta carrera al futuro Top global."
    : "Configura VITE_GLOBAL_RANKING_ENDPOINT para activar el envío real a Apps Script.");
  const [isSending, setIsSending] = useState(false);
  const [endpointRevision, setEndpointRevision] = useState(0);

  const nickError = useMemo(() => nick ? validateGlobalRankingNick(nick) : undefined, [nick]);
  const endpointStatus = useMemo(() => ({
    configured: isGlobalRankingConfigured(),
    backendLabel: getGlobalRankingBackendLabel(),
    revision: endpointRevision,
  }), [endpointRevision]);
  const configured = endpointStatus.configured;
  const backendLabel = endpointStatus.backendLabel;

  function handleEndpointChange() {
    setEndpointRevision((value) => value + 1);
    setMessage("Endpoint guardado. Ya puedes enviar esta carrera al ranking global.");
  }

  async function handleSubmit() {
    const error = validateGlobalRankingNick(nick);

    if (error) {
      setMessage(error);
      return;
    }

    if (submitted) {
      setMessage("Esta carrera ya figura como enviada desde este navegador.");
      return;
    }

    const payload = buildCareerGlobalRankingPayload({ nick, entry });

    setIsSending(true);
    saveLastCareerGlobalRankingNick(nick);

    const result = await submitGlobalRankingEntry(payload);
    setIsSending(false);
    setMessage(result.message);

    if (result.ok) {
      markCareerGlobalRankingEntrySubmitted(entry.id);
      setSubmitted(true);
      onViewGlobalRanking();
    }
  }

  return (
    <section className="career-global-submit-panel" aria-label="Enviar carrera al ranking global">
      <div>
        <span className="career-global-submit-kicker">Ranking global · {backendLabel}</span>
        <h2>Comparte esta carrera</h2>
        <p>
          Envía tu puntuación al Top global. Si el endpoint no está configurado, puedes pegar la URL /exec aquí y guardarla solo en este navegador.
        </p>
      </div>

      {!configured && (
        <CareerGlobalEndpointConfig compact onEndpointChange={handleEndpointChange} />
      )}

      <div className="career-global-submit-form">
        <label htmlFor="career-global-nick">Nick</label>
        <input
          id="career-global-nick"
          type="text"
          value={nick}
          maxLength={24}
          placeholder="Tu nick"
          onChange={(event) => setNick(event.target.value)}
          onBlur={() => saveLastCareerGlobalRankingNick(nick)}
        />
        {nickError && <small role="alert">{nickError}</small>}
      </div>

      <div className="career-global-submit-actions">
        <button
          type="button"
          className="career-global-submit-button"
          onClick={handleSubmit}
          disabled={isSending || submitted || !configured}
        >
          {submitted ? "Carrera enviada" : configured ? (isSending ? "Enviando..." : "Enviar al ranking global") : "Configura endpoint"}
        </button>
        <button type="button" className="secondary-home-button" onClick={onViewGlobalRanking}>
          Ver ranking global
        </button>
      </div>

      <p className="career-global-submit-message" role="status">{message}</p>
    </section>
  );
}

export default CareerGlobalSubmitPanel;
