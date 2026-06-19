import type { SeasonId } from "../types/game";
import { ATHLETIC_HISTORICAL_SEASON_CATALOG } from "./athleticSeasons";

export type EasyModeSeasonRangeId =
  | "all"
  | "classic"
  | "transition"
  | "modern"
  | "recent";

export interface EasyModeSeasonRange {
  id: EasyModeSeasonRangeId;
  label: string;
  description: string;
  from: number;
  to: number;
}

export const DEFAULT_EASY_MODE_SEASON_RANGE_ID: EasyModeSeasonRangeId = "all";

export const EASY_MODE_SEASON_RANGES: EasyModeSeasonRange[] = [
  {
    id: "all",
    label: "Todas las temporadas",
    description: "1928/29–2025/26. Experiencia histórica completa.",
    from: 1928,
    to: 2025,
  },
  {
    id: "classic",
    label: "Athletic clásico",
    description: "1928/29–1959/60. Primeras décadas y posguerra.",
    from: 1928,
    to: 1959,
  },
  {
    id: "transition",
    label: "Athletic de transición",
    description: "1960/61–1989/90. Barro, oficio y generaciones históricas.",
    from: 1960,
    to: 1989,
  },
  {
    id: "modern",
    label: "Athletic moderno",
    description: "1990/91–2009/10. Etapa reconocible antes del ciclo reciente.",
    from: 1990,
    to: 2009,
  },
  {
    id: "recent",
    label: "Athletic reciente",
    description: "2010/11–2025/26. Jugadores más cercanos para empezar fácil.",
    from: 2010,
    to: 2025,
  },
];

export function getEasyModeSeasonRangeById(
  rangeId: EasyModeSeasonRangeId
): EasyModeSeasonRange {
  return (
    EASY_MODE_SEASON_RANGES.find((range) => range.id === rangeId) ??
    EASY_MODE_SEASON_RANGES[0]
  );
}

export function getAthleticSeasonsForEasyModeRange(
  rangeId: EasyModeSeasonRangeId
): SeasonId[] {
  const range = getEasyModeSeasonRangeById(rangeId);

  return ATHLETIC_HISTORICAL_SEASON_CATALOG
    .filter((item) => item.status === "playable")
    .filter((item) => item.startYear >= range.from && item.startYear <= range.to)
    .map((item) => item.season);
}
