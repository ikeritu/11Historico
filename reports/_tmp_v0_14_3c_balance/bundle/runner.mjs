//#region src/data/laliga2526Teams.ts
/**
* Rivales de LALIGA EA SPORTS 2025/26 para el MVP.
*
* Fuente base de equipos: página oficial de clubes LALIGA EA SPORTS 2025/26.
* Fuente base de fuerza relativa: clasificación oficial LALIGA 2025/26 y GF/GA cuando estén disponibles.
*
* IMPORTANTE:
* - Athletic Club está incluido como referencia de la liga real, pero en el modo principal
*   será sustituido por el Athletic histórico creado por el usuario.
* - shirtIcon es un identificador propio para representar camisetas genéricas. No debe
*   usarse como escudo, logo ni equipación oficial.
* - Los ratings son una primera conversión de rendimiento/equilibrio competitivo a 0-100.
*   No son ratings oficiales de LALIGA.
*/
var USER_TEAM_ID = "athletic_historico";
var LALIGA_2526_TEAMS = [
	{
		id: "athletic_club",
		name: "Athletic Club",
		shirtIcon: "red_white_stripes_black_shorts",
		ratings: {
			attack: 82,
			midfield: 82,
			defense: 83,
			goalkeeping: 84,
			mentality: 86,
			overall: 83
		}
	},
	{
		id: "atletico_madrid",
		name: "Atlético de Madrid",
		shirtIcon: "red_white_stripes_blue_shorts",
		ratings: {
			attack: 84,
			midfield: 86,
			defense: 88,
			goalkeeping: 86,
			mentality: 90,
			overall: 87
		}
	},
	{
		id: "ca_osasuna",
		name: "CA Osasuna",
		shirtIcon: "red_shirt_navy_shorts",
		ratings: {
			attack: 76,
			midfield: 77,
			defense: 77,
			goalkeeping: 76,
			mentality: 79,
			overall: 77
		}
	},
	{
		id: "celta_vigo",
		name: "Celta",
		shirtIcon: "sky_blue_shirt_white_shorts",
		ratings: {
			attack: 79,
			midfield: 80,
			defense: 76,
			goalkeeping: 76,
			mentality: 78,
			overall: 79
		}
	},
	{
		id: "deportivo_alaves",
		name: "Deportivo Alavés",
		shirtIcon: "blue_white_stripes_blue_shorts",
		ratings: {
			attack: 74,
			midfield: 75,
			defense: 77,
			goalkeeping: 76,
			mentality: 78,
			overall: 76
		}
	},
	{
		id: "elche_cf",
		name: "Elche CF",
		shirtIcon: "white_shirt_green_band",
		ratings: {
			attack: 75,
			midfield: 76,
			defense: 76,
			goalkeeping: 75,
			mentality: 77,
			overall: 76
		}
	},
	{
		id: "fc_barcelona",
		name: "FC Barcelona",
		shirtIcon: "blue_red_vertical_stripes",
		ratings: {
			attack: 95,
			midfield: 93,
			defense: 88,
			goalkeeping: 86,
			mentality: 92,
			overall: 94
		}
	},
	{
		id: "getafe_cf",
		name: "Getafe CF",
		shirtIcon: "blue_shirt_blue_shorts",
		ratings: {
			attack: 73,
			midfield: 75,
			defense: 79,
			goalkeeping: 76,
			mentality: 79,
			overall: 76
		}
	},
	{
		id: "girona_fc",
		name: "Girona FC",
		shirtIcon: "red_white_stripes_red_shorts",
		ratings: {
			attack: 74,
			midfield: 75,
			defense: 73,
			goalkeeping: 74,
			mentality: 74,
			overall: 74
		}
	},
	{
		id: "levante_ud",
		name: "Levante UD",
		shirtIcon: "blue_red_vertical_stripes_blue_shorts",
		ratings: {
			attack: 73,
			midfield: 74,
			defense: 73,
			goalkeeping: 74,
			mentality: 75,
			overall: 74
		}
	},
	{
		id: "rcd_mallorca",
		name: "RCD Mallorca",
		shirtIcon: "red_shirt_black_shorts",
		ratings: {
			attack: 76,
			midfield: 77,
			defense: 79,
			goalkeeping: 78,
			mentality: 80,
			overall: 78
		}
	},
	{
		id: "real_betis",
		name: "Real Betis",
		shirtIcon: "green_white_stripes_white_shorts",
		ratings: {
			attack: 81,
			midfield: 83,
			defense: 79,
			goalkeeping: 78,
			mentality: 82,
			overall: 82
		}
	},
	{
		id: "real_madrid",
		name: "Real Madrid",
		shirtIcon: "white_shirt_white_shorts",
		ratings: {
			attack: 91,
			midfield: 91,
			defense: 88,
			goalkeeping: 88,
			mentality: 92,
			overall: 91
		}
	},
	{
		id: "real_oviedo",
		name: "Real Oviedo",
		shirtIcon: "blue_shirt_white_shorts",
		ratings: {
			attack: 72,
			midfield: 73,
			defense: 73,
			goalkeeping: 74,
			mentality: 76,
			overall: 73
		}
	},
	{
		id: "real_sociedad",
		name: "Real Sociedad",
		shirtIcon: "blue_white_stripes_white_shorts",
		ratings: {
			attack: 79,
			midfield: 82,
			defense: 81,
			goalkeeping: 80,
			mentality: 80,
			overall: 81
		}
	},
	{
		id: "rayo_vallecano",
		name: "Rayo Vallecano",
		shirtIcon: "white_shirt_red_sash",
		ratings: {
			attack: 78,
			midfield: 79,
			defense: 78,
			goalkeeping: 77,
			mentality: 82,
			overall: 79
		}
	},
	{
		id: "rcd_espanyol",
		name: "RCD Espanyol",
		shirtIcon: "blue_white_stripes_blue_shorts",
		ratings: {
			attack: 74,
			midfield: 75,
			defense: 75,
			goalkeeping: 76,
			mentality: 76,
			overall: 75
		}
	},
	{
		id: "sevilla_fc",
		name: "Sevilla FC",
		shirtIcon: "white_shirt_red_details",
		ratings: {
			attack: 76,
			midfield: 78,
			defense: 76,
			goalkeeping: 77,
			mentality: 78,
			overall: 77
		}
	},
	{
		id: "valencia_cf",
		name: "Valencia CF",
		shirtIcon: "white_shirt_black_shorts",
		ratings: {
			attack: 76,
			midfield: 77,
			defense: 76,
			goalkeeping: 78,
			mentality: 78,
			overall: 77
		}
	},
	{
		id: "villarreal_cf",
		name: "Villarreal CF",
		shirtIcon: "yellow_shirt_yellow_shorts",
		ratings: {
			attack: 88,
			midfield: 86,
			defense: 82,
			goalkeeping: 81,
			mentality: 85,
			overall: 86
		}
	}
];
/**
* Devuelve los rivales de liga excluyendo al Athletic real.
* En el juego principal, el Athletic histórico del usuario sustituye al Athletic Club 25/26.
*/
function getLaliga2526RivalsExcludingAthletic() {
	return LALIGA_2526_TEAMS.filter((team) => team.id !== "athletic_club");
}
function getLaliga2526TeamById(teamId) {
	return LALIGA_2526_TEAMS.find((team) => team.id === teamId);
}
//#endregion
//#region src/data/laliga2526Calendar.ts
var LALIGA_2526_CALENDAR_SOURCE_REFS = ["athletic-official-2025-26-matches", "as-laliga-2025-26-results"];
function makeFixture(params) {
	const userHome = params.homeTeamId === USER_TEAM_ID;
	const userAway = params.awayTeamId === USER_TEAM_ID;
	return {
		id: `md${String(params.matchday).padStart(2, "0")}_${params.homeTeamId}_vs_${params.awayTeamId}`,
		matchday: params.matchday,
		date: params.date,
		homeTeamId: params.homeTeamId,
		awayTeamId: params.awayTeamId,
		includesUserTeam: userHome || userAway,
		sourceRefs: LALIGA_2526_CALENDAR_SOURCE_REFS
	};
}
/**
* 38 partidos reales del Athletic Club 2025/26, sustituyendo Athletic Club por Athletic Histórico.
*/
var LALIGA_2526_USER_TEAM_FIXTURES = [
	makeFixture({
		matchday: 1,
		date: "2025-08-17",
		homeTeamId: "athletic_historico",
		awayTeamId: "sevilla_fc"
	}),
	makeFixture({
		matchday: 2,
		date: "2025-08-25",
		homeTeamId: "athletic_historico",
		awayTeamId: "rayo_vallecano"
	}),
	makeFixture({
		matchday: 3,
		date: "2025-08-31",
		homeTeamId: "real_betis",
		awayTeamId: "athletic_historico"
	}),
	makeFixture({
		matchday: 4,
		date: "2025-09-13",
		homeTeamId: "athletic_historico",
		awayTeamId: "deportivo_alaves"
	}),
	makeFixture({
		matchday: 5,
		date: "2025-09-20",
		homeTeamId: "valencia_cf",
		awayTeamId: "athletic_historico"
	}),
	makeFixture({
		matchday: 6,
		date: "2025-09-23",
		homeTeamId: "athletic_historico",
		awayTeamId: "girona_fc"
	}),
	makeFixture({
		matchday: 7,
		date: "2025-09-27",
		homeTeamId: "villarreal_cf",
		awayTeamId: "athletic_historico"
	}),
	makeFixture({
		matchday: 8,
		date: "2025-10-04",
		homeTeamId: "athletic_historico",
		awayTeamId: "rcd_mallorca"
	}),
	makeFixture({
		matchday: 9,
		date: "2025-10-19",
		homeTeamId: "elche_cf",
		awayTeamId: "athletic_historico"
	}),
	makeFixture({
		matchday: 10,
		date: "2025-10-25",
		homeTeamId: "athletic_historico",
		awayTeamId: "getafe_cf"
	}),
	makeFixture({
		matchday: 11,
		date: "2025-11-01",
		homeTeamId: "real_sociedad",
		awayTeamId: "athletic_historico"
	}),
	makeFixture({
		matchday: 12,
		date: "2025-11-09",
		homeTeamId: "athletic_historico",
		awayTeamId: "real_oviedo"
	}),
	makeFixture({
		matchday: 13,
		date: "2025-11-22",
		homeTeamId: "fc_barcelona",
		awayTeamId: "athletic_historico"
	}),
	makeFixture({
		matchday: 14,
		date: "2025-11-29",
		homeTeamId: "levante_ud",
		awayTeamId: "athletic_historico"
	}),
	makeFixture({
		matchday: 15,
		date: "2025-12-06",
		homeTeamId: "athletic_historico",
		awayTeamId: "atletico_madrid"
	}),
	makeFixture({
		matchday: 16,
		date: "2025-12-14",
		homeTeamId: "celta_vigo",
		awayTeamId: "athletic_historico"
	}),
	makeFixture({
		matchday: 17,
		date: "2025-12-22",
		homeTeamId: "athletic_historico",
		awayTeamId: "rcd_espanyol"
	}),
	makeFixture({
		matchday: 18,
		date: "2026-01-03",
		homeTeamId: "ca_osasuna",
		awayTeamId: "athletic_historico"
	}),
	makeFixture({
		matchday: 19,
		date: "2025-12-03",
		homeTeamId: "athletic_historico",
		awayTeamId: "real_madrid"
	}),
	makeFixture({
		matchday: 20,
		date: "2026-01-17",
		homeTeamId: "rcd_mallorca",
		awayTeamId: "athletic_historico"
	}),
	makeFixture({
		matchday: 21,
		date: "2026-01-24",
		homeTeamId: "sevilla_fc",
		awayTeamId: "athletic_historico"
	}),
	makeFixture({
		matchday: 22,
		date: "2026-02-01",
		homeTeamId: "athletic_historico",
		awayTeamId: "real_sociedad"
	}),
	makeFixture({
		matchday: 23,
		date: "2026-02-08",
		homeTeamId: "athletic_historico",
		awayTeamId: "levante_ud"
	}),
	makeFixture({
		matchday: 24,
		date: "2026-02-15",
		homeTeamId: "real_oviedo",
		awayTeamId: "athletic_historico"
	}),
	makeFixture({
		matchday: 25,
		date: "2026-02-20",
		homeTeamId: "athletic_historico",
		awayTeamId: "elche_cf"
	}),
	makeFixture({
		matchday: 26,
		date: "2026-02-28",
		homeTeamId: "rayo_vallecano",
		awayTeamId: "athletic_historico"
	}),
	makeFixture({
		matchday: 27,
		date: "2026-03-07",
		homeTeamId: "athletic_historico",
		awayTeamId: "fc_barcelona"
	}),
	makeFixture({
		matchday: 28,
		date: "2026-03-14",
		homeTeamId: "girona_fc",
		awayTeamId: "athletic_historico"
	}),
	makeFixture({
		matchday: 29,
		date: "2026-03-22",
		homeTeamId: "athletic_historico",
		awayTeamId: "real_betis"
	}),
	makeFixture({
		matchday: 30,
		date: "2026-04-05",
		homeTeamId: "getafe_cf",
		awayTeamId: "athletic_historico"
	}),
	makeFixture({
		matchday: 31,
		date: "2026-04-12",
		homeTeamId: "athletic_historico",
		awayTeamId: "villarreal_cf"
	}),
	makeFixture({
		matchday: 32,
		date: "2026-04-25",
		homeTeamId: "atletico_madrid",
		awayTeamId: "athletic_historico"
	}),
	makeFixture({
		matchday: 33,
		date: "2026-04-21",
		homeTeamId: "athletic_historico",
		awayTeamId: "ca_osasuna"
	}),
	makeFixture({
		matchday: 34,
		date: "2026-05-02",
		homeTeamId: "deportivo_alaves",
		awayTeamId: "athletic_historico"
	}),
	makeFixture({
		matchday: 35,
		date: "2026-05-10",
		homeTeamId: "athletic_historico",
		awayTeamId: "valencia_cf"
	}),
	makeFixture({
		matchday: 36,
		date: "2026-05-13",
		homeTeamId: "rcd_espanyol",
		awayTeamId: "athletic_historico"
	}),
	makeFixture({
		matchday: 37,
		date: "2026-05-17",
		homeTeamId: "athletic_historico",
		awayTeamId: "celta_vigo"
	}),
	makeFixture({
		matchday: 38,
		date: "2026-05-23",
		homeTeamId: "real_madrid",
		awayTeamId: "athletic_historico"
	})
];
function getLaliga2526UserTeamFixtures() {
	return LALIGA_2526_USER_TEAM_FIXTURES;
}
//#endregion
//#region src/simulation/leagueTable.ts
var USER_TEAM_NAME = "Athletic Club Histórico";
function createEmptyTableRow(teamId, teamName) {
	return {
		teamId,
		teamName,
		played: 0,
		won: 0,
		drawn: 0,
		lost: 0,
		goalsFor: 0,
		goalsAgainst: 0,
		goalDifference: 0,
		points: 0
	};
}
function createInitialLeagueTable(params) {
	const { rivals, includeRealAthletic = false, userTeamName = USER_TEAM_NAME } = params;
	const table = [createEmptyTableRow(USER_TEAM_ID, userTeamName)];
	for (const rival of rivals) {
		if (!includeRealAthletic && rival.id === "athletic_club") continue;
		table.push(createEmptyTableRow(rival.id, rival.name));
	}
	return sortLeagueTable(table);
}
function findTableRowIndex(params) {
	const { table, teamName, userTeamId, userTeamName } = params;
	if (teamName === userTeamName) return table.findIndex((row) => row.teamId === userTeamId);
	return table.findIndex((row) => row.teamName === teamName);
}
function applyTeamMatchStats(params) {
	const { row, goalsFor, goalsAgainst } = params;
	const won = goalsFor > goalsAgainst ? 1 : 0;
	const drawn = goalsFor === goalsAgainst ? 1 : 0;
	const lost = goalsFor < goalsAgainst ? 1 : 0;
	const updatedGoalsFor = row.goalsFor + goalsFor;
	const updatedGoalsAgainst = row.goalsAgainst + goalsAgainst;
	return {
		...row,
		played: row.played + 1,
		won: row.won + won,
		drawn: row.drawn + drawn,
		lost: row.lost + lost,
		goalsFor: updatedGoalsFor,
		goalsAgainst: updatedGoalsAgainst,
		goalDifference: updatedGoalsFor - updatedGoalsAgainst,
		points: row.points + won * 3 + drawn
	};
}
function applyMatchResultToTable(params) {
	const { table, result, userTeamId = USER_TEAM_ID, userTeamName = USER_TEAM_NAME } = params;
	const updatedTable = table.map((row) => ({ ...row }));
	const homeIndex = findTableRowIndex({
		table: updatedTable,
		teamName: result.homeTeamName,
		userTeamId,
		userTeamName
	});
	const awayIndex = findTableRowIndex({
		table: updatedTable,
		teamName: result.awayTeamName,
		userTeamId,
		userTeamName
	});
	if (homeIndex === -1 || awayIndex === -1) throw new Error(`No se pudo aplicar el resultado. Equipo no encontrado: ${result.homeTeamName} vs ${result.awayTeamName}`);
	updatedTable[homeIndex] = applyTeamMatchStats({
		row: updatedTable[homeIndex],
		goalsFor: result.homeGoals,
		goalsAgainst: result.awayGoals
	});
	updatedTable[awayIndex] = applyTeamMatchStats({
		row: updatedTable[awayIndex],
		goalsFor: result.awayGoals,
		goalsAgainst: result.homeGoals
	});
	return sortLeagueTable(updatedTable);
}
function sortLeagueTable(table) {
	return [...table].sort((a, b) => {
		if (b.points !== a.points) return b.points - a.points;
		if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
		if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
		if (a.goalsAgainst !== b.goalsAgainst) return a.goalsAgainst - b.goalsAgainst;
		return a.teamName.localeCompare(b.teamName);
	});
}
function createLeagueSimulationState(params) {
	const { fixtures, rivals, includeRealAthletic = false, userTeamName = USER_TEAM_NAME } = params;
	return {
		currentMatchday: 1,
		fixtures,
		results: [],
		table: createInitialLeagueTable({
			rivals,
			includeRealAthletic,
			userTeamName
		}),
		completed: false
	};
}
function applyMatchResultToLeagueState(params) {
	const { state, result, userTeamId = USER_TEAM_ID, userTeamName = USER_TEAM_NAME } = params;
	const nextResults = [...state.results, result];
	const nextTable = applyMatchResultToTable({
		table: state.table,
		result,
		userTeamId,
		userTeamName
	});
	const maxMatchday = Math.max(...state.fixtures.map((fixture) => fixture.matchday), 0);
	const resultsInCurrentMatchday = nextResults.filter((matchResult) => matchResult.matchday === state.currentMatchday).length;
	const fixturesInCurrentMatchday = state.fixtures.filter((fixture) => fixture.matchday === state.currentMatchday).length;
	const nextMatchday = fixturesInCurrentMatchday > 0 && resultsInCurrentMatchday >= fixturesInCurrentMatchday ? Math.min(state.currentMatchday + 1, maxMatchday) : state.currentMatchday;
	const completed = nextResults.length >= state.fixtures.length;
	return {
		...state,
		currentMatchday: completed ? maxMatchday : nextMatchday,
		results: nextResults,
		table: nextTable,
		completed
	};
}
function getPendingFixturesForCurrentMatchday(state) {
	const playedFixtureIds = new Set(state.results.map((result) => result.fixtureId));
	return state.fixtures.filter((fixture) => fixture.matchday === state.currentMatchday && !playedFixtureIds.has(fixture.id));
}
function getUserLeagueSummary(params) {
	const { table, userTeamId = USER_TEAM_ID } = params;
	const sortedTable = sortLeagueTable(table);
	const index = sortedTable.findIndex((row) => row.teamId === userTeamId);
	if (index === -1) return {};
	return {
		position: index + 1,
		row: sortedTable[index]
	};
}
//#endregion
//#region src/simulation/matchEngine.ts
/**
* Generador pseudoaleatorio simple para tests reproducibles.
*/
var SeededRandom = class {
	seed;
	constructor(seed) {
		this.seed = seed;
	}
	next() {
		this.seed = (this.seed * 9301 + 49297) % 233280;
		return this.seed / 233280;
	}
};
var NativeRandom = class {
	next() {
		return Math.random();
	}
};
function createRandom(seed) {
	return typeof seed === "number" ? new SeededRandom(seed) : new NativeRandom();
}
function clamp$1(value, min, max) {
	return Math.max(min, Math.min(max, value));
}
function roundToOne(value) {
	return Math.round(value * 10) / 10;
}
/**
* Convierte una ventaja de rating a goles esperados.
*
* La idea es:
* - Equipo muy superior: xG claramente mayor.
* - Equipo inferior: aún puede marcar.
* - Mantener marcadores realistas tipo 0-0, 1-0, 2-1, 3-1.
*/
function calculateExpectedGoals(params) {
	const { attack, control, mentality, opponentDefense, opponentGoalkeeping, opponentMentality, isHome, riskModifier = 0 } = params;
	const ratingDiff = attack * .52 + control * .2 + mentality * .12 + riskModifier * .05 - (opponentDefense * .5 + opponentGoalkeeping * .3 + opponentMentality * .2);
	const homeBonus = isHome ? .14 : -.18;
	return roundToOne(clamp$1(1.08 + ratingDiff / 34 + homeBonus, .28, 3.05));
}
function getAverageUserRating(teamRating) {
	return teamRating.attack * .22 + teamRating.defense * .22 + teamRating.control * .18 + teamRating.physical * .1 + teamRating.mentality * .13 + teamRating.goalkeeping * .15;
}
function getAverageRivalRating$1(rival) {
	return rival.ratings.attack * .22 + rival.ratings.defense * .22 + rival.ratings.midfield * .2 + rival.ratings.mentality * .16 + rival.ratings.goalkeeping * .2;
}
function getFixtureDifficultyModifier(params) {
	const { teamRating, rival, userIsHome } = params;
	const userAverage = getAverageUserRating(teamRating);
	const rivalAverage = getAverageRivalRating$1(rival);
	const rivalIsStrong = rivalAverage >= 84;
	const rivalIsVeryStrong = rivalAverage >= 88;
	const userIsHugeFavorite = userAverage - rivalAverage >= 10;
	let userAttackPenalty = 0;
	let userDefensePenalty = 0;
	let rivalAttackBonus = 0;
	if (!userIsHome) {
		userAttackPenalty += 2.2;
		userDefensePenalty += 1.4;
		rivalAttackBonus += .7;
	}
	if (rivalIsStrong) {
		userAttackPenalty += 1.2;
		userDefensePenalty += .8;
		rivalAttackBonus += .9;
	}
	if (rivalIsVeryStrong) {
		userAttackPenalty += 1.2;
		userDefensePenalty += 1;
		rivalAttackBonus += .8;
	}
	if (userIsHugeFavorite) {
		userAttackPenalty += .9;
		rivalAttackBonus += .5;
	}
	return {
		userAttackPenalty,
		userDefensePenalty,
		rivalAttackBonus
	};
}
/**
* Muestra algo de varianza sin que el partido sea puro azar.
*/
function sampleGoalsFromExpectedGoals(expectedGoals, random) {
	const roll = random.next();
	const lowBlock = Math.max(0, expectedGoals - 1.05);
	const normal = expectedGoals;
	const high = expectedGoals + .7;
	const veryHigh = expectedGoals + 1.25;
	let rawGoals;
	if (roll < .18) rawGoals = lowBlock;
	else if (roll < .78) rawGoals = normal + (random.next() - .5) * .75;
	else if (roll < .94) rawGoals = high + random.next() * .45;
	else rawGoals = veryHigh + random.next() * .65;
	return clamp$1(Math.round(rawGoals), 0, 5);
}
function applyUnderdogAndDrawVariance(params) {
	let { userGoals, rivalGoals } = params;
	const { teamRating, rival, userIsHome, random } = params;
	const userAverage = getAverageUserRating(teamRating);
	const rivalAverage = getAverageRivalRating$1(rival);
	const diff = userAverage - rivalAverage;
	const rivalIsStrong = rivalAverage >= 84;
	/**
	* Más empates realistas:
	* - Fuera de casa cuesta cerrar partidos.
	* - Contra rivales fuertes hay más riesgo de empate.
	*/
	if (userGoals > rivalGoals) {
		const lead = userGoals - rivalGoals;
		let drawChance = .04;
		if (!userIsHome) drawChance += .07;
		if (rivalIsStrong) drawChance += .06;
		if (diff < 8) drawChance += .05;
		if (lead >= 2) drawChance *= .45;
		if (random.next() < drawChance) rivalGoals += 1;
	}
	/**
	* Alguna sorpresa: un rival fuerte o un desplazamiento complicado
	* puede convertir un empate en derrota.
	*/
	if (userGoals === rivalGoals) {
		let upsetChance = .035;
		if (!userIsHome) upsetChance += .04;
		if (rivalIsStrong) upsetChance += .04;
		if (diff <= 4) upsetChance += .035;
		if (random.next() < upsetChance) rivalGoals += 1;
	}
	return {
		userGoals,
		rivalGoals
	};
}
/**
* Ajusta partidos muy extremos para que sean menos frecuentes.
*/
function normalizeScore(homeGoals, awayGoals, random) {
	let normalizedHome = homeGoals;
	let normalizedAway = awayGoals;
	if (normalizedHome + normalizedAway >= 7 && random.next() < .7) if (normalizedHome > normalizedAway) normalizedHome -= 1;
	else if (normalizedAway > normalizedHome) normalizedAway -= 1;
	else normalizedHome -= 1;
	if (normalizedHome >= 5 && random.next() < .45) normalizedHome -= 1;
	if (normalizedAway >= 5 && random.next() < .45) normalizedAway -= 1;
	return {
		homeGoals: clamp$1(normalizedHome, 0, 6),
		awayGoals: clamp$1(normalizedAway, 0, 6)
	};
}
/**
* Devuelve jugadores candidatos a marcar en el Athletic histórico.
*/
function getScorerCandidates(selectedPlayers) {
	return selectedPlayers.map((selected) => {
		const player = selected.playerSeason;
		const position = selected.position;
		let positionWeight = 1;
		if (position === "DC") positionWeight = 5;
		else if (position === "SD" || position === "EI" || position === "ED") positionWeight = 3.5;
		else if (position === "MP") positionWeight = 2.8;
		else if (position === "MC" || position === "MI" || position === "MD") positionWeight = 1.7;
		else if (position === "MCD") positionWeight = 1.1;
		else if (position === "LD" || position === "LI" || position === "CAD" || position === "CAI") positionWeight = .7;
		else if (position === "DFC") positionWeight = .45;
		else if (position === "POR") positionWeight = .02;
		const weight = positionWeight * (player.skills.shooting * .45 + player.skills.mentality * .2 + player.skills.physical * .15 + player.skills.dribbling * .12 + player.overall * .08);
		return {
			playerName: player.name,
			playerId: player.playerId,
			weight
		};
	});
}
/**
* Devuelve jugadores candidatos a asistir en el Athletic histórico.
*/
function getAssistCandidates(selectedPlayers) {
	return selectedPlayers.map((selected) => {
		const player = selected.playerSeason;
		const position = selected.position;
		let positionWeight = 1;
		if (position === "MP") positionWeight = 4.5;
		else if (position === "MC") positionWeight = 3.2;
		else if (position === "EI" || position === "ED" || position === "MI" || position === "MD") positionWeight = 3;
		else if (position === "MCD") positionWeight = 2;
		else if (position === "LD" || position === "LI" || position === "CAD" || position === "CAI") positionWeight = 1.9;
		else if (position === "SD") positionWeight = 2.5;
		else if (position === "DC") positionWeight = 1.3;
		else if (position === "DFC") positionWeight = .8;
		else if (position === "POR") positionWeight = .05;
		const weight = positionWeight * (player.skills.passing * .5 + player.skills.dribbling * .2 + player.skills.mentality * .15 + player.overall * .15);
		return {
			playerName: player.name,
			playerId: player.playerId,
			weight
		};
	});
}
function pickWeighted(items, random) {
	const totalWeight = items.reduce((sum, item) => sum + Math.max(0, item.weight), 0);
	if (totalWeight <= 0) return void 0;
	let target = random.next() * totalWeight;
	for (const item of items) {
		target -= Math.max(0, item.weight);
		if (target <= 0) return item;
	}
	return items[items.length - 1];
}
function randomMinute(random) {
	return clamp$1(Math.round(1 + random.next() * 93), 1, 95);
}
function generateUserGoalEvents(params) {
	const { goals, teamName, selectedPlayers, random } = params;
	const scorerCandidates = getScorerCandidates(selectedPlayers);
	const assistCandidates = getAssistCandidates(selectedPlayers);
	const events = [];
	for (let i = 0; i < goals; i += 1) {
		const scorer = pickWeighted(scorerCandidates, random);
		const possibleAssisters = assistCandidates.filter((candidate) => candidate.playerId !== scorer?.playerId);
		const assistant = random.next() < .72 ? pickWeighted(possibleAssisters, random) : void 0;
		events.push({
			minute: randomMinute(random),
			teamName,
			scorerName: scorer?.playerName,
			assistName: assistant?.playerName
		});
	}
	return events.sort((a, b) => a.minute - b.minute);
}
function generateRivalGoalEvents(params) {
	const { goals, teamName, random } = params;
	const events = [];
	for (let i = 0; i < goals; i += 1) events.push({
		minute: randomMinute(random),
		teamName
	});
	return events.sort((a, b) => a.minute - b.minute);
}
/**
* Simula un partido individual del Athletic histórico contra un rival 25/26.
*/
function simulateMatch(params) {
	const { fixtureId, matchday, userTeamName = "Once histórico Zurigorri", rival, venue, teamRating, selectedPlayers, seed } = params;
	const random = createRandom(seed);
	const userIsHome = venue === "home";
	const difficulty = getFixtureDifficultyModifier({
		teamRating,
		rival,
		userIsHome
	});
	const userExpectedGoals = calculateExpectedGoals({
		attack: teamRating.attack - difficulty.userAttackPenalty,
		control: teamRating.control - difficulty.userAttackPenalty * .35,
		mentality: teamRating.mentality,
		opponentDefense: rival.ratings.defense,
		opponentGoalkeeping: rival.ratings.goalkeeping,
		opponentMentality: rival.ratings.mentality,
		isHome: userIsHome,
		riskModifier: (teamRating.attack - teamRating.defense) * .65
	});
	const rivalExpectedGoals = calculateExpectedGoals({
		attack: rival.ratings.attack + difficulty.rivalAttackBonus,
		control: rival.ratings.midfield + difficulty.rivalAttackBonus * .5,
		mentality: rival.ratings.mentality,
		opponentDefense: teamRating.defense - difficulty.userDefensePenalty,
		opponentGoalkeeping: teamRating.goalkeeping,
		opponentMentality: teamRating.mentality,
		isHome: !userIsHome,
		riskModifier: (rival.ratings.attack - rival.ratings.defense) * .65
	});
	let userGoals = sampleGoalsFromExpectedGoals(userExpectedGoals, random);
	let rivalGoals = sampleGoalsFromExpectedGoals(rivalExpectedGoals, random);
	const varianceAdjusted = applyUnderdogAndDrawVariance({
		userGoals,
		rivalGoals,
		teamRating,
		rival,
		userIsHome,
		random
	});
	userGoals = varianceAdjusted.userGoals;
	rivalGoals = varianceAdjusted.rivalGoals;
	/**
	* Mentalidad en partidos igualados:
	* si el partido está empatado y hay diferencia de mentalidad notable,
	* existe una pequeña probabilidad de gol decisivo.
	*/
	const mentalityDiff = teamRating.mentality - rival.ratings.mentality;
	if (userGoals === rivalGoals && Math.abs(mentalityDiff) >= 8 && random.next() < .18) if (mentalityDiff > 0) userGoals += 1;
	else rivalGoals += 1;
	const normalized = userIsHome ? normalizeScore(userGoals, rivalGoals, random) : normalizeScore(rivalGoals, userGoals, random);
	const homeGoals = normalized.homeGoals;
	const awayGoals = normalized.awayGoals;
	userGoals = userIsHome ? homeGoals : awayGoals;
	rivalGoals = userIsHome ? awayGoals : homeGoals;
	const userGoalEvents = generateUserGoalEvents({
		goals: userGoals,
		teamName: userTeamName,
		selectedPlayers,
		random
	});
	const rivalGoalEvents = generateRivalGoalEvents({
		goals: rivalGoals,
		teamName: rival.name,
		random
	});
	const goalEvents = [...userGoalEvents, ...rivalGoalEvents].sort((a, b) => a.minute - b.minute);
	const userTeamWon = userGoals > rivalGoals;
	const userTeamDrew = userGoals === rivalGoals;
	const userTeamLost = userGoals < rivalGoals;
	return {
		fixtureId,
		matchday,
		homeTeamName: userIsHome ? userTeamName : rival.name,
		awayTeamName: userIsHome ? rival.name : userTeamName,
		homeGoals,
		awayGoals,
		goalEvents,
		userTeamPlayed: true,
		userTeamWon,
		userTeamDrew,
		userTeamLost,
		cleanSheetForUserTeam: rivalGoals === 0
	};
}
/**
* Actualiza estadísticas individuales del Athletic histórico tras un partido.
*/
function updateUserPlayerStatsFromMatch(params) {
	const { currentStats, matchResult, selectedPlayers, userTeamName = "Once histórico Zurigorri" } = params;
	const statsByPlayerId = /* @__PURE__ */ new Map();
	for (const stat of currentStats) statsByPlayerId.set(stat.playerId, { ...stat });
	for (const selected of selectedPlayers) {
		const player = selected.playerSeason;
		if (!statsByPlayerId.has(player.playerId)) statsByPlayerId.set(player.playerId, {
			playerId: player.playerId,
			playerName: player.name,
			goals: 0,
			assists: 0,
			cleanSheets: 0
		});
	}
	for (const event of matchResult.goalEvents) {
		if (event.teamName !== userTeamName) continue;
		if (event.scorerName) {
			const scorer = selectedPlayers.find((selected) => selected.playerSeason.name === event.scorerName);
			if (scorer) {
				const stat = statsByPlayerId.get(scorer.playerSeason.playerId);
				if (stat) stat.goals += 1;
			}
		}
		if (event.assistName) {
			const assistant = selectedPlayers.find((selected) => selected.playerSeason.name === event.assistName);
			if (assistant) {
				const stat = statsByPlayerId.get(assistant.playerSeason.playerId);
				if (stat) stat.assists += 1;
			}
		}
	}
	if (matchResult.cleanSheetForUserTeam) for (const selected of selectedPlayers) {
		if (selected.position !== "POR") continue;
		const stat = statsByPlayerId.get(selected.playerSeason.playerId);
		if (stat) stat.cleanSheets += 1;
	}
	return Array.from(statsByPlayerId.values());
}
//#endregion
//#region src/simulation/leagueSimulator.ts
function clamp(value, min, max) {
	return Math.max(min, Math.min(max, value));
}
var SIMULATION_SESSION_SALT = Date.now() + Math.floor(Math.random() * 1e6);
function seededRandom(seed) {
	const x = Math.sin(seed + SIMULATION_SESSION_SALT) * 1e4;
	return x - Math.floor(x);
}
var EXTRA_COPA_TEAMS = [
	createCupTeam("cd_mirandes", "Club Deportivo Mirandés", 72, "red_shirt"),
	createCupTeam("real_zaragoza", "Real Zaragoza", 73, "white_blue_shirt"),
	createCupTeam("sporting_gijon", "Real Sporting de Gijón", 72, "red_white_shirt"),
	createCupTeam("cd_tenerife", "Club Deportivo Tenerife", 71, "white_blue_shirt"),
	createCupTeam("racing_santander", "Real Racing Club de Santander", 72, "green_white_shirt"),
	createCupTeam("deportivo_coruna", "Real Club Deportivo de La Coruña", 72, "blue_white_shirt"),
	createCupTeam("albacete", "Albacete Balompié", 70, "white_shirt"),
	createCupTeam("cd_alcoyano", "Club Deportivo Alcoyano", 65, "blue_white_shirt"),
	createCupTeam("cultural_leonesa", "Cultural y Deportiva Leonesa", 67, "white_shirt"),
	createCupTeam("cadiz_cf", "Cádiz Club de Fútbol", 72, "yellow_blue_shirt"),
	createCupTeam("malaga_cf", "Málaga Club de Fútbol", 70, "blue_white_shirt"),
	createCupTeam("cd_numancia", "Club Deportivo Numancia de Soria", 66, "red_shirt"),
	createCupTeam("ud_almeria", "Unión Deportiva Almería", 73, "red_white_shirt"),
	createCupTeam("ad_alcorcon", "Agrupación Deportiva Alcorcón", 65, "yellow_blue_shirt"),
	createCupTeam("cd_badajoz", "Club Deportivo Badajoz", 64, "black_white_shirt"),
	createCupTeam("cd_castellon", "Club Deportivo Castellón", 67, "white_black_shirt"),
	createCupTeam("sd_eibar", "Sociedad Deportiva Eibar", 72, "blue_red_shirt"),
	createCupTeam("burgos_cf", "Burgos Club de Fútbol", 70, "white_black_shirt"),
	createCupTeam("ud_las_palmas", "Unión Deportiva Las Palmas", 74, "yellow_blue_shirt"),
	createCupTeam("cordoba_cf", "Córdoba Club de Fútbol", 68, "green_white_shirt"),
	createCupTeam("granada_cf", "Granada Club de Fútbol", 72, "red_white_shirt"),
	createCupTeam("sd_huesca", "Sociedad Deportiva Huesca", 70, "blue_red_shirt"),
	createCupTeam("barakaldo_cf", "Barakaldo Club de Fútbol", 62, "yellow_black_shirt"),
	createCupTeam("sestao_river", "Sestao River Club", 62, "green_black_shirt"),
	createCupTeam("club_portugalete", "Club Portugalete", 61, "yellow_black_shirt")
];
function createCupTeam(id, name, overall, shirtIcon) {
	return {
		id,
		name,
		shirtIcon,
		ratings: {
			attack: clamp(overall + seededSignedOffset(id, 1), 55, 88),
			midfield: clamp(overall + seededSignedOffset(id, 2), 55, 88),
			defense: clamp(overall + seededSignedOffset(id, 3), 55, 88),
			goalkeeping: clamp(overall + seededSignedOffset(id, 4), 55, 88),
			mentality: clamp(overall + seededSignedOffset(id, 5), 55, 90),
			overall
		}
	};
}
function seededSignedOffset(id, salt) {
	const seed = id.split("").reduce((sum, char) => sum + char.charCodeAt(0), salt * 19);
	return Math.round(seededRandom(seed) * 6 - 3);
}
function createLeagueSeasonSalt() {
	return Date.now() + Math.floor(Math.random() * 1e6);
}
function hashString(value) {
	let hash = 0;
	for (let index = 0; index < value.length; index += 1) hash = (hash * 31 + value.charCodeAt(index)) % 1000003;
	return hash;
}
function getTeamSeasonForm(team, seasonSalt) {
	const roll = seededRandom(seasonSalt + hashString(team.id) * 17);
	const overall = team.ratings.overall;
	if (overall >= 86) {
		if (roll < .12) return -2;
		if (roll < .34) return -1;
		if (roll < .72) return 0;
		if (roll < .92) return 1;
		return 2;
	}
	if (overall >= 81) {
		if (roll < .08) return -3;
		if (roll < .25) return -2;
		if (roll < .48) return -1;
		if (roll < .72) return 0;
		if (roll < .9) return 2;
		return 3;
	}
	if (overall >= 78) {
		if (roll < .1) return -4;
		if (roll < .25) return -2;
		if (roll < .45) return -1;
		if (roll < .62) return 0;
		if (roll < .8) return 2;
		if (roll < .94) return 4;
		return 5;
	}
	if (overall >= 76) {
		if (roll < .1) return -5;
		if (roll < .24) return -3;
		if (roll < .42) return -1;
		if (roll < .58) return 0;
		if (roll < .76) return 2;
		if (roll < .91) return 4;
		return 6;
	}
	if (roll < .1) return -6;
	if (roll < .22) return -4;
	if (roll < .38) return -2;
	if (roll < .55) return 0;
	if (roll < .73) return 3;
	if (roll < .9) return 5;
	return 7;
}
function applyRatingDelta(value, delta) {
	return clamp(Math.round(value + delta), 45, 99);
}
function applySeasonFormToRival(team, seasonSalt) {
	const form = getTeamSeasonForm(team, seasonSalt);
	if (form === 0) return team;
	return {
		...team,
		ratings: {
			attack: applyRatingDelta(team.ratings.attack, form * .9),
			midfield: applyRatingDelta(team.ratings.midfield, form),
			defense: applyRatingDelta(team.ratings.defense, form),
			goalkeeping: applyRatingDelta(team.ratings.goalkeeping, form * .65),
			mentality: applyRatingDelta(team.ratings.mentality, form * .8),
			overall: applyRatingDelta(team.ratings.overall, form)
		}
	};
}
function getMatchNoise(seed, amplitude = .16) {
	return (seededRandom(seed) - .5) * amplitude;
}
function getAllCupTeams() {
	const laligaTeams = getLaliga2526RivalsExcludingAthletic();
	const extraById = new Map(EXTRA_COPA_TEAMS.map((team) => [team.id, team]));
	return [...laligaTeams, ...extraById.values()];
}
function getCupTeamById(teamId) {
	return getLaliga2526TeamById(teamId) ?? EXTRA_COPA_TEAMS.find((team) => team.id === teamId);
}
function pickCupRival(params) {
	const { pool, minOverall, maxOverall, usedTeamIds, seed } = params;
	const candidates = pool.filter((team) => !usedTeamIds.has(team.id) && team.ratings.overall >= minOverall && team.ratings.overall <= maxOverall);
	const fallbackCandidates = pool.filter((team) => !usedTeamIds.has(team.id));
	const source = candidates.length > 0 ? candidates : fallbackCandidates;
	const selected = source[Math.floor(seededRandom(seed) * source.length)] ?? source[0];
	usedTeamIds.add(selected.id);
	return selected;
}
function createCupPathSeed() {
	return Math.floor(Date.now() % 1e5) + Math.floor(Math.random() * 1e5);
}
function getCupVenue(params) {
	const { rival, roundId, seed } = params;
	if (roundId === "final") return "away";
	const rivalOverall = rival.ratings.overall;
	const roll = seededRandom(seed);
	if (rivalOverall <= 66) return roll < .78 ? "away" : "home";
	if (rivalOverall <= 72) return roll < .66 ? "away" : "home";
	if (rivalOverall <= 78) return roll < .56 ? "away" : "home";
	return roll < .5 ? "away" : "home";
}
function createRealisticCupPath(seed = createCupPathSeed()) {
	const pool = getAllCupTeams();
	const usedTeamIds = /* @__PURE__ */ new Set();
	const roundOf32 = pickCupRival({
		pool,
		minOverall: 60,
		maxOverall: 73,
		usedTeamIds,
		seed: seed + 32
	});
	const roundOf16 = pickCupRival({
		pool,
		minOverall: 64,
		maxOverall: 80,
		usedTeamIds,
		seed: seed + 116
	});
	const quarterFinal = pickCupRival({
		pool,
		minOverall: 68,
		maxOverall: 86,
		usedTeamIds,
		seed: seed + 208
	});
	const semiFinal = pickCupRival({
		pool,
		minOverall: 72,
		maxOverall: 90,
		usedTeamIds,
		seed: seed + 304
	});
	const final = pickCupRival({
		pool,
		minOverall: 74,
		maxOverall: 92,
		usedTeamIds,
		seed: seed + 402
	});
	return [
		{
			id: `copa_round_of_32_${roundOf32.id}_${seed}`,
			roundId: "round_of_32",
			roundName: "Dieciseisavos",
			order: 1,
			gateMatchday: 18,
			rivalTeamId: roundOf32.id,
			venue: getCupVenue({
				rival: roundOf32,
				roundId: "round_of_32",
				seed: seed + 321
			}),
			played: false
		},
		{
			id: `copa_round_of_16_${roundOf16.id}_${seed}`,
			roundId: "round_of_16",
			roundName: "Octavos",
			order: 2,
			gateMatchday: 22,
			rivalTeamId: roundOf16.id,
			venue: getCupVenue({
				rival: roundOf16,
				roundId: "round_of_16",
				seed: seed + 1616
			}),
			played: false
		},
		{
			id: `copa_quarter_final_${quarterFinal.id}_${seed}`,
			roundId: "quarter_final",
			roundName: "Cuartos",
			order: 3,
			gateMatchday: 26,
			rivalTeamId: quarterFinal.id,
			venue: getCupVenue({
				rival: quarterFinal,
				roundId: "quarter_final",
				seed: seed + 808
			}),
			played: false
		},
		{
			id: `copa_semi_final_${semiFinal.id}_${seed}`,
			roundId: "semi_final",
			roundName: "Semifinal",
			order: 4,
			gateMatchday: 31,
			rivalTeamId: semiFinal.id,
			venue: getCupVenue({
				rival: semiFinal,
				roundId: "semi_final",
				seed: seed + 404
			}),
			played: false
		},
		{
			id: `copa_final_${final.id}_${seed}`,
			roundId: "final",
			roundName: "Final",
			order: 5,
			gateMatchday: 35,
			rivalTeamId: final.id,
			venue: "away",
			played: false
		}
	];
}
function createInitialUserTeamStats(selectedPlayers = []) {
	const initialPlayerStats = selectedPlayers.map((selected) => ({
		playerId: selected.playerSeason.playerId,
		playerName: selected.playerSeason.name,
		goals: 0,
		assists: 0,
		cleanSheets: 0
	}));
	return {
		goalsFor: 0,
		goalsAgainst: 0,
		cleanSheets: 0,
		topScorers: initialPlayerStats,
		topAssisters: initialPlayerStats
	};
}
function createSyntheticFullLeagueCalendar(params) {
	const { userFixtures, rivals } = params;
	const rivalIds = rivals.map((rival) => rival.id).filter((id) => id !== USER_TEAM_ID);
	const fullFixtures = [];
	for (const userFixture of userFixtures) {
		fullFixtures.push(userFixture);
		const alreadyPlaying = new Set([userFixture.homeTeamId, userFixture.awayTeamId]);
		const available = rivalIds.filter((teamId) => !alreadyPlaying.has(teamId));
		const rotation = userFixture.matchday % available.length;
		const rotated = [...available.slice(rotation), ...available.slice(0, rotation)];
		for (let i = 0; i < rotated.length; i += 2) {
			const first = rotated[i];
			const second = rotated[i + 1];
			if (!first || !second) continue;
			const flipHome = (userFixture.matchday + i) % 2 === 0;
			const homeTeamId = flipHome ? first : second;
			const awayTeamId = flipHome ? second : first;
			fullFixtures.push({
				id: `md${String(userFixture.matchday).padStart(2, "0")}_${homeTeamId}_vs_${awayTeamId}`,
				matchday: userFixture.matchday,
				date: userFixture.date,
				homeTeamId,
				awayTeamId,
				includesUserTeam: false,
				sourceRefs: ["synthetic-balanced-full-laliga-calendar"]
			});
		}
	}
	return fullFixtures.sort((a, b) => {
		if (a.matchday !== b.matchday) return a.matchday - b.matchday;
		if (a.includesUserTeam !== b.includesUserTeam) return a.includesUserTeam ? -1 : 1;
		return a.id.localeCompare(b.id);
	});
}
function createInitialCupState() {
	return {
		status: "active",
		currentRoundIndex: 0,
		fixtures: createRealisticCupPath(),
		results: [],
		simulatedRemainingResults: []
	};
}
function createUserLeagueSimulation(params = {}) {
	const { userTeamName = USER_TEAM_NAME, rivals = getLaliga2526RivalsExcludingAthletic(), fixtures = getLaliga2526UserTeamFixtures() } = params;
	const leagueSeasonSalt = createLeagueSeasonSalt();
	return {
		state: createLeagueSimulationState({
			fixtures: createSyntheticFullLeagueCalendar({
				userFixtures: fixtures,
				rivals
			}),
			rivals,
			userTeamName
		}),
		userTeamStats: createInitialUserTeamStats(),
		cupState: createInitialCupState(),
		leagueSeasonSalt
	};
}
function getRivalFromFixture(fixture) {
	const userIsHome = fixture.homeTeamId === USER_TEAM_ID;
	const userIsAway = fixture.awayTeamId === USER_TEAM_ID;
	if (!userIsHome && !userIsAway) throw new Error(`El fixture ${fixture.id} no incluye al equipo del usuario (${USER_TEAM_ID}).`);
	const rivalTeamId = userIsHome ? fixture.awayTeamId : fixture.homeTeamId;
	const rival = getLaliga2526TeamById(rivalTeamId);
	if (!rival) throw new Error(`No se encontró el rival con id: ${rivalTeamId}`);
	return {
		rival,
		venue: userIsHome ? "home" : "away"
	};
}
function getAverageRivalRating(team) {
	return team.ratings.attack * .24 + team.ratings.midfield * .22 + team.ratings.defense * .22 + team.ratings.goalkeeping * .16 + team.ratings.mentality * .16;
}
function sampleGoals(expectedGoals, seedBase) {
	const roll = seededRandom(seedBase);
	const raw = expectedGoals + (seededRandom(seedBase + 9) - .5) * .85;
	if (roll < .16) return Math.max(0, Math.floor(raw - .55));
	if (roll > .91) return clamp(Math.round(raw + 1), 0, 5);
	return clamp(Math.round(raw), 0, 5);
}
function simulateRivalVsRivalMatch(params) {
	const { fixture, seedOffset, seasonSalt = SIMULATION_SESSION_SALT } = params;
	const home = getLaliga2526TeamById(fixture.homeTeamId);
	const away = getLaliga2526TeamById(fixture.awayTeamId);
	if (!home || !away) throw new Error(`No se pudo simular el partido: ${fixture.homeTeamId} vs ${fixture.awayTeamId}`);
	const homeAverage = getAverageRivalRating(home) + getTeamSeasonForm(home, seasonSalt);
	const awayAverage = getAverageRivalRating(away) + getTeamSeasonForm(away, seasonSalt);
	const homeDiff = homeAverage - awayAverage;
	const awayDiff = awayAverage - homeAverage;
	const homeExpected = clamp(1.15 + homeDiff / 38 + .16, .25, 3.1);
	const awayExpected = clamp(1.05 + awayDiff / 38 - .14, .2, 2.9);
	const matchSeed = fixture.matchday * 101 + seedOffset + Math.floor(seasonSalt % 1e5);
	const homeExpectedWithNoise = clamp(homeExpected + getMatchNoise(matchSeed + 5), .2, 3.25);
	const awayExpectedWithNoise = clamp(awayExpected + getMatchNoise(matchSeed + 17), .18, 3.05);
	let homeGoals = sampleGoals(homeExpectedWithNoise, matchSeed);
	let awayGoals = sampleGoals(awayExpectedWithNoise, matchSeed + 17);
	if (Math.abs(homeGoals - awayGoals) >= 4) {
		if (seededRandom(matchSeed + fixture.matchday * 37) < .55) if (homeGoals > awayGoals) homeGoals -= 1;
		else awayGoals -= 1;
	}
	return {
		fixtureId: fixture.id,
		matchday: fixture.matchday,
		competition: "league",
		homeTeamName: home.name,
		awayTeamName: away.name,
		homeGoals,
		awayGoals,
		goalEvents: [],
		userTeamPlayed: false
	};
}
function applyResultsToState(params) {
	const { results, userTeamName } = params;
	return results.reduce((currentState, result) => applyMatchResultToLeagueState({
		state: currentState,
		result,
		userTeamName
	}), params.state);
}
function updateUserTeamStats(params) {
	const { currentStats, result, selectedPlayers, userTeamName } = params;
	const userIsHome = result.homeTeamName === userTeamName;
	const userGoals = userIsHome ? result.homeGoals : result.awayGoals;
	const rivalGoals = userIsHome ? result.awayGoals : result.homeGoals;
	const updatedPlayerStats = updateUserPlayerStatsFromMatch({
		currentStats: currentStats.topScorers,
		matchResult: result,
		selectedPlayers,
		userTeamName
	});
	const sortedTopScorers = [...updatedPlayerStats].sort((a, b) => {
		if (b.goals !== a.goals) return b.goals - a.goals;
		if (b.assists !== a.assists) return b.assists - a.assists;
		return a.playerName.localeCompare(b.playerName);
	});
	const sortedTopAssisters = [...updatedPlayerStats].sort((a, b) => {
		if (b.assists !== a.assists) return b.assists - a.assists;
		if (b.goals !== a.goals) return b.goals - a.goals;
		return a.playerName.localeCompare(b.playerName);
	});
	return {
		goalsFor: currentStats.goalsFor + userGoals,
		goalsAgainst: currentStats.goalsAgainst + rivalGoals,
		cleanSheets: currentStats.cleanSheets + (rivalGoals === 0 ? 1 : 0),
		topScorers: sortedTopScorers,
		topAssisters: sortedTopAssisters
	};
}
function getPendingCupFixture(context) {
	if (context.cupState.status !== "active") return void 0;
	const currentFixture = context.cupState.fixtures[context.cupState.currentRoundIndex];
	if (!currentFixture || currentFixture.played) return void 0;
	if ((context.state.table.find((row) => row.teamId === "athletic_historico")?.played ?? 0) >= currentFixture.gateMatchday) return currentFixture;
}
function getCupStatusLabel(cupState) {
	if (cupState.status === "won") return "Campeón de Copa";
	if (cupState.status === "eliminated") {
		const lastResult = cupState.results[cupState.results.length - 1];
		const eliminatedLabel = lastResult?.roundName ? `Eliminado en ${lastResult.roundName}` : "Eliminado en Copa";
		return cupState.championTeamName ? `${eliminatedLabel} · Campeón: ${cupState.championTeamName}` : eliminatedLabel;
	}
	const nextFixture = cupState.fixtures[cupState.currentRoundIndex];
	return nextFixture ? `Pendiente: ${nextFixture.roundName}` : "Copa pendiente";
}
function simulateNextUserLeagueMatch(params) {
	const { context, teamRating, selectedPlayers, userTeamName = USER_TEAM_NAME, seed } = params;
	if (context.state.completed) return { context };
	if (getPendingCupFixture(context)) return {
		context,
		stoppedForCup: true
	};
	const pendingFixtures = getPendingFixturesForCurrentMatchday(context.state);
	if (pendingFixtures.length === 0) return { context: {
		...context,
		state: {
			...context.state,
			completed: true
		}
	} };
	const userFixture = pendingFixtures.find((fixture) => fixture.includesUserTeam);
	const otherFixtures = pendingFixtures.filter((fixture) => !fixture.includesUserTeam);
	if (!userFixture) throw new Error(`No se encontró partido del Athletic Club Histórico en la jornada ${context.state.currentMatchday}.`);
	const { rival, venue } = getRivalFromFixture(userFixture);
	const leagueSeasonSalt = context.leagueSeasonSalt ?? SIMULATION_SESSION_SALT;
	const formAdjustedRival = applySeasonFormToRival(rival, leagueSeasonSalt);
	const leagueUserResult = {
		...simulateMatch({
			fixtureId: userFixture.id,
			matchday: userFixture.matchday,
			userTeamName,
			rival: formAdjustedRival,
			venue,
			teamRating,
			selectedPlayers,
			seed: typeof seed === "number" ? seed + context.state.results.length : void 0
		}),
		competition: "league"
	};
	const otherResults = otherFixtures.map((fixture, index) => simulateRivalVsRivalMatch({
		fixture,
		seedOffset: context.state.results.length + index + 1,
		seasonSalt: leagueSeasonSalt
	}));
	const nextState = applyResultsToState({
		state: context.state,
		results: [leagueUserResult, ...otherResults],
		userTeamName
	});
	const nextUserTeamStats = updateUserTeamStats({
		currentStats: context.userTeamStats,
		result: leagueUserResult,
		selectedPlayers,
		userTeamName
	});
	return {
		context: {
			...context,
			state: nextState,
			userTeamStats: nextUserTeamStats
		},
		result: leagueUserResult
	};
}
function simulateFullUserLeague(params) {
	const { teamRating, selectedPlayers, userTeamName = USER_TEAM_NAME, seed } = params;
	let context = params.context;
	while (!context.state.completed) {
		if (getPendingCupFixture(context)) break;
		const simulation = simulateNextUserLeagueMatch({
			context,
			teamRating,
			selectedPlayers,
			userTeamName,
			seed
		});
		context = simulation.context;
		if (!simulation.result || simulation.stoppedForCup) break;
	}
	return context;
}
function getCoachCompetitionBoost(context, competition) {
	const coach = context.selectedCoach?.coachSeason;
	if (!coach?.skills) return 0;
	const rawValue = competition === "cup" ? coach.skills.cup : competition === "europe" ? coach.skills.europe : coach.skills.management;
	if (typeof rawValue !== "number") return 0;
	let boost = 0;
	if (rawValue >= 92) boost = 3;
	else if (rawValue >= 86) boost = 2;
	else if (rawValue >= 80) boost = 1;
	else if (rawValue <= 58) boost = -1;
	if ((coach.dataConfidence ?? 1) < .55 && boost > 1) boost -= 1;
	return boost;
}
function applyCoachCompetitionBoostToTeamRating(teamRating, boost) {
	if (boost === 0) return teamRating;
	return {
		...teamRating,
		attack: clamp(teamRating.attack + Math.round(boost * .45), 40, 99),
		defense: clamp(teamRating.defense + Math.round(boost * .35), 40, 99),
		control: clamp(teamRating.control + Math.round(boost * .45), 40, 99),
		physical: clamp(teamRating.physical + Math.round(boost * .25), 40, 99),
		mentality: clamp(teamRating.mentality + boost, 40, 99),
		overall: clamp(teamRating.overall + Math.round(boost * .35), 40, 99)
	};
}
function getCupRoundChaos(roundId) {
	if (roundId === "round_of_32") return .58;
	if (roundId === "round_of_16") return .48;
	if (roundId === "quarter_final") return .34;
	if (roundId === "semi_final") return .22;
	return .12;
}
function getCupUnderdogBoost(params) {
	const { underdogAverage, favoriteAverage, underdogIsHome, roundId } = params;
	const ratingGap = favoriteAverage - underdogAverage;
	if (ratingGap < 4) return underdogIsHome ? 1 : 0;
	const baseBoost = ratingGap * getCupRoundChaos(roundId) * .13;
	return clamp(Math.round(baseBoost + (underdogIsHome ? 2.2 : .4)), 0, 8);
}
function applyCupRivalContext(params) {
	const { rival, userRating, venue, roundId } = params;
	const rivalAverage = getAverageRivalRating(rival);
	const userAverage = userRating.overall;
	if (rivalAverage >= userAverage) {
		const userHomeUnderdogBoost = venue === "home" ? getCupUnderdogBoost({
			underdogAverage: userAverage,
			favoriteAverage: rivalAverage,
			underdogIsHome: true,
			roundId
		}) : 0;
		return {
			rival,
			userRating: {
				...userRating,
				attack: clamp(userRating.attack + Math.round(userHomeUnderdogBoost * .35), 40, 99),
				defense: clamp(userRating.defense + Math.round(userHomeUnderdogBoost * .35), 40, 99),
				control: clamp(userRating.control + Math.round(userHomeUnderdogBoost * .25), 40, 99),
				mentality: clamp(userRating.mentality + userHomeUnderdogBoost, 40, 99),
				overall: clamp(userRating.overall + Math.round(userHomeUnderdogBoost * .25), 40, 99)
			}
		};
	}
	const rivalIsHome = venue === "away";
	const underdogBoost = getCupUnderdogBoost({
		underdogAverage: rivalAverage,
		favoriteAverage: userAverage,
		underdogIsHome: rivalIsHome,
		roundId
	});
	const favoriteAwayPressure = rivalIsHome && underdogBoost >= 3 ? 1 : 0;
	return {
		rival: {
			...rival,
			ratings: {
				...rival.ratings,
				attack: clamp(rival.ratings.attack + underdogBoost, 40, 99),
				midfield: clamp(rival.ratings.midfield + Math.round(underdogBoost * .75), 40, 99),
				defense: clamp(rival.ratings.defense + Math.round(underdogBoost * .75), 40, 99),
				goalkeeping: clamp(rival.ratings.goalkeeping + Math.round(underdogBoost * .45), 40, 99),
				mentality: clamp(rival.ratings.mentality + underdogBoost + (rivalIsHome ? 1 : 0), 40, 99),
				overall: clamp(rival.ratings.overall + Math.round(underdogBoost * .6), 40, 99)
			}
		},
		userRating: {
			...userRating,
			attack: clamp(userRating.attack - favoriteAwayPressure, 40, 99),
			defense: clamp(userRating.defense - favoriteAwayPressure, 40, 99),
			control: clamp(userRating.control - favoriteAwayPressure, 40, 99),
			mentality: clamp(userRating.mentality + 1, 40, 99),
			overall: clamp(userRating.overall - favoriteAwayPressure, 40, 99)
		}
	};
}
function applyCupEliteBalance(params) {
	const { expected, teamAverage, opponentAverage, roundId, isHome } = params;
	const ratingDiff = teamAverage - opponentAverage;
	let balancedExpected = expected;
	if (teamAverage >= 89 && opponentAverage >= 80 && ratingDiff >= 4) {
		if (roundId === "final") balancedExpected -= .2;
		else if (roundId === "semi_final") balancedExpected -= .14;
		else if (roundId === "quarter_final") balancedExpected -= .08;
	}
	if (teamAverage >= 80 && opponentAverage >= 89 && ratingDiff <= -4) {
		if (roundId === "final") balancedExpected += .22;
		else if (roundId === "semi_final") balancedExpected += .16;
		else if (roundId === "quarter_final") balancedExpected += .1;
	}
	if (roundId === "final" && !isHome) balancedExpected += .06;
	return balancedExpected;
}
function getCupTeamExpectedGoals(params) {
	const { team, opponent, isHome, roundId, seed } = params;
	const teamAverage = getAverageRivalRating(team);
	const opponentAverage = getAverageRivalRating(opponent);
	const ratingDiff = teamAverage - opponentAverage;
	const teamIsUnderdog = teamAverage + 3 < opponentAverage;
	const teamIsFavorite = teamAverage > opponentAverage + 3;
	const roundChaos = getCupRoundChaos(roundId);
	const chaosRoll = seededRandom(seed);
	let expected = 1.02 + ratingDiff / 48 + (isHome ? .16 : -.05);
	if (teamIsUnderdog) {
		expected += roundChaos * .28;
		if (isHome) expected += .28 + roundChaos * .22;
		if (chaosRoll > .82 - roundChaos * .22) expected += .42;
	}
	if (teamIsFavorite && !isHome) expected -= roundChaos * .13;
	return clamp(applyCupEliteBalance({
		expected,
		teamAverage,
		opponentAverage,
		roundId,
		isHome
	}), .22, 3.15);
}
function getCupUnderdogRoundFatigue(roundId) {
	if (roundId === "quarter_final") return 1;
	if (roundId === "semi_final") return 2;
	if (roundId === "final") return 3;
	return 0;
}
function adjustCupRivalByVenueAndRound(params) {
	const { rival, venue, roundId } = params;
	const overall = rival.ratings.overall;
	const isVerySmall = overall <= 70;
	if (!(overall <= 76)) return rival;
	const fatigue = getCupUnderdogRoundFatigue(roundId);
	const adjustment = venue === "away" ? clamp((isVerySmall ? 4 : 2) - fatigue, 0, 4) : -clamp((isVerySmall ? 6 : 3) + fatigue, 1, 8);
	const adjust = (value, min = 45, max = 92) => clamp(value + adjustment, min, max);
	return {
		...rival,
		ratings: {
			attack: adjust(rival.ratings.attack),
			midfield: adjust(rival.ratings.midfield),
			defense: adjust(rival.ratings.defense),
			goalkeeping: adjust(rival.ratings.goalkeeping),
			mentality: adjust(rival.ratings.mentality, 45, 94),
			overall: adjust(rival.ratings.overall)
		}
	};
}
function getCupRivalFromFixture(fixture) {
	const rival = getCupTeamById(fixture.rivalTeamId);
	if (!rival) throw new Error(`No se encontrÃ³ el rival de Copa con id: ${fixture.rivalTeamId}`);
	const venue = fixture.venue;
	return {
		rival: adjustCupRivalByVenueAndRound({
			rival,
			venue,
			roundId: fixture.roundId
		}),
		venue
	};
}
function resolveCupTie(result, seedBase) {
	if (result.homeGoals !== result.awayGoals) return result;
	const homeWinsTieBreaker = seededRandom(seedBase) >= .5;
	return {
		...result,
		homeGoals: homeWinsTieBreaker ? result.homeGoals + 1 : result.homeGoals,
		awayGoals: homeWinsTieBreaker ? result.awayGoals : result.awayGoals + 1
	};
}
function getCupWinnerFromResult(result) {
	const winnerIsHome = result.homeGoals > result.awayGoals;
	return {
		winnerName: winnerIsHome ? result.homeTeamName : result.awayTeamName,
		runnerUpName: winnerIsHome ? result.awayTeamName : result.homeTeamName,
		winnerIsHome
	};
}
function simulateCupTeamVsTeam(params) {
	const { roundName, roundId, matchday, home, away, seed } = params;
	const homeExpected = getCupTeamExpectedGoals({
		team: home,
		opponent: away,
		isHome: true,
		roundId,
		seed: seed + 11
	});
	const awayExpected = getCupTeamExpectedGoals({
		team: away,
		opponent: home,
		isHome: false,
		roundId,
		seed: seed + 29
	});
	return resolveCupTie({
		fixtureId: `copa_rest_${roundId}_${home.id}_vs_${away.id}`,
		matchday,
		competition: "cup",
		roundName,
		homeTeamName: home.name,
		awayTeamName: away.name,
		homeGoals: sampleGoals(homeExpected, seed + 11),
		awayGoals: sampleGoals(awayExpected, seed + 29),
		goalEvents: [],
		userTeamPlayed: false
	}, seed + 101);
}
function simulateRemainingCupAfterUserElimination(params) {
	const { cupState, eliminatedBy, eliminatedRoundIndex, seed } = params;
	const pool = getAllCupTeams();
	const usedTeamIds = new Set([
		USER_TEAM_ID,
		eliminatedBy.id,
		...cupState.fixtures.map((fixture) => fixture.rivalTeamId)
	]);
	let aliveTeam = eliminatedBy;
	const simulatedRemainingResults = [];
	let runnerUpTeam;
	for (let index = eliminatedRoundIndex + 1; index < cupState.fixtures.length; index += 1) {
		const fixture = cupState.fixtures[index];
		const opponent = pickCupRival({
			pool,
			minOverall: fixture.roundId === "final" ? 82 : fixture.roundId === "semi_final" ? 78 : 70,
			maxOverall: fixture.roundId === "final" ? 94 : fixture.roundId === "semi_final" ? 90 : 86,
			usedTeamIds,
			seed: (seed ?? 1300) + index * 37
		});
		const aliveAtHome = seededRandom((seed ?? 1300) + index * 53) >= .5;
		const home = aliveAtHome ? aliveTeam : opponent;
		const away = aliveAtHome ? opponent : aliveTeam;
		const result = simulateCupTeamVsTeam({
			roundName: fixture.roundName,
			roundId: fixture.roundId,
			matchday: fixture.gateMatchday,
			home,
			away,
			seed: (seed ?? 1300) + index * 101
		});
		simulatedRemainingResults.push(result);
		const winner = getCupWinnerFromResult(result);
		const winnerTeam = winner.winnerName === aliveTeam.name ? aliveTeam : opponent;
		const loserTeam = winner.runnerUpName === aliveTeam.name ? aliveTeam : opponent;
		aliveTeam = winnerTeam;
		runnerUpTeam = loserTeam;
	}
	return {
		...cupState,
		status: "eliminated",
		currentRoundIndex: Math.max(cupState.currentRoundIndex, eliminatedRoundIndex + 1),
		simulatedRemainingResults,
		championTeamId: aliveTeam.id,
		championTeamName: aliveTeam.name,
		runnerUpTeamId: runnerUpTeam?.id,
		runnerUpTeamName: runnerUpTeam?.name
	};
}
function simulateNextCupMatch(params) {
	const { context, teamRating, selectedPlayers, userTeamName = USER_TEAM_NAME, seed } = params;
	const pendingCupFixture = getPendingCupFixture(context);
	if (!pendingCupFixture) return { context };
	const { rival, venue } = getCupRivalFromFixture(pendingCupFixture);
	const cupContext = applyCupRivalContext({
		rival,
		userRating: teamRating,
		venue,
		roundId: pendingCupFixture.roundId
	});
	let cupResult = {
		...simulateMatch({
			fixtureId: pendingCupFixture.id,
			matchday: pendingCupFixture.gateMatchday,
			userTeamName,
			rival: cupContext.rival,
			venue,
			teamRating: applyCoachCompetitionBoostToTeamRating(cupContext.userRating, getCoachCompetitionBoost(context, "cup")),
			selectedPlayers,
			seed: typeof seed === "number" ? seed + context.cupState.results.length + 1e3 : void 0
		}),
		competition: "cup",
		roundName: pendingCupFixture.roundName
	};
	if (cupResult.userTeamDrew) {
		const tieBreakerSeed = (seed ?? Date.now()) + context.cupState.results.length * 73;
		const userAdvantage = (cupContext.userRating.mentality - cupContext.rival.ratings.mentality) / 80;
		const userWinsTieBreaker = seededRandom(tieBreakerSeed) < clamp(.5 + userAdvantage, .35, .68);
		const userIsHome = cupResult.homeTeamName === userTeamName;
		if (userWinsTieBreaker) cupResult = {
			...cupResult,
			homeGoals: userIsHome ? cupResult.homeGoals + 1 : cupResult.homeGoals,
			awayGoals: userIsHome ? cupResult.awayGoals : cupResult.awayGoals + 1,
			userTeamWon: true,
			userTeamDrew: false,
			userTeamLost: false
		};
		else cupResult = {
			...cupResult,
			homeGoals: userIsHome ? cupResult.homeGoals : cupResult.homeGoals + 1,
			awayGoals: userIsHome ? cupResult.awayGoals + 1 : cupResult.awayGoals,
			userTeamWon: false,
			userTeamDrew: false,
			userTeamLost: true,
			cleanSheetForUserTeam: false
		};
	}
	const nextFixtures = context.cupState.fixtures.map((fixture) => fixture.id === pendingCupFixture.id ? {
		...fixture,
		played: true
	} : fixture);
	const nextResults = [...context.cupState.results, cupResult];
	let nextCupState = {
		...context.cupState,
		fixtures: nextFixtures,
		results: nextResults
	};
	if (cupResult.userTeamLost) {
		const eliminatedBy = rival;
		nextCupState = simulateRemainingCupAfterUserElimination({
			cupState: {
				...nextCupState,
				status: "eliminated",
				userEliminatedRoundName: pendingCupFixture.roundName
			},
			eliminatedBy,
			eliminatedRoundIndex: context.cupState.currentRoundIndex,
			seed
		});
		if (pendingCupFixture.roundId === "final") nextCupState = {
			...nextCupState,
			championTeamId: rival.id,
			championTeamName: rival.name,
			runnerUpTeamId: USER_TEAM_ID,
			runnerUpTeamName: userTeamName,
			simulatedRemainingResults: []
		};
	} else if (pendingCupFixture.roundId === "final") nextCupState = {
		...nextCupState,
		status: "won",
		currentRoundIndex: context.cupState.currentRoundIndex + 1,
		championTeamId: USER_TEAM_ID,
		championTeamName: userTeamName,
		runnerUpTeamId: rival.id,
		runnerUpTeamName: rival.name,
		simulatedRemainingResults: []
	};
	else nextCupState = {
		...nextCupState,
		currentRoundIndex: context.cupState.currentRoundIndex + 1
	};
	const nextUserTeamStats = updateUserTeamStats({
		currentStats: context.userTeamStats,
		result: cupResult,
		selectedPlayers,
		userTeamName
	});
	return {
		context: {
			...context,
			cupState: nextCupState,
			userTeamStats: nextUserTeamStats
		},
		result: cupResult
	};
}
function simulateFullCupAndLeague(params) {
	let context = params.context;
	while (context.cupState.status === "active") {
		if (!getPendingCupFixture(context)) {
			const nextGate = context.cupState.fixtures[context.cupState.currentRoundIndex]?.gateMatchday;
			const playedLeagueMatches = context.state.table.find((row) => row.teamId === "athletic_historico")?.played ?? 0;
			if (!nextGate || playedLeagueMatches >= nextGate) break;
			context = simulateFullUserLeague({
				context,
				teamRating: params.teamRating,
				selectedPlayers: params.selectedPlayers,
				userTeamName: params.userTeamName,
				seed: params.seed
			});
			if (!getPendingCupFixture(context)) break;
		}
		const simulation = simulateNextCupMatch({
			...params,
			context
		});
		context = simulation.context;
		if (!simulation.result) break;
	}
	while (!context.state.completed && !getPendingCupFixture(context)) {
		const simulation = simulateNextUserLeagueMatch({
			context,
			teamRating: params.teamRating,
			selectedPlayers: params.selectedPlayers,
			userTeamName: params.userTeamName,
			seed: params.seed
		});
		context = simulation.context;
		if (!simulation.result || simulation.stoppedForCup) break;
	}
	return context;
}
function createTrophiesWon(summary) {
	return [
		{
			id: "liga",
			label: "Liga",
			count: summary.leaguePosition === 1 ? 1 : 0
		},
		{
			id: "copa_del_rey",
			label: "Copa del Rey",
			count: summary.cupTrophyWon ? 1 : 0
		},
		{
			id: "champions",
			label: "Champions League",
			count: 0
		},
		{
			id: "europa_league",
			label: "Europa League",
			count: 0
		},
		{
			id: "conference_league",
			label: "Conference League",
			count: 0
		},
		{
			id: "supercopa",
			label: "Supercopa de España",
			count: 0
		}
	];
}
function createFinalLeagueSummary(params) {
	const { gameId, formationName, coachName, context } = params;
	const summary = getUserLeagueSummary({
		table: context.state.table,
		userTeamId: USER_TEAM_ID
	});
	const row = summary.row;
	if (!row) throw new Error("No se pudo generar el resumen final: Athletic Club Histórico no está en la tabla.");
	const topScorer = context.userTeamStats.topScorers[0];
	const topAssister = context.userTeamStats.topAssisters[0];
	const cupRoundReached = getCupStatusLabel(context.cupState);
	const cupTrophyWon = context.cupState.status === "won";
	const leaguePosition = summary.position ?? 0;
	const trophiesWon = createTrophiesWon({
		leaguePosition,
		cupTrophyWon
	});
	return {
		gameId,
		formationName,
		coachName,
		leaguePosition,
		points: row.points,
		wins: row.won,
		draws: row.drawn,
		losses: row.lost,
		goalsFor: row.goalsFor,
		goalsAgainst: row.goalsAgainst,
		topScorer,
		topAssister,
		cleanSheets: context.userTeamStats.cleanSheets,
		table: sortLeagueTable(context.state.table),
		cupStatus: context.cupState.status,
		cupRoundReached,
		cupResults: context.cupState.results,
		cupTrophyWon,
		cupChampionTeamId: context.cupState.championTeamId,
		cupChampionTeamName: context.cupState.championTeamName,
		cupRunnerUpTeamId: context.cupState.runnerUpTeamId,
		cupRunnerUpTeamName: context.cupState.runnerUpTeamName,
		cupUserEliminatedRoundName: context.cupState.userEliminatedRoundName,
		cupSimulatedRemainingResults: context.cupState.simulatedRemainingResults,
		trophiesWon,
		finalLabel: createFinalLabel(row.points, leaguePosition || 20, cupTrophyWon),
		finalCategory: createFinalCategory(row.points, leaguePosition || 20, cupTrophyWon)
	};
}
function createFinalLabel(points, position, cupWon = false) {
	if (position === 1 && cupWon) return "Doblete histórico";
	if (position === 1 && points >= 90) return "Liga legendaria";
	if (position === 1) return "Campeón de Liga";
	if (cupWon && position <= 4) return "Temporada de título";
	if (position <= 4 && points >= 75) return "Temporada sobresaliente";
	if (position <= 4) return "Objetivo Champions conseguido";
	if (position <= 6) return "Temporada europea";
	if (position <= 10) return "Temporada correcta";
	if (position <= 15) return "Temporada irregular";
	return "Temporada decepcionante";
}
function createFinalCategory(points, position, cupWon = false) {
	if (position === 1 && cupWon) return "Doblete eterno de San Mamés";
	if (position === 1 && points >= 90) return "Leyenda eterna de San Mamés";
	if (position === 1) return "Campeón histórico";
	if (cupWon) return "Campeón de Copa y temporada memorable";
	if (position <= 4 && points >= 75) return "Equipo de época";
	if (position <= 4) return "Gran Athletic competitivo";
	if (position <= 6) return "Athletic europeo";
	if (position <= 10) return "Equipo competitivo pero no diferencial";
	if (position <= 15) return "Once con talento, pero desequilibrado";
	return "Proyecto fallido";
}
//#endregion
//#region reports/_tmp_v0_14_3c_balance/runner.ts
var RUNS = Number(process.env.AUDIT_RUNS ?? "10");
var teamRating = {
	attack: Number(process.env.AUDIT_ATTACK ?? "93"),
	defense: Number(process.env.AUDIT_DEFENSE ?? "93"),
	control: Number(process.env.AUDIT_CONTROL ?? "93"),
	physical: Number(process.env.AUDIT_PHYSICAL ?? "90"),
	mentality: Number(process.env.AUDIT_MENTALITY ?? "90"),
	goalkeeping: Number(process.env.AUDIT_GOALKEEPING ?? "95"),
	overall: Number(process.env.AUDIT_OVERALL ?? "90"),
	profileLabel: "Audit batch rating"
};
function stripAccents(value) {
	return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function normalizeKnownMojibake(value) {
	return value.replace(/â”œÃ¢â”¬Â®|â”œÂ®|ÃƒÂ©|ÃƒÂ¨/g, "e").replace(/â”œÃ¢â”¬Â¡|â”œÂ¡|ÃƒÃ­|ÃƒÂ­/g, "i").replace(/â”œÃ¢â”¬â”‚|â”œâ”‚|ÃƒÃ³|ÃƒÂ³/g, "o").replace(/â”œÃ¢â”¬Âº|â”œÂº|ÃƒÃ§|ÃƒÂ§/g, "c").replace(/â”œÃ¢â”¬Â±|â”œÂ±|ÃƒÃ±/g, "n").replace(/Ã‚Âº/g, "").replace(/Hist.*rico/g, "Historico").replace(/Alav.*s/g, "Alaves");
}
function norm(value) {
	return stripAccents(normalizeKnownMojibake(String(value ?? ""))).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
function cleanName(value) {
	return normalizeKnownMojibake(stripAccents(String(value ?? ""))).replace(/Hist.*rico/g, "Historico").replace(/Alav.*s/g, "Alaves").replace(/Ã‚Âº/g, "").trim();
}
function getPosition(summary, matcher) {
	const index = summary.table.findIndex(matcher);
	return index >= 0 ? index + 1 : 0;
}
function isTeam(row, needle) {
	return norm(`${row.teamName ?? ""} ${row.teamId ?? ""}`).includes(norm(needle));
}
function isWatchedRelegated(row, watched) {
	const rowNorm = norm(`${row.teamName ?? ""} ${row.teamId ?? ""}`);
	const watchedNorm = norm(watched);
	if (watchedNorm.includes("alaves")) return rowNorm.includes("alaves");
	if (watchedNorm.includes("oviedo")) return rowNorm.includes("oviedo");
	if (watchedNorm.includes("osasuna")) return rowNorm.includes("osasuna");
	if (watchedNorm.includes("villarreal")) return rowNorm.includes("villarreal");
	if (watchedNorm.includes("girona")) return rowNorm.includes("girona");
	if (watchedNorm.includes("sevilla")) return rowNorm.includes("sevilla");
	if (watchedNorm.includes("valencia")) return rowNorm.includes("valencia");
	return rowNorm.includes(watchedNorm) || watchedNorm.includes(rowNorm);
}
var selectedPlayers = [];
var results = [];
for (let i = 1; i <= RUNS; i += 1) {
	const seed = 143e3 + i * 1009;
	let context = createUserLeagueSimulation();
	context = simulateFullCupAndLeague({
		context,
		teamRating,
		selectedPlayers,
		userTeamName: "Athletic Club Historico",
		seed
	});
	const summary = createFinalLeagueSummary({
		gameId: `audit-${i}`,
		formationName: "Audit",
		coachName: "Audit",
		context,
		userTeamName: "Athletic Club Historico"
	});
	const relegated = summary.table.slice(-3);
	results.push({
		run: i,
		seed,
		leaguePosition: summary.leaguePosition,
		points: summary.points,
		cupStatus: summary.cupStatus,
		cupChampion: cleanName(summary.cupChampionTeamName ?? ""),
		cupRunnerUp: cleanName(summary.cupRunnerUpTeamName ?? ""),
		relegated: relegated.map((row) => ({
			teamId: cleanName(row.teamId),
			teamName: cleanName(row.teamName),
			points: row.points,
			goalDifference: row.goalDifference
		})),
		watchedPositions: {
			Villarreal: getPosition(summary, (row) => isTeam(row, "Villarreal")),
			Girona: getPosition(summary, (row) => isTeam(row, "Girona")),
			Sevilla: getPosition(summary, (row) => isTeam(row, "Sevilla")),
			Valencia: getPosition(summary, (row) => isTeam(row, "Valencia")),
			Oviedo: getPosition(summary, (row) => isTeam(row, "Oviedo")),
			Alaves: getPosition(summary, (row) => isTeam(row, "Alaves")),
			Osasuna: getPosition(summary, (row) => isTeam(row, "Osasuna"))
		}
	});
}
var watchedTeams = [
	"Real Oviedo",
	"Deportivo Alaves",
	"CA Osasuna",
	"Villarreal CF",
	"Girona FC",
	"Sevilla FC",
	"Valencia CF"
];
var relegationCounts = Object.fromEntries(watchedTeams.map((team) => [team, 0]));
var cupChampionCounts = {};
var cupRunnerUpCounts = {};
for (const result of results) {
	for (const row of result.relegated) for (const watched of watchedTeams) if (isWatchedRelegated(row, watched)) relegationCounts[watched] += 1;
	cupChampionCounts[result.cupChampion] = (cupChampionCounts[result.cupChampion] ?? 0) + 1;
	cupRunnerUpCounts[result.cupRunnerUp] = (cupRunnerUpCounts[result.cupRunnerUp] ?? 0) + 1;
}
var villarrealDanger = results.filter((r) => r.watchedPositions.Villarreal >= 17).length;
var villarrealRelegated = relegationCounts["Villarreal CF"] ?? 0;
var gironaRelegated = relegationCounts["Girona FC"] ?? 0;
var madridBarcaCupWins = results.filter((r) => {
	const champion = norm(r.cupChampion);
	return champion.includes("real madrid") || champion.includes("barcelona");
}).length;
var eliteCupWins = results.filter((r) => {
	const champion = norm(r.cupChampion);
	return champion.includes("real madrid") || champion.includes("barcelona") || champion.includes("athletic") || champion.includes("atletico");
}).length;
var smallCupChampions = results.filter((r) => {
	const champion = norm(r.cupChampion);
	return champion.includes("numancia") || champion.includes("alcorcon") || champion.includes("sestao") || champion.includes("racing") || champion.includes("zaragoza") || champion.includes("elche");
}).length;
var alerts = [];
if (villarrealRelegated >= 2 || villarrealDanger >= 4) alerts.push("AJUSTAR: Villarreal supera el umbral de riesgo.");
else if (villarrealRelegated === 1 || villarrealDanger >= 2) alerts.push("VIGILAR: Villarreal tiene algun susto, pero no exige ajuste todavia.");
else alerts.push("OK: Villarreal estable.");
if (gironaRelegated <= 3) alerts.push("OK: Girona baja 0-3 veces en 10; tolerable segun regla.");
else alerts.push("VIGILAR/AJUSTAR: Girona baja mas de 3 veces en 10.");
if (madridBarcaCupWins >= Math.ceil(RUNS * .7)) alerts.push("AJUSTAR COPA: Madrid/Barca copan demasiadas Copas.");
else alerts.push("OK: Copa no esta monopolizada por Madrid/Barca.");
if (madridBarcaCupWins === 0 && smallCupChampions >= 1) alerts.push("VIGILAR COPA: Copa muy abierta; Madrid/Barca 0 victorias y al menos un campeon pequeno.");
var audit = {
	generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
	runs: RUNS,
	teamRating,
	results,
	summary: {
		relegationCounts,
		cupChampionCounts,
		cupRunnerUpCounts,
		villarrealDanger,
		villarrealRelegated,
		gironaRelegated,
		madridBarcaCupWins,
		eliteCupWins,
		smallCupChampions,
		alerts
	}
};
console.log(JSON.stringify(audit, null, 2));
//#endregion
export {};
