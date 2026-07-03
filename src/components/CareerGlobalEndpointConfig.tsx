import { useMemo, useState } from "react";
import {
  clearStoredGlobalRankingEndpoint,
  getGlobalRankingBackendLabel,
  isGlobalRankingConfigured,
  loadStoredGlobalRankingEndpoint,
  saveStoredGlobalRankingEndpoint,
  validateGlobalRankingEndpoint,
} from "../services/globalRankingService";

import "./CareerGlobalEndpointConfig.css";

interface CareerGlobalEndpointConfigProps {
  onEndpointChange?: () => void;
  compact?: boolean;
}

export function CareerGlobalEndpointConfig({ onEndpointChange, compact = false }: CareerGlobalEndpointConfigProps) {
  const [endpoint, setEndpoint] = useState(() => loadStoredGlobalRankingEndpoint());
  const [message, setMessage] = useState(() => isGlobalRankingConfigured()
    ? `Ranking global conectado: ${getGlobalRankingBackendLabel()}.`
    : "Pega la URL /exec de Apps Script para activar el ranking global en este navegador.");

  const endpointError = useMemo(() => endpoint ? validateGlobalRankingEndpoint(endpoint) : undefined, [endpoint]);
  const configured = isGlobalRankingConfigured();

  function handleSave() {
    const result = saveStoredGlobalRankingEndpoint(endpoint);
    setMessage(result.message);

    if (result.ok) {
      onEndpointChange?.();
    }
  }

  function handleClear() {
    clearStoredGlobalRankingEndpoint();
    setEndpoint("");
    setMessage("Endpoint local borrado. Si no hay variable de entorno, el ranking global volverá a estado pendiente.");
    onEndpointChange?.();
  }

  return (
    <section className={`career-global-endpoint-config${compact ? " career-global-endpoint-config--compact" : ""}`}>
      <div>
        <span className="career-global-endpoint-kicker">Configuración local</span>
        <h3>{configured ? "Ranking global conectado" : "Activar ranking global"}</h3>
        <p>
          El endpoint se guarda solo en este navegador. No se sube a GitHub y permite probar Apps Script aunque Vite no lea `.env.local`.
        </p>
      </div>

      <div className="career-global-endpoint-form">
        <label htmlFor="career-global-endpoint">URL Apps Script /exec</label>
        <input
          id="career-global-endpoint"
          type="url"
          value={endpoint}
          placeholder="https://script.google.com/macros/s/.../exec"
          onChange={(event) => setEndpoint(event.target.value)}
        />
        {endpointError && <small role="alert">{endpointError}</small>}
      </div>

      <div className="career-global-endpoint-actions">
        <button type="button" className="career-global-endpoint-save" onClick={handleSave} disabled={Boolean(endpointError)}>
          Guardar endpoint
        </button>
        <button type="button" className="secondary-home-button" onClick={handleClear}>
          Borrar endpoint local
        </button>
      </div>

      <p className="career-global-endpoint-message" role="status">{message}</p>
    </section>
  );
}

export default CareerGlobalEndpointConfig;
