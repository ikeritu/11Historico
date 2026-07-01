import { APP_VERSION } from "../config/appVersion";
import { calculatePalmaresScore } from "./careerRules";
import type { CareerLocalRankingEntry, CareerSeasonResult, CareerTrophyCounts } from "../types/career";

export const CAREER_LOCAL_RANKING_LIMIT = 100;

export function createEmptyCareerRankingTrophyCounts(): CareerTrophyCounts {
  return {
    champions: 0,
    liga: 0,
    europaLeague: 0,
    copa: 0,
    conference: 0,
    supercopa: 0,
  };
}

export function getFinalCareerTrophyCounts(
  trophyCounts: CareerTrophyCounts | undefined,
  seasonResult: CareerSeasonResult,
): CareerTrophyCounts {
  const base = trophyCounts ?? createEmptyCareerRankingTrophyCounts();

  return {
    ...base,
    liga: base.liga + (seasonResult.wonLeague ? 1 : 0),
    copa: base.copa + (seasonResult.wonCopa ? 1 : 0),
    supercopa: base.supercopa + (seasonResult.wonSupercopa ? 1 : 0),
  };
}

export function calculateCareerArcadeScore(params: {
  completedSeasons: number;
  trophyCounts: CareerTrophyCounts;
}): { arcadeScore: number; palmaresScore: number; survivalScore: number } {
  const palmaresScore = calculatePalmaresScore(params.trophyCounts);
  const survivalScore = Math.max(0, params.completedSeasons) * 10;

  return {
    arcadeScore: survivalScore + palmaresScore,
    palmaresScore,
    survivalScore,
  };
}

export function getBestCareerLeaguePosition(
  previousBestPosition: number | undefined,
  nextPosition: number,
): number {
  if (!Number.isFinite(nextPosition) || nextPosition <= 0) {
    return previousBestPosition ?? 20;
  }

  if (!previousBestPosition || previousBestPosition <= 0) {
    return nextPosition;
  }

  return Math.min(previousBestPosition, nextPosition);
}

export function formatCareerRangeLabel(params: {
  lastSeasonLabel: string;
  completedSeasons: number;
}): string {
  const match = /^(\d{4})\/(\d{2})$/.exec(params.lastSeasonLabel);
  const seasonsBefore = Math.max(0, Math.floor(params.completedSeasons));

  if (!match || seasonsBefore === 0) return params.lastSeasonLabel;

  const firstStartYear = Number(match[1]) - seasonsBefore;
  const firstEndYear = String((firstStartYear + 1) % 100).padStart(2, "0");

  return `${firstStartYear}/${firstEndYear}–${params.lastSeasonLabel}`;
}

export function sortCareerLocalRanking(entries: CareerLocalRankingEntry[]): CareerLocalRankingEntry[] {
  return [...entries].sort((left, right) => {
    if (right.arcadeScore !== left.arcadeScore) return right.arcadeScore - left.arcadeScore;
    if (right.completedSeasons !== left.completedSeasons) return right.completedSeasons - left.completedSeasons;
    if (right.palmaresScore !== left.palmaresScore) return right.palmaresScore - left.palmaresScore;
    if (left.bestLeaguePosition !== right.bestLeaguePosition) return left.bestLeaguePosition - right.bestLeaguePosition;
    return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
  });
}

export function limitCareerLocalRanking(entries: CareerLocalRankingEntry[]): CareerLocalRankingEntry[] {
  return sortCareerLocalRanking(entries).slice(0, CAREER_LOCAL_RANKING_LIMIT);
}

export function buildCareerLocalRankingEntry(params: {
  completedSeasons: number;
  trophyCounts: CareerTrophyCounts | undefined;
  seasonResult: CareerSeasonResult;
  bestLeaguePosition?: number;
  gameVersion?: string;
  createdAt?: string;
}): CareerLocalRankingEntry {
  const createdAt = params.createdAt ?? new Date().toISOString();
  const finalTrophyCounts = getFinalCareerTrophyCounts(params.trophyCounts, params.seasonResult);
  const score = calculateCareerArcadeScore({
    completedSeasons: params.completedSeasons,
    trophyCounts: finalTrophyCounts,
  });
  const bestLeaguePosition = getBestCareerLeaguePosition(
    params.bestLeaguePosition,
    params.seasonResult.leaguePosition,
  );

  return {
    id: `career_${createdAt}_${Math.random().toString(16).slice(2)}`,
    completedSeasons: params.completedSeasons,
    arcadeScore: score.arcadeScore,
    palmaresScore: score.palmaresScore,
    survivalScore: score.survivalScore,
    trophyCounts: finalTrophyCounts,
    bestLeaguePosition,
    lastSeasonLabel: params.seasonResult.seasonLabel,
    lastLeaguePosition: params.seasonResult.leaguePosition,
    gameVersion: params.gameVersion ?? APP_VERSION,
    createdAt,
  };
}
