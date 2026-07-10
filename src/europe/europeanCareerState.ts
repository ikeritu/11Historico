// src/europe/europeanCareerState.ts
//
// Europa Career Foundation (v0.24.0c) — persistencia del estado europeo dentro
// de la carrera. No simula partidos europeos: solo guarda qué clasificación se
// obtuvo cada temporada para que fases futuras puedan reutilizarla.

import { compareEuropeanQualificationPriority } from "./europeanQualification";
import type {
  EuropeanCareerState,
  EuropeanCompetition,
  EuropeanSeasonEntry,
} from "./europeanTypes";

export function createEmptyEuropeanCareerState(): EuropeanCareerState {
  return {
    currentQualification: null,
    history: [],
    bestCompetition: null,
    totalQualifications: 0,
  };
}

/**
 * Normaliza un estado europeo potencialmente ausente o incompleto (partidas
 * antiguas guardadas antes de v0.24.0c) a una forma segura y completa.
 */
export function normalizeEuropeanCareerState(
  state: Partial<EuropeanCareerState> | null | undefined,
): EuropeanCareerState {
  if (!state) return createEmptyEuropeanCareerState();

  const history = Array.isArray(state.history) ? state.history : [];

  return {
    currentQualification: state.currentQualification ?? null,
    history,
    bestCompetition: state.bestCompetition ?? null,
    totalQualifications: Number.isFinite(state.totalQualifications)
      ? Number(state.totalQualifications)
      : history.filter((entry) => entry.qualified).length,
  };
}

/**
 * Añade la clasificación europea de una temporada al histórico. Si ya existe
 * una entrada para el mismo `seasonNumber` (por ejemplo por un doble render),
 * la sustituye en lugar de duplicarla.
 */
export function appendEuropeanQualification(
  state: EuropeanCareerState | null | undefined,
  entry: EuropeanSeasonEntry,
): EuropeanCareerState {
  const current = normalizeEuropeanCareerState(state);
  const historyWithoutSameSeason = current.history.filter(
    (existing) => existing.seasonNumber !== entry.seasonNumber,
  );
  const nextHistory = [...historyWithoutSameSeason, entry];

  const bestCompetition = nextHistory.reduce<EuropeanCompetition | null>((best, item) => {
    if (!item.competition) return best;
    return compareEuropeanQualificationPriority(item.competition, best) > 0 ? item.competition : best;
  }, current.bestCompetition ?? null);

  return {
    currentQualification: entry,
    history: nextHistory,
    bestCompetition,
    totalQualifications: nextHistory.filter((item) => item.qualified).length,
  };
}

export function getLatestEuropeanQualification(
  state: EuropeanCareerState | null | undefined,
): EuropeanSeasonEntry | null {
  return state?.currentQualification ?? null;
}
