import { useEffect, useMemo, useRef, useState } from "react";

import {
  SEASON_LUCK_WHEEL_PRIZE_SEGMENTS,
  declineSeasonLuckWheel,
  resolveSeasonLuckWheel,
  type SeasonLuckWheelOffer,
  type SeasonLuckWheelResolvedResult,
  type SeasonLuckWheelState,
} from "../career/seasonLuckWheel";

import "./SeasonLuckWheelModal.css";

interface SeasonLuckWheelModalProps {
  offer: SeasonLuckWheelOffer;
  onDecline: (state: SeasonLuckWheelState) => void;
  onResolve: (result: SeasonLuckWheelResolvedResult) => void;
}

function getPrizeClass(group: string): string {
  if (group === "positive") return "season-wheel-prize-positive";
  if (group === "negative") return "season-wheel-prize-negative";
  return "season-wheel-prize-neutral";
}

function getResultGroupLabel(group: string): string {
  if (group === "positive") return "Premio positivo";
  if (group === "negative") return "Castigo";
  return "Sin efecto";
}

function getResultTitle(result: SeasonLuckWheelResolvedResult): string {
  if (result.resultType === "rating_plus_0_5") return "+0.5 de media de temporada";
  if (result.resultType === "player_change") return "Cambio de jugador";
  if (result.resultType === "coach_change") return "Cambio de entrenador";
  if (result.resultType === "rating_plus_1") return "+1.0 de media de temporada";
  if (result.resultType === "rating_plus_1_and_player_change") return "+1.0 y cambio de jugador";
  if (result.resultType === "rating_minus_0_5") return "-0.5 de media de temporada";
  if (result.resultType === "rating_minus_1") return "-1.0 de media de temporada";
  return "Sin efecto";
}

function getSegmentColor(segment: { group: string; resultType: string }): string {
  if (segment.resultType === "rating_plus_1_and_player_change") return "#05895e";
  if (segment.resultType === "rating_plus_1") return "#0f9d58";
  if (segment.resultType === "player_change") return "#0891b2";
  if (segment.resultType === "coach_change") return "#7aa321";
  if (segment.resultType === "rating_plus_0_5") return "#14a65d";
  if (segment.resultType === "rating_minus_1") return "#b91c1c";
  if (segment.resultType === "rating_minus_0_5") return "#dc2626";
  return "#e7b416";
}

function getSegmentDisplayParts(label: string): string[] {
  if (label === "Cambio de jugador") return ["Cambio de", "jugador"];
  if (label === "Cambio de entrenador") return ["Cambio de", "entrenador"];
  if (label === "+1.0 media + jugador") return ["+1.0 media", "+ jugador"];
  return [label];
}

function getResultDetail(result: SeasonLuckWheelResolvedResult): string {
  if (result.ratingDelta !== 0) {
    return `Efecto activo hasta final de temporada: ${result.ratingDelta > 0 ? "+" : ""}${result.ratingDelta.toFixed(1)} en todas las líneas del equipo.`;
  }

  if (result.requiresPlayerChange && result.requiresCoachChange) {
    return "Premio de cambio preparado para una fase posterior de la ruleta.";
  }

  if (result.requiresPlayerChange) {
    return "Premio de cambio de jugador registrado. La ejecución del cambio queda preparada para la siguiente iteración jugable.";
  }

  if (result.requiresCoachChange) {
    return "Premio de cambio de entrenador registrado. La ejecución del cambio queda preparada para la siguiente iteración jugable.";
  }

  return "No se modifica el rendimiento del equipo.";
}

export default function SeasonLuckWheelModal({
  offer,
  onDecline,
  onResolve,
}: SeasonLuckWheelModalProps) {
  const [stage, setStage] = useState<"offer" | "playing" | "resolved">("offer");
  const [position, setPosition] = useState(0.5);
  const [result, setResult] = useState<SeasonLuckWheelResolvedResult | undefined>();
  const directionRef = useRef(1);
  const frameRef = useRef<number | undefined>(undefined);
  const lastFrameRef = useRef<number | undefined>(undefined);

  const targetSegmentIndex = useMemo(() => {
    if (!result) return -1;
    return SEASON_LUCK_WHEEL_PRIZE_SEGMENTS.findIndex(
      (segment) => segment.resultType === result.resultType,
    );
  }, [result]);

  const wheelBackground = useMemo(() => {
    const segmentCount = Math.max(1, offer.prizeSegments.length);
    const segmentAngle = 360 / segmentCount;
    const stops = offer.prizeSegments.map((segment, index) => {
      const start = index * segmentAngle;
      const end = (index + 1) * segmentAngle;
      return `${getSegmentColor(segment)} ${start}deg ${end}deg`;
    });

    return `conic-gradient(from ${-segmentAngle / 2}deg, ${stops.join(", ")})`;
  }, [offer.prizeSegments]);

  const wheelRotation = useMemo(() => {
    if (!result || targetSegmentIndex < 0) return 0;
    const segmentCount = Math.max(1, SEASON_LUCK_WHEEL_PRIZE_SEGMENTS.length);
    const segmentAngle = 360 / segmentCount;
    return 1440 + (360 - targetSegmentIndex * segmentAngle);
  }, [result, targetSegmentIndex]);

  useEffect(() => {
    if (stage !== "playing") return undefined;

    const animate = (timestamp: number) => {
      const previousTimestamp = lastFrameRef.current ?? timestamp;
      const deltaMs = timestamp - previousTimestamp;
      lastFrameRef.current = timestamp;

      setPosition((current) => {
        const speed = 0.0014;
        let next = current + directionRef.current * deltaMs * speed;

        if (next >= 1) {
          next = 1;
          directionRef.current = -1;
        }

        if (next <= 0) {
          next = 0;
          directionRef.current = 1;
        }

        return next;
      });

      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== undefined) {
        window.cancelAnimationFrame(frameRef.current);
      }
      frameRef.current = undefined;
      lastFrameRef.current = undefined;
    };
  }, [stage]);

  function handleDecline() {
    onDecline(declineSeasonLuckWheel({
      seasonId: offer.seasonId,
      triggerEvent: offer.triggerEvent,
      appearanceText: offer.appearanceText,
    }));
  }

  function handleStop() {
    const resolved = resolveSeasonLuckWheel({
      seasonId: offer.seasonId,
      triggerEvent: offer.triggerEvent,
      precisionPosition: position,
      randomGroup: Math.random(),
      randomPrize: Math.random(),
      randomText: Math.random(),
    });

    setResult(resolved);
    setStage("resolved");
  }

  function handleContinue() {
    if (!result) return;
    onResolve(result);
  }

  return (
    <div className="season-wheel-overlay" role="dialog" aria-modal="true" aria-labelledby="season-wheel-title">
      <section className="season-wheel-modal">
        <div className="season-wheel-header">
          <span className="season-wheel-eyebrow">Ruleta de la temporada</span>
          <h2 id="season-wheel-title">La suerte llama a San Mamés</h2>
          <p>{offer.appearanceText}</p>
        </div>

        <div className="season-wheel-content">
          <div className="season-wheel-disc-shell" aria-label="Ruleta con 12 quesitos de premios visibles">
            <div
              className={`season-wheel-disc ${stage === "playing" ? "season-wheel-disc-spinning" : ""} ${result ? "season-wheel-disc-resolved" : ""}`}
              style={{
                background: wheelBackground,
                ...(result ? { transform: `rotate(${wheelRotation}deg)` } : {}),
              }}
            >
              {offer.prizeSegments.map((segment, index) => (
                <span
                  key={`${segment.resultType}-${index}`}
                  className={`season-wheel-prize ${getPrizeClass(segment.group)}`}
                  style={{ transform: `rotate(${index * (360 / offer.prizeSegments.length)}deg)` }}
                >
                  {getSegmentDisplayParts(segment.label).map((part) => (
                    <span key={part}>{part}</span>
                  ))}
                </span>
              ))}
            </div>
            <strong className="season-wheel-disc-center">Aupa</strong>
          </div>

          <div className="season-wheel-precision-panel">
            <div className="season-wheel-zone-labels" aria-hidden="true">
              <span>Malo</span>
              <span>Neutro</span>
              <span>Bueno</span>
              <span>Neutro</span>
              <span>Malo</span>
            </div>

            <div className="season-wheel-precision-bar">
              <span className="season-wheel-precision-center" />
              <span className="season-wheel-precision-marker" style={{ left: `${position * 100}%` }}>
                ↓
              </span>
            </div>

            <p>
              Para cerca del centro para mejorar tus opciones. En los extremos aumenta el riesgo de castigo.
            </p>
          </div>
        </div>

        {stage === "offer" && (
          <div className="season-wheel-actions">
            <button type="button" className="season-wheel-primary" onClick={() => setStage("playing")}>
              Jugar ruleta
            </button>
            <button type="button" className="season-wheel-secondary" onClick={handleDecline}>
              No jugar
            </button>
          </div>
        )}

        {stage === "playing" && (
          <div className="season-wheel-actions">
            <button type="button" className="season-wheel-primary season-wheel-stop" onClick={handleStop}>
              Parar flecha
            </button>
          </div>
        )}

        {stage === "resolved" && result && (
          <article className={`season-wheel-result ${getPrizeClass(result.resultGroup)}`}>
            <span>{getResultGroupLabel(result.resultGroup)} · {result.precisionZone.label}</span>
            <h3>{getResultTitle(result)}</h3>
            <p>{result.resultText}</p>
            <small>{getResultDetail(result)}</small>
            <button type="button" className="season-wheel-primary" onClick={handleContinue}>
              Continuar temporada
            </button>
          </article>
        )}
      </section>
    </div>
  );
}
