// src/components/GameHome.tsx

import type { EasyModeSeasonRangeId, GameDifficulty } from "../types/game";
import { EASY_MODE_SEASON_RANGES } from "../data/easyModeSeasonRanges";
import { APP_STATUS, APP_VERSION, APP_VERSION_NAME } from "../config/appVersion";

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
    description: "Antes Modo Difícil. Madrid, Barça y Atlético aprietan de verdad.",
  },
];

export function GameHome({
  hasSavedGame,
  difficulty,
  onDifficultyChange,
  easyModeSeasonRangeId,
  onEasyModeSeasonRangeChange,
  onNewGame,
  onContinueGame,
}: GameHomeProps) {
  return (
    <main className="game-home">
      <section className="game-home-hero">
        <div className="game-home-badge">⚪🔴 {APP_STATUS} · {APP_VERSION}</div>

        <h1>Once histórico Zurigorri</h1>

        <p className="game-home-subtitle">
          Construye un once histórico del Athletic con jugadores de distintas épocas
          y ponlo a competir en LaLiga 25/26 y la Copa del Rey.
        </p>

        <div className="game-home-version-card" aria-label="Estado de la versión">
          <strong>{APP_VERSION}</strong>
          <span>{APP_VERSION_NAME}</span>
          <small>Liga, Copa y UX final validadas. Esta versión está lista para prueba externa local.</small>
        </div>

        <section className="game-home-difficulty-card" aria-label="Seleccionar dificultad">
          <div className="game-home-difficulty-header">
            <strong>Dificultad</strong>
            <span>
              {difficulty === "normal"
                ? "Fácil"
                : difficulty === "leyenda"
                  ? "Leyenda"
                  : "Normal"}
            </span>
          </div>

          <div className="game-home-difficulty-options">
            {DIFFICULTY_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                className={difficulty === option.id ? "difficulty-option-active" : ""}
                onClick={() => onDifficultyChange(option.id)}
              >
                <strong>{option.label}</strong>
                <small>{option.description}</small>
              </button>
            ))}
          </div>

          {difficulty === "normal" && (
            <section className="game-home-season-range-card" aria-label="Rango de temporadas del modo fácil">
              <div className="game-home-season-range-header">
                <strong>Rango de temporadas</strong>
                <span>Solo afecta al Modo Fácil</span>
              </div>

              <div className="game-home-season-range-options">
                {EASY_MODE_SEASON_RANGES.map((range) => (
                  <button
                    key={range.id}
                    type="button"
                    className={easyModeSeasonRangeId === range.id ? "season-range-option-active" : ""}
                    onClick={() => onEasyModeSeasonRangeChange(range.id)}
                  >
                    <strong>{range.label}</strong>
                    <small>{range.description}</small>
                  </button>
                ))}
              </div>
            </section>
          )}
        </section>

        <div className="game-home-actions">
          <button type="button" className="primary-home-button" onClick={onNewGame}>
            Nueva partida
          </button>

          <button
            type="button"
            className="secondary-home-button"
            onClick={onContinueGame}
            disabled={!hasSavedGame}
          >
            Continuar partida
          </button>
        </div>

        {!hasSavedGame && (
          <p className="no-save-message">
            Todavía no hay una partida guardada en este navegador.
          </p>
        )}
      </section>

      <section className="how-to-play-card">
        <h2>Cómo se juega</h2>

        <div className="how-to-play-steps">
          <article><strong>1</strong><span>Elige formación</span><p>Decide si quieres atacar, controlar o defender mejor.</p></article>
          <article><strong>2</strong><span>Salen temporadas aleatorias</span><p>En Modo Fácil puedes limitar el draft a una época concreta del Athletic.</p></article>
          <article><strong>3</strong><span>Elige jugadores reales</span><p>Cada jugador solo puede usarse una vez y debe jugar en posición válida.</p></article>
          <article><strong>4</strong><span>Elige entrenador</span><p>El técnico aporta ataque, defensa, gestión y mentalidad.</p></article>
          <article><strong>5</strong><span>Simula temporada</span><p>Tu Athletic histórico juega LaLiga 25/26 y una Copa del Rey con factor sorpresa.</p></article>
        </div>
      </section>

      <section className="game-home-rules">
        <div>
          <h3>Reglas clave</h3>
          <ul>
            <li>No puedes repetir jugador.</li>
            <li>No puedes poner jugadores fuera de posición.</li>
            <li>Cada formación cambia el estilo del equipo.</li>
            <li>El Athletic histórico sustituye al Athletic real 25/26.</li>
            <li>La Liga y la Copa están balanceadas como base jugable cerrada.</li>
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
      <section className="game-home-beta-card" aria-label="Guía de beta online">
        <div>
          <h3>Estado de beta online</h3>
          <p>Versión pública de prueba: histórico completo, draft, Liga, Copa, simulación y pantalla final aceptadas.</p>
        </div>
        <div>
          <h3>Feedback</h3>
          <p>Juega una partida completa y dime dónde te pierdes, qué texto no entiendes y si repetirías otra temporada.</p>
        </div>
      </section>

      <details className="game-home-tester-card" aria-label="Guía rápida de beta">
        <summary className="game-home-tester-summary">
          <span aria-hidden="true">🧪</span>
          <div>
            <h3>Guía rápida de beta</h3>
            <p>Abre este bloque si quieres comprobar el flujo completo de una partida.</p>
          </div>
          <strong>Ver guía</strong>
        </summary>
        <ol>
          <li>Elige dificultad y, si usas Modo Fácil, prueba un rango de temporadas.</li>
          <li>Completa el draft sin ayuda y revisa si las posiciones se entienden.</li>
          <li>Simula la temporada usando solo los botones visibles.</li>
          <li>Lee el resultado final y confirma si entiendes Liga, Copa y rendimiento del once.</li>
          <li>Anota tres cosas: bug, parte confusa y mejora que más te gustaría ver.</li>
        </ol>
      </details>

      <SupportButton variant="home" />
    </main>
  );
}

export default GameHome;
