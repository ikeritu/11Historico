import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { CareerSeasonResult, CareerTrophyCounts } from "../src/types/career";
import type { EuropeanCompetition, EuropeanTournamentState } from "../src/europe/europeanTypes";
import {
  addEuropeanTrophyToCounts,
  awardEuropeanTrophyToCareer,
  getEuropeanCareerTrophyKey,
  hasPendingEuropeanTrophy,
} from "../src/career/europeanTrophies";
import { buildCareerLocalRankingEntry, getFinalCareerTrophyCounts } from "../src/career/careerRanking";

const ROOT = process.cwd();

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function logOk(message: string): void {
  console.log(`✓ ${message}`);
}

function emptyTrophies(): CareerTrophyCounts {
  return {
    champions: 0,
    liga: 0,
    europaLeague: 0,
    copa: 0,
    conference: 0,
    supercopa: 0,
  };
}

function createTournament(params: {
  competition: EuropeanCompetition;
  champion: boolean;
  completed?: boolean;
  europeanTrophyAwarded?: boolean;
}): EuropeanTournamentState {
  return {
    seasonNumber: 1,
    competition: params.competition,
    phase: params.completed === false ? "final" : "completed",
    matches: [],
    leaguePhasePoints: 12,
    leaguePhasePlayed: 6,
    wins: params.champion ? 7 : 6,
    draws: 0,
    losses: params.champion ? 0 : 1,
    goalsFor: 18,
    goalsAgainst: 6,
    qualifiedForSemifinal: true,
    eliminated: false,
    completed: params.completed ?? true,
    champion: params.champion,
    europeanTrophyAwarded: params.europeanTrophyAwarded,
    currentMatchId: null,
  };
}

function createSeasonResult(overrides: Partial<CareerSeasonResult> = {}): CareerSeasonResult {
  return {
    seasonLabel: "2026/27",
    leaguePosition: 8,
    wonLeague: false,
    wonCopa: false,
    wonSupercopa: false,
    isRelegated: false,
    europeanQualification: "none",
    ...overrides,
  };
}

function testCompetitionMapping(): void {
  assert(getEuropeanCareerTrophyKey("champions_league") === "champions", "Champions debe mapear a trophyCounts.champions.");
  assert(getEuropeanCareerTrophyKey("europa_league") === "europaLeague", "Europa League debe mapear a trophyCounts.europaLeague.");
  assert(getEuropeanCareerTrophyKey("conference_league") === "conference", "Conference debe mapear a trophyCounts.conference.");
  logOk("mapeo competición europea → palmarés");
}

function testOnlyChampionCompletedAddsTrophy(): void {
  const base = emptyTrophies();

  assert(!hasPendingEuropeanTrophy(createTournament({ competition: "champions_league", champion: false })), "Perder final no debe dejar trofeo pendiente.");
  assert(!hasPendingEuropeanTrophy(createTournament({ competition: "champions_league", champion: true, completed: false })), "Final no completada no debe sumar trofeo.");
  assert(hasPendingEuropeanTrophy(createTournament({ competition: "champions_league", champion: true })), "Campeón completado debe dejar trofeo pendiente.");

  const losingFinal = addEuropeanTrophyToCounts(base, createTournament({ competition: "europa_league", champion: false }));
  assert(losingFinal.europaLeague === 0, "Perder final de Europa League no debe sumar título.");

  const championsWinner = addEuropeanTrophyToCounts(base, createTournament({ competition: "champions_league", champion: true }));
  assert(championsWinner.champions === 1, "Ganar Champions debe sumar 1 Champions.");

  const europaWinner = addEuropeanTrophyToCounts(base, createTournament({ competition: "europa_league", champion: true }));
  assert(europaWinner.europaLeague === 1, "Ganar Europa League debe sumar 1 Europa League.");

  const conferenceWinner = addEuropeanTrophyToCounts(base, createTournament({ competition: "conference_league", champion: true }));
  assert(conferenceWinner.conference === 1, "Ganar Conference debe sumar 1 Conference.");

  logOk("solo el campeón europeo completado suma título");
}

function testAwardIsIdempotentWithAwardedFlag(): void {
  const base = emptyTrophies();
  const tournament = createTournament({ competition: "champions_league", champion: true });
  const awarded = awardEuropeanTrophyToCareer({ trophyCounts: base, tournament, awardedAt: "2026-09-22T00:00:00.000Z" });

  assert(awarded.awarded, "La primera integración debe marcar awarded=true.");
  assert(awarded.trophyCounts.champions === 1, "La primera integración debe sumar una Champions.");
  assert(awarded.tournament?.europeanTrophyAwarded === true, "El torneo debe quedar marcado como integrado.");

  const repeated = awardEuropeanTrophyToCareer({ trophyCounts: awarded.trophyCounts, tournament: awarded.tournament });
  assert(!repeated.awarded, "La segunda integración del mismo torneo no debe volver a sumar.");
  assert(repeated.trophyCounts.champions === 1, "La segunda integración no debe duplicar la Champions.");

  logOk("guardarraíl anti-duplicado por europeanTrophyAwarded");
}

function testRankingHelpersIncludeEuropeanTrophy(): void {
  const seasonResult = createSeasonResult({ wonCopa: true });
  const tournament = createTournament({ competition: "europa_league", champion: true });
  const finalCounts = getFinalCareerTrophyCounts(emptyTrophies(), seasonResult, tournament);

  assert(finalCounts.copa === 1, "El helper debe conservar títulos nacionales de temporada.");
  assert(finalCounts.europaLeague === 1, "El helper debe añadir título europeo ganado.");

  const rankingEntry = buildCareerLocalRankingEntry({
    completedSeasons: 2,
    trophyCounts: emptyTrophies(),
    seasonResult,
    europeanTournament: tournament,
    createdAt: "2026-09-22T00:00:00.000Z",
  });

  assert(rankingEntry.trophyCounts.copa === 1, "Ranking local debe incluir Copa final.");
  assert(rankingEntry.trophyCounts.europaLeague === 1, "Ranking local debe incluir Europa League final.");
  assert(rankingEntry.palmaresScore > 0, "Ranking local debe recalcular puntos de palmarés.");

  logOk("ranking helpers preparados para títulos europeos");
}

function testSourceGuardrails(): void {
  const app = readFileSync(join(ROOT, "src", "App.tsx"), "utf8");
  const globalRanking = readFileSync(join(ROOT, "src", "components", "CareerGlobalRanking.tsx"), "utf8");
  const luckWheel = readFileSync(join(ROOT, "src", "career", "seasonLuckWheel.ts"), "utf8");

  assert(!app.includes("CareerTrophyCounts as any"), "App no debe usar casts inseguros para palmarés.");
  assert(!globalRanking.includes("europeanTrophyAwarded"), "La fase no debe migrar ranking global todavía.");
  assert(!luckWheel.includes("europeanTrophyAwarded"), "La fase no debe tocar Ruleta de la Suerte.");

  logOk("guardarraíles de alcance: sin ranking global ni ruleta");
}

console.log("QA European Trophies + Palmarés");

testCompetitionMapping();
testOnlyChampionCompletedAddsTrophy();
testAwardIsIdempotentWithAwardedFlag();
testRankingHelpersIncludeEuropeanTrophy();
testSourceGuardrails();

console.log("QA european trophies palmares OK");
