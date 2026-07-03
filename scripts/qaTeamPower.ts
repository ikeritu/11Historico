import {
  applyCareerRatingBonus,
  applyDifficultyToTeamRating,
  buildCareerTeamPowerPreview,
} from "../src/career/teamPower";
import type { TeamRating } from "../src/types/game";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function logOk(message: string): void {
  console.log(`✓ ${message}`);
}

function createRating(value: number, overrides: Partial<TeamRating> = {}): TeamRating {
  return {
    attack: value,
    defense: value,
    control: value,
    physical: value,
    mentality: value,
    goalkeeping: value,
    overall: value,
    profileLabel: "QA",
    strengths: ["Base QA"],
    weaknesses: [],
    ...overrides,
  };
}

function testCoachBonusRaisesVisibleTeamPower(): void {
  const base = createRating(86, {
    attack: 87,
    defense: 85,
    control: 88,
    physical: 84,
    mentality: 89,
    goalkeeping: 83,
    overall: 86,
  });
  const boosted = applyCareerRatingBonus(base, 0.5);

  assert(boosted.overall === 86.5, "El bonus +0.5 debe subir el overall visible.");
  assert(boosted.attack === 87.5, "El bonus +0.5 debe subir ataque.");
  assert(boosted.defense === 85.5, "El bonus +0.5 debe subir defensa.");
  assert(boosted.control === 88.5, "El bonus +0.5 debe subir control.");
  assert(boosted.physical === 84.5, "El bonus +0.5 debe subir físico.");
  assert(boosted.mentality === 89.5, "El bonus +0.5 debe subir mentalidad.");
  assert(boosted.goalkeeping === 83.5, "El bonus +0.5 debe subir portería.");
  assert(base.overall === 86, "El bonus no debe mutar el rating base.");
  logOk("Premio entrenador +0.5 mejora todas las valoraciones visibles");
}

function testCoachBonusInfluencesCareerSimulationRating(): void {
  const base = createRating(88);
  const withoutBonus = buildCareerTeamPowerPreview({
    teamRating: base,
    bonus: 0,
    difficulty: "normal",
    isCareerMode: true,
  });
  const withBonus = buildCareerTeamPowerPreview({
    teamRating: base,
    bonus: 0.5,
    difficulty: "normal",
    isCareerMode: true,
  });

  assert(withBonus.seasonRating.overall === 88.5, "El rating de temporada debe incluir +0.5.");
  assert(
    withBonus.simulationRating.overall > withoutBonus.simulationRating.overall,
    "El +0.5 debe llegar al rating que usa la simulación de carrera.",
  );
  logOk("Premio entrenador +0.5 influye en el rating simulado de carrera");
}

function testEveryRatingLineReachesSimulationPower(): void {
  const base = createRating(84);
  const attackBoost = applyDifficultyToTeamRating({ ...base, attack: 90 }, "normal", true);
  const defenseBoost = applyDifficultyToTeamRating({ ...base, defense: 90 }, "normal", true);
  const controlBoost = applyDifficultyToTeamRating({ ...base, control: 90 }, "normal", true);
  const physicalBoost = applyDifficultyToTeamRating({ ...base, physical: 90 }, "normal", true);
  const mentalityBoost = applyDifficultyToTeamRating({ ...base, mentality: 90 }, "normal", true);
  const goalkeepingBoost = applyDifficultyToTeamRating({ ...base, goalkeeping: 90 }, "normal", true);
  const simulatedBase = applyDifficultyToTeamRating(base, "normal", true);

  assert(attackBoost.attack > simulatedBase.attack, "Ataque debe influir en el poder simulado.");
  assert(defenseBoost.defense > simulatedBase.defense, "Defensa debe influir en el poder simulado.");
  assert(controlBoost.control > simulatedBase.control, "Control debe influir en el poder simulado.");
  assert(physicalBoost.physical > simulatedBase.physical, "Físico debe influir en el poder simulado.");
  assert(mentalityBoost.mentality > simulatedBase.mentality, "Mentalidad debe influir en el poder simulado.");
  assert(goalkeepingBoost.goalkeeping > simulatedBase.goalkeeping, "Portería debe influir en el poder simulado.");
  logOk("Todas las líneas de rating llegan al rating que usa la simulación");
}

function testDifficultyStillModulatesTeamPower(): void {
  const base = createRating(88);
  const normal = applyDifficultyToTeamRating(base, "normal", true);
  const hard = applyDifficultyToTeamRating(base, "dificil", true);
  const legend = applyDifficultyToTeamRating(base, "leyenda", true);

  assert(normal.overall > hard.overall, "Normal debe conservar más rating que difícil.");
  assert(hard.overall > legend.overall, "Difícil debe conservar más rating que leyenda.");
  logOk("La dificultad sigue modulando el poder del equipo");
}

function testRatingCapsAreSafe(): void {
  const base = createRating(99.8);
  const boosted = applyCareerRatingBonus(base, 0.5);
  const simulated = applyDifficultyToTeamRating(boosted, "normal", true);

  assert(boosted.overall <= 100, "El rating visible no debe superar 100.");
  assert(simulated.overall <= 99, "El rating simulado no debe superar 99.");
  logOk("Los límites de rating siguen siendo seguros");
}

console.log("QA Team Power");

testCoachBonusRaisesVisibleTeamPower();
testCoachBonusInfluencesCareerSimulationRating();
testEveryRatingLineReachesSimulationPower();
testDifficultyStillModulatesTeamPower();
testRatingCapsAreSafe();

console.log("QA team power OK");
