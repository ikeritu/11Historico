import {
  SEASON_LUCK_WHEEL_BASE_PROBABILITIES,
  SEASON_LUCK_WHEEL_NEGATIVE_WEIGHTS,
  SEASON_LUCK_WHEEL_POSITIVE_WEIGHTS,
  SEASON_LUCK_WHEEL_PRIZE_SEGMENTS,
  applySeasonLuckWheelRatingDelta,
  buildSeasonLuckWheelOffer,
  canOfferSeasonLuckWheel,
  declineSeasonLuckWheel,
  getSeasonLuckWheelPrecisionZone,
  resolveSeasonLuckWheel,
  resolveSeasonLuckWheelResultType,
  validateSeasonLuckWheelConfig,
  type SeasonLuckWheelTriggerEvent,
} from "../src/career/seasonLuckWheel";
import {
  SEASON_LUCK_WHEEL_APPEARANCE_TEXTS,
  SEASON_LUCK_WHEEL_RESULT_TEXTS,
} from "../src/career/seasonLuckWheelText";
import type { TeamRating } from "../src/types/game";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function logOk(message: string): void {
  console.log(`✓ ${message}`);
}

function sum(values: Record<string, number>): number {
  return Object.values(values).reduce((total, value) => total + value, 0);
}

function createTeamRating(overall = 84): TeamRating {
  return {
    overall,
    attack: overall,
    defense: overall,
    control: overall,
    physical: overall,
    mentality: overall,
    goalkeeping: overall,
    strengths: [],
    weaknesses: [],
  };
}

function testProbabilityConfig(): void {
  validateSeasonLuckWheelConfig();
  assert(sum(SEASON_LUCK_WHEEL_BASE_PROBABILITIES) === 100, "Probabilidad general debe sumar 100.");
  assert(SEASON_LUCK_WHEEL_BASE_PROBABILITIES.positive === 40, "La probabilidad positiva base debe ser 40%.");
  assert(SEASON_LUCK_WHEEL_BASE_PROBABILITIES.neutral === 40, "La probabilidad neutra base debe ser 40%.");
  assert(SEASON_LUCK_WHEEL_BASE_PROBABILITIES.negative === 20, "La probabilidad negativa base debe ser 20%.");
  assert(sum(SEASON_LUCK_WHEEL_POSITIVE_WEIGHTS) === 100, "Pesos positivos deben sumar 100.");
  assert(SEASON_LUCK_WHEEL_POSITIVE_WEIGHTS.rating_plus_0_5 === 40, "+0.5 debe pesar 40% dentro del bloque positivo.");
  assert(SEASON_LUCK_WHEEL_POSITIVE_WEIGHTS.player_change === 30, "Cambio de jugador debe pesar 30% dentro del bloque positivo.");
  assert(SEASON_LUCK_WHEEL_POSITIVE_WEIGHTS.coach_change === 20, "Cambio de entrenador debe pesar 20% dentro del bloque positivo.");
  assert(SEASON_LUCK_WHEEL_POSITIVE_WEIGHTS.rating_plus_1 === 8, "+1 debe pesar 8% dentro del bloque positivo.");
  assert(SEASON_LUCK_WHEEL_POSITIVE_WEIGHTS.rating_plus_1_and_player_change === 2, "+1 + jugador debe pesar 2% dentro del bloque positivo.");
  assert(sum(SEASON_LUCK_WHEEL_NEGATIVE_WEIGHTS) === 100, "Pesos negativos deben sumar 100.");
  assert(SEASON_LUCK_WHEEL_NEGATIVE_WEIGHTS.rating_minus_0_5 === 90, "-0.5 debe pesar 90% dentro del bloque negativo.");
  assert(SEASON_LUCK_WHEEL_NEGATIVE_WEIGHTS.rating_minus_1 === 10, "-1 debe pesar 10% dentro del bloque negativo.");
  logOk("probabilidades 40/40/20 e internas cerradas");
}

function testPrecisionZones(): void {
  const center = getSeasonLuckWheelPrecisionZone(0.5);
  const edge = getSeasonLuckWheelPrecisionZone(0.99);
  const balanced = getSeasonLuckWheelPrecisionZone(0.25);

  assert(center.id === "perfect_center", "El centro de la barra debe ser zona perfecta.");
  assert(center.probabilities.positive > SEASON_LUCK_WHEEL_BASE_PROBABILITIES.positive, "El centro debe mejorar opciones positivas.");
  assert(center.probabilities.negative < SEASON_LUCK_WHEEL_BASE_PROBABILITIES.negative, "El centro debe reducir opciones negativas.");
  assert(edge.id === "edge", "Los extremos deben ser zona de riesgo.");
  assert(edge.probabilities.positive < SEASON_LUCK_WHEEL_BASE_PROBABILITIES.positive, "Los extremos deben bajar opciones positivas.");
  assert(edge.probabilities.negative > SEASON_LUCK_WHEEL_BASE_PROBABILITIES.negative, "Los extremos deben subir opciones negativas.");
  assert(balanced.id === "balanced", "La zona media debe conservar el 40/40/20 base.");
  logOk("barra de precisión mejora centro y castiga extremos");
}

function testPrizeSegmentsAreVisibleAndActionable(): void {
  const labels = SEASON_LUCK_WHEEL_PRIZE_SEGMENTS.map((segment) => segment.label);

  for (const required of ["+0.5 media", "Cambio de jugador", "Cambio de entrenador", "+1.0 media", "+1.0 media + jugador", "Sin efecto", "-0.5 media", "-1.0 media"]) {
    assert(labels.includes(required), `La ruleta debe mostrar premio: ${required}`);
  }

  const playerChange = SEASON_LUCK_WHEEL_PRIZE_SEGMENTS.find((segment) => segment.resultType === "player_change");
  const coachChange = SEASON_LUCK_WHEEL_PRIZE_SEGMENTS.find((segment) => segment.resultType === "coach_change");
  const combined = SEASON_LUCK_WHEEL_PRIZE_SEGMENTS.find((segment) => segment.resultType === "rating_plus_1_and_player_change");

  assert(playerChange?.requiresPlayerChange === true, "Cambio de jugador debe activar premio de jugador.");
  assert(coachChange?.requiresCoachChange === true, "Cambio de entrenador debe activar premio de entrenador.");
  assert(combined?.ratingDelta === 1 && combined.requiresPlayerChange, "+1 + jugador debe tener ambos efectos.");
  logOk("premios visibles de ruleta definidos");
}

function testSingleUsePerSeasonAndDecline(): void {
  const offer = buildSeasonLuckWheelOffer({
    seasonId: "2028-29",
    triggerEvent: "mid_season",
    randomText: 0,
  });

  assert(offer, "Debe ofrecer ruleta si no se ha usado en la temporada.");
  assert(offer.shouldPauseSimulation === true, "La oferta debe pedir pausar simulación.");
  assert(offer.prizeSegments.length >= 8, "La oferta debe exponer los premios visibles.");

  const declined = declineSeasonLuckWheel({
    seasonId: offer.seasonId,
    triggerEvent: offer.triggerEvent,
    appearanceText: offer.appearanceText,
  });

  assert(declined.used === true, "Rechazar consume la ruleta de temporada.");
  assert(declined.accepted === false, "Rechazar debe quedar registrado como no aceptado.");
  assert(declined.ratingDelta === 0, "Rechazar no debe alterar rating.");
  assert(canOfferSeasonLuckWheel(declined) === false, "Solo puede haber una ruleta por temporada.");
  logOk("máximo una ruleta por temporada y rechazo sin efecto");
}

function testResultResolution(): void {
  const positive = resolveSeasonLuckWheel({
    seasonId: "2028-29",
    triggerEvent: "copa_elimination",
    precisionPosition: 0.5,
    randomGroup: 0.01,
    randomPrize: 0.99,
    randomText: 0.25,
  });
  const neutral = resolveSeasonLuckWheel({
    seasonId: "2028-29",
    triggerEvent: "mid_season",
    precisionPosition: 0.25,
    randomGroup: 0.5,
    randomPrize: 0,
    randomText: 0.4,
  });
  const negative = resolveSeasonLuckWheel({
    seasonId: "2028-29",
    triggerEvent: "europe_elimination",
    precisionPosition: 0.99,
    randomGroup: 0.99,
    randomPrize: 0.95,
    randomText: 0.6,
  });

  assert(positive.resultGroup === "positive", "Debe resolver resultado positivo.");
  assert(positive.resultType === "rating_plus_1_and_player_change", "El 2% final positivo debe permitir +1 y cambio de jugador.");
  assert(positive.ratingDelta === 1 && positive.requiresPlayerChange, "El premio combinado debe aplicar +1 y jugador.");
  assert(neutral.resultGroup === "neutral" && neutral.resultType === "no_effect", "Debe resolver neutro sin efecto.");
  assert(negative.resultGroup === "negative" && negative.resultType === "rating_minus_1", "El 10% final negativo debe permitir -1.");
  assert(negative.ratingDelta === -1, "El castigo -1 debe tener ratingDelta -1.");
  logOk("resolución de premios positivos, neutros y negativos OK");
}

function testWeightedBoundaries(): void {
  assert(resolveSeasonLuckWheelResultType("positive", 0.0) === "rating_plus_0_5", "Inicio positivo debe ser +0.5.");
  assert(resolveSeasonLuckWheelResultType("positive", 0.41) === "player_change", "Segundo tramo positivo debe ser cambio de jugador.");
  assert(resolveSeasonLuckWheelResultType("positive", 0.71) === "coach_change", "Tercer tramo positivo debe ser entrenador.");
  assert(resolveSeasonLuckWheelResultType("positive", 0.93) === "rating_plus_1", "Tramo raro positivo debe ser +1.");
  assert(resolveSeasonLuckWheelResultType("positive", 0.99) === "rating_plus_1_and_player_change", "Tramo ultra raro positivo debe ser +1 + jugador.");
  assert(resolveSeasonLuckWheelResultType("negative", 0.1) === "rating_minus_0_5", "Negativo común debe ser -0.5.");
  assert(resolveSeasonLuckWheelResultType("negative", 0.95) === "rating_minus_1", "Negativo raro debe ser -1.");
  logOk("fronteras ponderadas respetan diseño de premios");
}

function testRatingDeltaAffectsTeamPowerWithoutChangingBaseRatings(): void {
  const team = createTeamRating(84);
  const plus = applySeasonLuckWheelRatingDelta(team, 0.5);
  const minus = applySeasonLuckWheelRatingDelta(team, -1);
  const capped = applySeasonLuckWheelRatingDelta(createTeamRating(99.8), 1);

  assert(team.overall === 84, "El rating base original no debe mutarse.");
  assert(plus.overall === 84.5 && plus.attack === 84.5 && plus.goalkeeping === 84.5, "+0.5 debe afectar todas las líneas.");
  assert(minus.overall === 83 && minus.defense === 83 && minus.mentality === 83, "-1 debe afectar todas las líneas.");
  assert(capped.overall === 100, "Los bonus deben respetar techo 100 en motor de temporada.");
  assert(plus.strengths.some((value) => value.includes("Ruleta de temporada")), "Bonus positivo debe dejar traza en fortalezas.");
  assert(minus.weaknesses.some((value) => value.includes("Ruleta de temporada")), "Penalización debe dejar traza en debilidades.");
  logOk("deltas de ruleta afectan teamPower sin mutar ratings base");
}

function testNarrativeTextBanks(): void {
  const triggerEvents: SeasonLuckWheelTriggerEvent[] = ["copa_elimination", "europe_elimination", "mid_season", "bad_streak", "good_streak"];
  const appearanceTotal = triggerEvents.reduce((total, event) => total + SEASON_LUCK_WHEEL_APPEARANCE_TEXTS[event].length, 0);

  assert(appearanceTotal >= 20, "Debe haber al menos 20 frases de aparición.");
  for (const event of triggerEvents) {
    assert(SEASON_LUCK_WHEEL_APPEARANCE_TEXTS[event].length >= 4, `El evento ${event} debe tener frases propias.`);
  }

  assert(SEASON_LUCK_WHEEL_RESULT_TEXTS.positive.length >= 20, "Debe haber al menos 20 frases positivas.");
  assert(SEASON_LUCK_WHEEL_RESULT_TEXTS.neutral.length >= 20, "Debe haber al menos 20 frases neutras.");
  assert(SEASON_LUCK_WHEEL_RESULT_TEXTS.negative.length >= 20, "Debe haber al menos 20 frases negativas.");
  logOk("bancos narrativos mínimos completos");
}

console.log("QA Season Luck Wheel Engine");

testProbabilityConfig();
testPrecisionZones();
testPrizeSegmentsAreVisibleAndActionable();
testSingleUsePerSeasonAndDecline();
testResultResolution();
testWeightedBoundaries();
testRatingDeltaAffectsTeamPowerWithoutChangingBaseRatings();
testNarrativeTextBanks();

console.log("QA season luck wheel engine OK");
