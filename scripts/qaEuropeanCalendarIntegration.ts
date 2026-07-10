import { readFileSync } from "node:fs";
import { join } from "node:path";

import { getEuropeanMatchdaySlots, shouldPlayEuropeanMatchAtLeagueMatchday } from "../src/europe/europeanCalendar";
import {
  appendEuropeanQualification,
  createEmptyEuropeanCareerState,
  normalizeEuropeanCareerState,
  setEuropeanCurrentTournament,
} from "../src/europe/europeanCareerState";
import {
  applyEuropeanMatchResult,
  createEuropeanTournamentForQualification,
  getNextEuropeanMatch,
} from "../src/europe/europeanTournament";
import type { EuropeanSeasonEntry } from "../src/europe/europeanTypes";

const ROOT = process.cwd();

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function logOk(message: string): void {
  console.log(`✓ ${message}`);
}

function readText(path: string): string {
  return readFileSync(join(ROOT, path), "utf8");
}

function buildQualification(overrides: Partial<EuropeanSeasonEntry> = {}): EuropeanSeasonEntry {
  return {
    seasonNumber: 0,
    qualified: true,
    competition: "champions_league",
    source: "league_position",
    explanation: "QA",
    ...overrides,
  };
}

function testNoQualificationMeansNoTournamentOrEvent(): void {
  const state = createEmptyEuropeanCareerState();

  assert(state.currentTournament === null, "Sin clasificación no debe haber torneo por defecto.");

  const tournament = createEuropeanTournamentForQualification({
    seasonNumber: 1,
    qualification: state.currentQualification,
  });

  assert(tournament === null, "Sin clasificación no debe crearse torneo.");

  const pendingMatch = shouldPlayEuropeanMatchAtLeagueMatchday(state.currentTournament, 4);
  assert(pendingMatch === null, "Sin torneo no debe haber evento europeo pendiente en ninguna jornada.");

  logOk("Sin clasificación europea no hay torneo ni eventos europeos");
}

function testChampionsQualificationCreatesTournamentForNextSeason(): void {
  let careerState = createEmptyEuropeanCareerState();
  careerState = appendEuropeanQualification(careerState, buildQualification({ seasonNumber: 0, competition: "champions_league" }));

  // Simula lo que hace App.tsx en handleContinueCareerAfterSeason: crear el
  // torneo de la temporada siguiente (seasonNumber = 1) a partir de la
  // clasificación de la temporada anterior (seasonNumber = 0).
  const nextSeasonNumber = 1;
  const tournament = createEuropeanTournamentForQualification({
    seasonNumber: nextSeasonNumber,
    qualification: careerState.currentQualification,
    seed: "qa-calendar-champions",
  });

  assert(tournament !== null, "Con clasificación Champions debe crearse torneo la temporada siguiente.");
  assert(tournament.seasonNumber === nextSeasonNumber, "El torneo debe pertenecer a la temporada siguiente.");
  assert(tournament.competition === "champions_league", "El torneo debe ser de Champions League.");

  careerState = setEuropeanCurrentTournament(careerState, tournament);
  assert(careerState.currentTournament?.seasonNumber === nextSeasonNumber, "El torneo debe quedar guardado en europeanCareer.");

  logOk("Con clasificación a Champions se crea el torneo en la temporada siguiente");
}

function testTournamentDoesNotDuplicateOnNormalizeOrReload(): void {
  let careerState = createEmptyEuropeanCareerState();
  careerState = appendEuropeanQualification(careerState, buildQualification({ seasonNumber: 0, competition: "europa_league" }));

  const tournament = createEuropeanTournamentForQualification({
    seasonNumber: 1,
    qualification: careerState.currentQualification,
    seed: "qa-no-duplicate-tournament",
  });

  careerState = setEuropeanCurrentTournament(careerState, tournament);

  // Simula guardar/cargar (serialización JSON) y volver a normalizar, como
  // hace App.tsx al iniciar con `normalizeEuropeanCareerState(savedGame?.europeanCareer)`.
  const reloaded = normalizeEuropeanCareerState(JSON.parse(JSON.stringify(careerState)));

  assert(reloaded.currentTournament !== null, "El torneo debe seguir presente tras recargar.");
  assert(reloaded.currentTournament?.matches.length === tournament?.matches.length, "El número de partidos no debe cambiar al recargar.");

  // Reintentar "crear" el torneo para la misma temporada no debe generar uno
  // nuevo si App.tsx respeta la guarda `alreadyHasTournamentForNextSeason`.
  const alreadyHasTournamentForSeason = reloaded.currentTournament?.seasonNumber === 1;
  assert(alreadyHasTournamentForSeason, "La guarda de App.tsx debe poder detectar que ya existe torneo para esa temporada.");

  logOk("El torneo europeo no se duplica al normalizar/recargar la partida");
}

function testSixLeaguePhaseMatchesHaveMatchdayAssigned(): void {
  const tournament = createEuropeanTournamentForQualification({
    seasonNumber: 2,
    qualification: buildQualification({ competition: "conference_league" }),
    seed: "qa-matchday-assigned",
  });

  assert(tournament !== null, "Debe crear torneo.");

  const slots = getEuropeanMatchdaySlots(38);
  assert(slots.leaguePhase.length === 6, "Debe haber 6 jornadas objetivo de fase inicial.");

  for (const match of tournament.matches) {
    assert(Number.isInteger(match.matchday) && match.matchday > 0, `El partido ${match.id} debe tener matchday asignado.`);
  }

  const matchdays = tournament.matches.map((match) => match.matchday);
  assert(new Set(matchdays).size === matchdays.length, "Las jornadas de los 6 partidos deben ser distintas.");

  logOk("Los 6 partidos de fase inicial tienen matchday asignado y distinto");
}

function testGetNextEuropeanMatchRespectsMatchday(): void {
  const tournament = createEuropeanTournamentForQualification({
    seasonNumber: 3,
    qualification: buildQualification({ competition: "champions_league" }),
    seed: "qa-next-match-respects-matchday",
  });

  assert(tournament !== null, "Debe crear torneo.");

  const firstMatch = getNextEuropeanMatch(tournament);
  assert(firstMatch !== null, "Debe existir un primer partido pendiente.");

  const dueAtItsOwnMatchday = shouldPlayEuropeanMatchAtLeagueMatchday(tournament, firstMatch.matchday);
  assert(dueAtItsOwnMatchday?.id === firstMatch.id, "El partido debe tocar exactamente en su propia jornada.");

  const notDueEarlier = shouldPlayEuropeanMatchAtLeagueMatchday(tournament, firstMatch.matchday - 1);
  assert(notDueEarlier === null, "El partido no debe tocar antes de su jornada.");

  logOk("getNextEuropeanMatch/shouldPlayEuropeanMatchAtLeagueMatchday respetan la jornada asignada");
}

function testEuropeCountsAsEventForFastSimulation(): void {
  const source = readText("src/components/LeagueSimulatorView.tsx");

  assert(source.includes("shouldPlayEuropeanMatchAtLeagueMatchday"), "LeagueSimulatorView debe usar shouldPlayEuropeanMatchAtLeagueMatchday.");
  assert(
    source.includes("!shouldPlayEuropeanMatchAtLeagueMatchday(europeanTournament, getLeagueMatchesPlayed(nextContext) + 1)"),
    "'Saltar hasta próximo evento' debe detenerse en un partido europeo pendiente.",
  );
  assert(
    source.includes("getPendingCupFixture(context) || pendingEuropeanMatch"),
    "La simulación automática debe pararse si hay un partido europeo pendiente.",
  );

  logOk("Europa cuenta como evento para la simulación rápida y la automática");
}

function testLuckWheelIsNotRemovedOrOverridden(): void {
  const source = readText("src/components/LeagueSimulatorView.tsx");

  assert(source.includes("SeasonLuckWheelModal"), "La Ruleta de la Suerte debe seguir integrada en LeagueSimulatorView.");
  assert(source.includes("maybeOfferSeasonLuckWheel"), "La lógica de oferta de ruleta debe seguir presente.");
  assert(source.includes("pendingWheelOffer"), "El estado de oferta pendiente de ruleta no debe eliminarse.");

  logOk("La Ruleta de la Suerte no se elimina ni se pisa con la integración europea");
}

function testSimulatingEuropeanMatchUpdatesTournament(): void {
  const tournament = createEuropeanTournamentForQualification({
    seasonNumber: 4,
    qualification: buildQualification({ competition: "conference_league" }),
    seed: "qa-simulate-updates",
  });

  assert(tournament !== null, "Debe crear torneo.");

  const nextMatch = getNextEuropeanMatch(tournament);
  assert(nextMatch !== null, "Debe haber partido pendiente.");

  const updated = applyEuropeanMatchResult(tournament, nextMatch.id, { userGoals: 2, opponentGoals: 0, result: "win" });

  assert(updated.matches.find((match) => match.id === nextMatch.id)?.status === "played", "El partido debe quedar jugado.");
  assert(updated.leaguePhasePlayed === 1, "El torneo debe reflejar el partido jugado.");
  assert(updated !== tournament, "applyEuropeanMatchResult debe devolver un nuevo estado (inmutabilidad).");

  const source = readText("src/components/LeagueSimulatorView.tsx");
  assert(source.includes("handleSimulateEuropeanMatch"), "LeagueSimulatorView debe tener un manejador para simular el partido europeo.");
  assert(source.includes("onEuropeanTournamentChange?.(nextTournament)"), "Tras simular, LeagueSimulatorView debe notificar el nuevo estado del torneo.");

  logOk("Simular un partido europeo actualiza el torneo y se propaga al padre");
}

function testNoMoreEventsAfterElimination(): void {
  let tournament = createEuropeanTournamentForQualification({
    seasonNumber: 5,
    qualification: buildQualification({ competition: "champions_league" }),
    seed: "qa-no-events-after-elimination",
  });

  assert(tournament !== null, "Debe crear torneo.");

  for (let index = 0; index < 6; index += 1) {
    const nextMatch = getNextEuropeanMatch(tournament);
    assert(nextMatch !== null, "Debe haber partido pendiente.");
    tournament = applyEuropeanMatchResult(tournament, nextMatch.id, { userGoals: 0, opponentGoals: 3, result: "loss" });
  }

  assert(tournament.eliminated === true, "Tras 6 derrotas debe quedar eliminado.");
  assert(getNextEuropeanMatch(tournament) === null, "No debe haber más partidos pendientes tras eliminación.");

  for (let matchday = 1; matchday <= 38; matchday += 1) {
    const pending = shouldPlayEuropeanMatchAtLeagueMatchday(tournament, matchday);
    assert(pending === null, `No debe haber evento europeo pendiente en la jornada ${matchday} tras la eliminación.`);
  }

  logOk("Tras la eliminación no aparecen más eventos europeos en ninguna jornada");
}

function testNoDuplicateEventsAfterTournamentCompleted(): void {
  let tournament = createEuropeanTournamentForQualification({
    seasonNumber: 6,
    qualification: buildQualification({ competition: "europa_league" }),
    seed: "qa-no-duplicate-after-completed",
  });

  assert(tournament !== null, "Debe crear torneo.");

  const leaguePhaseResults: Array<"win" | "draw" | "loss"> = ["win", "win", "win", "win", "win", "win"];
  for (const result of leaguePhaseResults) {
    const nextMatch = getNextEuropeanMatch(tournament);
    assert(nextMatch !== null, "Debe haber partido pendiente.");
    tournament = applyEuropeanMatchResult(tournament, nextMatch.id, { userGoals: 2, opponentGoals: 0, result });
  }

  const semifinalMatch = getNextEuropeanMatch(tournament);
  assert(semifinalMatch !== null, "Debe existir semifinal pendiente.");
  tournament = applyEuropeanMatchResult(tournament, semifinalMatch.id, { userGoals: 1, opponentGoals: 0, result: "win" });

  const finalMatch = getNextEuropeanMatch(tournament);
  assert(finalMatch !== null, "Debe existir final pendiente.");
  tournament = applyEuropeanMatchResult(tournament, finalMatch.id, { userGoals: 2, opponentGoals: 1, result: "win" });

  assert(tournament.completed === true, "El torneo debe quedar completado tras la final.");
  assert(tournament.champion === true, "Ganar la final debe marcar champion=true (interno, sin tocar palmarés).");
  assert(getNextEuropeanMatch(tournament) === null, "No debe haber más partidos pendientes tras completar el torneo.");

  const totalMatchesAfterCompletion = tournament.matches.length;
  // Reaplicar sobre el partido de la final ya jugado no debe duplicar nada.
  tournament = applyEuropeanMatchResult(tournament, finalMatch.id, { userGoals: 9, opponentGoals: 9, result: "loss" });
  assert(tournament.matches.length === totalMatchesAfterCompletion, "No debe duplicarse ningún partido tras completar el torneo.");
  assert(tournament.champion === true, "El resultado de la final ya jugada no debe sobrescribirse.");

  logOk("Tras completar el torneo no aparecen eventos ni partidos duplicados");
}

function testLocalGameStorageNormalizesCurrentTournament(): void {
  const source = readText("src/storage/localGameStorage.ts");

  assert(source.includes("europeanCareer?: EuropeanCareerState"), "SavedGameState debe tener el campo opcional europeanCareer.");
  assert(source.includes("EuropeanCareerState"), "localGameStorage.ts debe tipar europeanCareer con EuropeanCareerState (que ya incluye currentTournament).");

  // Comprobación funcional: un save antiguo sin europeanCareer, o con
  // europeanCareer sin currentTournament, debe normalizar a null sin lanzar.
  const legacySave = { currentQualification: null, history: [], bestCompetition: null, totalQualifications: 0 } as const;
  const normalized = normalizeEuropeanCareerState(legacySave);
  assert(normalized.currentTournament === null, "Un save sin currentTournament debe normalizar a null.");

  const undefinedSave = normalizeEuropeanCareerState(undefined);
  assert(undefinedSave.currentTournament === null, "Un save totalmente antiguo (sin europeanCareer) debe normalizar a torneo null.");

  logOk("localGameStorage/normalizeEuropeanCareerState normalizan currentTournament de partidas antiguas");
}

console.log("QA European Calendar Integration");

testNoQualificationMeansNoTournamentOrEvent();
testChampionsQualificationCreatesTournamentForNextSeason();
testTournamentDoesNotDuplicateOnNormalizeOrReload();
testSixLeaguePhaseMatchesHaveMatchdayAssigned();
testGetNextEuropeanMatchRespectsMatchday();
testEuropeCountsAsEventForFastSimulation();
testLuckWheelIsNotRemovedOrOverridden();
testSimulatingEuropeanMatchUpdatesTournament();
testNoMoreEventsAfterElimination();
testNoDuplicateEventsAfterTournamentCompleted();
testLocalGameStorageNormalizesCurrentTournament();

console.log("QA european calendar integration OK");
