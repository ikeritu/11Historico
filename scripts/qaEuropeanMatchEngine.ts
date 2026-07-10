import { readFileSync } from "node:fs";
import { join } from "node:path";
import { simulateEuropeanMatch } from "../src/europe/europeanMatchEngine";
import type { EuropeanCompetition } from "../src/europe/europeanTypes";

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

function testFunctionExists(): void {
  assert(typeof simulateEuropeanMatch === "function", "simulateEuropeanMatch debe existir como función.");
  logOk("simulateEuropeanMatch existe");
}

function testResultShapeIsAlwaysValid(): void {
  const competitions: EuropeanCompetition[] = ["champions_league", "europa_league", "conference_league"];

  for (const competition of competitions) {
    for (let sample = 0; sample < 8; sample += 1) {
      const output = simulateEuropeanMatch({
        userTeamRating: 80,
        opponentRating: 80,
        isHome: sample % 2 === 0,
        competition,
        seed: `qa-shape-${competition}-${sample}`,
      });

      assert(
        output.result === "win" || output.result === "draw" || output.result === "loss",
        `El resultado debe ser win/draw/loss, obtenido ${output.result}.`,
      );
      assert(Number.isInteger(output.userGoals) && output.userGoals >= 0, "userGoals debe ser un entero >= 0.");
      assert(Number.isInteger(output.opponentGoals) && output.opponentGoals >= 0, "opponentGoals debe ser un entero >= 0.");
    }
  }

  logOk("El resultado siempre es win/draw/loss con goles enteros válidos");
}

function countWins(params: { userTeamRating: number; opponentRating: number; competition: EuropeanCompetition; isHome: boolean; samples: number; seedPrefix: string }): number {
  let wins = 0;

  for (let index = 0; index < params.samples; index += 1) {
    const output = simulateEuropeanMatch({
      userTeamRating: params.userTeamRating,
      opponentRating: params.opponentRating,
      isHome: params.isHome,
      competition: params.competition,
      seed: `${params.seedPrefix}-${index}`,
    });

    if (output.result === "win") wins += 1;
  }

  return wins;
}

function testWeakerRivalGivesMoreWins(): void {
  const samples = 40;

  const vsWeakRival = countWins({
    userTeamRating: 88,
    opponentRating: 72,
    competition: "conference_league",
    isHome: true,
    samples,
    seedPrefix: "qa-weak-rival",
  });

  const vsStrongRival = countWins({
    userTeamRating: 88,
    opponentRating: 93,
    competition: "champions_league",
    isHome: true,
    samples,
    seedPrefix: "qa-strong-rival",
  });

  assert(
    vsWeakRival > vsStrongRival,
    `Contra un rival más débil debe haber más victorias (${vsWeakRival}) que contra un rival de Champions fuerte (${vsStrongRival}).`,
  );

  logOk(`Contra rival más débil hay más victorias en muestra repetida (${vsWeakRival}/${samples} vs ${vsStrongRival}/${samples})`);
}

function testChampionsFinalIsNotTrivial(): void {
  const samples = 40;
  const winsAgainstStrongChampionsRival = countWins({
    userTeamRating: 84,
    opponentRating: 92,
    competition: "champions_league",
    isHome: false,
    samples,
    seedPrefix: "qa-champions-hard",
  });

  assert(
    winsAgainstStrongChampionsRival < samples,
    "Contra un rival fuerte de Champions el resultado no debe ser una victoria trivial en el 100% de los casos.",
  );
  assert(
    winsAgainstStrongChampionsRival > 0,
    "Contra un rival fuerte de Champions también debe haber alguna victoria posible (no debe ser imposible).",
  );

  logOk(`Champions con rival fuerte no es trivial: ${winsAgainstStrongChampionsRival}/${samples} victorias`);
}

function testUserRatingInfluencesOutcome(): void {
  const samples = 40;

  const winsWithLowRating = countWins({
    userTeamRating: 65,
    opponentRating: 80,
    competition: "europa_league",
    isHome: true,
    samples,
    seedPrefix: "qa-user-rating-low",
  });

  const winsWithHighRating = countWins({
    userTeamRating: 95,
    opponentRating: 80,
    competition: "europa_league",
    isHome: true,
    samples,
    seedPrefix: "qa-user-rating-high",
  });

  assert(
    winsWithHighRating > winsWithLowRating,
    `Un rating de usuario más alto debe dar más victorias (${winsWithHighRating}) que uno bajo (${winsWithLowRating}).`,
  );

  logOk("El rating del usuario influye en el resultado");
}

function testOpponentRatingInfluencesOutcome(): void {
  const samples = 40;

  const winsVsWeakOpponent = countWins({
    userTeamRating: 84,
    opponentRating: 72,
    competition: "conference_league",
    isHome: true,
    samples,
    seedPrefix: "qa-opponent-rating-weak",
  });

  const winsVsStrongOpponent = countWins({
    userTeamRating: 84,
    opponentRating: 94,
    competition: "champions_league",
    isHome: true,
    samples,
    seedPrefix: "qa-opponent-rating-strong",
  });

  assert(
    winsVsWeakOpponent > winsVsStrongOpponent,
    `El rating del rival debe influir: contra un rival débil (${winsVsWeakOpponent}) debe haber más victorias que contra uno fuerte (${winsVsStrongOpponent}).`,
  );

  logOk("El rating del rival influye en el resultado");
}

function testHomeAdvantageInfluencesOutcome(): void {
  const samples = 60;

  const winsAsHome = countWins({
    userTeamRating: 84,
    opponentRating: 86,
    competition: "champions_league",
    isHome: true,
    samples,
    seedPrefix: "qa-home",
  });

  const winsAsAway = countWins({
    userTeamRating: 84,
    opponentRating: 86,
    competition: "champions_league",
    isHome: false,
    samples,
    seedPrefix: "qa-away",
  });

  assert(
    winsAsHome >= winsAsAway,
    `Jugar como local no debe dar peores resultados que como visitante (local ${winsAsHome} vs visitante ${winsAsAway}).`,
  );

  logOk(`Local/visitante influye en el resultado (local ${winsAsHome}/${samples} vs visitante ${winsAsAway}/${samples})`);
}

function testModuleDoesNotImportUiOrChangeMatchEngineBase(): void {
  const moduleSource = readText("src/europe/europeanMatchEngine.ts");

  assert(!moduleSource.includes("react"), "europeanMatchEngine.ts no debe importar módulos de UI/React.");
  assert(!moduleSource.includes("from \"../components"), "europeanMatchEngine.ts no debe importar componentes.");
  assert(moduleSource.includes("import { simulateMatch }"), "europeanMatchEngine.ts debe reutilizar simulateMatch del motor existente.");

  const matchEngineSource = readText("src/simulation/matchEngine.ts");
  assert(!matchEngineSource.includes("europe"), "matchEngine.ts no debe modificarse para depender de Europa.");

  logOk("El módulo europeo no importa UI y no toca matchEngine.ts base");
}

console.log("QA European Match Engine");

testFunctionExists();
testResultShapeIsAlwaysValid();
testWeakerRivalGivesMoreWins();
testChampionsFinalIsNotTrivial();
testUserRatingInfluencesOutcome();
testOpponentRatingInfluencesOutcome();
testHomeAdvantageInfluencesOutcome();
testModuleDoesNotImportUiOrChangeMatchEngineBase();

console.log("QA european match engine OK");
