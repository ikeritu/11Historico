import {
  buildCareerLocalRankingEntry,
  calculateCareerArcadeScore,
  getBestCareerLeaguePosition,
  getFinalCareerTrophyCounts,
  limitCareerLocalRanking,
  sortCareerLocalRanking,
} from "../src/career/careerRanking";
import type { CareerLocalRankingEntry, CareerSeasonResult, CareerTrophyCounts } from "../src/types/career";

function assert(condition: unknown, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

function createTrophyCounts(overrides: Partial<CareerTrophyCounts> = {}): CareerTrophyCounts {
  return {
    champions: 0,
    liga: 0,
    europaLeague: 0,
    copa: 0,
    conference: 0,
    supercopa: 0,
    ...overrides,
  };
}

function createSeasonResult(overrides: Partial<CareerSeasonResult> = {}): CareerSeasonResult {
  return {
    seasonLabel: "2027/28",
    leaguePosition: 12,
    wonLeague: false,
    wonCopa: false,
    wonSupercopa: false,
    isRelegated: false,
    europeanQualification: "none",
    ...overrides,
  };
}

function createRankingEntry(overrides: Partial<CareerLocalRankingEntry> = {}): CareerLocalRankingEntry {
  return {
    id: overrides.id ?? `entry_${Math.random().toString(16).slice(2)}`,
    completedSeasons: 0,
    arcadeScore: 0,
    palmaresScore: 0,
    survivalScore: 0,
    trophyCounts: createTrophyCounts(),
    bestLeaguePosition: 20,
    lastSeasonLabel: "2025/26",
    lastLeaguePosition: 20,
    gameVersion: "test",
    createdAt: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

function testFinalTrophiesIncludeGameOverSeason(): void {
  const finalTrophies = getFinalCareerTrophyCounts(
    createTrophyCounts({ liga: 1, copa: 2, supercopa: 1 }),
    createSeasonResult({ wonLeague: true, wonCopa: true, wonSupercopa: true }),
  );

  assert(finalTrophies.liga === 2, "Game Over debe sumar Liga vigente al palmarés final.");
  assert(finalTrophies.copa === 3, "Game Over debe sumar Copa vigente al palmarés final.");
  assert(finalTrophies.supercopa === 2, "Game Over debe sumar Supercopa vigente al palmarés final.");
}

function testArcadeScoreFormula(): void {
  const score = calculateCareerArcadeScore({
    completedSeasons: 4,
    trophyCounts: createTrophyCounts({ liga: 1, copa: 1, supercopa: 1 }),
  });

  assert(score.survivalScore === 40, "Puntuación de supervivencia debe ser temporadas superadas x10.");
  assert(score.arcadeScore === score.survivalScore + score.palmaresScore, "Puntos arcade debe sumar supervivencia + palmarés.");
}

function testBuildEntryStoresRequiredFields(): void {
  const entry = buildCareerLocalRankingEntry({
    completedSeasons: 2,
    trophyCounts: createTrophyCounts({ copa: 1 }),
    seasonResult: createSeasonResult({ seasonLabel: "2028/29", leaguePosition: 16, wonCopa: true }),
    bestLeaguePosition: 5,
    gameVersion: "v-test",
    createdAt: "2026-07-01T12:00:00.000Z",
  });

  assert(entry.completedSeasons === 2, "Debe guardar temporadas superadas.");
  assert(entry.trophyCounts.copa === 2, "Debe guardar palmarés final acumulado.");
  assert(entry.bestLeaguePosition === 5, "Debe guardar mejor posición histórica de la carrera.");
  assert(entry.lastSeasonLabel === "2028/29", "Debe guardar última temporada.");
  assert(entry.lastLeaguePosition === 16, "Debe guardar última posición liguera.");
  assert(entry.gameVersion === "v-test", "Debe guardar versión de juego.");
  assert(entry.createdAt === "2026-07-01T12:00:00.000Z", "Debe guardar fecha ISO.");
}

function testBestLeaguePosition(): void {
  assert(getBestCareerLeaguePosition(undefined, 8) === 8, "Primera posición debe iniciar mejor posición.");
  assert(getBestCareerLeaguePosition(4, 11) === 4, "Una peor posición no debe empeorar la mejor posición.");
  assert(getBestCareerLeaguePosition(9, 2) === 2, "Una mejor posición debe actualizar la mejor posición.");
}

function testSortOrder(): void {
  const sorted = sortCareerLocalRanking([
    createRankingEntry({ id: "low", arcadeScore: 30, completedSeasons: 5, palmaresScore: 20 }),
    createRankingEntry({ id: "points", arcadeScore: 90, completedSeasons: 1, palmaresScore: 0 }),
    createRankingEntry({ id: "seasons", arcadeScore: 70, completedSeasons: 7, palmaresScore: 0 }),
    createRankingEntry({ id: "palmares", arcadeScore: 70, completedSeasons: 7, palmaresScore: 10 }),
  ]);

  assert(sorted[0].id === "points", "Ranking debe ordenar primero por puntos arcade.");
  assert(sorted[1].id === "palmares", "Empate en puntos y temporadas debe ordenar por palmarés.");
  assert(sorted[2].id === "seasons", "Tras palmarés debe quedar el empate inferior.");
}

function testRankingLimit(): void {
  const entries = Array.from({ length: 105 }, (_, index) => createRankingEntry({
    id: `entry_${index}`,
    arcadeScore: index,
    completedSeasons: index,
  }));

  const limited = limitCareerLocalRanking(entries);

  assert(limited.length === 100, "Ranking local debe guardar como máximo Top 100.");
  assert(limited[0].arcadeScore === 104, "Top 100 debe conservar primero la mejor puntuación.");
  assert(limited[99].arcadeScore === 5, "Top 100 debe descartar las 5 peores carreras.");
}

const tests = [
  ["Game Over suma títulos vigentes", testFinalTrophiesIncludeGameOverSeason],
  ["Fórmula de puntos arcade", testArcadeScoreFormula],
  ["Entrada guarda campos requeridos", testBuildEntryStoresRequiredFields],
  ["Mejor posición de carrera", testBestLeaguePosition],
  ["Orden ranking local", testSortOrder],
  ["Límite Top 100", testRankingLimit],
] as const;

for (const [label, test] of tests) {
  test();
  console.log(`✓ ${label}`);
}

console.log("QA local ranking OK");
