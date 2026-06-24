// src/components/GameHome.tsx

import { useState } from "react";
import type { EasyModeSeasonRangeId, GameDifficulty } from "../types/game";
import { EASY_MODE_SEASON_RANGES } from "../data/easyModeSeasonRanges";
import { APP_VERSION, APP_VERSION_NAME } from "../config/appVersion";

import "./GameHome.css";
import SupportButton from "./SupportButton";

interface GameHomeProps {
  hasSavedGame: boolean;
  difficulty: GameDifficulty;
  onDifficultyChange: (difficulty: GameDifficulty) => void;
  easyModeSeasonRangeId: EasyModeSeasonRangeId;
  onEasyModeSeasonRangeChange: (rangeId: EasyModeSeasonRangeId) => void;
  onNewGame: () => void;
  onContinueGame: () => void;
  onCareerPreview: () => void;
}

const DIFFICULTY_OPTIONS: Array<{
  id: GameDifficulty;
  label: string;
  description: string;
}> = [
  {
    id: "normal",
    label: "Fácil",
    description: "Más accesible. Permite elegir el rango histórico del draft.",
  },
  {
    id: "dificil",
    label: "Normal",
    description: "Equilibrado. Ganar la Liga cuesta, pero es posible.",
  },
  {
    id: "leyenda",
    label: "Leyenda",
    description: "Madrid, Barça y Atlético aprietan de verdad.",
  },
];

const FEEDBACK_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfSHQS1PVKoWNl8u7mTrYO2Fchuj-2UC82Ap4AVktUnBrBZ8A/viewform?usp=publish-editor";
const PUBLIC_GAME_URL = "https://ikeritu.github.io/11Historico/";
const SHARE_TEXT = "Prueba Futbol11: crea tu once histórico del Athletic y simula Liga + Copa.";

export function GameHome({
  hasSavedGame,
  difficulty,
  onDifficultyChange,
  easyModeSeasonRangeId,
  onEasyModeSeasonRangeChange,
  onNewGame,
  onContinueGame,
  onCareerPreview,
}: GameHomeProps) {
  const [shareStatus, setShareStatus] = useState("");

  const selectedDifficulty = DIFFICULTY_OPTIONS.find((option) => option.id === difficulty);

  const handleShareGame = async () => {
    setShareStatus("");

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Futbol11 — Once histórico Zurigorri",
          text: SHARE_TEXT,
          url: PUBLIC_GAME_URL,
        });
        return;
      }

      await navigator.clipboard.writeText(PUBLIC_GAME_URL);
      setShareStatus("Enlace copiado");
    } catch {
      setShareStatus("Copia el enlace desde la barra del navegador");
    }
  };

  return (
    <main className="game-home game-home--compact">
      <section className="game-home-hero" aria-label="Portada Futbol11">
        <div className="game-home-main-grid">
          <div className="game-home-intro">
            <div className="game-home-top-row">
              <div className="game-home-badge" aria-label="Versión actual">
                <span aria-hidden="true">⚪</span>
                <span aria-hidden="true">🔴</span>
                <span>{APP_VERSION} · beta</span>
              </div>

              <a
                className="game-home-help-link"
                href={FEEDBACK_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Enviar feedback de Futbol11"
              >
                ?
              </a>
            </div>

            <h1>Once histórico Zurigorri</h1>

            <p className="game-home-subtitle">
              Crea tu once histórico del Athletic, mezcla leyendas de distintas épocas y compite en Liga, Copa y modo carrera.
            </p>

            <div className="game-home-feature-chips" aria-label="Competiciones disponibles">
              <span>🏆 LaLiga 25/26</span>
              <span>🏵️ Copa del Rey</span>
              <span>🔥 Modo carrera</span>
            </div>
          </div>

          <div className="game-home-control-panel">
            <section className="game-home-difficulty-card" aria-label="Seleccionar dificultad">
              <div className="game-home-difficulty-header">
                <strong>Dificultad</strong>
                <span>{selectedDifficulty?.label ?? "Normal"}</span>
              </div>

              <div className="game-home-difficulty-options" role="group" aria-label="Opciones de dificultad">
                {DIFFICULTY_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={difficulty === option.id ? "difficulty-option-active" : ""}
                    aria-pressed={difficulty === option.id}
                    onClick={() => onDifficultyChange(option.id)}
                  >
                    <strong>{option.label}</strong>
                    <small>{option.description}</small>
                  </button>
                ))}
              </div>

              {selectedDifficulty && (
                <p className="game-home-difficulty-copy">{selectedDifficulty.description}</p>
              )}

              {difficulty === "normal" && (
                <details className="game-home-season-range-card">
                  <summary>Rango de temporadas del modo fácil</summary>

                  <div className="game-home-season-range-options">
                    {EASY_MODE_SEASON_RANGES.map((range) => (
                      <button
                        key={range.id}
                        type="button"
                        className={easyModeSeasonRangeId === range.id ? "season-range-option-active" : ""}
                        aria-pressed={easyModeSeasonRangeId === range.id}
                        onClick={() => onEasyModeSeasonRangeChange(range.id)}
                      >
                        <strong>{range.label}</strong>
                        <small>{range.description}</small>
                      </button>
                    ))}
                  </div>
                </details>
              )}
            </section>

            <div className="game-home-actions" aria-label="Acciones principales">
              <button type="button" className="primary-home-button" onClick={onNewGame}>
                <span aria-hidden="true">▷</span>
                <span>Nueva partida</span>
              </button>

              <div className="game-home-secondary-actions">
                <button
                  type="button"
                  className="secondary-home-button"
                  onClick={onContinueGame}
                  disabled={!hasSavedGame}
                >
                  Continuar
                </button>

                <button
                  type="button"
                  className="career-home-button"
                  onClick={onCareerPreview}
                >
                  Modo carrera
                </button>
              </div>

              <button
                type="button"
                className="share-home-button"
                onClick={handleShareGame}
              >
                <span aria-hidden="true">⌘</span>
                <span>Compartir juego</span>
              </button>
            </div>

            {shareStatus && (
              <p className="share-home-message" role="status">{shareStatus}</p>
            )}
          </div>
        </div>

        <details className="how-to-play-card">
          <summary>¿Cómo se juega?</summary>

          <div className="how-to-play-steps">
            <article><strong>1</strong><span>Elige formación</span><p>Decide si quieres atacar, controlar o defender mejor.</p></article>
            <article><strong>2</strong><span>Salen temporadas aleatorias</span><p>En Modo Fácil puedes limitar el draft a una época concreta del Athletic.</p></article>
            <article><strong>3</strong><span>Elige jugadores reales</span><p>Cada jugador solo puede usarse una vez y debe jugar en posición válida.</p></article>
            <article><strong>4</strong><span>Elige entrenador</span><p>El técnico aporta ataque, defensa, gestión y mentalidad.</p></article>
            <article><strong>5</strong><span>Simula temporada</span><p>Tu Athletic histórico juega LaLiga 25/26 y una Copa del Rey con factor sorpresa.</p></article>
          </div>
        </details>

        <SupportButton variant="home" />

        <footer className="game-home-footer">
          <span>{APP_VERSION}: {APP_VERSION_NAME}</span>
          <a href={FEEDBACK_URL} target="_blank" rel="noreferrer">Feedback ↗</a>
        </footer>
      </section>

      <section className="game-home-rules" aria-label="Reglas y objetivo">
        <div>
          <h3>Reglas clave</h3>
          <ul>
            <li>No puedes repetir jugador.</li>
            <li>No puedes poner jugadores fuera de posición.</li>
            <li>Cada formación cambia el estilo del equipo.</li>
            <li>El Athletic histórico sustituye al Athletic real 25/26.</li>
          </ul>
        </div>

        <div>
          <h3>Objetivo</h3>
          <p>
            Crear un once capaz de pelear la Liga, sobrevivir a la Copa y dejar una
            temporada legendaria en San Mamés.
          </p>
        </div>
      </section>
    </main>
  );
}

export default GameHome;
