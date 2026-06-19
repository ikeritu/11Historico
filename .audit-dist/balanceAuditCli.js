import fs from "node:fs";
import path from "node:path";
//#region src/data/athletic/seasons.ts
var STATS_PENDING_NOTE = "Plantilla y categoría posicional verificadas por fuente oficial. Minutos/asistencias/goles individuales pendientes de verificación completa antes de usar como estadística histórica definitiva.";
function makeSkills(primaryPosition, overall, overrides = {}) {
	const base = { ...{
		"POR": {
			"pace": 45,
			"shooting": 15,
			"passing": 55,
			"dribbling": 35,
			"defending": 30,
			"physical": 75,
			"goalkeeping": 82,
			"mentality": 78
		},
		"LD": {
			"pace": 74,
			"shooting": 45,
			"passing": 65,
			"dribbling": 62,
			"defending": 75,
			"physical": 73,
			"goalkeeping": 0,
			"mentality": 74
		},
		"LI": {
			"pace": 74,
			"shooting": 45,
			"passing": 65,
			"dribbling": 62,
			"defending": 75,
			"physical": 73,
			"goalkeeping": 0,
			"mentality": 74
		},
		"CAD": {
			"pace": 78,
			"shooting": 58,
			"passing": 70,
			"dribbling": 72,
			"defending": 70,
			"physical": 75,
			"goalkeeping": 0,
			"mentality": 75
		},
		"CAI": {
			"pace": 78,
			"shooting": 58,
			"passing": 70,
			"dribbling": 72,
			"defending": 70,
			"physical": 75,
			"goalkeeping": 0,
			"mentality": 75
		},
		"DFC": {
			"pace": 58,
			"shooting": 35,
			"passing": 58,
			"dribbling": 42,
			"defending": 80,
			"physical": 82,
			"goalkeeping": 0,
			"mentality": 78
		},
		"MCD": {
			"pace": 62,
			"shooting": 55,
			"passing": 74,
			"dribbling": 67,
			"defending": 77,
			"physical": 76,
			"goalkeeping": 0,
			"mentality": 78
		},
		"MC": {
			"pace": 65,
			"shooting": 62,
			"passing": 78,
			"dribbling": 72,
			"defending": 65,
			"physical": 72,
			"goalkeeping": 0,
			"mentality": 78
		},
		"MP": {
			"pace": 70,
			"shooting": 76,
			"passing": 82,
			"dribbling": 80,
			"defending": 50,
			"physical": 68,
			"goalkeeping": 0,
			"mentality": 82
		},
		"MI": {
			"pace": 78,
			"shooting": 67,
			"passing": 73,
			"dribbling": 76,
			"defending": 58,
			"physical": 70,
			"goalkeeping": 0,
			"mentality": 74
		},
		"MD": {
			"pace": 78,
			"shooting": 67,
			"passing": 73,
			"dribbling": 76,
			"defending": 58,
			"physical": 70,
			"goalkeeping": 0,
			"mentality": 74
		},
		"EI": {
			"pace": 82,
			"shooting": 72,
			"passing": 72,
			"dribbling": 81,
			"defending": 48,
			"physical": 68,
			"goalkeeping": 0,
			"mentality": 76
		},
		"ED": {
			"pace": 82,
			"shooting": 72,
			"passing": 72,
			"dribbling": 81,
			"defending": 48,
			"physical": 68,
			"goalkeeping": 0,
			"mentality": 76
		},
		"DC": {
			"pace": 70,
			"shooting": 82,
			"passing": 62,
			"dribbling": 68,
			"defending": 38,
			"physical": 82,
			"goalkeeping": 0,
			"mentality": 80
		},
		"SD": {
			"pace": 74,
			"shooting": 78,
			"passing": 72,
			"dribbling": 77,
			"defending": 45,
			"physical": 72,
			"goalkeeping": 0,
			"mentality": 79
		}
	}[primaryPosition] };
	const values = Object.values(base);
	const offset = overall - values.reduce((sum, value) => sum + value, 0) / values.length;
	return {
		...Object.fromEntries(Object.entries(base).map(([key, value]) => [key, key === "goalkeeping" && primaryPosition !== "POR" ? value : Math.max(0, Math.min(99, Math.round(value + offset * .75)))])),
		...overrides
	};
}
function normalizePlayerId(value) {
	return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}
function getCanonicalPlayerId(name) {
	const normalized = normalizePlayerId(name);
	return {
		gorostiza: "guillermo_gorostiza",
		lafuente: "ramon_lafuente",
		iraragorri: "jose_iraragorri",
		chirri_ii: "ignacio_agirrezabala_chirri_ii",
		bata: "agustin_sauto_bata",
		unamuno: "victorio_unamuno",
		blasco: "gregorio_blasco",
		ispizua: "jose_luis_ispizua",
		muguerza: "jose_muguerza",
		roberto: "roberto_etxebarria",
		urkizu: "juan_jose_urkizu",
		cilaurren: "leonardo_cilaurren",
		oceja: "isaac_oceja",
		zubieta: "angel_zubieta",
		guerrero: "julen_guerrero",
		julen_guerrero: "julen_guerrero",
		j_martinez: "javi_martinez",
		javi_martinez: "javi_martinez",
		williams: "inaki_williams",
		inaki_williams: "inaki_williams",
		nico_williams: "nico_williams",
		aduriz: "aritz_aduriz",
		aritz_aduriz: "aritz_aduriz",
		muniain: "iker_muniain",
		iker_muniain: "iker_muniain",
		de_marcos: "oscar_de_marcos",
		oscar_de_marcos: "oscar_de_marcos",
		iraola: "andoni_iraola",
		andoni_iraola: "andoni_iraola",
		llorente: "fernando_llorente",
		fernando_llorente: "fernando_llorente",
		ziganda: "cuco_ziganda",
		valverde: "ernesto_valverde_player",
		ernesto_valverde: "ernesto_valverde_player",
		san_jose: "mikel_san_jose",
		i_martinez: "inigo_martinez",
		inigo_martinez: "inigo_martinez",
		r_de_galarreta: "ruiz_de_galarreta",
		ruiz_de_galarreta: "ruiz_de_galarreta"
	}[normalized] ?? normalized;
}
var TACTICAL_SLOT_LABELS_BY_CANONICAL_PLAYER_ID = {
	gregorio_blasco: ["POR"],
	jose_luis_ispizua: ["POR"],
	guillermo_gorostiza: ["EI", "MI"],
	ramon_lafuente: [
		"ED",
		"EI",
		"DC"
	],
	jose_iraragorri: ["MP", "SD"],
	ignacio_agirrezabala_chirri_ii: ["MP", "SD"],
	agustin_sauto_bata: ["DC"],
	victorio_unamuno: ["DC"],
	jose_muguerza: ["MCD", "DFC-C"],
	roberto_etxebarria: ["MC", "MP"],
	juan_jose_urkizu: [
		"DFC-I",
		"DFC-C",
		"LI"
	],
	leonardo_cilaurren: ["MCD", "DFC-C"],
	isaac_oceja: [
		"DFC-D",
		"DFC-C",
		"LD"
	],
	angel_zubieta: ["MCD", "MC"],
	iribar: ["POR"],
	zubizarreta: ["POR"],
	unai_simon: ["POR"],
	iraizoz: ["POR"],
	valencia: ["POR"],
	andoni_iraola: ["LD", "LD"],
	oscar_de_marcos: [
		"LD",
		"LD",
		"MD"
	],
	larrazabal: [
		"LI",
		"LI",
		"MI"
	],
	yuri: ["LI", "LI"],
	de_la_fuente: ["LI", "LI"],
	tirapu: ["LD", "LD"],
	aitor_larrazabal: [
		"LI",
		"LI",
		"MI"
	],
	laporte: ["DFC-I", "DFC-C"],
	inigo_martinez: ["DFC-I", "DFC-C"],
	amorebieta: ["DFC-I", "DFC-C"],
	goikoetxea: ["DFC-D", "DFC-C"],
	javi_martinez: [
		"DFC-C",
		"DFC-D",
		"MCD"
	],
	mikel_san_jose: [
		"DFC-C",
		"DFC-D",
		"MCD"
	],
	alkorta: ["DFC-D", "DFC-C"],
	vivian: ["DFC-D", "DFC-C"],
	yeray: [
		"DFC-D",
		"DFC-I",
		"DFC-C"
	],
	ziganda_defender: ["DFC-C", "DFC-D"],
	julen_guerrero: [
		"MP",
		"MC-I",
		"MC-D"
	],
	ander_herrera: [
		"MC-D",
		"MC-I",
		"MCD"
	],
	beñat: [
		"MC-D",
		"MC-I",
		"MCD"
	],
	iturraspe: [
		"MCD",
		"MC-D",
		"MC-I"
	],
	vesga: [
		"MCD",
		"MC-I",
		"MC-D"
	],
	ruiz_de_galarreta: [
		"MC-D",
		"MC-I",
		"MCD"
	],
	sancet: [
		"MP",
		"MC-I",
		"MC-D"
	],
	raul_garcia: [
		"MP",
		"DC",
		"DC-I",
		"DC-D",
		"MC-D",
		"MC-I"
	],
	nico_williams: [
		"EI",
		"ED",
		"MI",
		"MD"
	],
	inaki_williams: [
		"ED",
		"DC",
		"DC-D"
	],
	iker_muniain: [
		"EI",
		"MP",
		"MI"
	],
	etxeberria: ["ED", "DC-D"],
	argote: ["EI", "MI"],
	susaeta: ["ED", "MD"],
	sarabia: [
		"MP",
		"EI",
		"SD",
		"DC-I"
	],
	aritz_aduriz: [
		"DC",
		"DC-I",
		"DC-D"
	],
	dani: [
		"DC",
		"DC-I",
		"DC-D"
	],
	llorente: [
		"DC",
		"DC-I",
		"DC-D"
	],
	guruzeta: [
		"DC",
		"DC-I",
		"DC-D"
	],
	villalibre: [
		"DC",
		"DC-I",
		"DC-D"
	]
};
function getTacticalSlotLabelsForPlayer(canonicalPlayerId, _positions) {
	const explicitLabels = TACTICAL_SLOT_LABELS_BY_CANONICAL_PLAYER_ID[canonicalPlayerId];
	if (explicitLabels && explicitLabels.length > 0) return explicitLabels;
}
function makePlayer(params) {
	const playerId = params.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
	const seasonId = params.season.replace("/", "_");
	const canonicalPlayerId = getCanonicalPlayerId(params.name);
	const primaryPosition = params.positions[0];
	const tacticalSlotLabels = params.tacticalSlotLabels ?? getTacticalSlotLabelsForPlayer(canonicalPlayerId, params.positions);
	return {
		id: `${playerId}_${seasonId}`,
		playerId,
		canonicalPlayerId,
		name: params.name,
		season: params.season,
		positions: params.positions,
		tacticalSlotLabels,
		matches: params.matches ?? 0,
		minutes: params.minutes ?? 0,
		goals: params.goals ?? 0,
		assists: params.assists ?? 0,
		skills: makeSkills(primaryPosition, params.overall),
		overall: params.overall,
		dataConfidence: params.dataConfidence ?? .55,
		ratingMethod: "mixed",
		sourceRefs: params.sourceRefs,
		notes: params.notes ?? STATS_PENDING_NOTE
	};
}
function makeCoach(params) {
	return {
		id: `${params.coachId}_${params.season.replace("/", "_")}`,
		coachId: params.coachId,
		name: params.name,
		season: params.season,
		skills: params.skills,
		overall: params.overall,
		dataConfidence: params.dataConfidence ?? .8,
		ratingMethod: "mixed",
		sourceRefs: params.sourceRefs,
		notes: params.notes
	};
}
var ATHLETIC_SEASONS = [
	{
		season: "1928/29",
		coach: makeCoach({
			name: "Máximo Royo",
			coachId: "maximo_royo",
			season: "1928/29",
			overall: 76,
			skills: {
				attack: 72,
				defense: 74,
				management: 76,
				mentality: 78,
				cup: 74,
				europe: 50
			},
			sourceRefs: ["athletic-official-1928-29-squad", "athletic-official-maximo-royo"],
			dataConfidence: .75,
			notes: "Temporada fundacional de Liga. Ratings estimados y recalibrados para gameplay a partir de plantilla oficial y contexto competitivo."
		}),
		players: [
			makePlayer({
				name: "Blasco",
				season: "1928/29",
				positions: ["POR"],
				overall: 84,
				sourceRefs: ["athletic-official-1928-29-squad"],
				dataConfidence: .82
			}),
			makePlayer({
				name: "Ispizua",
				season: "1928/29",
				positions: ["POR"],
				overall: 75,
				sourceRefs: ["athletic-official-1928-29-squad"],
				dataConfidence: .75
			}),
			makePlayer({
				name: "Basabe",
				season: "1928/29",
				positions: ["DFC"],
				overall: 72,
				sourceRefs: ["athletic-official-1928-29-squad"],
				dataConfidence: .62
			}),
			makePlayer({
				name: "Careaga",
				season: "1928/29",
				positions: ["DFC", "LD"],
				overall: 73,
				sourceRefs: ["athletic-official-1928-29-squad"],
				dataConfidence: .65
			}),
			makePlayer({
				name: "Castellanos",
				season: "1928/29",
				positions: ["DFC"],
				overall: 73,
				sourceRefs: ["athletic-official-1928-29-squad"],
				dataConfidence: .68
			}),
			makePlayer({
				name: "Juanín",
				season: "1928/29",
				positions: ["DFC", "LI"],
				overall: 73,
				sourceRefs: ["athletic-official-1928-29-squad"],
				dataConfidence: .66
			}),
			makePlayer({
				name: "Larrakoetxea",
				season: "1928/29",
				positions: ["LI", "LI"],
				overall: 73,
				sourceRefs: ["athletic-official-1928-29-squad"],
				dataConfidence: .62
			}),
			makePlayer({
				name: "Muguerza",
				season: "1928/29",
				positions: ["MCD", "DFC"],
				overall: 82,
				sourceRefs: ["athletic-official-1928-29-squad"],
				dataConfidence: .78
			}),
			makePlayer({
				name: "Alberdi",
				season: "1928/29",
				positions: ["MC", "MCD"],
				overall: 73,
				sourceRefs: ["athletic-official-1928-29-squad"],
				dataConfidence: .64
			}),
			makePlayer({
				name: "Castaños",
				season: "1928/29",
				positions: ["MC"],
				overall: 75,
				sourceRefs: ["athletic-official-1928-29-squad"],
				dataConfidence: .66
			}),
			makePlayer({
				name: "Garizurieta",
				season: "1928/29",
				positions: ["MC", "MP"],
				overall: 76,
				sourceRefs: ["athletic-official-1928-29-squad"],
				dataConfidence: .66
			}),
			makePlayer({
				name: "Hierro",
				season: "1928/29",
				positions: ["MC"],
				overall: 73,
				sourceRefs: ["athletic-official-1928-29-squad"],
				dataConfidence: .6
			}),
			makePlayer({
				name: "Legarreta",
				season: "1928/29",
				positions: ["MC", "MCD"],
				overall: 73,
				sourceRefs: ["athletic-official-1928-29-squad"],
				dataConfidence: .62
			}),
			makePlayer({
				name: "Roberto",
				season: "1928/29",
				positions: ["MC", "MP"],
				overall: 82,
				sourceRefs: ["athletic-official-1928-29-squad"],
				dataConfidence: .78
			}),
			makePlayer({
				name: "Acedo",
				season: "1928/29",
				positions: ["EI", "MI"],
				overall: 72,
				sourceRefs: ["athletic-official-1928-29-squad"],
				dataConfidence: .6
			}),
			makePlayer({
				name: "Carmelo G",
				season: "1928/29",
				positions: ["SD", "DC"],
				overall: 73,
				sourceRefs: ["athletic-official-1928-29-squad"],
				dataConfidence: .6
			}),
			makePlayer({
				name: "Chirri II",
				season: "1928/29",
				positions: ["SD", "MP"],
				overall: 81,
				sourceRefs: ["athletic-official-1928-29-squad"],
				dataConfidence: .72
			}),
			makePlayer({
				name: "Juanito",
				season: "1928/29",
				positions: ["ED", "MD"],
				overall: 73,
				sourceRefs: ["athletic-official-1928-29-squad"],
				dataConfidence: .62
			}),
			makePlayer({
				name: "Lafuente",
				season: "1928/29",
				positions: [
					"ED",
					"EI",
					"DC"
				],
				overall: 82,
				sourceRefs: ["athletic-official-1928-29-squad"],
				dataConfidence: .8
			}),
			makePlayer({
				name: "Mandaluniz",
				season: "1928/29",
				positions: ["DC", "SD"],
				overall: 75,
				sourceRefs: ["athletic-official-1928-29-squad"],
				dataConfidence: .64
			}),
			makePlayer({
				name: "Unamuno",
				season: "1928/29",
				positions: ["DC"],
				overall: 82,
				sourceRefs: ["athletic-official-1928-29-squad"],
				dataConfidence: .78
			})
		]
	},
	{
		season: "1929/30",
		coach: makeCoach({
			name: "Frederick Pentland",
			coachId: "frederick_pentland",
			season: "1929/30",
			overall: 91,
			skills: {
				attack: 93,
				defense: 84,
				management: 91,
				mentality: 92,
				cup: 94,
				europe: 70
			},
			sourceRefs: ["athletic-official-1929-30-squad", "athletic-official-frederick-pentland"],
			dataConfidence: .88,
			notes: "Liga y Copa. Primera gran temporada de la delantera histórica de Pentland. Ratings de jugadores recalibrados para evitar sobrepuntuación global."
		}),
		players: [
			makePlayer({
				name: "Blasco",
				season: "1929/30",
				positions: ["POR"],
				overall: 84,
				sourceRefs: ["athletic-official-1929-30-squad"],
				dataConfidence: .86
			}),
			makePlayer({
				name: "Ispizua",
				season: "1929/30",
				positions: ["POR"],
				overall: 75,
				sourceRefs: ["athletic-official-1929-30-squad"],
				dataConfidence: .75
			}),
			makePlayer({
				name: "Careaga",
				season: "1929/30",
				positions: ["DFC", "LD"],
				overall: 75,
				sourceRefs: ["athletic-official-1929-30-squad"],
				dataConfidence: .68
			}),
			makePlayer({
				name: "Castellanos",
				season: "1929/30",
				positions: ["DFC"],
				overall: 76,
				sourceRefs: ["athletic-official-1929-30-squad"],
				dataConfidence: .7
			}),
			makePlayer({
				name: "Juanín",
				season: "1929/30",
				positions: ["DFC", "LI"],
				overall: 75,
				sourceRefs: ["athletic-official-1929-30-squad"],
				dataConfidence: .68
			}),
			makePlayer({
				name: "Larrakoetxea",
				season: "1929/30",
				positions: ["LI", "LI"],
				overall: 73,
				sourceRefs: ["athletic-official-1929-30-squad"],
				dataConfidence: .62
			}),
			makePlayer({
				name: "Muguerza",
				season: "1929/30",
				positions: ["MCD", "DFC"],
				overall: 82,
				sourceRefs: ["athletic-official-1929-30-squad"],
				dataConfidence: .82
			}),
			makePlayer({
				name: "Rousse",
				season: "1929/30",
				positions: ["DFC"],
				overall: 76,
				sourceRefs: ["athletic-official-1929-30-squad"],
				dataConfidence: .72
			}),
			makePlayer({
				name: "Urkizu",
				season: "1929/30",
				positions: ["DFC", "LI"],
				overall: 81,
				sourceRefs: ["athletic-official-1929-30-squad"],
				dataConfidence: .82
			}),
			makePlayer({
				name: "Alberdi",
				season: "1929/30",
				positions: ["MC", "MCD"],
				overall: 73,
				sourceRefs: ["athletic-official-1929-30-squad"],
				dataConfidence: .65
			}),
			makePlayer({
				name: "Castaños",
				season: "1929/30",
				positions: ["MC"],
				overall: 75,
				sourceRefs: ["athletic-official-1929-30-squad"],
				dataConfidence: .68
			}),
			makePlayer({
				name: "Garizurieta",
				season: "1929/30",
				positions: ["MC", "MP"],
				overall: 76,
				sourceRefs: ["athletic-official-1929-30-squad"],
				dataConfidence: .68
			}),
			makePlayer({
				name: "Roberto",
				season: "1929/30",
				positions: ["MC", "MP"],
				overall: 82,
				sourceRefs: ["athletic-official-1929-30-squad"],
				dataConfidence: .84
			}),
			makePlayer({
				name: "Bata",
				season: "1929/30",
				positions: ["DC"],
				overall: 83,
				sourceRefs: ["athletic-official-1929-30-squad"],
				dataConfidence: .88
			}),
			makePlayer({
				name: "Chirri II",
				season: "1929/30",
				positions: ["SD", "MP"],
				overall: 81,
				sourceRefs: ["athletic-official-1929-30-squad"],
				dataConfidence: .84
			}),
			makePlayer({
				name: "Gorostiza",
				season: "1929/30",
				positions: ["EI", "MI"],
				overall: 84,
				sourceRefs: ["athletic-official-1929-30-squad"],
				dataConfidence: .86
			}),
			makePlayer({
				name: "Iraragorri",
				season: "1929/30",
				positions: ["MP", "SD"],
				overall: 83,
				sourceRefs: ["athletic-official-1929-30-squad"],
				dataConfidence: .86
			}),
			makePlayer({
				name: "Lafuente",
				season: "1929/30",
				positions: [
					"ED",
					"EI",
					"DC"
				],
				overall: 82,
				sourceRefs: ["athletic-official-1929-30-squad"],
				dataConfidence: .86
			}),
			makePlayer({
				name: "Mandaluniz",
				season: "1929/30",
				positions: ["DC", "SD"],
				overall: 75,
				sourceRefs: ["athletic-official-1929-30-squad"],
				dataConfidence: .65
			}),
			makePlayer({
				name: "Unamuno",
				season: "1929/30",
				positions: ["DC"],
				overall: 82,
				sourceRefs: ["athletic-official-1929-30-squad"],
				dataConfidence: .8
			}),
			makePlayer({
				name: "Uribe",
				season: "1929/30",
				positions: ["EI", "MI"],
				overall: 75,
				sourceRefs: ["athletic-official-1929-30-squad"],
				dataConfidence: .65
			})
		]
	},
	{
		season: "1930/31",
		coach: makeCoach({
			name: "Frederick Pentland",
			coachId: "frederick_pentland",
			season: "1930/31",
			overall: 92,
			skills: {
				attack: 95,
				defense: 85,
				management: 92,
				mentality: 94,
				cup: 94,
				europe: 70
			},
			sourceRefs: ["athletic-official-1930-31-squad", "athletic-official-frederick-pentland"],
			dataConfidence: .9,
			notes: "Liga y Copa. Temporada de máximo impacto ofensivo, incluida la histórica goleada 12-1 al FC Barcelona. Ratings de jugadores recalibrados para mantener leyendas puntuales sin inflar toda la plantilla."
		}),
		players: [
			makePlayer({
				name: "Blasco",
				season: "1930/31",
				positions: ["POR"],
				overall: 84,
				sourceRefs: ["athletic-official-1930-31-squad"],
				dataConfidence: .87
			}),
			makePlayer({
				name: "Ispizua",
				season: "1930/31",
				positions: ["POR"],
				overall: 75,
				sourceRefs: ["athletic-official-1930-31-squad"],
				dataConfidence: .75
			}),
			makePlayer({
				name: "Careaga",
				season: "1930/31",
				positions: ["DFC", "LD"],
				overall: 75,
				sourceRefs: ["athletic-official-1930-31-squad"],
				dataConfidence: .68
			}),
			makePlayer({
				name: "Castellanos",
				season: "1930/31",
				positions: ["DFC"],
				overall: 76,
				sourceRefs: ["athletic-official-1930-31-squad"],
				dataConfidence: .72
			}),
			makePlayer({
				name: "Juanín",
				season: "1930/31",
				positions: ["DFC", "LI"],
				overall: 75,
				sourceRefs: ["athletic-official-1930-31-squad"],
				dataConfidence: .68
			}),
			makePlayer({
				name: "Muguerza",
				season: "1930/31",
				positions: ["MCD", "DFC"],
				overall: 82,
				sourceRefs: ["athletic-official-1930-31-squad"],
				dataConfidence: .84
			}),
			makePlayer({
				name: "Rousse",
				season: "1930/31",
				positions: ["DFC"],
				overall: 76,
				sourceRefs: ["athletic-official-1930-31-squad"],
				dataConfidence: .72
			}),
			makePlayer({
				name: "Urkizu",
				season: "1930/31",
				positions: ["DFC", "LI"],
				overall: 81,
				sourceRefs: ["athletic-official-1930-31-squad"],
				dataConfidence: .84
			}),
			makePlayer({
				name: "Castaños",
				season: "1930/31",
				positions: ["MC"],
				overall: 76,
				sourceRefs: ["athletic-official-1930-31-squad"],
				dataConfidence: .68
			}),
			makePlayer({
				name: "Felipés",
				season: "1930/31",
				positions: ["MC", "MCD"],
				overall: 75,
				sourceRefs: ["athletic-official-1930-31-squad"],
				dataConfidence: .64
			}),
			makePlayer({
				name: "Garizurieta",
				season: "1930/31",
				positions: ["MC", "MP"],
				overall: 76,
				sourceRefs: ["athletic-official-1930-31-squad"],
				dataConfidence: .68
			}),
			makePlayer({
				name: "Roberto",
				season: "1930/31",
				positions: ["MC", "MP"],
				overall: 82,
				sourceRefs: ["athletic-official-1930-31-squad"],
				dataConfidence: .86
			}),
			makePlayer({
				name: "Bata",
				season: "1930/31",
				positions: ["DC"],
				overall: 83,
				sourceRefs: ["athletic-official-1930-31-squad"],
				dataConfidence: .9
			}),
			makePlayer({
				name: "Chirri II",
				season: "1930/31",
				positions: ["SD", "MP"],
				overall: 81,
				sourceRefs: ["athletic-official-1930-31-squad"],
				dataConfidence: .86
			}),
			makePlayer({
				name: "Gorostiza",
				season: "1930/31",
				positions: ["EI", "MI"],
				overall: 84,
				sourceRefs: ["athletic-official-1930-31-squad"],
				dataConfidence: .88
			}),
			makePlayer({
				name: "Iraragorri",
				season: "1930/31",
				positions: ["MP", "SD"],
				overall: 83,
				sourceRefs: ["athletic-official-1930-31-squad"],
				dataConfidence: .88
			}),
			makePlayer({
				name: "Lafuente",
				season: "1930/31",
				positions: [
					"ED",
					"EI",
					"DC"
				],
				overall: 82,
				sourceRefs: ["athletic-official-1930-31-squad"],
				dataConfidence: .86
			}),
			makePlayer({
				name: "Unamuno",
				season: "1930/31",
				positions: ["DC"],
				overall: 82,
				sourceRefs: ["athletic-official-1930-31-squad"],
				dataConfidence: .8
			}),
			makePlayer({
				name: "Uribe",
				season: "1930/31",
				positions: ["EI", "MI"],
				overall: 75,
				sourceRefs: ["athletic-official-1930-31-squad"],
				dataConfidence: .65
			})
		]
	},
	{
		season: "1931/32",
		coach: makeCoach({
			name: "Frederick Pentland",
			coachId: "frederick_pentland",
			season: "1931/32",
			overall: 90,
			skills: {
				attack: 91,
				defense: 84,
				management: 90,
				mentality: 92,
				cup: 95,
				europe: 70
			},
			sourceRefs: ["athletic-official-frederick-pentland", "athletic-official-1931-32-squad"],
			dataConfidence: .82,
			notes: "Temporada copera de Pentland. Plantilla reconstruida con fuente oficial y continuidad del bloque campeón."
		}),
		players: [
			makePlayer({
				name: "Blasco",
				season: "1931/32",
				positions: ["POR"],
				overall: 84,
				sourceRefs: ["athletic-official-1931-32-squad"],
				dataConfidence: .8
			}),
			makePlayer({
				name: "Ispizua",
				season: "1931/32",
				positions: ["POR"],
				overall: 75,
				sourceRefs: ["athletic-official-1931-32-squad"],
				dataConfidence: .68
			}),
			makePlayer({
				name: "Castellanos",
				season: "1931/32",
				positions: ["DFC"],
				overall: 76,
				sourceRefs: ["athletic-official-1931-32-squad"],
				dataConfidence: .68
			}),
			makePlayer({
				name: "Cilaurren",
				season: "1931/32",
				positions: ["MCD", "DFC"],
				overall: 82,
				sourceRefs: ["athletic-official-1931-32-squad"],
				dataConfidence: .72
			}),
			makePlayer({
				name: "Muguerza",
				season: "1931/32",
				positions: ["MCD", "DFC"],
				overall: 82,
				sourceRefs: ["athletic-official-1931-32-squad"],
				dataConfidence: .78
			}),
			makePlayer({
				name: "Urkizu",
				season: "1931/32",
				positions: ["DFC", "LI"],
				overall: 81,
				sourceRefs: ["athletic-official-1931-32-squad"],
				dataConfidence: .76
			}),
			makePlayer({
				name: "Zabala",
				season: "1931/32",
				positions: ["DFC", "LD"],
				overall: 75,
				sourceRefs: ["athletic-official-1931-32-squad"],
				dataConfidence: .65
			}),
			makePlayer({
				name: "Garizurieta",
				season: "1931/32",
				positions: ["MC", "MP"],
				overall: 76,
				sourceRefs: ["athletic-official-1931-32-squad"],
				dataConfidence: .65
			}),
			makePlayer({
				name: "Roberto",
				season: "1931/32",
				positions: ["MC", "MP"],
				overall: 82,
				sourceRefs: ["athletic-official-1931-32-squad"],
				dataConfidence: .8
			}),
			makePlayer({
				name: "Felipés",
				season: "1931/32",
				positions: ["MC", "MCD"],
				overall: 75,
				sourceRefs: ["athletic-official-1931-32-squad"],
				dataConfidence: .62
			}),
			makePlayer({
				name: "Bata",
				season: "1931/32",
				positions: ["DC"],
				overall: 83,
				sourceRefs: ["athletic-official-1931-32-squad"],
				dataConfidence: .84
			}),
			makePlayer({
				name: "Chirri II",
				season: "1931/32",
				positions: ["SD", "MP"],
				overall: 81,
				sourceRefs: ["athletic-official-1931-32-squad"],
				dataConfidence: .82
			}),
			makePlayer({
				name: "Gorostiza",
				season: "1931/32",
				positions: ["EI", "MI"],
				overall: 84,
				sourceRefs: ["athletic-official-1931-32-squad"],
				dataConfidence: .84
			}),
			makePlayer({
				name: "Iraragorri",
				season: "1931/32",
				positions: ["MP", "SD"],
				overall: 83,
				sourceRefs: ["athletic-official-1931-32-squad"],
				dataConfidence: .84
			}),
			makePlayer({
				name: "Lafuente",
				season: "1931/32",
				positions: [
					"ED",
					"EI",
					"DC"
				],
				overall: 82,
				sourceRefs: ["athletic-official-1931-32-squad"],
				dataConfidence: .8
			}),
			makePlayer({
				name: "Unamuno",
				season: "1931/32",
				positions: ["DC"],
				overall: 82,
				sourceRefs: ["athletic-official-1931-32-squad"],
				dataConfidence: .76
			}),
			makePlayer({
				name: "Uribe",
				season: "1931/32",
				positions: ["EI", "MI"],
				overall: 73,
				sourceRefs: ["athletic-official-1931-32-squad"],
				dataConfidence: .6
			})
		]
	},
	{
		season: "1932/33",
		coach: makeCoach({
			name: "Frederick Pentland",
			coachId: "frederick_pentland",
			season: "1932/33",
			overall: 90,
			skills: {
				attack: 90,
				defense: 85,
				management: 90,
				mentality: 92,
				cup: 96,
				europe: 70
			},
			sourceRefs: ["athletic-official-1932-33-squad", "athletic-official-frederick-pentland"],
			dataConfidence: .86,
			notes: "Última gran temporada del segundo ciclo de Pentland, con título de Copa."
		}),
		players: [
			makePlayer({
				name: "Blasco",
				season: "1932/33",
				positions: ["POR"],
				overall: 84,
				sourceRefs: ["athletic-official-1932-33-squad"],
				dataConfidence: .86
			}),
			makePlayer({
				name: "Ispizua",
				season: "1932/33",
				positions: ["POR"],
				overall: 75,
				sourceRefs: ["athletic-official-1932-33-squad"],
				dataConfidence: .72
			}),
			makePlayer({
				name: "Aguirre",
				season: "1932/33",
				positions: ["DFC", "LD"],
				overall: 73,
				sourceRefs: ["athletic-official-1932-33-squad"],
				dataConfidence: .62
			}),
			makePlayer({
				name: "Castellanos",
				season: "1932/33",
				positions: ["DFC"],
				overall: 75,
				sourceRefs: ["athletic-official-1932-33-squad"],
				dataConfidence: .68
			}),
			makePlayer({
				name: "Cilaurren",
				season: "1932/33",
				positions: ["MCD", "DFC"],
				overall: 83,
				sourceRefs: ["athletic-official-1932-33-squad"],
				dataConfidence: .78
			}),
			makePlayer({
				name: "Muguerza",
				season: "1932/33",
				positions: ["MCD", "DFC"],
				overall: 82,
				sourceRefs: ["athletic-official-1932-33-squad"],
				dataConfidence: .8
			}),
			makePlayer({
				name: "Urkizu",
				season: "1932/33",
				positions: ["DFC", "LI"],
				overall: 81,
				sourceRefs: ["athletic-official-1932-33-squad"],
				dataConfidence: .76
			}),
			makePlayer({
				name: "Zabala",
				season: "1932/33",
				positions: ["DFC", "LD"],
				overall: 75,
				sourceRefs: ["athletic-official-1932-33-squad"],
				dataConfidence: .66
			}),
			makePlayer({
				name: "Careaga",
				season: "1932/33",
				positions: ["MC", "MCD"],
				overall: 73,
				sourceRefs: ["athletic-official-1932-33-squad"],
				dataConfidence: .62
			}),
			makePlayer({
				name: "Garizurieta",
				season: "1932/33",
				positions: ["MC", "MP"],
				overall: 75,
				sourceRefs: ["athletic-official-1932-33-squad"],
				dataConfidence: .64
			}),
			makePlayer({
				name: "Gerardo",
				season: "1932/33",
				positions: ["MC", "MCD"],
				overall: 75,
				sourceRefs: ["athletic-official-1932-33-squad"],
				dataConfidence: .62
			}),
			makePlayer({
				name: "Roberto",
				season: "1932/33",
				positions: ["MC", "MP"],
				overall: 82,
				sourceRefs: ["athletic-official-1932-33-squad"],
				dataConfidence: .82
			}),
			makePlayer({
				name: "Bata",
				season: "1932/33",
				positions: ["DC"],
				overall: 83,
				sourceRefs: ["athletic-official-1932-33-squad"],
				dataConfidence: .84
			}),
			makePlayer({
				name: "Chirri II",
				season: "1932/33",
				positions: ["SD", "MP"],
				overall: 81,
				sourceRefs: ["athletic-official-1932-33-squad"],
				dataConfidence: .82
			}),
			makePlayer({
				name: "Gorostiza",
				season: "1932/33",
				positions: ["EI", "MI"],
				overall: 84,
				sourceRefs: ["athletic-official-1932-33-squad"],
				dataConfidence: .84
			}),
			makePlayer({
				name: "Iraragorri",
				season: "1932/33",
				positions: ["MP", "SD"],
				overall: 83,
				sourceRefs: ["athletic-official-1932-33-squad"],
				dataConfidence: .84
			}),
			makePlayer({
				name: "Lafuente",
				season: "1932/33",
				positions: [
					"ED",
					"EI",
					"DC"
				],
				overall: 82,
				sourceRefs: ["athletic-official-1932-33-squad"],
				dataConfidence: .8
			}),
			makePlayer({
				name: "Unamuno",
				season: "1932/33",
				positions: ["DC"],
				overall: 82,
				sourceRefs: ["athletic-official-1932-33-squad"],
				dataConfidence: .74
			}),
			makePlayer({
				name: "Uribe",
				season: "1932/33",
				positions: ["EI", "MI"],
				overall: 73,
				sourceRefs: ["athletic-official-1932-33-squad"],
				dataConfidence: .6
			})
		]
	},
	{
		season: "1933/34",
		coach: makeCoach({
			name: "Patricio Caicedo",
			coachId: "patricio_caicedo",
			season: "1933/34",
			overall: 88,
			skills: {
				attack: 88,
				defense: 86,
				management: 88,
				mentality: 90,
				cup: 85,
				europe: 65
			},
			sourceRefs: ["athletic-official-patricio-caicedo", "athletic-official-1933-34-squad"],
			dataConfidence: .78,
			notes: "Liga 1933/34. Ratings estimados y recalibrados para gameplay a partir de bloque oficial y continuidad competitiva."
		}),
		players: [
			makePlayer({
				name: "Blasco",
				season: "1933/34",
				positions: ["POR"],
				overall: 84,
				sourceRefs: ["athletic-official-1933-34-squad"],
				dataConfidence: .78
			}),
			makePlayer({
				name: "Ispizua",
				season: "1933/34",
				positions: ["POR"],
				overall: 73,
				sourceRefs: ["athletic-official-1933-34-squad"],
				dataConfidence: .66
			}),
			makePlayer({
				name: "Calvo",
				season: "1933/34",
				positions: ["DFC"],
				overall: 75,
				sourceRefs: ["athletic-official-1933-34-squad"],
				dataConfidence: .62
			}),
			makePlayer({
				name: "Cilaurren",
				season: "1933/34",
				positions: ["MCD", "DFC"],
				overall: 83,
				sourceRefs: ["athletic-official-1933-34-squad"],
				dataConfidence: .78
			}),
			makePlayer({
				name: "Muguerza",
				season: "1933/34",
				positions: ["MCD", "DFC"],
				overall: 82,
				sourceRefs: ["athletic-official-1933-34-squad"],
				dataConfidence: .78
			}),
			makePlayer({
				name: "Oceja",
				season: "1933/34",
				positions: ["DFC", "LD"],
				overall: 79,
				sourceRefs: ["athletic-official-1933-34-squad"],
				dataConfidence: .68
			}),
			makePlayer({
				name: "Urkizu",
				season: "1933/34",
				positions: ["DFC", "LI"],
				overall: 81,
				sourceRefs: ["athletic-official-1933-34-squad"],
				dataConfidence: .72
			}),
			makePlayer({
				name: "Zabala",
				season: "1933/34",
				positions: ["DFC", "LD"],
				overall: 76,
				sourceRefs: ["athletic-official-1933-34-squad"],
				dataConfidence: .66
			}),
			makePlayer({
				name: "Careaga",
				season: "1933/34",
				positions: ["MC", "MCD"],
				overall: 73,
				sourceRefs: ["athletic-official-1933-34-squad"],
				dataConfidence: .62
			}),
			makePlayer({
				name: "Felipés",
				season: "1933/34",
				positions: ["MC", "MCD"],
				overall: 75,
				sourceRefs: ["athletic-official-1933-34-squad"],
				dataConfidence: .62
			}),
			makePlayer({
				name: "Gerardo",
				season: "1933/34",
				positions: ["MC", "MCD"],
				overall: 75,
				sourceRefs: ["athletic-official-1933-34-squad"],
				dataConfidence: .62
			}),
			makePlayer({
				name: "Roberto",
				season: "1933/34",
				positions: ["MC", "MP"],
				overall: 82,
				sourceRefs: ["athletic-official-1933-34-squad"],
				dataConfidence: .78
			}),
			makePlayer({
				name: "Bata",
				season: "1933/34",
				positions: ["DC"],
				overall: 83,
				sourceRefs: ["athletic-official-1933-34-squad"],
				dataConfidence: .8
			}),
			makePlayer({
				name: "Chirri II",
				season: "1933/34",
				positions: ["SD", "MP"],
				overall: 81,
				sourceRefs: ["athletic-official-1933-34-squad"],
				dataConfidence: .76
			}),
			makePlayer({
				name: "Gorostiza",
				season: "1933/34",
				positions: ["EI", "MI"],
				overall: 84,
				sourceRefs: ["athletic-official-1933-34-squad"],
				dataConfidence: .78
			}),
			makePlayer({
				name: "Iraragorri",
				season: "1933/34",
				positions: ["MP", "SD"],
				overall: 83,
				sourceRefs: ["athletic-official-1933-34-squad"],
				dataConfidence: .8
			}),
			makePlayer({
				name: "Lafuente",
				season: "1933/34",
				positions: [
					"ED",
					"EI",
					"DC"
				],
				overall: 82,
				sourceRefs: ["athletic-official-1933-34-squad"],
				dataConfidence: .76
			}),
			makePlayer({
				name: "Unamuno",
				season: "1933/34",
				positions: ["DC"],
				overall: 81,
				sourceRefs: ["athletic-official-1933-34-squad"],
				dataConfidence: .7
			})
		]
	},
	{
		season: "1934/35",
		coach: makeCoach({
			name: "Patricio Caicedo",
			coachId: "patricio_caicedo",
			season: "1934/35",
			overall: 84,
			skills: {
				attack: 84,
				defense: 82,
				management: 85,
				mentality: 86,
				cup: 82,
				europe: 65
			},
			sourceRefs: ["athletic-official-1934-35-squad", "athletic-official-patricio-caicedo"],
			dataConfidence: .8,
			notes: "Temporada de transición competitiva con varios nombres del bloque campeón y rotación ofensiva."
		}),
		players: [
			makePlayer({
				name: "Blasco",
				season: "1934/35",
				positions: ["POR"],
				overall: 84,
				sourceRefs: ["athletic-official-1934-35-squad"],
				dataConfidence: .84
			}),
			makePlayer({
				name: "Ispizua",
				season: "1934/35",
				positions: ["POR"],
				overall: 73,
				sourceRefs: ["athletic-official-1934-35-squad"],
				dataConfidence: .68
			}),
			makePlayer({
				name: "Ramos",
				season: "1934/35",
				positions: ["POR"],
				overall: 70,
				sourceRefs: ["athletic-official-1934-35-squad"],
				dataConfidence: .55
			}),
			makePlayer({
				name: "Calvo",
				season: "1934/35",
				positions: ["DFC"],
				overall: 75,
				sourceRefs: ["athletic-official-1934-35-squad"],
				dataConfidence: .64
			}),
			makePlayer({
				name: "Cilaurren",
				season: "1934/35",
				positions: ["MCD", "DFC"],
				overall: 83,
				sourceRefs: ["athletic-official-1934-35-squad"],
				dataConfidence: .8
			}),
			makePlayer({
				name: "Muguerza",
				season: "1934/35",
				positions: ["MCD", "DFC"],
				overall: 82,
				sourceRefs: ["athletic-official-1934-35-squad"],
				dataConfidence: .78
			}),
			makePlayer({
				name: "Oceja",
				season: "1934/35",
				positions: ["DFC", "LD"],
				overall: 80,
				sourceRefs: ["athletic-official-1934-35-squad"],
				dataConfidence: .72
			}),
			makePlayer({
				name: "Tamayo",
				season: "1934/35",
				positions: ["DFC", "LI"],
				overall: 73,
				sourceRefs: ["athletic-official-1934-35-squad"],
				dataConfidence: .6
			}),
			makePlayer({
				name: "Urbano",
				season: "1934/35",
				positions: ["DFC", "LD"],
				overall: 73,
				sourceRefs: ["athletic-official-1934-35-squad"],
				dataConfidence: .6
			}),
			makePlayer({
				name: "Urkizu",
				season: "1934/35",
				positions: ["DFC", "LI"],
				overall: 80,
				sourceRefs: ["athletic-official-1934-35-squad"],
				dataConfidence: .7
			}),
			makePlayer({
				name: "Zabala",
				season: "1934/35",
				positions: ["DFC", "LD"],
				overall: 76,
				sourceRefs: ["athletic-official-1934-35-squad"],
				dataConfidence: .66
			}),
			makePlayer({
				name: "Careaga",
				season: "1934/35",
				positions: ["MC", "MCD"],
				overall: 73,
				sourceRefs: ["athletic-official-1934-35-squad"],
				dataConfidence: .62
			}),
			makePlayer({
				name: "Felipés",
				season: "1934/35",
				positions: ["MC", "MCD"],
				overall: 75,
				sourceRefs: ["athletic-official-1934-35-squad"],
				dataConfidence: .62
			}),
			makePlayer({
				name: "Gerardo",
				season: "1934/35",
				positions: ["MC", "MCD"],
				overall: 75,
				sourceRefs: ["athletic-official-1934-35-squad"],
				dataConfidence: .62
			}),
			makePlayer({
				name: "Roberto",
				season: "1934/35",
				positions: ["MC", "MP"],
				overall: 82,
				sourceRefs: ["athletic-official-1934-35-squad"],
				dataConfidence: .78
			}),
			makePlayer({
				name: "Aroma",
				season: "1934/35",
				positions: ["ED", "MD"],
				overall: 72,
				sourceRefs: ["athletic-official-1934-35-squad"],
				dataConfidence: .58
			}),
			makePlayer({
				name: "Bata",
				season: "1934/35",
				positions: ["DC"],
				overall: 83,
				sourceRefs: ["athletic-official-1934-35-squad"],
				dataConfidence: .78
			}),
			makePlayer({
				name: "Chirri II",
				season: "1934/35",
				positions: ["SD", "MP"],
				overall: 81,
				sourceRefs: ["athletic-official-1934-35-squad"],
				dataConfidence: .72
			}),
			makePlayer({
				name: "Doro",
				season: "1934/35",
				positions: ["DC", "SD"],
				overall: 73,
				sourceRefs: ["athletic-official-1934-35-squad"],
				dataConfidence: .62
			}),
			makePlayer({
				name: "Elices",
				season: "1934/35",
				positions: ["EI", "DC"],
				overall: 78,
				sourceRefs: ["athletic-official-1934-35-squad"],
				dataConfidence: .66
			}),
			makePlayer({
				name: "Garate",
				season: "1934/35",
				positions: ["DC", "SD"],
				overall: 76,
				sourceRefs: ["athletic-official-1934-35-squad"],
				dataConfidence: .62
			}),
			makePlayer({
				name: "Gorostiza",
				season: "1934/35",
				positions: ["EI", "MI"],
				overall: 84,
				sourceRefs: ["athletic-official-1934-35-squad"],
				dataConfidence: .76
			}),
			makePlayer({
				name: "Iraragorri",
				season: "1934/35",
				positions: ["MP", "SD"],
				overall: 83,
				sourceRefs: ["athletic-official-1934-35-squad"],
				dataConfidence: .78
			}),
			makePlayer({
				name: "Mandaluniz",
				season: "1934/35",
				positions: ["DC", "SD"],
				overall: 73,
				sourceRefs: ["athletic-official-1934-35-squad"],
				dataConfidence: .6
			})
		]
	},
	{
		season: "1935/36",
		coach: makeCoach({
			name: "William Garbutt",
			coachId: "william_garbutt",
			season: "1935/36",
			overall: 90,
			skills: {
				attack: 88,
				defense: 90,
				management: 91,
				mentality: 92,
				cup: 84,
				europe: 75
			},
			sourceRefs: ["athletic-official-1935-36-squad", "athletic-official-william-garbutt"],
			dataConfidence: .88,
			notes: "Campeón de Liga 1935/36. Perfil de gestión y solidez competitiva."
		}),
		players: [
			makePlayer({
				name: "Blasco",
				season: "1935/36",
				positions: ["POR"],
				overall: 84,
				sourceRefs: ["athletic-official-1935-36-squad"],
				dataConfidence: .86
			}),
			makePlayer({
				name: "Ispizua",
				season: "1935/36",
				positions: ["POR"],
				overall: 73,
				sourceRefs: ["athletic-official-1935-36-squad"],
				dataConfidence: .68
			}),
			makePlayer({
				name: "Calvo",
				season: "1935/36",
				positions: ["DFC"],
				overall: 75,
				sourceRefs: ["athletic-official-1935-36-squad"],
				dataConfidence: .66
			}),
			makePlayer({
				name: "Cilaurren",
				season: "1935/36",
				positions: ["MCD", "DFC"],
				overall: 83,
				sourceRefs: ["athletic-official-1935-36-squad"],
				dataConfidence: .84
			}),
			makePlayer({
				name: "Luis",
				season: "1935/36",
				positions: ["DFC", "LD"],
				overall: 73,
				sourceRefs: ["athletic-official-1935-36-squad"],
				dataConfidence: .6
			}),
			makePlayer({
				name: "Mieza",
				season: "1935/36",
				positions: ["DFC", "LI"],
				overall: 73,
				sourceRefs: ["athletic-official-1935-36-squad"],
				dataConfidence: .6
			}),
			makePlayer({
				name: "Moronati",
				season: "1935/36",
				positions: ["DFC"],
				overall: 73,
				sourceRefs: ["athletic-official-1935-36-squad"],
				dataConfidence: .62
			}),
			makePlayer({
				name: "Muguerza",
				season: "1935/36",
				positions: ["MCD", "DFC"],
				overall: 82,
				sourceRefs: ["athletic-official-1935-36-squad"],
				dataConfidence: .82
			}),
			makePlayer({
				name: "Oceja",
				season: "1935/36",
				positions: ["DFC", "LD"],
				overall: 80,
				sourceRefs: ["athletic-official-1935-36-squad"],
				dataConfidence: .78
			}),
			makePlayer({
				name: "Urbano",
				season: "1935/36",
				positions: ["DFC", "LD"],
				overall: 75,
				sourceRefs: ["athletic-official-1935-36-squad"],
				dataConfidence: .64
			}),
			makePlayer({
				name: "Zabala",
				season: "1935/36",
				positions: ["DFC", "LD"],
				overall: 77,
				sourceRefs: ["athletic-official-1935-36-squad"],
				dataConfidence: .72
			}),
			makePlayer({
				name: "Zubieta",
				season: "1935/36",
				positions: ["MCD", "MC"],
				overall: 82,
				sourceRefs: ["athletic-official-1935-36-squad"],
				dataConfidence: .76
			}),
			makePlayer({
				name: "Careaga",
				season: "1935/36",
				positions: ["MC", "MCD"],
				overall: 73,
				sourceRefs: ["athletic-official-1935-36-squad"],
				dataConfidence: .62
			}),
			makePlayer({
				name: "Emilio",
				season: "1935/36",
				positions: ["MC", "MP"],
				overall: 73,
				sourceRefs: ["athletic-official-1935-36-squad"],
				dataConfidence: .6
			}),
			makePlayer({
				name: "Gerardo",
				season: "1935/36",
				positions: ["MC", "MCD"],
				overall: 75,
				sourceRefs: ["athletic-official-1935-36-squad"],
				dataConfidence: .62
			}),
			makePlayer({
				name: "Roberto",
				season: "1935/36",
				positions: ["MC", "MP"],
				overall: 82,
				sourceRefs: ["athletic-official-1935-36-squad"],
				dataConfidence: .78
			}),
			makePlayer({
				name: "Urra",
				season: "1935/36",
				positions: ["MC", "MCD"],
				overall: 73,
				sourceRefs: ["athletic-official-1935-36-squad"],
				dataConfidence: .62
			}),
			makePlayer({
				name: "Yurrebaso",
				season: "1935/36",
				positions: ["MC", "MI"],
				overall: 73,
				sourceRefs: ["athletic-official-1935-36-squad"],
				dataConfidence: .6
			}),
			makePlayer({
				name: "Bata",
				season: "1935/36",
				positions: ["DC"],
				overall: 83,
				sourceRefs: ["athletic-official-1935-36-squad"],
				dataConfidence: .8
			}),
			makePlayer({
				name: "Bergareche F",
				season: "1935/36",
				positions: ["EI", "MI"],
				overall: 73,
				sourceRefs: ["athletic-official-1935-36-squad"],
				dataConfidence: .58
			}),
			makePlayer({
				name: "Doro",
				season: "1935/36",
				positions: ["DC", "SD"],
				overall: 75,
				sourceRefs: ["athletic-official-1935-36-squad"],
				dataConfidence: .64
			}),
			makePlayer({
				name: "Elices",
				season: "1935/36",
				positions: ["EI", "DC"],
				overall: 80,
				sourceRefs: ["athletic-official-1935-36-squad"],
				dataConfidence: .7
			}),
			makePlayer({
				name: "Etxebarria",
				season: "1935/36",
				positions: ["ED", "MD"],
				overall: 73,
				sourceRefs: ["athletic-official-1935-36-squad"],
				dataConfidence: .58
			}),
			makePlayer({
				name: "Garate",
				season: "1935/36",
				positions: ["DC", "SD"],
				overall: 78,
				sourceRefs: ["athletic-official-1935-36-squad"],
				dataConfidence: .66
			})
		]
	},
	{
		season: "1983/84",
		coach: makeCoach({
			name: "Javier Clemente",
			coachId: "javier_clemente",
			season: "1983/84",
			overall: 88,
			skills: {
				"attack": 74,
				"defense": 92,
				"management": 89,
				"mentality": 94,
				"cup": 88,
				"europe": 75
			},
			sourceRefs: ["athletic-official-1983-84-squad"],
			dataConfidence: .8,
			notes: "Entrenador del Athletic campeón 1983/84. Skills tácticos de entrenador en revisión manual basada en perfil competitivo y palmarés de la temporada."
		}),
		players: [
			makePlayer({
				name: "Cedrún",
				season: "1983/84",
				positions: ["POR"],
				overall: 76,
				sourceRefs: ["athletic-official-1983-84-squad"]
			}),
			makePlayer({
				name: "Meléndez",
				season: "1983/84",
				positions: ["POR"],
				overall: 68,
				sourceRefs: ["athletic-official-1983-84-squad"]
			}),
			makePlayer({
				name: "Zubizarreta",
				season: "1983/84",
				positions: ["POR"],
				overall: 88,
				sourceRefs: ["athletic-official-1983-84-squad"]
			}),
			makePlayer({
				name: "Andrinua",
				season: "1983/84",
				positions: ["DFC"],
				overall: 77,
				sourceRefs: ["athletic-official-1983-84-squad"]
			}),
			makePlayer({
				name: "Bolaños",
				season: "1983/84",
				positions: ["DFC", "LD"],
				overall: 70,
				sourceRefs: ["athletic-official-1983-84-squad"]
			}),
			makePlayer({
				name: "De la Fuente",
				season: "1983/84",
				positions: ["LI"],
				overall: 74,
				sourceRefs: ["athletic-official-1983-84-squad"]
			}),
			makePlayer({
				name: "Goikoetxea",
				season: "1983/84",
				positions: ["DFC"],
				overall: 81,
				sourceRefs: ["athletic-official-1983-84-squad"]
			}),
			makePlayer({
				name: "Liceranzu",
				season: "1983/84",
				positions: ["DFC"],
				overall: 79,
				sourceRefs: ["athletic-official-1983-84-squad"]
			}),
			makePlayer({
				name: "Murua",
				season: "1983/84",
				positions: ["DFC"],
				overall: 71,
				sourceRefs: ["athletic-official-1983-84-squad"]
			}),
			makePlayer({
				name: "Núñez",
				season: "1983/84",
				positions: ["LD", "DFC"],
				overall: 70,
				sourceRefs: ["athletic-official-1983-84-squad"]
			}),
			makePlayer({
				name: "Patxi Salinas",
				season: "1983/84",
				positions: ["LI", "DFC"],
				overall: 72,
				sourceRefs: ["athletic-official-1983-84-squad"]
			}),
			makePlayer({
				name: "Pizo Gómez",
				season: "1983/84",
				positions: ["DFC"],
				overall: 69,
				sourceRefs: ["athletic-official-1983-84-squad"]
			}),
			makePlayer({
				name: "Rubén Bilbao",
				season: "1983/84",
				positions: ["LD"],
				overall: 66,
				sourceRefs: ["athletic-official-1983-84-squad"]
			}),
			makePlayer({
				name: "Urkiaga",
				season: "1983/84",
				positions: ["LD"],
				overall: 82,
				sourceRefs: ["athletic-official-1983-84-squad"]
			}),
			makePlayer({
				name: "Aspiazu",
				season: "1983/84",
				positions: ["MC"],
				overall: 73,
				sourceRefs: ["athletic-official-1983-84-squad"]
			}),
			makePlayer({
				name: "De Andrés",
				season: "1983/84",
				positions: ["MCD", "MC"],
				overall: 79,
				sourceRefs: ["athletic-official-1983-84-squad"]
			}),
			makePlayer({
				name: "Elgezabal",
				season: "1983/84",
				positions: ["MC"],
				overall: 70,
				sourceRefs: ["athletic-official-1983-84-squad"]
			}),
			makePlayer({
				name: "Gallego",
				season: "1983/84",
				positions: ["MC"],
				overall: 79,
				sourceRefs: ["athletic-official-1983-84-squad"]
			}),
			makePlayer({
				name: "Sola",
				season: "1983/84",
				positions: ["MC", "MP"],
				overall: 76,
				sourceRefs: ["athletic-official-1983-84-squad"]
			}),
			makePlayer({
				name: "Urtubi",
				season: "1983/84",
				positions: ["MC", "MP"],
				overall: 82,
				sourceRefs: ["athletic-official-1983-84-squad"]
			}),
			makePlayer({
				name: "Argote",
				season: "1983/84",
				positions: ["EI", "MI"],
				overall: 79,
				sourceRefs: ["athletic-official-1983-84-squad"]
			}),
			makePlayer({
				name: "Dani",
				season: "1983/84",
				positions: ["DC", "SD"],
				overall: 87,
				sourceRefs: ["athletic-official-1983-84-squad"]
			}),
			makePlayer({
				name: "Endika",
				season: "1983/84",
				positions: ["ED", "DC"],
				overall: 76,
				sourceRefs: ["athletic-official-1983-84-squad"]
			}),
			makePlayer({
				name: "Julio Salinas",
				season: "1983/84",
				positions: ["DC"],
				overall: 78,
				sourceRefs: ["athletic-official-1983-84-squad"]
			}),
			makePlayer({
				name: "Noriega",
				season: "1983/84",
				positions: ["DC"],
				overall: 81,
				sourceRefs: ["athletic-official-1983-84-squad"]
			}),
			makePlayer({
				name: "Sarabia",
				season: "1983/84",
				positions: [
					"MP",
					"SD",
					"DC"
				],
				overall: 80,
				sourceRefs: ["athletic-official-1983-84-squad"]
			})
		]
	},
	{
		season: "1997/98",
		coach: makeCoach({
			name: "Luis Fernández",
			coachId: "luis_fernandez",
			season: "1997/98",
			overall: 84,
			skills: {
				"attack": 80,
				"defense": 82,
				"management": 86,
				"mentality": 86,
				"cup": 75,
				"europe": 78
			},
			sourceRefs: ["athletic-official-1997-98-squad"],
			dataConfidence: .8,
			notes: "Entrenador del Athletic subcampeón 1997/98. Skills estimados con revisión manual a partir del rendimiento competitivo de la temporada."
		}),
		players: [
			makePlayer({
				name: "Valencia",
				season: "1997/98",
				positions: ["POR"],
				overall: 78,
				sourceRefs: ["athletic-official-1997-98-squad"]
			}),
			makePlayer({
				name: "Etxeberria, I",
				season: "1997/98",
				positions: ["POR"],
				overall: 70,
				sourceRefs: ["athletic-official-1997-98-squad"]
			}),
			makePlayer({
				name: "Alkorta",
				season: "1997/98",
				positions: ["DFC"],
				overall: 79,
				sourceRefs: ["athletic-official-1997-98-squad"]
			}),
			makePlayer({
				name: "Tabuenka",
				season: "1997/98",
				positions: ["LD", "LD"],
				overall: 75,
				sourceRefs: ["athletic-official-1997-98-squad"]
			}),
			makePlayer({
				name: "Larrazabal",
				season: "1997/98",
				positions: ["LI", "MI"],
				overall: 78,
				sourceRefs: ["athletic-official-1997-98-squad"]
			}),
			makePlayer({
				name: "Lacruz",
				season: "1997/98",
				positions: ["DFC"],
				overall: 75,
				sourceRefs: ["athletic-official-1997-98-squad"]
			}),
			makePlayer({
				name: "Carlos García",
				season: "1997/98",
				positions: ["DFC"],
				overall: 73,
				sourceRefs: ["athletic-official-1997-98-squad"]
			}),
			makePlayer({
				name: "Ferreira",
				season: "1997/98",
				positions: ["DFC"],
				overall: 70,
				sourceRefs: ["athletic-official-1997-98-squad"]
			}),
			makePlayer({
				name: "Lasa, M",
				season: "1997/98",
				positions: ["LI"],
				overall: 74,
				sourceRefs: ["athletic-official-1997-98-squad"]
			}),
			makePlayer({
				name: "Larrainzar",
				season: "1997/98",
				positions: ["LD", "DFC"],
				overall: 75,
				sourceRefs: ["athletic-official-1997-98-squad"]
			}),
			makePlayer({
				name: "Ríos",
				season: "1997/98",
				positions: ["DFC", "MCD"],
				overall: 76,
				sourceRefs: ["athletic-official-1997-98-squad"]
			}),
			makePlayer({
				name: "César",
				season: "1997/98",
				positions: ["DFC"],
				overall: 70,
				sourceRefs: ["athletic-official-1997-98-squad"]
			}),
			makePlayer({
				name: "Urrutia",
				season: "1997/98",
				positions: ["MCD", "MC"],
				overall: 78,
				sourceRefs: ["athletic-official-1997-98-squad"]
			}),
			makePlayer({
				name: "Goikoetxea, JA",
				season: "1997/98",
				positions: ["MD", "MC"],
				overall: 73,
				sourceRefs: ["athletic-official-1997-98-squad"]
			}),
			makePlayer({
				name: "Guerrero",
				season: "1997/98",
				positions: ["MP", "MC"],
				overall: 90,
				sourceRefs: ["athletic-official-1997-98-squad"]
			}),
			makePlayer({
				name: "José Mari",
				season: "1997/98",
				positions: ["MC", "MP"],
				overall: 75,
				sourceRefs: ["athletic-official-1997-98-squad"]
			}),
			makePlayer({
				name: "Nagore",
				season: "1997/98",
				positions: ["MCD", "MC"],
				overall: 73,
				sourceRefs: ["athletic-official-1997-98-squad"]
			}),
			makePlayer({
				name: "Alkiza",
				season: "1997/98",
				positions: ["MC"],
				overall: 76,
				sourceRefs: ["athletic-official-1997-98-squad"]
			}),
			makePlayer({
				name: "Javi González",
				season: "1997/98",
				positions: ["MI", "MP"],
				overall: 73,
				sourceRefs: ["athletic-official-1997-98-squad"]
			}),
			makePlayer({
				name: "Jorge Pérez",
				season: "1997/98",
				positions: ["MC"],
				overall: 70,
				sourceRefs: ["athletic-official-1997-98-squad"]
			}),
			makePlayer({
				name: "Garitano, G",
				season: "1997/98",
				positions: ["MC"],
				overall: 73,
				sourceRefs: ["athletic-official-1997-98-squad"]
			}),
			makePlayer({
				name: "Ziganda",
				season: "1997/98",
				positions: ["DC"],
				overall: 79,
				sourceRefs: ["athletic-official-1997-98-squad"]
			}),
			makePlayer({
				name: "Etxeberria",
				season: "1997/98",
				positions: ["ED", "DC"],
				overall: 84,
				sourceRefs: ["athletic-official-1997-98-squad"]
			}),
			makePlayer({
				name: "Urzaiz",
				season: "1997/98",
				positions: ["DC"],
				overall: 79,
				sourceRefs: ["athletic-official-1997-98-squad"]
			}),
			makePlayer({
				name: "Huegun",
				season: "1997/98",
				positions: ["DC"],
				overall: 70,
				sourceRefs: ["athletic-official-1997-98-squad"]
			}),
			makePlayer({
				name: "Mario",
				season: "1997/98",
				positions: ["DC"],
				overall: 69,
				sourceRefs: ["athletic-official-1997-98-squad"]
			})
		]
	},
	{
		season: "2011/12",
		coach: makeCoach({
			name: "Marcelo Alberto Bielsa",
			coachId: "marcelo_bielsa",
			season: "2011/12",
			overall: 87,
			skills: {
				"attack": 88,
				"defense": 78,
				"management": 83,
				"mentality": 90,
				"cup": 84,
				"europe": 88
			},
			sourceRefs: ["athletic-official-2011-12-squad"],
			dataConfidence: .85,
			notes: "Entrenador de la temporada 2011/12, finalista de Europa League y Copa. Skills estimados por perfil táctico y rendimiento competitivo."
		}),
		players: [
			makePlayer({
				name: "Iraizoz",
				season: "2011/12",
				positions: ["POR"],
				overall: 76,
				sourceRefs: ["athletic-official-2011-12-squad"]
			}),
			makePlayer({
				name: "Raúl F.",
				season: "2011/12",
				positions: ["POR"],
				overall: 68,
				sourceRefs: ["athletic-official-2011-12-squad"]
			}),
			makePlayer({
				name: "Aurtenetxe",
				season: "2011/12",
				positions: ["LI", "DFC"],
				overall: 74,
				sourceRefs: ["athletic-official-2011-12-squad"]
			}),
			makePlayer({
				name: "Amorebieta",
				season: "2011/12",
				positions: ["DFC"],
				overall: 77,
				sourceRefs: ["athletic-official-2011-12-squad"]
			}),
			makePlayer({
				name: "De Marcos",
				season: "2011/12",
				positions: [
					"LD",
					"MD",
					"MC"
				],
				overall: 83,
				sourceRefs: ["athletic-official-2011-12-squad"]
			}),
			makePlayer({
				name: "Koikili",
				season: "2011/12",
				positions: ["LI"],
				overall: 76,
				sourceRefs: ["athletic-official-2011-12-squad"]
			}),
			makePlayer({
				name: "Iraola",
				season: "2011/12",
				positions: ["LD", "LD"],
				overall: 85,
				sourceRefs: ["athletic-official-2011-12-squad"]
			}),
			makePlayer({
				name: "Zubiaurre",
				season: "2011/12",
				positions: ["LD"],
				overall: 68,
				sourceRefs: ["athletic-official-2011-12-squad"]
			}),
			makePlayer({
				name: "Aitor Ocio",
				season: "2011/12",
				positions: ["DFC"],
				overall: 71,
				sourceRefs: ["athletic-official-2011-12-squad"]
			}),
			makePlayer({
				name: "Castillo",
				season: "2011/12",
				positions: ["LI"],
				overall: 69,
				sourceRefs: ["athletic-official-2011-12-squad"]
			}),
			makePlayer({
				name: "Ekiza",
				season: "2011/12",
				positions: ["DFC"],
				overall: 73,
				sourceRefs: ["athletic-official-2011-12-squad"]
			}),
			makePlayer({
				name: "Ramalho",
				season: "2011/12",
				positions: ["DFC", "LD"],
				overall: 67,
				sourceRefs: ["athletic-official-2011-12-squad"]
			}),
			makePlayer({
				name: "San José",
				season: "2011/12",
				positions: [
					"MCD",
					"DFC",
					"MC"
				],
				overall: 76,
				sourceRefs: ["athletic-official-2011-12-squad"]
			}),
			makePlayer({
				name: "David López",
				season: "2011/12",
				positions: ["MD", "MC"],
				overall: 73,
				sourceRefs: ["athletic-official-2011-12-squad"]
			}),
			makePlayer({
				name: "Iturraspe",
				season: "2011/12",
				positions: ["MCD", "MC"],
				overall: 79,
				sourceRefs: ["athletic-official-2011-12-squad"]
			}),
			makePlayer({
				name: "Gabilondo",
				season: "2011/12",
				positions: ["MI", "EI"],
				overall: 73,
				sourceRefs: ["athletic-official-2011-12-squad"]
			}),
			makePlayer({
				name: "Orbaiz",
				season: "2011/12",
				positions: ["MCD", "MC"],
				overall: 73,
				sourceRefs: ["athletic-official-2011-12-squad"]
			}),
			makePlayer({
				name: "Iñigo Pérez",
				season: "2011/12",
				positions: ["MC", "MI"],
				overall: 72,
				sourceRefs: ["athletic-official-2011-12-squad"]
			}),
			makePlayer({
				name: "Gurpegi",
				season: "2011/12",
				positions: [
					"MCD",
					"MC",
					"DFC"
				],
				overall: 75,
				sourceRefs: ["athletic-official-2011-12-squad"]
			}),
			makePlayer({
				name: "Ander Herrera",
				season: "2011/12",
				positions: ["MC", "MP"],
				overall: 86,
				sourceRefs: ["athletic-official-2011-12-squad"]
			}),
			makePlayer({
				name: "J.Martínez",
				season: "2011/12",
				positions: [
					"DFC",
					"MCD",
					"MC"
				],
				overall: 83,
				sourceRefs: ["athletic-official-2011-12-squad"]
			}),
			makePlayer({
				name: "R. de Galarreta",
				season: "2011/12",
				positions: ["MC"],
				overall: 68,
				sourceRefs: ["athletic-official-2011-12-squad"]
			}),
			makePlayer({
				name: "Toquero",
				season: "2011/12",
				positions: ["DC", "ED"],
				overall: 73,
				sourceRefs: ["athletic-official-2011-12-squad"]
			}),
			makePlayer({
				name: "Llorente",
				season: "2011/12",
				positions: ["DC"],
				overall: 85,
				sourceRefs: ["athletic-official-2011-12-squad"]
			}),
			makePlayer({
				name: "Susaeta",
				season: "2011/12",
				positions: ["ED", "MD"],
				overall: 84,
				sourceRefs: ["athletic-official-2011-12-squad"]
			}),
			makePlayer({
				name: "Muniain",
				season: "2011/12",
				positions: ["EI", "MP"],
				overall: 86,
				sourceRefs: ["athletic-official-2011-12-squad"]
			}),
			makePlayer({
				name: "Igor Martínez",
				season: "2011/12",
				positions: ["EI", "ED"],
				overall: 70,
				sourceRefs: ["athletic-official-2011-12-squad"]
			}),
			makePlayer({
				name: "Ibai",
				season: "2011/12",
				positions: [
					"EI",
					"ED",
					"MI"
				],
				overall: 73,
				sourceRefs: ["athletic-official-2011-12-squad"]
			})
		]
	},
	{
		season: "2015/16",
		coach: makeCoach({
			name: "Ernesto Valverde",
			coachId: "ernesto_valverde",
			season: "2015/16",
			overall: 86,
			skills: {
				"attack": 82,
				"defense": 84,
				"management": 90,
				"mentality": 86,
				"cup": 84,
				"europe": 82
			},
			sourceRefs: ["athletic-official-2015-16-squad"],
			dataConfidence: .85,
			notes: "Entrenador de Athletic Club 2015/16. Skills estimados por perfil de gestión, equilibrio competitivo y contexto de la temporada."
		}),
		players: [
			makePlayer({
				name: "Iraizoz",
				season: "2015/16",
				positions: ["POR"],
				overall: 76,
				sourceRefs: ["athletic-official-2015-16-squad"]
			}),
			makePlayer({
				name: "Iago Herrerín",
				season: "2015/16",
				positions: ["POR"],
				overall: 72,
				sourceRefs: ["athletic-official-2015-16-squad"]
			}),
			makePlayer({
				name: "E.Bóveda",
				season: "2015/16",
				positions: ["LD", "DFC"],
				overall: 73,
				sourceRefs: ["athletic-official-2015-16-squad"]
			}),
			makePlayer({
				name: "Elustondo",
				season: "2015/16",
				positions: ["DFC", "MCD"],
				overall: 70,
				sourceRefs: ["athletic-official-2015-16-squad"]
			}),
			makePlayer({
				name: "Laporte",
				season: "2015/16",
				positions: ["DFC"],
				overall: 85,
				sourceRefs: ["athletic-official-2015-16-squad"]
			}),
			makePlayer({
				name: "De Marcos",
				season: "2015/16",
				positions: [
					"LD",
					"MD",
					"MC"
				],
				overall: 83,
				sourceRefs: ["athletic-official-2015-16-squad"]
			}),
			makePlayer({
				name: "X.Etxeita",
				season: "2015/16",
				positions: ["DFC"],
				overall: 75,
				sourceRefs: ["athletic-official-2015-16-squad"]
			}),
			makePlayer({
				name: "Balenziaga",
				season: "2015/16",
				positions: ["LI"],
				overall: 76,
				sourceRefs: ["athletic-official-2015-16-squad"]
			}),
			makePlayer({
				name: "I. Lekue",
				season: "2015/16",
				positions: [
					"LD",
					"LI",
					"MD"
				],
				overall: 72,
				sourceRefs: ["athletic-official-2015-16-squad"]
			}),
			makePlayer({
				name: "Saborit",
				season: "2015/16",
				positions: ["LI"],
				overall: 70,
				sourceRefs: ["athletic-official-2015-16-squad"]
			}),
			makePlayer({
				name: "Eraso",
				season: "2015/16",
				positions: ["MP", "MC"],
				overall: 72,
				sourceRefs: ["athletic-official-2015-16-squad"]
			}),
			makePlayer({
				name: "San José",
				season: "2015/16",
				positions: [
					"MCD",
					"DFC",
					"MC"
				],
				overall: 77,
				sourceRefs: ["athletic-official-2015-16-squad"]
			}),
			makePlayer({
				name: "Beñat",
				season: "2015/16",
				positions: ["MC", "MCD"],
				overall: 79,
				sourceRefs: ["athletic-official-2015-16-squad"]
			}),
			makePlayer({
				name: "Iturraspe",
				season: "2015/16",
				positions: ["MCD", "MC"],
				overall: 80,
				sourceRefs: ["athletic-official-2015-16-squad"]
			}),
			makePlayer({
				name: "Mikel Rico",
				season: "2015/16",
				positions: ["MC"],
				overall: 75,
				sourceRefs: ["athletic-official-2015-16-squad"]
			}),
			makePlayer({
				name: "Gurpegi",
				season: "2015/16",
				positions: ["MCD", "DFC"],
				overall: 71,
				sourceRefs: ["athletic-official-2015-16-squad"]
			}),
			makePlayer({
				name: "Aketxe",
				season: "2015/16",
				positions: ["MP", "MC"],
				overall: 70,
				sourceRefs: ["athletic-official-2015-16-squad"]
			}),
			makePlayer({
				name: "Kike Sola",
				season: "2015/16",
				positions: ["DC"],
				overall: 70,
				sourceRefs: ["athletic-official-2015-16-squad"]
			}),
			makePlayer({
				name: "Ibai",
				season: "2015/16",
				positions: [
					"EI",
					"ED",
					"MI"
				],
				overall: 71,
				sourceRefs: ["athletic-official-2015-16-squad"]
			}),
			makePlayer({
				name: "Susaeta",
				season: "2015/16",
				positions: ["ED", "MD"],
				overall: 84,
				sourceRefs: ["athletic-official-2015-16-squad"]
			}),
			makePlayer({
				name: "Williams",
				season: "2015/16",
				positions: ["ED", "DC"],
				overall: 83,
				sourceRefs: ["athletic-official-2015-16-squad"]
			}),
			makePlayer({
				name: "Muniain",
				season: "2015/16",
				positions: ["EI", "MP"],
				overall: 86,
				sourceRefs: ["athletic-official-2015-16-squad"]
			}),
			makePlayer({
				name: "Aduriz",
				season: "2015/16",
				positions: ["DC"],
				overall: 88,
				sourceRefs: ["athletic-official-2015-16-squad", "espn-athletic-2015-16-squad-stats"],
				matches: 55,
				goals: 36,
				dataConfidence: .75,
				notes: "Dato parcial verificado para partidos/goles; minutos y asistencias pendientes de verificación completa."
			}),
			makePlayer({
				name: "Viguera",
				season: "2015/16",
				positions: ["DC", "SD"],
				overall: 70,
				sourceRefs: ["athletic-official-2015-16-squad"]
			}),
			makePlayer({
				name: "Raúl García",
				season: "2015/16",
				positions: [
					"MP",
					"MC",
					"SD"
				],
				overall: 79,
				sourceRefs: ["athletic-official-2015-16-squad"]
			}),
			makePlayer({
				name: "Sabin Merino",
				season: "2015/16",
				positions: ["DC", "EI"],
				overall: 73,
				sourceRefs: ["athletic-official-2015-16-squad"]
			})
		]
	},
	{
		season: "2023/24",
		coach: makeCoach({
			name: "Ernesto Valverde",
			coachId: "ernesto_valverde",
			season: "2023/24",
			overall: 86,
			skills: {
				"attack": 84,
				"defense": 86,
				"management": 91,
				"mentality": 88,
				"cup": 90,
				"europe": 80
			},
			sourceRefs: ["athletic-official-2023-24-squad"],
			dataConfidence: .85,
			notes: "Entrenador del Athletic campeón de Copa 2023/24. Skills estimados por rendimiento competitivo de la temporada y perfil de gestión."
		}),
		players: [
			makePlayer({
				name: "Unai Simón",
				season: "2023/24",
				positions: ["POR"],
				overall: 85,
				sourceRefs: ["athletic-official-2023-24-squad"]
			}),
			makePlayer({
				name: "Agirrezabala",
				season: "2023/24",
				positions: ["POR"],
				overall: 76,
				sourceRefs: ["athletic-official-2023-24-squad"]
			}),
			makePlayer({
				name: "Vivian",
				season: "2023/24",
				positions: ["DFC"],
				overall: 79,
				sourceRefs: ["athletic-official-2023-24-squad"]
			}),
			makePlayer({
				name: "Paredes",
				season: "2023/24",
				positions: ["DFC"],
				overall: 76,
				sourceRefs: ["athletic-official-2023-24-squad"]
			}),
			makePlayer({
				name: "Yeray",
				season: "2023/24",
				positions: ["DFC"],
				overall: 82,
				sourceRefs: ["athletic-official-2023-24-squad"]
			}),
			makePlayer({
				name: "I. Lekue",
				season: "2023/24",
				positions: ["LD", "LI"],
				overall: 74,
				sourceRefs: ["athletic-official-2023-24-squad"]
			}),
			makePlayer({
				name: "Yuri",
				season: "2023/24",
				positions: ["LI", "LI"],
				overall: 83,
				sourceRefs: ["athletic-official-2023-24-squad"]
			}),
			makePlayer({
				name: "De Marcos",
				season: "2023/24",
				positions: ["LD", "LD"],
				overall: 83,
				sourceRefs: ["athletic-official-2023-24-squad"]
			}),
			makePlayer({
				name: "Imanol",
				season: "2023/24",
				positions: ["LI"],
				overall: 72,
				sourceRefs: ["athletic-official-2023-24-squad"]
			}),
			makePlayer({
				name: "Egiluz",
				season: "2023/24",
				positions: ["DFC"],
				overall: 68,
				sourceRefs: ["athletic-official-2023-24-squad"]
			}),
			makePlayer({
				name: "Vesga",
				season: "2023/24",
				positions: ["MCD", "MC"],
				overall: 77,
				sourceRefs: ["athletic-official-2023-24-squad"]
			}),
			makePlayer({
				name: "O. Sancet",
				season: "2023/24",
				positions: ["MP", "MC"],
				overall: 80,
				sourceRefs: ["athletic-official-2023-24-squad"]
			}),
			makePlayer({
				name: "Dani García",
				season: "2023/24",
				positions: ["MCD", "MC"],
				overall: 79,
				sourceRefs: ["athletic-official-2023-24-squad"]
			}),
			makePlayer({
				name: "R. de Galarreta",
				season: "2023/24",
				positions: ["MC", "MCD"],
				overall: 79,
				sourceRefs: ["athletic-official-2023-24-squad"]
			}),
			makePlayer({
				name: "Ander Herrera",
				season: "2023/24",
				positions: ["MC"],
				overall: 86,
				sourceRefs: ["athletic-official-2023-24-squad"]
			}),
			makePlayer({
				name: "Nolaskoain",
				season: "2023/24",
				positions: ["MCD", "DFC"],
				overall: 70,
				sourceRefs: ["athletic-official-2023-24-squad"]
			}),
			makePlayer({
				name: "Prados",
				season: "2023/24",
				positions: ["MC", "MCD"],
				overall: 76,
				sourceRefs: ["athletic-official-2023-24-squad"]
			}),
			makePlayer({
				name: "Unai Gómez",
				season: "2023/24",
				positions: ["MP", "MC"],
				overall: 73,
				sourceRefs: ["athletic-official-2023-24-squad"]
			}),
			makePlayer({
				name: "Jauregizar",
				season: "2023/24",
				positions: ["MC"],
				overall: 76,
				sourceRefs: ["athletic-official-2023-24-squad"]
			}),
			makePlayer({
				name: "Berenguer",
				season: "2023/24",
				positions: [
					"EI",
					"ED",
					"MI"
				],
				overall: 78,
				sourceRefs: ["athletic-official-2023-24-squad"]
			}),
			makePlayer({
				name: "Williams",
				season: "2023/24",
				positions: ["ED", "DC"],
				overall: 83,
				sourceRefs: ["athletic-official-2023-24-squad"]
			}),
			makePlayer({
				name: "Muniain",
				season: "2023/24",
				positions: ["MP", "EI"],
				overall: 86,
				sourceRefs: ["athletic-official-2023-24-squad"]
			}),
			makePlayer({
				name: "Nico Williams",
				season: "2023/24",
				positions: ["EI", "ED"],
				overall: 86,
				sourceRefs: ["athletic-official-2023-24-squad"]
			}),
			makePlayer({
				name: "Guruzeta",
				season: "2023/24",
				positions: ["DC"],
				overall: 79,
				sourceRefs: ["athletic-official-2023-24-squad"]
			}),
			makePlayer({
				name: "Villalibre",
				season: "2023/24",
				positions: ["DC"],
				overall: 73,
				sourceRefs: ["athletic-official-2023-24-squad"]
			}),
			makePlayer({
				name: "Raúl García",
				season: "2023/24",
				positions: ["MP", "DC"],
				overall: 73,
				sourceRefs: ["athletic-official-2023-24-squad"]
			}),
			makePlayer({
				name: "Adu Ares",
				season: "2023/24",
				positions: ["ED", "EI"],
				overall: 70,
				sourceRefs: ["athletic-official-2023-24-squad"]
			}),
			makePlayer({
				name: "Olabarrieta",
				season: "2023/24",
				positions: ["EI", "ED"],
				overall: 67,
				sourceRefs: ["athletic-official-2023-24-squad"]
			})
		]
	},
	{
		season: "1976/77",
		coach: makeCoach({
			name: "Koldo Aguirre",
			coachId: "koldo_aguirre",
			season: "1976/77",
			overall: 84,
			skills: {
				"attack": 82,
				"defense": 82,
				"management": 85,
				"mentality": 88,
				"cup": 88,
				"europe": 90
			},
			sourceRefs: ["manual-athletic-1976-77-gameplay-squad"],
			dataConfidence: .45,
			notes: "Plantilla ampliada para gameplay basada en la generación finalista europea 1976/77. Revisar fuentes oficiales antes de usar como dato histórico definitivo."
		}),
		players: [
			makePlayer({
				name: "Iribar",
				season: "1976/77",
				positions: ["POR"],
				overall: 90,
				sourceRefs: ["manual-athletic-1976-77-gameplay-squad"],
				dataConfidence: .45
			}),
			makePlayer({
				name: "Javier",
				season: "1976/77",
				positions: ["POR"],
				overall: 70,
				sourceRefs: ["manual-athletic-1976-77-gameplay-squad"],
				dataConfidence: .4
			}),
			makePlayer({
				name: "Escalza",
				season: "1976/77",
				positions: ["LD", "DFC"],
				overall: 76,
				sourceRefs: ["manual-athletic-1976-77-gameplay-squad"],
				dataConfidence: .45
			}),
			makePlayer({
				name: "Guisasola",
				season: "1976/77",
				positions: ["LI", "DFC"],
				overall: 77,
				sourceRefs: ["manual-athletic-1976-77-gameplay-squad"],
				dataConfidence: .45
			}),
			makePlayer({
				name: "Madariaga",
				season: "1976/77",
				positions: ["DFC"],
				overall: 75,
				sourceRefs: ["manual-athletic-1976-77-gameplay-squad"],
				dataConfidence: .4
			}),
			makePlayer({
				name: "Alexanko",
				season: "1976/77",
				positions: ["DFC", "MCD"],
				overall: 79,
				sourceRefs: ["manual-athletic-1976-77-gameplay-squad"],
				dataConfidence: .45
			}),
			makePlayer({
				name: "Goikoetxea",
				season: "1976/77",
				positions: ["DFC"],
				overall: 74,
				sourceRefs: ["manual-athletic-1976-77-gameplay-squad"],
				dataConfidence: .4
			}),
			makePlayer({
				name: "Villar",
				season: "1976/77",
				positions: ["MCD", "MC"],
				overall: 80,
				sourceRefs: ["manual-athletic-1976-77-gameplay-squad"],
				dataConfidence: .45
			}),
			makePlayer({
				name: "Irureta",
				season: "1976/77",
				positions: ["MC", "MCD"],
				overall: 81,
				sourceRefs: ["manual-athletic-1976-77-gameplay-squad"],
				dataConfidence: .45
			}),
			makePlayer({
				name: "Churruca",
				season: "1976/77",
				positions: ["MI", "EI"],
				overall: 77,
				sourceRefs: ["manual-athletic-1976-77-gameplay-squad"],
				dataConfidence: .4
			}),
			makePlayer({
				name: "Rojo I",
				season: "1976/77",
				positions: [
					"MI",
					"EI",
					"MP"
				],
				overall: 87,
				sourceRefs: ["manual-athletic-1976-77-gameplay-squad"],
				dataConfidence: .45
			}),
			makePlayer({
				name: "Rojo II",
				season: "1976/77",
				positions: ["MD", "ED"],
				overall: 75,
				sourceRefs: ["manual-athletic-1976-77-gameplay-squad"],
				dataConfidence: .4
			}),
			makePlayer({
				name: "Carlos",
				season: "1976/77",
				positions: ["DC", "SD"],
				overall: 79,
				sourceRefs: ["manual-athletic-1976-77-gameplay-squad"],
				dataConfidence: .45
			}),
			makePlayer({
				name: "Dani",
				season: "1976/77",
				positions: ["DC", "SD"],
				overall: 87,
				sourceRefs: ["manual-athletic-1976-77-gameplay-squad"],
				dataConfidence: .45
			}),
			makePlayer({
				name: "Amorrortu",
				season: "1976/77",
				positions: [
					"EI",
					"ED",
					"SD"
				],
				overall: 76,
				sourceRefs: ["manual-athletic-1976-77-gameplay-squad"],
				dataConfidence: .4
			}),
			makePlayer({
				name: "Lasa",
				season: "1976/77",
				positions: ["DC"],
				overall: 73,
				sourceRefs: ["manual-athletic-1976-77-gameplay-squad"],
				dataConfidence: .4
			})
		]
	},
	{
		season: "1993/94",
		coach: makeCoach({
			name: "Jupp Heynckes",
			coachId: "jupp_heynckes",
			season: "1993/94",
			overall: 84,
			skills: {
				"attack": 82,
				"defense": 80,
				"management": 87,
				"mentality": 84,
				"cup": 78,
				"europe": 82
			},
			sourceRefs: ["manual-athletic-1993-94-gameplay-squad"],
			dataConfidence: .5,
			notes: "Plantilla ampliada para gameplay de la etapa Heynckes. Ratings y lista en revisión manual."
		}),
		players: [
			makePlayer({
				name: "Valencia",
				season: "1993/94",
				positions: ["POR"],
				overall: 77,
				sourceRefs: ["manual-athletic-1993-94-gameplay-squad"],
				dataConfidence: .5
			}),
			makePlayer({
				name: "Kike",
				season: "1993/94",
				positions: ["POR"],
				overall: 70,
				sourceRefs: ["manual-athletic-1993-94-gameplay-squad"],
				dataConfidence: .45
			}),
			makePlayer({
				name: "Lakabeg",
				season: "1993/94",
				positions: ["LD", "DFC"],
				overall: 74,
				sourceRefs: ["manual-athletic-1993-94-gameplay-squad"],
				dataConfidence: .45
			}),
			makePlayer({
				name: "Larrazabal",
				season: "1993/94",
				positions: ["LI", "MI"],
				overall: 76,
				sourceRefs: ["manual-athletic-1993-94-gameplay-squad"],
				dataConfidence: .5
			}),
			makePlayer({
				name: "Karanka",
				season: "1993/94",
				positions: ["DFC"],
				overall: 78,
				sourceRefs: ["manual-athletic-1993-94-gameplay-squad"],
				dataConfidence: .5
			}),
			makePlayer({
				name: "Andrinua",
				season: "1993/94",
				positions: ["DFC"],
				overall: 82,
				sourceRefs: ["manual-athletic-1993-94-gameplay-squad"],
				dataConfidence: .45
			}),
			makePlayer({
				name: "Tabuenka",
				season: "1993/94",
				positions: ["LD", "LD"],
				overall: 73,
				sourceRefs: ["manual-athletic-1993-94-gameplay-squad"],
				dataConfidence: .45
			}),
			makePlayer({
				name: "Lasa, M",
				season: "1993/94",
				positions: ["LI"],
				overall: 74,
				sourceRefs: ["manual-athletic-1993-94-gameplay-squad"],
				dataConfidence: .45
			}),
			makePlayer({
				name: "Garitano, A",
				season: "1993/94",
				positions: ["MC", "MCD"],
				overall: 76,
				sourceRefs: ["manual-athletic-1993-94-gameplay-squad"],
				dataConfidence: .45
			}),
			makePlayer({
				name: "Urrutia",
				season: "1993/94",
				positions: ["MCD", "MC"],
				overall: 75,
				sourceRefs: ["manual-athletic-1993-94-gameplay-squad"],
				dataConfidence: .45
			}),
			makePlayer({
				name: "Soler",
				season: "1993/94",
				positions: ["MC", "MI"],
				overall: 76,
				sourceRefs: ["manual-athletic-1993-94-gameplay-squad"],
				dataConfidence: .45
			}),
			makePlayer({
				name: "Luke",
				season: "1993/94",
				positions: ["MC", "MP"],
				overall: 73,
				sourceRefs: ["manual-athletic-1993-94-gameplay-squad"],
				dataConfidence: .4
			}),
			makePlayer({
				name: "Julen Guerrero",
				season: "1993/94",
				positions: ["MP", "MC"],
				overall: 90,
				sourceRefs: ["manual-athletic-1993-94-gameplay-squad"],
				dataConfidence: .5
			}),
			makePlayer({
				name: "Goikoetxea, JA",
				season: "1993/94",
				positions: ["MD", "ED"],
				overall: 75,
				sourceRefs: ["manual-athletic-1993-94-gameplay-squad"],
				dataConfidence: .45
			}),
			makePlayer({
				name: "Ziganda",
				season: "1993/94",
				positions: ["DC"],
				overall: 79,
				sourceRefs: ["manual-athletic-1993-94-gameplay-squad"],
				dataConfidence: .5
			}),
			makePlayer({
				name: "Valverde",
				season: "1993/94",
				positions: ["DC", "SD"],
				overall: 78,
				sourceRefs: ["manual-athletic-1993-94-gameplay-squad"],
				dataConfidence: .45
			}),
			makePlayer({
				name: "Mendiguren",
				season: "1993/94",
				positions: ["ED", "MD"],
				overall: 73,
				sourceRefs: ["manual-athletic-1993-94-gameplay-squad"],
				dataConfidence: .4
			}),
			makePlayer({
				name: "Ritxi Mendiguren",
				season: "1993/94",
				positions: ["MC", "MP"],
				overall: 72,
				sourceRefs: ["manual-athletic-1993-94-gameplay-squad"],
				dataConfidence: .4
			})
		]
	},
	{
		season: "2008/09",
		coach: makeCoach({
			name: "Joaquín Caparrós",
			coachId: "joaquin_caparros",
			season: "2008/09",
			overall: 82,
			skills: {
				"attack": 79,
				"defense": 82,
				"management": 85,
				"mentality": 88,
				"cup": 89,
				"europe": 76
			},
			sourceRefs: ["manual-athletic-2008-09-gameplay-squad"],
			dataConfidence: .55,
			notes: "Plantilla ampliada para gameplay de la temporada finalista de Copa 2008/09. Ratings estimados."
		}),
		players: [
			makePlayer({
				name: "Iraizoz",
				season: "2008/09",
				positions: ["POR"],
				overall: 76,
				sourceRefs: ["manual-athletic-2008-09-gameplay-squad"],
				dataConfidence: .55
			}),
			makePlayer({
				name: "Armando",
				season: "2008/09",
				positions: ["POR"],
				overall: 71,
				sourceRefs: ["manual-athletic-2008-09-gameplay-squad"],
				dataConfidence: .5
			}),
			makePlayer({
				name: "Iraola",
				season: "2008/09",
				positions: ["LD", "LD"],
				overall: 85,
				sourceRefs: ["manual-athletic-2008-09-gameplay-squad"],
				dataConfidence: .55
			}),
			makePlayer({
				name: "Amorebieta",
				season: "2008/09",
				positions: ["DFC"],
				overall: 76,
				sourceRefs: ["manual-athletic-2008-09-gameplay-squad"],
				dataConfidence: .55
			}),
			makePlayer({
				name: "Aitor Ocio",
				season: "2008/09",
				positions: ["DFC"],
				overall: 75,
				sourceRefs: ["manual-athletic-2008-09-gameplay-squad"],
				dataConfidence: .5
			}),
			makePlayer({
				name: "Ustaritz",
				season: "2008/09",
				positions: ["DFC"],
				overall: 72,
				sourceRefs: ["manual-athletic-2008-09-gameplay-squad"],
				dataConfidence: .45
			}),
			makePlayer({
				name: "Koikili",
				season: "2008/09",
				positions: ["LI"],
				overall: 73,
				sourceRefs: ["manual-athletic-2008-09-gameplay-squad"],
				dataConfidence: .5
			}),
			makePlayer({
				name: "Balenziaga",
				season: "2008/09",
				positions: ["LI"],
				overall: 70,
				sourceRefs: ["manual-athletic-2008-09-gameplay-squad"],
				dataConfidence: .45
			}),
			makePlayer({
				name: "Orbaiz",
				season: "2008/09",
				positions: ["MCD", "MC"],
				overall: 77,
				sourceRefs: ["manual-athletic-2008-09-gameplay-squad"],
				dataConfidence: .55
			}),
			makePlayer({
				name: "Javi Martínez",
				season: "2008/09",
				positions: [
					"MCD",
					"MC",
					"DFC"
				],
				overall: 86,
				sourceRefs: ["manual-athletic-2008-09-gameplay-squad"],
				dataConfidence: .55
			}),
			makePlayer({
				name: "Gurpegi",
				season: "2008/09",
				positions: ["MCD", "MC"],
				overall: 75,
				sourceRefs: ["manual-athletic-2008-09-gameplay-squad"],
				dataConfidence: .5
			}),
			makePlayer({
				name: "Yeste",
				season: "2008/09",
				positions: ["MP", "MI"],
				overall: 86,
				sourceRefs: ["manual-athletic-2008-09-gameplay-squad"],
				dataConfidence: .55
			}),
			makePlayer({
				name: "Susaeta",
				season: "2008/09",
				positions: ["ED", "MD"],
				overall: 84,
				sourceRefs: ["manual-athletic-2008-09-gameplay-squad"],
				dataConfidence: .55
			}),
			makePlayer({
				name: "David López",
				season: "2008/09",
				positions: ["MD", "MC"],
				overall: 74,
				sourceRefs: ["manual-athletic-2008-09-gameplay-squad"],
				dataConfidence: .5
			}),
			makePlayer({
				name: "Gabilondo",
				season: "2008/09",
				positions: ["MI", "EI"],
				overall: 74,
				sourceRefs: ["manual-athletic-2008-09-gameplay-squad"],
				dataConfidence: .5
			}),
			makePlayer({
				name: "Llorente",
				season: "2008/09",
				positions: ["DC"],
				overall: 85,
				sourceRefs: ["manual-athletic-2008-09-gameplay-squad"],
				dataConfidence: .55
			}),
			makePlayer({
				name: "Toquero",
				season: "2008/09",
				positions: ["DC", "ED"],
				overall: 73,
				sourceRefs: ["manual-athletic-2008-09-gameplay-squad"],
				dataConfidence: .5
			}),
			makePlayer({
				name: "Ion Vélez",
				season: "2008/09",
				positions: ["DC", "SD"],
				overall: 72,
				sourceRefs: ["manual-athletic-2008-09-gameplay-squad"],
				dataConfidence: .45
			})
		]
	},
	{
		season: "2013/14",
		coach: makeCoach({
			name: "Ernesto Valverde",
			coachId: "ernesto_valverde",
			season: "2013/14",
			overall: 86,
			skills: {
				"attack": 84,
				"defense": 84,
				"management": 90,
				"mentality": 87,
				"cup": 80,
				"europe": 84
			},
			sourceRefs: ["manual-athletic-2013-14-gameplay-squad"],
			dataConfidence: .6,
			notes: "Plantilla ampliada para gameplay del Athletic clasificado para Champions 2013/14. Ratings estimados."
		}),
		players: [
			makePlayer({
				name: "Iraizoz",
				season: "2013/14",
				positions: ["POR"],
				overall: 76,
				sourceRefs: ["manual-athletic-2013-14-gameplay-squad"],
				dataConfidence: .6
			}),
			makePlayer({
				name: "Iago Herrerín",
				season: "2013/14",
				positions: ["POR"],
				overall: 71,
				sourceRefs: ["manual-athletic-2013-14-gameplay-squad"],
				dataConfidence: .5
			}),
			makePlayer({
				name: "Iraola",
				season: "2013/14",
				positions: ["LD", "LD"],
				overall: 85,
				sourceRefs: ["manual-athletic-2013-14-gameplay-squad"],
				dataConfidence: .6
			}),
			makePlayer({
				name: "Balenziaga",
				season: "2013/14",
				positions: ["LI"],
				overall: 76,
				sourceRefs: ["manual-athletic-2013-14-gameplay-squad"],
				dataConfidence: .6
			}),
			makePlayer({
				name: "Laporte",
				season: "2013/14",
				positions: ["DFC"],
				overall: 85,
				sourceRefs: ["manual-athletic-2013-14-gameplay-squad"],
				dataConfidence: .6
			}),
			makePlayer({
				name: "San José",
				season: "2013/14",
				positions: ["DFC", "MCD"],
				overall: 76,
				sourceRefs: ["manual-athletic-2013-14-gameplay-squad"],
				dataConfidence: .55
			}),
			makePlayer({
				name: "Gurpegi",
				season: "2013/14",
				positions: ["DFC", "MCD"],
				overall: 76,
				sourceRefs: ["manual-athletic-2013-14-gameplay-squad"],
				dataConfidence: .55
			}),
			makePlayer({
				name: "Ekiza",
				season: "2013/14",
				positions: ["DFC"],
				overall: 72,
				sourceRefs: ["manual-athletic-2013-14-gameplay-squad"],
				dataConfidence: .45
			}),
			makePlayer({
				name: "Iturraspe",
				season: "2013/14",
				positions: ["MCD", "MC"],
				overall: 80,
				sourceRefs: ["manual-athletic-2013-14-gameplay-squad"],
				dataConfidence: .6
			}),
			makePlayer({
				name: "Mikel Rico",
				season: "2013/14",
				positions: ["MC"],
				overall: 78,
				sourceRefs: ["manual-athletic-2013-14-gameplay-squad"],
				dataConfidence: .6
			}),
			makePlayer({
				name: "Ander Herrera",
				season: "2013/14",
				positions: ["MC", "MP"],
				overall: 86,
				sourceRefs: ["manual-athletic-2013-14-gameplay-squad"],
				dataConfidence: .6
			}),
			makePlayer({
				name: "Beñat",
				season: "2013/14",
				positions: ["MC", "MCD"],
				overall: 76,
				sourceRefs: ["manual-athletic-2013-14-gameplay-squad"],
				dataConfidence: .55
			}),
			makePlayer({
				name: "De Marcos",
				season: "2013/14",
				positions: [
					"MD",
					"LD",
					"MC"
				],
				overall: 83,
				sourceRefs: ["manual-athletic-2013-14-gameplay-squad"],
				dataConfidence: .55
			}),
			makePlayer({
				name: "Susaeta",
				season: "2013/14",
				positions: ["ED", "MD"],
				overall: 84,
				sourceRefs: ["manual-athletic-2013-14-gameplay-squad"],
				dataConfidence: .6
			}),
			makePlayer({
				name: "Muniain",
				season: "2013/14",
				positions: ["EI", "MP"],
				overall: 86,
				sourceRefs: ["manual-athletic-2013-14-gameplay-squad"],
				dataConfidence: .6
			}),
			makePlayer({
				name: "Ibai",
				season: "2013/14",
				positions: [
					"EI",
					"ED",
					"MI"
				],
				overall: 76,
				sourceRefs: ["manual-athletic-2013-14-gameplay-squad"],
				dataConfidence: .55
			}),
			makePlayer({
				name: "Aduriz",
				season: "2013/14",
				positions: ["DC"],
				overall: 88,
				sourceRefs: ["manual-athletic-2013-14-gameplay-squad"],
				dataConfidence: .6
			}),
			makePlayer({
				name: "Toquero",
				season: "2013/14",
				positions: ["DC", "ED"],
				overall: 72,
				sourceRefs: ["manual-athletic-2013-14-gameplay-squad"],
				dataConfidence: .5
			}),
			makePlayer({
				name: "Kike Sola",
				season: "2013/14",
				positions: ["DC"],
				overall: 71,
				sourceRefs: ["manual-athletic-2013-14-gameplay-squad"],
				dataConfidence: .45
			})
		]
	},
	{
		season: "2020/21",
		coach: makeCoach({
			name: "Marcelino García Toral",
			coachId: "marcelino_garcia_toral",
			season: "2020/21",
			overall: 84,
			skills: {
				"attack": 80,
				"defense": 85,
				"management": 86,
				"mentality": 88,
				"cup": 90,
				"europe": 78
			},
			sourceRefs: ["manual-athletic-2020-21-gameplay-squad"],
			dataConfidence: .6,
			notes: "Plantilla ampliada para gameplay de la temporada de Supercopa y finales de Copa. Ratings estimados."
		}),
		players: [
			makePlayer({
				name: "Unai Simón",
				season: "2020/21",
				positions: ["POR"],
				overall: 85,
				sourceRefs: ["manual-athletic-2020-21-gameplay-squad"],
				dataConfidence: .6
			}),
			makePlayer({
				name: "Ezkieta",
				season: "2020/21",
				positions: ["POR"],
				overall: 70,
				sourceRefs: ["manual-athletic-2020-21-gameplay-squad"],
				dataConfidence: .45
			}),
			makePlayer({
				name: "Capa",
				season: "2020/21",
				positions: ["LD", "LD"],
				overall: 76,
				sourceRefs: ["manual-athletic-2020-21-gameplay-squad"],
				dataConfidence: .6
			}),
			makePlayer({
				name: "Yuri",
				season: "2020/21",
				positions: ["LI", "LI"],
				overall: 83,
				sourceRefs: ["manual-athletic-2020-21-gameplay-squad"],
				dataConfidence: .6
			}),
			makePlayer({
				name: "Iñigo Martínez",
				season: "2020/21",
				positions: ["DFC"],
				overall: 85,
				sourceRefs: ["manual-athletic-2020-21-gameplay-squad"],
				dataConfidence: .6
			}),
			makePlayer({
				name: "Yeray",
				season: "2020/21",
				positions: ["DFC"],
				overall: 78,
				sourceRefs: ["manual-athletic-2020-21-gameplay-squad"],
				dataConfidence: .6
			}),
			makePlayer({
				name: "Núñez",
				season: "2020/21",
				positions: ["DFC"],
				overall: 74,
				sourceRefs: ["manual-athletic-2020-21-gameplay-squad"],
				dataConfidence: .55
			}),
			makePlayer({
				name: "Balenziaga",
				season: "2020/21",
				positions: ["LI"],
				overall: 73,
				sourceRefs: ["manual-athletic-2020-21-gameplay-squad"],
				dataConfidence: .55
			}),
			makePlayer({
				name: "Dani García",
				season: "2020/21",
				positions: ["MCD", "MC"],
				overall: 76,
				sourceRefs: ["manual-athletic-2020-21-gameplay-squad"],
				dataConfidence: .6
			}),
			makePlayer({
				name: "Vencedor",
				season: "2020/21",
				positions: ["MCD", "MC"],
				overall: 75,
				sourceRefs: ["manual-athletic-2020-21-gameplay-squad"],
				dataConfidence: .55
			}),
			makePlayer({
				name: "Vesga",
				season: "2020/21",
				positions: ["MC", "MCD"],
				overall: 75,
				sourceRefs: ["manual-athletic-2020-21-gameplay-squad"],
				dataConfidence: .55
			}),
			makePlayer({
				name: "Unai López",
				season: "2020/21",
				positions: ["MC", "MP"],
				overall: 74,
				sourceRefs: ["manual-athletic-2020-21-gameplay-squad"],
				dataConfidence: .55
			}),
			makePlayer({
				name: "Muniain",
				season: "2020/21",
				positions: ["MP", "EI"],
				overall: 86,
				sourceRefs: ["manual-athletic-2020-21-gameplay-squad"],
				dataConfidence: .6
			}),
			makePlayer({
				name: "O. Sancet",
				season: "2020/21",
				positions: ["MP", "MC"],
				overall: 75,
				sourceRefs: ["manual-athletic-2020-21-gameplay-squad"],
				dataConfidence: .55
			}),
			makePlayer({
				name: "Berenguer",
				season: "2020/21",
				positions: [
					"EI",
					"ED",
					"MI"
				],
				overall: 78,
				sourceRefs: ["manual-athletic-2020-21-gameplay-squad"],
				dataConfidence: .6
			}),
			makePlayer({
				name: "Williams",
				season: "2020/21",
				positions: ["ED", "DC"],
				overall: 83,
				sourceRefs: ["manual-athletic-2020-21-gameplay-squad"],
				dataConfidence: .6
			}),
			makePlayer({
				name: "Raúl García",
				season: "2020/21",
				positions: ["MP", "DC"],
				overall: 77,
				sourceRefs: ["manual-athletic-2020-21-gameplay-squad"],
				dataConfidence: .6
			}),
			makePlayer({
				name: "Villalibre",
				season: "2020/21",
				positions: ["DC"],
				overall: 74,
				sourceRefs: ["manual-athletic-2020-21-gameplay-squad"],
				dataConfidence: .55
			}),
			makePlayer({
				name: "Morcillo",
				season: "2020/21",
				positions: ["EI", "MI"],
				overall: 70,
				sourceRefs: ["manual-athletic-2020-21-gameplay-squad"],
				dataConfidence: .45
			})
		]
	},
	{
		season: "1939/40",
		coach: makeCoach({
			name: "Juan Urquizu",
			coachId: "juan_urquizu",
			season: "1939/40",
			overall: 77,
			skills: {
				attack: 76,
				defense: 77,
				management: 78,
				mentality: 80,
				cup: 76,
				europe: 50
			},
			sourceRefs: ["manual-athletic-1939-40-post-war-gameplay-squad"],
			dataConfidence: .5,
			notes: "Plantilla base de posguerra para gameplay. Jugadores, posiciones y ratings marcados como estimacion manual pendiente de verificacion estadistica completa."
		}),
		players: [
			makePlayer({
				name: "Echevarria",
				season: "1939/40",
				positions: ["POR"],
				overall: 76,
				sourceRefs: ["manual-athletic-1939-40-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Lezama",
				season: "1939/40",
				positions: ["POR"],
				overall: 80,
				sourceRefs: ["manual-athletic-1939-40-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Oceja",
				season: "1939/40",
				positions: ["DFC", "LD"],
				overall: 80,
				sourceRefs: ["manual-athletic-1939-40-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: [
					"DFC-D",
					"DFC-C",
					"LD"
				]
			}),
			makePlayer({
				name: "Bertol",
				season: "1939/40",
				positions: ["DFC"],
				overall: 76,
				sourceRefs: ["manual-athletic-1939-40-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Mieza",
				season: "1939/40",
				positions: ["LI", "DFC"],
				overall: 77,
				sourceRefs: ["manual-athletic-1939-40-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Arqueta",
				season: "1939/40",
				positions: ["LD"],
				overall: 75,
				sourceRefs: ["manual-athletic-1939-40-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["LD"]
			}),
			makePlayer({
				name: "Nando",
				season: "1939/40",
				positions: ["MCD", "MC"],
				overall: 80,
				sourceRefs: ["manual-athletic-1939-40-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MCD", "MC-C"]
			}),
			makePlayer({
				name: "Garate",
				season: "1939/40",
				positions: ["MC", "MCD"],
				overall: 76,
				sourceRefs: ["manual-athletic-1939-40-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Ortuzar",
				season: "1939/40",
				positions: ["MC"],
				overall: 75,
				sourceRefs: ["manual-athletic-1939-40-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MC-I", "MC-D"]
			}),
			makePlayer({
				name: "Panizo",
				season: "1939/40",
				positions: ["MP", "MC"],
				overall: 83,
				sourceRefs: ["manual-athletic-1939-40-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: [
					"MP",
					"MC-I",
					"MC-D"
				]
			}),
			makePlayer({
				name: "Iriondo",
				season: "1939/40",
				positions: ["ED", "DC"],
				overall: 82,
				sourceRefs: ["manual-athletic-1939-40-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Zarra",
				season: "1939/40",
				positions: ["DC"],
				overall: 84,
				sourceRefs: ["manual-athletic-1939-40-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Gainza",
				season: "1939/40",
				positions: ["EI", "MI"],
				overall: 83,
				sourceRefs: ["manual-athletic-1939-40-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Unamuno",
				season: "1939/40",
				positions: ["DC"],
				overall: 78,
				sourceRefs: ["manual-athletic-1939-40-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["DC"]
			}),
			makePlayer({
				name: "Venancio",
				season: "1939/40",
				positions: ["SD", "DC"],
				overall: 76,
				sourceRefs: ["manual-athletic-1939-40-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["SD", "DC"]
			})
		]
	},
	{
		season: "1940/41",
		coach: makeCoach({
			name: "Juan Urquizu",
			coachId: "juan_urquizu",
			season: "1940/41",
			overall: 78,
			skills: {
				attack: 77,
				defense: 78,
				management: 79,
				mentality: 80,
				cup: 78,
				europe: 50
			},
			sourceRefs: ["manual-athletic-1940-41-post-war-gameplay-squad"],
			dataConfidence: .5,
			notes: "Plantilla base de posguerra para gameplay. Jugadores, posiciones y ratings marcados como estimacion manual pendiente de verificacion estadistica completa."
		}),
		players: [
			makePlayer({
				name: "Lezama",
				season: "1940/41",
				positions: ["POR"],
				overall: 81,
				sourceRefs: ["manual-athletic-1940-41-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Echevarria",
				season: "1940/41",
				positions: ["POR"],
				overall: 74,
				sourceRefs: ["manual-athletic-1940-41-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Oceja",
				season: "1940/41",
				positions: ["DFC", "LD"],
				overall: 81,
				sourceRefs: ["manual-athletic-1940-41-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: [
					"DFC-D",
					"DFC-C",
					"LD"
				]
			}),
			makePlayer({
				name: "Bertol",
				season: "1940/41",
				positions: ["DFC"],
				overall: 77,
				sourceRefs: ["manual-athletic-1940-41-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Mieza",
				season: "1940/41",
				positions: ["LI", "DFC"],
				overall: 78,
				sourceRefs: ["manual-athletic-1940-41-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Arqueta",
				season: "1940/41",
				positions: ["LD"],
				overall: 75,
				sourceRefs: ["manual-athletic-1940-41-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["LD"]
			}),
			makePlayer({
				name: "Nando",
				season: "1940/41",
				positions: ["MCD", "MC"],
				overall: 81,
				sourceRefs: ["manual-athletic-1940-41-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MCD", "MC-C"]
			}),
			makePlayer({
				name: "Garate",
				season: "1940/41",
				positions: ["MC", "MCD"],
				overall: 77,
				sourceRefs: ["manual-athletic-1940-41-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Ortuzar",
				season: "1940/41",
				positions: ["MC"],
				overall: 76,
				sourceRefs: ["manual-athletic-1940-41-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MC-I", "MC-D"]
			}),
			makePlayer({
				name: "Panizo",
				season: "1940/41",
				positions: ["MP", "MC"],
				overall: 84,
				sourceRefs: ["manual-athletic-1940-41-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: [
					"MP",
					"MC-I",
					"MC-D"
				]
			}),
			makePlayer({
				name: "Iriondo",
				season: "1940/41",
				positions: ["ED", "DC"],
				overall: 83,
				sourceRefs: ["manual-athletic-1940-41-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Zarra",
				season: "1940/41",
				positions: ["DC"],
				overall: 86,
				sourceRefs: ["manual-athletic-1940-41-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Gainza",
				season: "1940/41",
				positions: ["EI", "MI"],
				overall: 84,
				sourceRefs: ["manual-athletic-1940-41-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Unamuno",
				season: "1940/41",
				positions: ["DC"],
				overall: 78,
				sourceRefs: ["manual-athletic-1940-41-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["DC"]
			}),
			makePlayer({
				name: "Venancio",
				season: "1940/41",
				positions: ["SD", "DC"],
				overall: 77,
				sourceRefs: ["manual-athletic-1940-41-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["SD", "DC"]
			})
		]
	},
	{
		season: "1941/42",
		coach: makeCoach({
			name: "Juan Urquizu",
			coachId: "juan_urquizu",
			season: "1941/42",
			overall: 80,
			skills: {
				attack: 80,
				defense: 79,
				management: 81,
				mentality: 82,
				cup: 80,
				europe: 50
			},
			sourceRefs: ["manual-athletic-1941-42-post-war-gameplay-squad"],
			dataConfidence: .5,
			notes: "Plantilla base de posguerra para gameplay. Jugadores, posiciones y ratings marcados como estimacion manual pendiente de verificacion estadistica completa."
		}),
		players: [
			makePlayer({
				name: "Lezama",
				season: "1941/42",
				positions: ["POR"],
				overall: 82,
				sourceRefs: ["manual-athletic-1941-42-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Echevarria",
				season: "1941/42",
				positions: ["POR"],
				overall: 74,
				sourceRefs: ["manual-athletic-1941-42-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Oceja",
				season: "1941/42",
				positions: ["DFC", "LD"],
				overall: 82,
				sourceRefs: ["manual-athletic-1941-42-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: [
					"DFC-D",
					"DFC-C",
					"LD"
				]
			}),
			makePlayer({
				name: "Bertol",
				season: "1941/42",
				positions: ["DFC"],
				overall: 78,
				sourceRefs: ["manual-athletic-1941-42-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Mieza",
				season: "1941/42",
				positions: ["LI", "DFC"],
				overall: 79,
				sourceRefs: ["manual-athletic-1941-42-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Arqueta",
				season: "1941/42",
				positions: ["LD"],
				overall: 76,
				sourceRefs: ["manual-athletic-1941-42-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["LD"]
			}),
			makePlayer({
				name: "Nando",
				season: "1941/42",
				positions: ["MCD", "MC"],
				overall: 82,
				sourceRefs: ["manual-athletic-1941-42-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MCD", "MC-C"]
			}),
			makePlayer({
				name: "Garate",
				season: "1941/42",
				positions: ["MC", "MCD"],
				overall: 78,
				sourceRefs: ["manual-athletic-1941-42-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Ortuzar",
				season: "1941/42",
				positions: ["MC"],
				overall: 77,
				sourceRefs: ["manual-athletic-1941-42-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MC-I", "MC-D"]
			}),
			makePlayer({
				name: "Panizo",
				season: "1941/42",
				positions: ["MP", "MC"],
				overall: 85,
				sourceRefs: ["manual-athletic-1941-42-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: [
					"MP",
					"MC-I",
					"MC-D"
				]
			}),
			makePlayer({
				name: "Iriondo",
				season: "1941/42",
				positions: ["ED", "DC"],
				overall: 84,
				sourceRefs: ["manual-athletic-1941-42-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Zarra",
				season: "1941/42",
				positions: ["DC"],
				overall: 88,
				sourceRefs: ["manual-athletic-1941-42-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Gainza",
				season: "1941/42",
				positions: ["EI", "MI"],
				overall: 86,
				sourceRefs: ["manual-athletic-1941-42-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Unamuno",
				season: "1941/42",
				positions: ["DC"],
				overall: 77,
				sourceRefs: ["manual-athletic-1941-42-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["DC"]
			}),
			makePlayer({
				name: "Venancio",
				season: "1941/42",
				positions: ["SD", "DC"],
				overall: 79,
				sourceRefs: ["manual-athletic-1941-42-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["SD", "DC"]
			})
		]
	},
	{
		season: "1942/43",
		coach: makeCoach({
			name: "Juan Urquizu",
			coachId: "juan_urquizu",
			season: "1942/43",
			overall: 84,
			skills: {
				attack: 86,
				defense: 82,
				management: 84,
				mentality: 86,
				cup: 88,
				europe: 50
			},
			sourceRefs: ["manual-athletic-1942-43-post-war-gameplay-squad"],
			dataConfidence: .5,
			notes: "Plantilla base de posguerra para gameplay. Jugadores, posiciones y ratings marcados como estimacion manual pendiente de verificacion estadistica completa."
		}),
		players: [
			makePlayer({
				name: "Lezama",
				season: "1942/43",
				positions: ["POR"],
				overall: 85,
				sourceRefs: ["manual-athletic-1942-43-post-war-gameplay-squad"],
				dataConfidence: .55,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Echevarria",
				season: "1942/43",
				positions: ["POR"],
				overall: 75,
				sourceRefs: ["manual-athletic-1942-43-post-war-gameplay-squad"],
				dataConfidence: .55,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Oceja",
				season: "1942/43",
				positions: ["DFC", "LD"],
				overall: 84,
				sourceRefs: ["manual-athletic-1942-43-post-war-gameplay-squad"],
				dataConfidence: .55,
				tacticalSlotLabels: [
					"DFC-D",
					"DFC-C",
					"LD"
				]
			}),
			makePlayer({
				name: "Bertol",
				season: "1942/43",
				positions: ["DFC"],
				overall: 80,
				sourceRefs: ["manual-athletic-1942-43-post-war-gameplay-squad"],
				dataConfidence: .55,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Mieza",
				season: "1942/43",
				positions: ["LI", "DFC"],
				overall: 81,
				sourceRefs: ["manual-athletic-1942-43-post-war-gameplay-squad"],
				dataConfidence: .55,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Arqueta",
				season: "1942/43",
				positions: ["LD"],
				overall: 77,
				sourceRefs: ["manual-athletic-1942-43-post-war-gameplay-squad"],
				dataConfidence: .55,
				tacticalSlotLabels: ["LD"]
			}),
			makePlayer({
				name: "Nando",
				season: "1942/43",
				positions: ["MCD", "MC"],
				overall: 83,
				sourceRefs: ["manual-athletic-1942-43-post-war-gameplay-squad"],
				dataConfidence: .55,
				tacticalSlotLabels: ["MCD", "MC-C"]
			}),
			makePlayer({
				name: "Garate",
				season: "1942/43",
				positions: ["MC", "MCD"],
				overall: 80,
				sourceRefs: ["manual-athletic-1942-43-post-war-gameplay-squad"],
				dataConfidence: .55,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Ortuzar",
				season: "1942/43",
				positions: ["MC"],
				overall: 78,
				sourceRefs: ["manual-athletic-1942-43-post-war-gameplay-squad"],
				dataConfidence: .55,
				tacticalSlotLabels: ["MC-I", "MC-D"]
			}),
			makePlayer({
				name: "Panizo",
				season: "1942/43",
				positions: ["MP", "MC"],
				overall: 87,
				sourceRefs: ["manual-athletic-1942-43-post-war-gameplay-squad"],
				dataConfidence: .55,
				tacticalSlotLabels: [
					"MP",
					"MC-I",
					"MC-D"
				]
			}),
			makePlayer({
				name: "Iriondo",
				season: "1942/43",
				positions: ["ED", "DC"],
				overall: 85,
				sourceRefs: ["manual-athletic-1942-43-post-war-gameplay-squad"],
				dataConfidence: .55,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Zarra",
				season: "1942/43",
				positions: ["DC"],
				overall: 90,
				sourceRefs: ["manual-athletic-1942-43-post-war-gameplay-squad"],
				dataConfidence: .55,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Gainza",
				season: "1942/43",
				positions: ["EI", "MI"],
				overall: 88,
				sourceRefs: ["manual-athletic-1942-43-post-war-gameplay-squad"],
				dataConfidence: .55,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Unamuno",
				season: "1942/43",
				positions: ["DC"],
				overall: 78,
				sourceRefs: ["manual-athletic-1942-43-post-war-gameplay-squad"],
				dataConfidence: .55,
				tacticalSlotLabels: ["DC"]
			}),
			makePlayer({
				name: "Venancio",
				season: "1942/43",
				positions: ["SD", "DC"],
				overall: 84,
				sourceRefs: ["manual-athletic-1942-43-post-war-gameplay-squad"],
				dataConfidence: .55,
				tacticalSlotLabels: ["SD", "DC"]
			})
		]
	},
	{
		season: "1943/44",
		coach: makeCoach({
			name: "Juan Urquizu",
			coachId: "juan_urquizu",
			season: "1943/44",
			overall: 82,
			skills: {
				attack: 84,
				defense: 81,
				management: 83,
				mentality: 84,
				cup: 84,
				europe: 50
			},
			sourceRefs: ["manual-athletic-1943-44-post-war-gameplay-squad"],
			dataConfidence: .5,
			notes: "Plantilla base de posguerra para gameplay. Jugadores, posiciones y ratings marcados como estimacion manual pendiente de verificacion estadistica completa."
		}),
		players: [
			makePlayer({
				name: "Lezama",
				season: "1943/44",
				positions: ["POR"],
				overall: 84,
				sourceRefs: ["manual-athletic-1943-44-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Echevarria",
				season: "1943/44",
				positions: ["POR"],
				overall: 74,
				sourceRefs: ["manual-athletic-1943-44-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Oceja",
				season: "1943/44",
				positions: ["DFC", "LD"],
				overall: 83,
				sourceRefs: ["manual-athletic-1943-44-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: [
					"DFC-D",
					"DFC-C",
					"LD"
				]
			}),
			makePlayer({
				name: "Bertol",
				season: "1943/44",
				positions: ["DFC"],
				overall: 79,
				sourceRefs: ["manual-athletic-1943-44-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Mieza",
				season: "1943/44",
				positions: ["LI", "DFC"],
				overall: 80,
				sourceRefs: ["manual-athletic-1943-44-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Arqueta",
				season: "1943/44",
				positions: ["LD"],
				overall: 76,
				sourceRefs: ["manual-athletic-1943-44-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["LD"]
			}),
			makePlayer({
				name: "Nando",
				season: "1943/44",
				positions: ["MCD", "MC"],
				overall: 82,
				sourceRefs: ["manual-athletic-1943-44-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MCD", "MC-C"]
			}),
			makePlayer({
				name: "Garate",
				season: "1943/44",
				positions: ["MC", "MCD"],
				overall: 79,
				sourceRefs: ["manual-athletic-1943-44-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Ortuzar",
				season: "1943/44",
				positions: ["MC"],
				overall: 77,
				sourceRefs: ["manual-athletic-1943-44-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MC-I", "MC-D"]
			}),
			makePlayer({
				name: "Panizo",
				season: "1943/44",
				positions: ["MP", "MC"],
				overall: 86,
				sourceRefs: ["manual-athletic-1943-44-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: [
					"MP",
					"MC-I",
					"MC-D"
				]
			}),
			makePlayer({
				name: "Iriondo",
				season: "1943/44",
				positions: ["ED", "DC"],
				overall: 84,
				sourceRefs: ["manual-athletic-1943-44-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Zarra",
				season: "1943/44",
				positions: ["DC"],
				overall: 89,
				sourceRefs: ["manual-athletic-1943-44-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Gainza",
				season: "1943/44",
				positions: ["EI", "MI"],
				overall: 87,
				sourceRefs: ["manual-athletic-1943-44-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Venancio",
				season: "1943/44",
				positions: ["SD", "DC"],
				overall: 83,
				sourceRefs: ["manual-athletic-1943-44-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Unamuno",
				season: "1943/44",
				positions: ["DC"],
				overall: 76,
				sourceRefs: ["manual-athletic-1943-44-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["DC"]
			})
		]
	},
	{
		season: "1944/45",
		coach: makeCoach({
			name: "Juan Urquizu",
			coachId: "juan_urquizu",
			season: "1944/45",
			overall: 80,
			skills: {
				attack: 82,
				defense: 79,
				management: 81,
				mentality: 82,
				cup: 82,
				europe: 50
			},
			sourceRefs: ["manual-athletic-1944-45-post-war-gameplay-squad"],
			dataConfidence: .5,
			notes: "Plantilla base de posguerra para gameplay. Jugadores, posiciones y ratings marcados como estimacion manual pendiente de verificacion estadistica completa."
		}),
		players: [
			makePlayer({
				name: "Lezama",
				season: "1944/45",
				positions: ["POR"],
				overall: 83,
				sourceRefs: ["manual-athletic-1944-45-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Echevarria",
				season: "1944/45",
				positions: ["POR"],
				overall: 73,
				sourceRefs: ["manual-athletic-1944-45-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Oceja",
				season: "1944/45",
				positions: ["DFC", "LD"],
				overall: 82,
				sourceRefs: ["manual-athletic-1944-45-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: [
					"DFC-D",
					"DFC-C",
					"LD"
				]
			}),
			makePlayer({
				name: "Bertol",
				season: "1944/45",
				positions: ["DFC"],
				overall: 78,
				sourceRefs: ["manual-athletic-1944-45-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Mieza",
				season: "1944/45",
				positions: ["LI", "DFC"],
				overall: 79,
				sourceRefs: ["manual-athletic-1944-45-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Arqueta",
				season: "1944/45",
				positions: ["LD"],
				overall: 75,
				sourceRefs: ["manual-athletic-1944-45-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["LD"]
			}),
			makePlayer({
				name: "Nando",
				season: "1944/45",
				positions: ["MCD", "MC"],
				overall: 81,
				sourceRefs: ["manual-athletic-1944-45-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MCD", "MC-C"]
			}),
			makePlayer({
				name: "Garate",
				season: "1944/45",
				positions: ["MC", "MCD"],
				overall: 78,
				sourceRefs: ["manual-athletic-1944-45-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Ortuzar",
				season: "1944/45",
				positions: ["MC"],
				overall: 76,
				sourceRefs: ["manual-athletic-1944-45-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MC-I", "MC-D"]
			}),
			makePlayer({
				name: "Panizo",
				season: "1944/45",
				positions: ["MP", "MC"],
				overall: 85,
				sourceRefs: ["manual-athletic-1944-45-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: [
					"MP",
					"MC-I",
					"MC-D"
				]
			}),
			makePlayer({
				name: "Iriondo",
				season: "1944/45",
				positions: ["ED", "DC"],
				overall: 83,
				sourceRefs: ["manual-athletic-1944-45-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Zarra",
				season: "1944/45",
				positions: ["DC"],
				overall: 88,
				sourceRefs: ["manual-athletic-1944-45-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Gainza",
				season: "1944/45",
				positions: ["EI", "MI"],
				overall: 86,
				sourceRefs: ["manual-athletic-1944-45-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Venancio",
				season: "1944/45",
				positions: ["SD", "DC"],
				overall: 82,
				sourceRefs: ["manual-athletic-1944-45-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Unamuno",
				season: "1944/45",
				positions: ["DC"],
				overall: 75,
				sourceRefs: ["manual-athletic-1944-45-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["DC"]
			})
		]
	},
	{
		season: "1945/46",
		coach: makeCoach({
			name: "Juan Urquizu",
			coachId: "juan_urquizu",
			season: "1945/46",
			overall: 82,
			skills: {
				attack: 84,
				defense: 80,
				management: 82,
				mentality: 84,
				cup: 86,
				europe: 50
			},
			sourceRefs: ["manual-athletic-1945-46-post-war-gameplay-squad"],
			dataConfidence: .5,
			notes: "Plantilla base de posguerra para gameplay. Jugadores, posiciones y ratings marcados como estimacion manual pendiente de verificacion estadistica completa."
		}),
		players: [
			makePlayer({
				name: "Lezama",
				season: "1945/46",
				positions: ["POR"],
				overall: 84,
				sourceRefs: ["manual-athletic-1945-46-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Echevarria",
				season: "1945/46",
				positions: ["POR"],
				overall: 73,
				sourceRefs: ["manual-athletic-1945-46-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Oceja",
				season: "1945/46",
				positions: ["DFC", "LD"],
				overall: 82,
				sourceRefs: ["manual-athletic-1945-46-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: [
					"DFC-D",
					"DFC-C",
					"LD"
				]
			}),
			makePlayer({
				name: "Bertol",
				season: "1945/46",
				positions: ["DFC"],
				overall: 78,
				sourceRefs: ["manual-athletic-1945-46-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Mieza",
				season: "1945/46",
				positions: ["LI", "DFC"],
				overall: 79,
				sourceRefs: ["manual-athletic-1945-46-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Arqueta",
				season: "1945/46",
				positions: ["LD"],
				overall: 75,
				sourceRefs: ["manual-athletic-1945-46-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["LD"]
			}),
			makePlayer({
				name: "Nando",
				season: "1945/46",
				positions: ["MCD", "MC"],
				overall: 82,
				sourceRefs: ["manual-athletic-1945-46-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MCD", "MC-C"]
			}),
			makePlayer({
				name: "Garate",
				season: "1945/46",
				positions: ["MC", "MCD"],
				overall: 78,
				sourceRefs: ["manual-athletic-1945-46-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Ortuzar",
				season: "1945/46",
				positions: ["MC"],
				overall: 76,
				sourceRefs: ["manual-athletic-1945-46-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MC-I", "MC-D"]
			}),
			makePlayer({
				name: "Panizo",
				season: "1945/46",
				positions: ["MP", "MC"],
				overall: 86,
				sourceRefs: ["manual-athletic-1945-46-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: [
					"MP",
					"MC-I",
					"MC-D"
				]
			}),
			makePlayer({
				name: "Iriondo",
				season: "1945/46",
				positions: ["ED", "DC"],
				overall: 84,
				sourceRefs: ["manual-athletic-1945-46-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Zarra",
				season: "1945/46",
				positions: ["DC"],
				overall: 89,
				sourceRefs: ["manual-athletic-1945-46-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Gainza",
				season: "1945/46",
				positions: ["EI", "MI"],
				overall: 87,
				sourceRefs: ["manual-athletic-1945-46-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Venancio",
				season: "1945/46",
				positions: ["SD", "DC"],
				overall: 83,
				sourceRefs: ["manual-athletic-1945-46-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Unamuno",
				season: "1945/46",
				positions: ["DC"],
				overall: 74,
				sourceRefs: ["manual-athletic-1945-46-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["DC"]
			})
		]
	},
	{
		season: "1946/47",
		coach: makeCoach({
			name: "Juan Urquizu",
			coachId: "juan_urquizu",
			season: "1946/47",
			overall: 80,
			skills: {
				attack: 82,
				defense: 79,
				management: 81,
				mentality: 82,
				cup: 82,
				europe: 50
			},
			sourceRefs: ["manual-athletic-1946-47-post-war-gameplay-squad"],
			dataConfidence: .5,
			notes: "Plantilla base de posguerra para gameplay. Jugadores, posiciones y ratings marcados como estimacion manual pendiente de verificacion estadistica completa."
		}),
		players: [
			makePlayer({
				name: "Lezama",
				season: "1946/47",
				positions: ["POR"],
				overall: 83,
				sourceRefs: ["manual-athletic-1946-47-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Echevarria",
				season: "1946/47",
				positions: ["POR"],
				overall: 72,
				sourceRefs: ["manual-athletic-1946-47-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Oceja",
				season: "1946/47",
				positions: ["DFC", "LD"],
				overall: 81,
				sourceRefs: ["manual-athletic-1946-47-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: [
					"DFC-D",
					"DFC-C",
					"LD"
				]
			}),
			makePlayer({
				name: "Bertol",
				season: "1946/47",
				positions: ["DFC"],
				overall: 77,
				sourceRefs: ["manual-athletic-1946-47-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Mieza",
				season: "1946/47",
				positions: ["LI", "DFC"],
				overall: 78,
				sourceRefs: ["manual-athletic-1946-47-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Arqueta",
				season: "1946/47",
				positions: ["LD"],
				overall: 74,
				sourceRefs: ["manual-athletic-1946-47-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["LD"]
			}),
			makePlayer({
				name: "Nando",
				season: "1946/47",
				positions: ["MCD", "MC"],
				overall: 81,
				sourceRefs: ["manual-athletic-1946-47-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MCD", "MC-C"]
			}),
			makePlayer({
				name: "Garate",
				season: "1946/47",
				positions: ["MC", "MCD"],
				overall: 77,
				sourceRefs: ["manual-athletic-1946-47-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Ortuzar",
				season: "1946/47",
				positions: ["MC"],
				overall: 75,
				sourceRefs: ["manual-athletic-1946-47-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MC-I", "MC-D"]
			}),
			makePlayer({
				name: "Panizo",
				season: "1946/47",
				positions: ["MP", "MC"],
				overall: 85,
				sourceRefs: ["manual-athletic-1946-47-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: [
					"MP",
					"MC-I",
					"MC-D"
				]
			}),
			makePlayer({
				name: "Iriondo",
				season: "1946/47",
				positions: ["ED", "DC"],
				overall: 83,
				sourceRefs: ["manual-athletic-1946-47-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Zarra",
				season: "1946/47",
				positions: ["DC"],
				overall: 88,
				sourceRefs: ["manual-athletic-1946-47-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Gainza",
				season: "1946/47",
				positions: ["EI", "MI"],
				overall: 86,
				sourceRefs: ["manual-athletic-1946-47-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Venancio",
				season: "1946/47",
				positions: ["SD", "DC"],
				overall: 82,
				sourceRefs: ["manual-athletic-1946-47-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Canito",
				season: "1946/47",
				positions: ["MC", "MCD"],
				overall: 73,
				sourceRefs: ["manual-athletic-1946-47-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MC", "MCD"]
			})
		]
	},
	{
		season: "1947/48",
		coach: makeCoach({
			name: "Juan Urquizu",
			coachId: "juan_urquizu",
			season: "1947/48",
			overall: 78,
			skills: {
				attack: 80,
				defense: 78,
				management: 79,
				mentality: 80,
				cup: 79,
				europe: 50
			},
			sourceRefs: ["manual-athletic-1947-48-post-war-gameplay-squad"],
			dataConfidence: .5,
			notes: "Plantilla base de posguerra para gameplay. Jugadores, posiciones y ratings marcados como estimacion manual pendiente de verificacion estadistica completa."
		}),
		players: [
			makePlayer({
				name: "Lezama",
				season: "1947/48",
				positions: ["POR"],
				overall: 82,
				sourceRefs: ["manual-athletic-1947-48-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Echevarria",
				season: "1947/48",
				positions: ["POR"],
				overall: 72,
				sourceRefs: ["manual-athletic-1947-48-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Oceja",
				season: "1947/48",
				positions: ["DFC", "LD"],
				overall: 80,
				sourceRefs: ["manual-athletic-1947-48-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: [
					"DFC-D",
					"DFC-C",
					"LD"
				]
			}),
			makePlayer({
				name: "Bertol",
				season: "1947/48",
				positions: ["DFC"],
				overall: 77,
				sourceRefs: ["manual-athletic-1947-48-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Mieza",
				season: "1947/48",
				positions: ["LI", "DFC"],
				overall: 78,
				sourceRefs: ["manual-athletic-1947-48-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Arqueta",
				season: "1947/48",
				positions: ["LD"],
				overall: 74,
				sourceRefs: ["manual-athletic-1947-48-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["LD"]
			}),
			makePlayer({
				name: "Nando",
				season: "1947/48",
				positions: ["MCD", "MC"],
				overall: 80,
				sourceRefs: ["manual-athletic-1947-48-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MCD", "MC-C"]
			}),
			makePlayer({
				name: "Garate",
				season: "1947/48",
				positions: ["MC", "MCD"],
				overall: 77,
				sourceRefs: ["manual-athletic-1947-48-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Ortuzar",
				season: "1947/48",
				positions: ["MC"],
				overall: 75,
				sourceRefs: ["manual-athletic-1947-48-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MC-I", "MC-D"]
			}),
			makePlayer({
				name: "Panizo",
				season: "1947/48",
				positions: ["MP", "MC"],
				overall: 84,
				sourceRefs: ["manual-athletic-1947-48-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: [
					"MP",
					"MC-I",
					"MC-D"
				]
			}),
			makePlayer({
				name: "Iriondo",
				season: "1947/48",
				positions: ["ED", "DC"],
				overall: 82,
				sourceRefs: ["manual-athletic-1947-48-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Zarra",
				season: "1947/48",
				positions: ["DC"],
				overall: 87,
				sourceRefs: ["manual-athletic-1947-48-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Gainza",
				season: "1947/48",
				positions: ["EI", "MI"],
				overall: 85,
				sourceRefs: ["manual-athletic-1947-48-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Venancio",
				season: "1947/48",
				positions: ["SD", "DC"],
				overall: 81,
				sourceRefs: ["manual-athletic-1947-48-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Canito",
				season: "1947/48",
				positions: ["MC", "MCD"],
				overall: 73,
				sourceRefs: ["manual-athletic-1947-48-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MC", "MCD"]
			})
		]
	},
	{
		season: "1948/49",
		coach: makeCoach({
			name: "Juan Urquizu",
			coachId: "juan_urquizu",
			season: "1948/49",
			overall: 78,
			skills: {
				attack: 80,
				defense: 78,
				management: 79,
				mentality: 80,
				cup: 79,
				europe: 50
			},
			sourceRefs: ["manual-athletic-1948-49-post-war-gameplay-squad"],
			dataConfidence: .5,
			notes: "Plantilla base de posguerra para gameplay. Jugadores, posiciones y ratings marcados como estimacion manual pendiente de verificacion estadistica completa."
		}),
		players: [
			makePlayer({
				name: "Lezama",
				season: "1948/49",
				positions: ["POR"],
				overall: 82,
				sourceRefs: ["manual-athletic-1948-49-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Echevarria",
				season: "1948/49",
				positions: ["POR"],
				overall: 72,
				sourceRefs: ["manual-athletic-1948-49-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Oceja",
				season: "1948/49",
				positions: ["DFC", "LD"],
				overall: 79,
				sourceRefs: ["manual-athletic-1948-49-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: [
					"DFC-D",
					"DFC-C",
					"LD"
				]
			}),
			makePlayer({
				name: "Bertol",
				season: "1948/49",
				positions: ["DFC"],
				overall: 76,
				sourceRefs: ["manual-athletic-1948-49-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Mieza",
				season: "1948/49",
				positions: ["LI", "DFC"],
				overall: 77,
				sourceRefs: ["manual-athletic-1948-49-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Arqueta",
				season: "1948/49",
				positions: ["LD"],
				overall: 74,
				sourceRefs: ["manual-athletic-1948-49-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["LD"]
			}),
			makePlayer({
				name: "Nando",
				season: "1948/49",
				positions: ["MCD", "MC"],
				overall: 79,
				sourceRefs: ["manual-athletic-1948-49-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MCD", "MC-C"]
			}),
			makePlayer({
				name: "Garate",
				season: "1948/49",
				positions: ["MC", "MCD"],
				overall: 76,
				sourceRefs: ["manual-athletic-1948-49-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Canito",
				season: "1948/49",
				positions: ["MC", "MCD"],
				overall: 74,
				sourceRefs: ["manual-athletic-1948-49-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Panizo",
				season: "1948/49",
				positions: ["MP", "MC"],
				overall: 84,
				sourceRefs: ["manual-athletic-1948-49-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: [
					"MP",
					"MC-I",
					"MC-D"
				]
			}),
			makePlayer({
				name: "Iriondo",
				season: "1948/49",
				positions: ["ED", "DC"],
				overall: 82,
				sourceRefs: ["manual-athletic-1948-49-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Zarra",
				season: "1948/49",
				positions: ["DC"],
				overall: 87,
				sourceRefs: ["manual-athletic-1948-49-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Gainza",
				season: "1948/49",
				positions: ["EI", "MI"],
				overall: 85,
				sourceRefs: ["manual-athletic-1948-49-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Venancio",
				season: "1948/49",
				positions: ["SD", "DC"],
				overall: 81,
				sourceRefs: ["manual-athletic-1948-49-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Garcia",
				season: "1948/49",
				positions: ["MD", "ED"],
				overall: 73,
				sourceRefs: ["manual-athletic-1948-49-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MD", "ED"]
			})
		]
	},
	{
		season: "1949/50",
		coach: makeCoach({
			name: "Juan Urquizu",
			coachId: "juan_urquizu",
			season: "1949/50",
			overall: 77,
			skills: {
				attack: 79,
				defense: 77,
				management: 78,
				mentality: 79,
				cup: 78,
				europe: 50
			},
			sourceRefs: ["manual-athletic-1949-50-post-war-gameplay-squad"],
			dataConfidence: .5,
			notes: "Plantilla base de posguerra para gameplay. Jugadores, posiciones y ratings marcados como estimacion manual pendiente de verificacion estadistica completa."
		}),
		players: [
			makePlayer({
				name: "Lezama",
				season: "1949/50",
				positions: ["POR"],
				overall: 81,
				sourceRefs: ["manual-athletic-1949-50-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Carmelo",
				season: "1949/50",
				positions: ["POR"],
				overall: 72,
				sourceRefs: ["manual-athletic-1949-50-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Oceja",
				season: "1949/50",
				positions: ["DFC", "LD"],
				overall: 78,
				sourceRefs: ["manual-athletic-1949-50-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: [
					"DFC-D",
					"DFC-C",
					"LD"
				]
			}),
			makePlayer({
				name: "Bertol",
				season: "1949/50",
				positions: ["DFC"],
				overall: 76,
				sourceRefs: ["manual-athletic-1949-50-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Mieza",
				season: "1949/50",
				positions: ["LI", "DFC"],
				overall: 76,
				sourceRefs: ["manual-athletic-1949-50-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Orue",
				season: "1949/50",
				positions: ["LD"],
				overall: 74,
				sourceRefs: ["manual-athletic-1949-50-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["LD"]
			}),
			makePlayer({
				name: "Canito",
				season: "1949/50",
				positions: ["MC", "MCD"],
				overall: 75,
				sourceRefs: ["manual-athletic-1949-50-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Nando",
				season: "1949/50",
				positions: ["MCD", "MC"],
				overall: 78,
				sourceRefs: ["manual-athletic-1949-50-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MCD", "MC-C"]
			}),
			makePlayer({
				name: "Garate",
				season: "1949/50",
				positions: ["MC", "MCD"],
				overall: 75,
				sourceRefs: ["manual-athletic-1949-50-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Panizo",
				season: "1949/50",
				positions: ["MP", "MC"],
				overall: 83,
				sourceRefs: ["manual-athletic-1949-50-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: [
					"MP",
					"MC-I",
					"MC-D"
				]
			}),
			makePlayer({
				name: "Iriondo",
				season: "1949/50",
				positions: ["ED", "DC"],
				overall: 81,
				sourceRefs: ["manual-athletic-1949-50-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Zarra",
				season: "1949/50",
				positions: ["DC"],
				overall: 86,
				sourceRefs: ["manual-athletic-1949-50-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Gainza",
				season: "1949/50",
				positions: ["EI", "MI"],
				overall: 84,
				sourceRefs: ["manual-athletic-1949-50-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Venancio",
				season: "1949/50",
				positions: ["SD", "DC"],
				overall: 80,
				sourceRefs: ["manual-athletic-1949-50-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Garcia",
				season: "1949/50",
				positions: ["MD", "ED"],
				overall: 73,
				sourceRefs: ["manual-athletic-1949-50-post-war-gameplay-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["MD", "ED"]
			})
		]
	},
	{
		season: "1950/51",
		coach: makeCoach({
			name: "Juan Urquizu",
			coachId: "juan_urquizu",
			season: "1950/51",
			overall: 77,
			skills: {
				attack: 78,
				defense: 77,
				management: 78,
				mentality: 79,
				cup: 78,
				europe: 50
			},
			sourceRefs: ["athletic-official-1950-51-squad", "manual-athletic-1950s-coach-context"],
			dataConfidence: .56,
			notes: "Base jugable de la decada de 1950. Ratings calibrados por contexto competitivo, titulos y peso historico; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Lezama",
				season: "1950/51",
				positions: ["POR"],
				overall: 80,
				sourceRefs: ["athletic-official-1950-51-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Carmelo",
				season: "1950/51",
				positions: ["POR"],
				overall: 74,
				sourceRefs: ["athletic-official-1950-51-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Oceja",
				season: "1950/51",
				positions: ["DFC", "LD"],
				overall: 77,
				sourceRefs: ["athletic-official-1950-51-squad"],
				dataConfidence: .55,
				tacticalSlotLabels: [
					"DFC-D",
					"DFC-C",
					"LD"
				]
			}),
			makePlayer({
				name: "Bertol",
				season: "1950/51",
				positions: ["DFC"],
				overall: 75,
				sourceRefs: ["athletic-official-1950-51-squad"],
				dataConfidence: .52,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Garay",
				season: "1950/51",
				positions: ["DFC"],
				overall: 78,
				sourceRefs: ["athletic-official-1950-51-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["DFC-C", "DFC-I"]
			}),
			makePlayer({
				name: "Orue",
				season: "1950/51",
				positions: ["LD"],
				overall: 76,
				sourceRefs: ["athletic-official-1950-51-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["LD"]
			}),
			makePlayer({
				name: "Mieza",
				season: "1950/51",
				positions: ["LI", "DFC"],
				overall: 75,
				sourceRefs: ["athletic-official-1950-51-squad"],
				dataConfidence: .52,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Canito",
				season: "1950/51",
				positions: ["MC", "MCD"],
				overall: 76,
				sourceRefs: ["athletic-official-1950-51-squad"],
				dataConfidence: .55,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Nando",
				season: "1950/51",
				positions: ["MCD", "MC"],
				overall: 77,
				sourceRefs: ["athletic-official-1950-51-squad"],
				dataConfidence: .54,
				tacticalSlotLabels: ["MCD", "MC-C"]
			}),
			makePlayer({
				name: "Mauri",
				season: "1950/51",
				positions: ["MC", "MCD"],
				overall: 76,
				sourceRefs: ["athletic-official-1950-51-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Panizo",
				season: "1950/51",
				positions: ["MP", "MC"],
				overall: 82,
				sourceRefs: ["athletic-official-1950-51-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: [
					"MP",
					"MC-I",
					"MC-D"
				]
			}),
			makePlayer({
				name: "Venancio",
				season: "1950/51",
				positions: ["SD", "DC"],
				overall: 80,
				sourceRefs: ["athletic-official-1950-51-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Zarra",
				season: "1950/51",
				positions: ["DC"],
				overall: 85,
				sourceRefs: ["athletic-official-1950-51-squad"],
				dataConfidence: .65,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Gainza",
				season: "1950/51",
				positions: ["EI", "MI"],
				overall: 83,
				sourceRefs: ["athletic-official-1950-51-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Iriondo",
				season: "1950/51",
				positions: ["ED", "DC"],
				overall: 80,
				sourceRefs: ["athletic-official-1950-51-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["ED", "DC-D"]
			})
		]
	},
	{
		season: "1951/52",
		coach: makeCoach({
			name: "Antonio Barrios",
			coachId: "antonio_barrios",
			season: "1951/52",
			overall: 76,
			skills: {
				attack: 77,
				defense: 76,
				management: 76,
				mentality: 78,
				cup: 77,
				europe: 50
			},
			sourceRefs: ["athletic-official-1951-52-squad", "manual-athletic-1950s-coach-context"],
			dataConfidence: .55,
			notes: "Base jugable de la decada de 1950. Ratings calibrados por contexto competitivo, titulos y peso historico; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Lezama",
				season: "1951/52",
				positions: ["POR"],
				overall: 79,
				sourceRefs: ["athletic-official-1951-52-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Carmelo",
				season: "1951/52",
				positions: ["POR"],
				overall: 76,
				sourceRefs: ["athletic-official-1951-52-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Garay",
				season: "1951/52",
				positions: ["DFC"],
				overall: 80,
				sourceRefs: ["athletic-official-1951-52-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["DFC-C", "DFC-I"]
			}),
			makePlayer({
				name: "Oceja",
				season: "1951/52",
				positions: ["DFC", "LD"],
				overall: 76,
				sourceRefs: ["athletic-official-1951-52-squad"],
				dataConfidence: .52,
				tacticalSlotLabels: [
					"DFC-D",
					"DFC-C",
					"LD"
				]
			}),
			makePlayer({
				name: "Orue",
				season: "1951/52",
				positions: ["LD"],
				overall: 77,
				sourceRefs: ["athletic-official-1951-52-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["LD"]
			}),
			makePlayer({
				name: "Mieza",
				season: "1951/52",
				positions: ["LI", "DFC"],
				overall: 75,
				sourceRefs: ["athletic-official-1951-52-squad"],
				dataConfidence: .52,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Canito",
				season: "1951/52",
				positions: ["MC", "MCD"],
				overall: 77,
				sourceRefs: ["athletic-official-1951-52-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Mauri",
				season: "1951/52",
				positions: ["MC", "MCD"],
				overall: 77,
				sourceRefs: ["athletic-official-1951-52-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Nando",
				season: "1951/52",
				positions: ["MCD", "MC"],
				overall: 76,
				sourceRefs: ["athletic-official-1951-52-squad"],
				dataConfidence: .52,
				tacticalSlotLabels: ["MCD", "MC-C"]
			}),
			makePlayer({
				name: "Maguregi",
				season: "1951/52",
				positions: ["MC", "MCD"],
				overall: 75,
				sourceRefs: ["athletic-official-1951-52-squad"],
				dataConfidence: .55,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Panizo",
				season: "1951/52",
				positions: ["MP", "MC"],
				overall: 82,
				sourceRefs: ["athletic-official-1951-52-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: [
					"MP",
					"MC-I",
					"MC-D"
				]
			}),
			makePlayer({
				name: "Venancio",
				season: "1951/52",
				positions: ["SD", "DC"],
				overall: 80,
				sourceRefs: ["athletic-official-1951-52-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Zarra",
				season: "1951/52",
				positions: ["DC"],
				overall: 84,
				sourceRefs: ["athletic-official-1951-52-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Gainza",
				season: "1951/52",
				positions: ["EI", "MI"],
				overall: 83,
				sourceRefs: ["athletic-official-1951-52-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Iriondo",
				season: "1951/52",
				positions: ["ED", "DC"],
				overall: 79,
				sourceRefs: ["athletic-official-1951-52-squad"],
				dataConfidence: .54,
				tacticalSlotLabels: ["ED", "DC-D"]
			})
		]
	},
	{
		season: "1952/53",
		coach: makeCoach({
			name: "Antonio Barrios",
			coachId: "antonio_barrios",
			season: "1952/53",
			overall: 77,
			skills: {
				attack: 78,
				defense: 77,
				management: 77,
				mentality: 79,
				cup: 78,
				europe: 50
			},
			sourceRefs: ["athletic-official-1952-53-squad", "manual-athletic-1950s-coach-context"],
			dataConfidence: .56,
			notes: "Base jugable de la decada de 1950. Ratings calibrados por contexto competitivo, titulos y peso historico; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Carmelo",
				season: "1952/53",
				positions: ["POR"],
				overall: 78,
				sourceRefs: ["athletic-official-1952-53-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Lezama",
				season: "1952/53",
				positions: ["POR"],
				overall: 77,
				sourceRefs: ["athletic-official-1952-53-squad"],
				dataConfidence: .54,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Garay",
				season: "1952/53",
				positions: ["DFC"],
				overall: 82,
				sourceRefs: ["athletic-official-1952-53-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["DFC-C", "DFC-I"]
			}),
			makePlayer({
				name: "Orue",
				season: "1952/53",
				positions: ["LD"],
				overall: 78,
				sourceRefs: ["athletic-official-1952-53-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["LD"]
			}),
			makePlayer({
				name: "Mieza",
				season: "1952/53",
				positions: ["LI", "DFC"],
				overall: 75,
				sourceRefs: ["athletic-official-1952-53-squad"],
				dataConfidence: .52,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Bertol",
				season: "1952/53",
				positions: ["DFC"],
				overall: 74,
				sourceRefs: ["athletic-official-1952-53-squad"],
				dataConfidence: .5,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Canito",
				season: "1952/53",
				positions: ["MC", "MCD"],
				overall: 78,
				sourceRefs: ["athletic-official-1952-53-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Mauri",
				season: "1952/53",
				positions: ["MC", "MCD"],
				overall: 78,
				sourceRefs: ["athletic-official-1952-53-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Maguregi",
				season: "1952/53",
				positions: ["MC", "MCD"],
				overall: 76,
				sourceRefs: ["athletic-official-1952-53-squad"],
				dataConfidence: .57,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Etura",
				season: "1952/53",
				positions: ["MC", "MCD"],
				overall: 75,
				sourceRefs: ["athletic-official-1952-53-squad"],
				dataConfidence: .55,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Panizo",
				season: "1952/53",
				positions: ["MP", "MC"],
				overall: 81,
				sourceRefs: ["athletic-official-1952-53-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: [
					"MP",
					"MC-I",
					"MC-D"
				]
			}),
			makePlayer({
				name: "Venancio",
				season: "1952/53",
				positions: ["SD", "DC"],
				overall: 80,
				sourceRefs: ["athletic-official-1952-53-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Zarra",
				season: "1952/53",
				positions: ["DC"],
				overall: 83,
				sourceRefs: ["athletic-official-1952-53-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Gainza",
				season: "1952/53",
				positions: ["EI", "MI"],
				overall: 82,
				sourceRefs: ["athletic-official-1952-53-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Artetxe",
				season: "1952/53",
				positions: [
					"ED",
					"MD",
					"DC"
				],
				overall: 77,
				sourceRefs: ["athletic-official-1952-53-squad"],
				dataConfidence: .57,
				tacticalSlotLabels: [
					"ED",
					"MD",
					"DC-D"
				]
			})
		]
	},
	{
		season: "1953/54",
		coach: makeCoach({
			name: "Antonio Barrios",
			coachId: "antonio_barrios",
			season: "1953/54",
			overall: 78,
			skills: {
				attack: 79,
				defense: 78,
				management: 78,
				mentality: 80,
				cup: 79,
				europe: 50
			},
			sourceRefs: ["athletic-official-1953-54-squad", "manual-athletic-1950s-coach-context"],
			dataConfidence: .58,
			notes: "Base jugable de la decada de 1950. Ratings calibrados por contexto competitivo, titulos y peso historico; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Carmelo",
				season: "1953/54",
				positions: ["POR"],
				overall: 80,
				sourceRefs: ["athletic-official-1953-54-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Lezama",
				season: "1953/54",
				positions: ["POR"],
				overall: 75,
				sourceRefs: ["athletic-official-1953-54-squad"],
				dataConfidence: .52,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Garay",
				season: "1953/54",
				positions: ["DFC"],
				overall: 84,
				sourceRefs: ["athletic-official-1953-54-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["DFC-C", "DFC-I"]
			}),
			makePlayer({
				name: "Orue",
				season: "1953/54",
				positions: ["LD"],
				overall: 79,
				sourceRefs: ["athletic-official-1953-54-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["LD"]
			}),
			makePlayer({
				name: "Bertol",
				season: "1953/54",
				positions: ["DFC"],
				overall: 74,
				sourceRefs: ["athletic-official-1953-54-squad"],
				dataConfidence: .5,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Mieza",
				season: "1953/54",
				positions: ["LI", "DFC"],
				overall: 74,
				sourceRefs: ["athletic-official-1953-54-squad"],
				dataConfidence: .5,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Canito",
				season: "1953/54",
				positions: ["MC", "MCD"],
				overall: 79,
				sourceRefs: ["athletic-official-1953-54-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Mauri",
				season: "1953/54",
				positions: ["MC", "MCD"],
				overall: 79,
				sourceRefs: ["athletic-official-1953-54-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Maguregi",
				season: "1953/54",
				positions: ["MC", "MCD"],
				overall: 77,
				sourceRefs: ["athletic-official-1953-54-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Etura",
				season: "1953/54",
				positions: ["MC", "MCD"],
				overall: 76,
				sourceRefs: ["athletic-official-1953-54-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Panizo",
				season: "1953/54",
				positions: ["MP", "MC"],
				overall: 80,
				sourceRefs: ["athletic-official-1953-54-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: [
					"MP",
					"MC-I",
					"MC-D"
				]
			}),
			makePlayer({
				name: "Venancio",
				season: "1953/54",
				positions: ["SD", "DC"],
				overall: 79,
				sourceRefs: ["athletic-official-1953-54-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Zarra",
				season: "1953/54",
				positions: ["DC"],
				overall: 82,
				sourceRefs: ["athletic-official-1953-54-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Gainza",
				season: "1953/54",
				positions: ["EI", "MI"],
				overall: 82,
				sourceRefs: ["athletic-official-1953-54-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Artetxe",
				season: "1953/54",
				positions: [
					"ED",
					"MD",
					"DC"
				],
				overall: 79,
				sourceRefs: ["athletic-official-1953-54-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: [
					"ED",
					"MD",
					"DC-D"
				]
			})
		]
	},
	{
		season: "1954/55",
		coach: makeCoach({
			name: "Ferdinand Daucik",
			coachId: "ferdinand_daucik",
			season: "1954/55",
			overall: 82,
			skills: {
				attack: 84,
				defense: 81,
				management: 83,
				mentality: 84,
				cup: 84,
				europe: 50
			},
			sourceRefs: ["athletic-official-1954-55-squad", "manual-athletic-1950s-coach-context"],
			dataConfidence: .65,
			notes: "Base jugable de la decada de 1950. Ratings calibrados por contexto competitivo, titulos y peso historico; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Carmelo",
				season: "1954/55",
				positions: ["POR"],
				overall: 82,
				sourceRefs: ["athletic-official-1954-55-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Lezama",
				season: "1954/55",
				positions: ["POR"],
				overall: 74,
				sourceRefs: ["athletic-official-1954-55-squad"],
				dataConfidence: .5,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Garay",
				season: "1954/55",
				positions: ["DFC"],
				overall: 86,
				sourceRefs: ["athletic-official-1954-55-squad"],
				dataConfidence: .75,
				tacticalSlotLabels: ["DFC-C", "DFC-I"]
			}),
			makePlayer({
				name: "Orue",
				season: "1954/55",
				positions: ["LD"],
				overall: 81,
				sourceRefs: ["athletic-official-1954-55-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["LD"]
			}),
			makePlayer({
				name: "Canito",
				season: "1954/55",
				positions: ["MC", "MCD"],
				overall: 80,
				sourceRefs: ["athletic-official-1954-55-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Mauri",
				season: "1954/55",
				positions: ["MC", "MCD"],
				overall: 81,
				sourceRefs: ["athletic-official-1954-55-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Maguregi",
				season: "1954/55",
				positions: ["MC", "MCD"],
				overall: 79,
				sourceRefs: ["athletic-official-1954-55-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Etura",
				season: "1954/55",
				positions: ["MC", "MCD"],
				overall: 78,
				sourceRefs: ["athletic-official-1954-55-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Panizo",
				season: "1954/55",
				positions: ["MP", "MC"],
				overall: 80,
				sourceRefs: ["athletic-official-1954-55-squad"],
				dataConfidence: .55,
				tacticalSlotLabels: [
					"MP",
					"MC-I",
					"MC-D"
				]
			}),
			makePlayer({
				name: "Venancio",
				season: "1954/55",
				positions: ["SD", "DC"],
				overall: 79,
				sourceRefs: ["athletic-official-1954-55-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Artetxe",
				season: "1954/55",
				positions: [
					"ED",
					"MD",
					"DC"
				],
				overall: 81,
				sourceRefs: ["athletic-official-1954-55-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: [
					"ED",
					"MD",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Arieta",
				season: "1954/55",
				positions: ["DC"],
				overall: 80,
				sourceRefs: ["athletic-official-1954-55-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Uribe",
				season: "1954/55",
				positions: [
					"EI",
					"MI",
					"SD"
				],
				overall: 79,
				sourceRefs: ["athletic-official-1954-55-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: [
					"EI",
					"MI",
					"SD"
				]
			}),
			makePlayer({
				name: "Gainza",
				season: "1954/55",
				positions: ["EI", "MI"],
				overall: 81,
				sourceRefs: ["athletic-official-1954-55-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Marcaida",
				season: "1954/55",
				positions: ["MD", "ED"],
				overall: 77,
				sourceRefs: ["athletic-official-1954-55-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["MD", "ED"]
			})
		]
	},
	{
		season: "1955/56",
		coach: makeCoach({
			name: "Ferdinand Daucik",
			coachId: "ferdinand_daucik",
			season: "1955/56",
			overall: 88,
			skills: {
				attack: 89,
				defense: 86,
				management: 88,
				mentality: 90,
				cup: 88,
				europe: 50
			},
			sourceRefs: ["athletic-official-1955-56-squad", "manual-athletic-1950s-coach-context"],
			dataConfidence: .78,
			notes: "Base jugable de la decada de 1950. Ratings calibrados por contexto competitivo, titulos y peso historico; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Carmelo",
				season: "1955/56",
				positions: ["POR"],
				overall: 86,
				sourceRefs: ["athletic-official-1955-56-squad"],
				dataConfidence: .82,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Lezama",
				season: "1955/56",
				positions: ["POR"],
				overall: 73,
				sourceRefs: ["athletic-official-1955-56-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Garay",
				season: "1955/56",
				positions: ["DFC"],
				overall: 90,
				sourceRefs: ["athletic-official-1955-56-squad"],
				dataConfidence: .85,
				tacticalSlotLabels: ["DFC-C", "DFC-I"]
			}),
			makePlayer({
				name: "Orue",
				season: "1955/56",
				positions: ["LD"],
				overall: 84,
				sourceRefs: ["athletic-official-1955-56-squad"],
				dataConfidence: .75,
				tacticalSlotLabels: ["LD"]
			}),
			makePlayer({
				name: "Canito",
				season: "1955/56",
				positions: ["MC", "MCD"],
				overall: 82,
				sourceRefs: ["athletic-official-1955-56-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Mauri",
				season: "1955/56",
				positions: ["MC", "MCD"],
				overall: 85,
				sourceRefs: ["athletic-official-1955-56-squad"],
				dataConfidence: .78,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Maguregi",
				season: "1955/56",
				positions: ["MC", "MCD"],
				overall: 82,
				sourceRefs: ["athletic-official-1955-56-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Etura",
				season: "1955/56",
				positions: ["MC", "MCD"],
				overall: 81,
				sourceRefs: ["athletic-official-1955-56-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Artetxe",
				season: "1955/56",
				positions: [
					"ED",
					"MD",
					"DC"
				],
				overall: 85,
				sourceRefs: ["athletic-official-1955-56-squad"],
				dataConfidence: .78,
				tacticalSlotLabels: [
					"ED",
					"MD",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Arieta",
				season: "1955/56",
				positions: ["DC"],
				overall: 86,
				sourceRefs: ["athletic-official-1955-56-squad"],
				dataConfidence: .8,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Uribe",
				season: "1955/56",
				positions: [
					"EI",
					"MI",
					"SD"
				],
				overall: 83,
				sourceRefs: ["athletic-official-1955-56-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: [
					"EI",
					"MI",
					"SD"
				]
			}),
			makePlayer({
				name: "Gainza",
				season: "1955/56",
				positions: ["EI", "MI"],
				overall: 82,
				sourceRefs: ["athletic-official-1955-56-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Marcaida",
				season: "1955/56",
				positions: ["MD", "ED"],
				overall: 79,
				sourceRefs: ["athletic-official-1955-56-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["MD", "ED"]
			}),
			makePlayer({
				name: "Venancio",
				season: "1955/56",
				positions: ["SD", "DC"],
				overall: 78,
				sourceRefs: ["athletic-official-1955-56-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Panizo",
				season: "1955/56",
				positions: ["MP", "MC"],
				overall: 78,
				sourceRefs: ["athletic-official-1955-56-squad"],
				dataConfidence: .52,
				tacticalSlotLabels: [
					"MP",
					"MC-I",
					"MC-D"
				]
			})
		]
	},
	{
		season: "1956/57",
		coach: makeCoach({
			name: "Ferdinand Daucik",
			coachId: "ferdinand_daucik",
			season: "1956/57",
			overall: 86,
			skills: {
				attack: 87,
				defense: 85,
				management: 87,
				mentality: 88,
				cup: 86,
				europe: 78
			},
			sourceRefs: ["athletic-official-1956-57-squad", "manual-athletic-1950s-coach-context"],
			dataConfidence: .75,
			notes: "Base jugable de la decada de 1950. Ratings calibrados por contexto competitivo, titulos y peso historico; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Carmelo",
				season: "1956/57",
				positions: ["POR"],
				overall: 86,
				sourceRefs: ["athletic-official-1956-57-squad"],
				dataConfidence: .82,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Aguirreoa",
				season: "1956/57",
				positions: ["POR"],
				overall: 72,
				sourceRefs: ["athletic-official-1956-57-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Garay",
				season: "1956/57",
				positions: ["DFC"],
				overall: 89,
				sourceRefs: ["athletic-official-1956-57-squad"],
				dataConfidence: .84,
				tacticalSlotLabels: ["DFC-C", "DFC-I"]
			}),
			makePlayer({
				name: "Orue",
				season: "1956/57",
				positions: ["LD"],
				overall: 84,
				sourceRefs: ["athletic-official-1956-57-squad"],
				dataConfidence: .75,
				tacticalSlotLabels: ["LD"]
			}),
			makePlayer({
				name: "Canito",
				season: "1956/57",
				positions: ["MC", "MCD"],
				overall: 81,
				sourceRefs: ["athletic-official-1956-57-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Mauri",
				season: "1956/57",
				positions: ["MC", "MCD"],
				overall: 84,
				sourceRefs: ["athletic-official-1956-57-squad"],
				dataConfidence: .76,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Maguregi",
				season: "1956/57",
				positions: ["MC", "MCD"],
				overall: 82,
				sourceRefs: ["athletic-official-1956-57-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Etura",
				season: "1956/57",
				positions: ["MC", "MCD"],
				overall: 81,
				sourceRefs: ["athletic-official-1956-57-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Artetxe",
				season: "1956/57",
				positions: [
					"ED",
					"MD",
					"DC"
				],
				overall: 85,
				sourceRefs: ["athletic-official-1956-57-squad"],
				dataConfidence: .78,
				tacticalSlotLabels: [
					"ED",
					"MD",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Arieta",
				season: "1956/57",
				positions: ["DC"],
				overall: 85,
				sourceRefs: ["athletic-official-1956-57-squad"],
				dataConfidence: .78,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Uribe",
				season: "1956/57",
				positions: [
					"EI",
					"MI",
					"SD"
				],
				overall: 82,
				sourceRefs: ["athletic-official-1956-57-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"EI",
					"MI",
					"SD"
				]
			}),
			makePlayer({
				name: "Gainza",
				season: "1956/57",
				positions: ["EI", "MI"],
				overall: 80,
				sourceRefs: ["athletic-official-1956-57-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Marcaida",
				season: "1956/57",
				positions: ["MD", "ED"],
				overall: 79,
				sourceRefs: ["athletic-official-1956-57-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["MD", "ED"]
			}),
			makePlayer({
				name: "Arieta II",
				season: "1956/57",
				positions: ["SD", "DC"],
				overall: 77,
				sourceRefs: ["athletic-official-1956-57-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Merodio",
				season: "1956/57",
				positions: ["MC", "MP"],
				overall: 77,
				sourceRefs: ["athletic-official-1956-57-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["MC", "MP"]
			})
		]
	},
	{
		season: "1957/58",
		coach: makeCoach({
			name: "Baltasar Albeniz",
			coachId: "baltasar_albeniz",
			season: "1957/58",
			overall: 84,
			skills: {
				attack: 85,
				defense: 83,
				management: 84,
				mentality: 86,
				cup: 88,
				europe: 65
			},
			sourceRefs: ["athletic-official-1957-58-squad", "manual-athletic-1950s-coach-context"],
			dataConfidence: .7,
			notes: "Base jugable de la decada de 1950. Ratings calibrados por contexto competitivo, titulos y peso historico; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Carmelo",
				season: "1957/58",
				positions: ["POR"],
				overall: 85,
				sourceRefs: ["athletic-official-1957-58-squad"],
				dataConfidence: .8,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Aguirreoa",
				season: "1957/58",
				positions: ["POR"],
				overall: 72,
				sourceRefs: ["athletic-official-1957-58-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Garay",
				season: "1957/58",
				positions: ["DFC"],
				overall: 88,
				sourceRefs: ["athletic-official-1957-58-squad"],
				dataConfidence: .82,
				tacticalSlotLabels: ["DFC-C", "DFC-I"]
			}),
			makePlayer({
				name: "Orue",
				season: "1957/58",
				positions: ["LD"],
				overall: 83,
				sourceRefs: ["athletic-official-1957-58-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["LD"]
			}),
			makePlayer({
				name: "Canito",
				season: "1957/58",
				positions: ["MC", "MCD"],
				overall: 80,
				sourceRefs: ["athletic-official-1957-58-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Mauri",
				season: "1957/58",
				positions: ["MC", "MCD"],
				overall: 83,
				sourceRefs: ["athletic-official-1957-58-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Maguregi",
				season: "1957/58",
				positions: ["MC", "MCD"],
				overall: 81,
				sourceRefs: ["athletic-official-1957-58-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Etura",
				season: "1957/58",
				positions: ["MC", "MCD"],
				overall: 80,
				sourceRefs: ["athletic-official-1957-58-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Artetxe",
				season: "1957/58",
				positions: [
					"ED",
					"MD",
					"DC"
				],
				overall: 84,
				sourceRefs: ["athletic-official-1957-58-squad"],
				dataConfidence: .76,
				tacticalSlotLabels: [
					"ED",
					"MD",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Arieta",
				season: "1957/58",
				positions: ["DC"],
				overall: 84,
				sourceRefs: ["athletic-official-1957-58-squad"],
				dataConfidence: .76,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Uribe",
				season: "1957/58",
				positions: [
					"EI",
					"MI",
					"SD"
				],
				overall: 82,
				sourceRefs: ["athletic-official-1957-58-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"EI",
					"MI",
					"SD"
				]
			}),
			makePlayer({
				name: "Gainza",
				season: "1957/58",
				positions: ["EI", "MI"],
				overall: 79,
				sourceRefs: ["athletic-official-1957-58-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Marcaida",
				season: "1957/58",
				positions: ["MD", "ED"],
				overall: 78,
				sourceRefs: ["athletic-official-1957-58-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MD", "ED"]
			}),
			makePlayer({
				name: "Arieta II",
				season: "1957/58",
				positions: ["SD", "DC"],
				overall: 78,
				sourceRefs: ["athletic-official-1957-58-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Merodio",
				season: "1957/58",
				positions: ["MC", "MP"],
				overall: 78,
				sourceRefs: ["athletic-official-1957-58-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["MC", "MP"]
			})
		]
	},
	{
		season: "1958/59",
		coach: makeCoach({
			name: "Baltasar Albeniz",
			coachId: "baltasar_albeniz",
			season: "1958/59",
			overall: 81,
			skills: {
				attack: 82,
				defense: 81,
				management: 81,
				mentality: 83,
				cup: 82,
				europe: 60
			},
			sourceRefs: ["athletic-official-1958-59-squad", "manual-athletic-1950s-coach-context"],
			dataConfidence: .66,
			notes: "Base jugable de la decada de 1950. Ratings calibrados por contexto competitivo, titulos y peso historico; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Carmelo",
				season: "1958/59",
				positions: ["POR"],
				overall: 84,
				sourceRefs: ["athletic-official-1958-59-squad"],
				dataConfidence: .78,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Aguirreoa",
				season: "1958/59",
				positions: ["POR"],
				overall: 72,
				sourceRefs: ["athletic-official-1958-59-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Garay",
				season: "1958/59",
				positions: ["DFC"],
				overall: 87,
				sourceRefs: ["athletic-official-1958-59-squad"],
				dataConfidence: .8,
				tacticalSlotLabels: ["DFC-C", "DFC-I"]
			}),
			makePlayer({
				name: "Orue",
				season: "1958/59",
				positions: ["LD"],
				overall: 82,
				sourceRefs: ["athletic-official-1958-59-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["LD"]
			}),
			makePlayer({
				name: "Canito",
				season: "1958/59",
				positions: ["MC", "MCD"],
				overall: 79,
				sourceRefs: ["athletic-official-1958-59-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Mauri",
				season: "1958/59",
				positions: ["MC", "MCD"],
				overall: 82,
				sourceRefs: ["athletic-official-1958-59-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Maguregi",
				season: "1958/59",
				positions: ["MC", "MCD"],
				overall: 80,
				sourceRefs: ["athletic-official-1958-59-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Etura",
				season: "1958/59",
				positions: ["MC", "MCD"],
				overall: 79,
				sourceRefs: ["athletic-official-1958-59-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Artetxe",
				season: "1958/59",
				positions: [
					"ED",
					"MD",
					"DC"
				],
				overall: 83,
				sourceRefs: ["athletic-official-1958-59-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: [
					"ED",
					"MD",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Arieta",
				season: "1958/59",
				positions: ["DC"],
				overall: 83,
				sourceRefs: ["athletic-official-1958-59-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Uribe",
				season: "1958/59",
				positions: [
					"EI",
					"MI",
					"SD"
				],
				overall: 81,
				sourceRefs: ["athletic-official-1958-59-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"EI",
					"MI",
					"SD"
				]
			}),
			makePlayer({
				name: "Arieta II",
				season: "1958/59",
				positions: ["SD", "DC"],
				overall: 78,
				sourceRefs: ["athletic-official-1958-59-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Merodio",
				season: "1958/59",
				positions: ["MC", "MP"],
				overall: 79,
				sourceRefs: ["athletic-official-1958-59-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Gainza",
				season: "1958/59",
				positions: ["EI", "MI"],
				overall: 78,
				sourceRefs: ["athletic-official-1958-59-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Marcaida",
				season: "1958/59",
				positions: ["MD", "ED"],
				overall: 77,
				sourceRefs: ["athletic-official-1958-59-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["MD", "ED"]
			})
		]
	},
	{
		season: "1959/60",
		coach: makeCoach({
			name: "Baltasar Albeniz",
			coachId: "baltasar_albeniz",
			season: "1959/60",
			overall: 80,
			skills: {
				attack: 81,
				defense: 80,
				management: 80,
				mentality: 82,
				cup: 81,
				europe: 58
			},
			sourceRefs: ["athletic-official-1959-60-squad", "manual-athletic-1950s-coach-context"],
			dataConfidence: .64,
			notes: "Base jugable de la decada de 1950. Ratings calibrados por contexto competitivo, titulos y peso historico; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Carmelo",
				season: "1959/60",
				positions: ["POR"],
				overall: 83,
				sourceRefs: ["athletic-official-1959-60-squad"],
				dataConfidence: .76,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Aguirreoa",
				season: "1959/60",
				positions: ["POR"],
				overall: 72,
				sourceRefs: ["athletic-official-1959-60-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Garay",
				season: "1959/60",
				positions: ["DFC"],
				overall: 86,
				sourceRefs: ["athletic-official-1959-60-squad"],
				dataConfidence: .78,
				tacticalSlotLabels: ["DFC-C", "DFC-I"]
			}),
			makePlayer({
				name: "Orue",
				season: "1959/60",
				positions: ["LD"],
				overall: 81,
				sourceRefs: ["athletic-official-1959-60-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["LD"]
			}),
			makePlayer({
				name: "Canito",
				season: "1959/60",
				positions: ["MC", "MCD"],
				overall: 78,
				sourceRefs: ["athletic-official-1959-60-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Mauri",
				season: "1959/60",
				positions: ["MC", "MCD"],
				overall: 81,
				sourceRefs: ["athletic-official-1959-60-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Maguregi",
				season: "1959/60",
				positions: ["MC", "MCD"],
				overall: 80,
				sourceRefs: ["athletic-official-1959-60-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Etura",
				season: "1959/60",
				positions: ["MC", "MCD"],
				overall: 78,
				sourceRefs: ["athletic-official-1959-60-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Artetxe",
				season: "1959/60",
				positions: [
					"ED",
					"MD",
					"DC"
				],
				overall: 82,
				sourceRefs: ["athletic-official-1959-60-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"ED",
					"MD",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Arieta",
				season: "1959/60",
				positions: ["DC"],
				overall: 82,
				sourceRefs: ["athletic-official-1959-60-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Uribe",
				season: "1959/60",
				positions: [
					"EI",
					"MI",
					"SD"
				],
				overall: 80,
				sourceRefs: ["athletic-official-1959-60-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: [
					"EI",
					"MI",
					"SD"
				]
			}),
			makePlayer({
				name: "Arieta II",
				season: "1959/60",
				positions: ["SD", "DC"],
				overall: 79,
				sourceRefs: ["athletic-official-1959-60-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Merodio",
				season: "1959/60",
				positions: ["MC", "MP"],
				overall: 80,
				sourceRefs: ["athletic-official-1959-60-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Marcaida",
				season: "1959/60",
				positions: ["MD", "ED"],
				overall: 77,
				sourceRefs: ["athletic-official-1959-60-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["MD", "ED"]
			}),
			makePlayer({
				name: "Aguirre",
				season: "1959/60",
				positions: ["MC", "MCD"],
				overall: 76,
				sourceRefs: ["athletic-official-1959-60-squad"],
				dataConfidence: .54,
				tacticalSlotLabels: ["MC", "MCD"]
			})
		]
	},
	{
		season: "1960/61",
		coach: makeCoach({
			name: "Baltasar Albeniz",
			coachId: "baltasar_albeniz",
			season: "1960/61",
			overall: 79,
			skills: {
				attack: 80,
				defense: 79,
				management: 79,
				mentality: 81,
				cup: 80,
				europe: 58
			},
			sourceRefs: ["athletic-official-1960-61-squad", "manual-athletic-1960s-coach-context"],
			dataConfidence: .62,
			notes: "Base jugable de la decada de 1960. Ratings calibrados por contexto competitivo, aparicion de Iribar/Rojo/Uriarte y fortaleza copera 1968/69; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Carmelo",
				season: "1960/61",
				positions: ["POR"],
				overall: 82,
				sourceRefs: ["athletic-official-1960-61-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Aguirreoa",
				season: "1960/61",
				positions: ["POR"],
				overall: 72,
				sourceRefs: ["athletic-official-1960-61-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Garay",
				season: "1960/61",
				positions: ["DFC"],
				overall: 85,
				sourceRefs: ["athletic-official-1960-61-squad"],
				dataConfidence: .76,
				tacticalSlotLabels: ["DFC-C", "DFC-I"]
			}),
			makePlayer({
				name: "Orue",
				season: "1960/61",
				positions: ["LD"],
				overall: 80,
				sourceRefs: ["athletic-official-1960-61-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["LD"]
			}),
			makePlayer({
				name: "Larrauri",
				season: "1960/61",
				positions: ["LI", "DFC"],
				overall: 75,
				sourceRefs: ["athletic-official-1960-61-squad"],
				dataConfidence: .54,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Echeberria",
				season: "1960/61",
				positions: ["DFC"],
				overall: 75,
				sourceRefs: ["athletic-official-1960-61-squad"],
				dataConfidence: .54,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Mauri",
				season: "1960/61",
				positions: ["MC", "MCD"],
				overall: 80,
				sourceRefs: ["athletic-official-1960-61-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Maguregi",
				season: "1960/61",
				positions: ["MC", "MCD"],
				overall: 79,
				sourceRefs: ["athletic-official-1960-61-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Etura",
				season: "1960/61",
				positions: ["MC", "MCD"],
				overall: 78,
				sourceRefs: ["athletic-official-1960-61-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Merodio",
				season: "1960/61",
				positions: ["MC", "MP"],
				overall: 79,
				sourceRefs: ["athletic-official-1960-61-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Artetxe",
				season: "1960/61",
				positions: [
					"ED",
					"MD",
					"DC"
				],
				overall: 81,
				sourceRefs: ["athletic-official-1960-61-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: [
					"ED",
					"MD",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Arieta",
				season: "1960/61",
				positions: ["DC"],
				overall: 81,
				sourceRefs: ["athletic-official-1960-61-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Uribe",
				season: "1960/61",
				positions: [
					"EI",
					"MI",
					"SD"
				],
				overall: 79,
				sourceRefs: ["athletic-official-1960-61-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: [
					"EI",
					"MI",
					"SD"
				]
			}),
			makePlayer({
				name: "Arieta II",
				season: "1960/61",
				positions: ["SD", "DC"],
				overall: 79,
				sourceRefs: ["athletic-official-1960-61-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Marcaida",
				season: "1960/61",
				positions: ["MD", "ED"],
				overall: 76,
				sourceRefs: ["athletic-official-1960-61-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["MD", "ED"]
			})
		]
	},
	{
		season: "1961/62",
		coach: makeCoach({
			name: "Juan Antonio Ipina",
			coachId: "juan_antonio_ipina",
			season: "1961/62",
			overall: 78,
			skills: {
				attack: 79,
				defense: 78,
				management: 78,
				mentality: 80,
				cup: 79,
				europe: 56
			},
			sourceRefs: ["athletic-official-1961-62-squad", "manual-athletic-1960s-coach-context"],
			dataConfidence: .6,
			notes: "Base jugable de la decada de 1960. Ratings calibrados por contexto competitivo, aparicion de Iribar/Rojo/Uriarte y fortaleza copera 1968/69; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Carmelo",
				season: "1961/62",
				positions: ["POR"],
				overall: 81,
				sourceRefs: ["athletic-official-1961-62-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Aguirreoa",
				season: "1961/62",
				positions: ["POR"],
				overall: 72,
				sourceRefs: ["athletic-official-1961-62-squad"],
				dataConfidence: .48,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Garay",
				season: "1961/62",
				positions: ["DFC"],
				overall: 84,
				sourceRefs: ["athletic-official-1961-62-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["DFC-C", "DFC-I"]
			}),
			makePlayer({
				name: "Orue",
				season: "1961/62",
				positions: ["LD"],
				overall: 79,
				sourceRefs: ["athletic-official-1961-62-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["LD"]
			}),
			makePlayer({
				name: "Larrauri",
				season: "1961/62",
				positions: ["LI", "DFC"],
				overall: 76,
				sourceRefs: ["athletic-official-1961-62-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Echeberria",
				season: "1961/62",
				positions: ["DFC"],
				overall: 75,
				sourceRefs: ["athletic-official-1961-62-squad"],
				dataConfidence: .54,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Mauri",
				season: "1961/62",
				positions: ["MC", "MCD"],
				overall: 79,
				sourceRefs: ["athletic-official-1961-62-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Maguregi",
				season: "1961/62",
				positions: ["MC", "MCD"],
				overall: 78,
				sourceRefs: ["athletic-official-1961-62-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Etura",
				season: "1961/62",
				positions: ["MC", "MCD"],
				overall: 77,
				sourceRefs: ["athletic-official-1961-62-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Merodio",
				season: "1961/62",
				positions: ["MC", "MP"],
				overall: 79,
				sourceRefs: ["athletic-official-1961-62-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Artetxe",
				season: "1961/62",
				positions: [
					"ED",
					"MD",
					"DC"
				],
				overall: 80,
				sourceRefs: ["athletic-official-1961-62-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: [
					"ED",
					"MD",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Arieta",
				season: "1961/62",
				positions: ["DC"],
				overall: 81,
				sourceRefs: ["athletic-official-1961-62-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Uribe",
				season: "1961/62",
				positions: [
					"EI",
					"MI",
					"SD"
				],
				overall: 79,
				sourceRefs: ["athletic-official-1961-62-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: [
					"EI",
					"MI",
					"SD"
				]
			}),
			makePlayer({
				name: "Arieta II",
				season: "1961/62",
				positions: ["SD", "DC"],
				overall: 80,
				sourceRefs: ["athletic-official-1961-62-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Marcaida",
				season: "1961/62",
				positions: ["MD", "ED"],
				overall: 76,
				sourceRefs: ["athletic-official-1961-62-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["MD", "ED"]
			})
		]
	},
	{
		season: "1962/63",
		coach: makeCoach({
			name: "Juan Antonio Ipina",
			coachId: "juan_antonio_ipina",
			season: "1962/63",
			overall: 78,
			skills: {
				attack: 79,
				defense: 78,
				management: 78,
				mentality: 80,
				cup: 78,
				europe: 56
			},
			sourceRefs: ["athletic-official-1962-63-squad", "manual-athletic-1960s-coach-context"],
			dataConfidence: .6,
			notes: "Base jugable de la decada de 1960. Ratings calibrados por contexto competitivo, aparicion de Iribar/Rojo/Uriarte y fortaleza copera 1968/69; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Carmelo",
				season: "1962/63",
				positions: ["POR"],
				overall: 80,
				sourceRefs: ["athletic-official-1962-63-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Iribar",
				season: "1962/63",
				positions: ["POR"],
				overall: 76,
				sourceRefs: ["athletic-official-1962-63-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Garay",
				season: "1962/63",
				positions: ["DFC"],
				overall: 83,
				sourceRefs: ["athletic-official-1962-63-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["DFC-C", "DFC-I"]
			}),
			makePlayer({
				name: "Orue",
				season: "1962/63",
				positions: ["LD"],
				overall: 78,
				sourceRefs: ["athletic-official-1962-63-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["LD"]
			}),
			makePlayer({
				name: "Larrauri",
				season: "1962/63",
				positions: ["LI", "DFC"],
				overall: 76,
				sourceRefs: ["athletic-official-1962-63-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Echeberria",
				season: "1962/63",
				positions: ["DFC"],
				overall: 76,
				sourceRefs: ["athletic-official-1962-63-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Mauri",
				season: "1962/63",
				positions: ["MC", "MCD"],
				overall: 78,
				sourceRefs: ["athletic-official-1962-63-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Maguregi",
				season: "1962/63",
				positions: ["MC", "MCD"],
				overall: 78,
				sourceRefs: ["athletic-official-1962-63-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Etura",
				season: "1962/63",
				positions: ["MC", "MCD"],
				overall: 77,
				sourceRefs: ["athletic-official-1962-63-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Merodio",
				season: "1962/63",
				positions: ["MC", "MP"],
				overall: 78,
				sourceRefs: ["athletic-official-1962-63-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Artetxe",
				season: "1962/63",
				positions: [
					"ED",
					"MD",
					"DC"
				],
				overall: 79,
				sourceRefs: ["athletic-official-1962-63-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: [
					"ED",
					"MD",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Arieta",
				season: "1962/63",
				positions: ["DC"],
				overall: 80,
				sourceRefs: ["athletic-official-1962-63-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Uribe",
				season: "1962/63",
				positions: [
					"EI",
					"MI",
					"SD"
				],
				overall: 78,
				sourceRefs: ["athletic-official-1962-63-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: [
					"EI",
					"MI",
					"SD"
				]
			}),
			makePlayer({
				name: "Arieta II",
				season: "1962/63",
				positions: ["SD", "DC"],
				overall: 80,
				sourceRefs: ["athletic-official-1962-63-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Uriarte",
				season: "1962/63",
				positions: ["DC", "SD"],
				overall: 76,
				sourceRefs: ["athletic-official-1962-63-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["DC", "SD"]
			})
		]
	},
	{
		season: "1963/64",
		coach: makeCoach({
			name: "Antonio Barrios",
			coachId: "antonio_barrios",
			season: "1963/64",
			overall: 79,
			skills: {
				attack: 80,
				defense: 79,
				management: 79,
				mentality: 81,
				cup: 80,
				europe: 58
			},
			sourceRefs: ["athletic-official-1963-64-squad", "manual-athletic-1960s-coach-context"],
			dataConfidence: .62,
			notes: "Base jugable de la decada de 1960. Ratings calibrados por contexto competitivo, aparicion de Iribar/Rojo/Uriarte y fortaleza copera 1968/69; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Iribar",
				season: "1963/64",
				positions: ["POR"],
				overall: 82,
				sourceRefs: ["athletic-official-1963-64-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Carmelo",
				season: "1963/64",
				positions: ["POR"],
				overall: 78,
				sourceRefs: ["athletic-official-1963-64-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Garay",
				season: "1963/64",
				positions: ["DFC"],
				overall: 82,
				sourceRefs: ["athletic-official-1963-64-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["DFC-C", "DFC-I"]
			}),
			makePlayer({
				name: "Orue",
				season: "1963/64",
				positions: ["LD"],
				overall: 78,
				sourceRefs: ["athletic-official-1963-64-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["LD"]
			}),
			makePlayer({
				name: "Larrauri",
				season: "1963/64",
				positions: ["LI", "DFC"],
				overall: 76,
				sourceRefs: ["athletic-official-1963-64-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Echeberria",
				season: "1963/64",
				positions: ["DFC"],
				overall: 77,
				sourceRefs: ["athletic-official-1963-64-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Mauri",
				season: "1963/64",
				positions: ["MC", "MCD"],
				overall: 78,
				sourceRefs: ["athletic-official-1963-64-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Maguregi",
				season: "1963/64",
				positions: ["MC", "MCD"],
				overall: 78,
				sourceRefs: ["athletic-official-1963-64-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Etura",
				season: "1963/64",
				positions: ["MC", "MCD"],
				overall: 77,
				sourceRefs: ["athletic-official-1963-64-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Merodio",
				season: "1963/64",
				positions: ["MC", "MP"],
				overall: 78,
				sourceRefs: ["athletic-official-1963-64-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Artetxe",
				season: "1963/64",
				positions: [
					"ED",
					"MD",
					"DC"
				],
				overall: 79,
				sourceRefs: ["athletic-official-1963-64-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: [
					"ED",
					"MD",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Arieta",
				season: "1963/64",
				positions: ["DC"],
				overall: 80,
				sourceRefs: ["athletic-official-1963-64-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Arieta II",
				season: "1963/64",
				positions: ["SD", "DC"],
				overall: 81,
				sourceRefs: ["athletic-official-1963-64-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Uriarte",
				season: "1963/64",
				positions: ["DC", "SD"],
				overall: 78,
				sourceRefs: ["athletic-official-1963-64-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Rojo I",
				season: "1963/64",
				positions: ["EI", "MI"],
				overall: 75,
				sourceRefs: ["athletic-official-1963-64-squad"],
				dataConfidence: .54,
				tacticalSlotLabels: ["EI", "MI"]
			})
		]
	},
	{
		season: "1964/65",
		coach: makeCoach({
			name: "Antonio Barrios",
			coachId: "antonio_barrios",
			season: "1964/65",
			overall: 80,
			skills: {
				attack: 81,
				defense: 80,
				management: 80,
				mentality: 82,
				cup: 81,
				europe: 60
			},
			sourceRefs: ["athletic-official-1964-65-squad", "manual-athletic-1960s-coach-context"],
			dataConfidence: .64,
			notes: "Base jugable de la decada de 1960. Ratings calibrados por contexto competitivo, aparicion de Iribar/Rojo/Uriarte y fortaleza copera 1968/69; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Iribar",
				season: "1964/65",
				positions: ["POR"],
				overall: 84,
				sourceRefs: ["athletic-official-1964-65-squad"],
				dataConfidence: .76,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Carmelo",
				season: "1964/65",
				positions: ["POR"],
				overall: 76,
				sourceRefs: ["athletic-official-1964-65-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Garay",
				season: "1964/65",
				positions: ["DFC"],
				overall: 81,
				sourceRefs: ["athletic-official-1964-65-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["DFC-C", "DFC-I"]
			}),
			makePlayer({
				name: "Orue",
				season: "1964/65",
				positions: ["LD"],
				overall: 78,
				sourceRefs: ["athletic-official-1964-65-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["LD"]
			}),
			makePlayer({
				name: "Larrauri",
				season: "1964/65",
				positions: ["LI", "DFC"],
				overall: 76,
				sourceRefs: ["athletic-official-1964-65-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Echeberria",
				season: "1964/65",
				positions: ["DFC"],
				overall: 78,
				sourceRefs: ["athletic-official-1964-65-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Mauri",
				season: "1964/65",
				positions: ["MC", "MCD"],
				overall: 77,
				sourceRefs: ["athletic-official-1964-65-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Maguregi",
				season: "1964/65",
				positions: ["MC", "MCD"],
				overall: 78,
				sourceRefs: ["athletic-official-1964-65-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Etura",
				season: "1964/65",
				positions: ["MC", "MCD"],
				overall: 77,
				sourceRefs: ["athletic-official-1964-65-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Clemente",
				season: "1964/65",
				positions: ["MC", "MCD"],
				overall: 76,
				sourceRefs: ["athletic-official-1964-65-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Artetxe",
				season: "1964/65",
				positions: [
					"ED",
					"MD",
					"DC"
				],
				overall: 78,
				sourceRefs: ["athletic-official-1964-65-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: [
					"ED",
					"MD",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Arieta",
				season: "1964/65",
				positions: ["DC"],
				overall: 79,
				sourceRefs: ["athletic-official-1964-65-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Arieta II",
				season: "1964/65",
				positions: ["SD", "DC"],
				overall: 81,
				sourceRefs: ["athletic-official-1964-65-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Uriarte",
				season: "1964/65",
				positions: ["DC", "SD"],
				overall: 80,
				sourceRefs: ["athletic-official-1964-65-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Rojo I",
				season: "1964/65",
				positions: ["EI", "MI"],
				overall: 77,
				sourceRefs: ["athletic-official-1964-65-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["EI", "MI"]
			})
		]
	},
	{
		season: "1965/66",
		coach: makeCoach({
			name: "Antonio Barrios",
			coachId: "antonio_barrios",
			season: "1965/66",
			overall: 80,
			skills: {
				attack: 81,
				defense: 80,
				management: 80,
				mentality: 82,
				cup: 81,
				europe: 60
			},
			sourceRefs: ["athletic-official-1965-66-squad", "manual-athletic-1960s-coach-context"],
			dataConfidence: .64,
			notes: "Base jugable de la decada de 1960. Ratings calibrados por contexto competitivo, aparicion de Iribar/Rojo/Uriarte y fortaleza copera 1968/69; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Iribar",
				season: "1965/66",
				positions: ["POR"],
				overall: 85,
				sourceRefs: ["athletic-official-1965-66-squad"],
				dataConfidence: .78,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Junquera",
				season: "1965/66",
				positions: ["POR"],
				overall: 72,
				sourceRefs: ["athletic-official-1965-66-squad"],
				dataConfidence: .5,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Echeberria",
				season: "1965/66",
				positions: ["DFC"],
				overall: 79,
				sourceRefs: ["athletic-official-1965-66-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Orue",
				season: "1965/66",
				positions: ["LD"],
				overall: 77,
				sourceRefs: ["athletic-official-1965-66-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["LD"]
			}),
			makePlayer({
				name: "Larrauri",
				season: "1965/66",
				positions: ["LI", "DFC"],
				overall: 76,
				sourceRefs: ["athletic-official-1965-66-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Argoitia",
				season: "1965/66",
				positions: ["DFC", "LI"],
				overall: 76,
				sourceRefs: ["athletic-official-1965-66-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["DFC-I", "LI"]
			}),
			makePlayer({
				name: "Maguregi",
				season: "1965/66",
				positions: ["MC", "MCD"],
				overall: 78,
				sourceRefs: ["athletic-official-1965-66-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Etura",
				season: "1965/66",
				positions: ["MC", "MCD"],
				overall: 77,
				sourceRefs: ["athletic-official-1965-66-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Clemente",
				season: "1965/66",
				positions: ["MC", "MCD"],
				overall: 78,
				sourceRefs: ["athletic-official-1965-66-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Betzuen",
				season: "1965/66",
				positions: ["MC", "MP"],
				overall: 76,
				sourceRefs: ["athletic-official-1965-66-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Artetxe",
				season: "1965/66",
				positions: [
					"ED",
					"MD",
					"DC"
				],
				overall: 78,
				sourceRefs: ["athletic-official-1965-66-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: [
					"ED",
					"MD",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Arieta II",
				season: "1965/66",
				positions: ["SD", "DC"],
				overall: 82,
				sourceRefs: ["athletic-official-1965-66-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Uriarte",
				season: "1965/66",
				positions: ["DC", "SD"],
				overall: 82,
				sourceRefs: ["athletic-official-1965-66-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Rojo I",
				season: "1965/66",
				positions: ["EI", "MI"],
				overall: 79,
				sourceRefs: ["athletic-official-1965-66-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Arrieta",
				season: "1965/66",
				positions: ["MD", "ED"],
				overall: 76,
				sourceRefs: ["athletic-official-1965-66-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["MD", "ED"]
			})
		]
	},
	{
		season: "1966/67",
		coach: makeCoach({
			name: "Agustin Gainza",
			coachId: "agustin_gainza",
			season: "1966/67",
			overall: 81,
			skills: {
				attack: 82,
				defense: 81,
				management: 81,
				mentality: 84,
				cup: 83,
				europe: 60
			},
			sourceRefs: ["athletic-official-1966-67-squad", "manual-athletic-1960s-coach-context"],
			dataConfidence: .66,
			notes: "Base jugable de la decada de 1960. Ratings calibrados por contexto competitivo, aparicion de Iribar/Rojo/Uriarte y fortaleza copera 1968/69; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Iribar",
				season: "1966/67",
				positions: ["POR"],
				overall: 86,
				sourceRefs: ["athletic-official-1966-67-squad"],
				dataConfidence: .8,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Junquera",
				season: "1966/67",
				positions: ["POR"],
				overall: 72,
				sourceRefs: ["athletic-official-1966-67-squad"],
				dataConfidence: .5,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Echeberria",
				season: "1966/67",
				positions: ["DFC"],
				overall: 80,
				sourceRefs: ["athletic-official-1966-67-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Orue",
				season: "1966/67",
				positions: ["LD"],
				overall: 77,
				sourceRefs: ["athletic-official-1966-67-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["LD"]
			}),
			makePlayer({
				name: "Larrauri",
				season: "1966/67",
				positions: ["LI", "DFC"],
				overall: 76,
				sourceRefs: ["athletic-official-1966-67-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Argoitia",
				season: "1966/67",
				positions: ["DFC", "LI"],
				overall: 77,
				sourceRefs: ["athletic-official-1966-67-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["DFC-I", "LI"]
			}),
			makePlayer({
				name: "Maguregi",
				season: "1966/67",
				positions: ["MC", "MCD"],
				overall: 78,
				sourceRefs: ["athletic-official-1966-67-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Clemente",
				season: "1966/67",
				positions: ["MC", "MCD"],
				overall: 80,
				sourceRefs: ["athletic-official-1966-67-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Betzuen",
				season: "1966/67",
				positions: ["MC", "MP"],
				overall: 77,
				sourceRefs: ["athletic-official-1966-67-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Igartua",
				season: "1966/67",
				positions: ["MC", "MCD"],
				overall: 76,
				sourceRefs: ["athletic-official-1966-67-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Artetxe",
				season: "1966/67",
				positions: [
					"ED",
					"MD",
					"DC"
				],
				overall: 77,
				sourceRefs: ["athletic-official-1966-67-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: [
					"ED",
					"MD",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Arieta II",
				season: "1966/67",
				positions: ["SD", "DC"],
				overall: 82,
				sourceRefs: ["athletic-official-1966-67-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Uriarte",
				season: "1966/67",
				positions: ["DC", "SD"],
				overall: 83,
				sourceRefs: ["athletic-official-1966-67-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Rojo I",
				season: "1966/67",
				positions: ["EI", "MI"],
				overall: 81,
				sourceRefs: ["athletic-official-1966-67-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Arrieta",
				season: "1966/67",
				positions: ["MD", "ED"],
				overall: 77,
				sourceRefs: ["athletic-official-1966-67-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["MD", "ED"]
			})
		]
	},
	{
		season: "1967/68",
		coach: makeCoach({
			name: "Agustin Gainza",
			coachId: "agustin_gainza",
			season: "1967/68",
			overall: 82,
			skills: {
				attack: 83,
				defense: 82,
				management: 82,
				mentality: 85,
				cup: 84,
				europe: 62
			},
			sourceRefs: ["athletic-official-1967-68-squad", "manual-athletic-1960s-coach-context"],
			dataConfidence: .68,
			notes: "Base jugable de la decada de 1960. Ratings calibrados por contexto competitivo, aparicion de Iribar/Rojo/Uriarte y fortaleza copera 1968/69; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Iribar",
				season: "1967/68",
				positions: ["POR"],
				overall: 87,
				sourceRefs: ["athletic-official-1967-68-squad"],
				dataConfidence: .82,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Junquera",
				season: "1967/68",
				positions: ["POR"],
				overall: 72,
				sourceRefs: ["athletic-official-1967-68-squad"],
				dataConfidence: .5,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Echeberria",
				season: "1967/68",
				positions: ["DFC"],
				overall: 81,
				sourceRefs: ["athletic-official-1967-68-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Orue",
				season: "1967/68",
				positions: ["LD"],
				overall: 77,
				sourceRefs: ["athletic-official-1967-68-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["LD"]
			}),
			makePlayer({
				name: "Argoitia",
				season: "1967/68",
				positions: ["DFC", "LI"],
				overall: 78,
				sourceRefs: ["athletic-official-1967-68-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["DFC-I", "LI"]
			}),
			makePlayer({
				name: "Larrauri",
				season: "1967/68",
				positions: ["LI", "DFC"],
				overall: 76,
				sourceRefs: ["athletic-official-1967-68-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Clemente",
				season: "1967/68",
				positions: ["MC", "MCD"],
				overall: 81,
				sourceRefs: ["athletic-official-1967-68-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Maguregi",
				season: "1967/68",
				positions: ["MC", "MCD"],
				overall: 77,
				sourceRefs: ["athletic-official-1967-68-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Betzuen",
				season: "1967/68",
				positions: ["MC", "MP"],
				overall: 78,
				sourceRefs: ["athletic-official-1967-68-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Igartua",
				season: "1967/68",
				positions: ["MC", "MCD"],
				overall: 77,
				sourceRefs: ["athletic-official-1967-68-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Arieta II",
				season: "1967/68",
				positions: ["SD", "DC"],
				overall: 82,
				sourceRefs: ["athletic-official-1967-68-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Uriarte",
				season: "1967/68",
				positions: ["DC", "SD"],
				overall: 84,
				sourceRefs: ["athletic-official-1967-68-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Rojo I",
				season: "1967/68",
				positions: ["EI", "MI"],
				overall: 82,
				sourceRefs: ["athletic-official-1967-68-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Arrieta",
				season: "1967/68",
				positions: ["MD", "ED"],
				overall: 78,
				sourceRefs: ["athletic-official-1967-68-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MD", "ED"]
			}),
			makePlayer({
				name: "Estefano",
				season: "1967/68",
				positions: ["ED", "MD"],
				overall: 76,
				sourceRefs: ["athletic-official-1967-68-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["ED", "MD"]
			})
		]
	},
	{
		season: "1968/69",
		coach: makeCoach({
			name: "Ronnie Allen",
			coachId: "ronnie_allen",
			season: "1968/69",
			overall: 85,
			skills: {
				attack: 85,
				defense: 85,
				management: 85,
				mentality: 87,
				cup: 90,
				europe: 65
			},
			sourceRefs: ["athletic-official-1968-69-squad", "manual-athletic-1960s-coach-context"],
			dataConfidence: .76,
			notes: "Base jugable de la decada de 1960. Ratings calibrados por contexto competitivo, aparicion de Iribar/Rojo/Uriarte y fortaleza copera 1968/69; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Iribar",
				season: "1968/69",
				positions: ["POR"],
				overall: 89,
				sourceRefs: ["athletic-official-1968-69-squad"],
				dataConfidence: .86,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Junquera",
				season: "1968/69",
				positions: ["POR"],
				overall: 73,
				sourceRefs: ["athletic-official-1968-69-squad"],
				dataConfidence: .5,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Echeberria",
				season: "1968/69",
				positions: ["DFC"],
				overall: 83,
				sourceRefs: ["athletic-official-1968-69-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Saez",
				season: "1968/69",
				positions: ["LD", "DFC"],
				overall: 80,
				sourceRefs: ["athletic-official-1968-69-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["LD", "DFC-D"]
			}),
			makePlayer({
				name: "Argoitia",
				season: "1968/69",
				positions: ["DFC", "LI"],
				overall: 79,
				sourceRefs: ["athletic-official-1968-69-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["DFC-I", "LI"]
			}),
			makePlayer({
				name: "Larrauri",
				season: "1968/69",
				positions: ["LI", "DFC"],
				overall: 77,
				sourceRefs: ["athletic-official-1968-69-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Clemente",
				season: "1968/69",
				positions: ["MC", "MCD"],
				overall: 83,
				sourceRefs: ["athletic-official-1968-69-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Betzuen",
				season: "1968/69",
				positions: ["MC", "MP"],
				overall: 80,
				sourceRefs: ["athletic-official-1968-69-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Igartua",
				season: "1968/69",
				positions: ["MC", "MCD"],
				overall: 79,
				sourceRefs: ["athletic-official-1968-69-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Guisasola",
				season: "1968/69",
				positions: ["MC", "MCD"],
				overall: 78,
				sourceRefs: ["athletic-official-1968-69-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Uriarte",
				season: "1968/69",
				positions: ["DC", "SD"],
				overall: 86,
				sourceRefs: ["athletic-official-1968-69-squad"],
				dataConfidence: .78,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Arieta II",
				season: "1968/69",
				positions: ["SD", "DC"],
				overall: 82,
				sourceRefs: ["athletic-official-1968-69-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Rojo I",
				season: "1968/69",
				positions: ["EI", "MI"],
				overall: 84,
				sourceRefs: ["athletic-official-1968-69-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Arrieta",
				season: "1968/69",
				positions: ["MD", "ED"],
				overall: 80,
				sourceRefs: ["athletic-official-1968-69-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["MD", "ED"]
			}),
			makePlayer({
				name: "Estefano",
				season: "1968/69",
				positions: ["ED", "MD"],
				overall: 78,
				sourceRefs: ["athletic-official-1968-69-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["ED", "MD"]
			})
		]
	},
	{
		season: "1969/70",
		coach: makeCoach({
			name: "Ronnie Allen",
			coachId: "ronnie_allen",
			season: "1969/70",
			overall: 83,
			skills: {
				attack: 83,
				defense: 84,
				management: 83,
				mentality: 85,
				cup: 84,
				europe: 64
			},
			sourceRefs: ["athletic-official-1969-70-squad", "manual-athletic-1960s-coach-context"],
			dataConfidence: .7,
			notes: "Base jugable de la decada de 1960. Ratings calibrados por contexto competitivo, aparicion de Iribar/Rojo/Uriarte y fortaleza copera 1968/69; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Iribar",
				season: "1969/70",
				positions: ["POR"],
				overall: 89,
				sourceRefs: ["athletic-official-1969-70-squad"],
				dataConfidence: .86,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Junquera",
				season: "1969/70",
				positions: ["POR"],
				overall: 73,
				sourceRefs: ["athletic-official-1969-70-squad"],
				dataConfidence: .5,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Echeberria",
				season: "1969/70",
				positions: ["DFC"],
				overall: 82,
				sourceRefs: ["athletic-official-1969-70-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Saez",
				season: "1969/70",
				positions: ["LD", "DFC"],
				overall: 81,
				sourceRefs: ["athletic-official-1969-70-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["LD", "DFC-D"]
			}),
			makePlayer({
				name: "Argoitia",
				season: "1969/70",
				positions: ["DFC", "LI"],
				overall: 79,
				sourceRefs: ["athletic-official-1969-70-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["DFC-I", "LI"]
			}),
			makePlayer({
				name: "Larrauri",
				season: "1969/70",
				positions: ["LI", "DFC"],
				overall: 77,
				sourceRefs: ["athletic-official-1969-70-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Clemente",
				season: "1969/70",
				positions: ["MC", "MCD"],
				overall: 82,
				sourceRefs: ["athletic-official-1969-70-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Betzuen",
				season: "1969/70",
				positions: ["MC", "MP"],
				overall: 79,
				sourceRefs: ["athletic-official-1969-70-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Igartua",
				season: "1969/70",
				positions: ["MC", "MCD"],
				overall: 79,
				sourceRefs: ["athletic-official-1969-70-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Guisasola",
				season: "1969/70",
				positions: ["MC", "MCD"],
				overall: 79,
				sourceRefs: ["athletic-official-1969-70-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Uriarte",
				season: "1969/70",
				positions: ["DC", "SD"],
				overall: 85,
				sourceRefs: ["athletic-official-1969-70-squad"],
				dataConfidence: .76,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Arieta II",
				season: "1969/70",
				positions: ["SD", "DC"],
				overall: 81,
				sourceRefs: ["athletic-official-1969-70-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Rojo I",
				season: "1969/70",
				positions: ["EI", "MI"],
				overall: 84,
				sourceRefs: ["athletic-official-1969-70-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Arrieta",
				season: "1969/70",
				positions: ["MD", "ED"],
				overall: 79,
				sourceRefs: ["athletic-official-1969-70-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MD", "ED"]
			}),
			makePlayer({
				name: "Estefano",
				season: "1969/70",
				positions: ["ED", "MD"],
				overall: 78,
				sourceRefs: ["athletic-official-1969-70-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["ED", "MD"]
			})
		]
	},
	{
		season: "1970/71",
		coach: makeCoach({
			name: "Ronnie Allen",
			coachId: "ronnie_allen",
			season: "1970/71",
			overall: 82,
			skills: {
				attack: 82,
				defense: 83,
				management: 82,
				mentality: 84,
				cup: 82,
				europe: 62
			},
			sourceRefs: ["athletic-official-1970-71-squad", "manual-athletic-1970s-coach-context"],
			dataConfidence: .68,
			notes: "Base jugable de la decada de 1970. Ratings calibrados por contexto competitivo, Copa 1972/73, final UEFA 1976/77 y transicion hacia el bloque de los 80; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Iribar",
				season: "1970/71",
				positions: ["POR"],
				overall: 89,
				sourceRefs: ["athletic-official-1970-71-squad"],
				dataConfidence: .86,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Junquera",
				season: "1970/71",
				positions: ["POR"],
				overall: 73,
				sourceRefs: ["athletic-official-1970-71-squad"],
				dataConfidence: .5,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Saez",
				season: "1970/71",
				positions: ["LD", "DFC"],
				overall: 81,
				sourceRefs: ["athletic-official-1970-71-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["LD", "DFC-D"]
			}),
			makePlayer({
				name: "Echeberria",
				season: "1970/71",
				positions: ["DFC"],
				overall: 82,
				sourceRefs: ["athletic-official-1970-71-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Larrauri",
				season: "1970/71",
				positions: ["LI", "DFC"],
				overall: 77,
				sourceRefs: ["athletic-official-1970-71-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Argoitia",
				season: "1970/71",
				positions: ["DFC", "LI"],
				overall: 79,
				sourceRefs: ["athletic-official-1970-71-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["DFC-I", "LI"]
			}),
			makePlayer({
				name: "Clemente",
				season: "1970/71",
				positions: ["MC", "MCD"],
				overall: 81,
				sourceRefs: ["athletic-official-1970-71-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Guisasola",
				season: "1970/71",
				positions: ["MC", "MCD"],
				overall: 80,
				sourceRefs: ["athletic-official-1970-71-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Betzuen",
				season: "1970/71",
				positions: ["MC", "MP"],
				overall: 79,
				sourceRefs: ["athletic-official-1970-71-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Igartua",
				season: "1970/71",
				positions: ["MC", "MCD"],
				overall: 78,
				sourceRefs: ["athletic-official-1970-71-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Uriarte",
				season: "1970/71",
				positions: ["DC", "SD"],
				overall: 84,
				sourceRefs: ["athletic-official-1970-71-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Arieta II",
				season: "1970/71",
				positions: ["SD", "DC"],
				overall: 80,
				sourceRefs: ["athletic-official-1970-71-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Rojo I",
				season: "1970/71",
				positions: ["EI", "MI"],
				overall: 84,
				sourceRefs: ["athletic-official-1970-71-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Arrieta",
				season: "1970/71",
				positions: ["MD", "ED"],
				overall: 78,
				sourceRefs: ["athletic-official-1970-71-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MD", "ED"]
			}),
			makePlayer({
				name: "Estefano",
				season: "1970/71",
				positions: ["ED", "MD"],
				overall: 77,
				sourceRefs: ["athletic-official-1970-71-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["ED", "MD"]
			})
		]
	},
	{
		season: "1971/72",
		coach: makeCoach({
			name: "Ronnie Allen",
			coachId: "ronnie_allen",
			season: "1971/72",
			overall: 82,
			skills: {
				attack: 82,
				defense: 83,
				management: 82,
				mentality: 84,
				cup: 83,
				europe: 62
			},
			sourceRefs: ["athletic-official-1971-72-squad", "manual-athletic-1970s-coach-context"],
			dataConfidence: .68,
			notes: "Base jugable de la decada de 1970. Ratings calibrados por contexto competitivo, Copa 1972/73, final UEFA 1976/77 y transicion hacia el bloque de los 80; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Iribar",
				season: "1971/72",
				positions: ["POR"],
				overall: 89,
				sourceRefs: ["athletic-official-1971-72-squad"],
				dataConfidence: .86,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Junquera",
				season: "1971/72",
				positions: ["POR"],
				overall: 73,
				sourceRefs: ["athletic-official-1971-72-squad"],
				dataConfidence: .5,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Saez",
				season: "1971/72",
				positions: ["LD", "DFC"],
				overall: 82,
				sourceRefs: ["athletic-official-1971-72-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["LD", "DFC-D"]
			}),
			makePlayer({
				name: "Echeberria",
				season: "1971/72",
				positions: ["DFC"],
				overall: 82,
				sourceRefs: ["athletic-official-1971-72-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Larrauri",
				season: "1971/72",
				positions: ["LI", "DFC"],
				overall: 77,
				sourceRefs: ["athletic-official-1971-72-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Zabalza",
				season: "1971/72",
				positions: ["DFC", "LI"],
				overall: 78,
				sourceRefs: ["athletic-official-1971-72-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["DFC-I", "LI"]
			}),
			makePlayer({
				name: "Clemente",
				season: "1971/72",
				positions: ["MC", "MCD"],
				overall: 80,
				sourceRefs: ["athletic-official-1971-72-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Guisasola",
				season: "1971/72",
				positions: ["MC", "MCD"],
				overall: 81,
				sourceRefs: ["athletic-official-1971-72-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Betzuen",
				season: "1971/72",
				positions: ["MC", "MP"],
				overall: 78,
				sourceRefs: ["athletic-official-1971-72-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Igartua",
				season: "1971/72",
				positions: ["MC", "MCD"],
				overall: 78,
				sourceRefs: ["athletic-official-1971-72-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Uriarte",
				season: "1971/72",
				positions: ["DC", "SD"],
				overall: 84,
				sourceRefs: ["athletic-official-1971-72-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Rojo I",
				season: "1971/72",
				positions: ["EI", "MI"],
				overall: 85,
				sourceRefs: ["athletic-official-1971-72-squad"],
				dataConfidence: .76,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Arieta II",
				season: "1971/72",
				positions: ["SD", "DC"],
				overall: 79,
				sourceRefs: ["athletic-official-1971-72-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Arrieta",
				season: "1971/72",
				positions: ["MD", "ED"],
				overall: 78,
				sourceRefs: ["athletic-official-1971-72-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MD", "ED"]
			}),
			makePlayer({
				name: "Lasa",
				season: "1971/72",
				positions: ["ED", "MD"],
				overall: 77,
				sourceRefs: ["athletic-official-1971-72-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["ED", "MD"]
			})
		]
	},
	{
		season: "1972/73",
		coach: makeCoach({
			name: "Miljan Miljanic",
			coachId: "miljan_miljanic",
			season: "1972/73",
			overall: 84,
			skills: {
				attack: 84,
				defense: 84,
				management: 85,
				mentality: 86,
				cup: 88,
				europe: 65
			},
			sourceRefs: ["athletic-official-1972-73-squad", "manual-athletic-1970s-coach-context"],
			dataConfidence: .74,
			notes: "Base jugable de la decada de 1970. Ratings calibrados por contexto competitivo, Copa 1972/73, final UEFA 1976/77 y transicion hacia el bloque de los 80; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Iribar",
				season: "1972/73",
				positions: ["POR"],
				overall: 90,
				sourceRefs: ["athletic-official-1972-73-squad"],
				dataConfidence: .88,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Junquera",
				season: "1972/73",
				positions: ["POR"],
				overall: 73,
				sourceRefs: ["athletic-official-1972-73-squad"],
				dataConfidence: .5,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Saez",
				season: "1972/73",
				positions: ["LD", "DFC"],
				overall: 83,
				sourceRefs: ["athletic-official-1972-73-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["LD", "DFC-D"]
			}),
			makePlayer({
				name: "Echeberria",
				season: "1972/73",
				positions: ["DFC"],
				overall: 83,
				sourceRefs: ["athletic-official-1972-73-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Zabalza",
				season: "1972/73",
				positions: ["DFC", "LI"],
				overall: 80,
				sourceRefs: ["athletic-official-1972-73-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["DFC-I", "LI"]
			}),
			makePlayer({
				name: "Larrauri",
				season: "1972/73",
				positions: ["LI", "DFC"],
				overall: 78,
				sourceRefs: ["athletic-official-1972-73-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Clemente",
				season: "1972/73",
				positions: ["MC", "MCD"],
				overall: 81,
				sourceRefs: ["athletic-official-1972-73-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Guisasola",
				season: "1972/73",
				positions: ["MC", "MCD"],
				overall: 82,
				sourceRefs: ["athletic-official-1972-73-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Betzuen",
				season: "1972/73",
				positions: ["MC", "MP"],
				overall: 79,
				sourceRefs: ["athletic-official-1972-73-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Igartua",
				season: "1972/73",
				positions: ["MC", "MCD"],
				overall: 79,
				sourceRefs: ["athletic-official-1972-73-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Uriarte",
				season: "1972/73",
				positions: ["DC", "SD"],
				overall: 85,
				sourceRefs: ["athletic-official-1972-73-squad"],
				dataConfidence: .76,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Rojo I",
				season: "1972/73",
				positions: ["EI", "MI"],
				overall: 86,
				sourceRefs: ["athletic-official-1972-73-squad"],
				dataConfidence: .78,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Lasa",
				season: "1972/73",
				positions: ["ED", "MD"],
				overall: 80,
				sourceRefs: ["athletic-official-1972-73-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["ED", "MD"]
			}),
			makePlayer({
				name: "Arieta II",
				season: "1972/73",
				positions: ["SD", "DC"],
				overall: 79,
				sourceRefs: ["athletic-official-1972-73-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Carlos",
				season: "1972/73",
				positions: ["DC", "SD"],
				overall: 78,
				sourceRefs: ["athletic-official-1972-73-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["DC", "SD"]
			})
		]
	},
	{
		season: "1973/74",
		coach: makeCoach({
			name: "Miljan Miljanic",
			coachId: "miljan_miljanic",
			season: "1973/74",
			overall: 82,
			skills: {
				attack: 82,
				defense: 83,
				management: 84,
				mentality: 84,
				cup: 83,
				europe: 64
			},
			sourceRefs: ["athletic-official-1973-74-squad", "manual-athletic-1970s-coach-context"],
			dataConfidence: .7,
			notes: "Base jugable de la decada de 1970. Ratings calibrados por contexto competitivo, Copa 1972/73, final UEFA 1976/77 y transicion hacia el bloque de los 80; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Iribar",
				season: "1973/74",
				positions: ["POR"],
				overall: 89,
				sourceRefs: ["athletic-official-1973-74-squad"],
				dataConfidence: .86,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Junquera",
				season: "1973/74",
				positions: ["POR"],
				overall: 73,
				sourceRefs: ["athletic-official-1973-74-squad"],
				dataConfidence: .5,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Saez",
				season: "1973/74",
				positions: ["LD", "DFC"],
				overall: 82,
				sourceRefs: ["athletic-official-1973-74-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["LD", "DFC-D"]
			}),
			makePlayer({
				name: "Echeberria",
				season: "1973/74",
				positions: ["DFC"],
				overall: 82,
				sourceRefs: ["athletic-official-1973-74-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Zabalza",
				season: "1973/74",
				positions: ["DFC", "LI"],
				overall: 80,
				sourceRefs: ["athletic-official-1973-74-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["DFC-I", "LI"]
			}),
			makePlayer({
				name: "Larrauri",
				season: "1973/74",
				positions: ["LI", "DFC"],
				overall: 77,
				sourceRefs: ["athletic-official-1973-74-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Guisasola",
				season: "1973/74",
				positions: ["MC", "MCD"],
				overall: 82,
				sourceRefs: ["athletic-official-1973-74-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Betzuen",
				season: "1973/74",
				positions: ["MC", "MP"],
				overall: 79,
				sourceRefs: ["athletic-official-1973-74-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Igartua",
				season: "1973/74",
				positions: ["MC", "MCD"],
				overall: 79,
				sourceRefs: ["athletic-official-1973-74-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Villar",
				season: "1973/74",
				positions: ["MC", "MCD"],
				overall: 77,
				sourceRefs: ["athletic-official-1973-74-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Uriarte",
				season: "1973/74",
				positions: ["DC", "SD"],
				overall: 84,
				sourceRefs: ["athletic-official-1973-74-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Rojo I",
				season: "1973/74",
				positions: ["EI", "MI"],
				overall: 85,
				sourceRefs: ["athletic-official-1973-74-squad"],
				dataConfidence: .76,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Lasa",
				season: "1973/74",
				positions: ["ED", "MD"],
				overall: 80,
				sourceRefs: ["athletic-official-1973-74-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["ED", "MD"]
			}),
			makePlayer({
				name: "Carlos",
				season: "1973/74",
				positions: ["DC", "SD"],
				overall: 79,
				sourceRefs: ["athletic-official-1973-74-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Arieta II",
				season: "1973/74",
				positions: ["SD", "DC"],
				overall: 78,
				sourceRefs: ["athletic-official-1973-74-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["SD", "DC"]
			})
		]
	},
	{
		season: "1974/75",
		coach: makeCoach({
			name: "Rafael Iriondo",
			coachId: "rafael_iriondo",
			season: "1974/75",
			overall: 81,
			skills: {
				attack: 82,
				defense: 81,
				management: 81,
				mentality: 83,
				cup: 82,
				europe: 60
			},
			sourceRefs: ["athletic-official-1974-75-squad", "manual-athletic-1970s-coach-context"],
			dataConfidence: .66,
			notes: "Base jugable de la decada de 1970. Ratings calibrados por contexto competitivo, Copa 1972/73, final UEFA 1976/77 y transicion hacia el bloque de los 80; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Iribar",
				season: "1974/75",
				positions: ["POR"],
				overall: 88,
				sourceRefs: ["athletic-official-1974-75-squad"],
				dataConfidence: .84,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Junquera",
				season: "1974/75",
				positions: ["POR"],
				overall: 73,
				sourceRefs: ["athletic-official-1974-75-squad"],
				dataConfidence: .5,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Saez",
				season: "1974/75",
				positions: ["LD", "DFC"],
				overall: 81,
				sourceRefs: ["athletic-official-1974-75-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["LD", "DFC-D"]
			}),
			makePlayer({
				name: "Echeberria",
				season: "1974/75",
				positions: ["DFC"],
				overall: 81,
				sourceRefs: ["athletic-official-1974-75-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Zabalza",
				season: "1974/75",
				positions: ["DFC", "LI"],
				overall: 80,
				sourceRefs: ["athletic-official-1974-75-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["DFC-I", "LI"]
			}),
			makePlayer({
				name: "Larrauri",
				season: "1974/75",
				positions: ["LI", "DFC"],
				overall: 76,
				sourceRefs: ["athletic-official-1974-75-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Guisasola",
				season: "1974/75",
				positions: ["MC", "MCD"],
				overall: 81,
				sourceRefs: ["athletic-official-1974-75-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Villar",
				season: "1974/75",
				positions: ["MC", "MCD"],
				overall: 78,
				sourceRefs: ["athletic-official-1974-75-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Betzuen",
				season: "1974/75",
				positions: ["MC", "MP"],
				overall: 78,
				sourceRefs: ["athletic-official-1974-75-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Dani",
				season: "1974/75",
				positions: ["SD", "DC"],
				overall: 78,
				sourceRefs: ["athletic-official-1974-75-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Rojo I",
				season: "1974/75",
				positions: ["EI", "MI"],
				overall: 84,
				sourceRefs: ["athletic-official-1974-75-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Uriarte",
				season: "1974/75",
				positions: ["DC", "SD"],
				overall: 82,
				sourceRefs: ["athletic-official-1974-75-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Lasa",
				season: "1974/75",
				positions: ["ED", "MD"],
				overall: 79,
				sourceRefs: ["athletic-official-1974-75-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["ED", "MD"]
			}),
			makePlayer({
				name: "Carlos",
				season: "1974/75",
				positions: ["DC", "SD"],
				overall: 80,
				sourceRefs: ["athletic-official-1974-75-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Churruca",
				season: "1974/75",
				positions: ["ED", "MD"],
				overall: 76,
				sourceRefs: ["athletic-official-1974-75-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["ED", "MD"]
			})
		]
	},
	{
		season: "1975/76",
		coach: makeCoach({
			name: "Rafael Iriondo",
			coachId: "rafael_iriondo",
			season: "1975/76",
			overall: 82,
			skills: {
				attack: 83,
				defense: 82,
				management: 82,
				mentality: 84,
				cup: 83,
				europe: 62
			},
			sourceRefs: ["athletic-official-1975-76-squad", "manual-athletic-1970s-coach-context"],
			dataConfidence: .68,
			notes: "Base jugable de la decada de 1970. Ratings calibrados por contexto competitivo, Copa 1972/73, final UEFA 1976/77 y transicion hacia el bloque de los 80; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Iribar",
				season: "1975/76",
				positions: ["POR"],
				overall: 88,
				sourceRefs: ["athletic-official-1975-76-squad"],
				dataConfidence: .84,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Junquera",
				season: "1975/76",
				positions: ["POR"],
				overall: 73,
				sourceRefs: ["athletic-official-1975-76-squad"],
				dataConfidence: .5,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Alexanko",
				season: "1975/76",
				positions: ["DFC"],
				overall: 78,
				sourceRefs: ["athletic-official-1975-76-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Saez",
				season: "1975/76",
				positions: ["LD", "DFC"],
				overall: 80,
				sourceRefs: ["athletic-official-1975-76-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["LD", "DFC-D"]
			}),
			makePlayer({
				name: "Zabalza",
				season: "1975/76",
				positions: ["DFC", "LI"],
				overall: 79,
				sourceRefs: ["athletic-official-1975-76-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["DFC-I", "LI"]
			}),
			makePlayer({
				name: "Escalza",
				season: "1975/76",
				positions: ["LI", "DFC"],
				overall: 77,
				sourceRefs: ["athletic-official-1975-76-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Guisasola",
				season: "1975/76",
				positions: ["MC", "MCD"],
				overall: 81,
				sourceRefs: ["athletic-official-1975-76-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Villar",
				season: "1975/76",
				positions: ["MC", "MCD"],
				overall: 79,
				sourceRefs: ["athletic-official-1975-76-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Irureta",
				season: "1975/76",
				positions: ["MC", "MP"],
				overall: 78,
				sourceRefs: ["athletic-official-1975-76-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Dani",
				season: "1975/76",
				positions: ["SD", "DC"],
				overall: 80,
				sourceRefs: ["athletic-official-1975-76-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Rojo I",
				season: "1975/76",
				positions: ["EI", "MI"],
				overall: 83,
				sourceRefs: ["athletic-official-1975-76-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Carlos",
				season: "1975/76",
				positions: ["DC", "SD"],
				overall: 81,
				sourceRefs: ["athletic-official-1975-76-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Lasa",
				season: "1975/76",
				positions: ["ED", "MD"],
				overall: 78,
				sourceRefs: ["athletic-official-1975-76-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["ED", "MD"]
			}),
			makePlayer({
				name: "Churruca",
				season: "1975/76",
				positions: ["ED", "MD"],
				overall: 77,
				sourceRefs: ["athletic-official-1975-76-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["ED", "MD"]
			}),
			makePlayer({
				name: "Amorrortu",
				season: "1975/76",
				positions: [
					"EI",
					"MI",
					"SD"
				],
				overall: 76,
				sourceRefs: ["athletic-official-1975-76-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: [
					"EI",
					"MI",
					"SD"
				]
			})
		]
	},
	{
		season: "1977/78",
		coach: makeCoach({
			name: "Koldo Aguirre",
			coachId: "koldo_aguirre",
			season: "1977/78",
			overall: 83,
			skills: {
				attack: 84,
				defense: 83,
				management: 83,
				mentality: 85,
				cup: 83,
				europe: 72
			},
			sourceRefs: ["athletic-official-1977-78-squad", "manual-athletic-1970s-coach-context"],
			dataConfidence: .7,
			notes: "Base jugable de la decada de 1970. Ratings calibrados por contexto competitivo, Copa 1972/73, final UEFA 1976/77 y transicion hacia el bloque de los 80; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Iribar",
				season: "1977/78",
				positions: ["POR"],
				overall: 88,
				sourceRefs: ["athletic-official-1977-78-squad"],
				dataConfidence: .84,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Junquera",
				season: "1977/78",
				positions: ["POR"],
				overall: 73,
				sourceRefs: ["athletic-official-1977-78-squad"],
				dataConfidence: .5,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Alexanko",
				season: "1977/78",
				positions: ["DFC"],
				overall: 84,
				sourceRefs: ["athletic-official-1977-78-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Saez",
				season: "1977/78",
				positions: ["LD", "DFC"],
				overall: 80,
				sourceRefs: ["athletic-official-1977-78-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["LD", "DFC-D"]
			}),
			makePlayer({
				name: "Escalza",
				season: "1977/78",
				positions: ["LI", "DFC"],
				overall: 79,
				sourceRefs: ["athletic-official-1977-78-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Zabalza",
				season: "1977/78",
				positions: ["DFC", "LI"],
				overall: 78,
				sourceRefs: ["athletic-official-1977-78-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["DFC-I", "LI"]
			}),
			makePlayer({
				name: "Guisasola",
				season: "1977/78",
				positions: ["MC", "MCD"],
				overall: 81,
				sourceRefs: ["athletic-official-1977-78-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Villar",
				season: "1977/78",
				positions: ["MC", "MCD"],
				overall: 80,
				sourceRefs: ["athletic-official-1977-78-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Irureta",
				season: "1977/78",
				positions: ["MC", "MP"],
				overall: 81,
				sourceRefs: ["athletic-official-1977-78-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Dani",
				season: "1977/78",
				positions: ["SD", "DC"],
				overall: 84,
				sourceRefs: ["athletic-official-1977-78-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Rojo I",
				season: "1977/78",
				positions: ["EI", "MI"],
				overall: 83,
				sourceRefs: ["athletic-official-1977-78-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Carlos",
				season: "1977/78",
				positions: ["DC", "SD"],
				overall: 81,
				sourceRefs: ["athletic-official-1977-78-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Churruca",
				season: "1977/78",
				positions: ["ED", "MD"],
				overall: 80,
				sourceRefs: ["athletic-official-1977-78-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["ED", "MD"]
			}),
			makePlayer({
				name: "Amorrortu",
				season: "1977/78",
				positions: [
					"EI",
					"MI",
					"SD"
				],
				overall: 79,
				sourceRefs: ["athletic-official-1977-78-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: [
					"EI",
					"MI",
					"SD"
				]
			}),
			makePlayer({
				name: "Goikoetxea",
				season: "1977/78",
				positions: ["DFC", "LD"],
				overall: 76,
				sourceRefs: ["athletic-official-1977-78-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["DFC-D", "LD"]
			})
		]
	},
	{
		season: "1978/79",
		coach: makeCoach({
			name: "Koldo Aguirre",
			coachId: "koldo_aguirre",
			season: "1978/79",
			overall: 81,
			skills: {
				attack: 82,
				defense: 81,
				management: 81,
				mentality: 83,
				cup: 81,
				europe: 65
			},
			sourceRefs: ["athletic-official-1978-79-squad", "manual-athletic-1970s-coach-context"],
			dataConfidence: .66,
			notes: "Base jugable de la decada de 1970. Ratings calibrados por contexto competitivo, Copa 1972/73, final UEFA 1976/77 y transicion hacia el bloque de los 80; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Iribar",
				season: "1978/79",
				positions: ["POR"],
				overall: 87,
				sourceRefs: ["athletic-official-1978-79-squad"],
				dataConfidence: .82,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Cedrun",
				season: "1978/79",
				positions: ["POR"],
				overall: 73,
				sourceRefs: ["athletic-official-1978-79-squad"],
				dataConfidence: .52,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Alexanko",
				season: "1978/79",
				positions: ["DFC"],
				overall: 85,
				sourceRefs: ["athletic-official-1978-79-squad"],
				dataConfidence: .76,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Goikoetxea",
				season: "1978/79",
				positions: ["DFC", "LD"],
				overall: 78,
				sourceRefs: ["athletic-official-1978-79-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["DFC-D", "LD"]
			}),
			makePlayer({
				name: "Escalza",
				season: "1978/79",
				positions: ["LI", "DFC"],
				overall: 78,
				sourceRefs: ["athletic-official-1978-79-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Zabalza",
				season: "1978/79",
				positions: ["DFC", "LI"],
				overall: 77,
				sourceRefs: ["athletic-official-1978-79-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["DFC-I", "LI"]
			}),
			makePlayer({
				name: "Guisasola",
				season: "1978/79",
				positions: ["MC", "MCD"],
				overall: 80,
				sourceRefs: ["athletic-official-1978-79-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Villar",
				season: "1978/79",
				positions: ["MC", "MCD"],
				overall: 80,
				sourceRefs: ["athletic-official-1978-79-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Irureta",
				season: "1978/79",
				positions: ["MC", "MP"],
				overall: 80,
				sourceRefs: ["athletic-official-1978-79-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Dani",
				season: "1978/79",
				positions: ["SD", "DC"],
				overall: 84,
				sourceRefs: ["athletic-official-1978-79-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Rojo I",
				season: "1978/79",
				positions: ["EI", "MI"],
				overall: 82,
				sourceRefs: ["athletic-official-1978-79-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Carlos",
				season: "1978/79",
				positions: ["DC", "SD"],
				overall: 80,
				sourceRefs: ["athletic-official-1978-79-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Churruca",
				season: "1978/79",
				positions: ["ED", "MD"],
				overall: 79,
				sourceRefs: ["athletic-official-1978-79-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["ED", "MD"]
			}),
			makePlayer({
				name: "Amorrortu",
				season: "1978/79",
				positions: [
					"EI",
					"MI",
					"SD"
				],
				overall: 80,
				sourceRefs: ["athletic-official-1978-79-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: [
					"EI",
					"MI",
					"SD"
				]
			}),
			makePlayer({
				name: "Sarabia",
				season: "1978/79",
				positions: ["MP", "SD"],
				overall: 76,
				sourceRefs: ["athletic-official-1978-79-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["MP", "SD"]
			})
		]
	},
	{
		season: "1979/80",
		coach: makeCoach({
			name: "Helmut Senekowitsch",
			coachId: "helmut_senekowitsch",
			season: "1979/80",
			overall: 80,
			skills: {
				attack: 81,
				defense: 80,
				management: 80,
				mentality: 82,
				cup: 80,
				europe: 62
			},
			sourceRefs: ["athletic-official-1979-80-squad", "manual-athletic-1970s-coach-context"],
			dataConfidence: .64,
			notes: "Base jugable de la decada de 1970. Ratings calibrados por contexto competitivo, Copa 1972/73, final UEFA 1976/77 y transicion hacia el bloque de los 80; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Iribar",
				season: "1979/80",
				positions: ["POR"],
				overall: 86,
				sourceRefs: ["athletic-official-1979-80-squad"],
				dataConfidence: .8,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Cedrun",
				season: "1979/80",
				positions: ["POR"],
				overall: 74,
				sourceRefs: ["athletic-official-1979-80-squad"],
				dataConfidence: .54,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Alexanko",
				season: "1979/80",
				positions: ["DFC"],
				overall: 84,
				sourceRefs: ["athletic-official-1979-80-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Goikoetxea",
				season: "1979/80",
				positions: ["DFC", "LD"],
				overall: 80,
				sourceRefs: ["athletic-official-1979-80-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["DFC-D", "LD"]
			}),
			makePlayer({
				name: "Escalza",
				season: "1979/80",
				positions: ["LI", "DFC"],
				overall: 77,
				sourceRefs: ["athletic-official-1979-80-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "De la Fuente",
				season: "1979/80",
				positions: ["LI", "MI"],
				overall: 76,
				sourceRefs: ["athletic-official-1979-80-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["LI", "MI"]
			}),
			makePlayer({
				name: "Guisasola",
				season: "1979/80",
				positions: ["MC", "MCD"],
				overall: 79,
				sourceRefs: ["athletic-official-1979-80-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Villar",
				season: "1979/80",
				positions: ["MC", "MCD"],
				overall: 79,
				sourceRefs: ["athletic-official-1979-80-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Irureta",
				season: "1979/80",
				positions: ["MC", "MP"],
				overall: 79,
				sourceRefs: ["athletic-official-1979-80-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Dani",
				season: "1979/80",
				positions: ["SD", "DC"],
				overall: 83,
				sourceRefs: ["athletic-official-1979-80-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Rojo I",
				season: "1979/80",
				positions: ["EI", "MI"],
				overall: 81,
				sourceRefs: ["athletic-official-1979-80-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Carlos",
				season: "1979/80",
				positions: ["DC", "SD"],
				overall: 79,
				sourceRefs: ["athletic-official-1979-80-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Churruca",
				season: "1979/80",
				positions: ["ED", "MD"],
				overall: 78,
				sourceRefs: ["athletic-official-1979-80-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["ED", "MD"]
			}),
			makePlayer({
				name: "Amorrortu",
				season: "1979/80",
				positions: [
					"EI",
					"MI",
					"SD"
				],
				overall: 80,
				sourceRefs: ["athletic-official-1979-80-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: [
					"EI",
					"MI",
					"SD"
				]
			}),
			makePlayer({
				name: "Sarabia",
				season: "1979/80",
				positions: ["MP", "SD"],
				overall: 78,
				sourceRefs: ["athletic-official-1979-80-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MP", "SD"]
			})
		]
	},
	{
		season: "1980/81",
		coach: makeCoach({
			name: "Iñaki Saez",
			coachId: "inaki_saez",
			season: "1980/81",
			overall: 80,
			skills: {
				attack: 80,
				defense: 80,
				management: 80,
				mentality: 82,
				cup: 80,
				europe: 62
			},
			sourceRefs: ["athletic-official-1980-81-squad", "manual-athletic-1980s-coach-context"],
			dataConfidence: .64,
			notes: "Base jugable de la decada de 1980. Ratings calibrados por campeonatos 1982/83 y 1983/84, ciclo Clemente, peso historico y transicion final de decada; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Iribar",
				season: "1980/81",
				positions: ["POR"],
				overall: 84,
				sourceRefs: ["athletic-official-1980-81-squad"],
				dataConfidence: .76,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Cedrun",
				season: "1980/81",
				positions: ["POR"],
				overall: 75,
				sourceRefs: ["athletic-official-1980-81-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Goikoetxea",
				season: "1980/81",
				positions: ["DFC", "LD"],
				overall: 82,
				sourceRefs: ["athletic-official-1980-81-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["DFC-D", "LD"]
			}),
			makePlayer({
				name: "Alexanko",
				season: "1980/81",
				positions: ["DFC"],
				overall: 83,
				sourceRefs: ["athletic-official-1980-81-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "De la Fuente",
				season: "1980/81",
				positions: ["LI", "MI"],
				overall: 78,
				sourceRefs: ["athletic-official-1980-81-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["LI", "MI"]
			}),
			makePlayer({
				name: "Escalza",
				season: "1980/81",
				positions: ["LI", "DFC"],
				overall: 77,
				sourceRefs: ["athletic-official-1980-81-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Guisasola",
				season: "1980/81",
				positions: ["MC", "MCD"],
				overall: 79,
				sourceRefs: ["athletic-official-1980-81-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Irureta",
				season: "1980/81",
				positions: ["MC", "MP"],
				overall: 79,
				sourceRefs: ["athletic-official-1980-81-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Villar",
				season: "1980/81",
				positions: ["MC", "MCD"],
				overall: 78,
				sourceRefs: ["athletic-official-1980-81-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Sarabia",
				season: "1980/81",
				positions: ["MP", "SD"],
				overall: 80,
				sourceRefs: ["athletic-official-1980-81-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["MP", "SD"]
			}),
			makePlayer({
				name: "Dani",
				season: "1980/81",
				positions: ["SD", "DC"],
				overall: 82,
				sourceRefs: ["athletic-official-1980-81-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Argote",
				season: "1980/81",
				positions: ["EI", "MI"],
				overall: 80,
				sourceRefs: ["athletic-official-1980-81-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Amorrortu",
				season: "1980/81",
				positions: [
					"EI",
					"MI",
					"SD"
				],
				overall: 79,
				sourceRefs: ["athletic-official-1980-81-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: [
					"EI",
					"MI",
					"SD"
				]
			}),
			makePlayer({
				name: "Churruca",
				season: "1980/81",
				positions: ["ED", "MD"],
				overall: 77,
				sourceRefs: ["athletic-official-1980-81-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["ED", "MD"]
			}),
			makePlayer({
				name: "Noriega",
				season: "1980/81",
				positions: ["DC", "SD"],
				overall: 76,
				sourceRefs: ["athletic-official-1980-81-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["DC", "SD"]
			})
		]
	},
	{
		season: "1981/82",
		coach: makeCoach({
			name: "Javier Clemente",
			coachId: "javier_clemente",
			season: "1981/82",
			overall: 83,
			skills: {
				attack: 82,
				defense: 84,
				management: 84,
				mentality: 86,
				cup: 84,
				europe: 66
			},
			sourceRefs: ["athletic-official-1981-82-squad", "manual-athletic-1980s-coach-context"],
			dataConfidence: .72,
			notes: "Base jugable de la decada de 1980. Ratings calibrados por campeonatos 1982/83 y 1983/84, ciclo Clemente, peso historico y transicion final de decada; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Zubizarreta",
				season: "1981/82",
				positions: ["POR"],
				overall: 80,
				sourceRefs: ["athletic-official-1981-82-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Cedrun",
				season: "1981/82",
				positions: ["POR"],
				overall: 75,
				sourceRefs: ["athletic-official-1981-82-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Goikoetxea",
				season: "1981/82",
				positions: ["DFC", "LD"],
				overall: 84,
				sourceRefs: ["athletic-official-1981-82-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["DFC-D", "LD"]
			}),
			makePlayer({
				name: "Liceranzu",
				season: "1981/82",
				positions: ["DFC"],
				overall: 80,
				sourceRefs: ["athletic-official-1981-82-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["DFC-C", "DFC-I"]
			}),
			makePlayer({
				name: "Urkiaga",
				season: "1981/82",
				positions: ["LD", "MD"],
				overall: 79,
				sourceRefs: ["athletic-official-1981-82-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["LD", "MD"]
			}),
			makePlayer({
				name: "De la Fuente",
				season: "1981/82",
				positions: ["LI", "MI"],
				overall: 78,
				sourceRefs: ["athletic-official-1981-82-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["LI", "MI"]
			}),
			makePlayer({
				name: "De Andres",
				season: "1981/82",
				positions: ["MCD", "MC"],
				overall: 80,
				sourceRefs: ["athletic-official-1981-82-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Urtubi",
				season: "1981/82",
				positions: ["MC", "MCD"],
				overall: 79,
				sourceRefs: ["athletic-official-1981-82-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Sola",
				season: "1981/82",
				positions: ["MC", "MP"],
				overall: 78,
				sourceRefs: ["athletic-official-1981-82-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Sarabia",
				season: "1981/82",
				positions: ["MP", "SD"],
				overall: 82,
				sourceRefs: ["athletic-official-1981-82-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MP", "SD"]
			}),
			makePlayer({
				name: "Dani",
				season: "1981/82",
				positions: ["SD", "DC"],
				overall: 83,
				sourceRefs: ["athletic-official-1981-82-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Argote",
				season: "1981/82",
				positions: ["EI", "MI"],
				overall: 82,
				sourceRefs: ["athletic-official-1981-82-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Noriega",
				season: "1981/82",
				positions: ["DC", "SD"],
				overall: 78,
				sourceRefs: ["athletic-official-1981-82-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Endika",
				season: "1981/82",
				positions: ["ED", "DC"],
				overall: 77,
				sourceRefs: ["athletic-official-1981-82-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Gallego",
				season: "1981/82",
				positions: ["DC", "SD"],
				overall: 77,
				sourceRefs: ["athletic-official-1981-82-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["DC", "SD"]
			})
		]
	},
	{
		season: "1982/83",
		coach: makeCoach({
			name: "Javier Clemente",
			coachId: "javier_clemente",
			season: "1982/83",
			overall: 90,
			skills: {
				attack: 88,
				defense: 91,
				management: 91,
				mentality: 93,
				cup: 88,
				europe: 78
			},
			sourceRefs: ["athletic-official-1982-83-squad", "manual-athletic-1980s-coach-context"],
			dataConfidence: .86,
			notes: "Base jugable de la decada de 1980. Ratings calibrados por campeonatos 1982/83 y 1983/84, ciclo Clemente, peso historico y transicion final de decada; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Zubizarreta",
				season: "1982/83",
				positions: ["POR"],
				overall: 86,
				sourceRefs: ["athletic-official-1982-83-squad"],
				dataConfidence: .82,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Cedrun",
				season: "1982/83",
				positions: ["POR"],
				overall: 75,
				sourceRefs: ["athletic-official-1982-83-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Goikoetxea",
				season: "1982/83",
				positions: ["DFC", "LD"],
				overall: 88,
				sourceRefs: ["athletic-official-1982-83-squad"],
				dataConfidence: .84,
				tacticalSlotLabels: ["DFC-D", "LD"]
			}),
			makePlayer({
				name: "Liceranzu",
				season: "1982/83",
				positions: ["DFC"],
				overall: 85,
				sourceRefs: ["athletic-official-1982-83-squad"],
				dataConfidence: .78,
				tacticalSlotLabels: ["DFC-C", "DFC-I"]
			}),
			makePlayer({
				name: "Urkiaga",
				season: "1982/83",
				positions: ["LD", "MD"],
				overall: 83,
				sourceRefs: ["athletic-official-1982-83-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["LD", "MD"]
			}),
			makePlayer({
				name: "De la Fuente",
				season: "1982/83",
				positions: ["LI", "MI"],
				overall: 81,
				sourceRefs: ["athletic-official-1982-83-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["LI", "MI"]
			}),
			makePlayer({
				name: "De Andres",
				season: "1982/83",
				positions: ["MCD", "MC"],
				overall: 84,
				sourceRefs: ["athletic-official-1982-83-squad"],
				dataConfidence: .78,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Urtubi",
				season: "1982/83",
				positions: ["MC", "MCD"],
				overall: 83,
				sourceRefs: ["athletic-official-1982-83-squad"],
				dataConfidence: .76,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Sola",
				season: "1982/83",
				positions: ["MC", "MP"],
				overall: 81,
				sourceRefs: ["athletic-official-1982-83-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Sarabia",
				season: "1982/83",
				positions: ["MP", "SD"],
				overall: 86,
				sourceRefs: ["athletic-official-1982-83-squad"],
				dataConfidence: .82,
				tacticalSlotLabels: ["MP", "SD"]
			}),
			makePlayer({
				name: "Dani",
				season: "1982/83",
				positions: ["SD", "DC"],
				overall: 85,
				sourceRefs: ["athletic-official-1982-83-squad"],
				dataConfidence: .8,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Argote",
				season: "1982/83",
				positions: ["EI", "MI"],
				overall: 85,
				sourceRefs: ["athletic-official-1982-83-squad"],
				dataConfidence: .8,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Noriega",
				season: "1982/83",
				positions: ["DC", "SD"],
				overall: 81,
				sourceRefs: ["athletic-official-1982-83-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Endika",
				season: "1982/83",
				positions: ["ED", "DC"],
				overall: 80,
				sourceRefs: ["athletic-official-1982-83-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Gallego",
				season: "1982/83",
				positions: ["DC", "SD"],
				overall: 79,
				sourceRefs: ["athletic-official-1982-83-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["DC", "SD"]
			})
		]
	},
	{
		season: "1984/85",
		coach: makeCoach({
			name: "Javier Clemente",
			coachId: "javier_clemente",
			season: "1984/85",
			overall: 86,
			skills: {
				attack: 84,
				defense: 87,
				management: 87,
				mentality: 89,
				cup: 85,
				europe: 76
			},
			sourceRefs: ["athletic-official-1984-85-squad", "manual-athletic-1980s-coach-context"],
			dataConfidence: .78,
			notes: "Base jugable de la decada de 1980. Ratings calibrados por campeonatos 1982/83 y 1983/84, ciclo Clemente, peso historico y transicion final de decada; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Zubizarreta",
				season: "1984/85",
				positions: ["POR"],
				overall: 87,
				sourceRefs: ["athletic-official-1984-85-squad"],
				dataConfidence: .84,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Cedrun",
				season: "1984/85",
				positions: ["POR"],
				overall: 75,
				sourceRefs: ["athletic-official-1984-85-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Goikoetxea",
				season: "1984/85",
				positions: ["DFC", "LD"],
				overall: 87,
				sourceRefs: ["athletic-official-1984-85-squad"],
				dataConfidence: .82,
				tacticalSlotLabels: ["DFC-D", "LD"]
			}),
			makePlayer({
				name: "Liceranzu",
				season: "1984/85",
				positions: ["DFC"],
				overall: 85,
				sourceRefs: ["athletic-official-1984-85-squad"],
				dataConfidence: .78,
				tacticalSlotLabels: ["DFC-C", "DFC-I"]
			}),
			makePlayer({
				name: "Urkiaga",
				season: "1984/85",
				positions: ["LD", "MD"],
				overall: 82,
				sourceRefs: ["athletic-official-1984-85-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["LD", "MD"]
			}),
			makePlayer({
				name: "De la Fuente",
				season: "1984/85",
				positions: ["LI", "MI"],
				overall: 80,
				sourceRefs: ["athletic-official-1984-85-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["LI", "MI"]
			}),
			makePlayer({
				name: "De Andres",
				season: "1984/85",
				positions: ["MCD", "MC"],
				overall: 84,
				sourceRefs: ["athletic-official-1984-85-squad"],
				dataConfidence: .78,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Urtubi",
				season: "1984/85",
				positions: ["MC", "MCD"],
				overall: 82,
				sourceRefs: ["athletic-official-1984-85-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Sola",
				season: "1984/85",
				positions: ["MC", "MP"],
				overall: 81,
				sourceRefs: ["athletic-official-1984-85-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Sarabia",
				season: "1984/85",
				positions: ["MP", "SD"],
				overall: 85,
				sourceRefs: ["athletic-official-1984-85-squad"],
				dataConfidence: .8,
				tacticalSlotLabels: ["MP", "SD"]
			}),
			makePlayer({
				name: "Dani",
				season: "1984/85",
				positions: ["SD", "DC"],
				overall: 83,
				sourceRefs: ["athletic-official-1984-85-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Argote",
				season: "1984/85",
				positions: ["EI", "MI"],
				overall: 84,
				sourceRefs: ["athletic-official-1984-85-squad"],
				dataConfidence: .78,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Endika",
				season: "1984/85",
				positions: ["ED", "DC"],
				overall: 82,
				sourceRefs: ["athletic-official-1984-85-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Noriega",
				season: "1984/85",
				positions: ["DC", "SD"],
				overall: 81,
				sourceRefs: ["athletic-official-1984-85-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Gallego",
				season: "1984/85",
				positions: ["DC", "SD"],
				overall: 79,
				sourceRefs: ["athletic-official-1984-85-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["DC", "SD"]
			})
		]
	},
	{
		season: "1985/86",
		coach: makeCoach({
			name: "Javier Clemente",
			coachId: "javier_clemente",
			season: "1985/86",
			overall: 83,
			skills: {
				attack: 82,
				defense: 84,
				management: 84,
				mentality: 86,
				cup: 82,
				europe: 70
			},
			sourceRefs: ["athletic-official-1985-86-squad", "manual-athletic-1980s-coach-context"],
			dataConfidence: .72,
			notes: "Base jugable de la decada de 1980. Ratings calibrados por campeonatos 1982/83 y 1983/84, ciclo Clemente, peso historico y transicion final de decada; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Zubizarreta",
				season: "1985/86",
				positions: ["POR"],
				overall: 86,
				sourceRefs: ["athletic-official-1985-86-squad"],
				dataConfidence: .82,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Cedrun",
				season: "1985/86",
				positions: ["POR"],
				overall: 75,
				sourceRefs: ["athletic-official-1985-86-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Goikoetxea",
				season: "1985/86",
				positions: ["DFC", "LD"],
				overall: 85,
				sourceRefs: ["athletic-official-1985-86-squad"],
				dataConfidence: .78,
				tacticalSlotLabels: ["DFC-D", "LD"]
			}),
			makePlayer({
				name: "Liceranzu",
				season: "1985/86",
				positions: ["DFC"],
				overall: 84,
				sourceRefs: ["athletic-official-1985-86-squad"],
				dataConfidence: .76,
				tacticalSlotLabels: ["DFC-C", "DFC-I"]
			}),
			makePlayer({
				name: "Urkiaga",
				season: "1985/86",
				positions: ["LD", "MD"],
				overall: 81,
				sourceRefs: ["athletic-official-1985-86-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["LD", "MD"]
			}),
			makePlayer({
				name: "Patxi Salinas",
				season: "1985/86",
				positions: ["LI", "DFC"],
				overall: 79,
				sourceRefs: ["athletic-official-1985-86-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "De Andres",
				season: "1985/86",
				positions: ["MCD", "MC"],
				overall: 83,
				sourceRefs: ["athletic-official-1985-86-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Urtubi",
				season: "1985/86",
				positions: ["MC", "MCD"],
				overall: 81,
				sourceRefs: ["athletic-official-1985-86-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Sola",
				season: "1985/86",
				positions: ["MC", "MP"],
				overall: 81,
				sourceRefs: ["athletic-official-1985-86-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Sarabia",
				season: "1985/86",
				positions: ["MP", "SD"],
				overall: 84,
				sourceRefs: ["athletic-official-1985-86-squad"],
				dataConfidence: .78,
				tacticalSlotLabels: ["MP", "SD"]
			}),
			makePlayer({
				name: "Argote",
				season: "1985/86",
				positions: ["EI", "MI"],
				overall: 83,
				sourceRefs: ["athletic-official-1985-86-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Endika",
				season: "1985/86",
				positions: ["ED", "DC"],
				overall: 82,
				sourceRefs: ["athletic-official-1985-86-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Noriega",
				season: "1985/86",
				positions: ["DC", "SD"],
				overall: 82,
				sourceRefs: ["athletic-official-1985-86-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Gallego",
				season: "1985/86",
				positions: ["DC", "SD"],
				overall: 80,
				sourceRefs: ["athletic-official-1985-86-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Dani",
				season: "1985/86",
				positions: ["SD", "DC"],
				overall: 80,
				sourceRefs: ["athletic-official-1985-86-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["SD", "DC"]
			})
		]
	},
	{
		season: "1986/87",
		coach: makeCoach({
			name: "Javier Clemente",
			coachId: "javier_clemente",
			season: "1986/87",
			overall: 81,
			skills: {
				attack: 80,
				defense: 82,
				management: 82,
				mentality: 84,
				cup: 80,
				europe: 66
			},
			sourceRefs: ["athletic-official-1986-87-squad", "manual-athletic-1980s-coach-context"],
			dataConfidence: .68,
			notes: "Base jugable de la decada de 1980. Ratings calibrados por campeonatos 1982/83 y 1983/84, ciclo Clemente, peso historico y transicion final de decada; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Biurrun",
				season: "1986/87",
				positions: ["POR"],
				overall: 79,
				sourceRefs: ["athletic-official-1986-87-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Cedrun",
				season: "1986/87",
				positions: ["POR"],
				overall: 76,
				sourceRefs: ["athletic-official-1986-87-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Goikoetxea",
				season: "1986/87",
				positions: ["DFC", "LD"],
				overall: 84,
				sourceRefs: ["athletic-official-1986-87-squad"],
				dataConfidence: .76,
				tacticalSlotLabels: ["DFC-D", "LD"]
			}),
			makePlayer({
				name: "Liceranzu",
				season: "1986/87",
				positions: ["DFC"],
				overall: 83,
				sourceRefs: ["athletic-official-1986-87-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["DFC-C", "DFC-I"]
			}),
			makePlayer({
				name: "Patxi Salinas",
				season: "1986/87",
				positions: ["LI", "DFC"],
				overall: 80,
				sourceRefs: ["athletic-official-1986-87-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Urkiaga",
				season: "1986/87",
				positions: ["LD", "MD"],
				overall: 80,
				sourceRefs: ["athletic-official-1986-87-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["LD", "MD"]
			}),
			makePlayer({
				name: "De Andres",
				season: "1986/87",
				positions: ["MCD", "MC"],
				overall: 82,
				sourceRefs: ["athletic-official-1986-87-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Urtubi",
				season: "1986/87",
				positions: ["MC", "MCD"],
				overall: 80,
				sourceRefs: ["athletic-official-1986-87-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Sola",
				season: "1986/87",
				positions: ["MC", "MP"],
				overall: 80,
				sourceRefs: ["athletic-official-1986-87-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Sarabia",
				season: "1986/87",
				positions: ["MP", "SD"],
				overall: 83,
				sourceRefs: ["athletic-official-1986-87-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["MP", "SD"]
			}),
			makePlayer({
				name: "Argote",
				season: "1986/87",
				positions: ["EI", "MI"],
				overall: 82,
				sourceRefs: ["athletic-official-1986-87-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Endika",
				season: "1986/87",
				positions: ["ED", "DC"],
				overall: 81,
				sourceRefs: ["athletic-official-1986-87-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Noriega",
				season: "1986/87",
				positions: ["DC", "SD"],
				overall: 82,
				sourceRefs: ["athletic-official-1986-87-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Gallego",
				season: "1986/87",
				positions: ["DC", "SD"],
				overall: 80,
				sourceRefs: ["athletic-official-1986-87-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Andrinua",
				season: "1986/87",
				positions: ["DFC"],
				overall: 77,
				sourceRefs: ["athletic-official-1986-87-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["DFC-C"]
			})
		]
	},
	{
		season: "1987/88",
		coach: makeCoach({
			name: "Howard Kendall",
			coachId: "howard_kendall",
			season: "1987/88",
			overall: 81,
			skills: {
				attack: 81,
				defense: 81,
				management: 82,
				mentality: 83,
				cup: 80,
				europe: 65
			},
			sourceRefs: ["athletic-official-1987-88-squad", "manual-athletic-1980s-coach-context"],
			dataConfidence: .66,
			notes: "Base jugable de la decada de 1980. Ratings calibrados por campeonatos 1982/83 y 1983/84, ciclo Clemente, peso historico y transicion final de decada; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Biurrun",
				season: "1987/88",
				positions: ["POR"],
				overall: 80,
				sourceRefs: ["athletic-official-1987-88-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Cedrun",
				season: "1987/88",
				positions: ["POR"],
				overall: 76,
				sourceRefs: ["athletic-official-1987-88-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Goikoetxea",
				season: "1987/88",
				positions: ["DFC", "LD"],
				overall: 83,
				sourceRefs: ["athletic-official-1987-88-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["DFC-D", "LD"]
			}),
			makePlayer({
				name: "Andrinua",
				season: "1987/88",
				positions: ["DFC"],
				overall: 80,
				sourceRefs: ["athletic-official-1987-88-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Patxi Salinas",
				season: "1987/88",
				positions: ["LI", "DFC"],
				overall: 81,
				sourceRefs: ["athletic-official-1987-88-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Urkiaga",
				season: "1987/88",
				positions: ["LD", "MD"],
				overall: 79,
				sourceRefs: ["athletic-official-1987-88-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["LD", "MD"]
			}),
			makePlayer({
				name: "De Andres",
				season: "1987/88",
				positions: ["MCD", "MC"],
				overall: 81,
				sourceRefs: ["athletic-official-1987-88-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Urtubi",
				season: "1987/88",
				positions: ["MC", "MCD"],
				overall: 79,
				sourceRefs: ["athletic-official-1987-88-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Sola",
				season: "1987/88",
				positions: ["MC", "MP"],
				overall: 80,
				sourceRefs: ["athletic-official-1987-88-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Sarabia",
				season: "1987/88",
				positions: ["MP", "SD"],
				overall: 82,
				sourceRefs: ["athletic-official-1987-88-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["MP", "SD"]
			}),
			makePlayer({
				name: "Argote",
				season: "1987/88",
				positions: ["EI", "MI"],
				overall: 81,
				sourceRefs: ["athletic-official-1987-88-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Endika",
				season: "1987/88",
				positions: ["ED", "DC"],
				overall: 80,
				sourceRefs: ["athletic-official-1987-88-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Noriega",
				season: "1987/88",
				positions: ["DC", "SD"],
				overall: 81,
				sourceRefs: ["athletic-official-1987-88-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Gallego",
				season: "1987/88",
				positions: ["DC", "SD"],
				overall: 79,
				sourceRefs: ["athletic-official-1987-88-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Garitano",
				season: "1987/88",
				positions: ["MC", "MCD"],
				overall: 76,
				sourceRefs: ["athletic-official-1987-88-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["MC", "MCD"]
			})
		]
	},
	{
		season: "1988/89",
		coach: makeCoach({
			name: "Howard Kendall",
			coachId: "howard_kendall",
			season: "1988/89",
			overall: 80,
			skills: {
				attack: 80,
				defense: 80,
				management: 81,
				mentality: 82,
				cup: 79,
				europe: 64
			},
			sourceRefs: ["athletic-official-1988-89-squad", "manual-athletic-1980s-coach-context"],
			dataConfidence: .64,
			notes: "Base jugable de la decada de 1980. Ratings calibrados por campeonatos 1982/83 y 1983/84, ciclo Clemente, peso historico y transicion final de decada; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Biurrun",
				season: "1988/89",
				positions: ["POR"],
				overall: 81,
				sourceRefs: ["athletic-official-1988-89-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Cedrun",
				season: "1988/89",
				positions: ["POR"],
				overall: 76,
				sourceRefs: ["athletic-official-1988-89-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Andrinua",
				season: "1988/89",
				positions: ["DFC"],
				overall: 82,
				sourceRefs: ["athletic-official-1988-89-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Goikoetxea",
				season: "1988/89",
				positions: ["DFC", "LD"],
				overall: 81,
				sourceRefs: ["athletic-official-1988-89-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["DFC-D", "LD"]
			}),
			makePlayer({
				name: "Patxi Salinas",
				season: "1988/89",
				positions: ["LI", "DFC"],
				overall: 82,
				sourceRefs: ["athletic-official-1988-89-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Lakabeg",
				season: "1988/89",
				positions: ["LD", "DFC"],
				overall: 78,
				sourceRefs: ["athletic-official-1988-89-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["LD", "DFC-D"]
			}),
			makePlayer({
				name: "De Andres",
				season: "1988/89",
				positions: ["MCD", "MC"],
				overall: 80,
				sourceRefs: ["athletic-official-1988-89-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Urtubi",
				season: "1988/89",
				positions: ["MC", "MCD"],
				overall: 78,
				sourceRefs: ["athletic-official-1988-89-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Garitano",
				season: "1988/89",
				positions: ["MC", "MCD"],
				overall: 78,
				sourceRefs: ["athletic-official-1988-89-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Sarabia",
				season: "1988/89",
				positions: ["MP", "SD"],
				overall: 81,
				sourceRefs: ["athletic-official-1988-89-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MP", "SD"]
			}),
			makePlayer({
				name: "Argote",
				season: "1988/89",
				positions: ["EI", "MI"],
				overall: 80,
				sourceRefs: ["athletic-official-1988-89-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Endika",
				season: "1988/89",
				positions: ["ED", "DC"],
				overall: 79,
				sourceRefs: ["athletic-official-1988-89-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Noriega",
				season: "1988/89",
				positions: ["DC", "SD"],
				overall: 80,
				sourceRefs: ["athletic-official-1988-89-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Luke",
				season: "1988/89",
				positions: ["DC", "SD"],
				overall: 77,
				sourceRefs: ["athletic-official-1988-89-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Alkorta",
				season: "1988/89",
				positions: ["DFC", "MCD"],
				overall: 76,
				sourceRefs: ["athletic-official-1988-89-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["DFC-C", "MCD"]
			})
		]
	},
	{
		season: "1989/90",
		coach: makeCoach({
			name: "Howard Kendall",
			coachId: "howard_kendall",
			season: "1989/90",
			overall: 80,
			skills: {
				attack: 80,
				defense: 80,
				management: 81,
				mentality: 82,
				cup: 79,
				europe: 64
			},
			sourceRefs: ["athletic-official-1989-90-squad", "manual-athletic-1980s-coach-context"],
			dataConfidence: .64,
			notes: "Base jugable de la decada de 1980. Ratings calibrados por campeonatos 1982/83 y 1983/84, ciclo Clemente, peso historico y transicion final de decada; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Biurrun",
				season: "1989/90",
				positions: ["POR"],
				overall: 81,
				sourceRefs: ["athletic-official-1989-90-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Cedrun",
				season: "1989/90",
				positions: ["POR"],
				overall: 76,
				sourceRefs: ["athletic-official-1989-90-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Andrinua",
				season: "1989/90",
				positions: ["DFC"],
				overall: 83,
				sourceRefs: ["athletic-official-1989-90-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Patxi Salinas",
				season: "1989/90",
				positions: ["LI", "DFC"],
				overall: 82,
				sourceRefs: ["athletic-official-1989-90-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Lakabeg",
				season: "1989/90",
				positions: ["LD", "DFC"],
				overall: 79,
				sourceRefs: ["athletic-official-1989-90-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["LD", "DFC-D"]
			}),
			makePlayer({
				name: "Alkorta",
				season: "1989/90",
				positions: ["DFC", "MCD"],
				overall: 79,
				sourceRefs: ["athletic-official-1989-90-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["DFC-C", "MCD"]
			}),
			makePlayer({
				name: "De Andres",
				season: "1989/90",
				positions: ["MCD", "MC"],
				overall: 79,
				sourceRefs: ["athletic-official-1989-90-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Garitano",
				season: "1989/90",
				positions: ["MC", "MCD"],
				overall: 79,
				sourceRefs: ["athletic-official-1989-90-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Urtubi",
				season: "1989/90",
				positions: ["MC", "MCD"],
				overall: 77,
				sourceRefs: ["athletic-official-1989-90-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Sarabia",
				season: "1989/90",
				positions: ["MP", "SD"],
				overall: 80,
				sourceRefs: ["athletic-official-1989-90-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["MP", "SD"]
			}),
			makePlayer({
				name: "Argote",
				season: "1989/90",
				positions: ["EI", "MI"],
				overall: 79,
				sourceRefs: ["athletic-official-1989-90-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Endika",
				season: "1989/90",
				positions: ["ED", "DC"],
				overall: 78,
				sourceRefs: ["athletic-official-1989-90-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Noriega",
				season: "1989/90",
				positions: ["DC", "SD"],
				overall: 79,
				sourceRefs: ["athletic-official-1989-90-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Luke",
				season: "1989/90",
				positions: ["DC", "SD"],
				overall: 78,
				sourceRefs: ["athletic-official-1989-90-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Valverde",
				season: "1989/90",
				positions: [
					"ED",
					"SD",
					"DC"
				],
				overall: 77,
				sourceRefs: ["athletic-official-1989-90-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: [
					"ED",
					"SD",
					"DC-D"
				]
			})
		]
	},
	{
		season: "1990/91",
		coach: makeCoach({
			name: "Javier Clemente",
			coachId: "javier_clemente",
			season: "1990/91",
			overall: 80,
			skills: {
				attack: 80,
				defense: 81,
				management: 82,
				mentality: 84,
				cup: 80,
				europe: 64
			},
			sourceRefs: ["athletic-official-1990-91-squad", "manual-athletic-1990s-coach-context"],
			dataConfidence: .66,
			notes: "Base jugable de la decada de 1990. Ratings calibrados por transicion post-Clemente, ciclo Heynckes, aparicion de Julen Guerrero, subcampeonato 1997/98 y bloque Etxeberria-Urzaiz; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Biurrun",
				season: "1990/91",
				positions: ["POR"],
				overall: 80,
				sourceRefs: ["athletic-official-1990-91-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Cedrun",
				season: "1990/91",
				positions: ["POR"],
				overall: 76,
				sourceRefs: ["athletic-official-1990-91-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Andrinua",
				season: "1990/91",
				positions: ["DFC"],
				overall: 83,
				sourceRefs: ["athletic-official-1990-91-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Alkorta",
				season: "1990/91",
				positions: ["DFC", "MCD"],
				overall: 81,
				sourceRefs: ["athletic-official-1990-91-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["DFC-C", "MCD"]
			}),
			makePlayer({
				name: "Patxi Salinas",
				season: "1990/91",
				positions: ["LI", "DFC"],
				overall: 81,
				sourceRefs: ["athletic-official-1990-91-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Lakabeg",
				season: "1990/91",
				positions: ["LD", "DFC"],
				overall: 79,
				sourceRefs: ["athletic-official-1990-91-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["LD", "DFC-D"]
			}),
			makePlayer({
				name: "Garitano",
				season: "1990/91",
				positions: ["MC", "MCD"],
				overall: 80,
				sourceRefs: ["athletic-official-1990-91-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Urrutia",
				season: "1990/91",
				positions: ["MCD", "MC"],
				overall: 76,
				sourceRefs: ["athletic-official-1990-91-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Sarabia",
				season: "1990/91",
				positions: ["MP", "SD"],
				overall: 79,
				sourceRefs: ["athletic-official-1990-91-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["MP", "SD"]
			}),
			makePlayer({
				name: "Valverde",
				season: "1990/91",
				positions: [
					"ED",
					"SD",
					"DC"
				],
				overall: 79,
				sourceRefs: ["athletic-official-1990-91-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: [
					"ED",
					"SD",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Noriega",
				season: "1990/91",
				positions: ["DC", "SD"],
				overall: 78,
				sourceRefs: ["athletic-official-1990-91-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Luke",
				season: "1990/91",
				positions: ["DC", "SD"],
				overall: 78,
				sourceRefs: ["athletic-official-1990-91-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Argote",
				season: "1990/91",
				positions: ["EI", "MI"],
				overall: 78,
				sourceRefs: ["athletic-official-1990-91-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Endika",
				season: "1990/91",
				positions: ["ED", "DC"],
				overall: 77,
				sourceRefs: ["athletic-official-1990-91-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Ziganda",
				season: "1990/91",
				positions: ["DC"],
				overall: 76,
				sourceRefs: ["athletic-official-1990-91-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			})
		]
	},
	{
		season: "1991/92",
		coach: makeCoach({
			name: "Jupp Heynckes",
			coachId: "jupp_heynckes",
			season: "1991/92",
			overall: 82,
			skills: {
				attack: 83,
				defense: 81,
				management: 83,
				mentality: 84,
				cup: 81,
				europe: 68
			},
			sourceRefs: ["athletic-official-1991-92-squad", "manual-athletic-1990s-coach-context"],
			dataConfidence: .7,
			notes: "Base jugable de la decada de 1990. Ratings calibrados por transicion post-Clemente, ciclo Heynckes, aparicion de Julen Guerrero, subcampeonato 1997/98 y bloque Etxeberria-Urzaiz; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Valencia",
				season: "1991/92",
				positions: ["POR"],
				overall: 78,
				sourceRefs: ["athletic-official-1991-92-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Biurrun",
				season: "1991/92",
				positions: ["POR"],
				overall: 77,
				sourceRefs: ["athletic-official-1991-92-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Andrinua",
				season: "1991/92",
				positions: ["DFC"],
				overall: 84,
				sourceRefs: ["athletic-official-1991-92-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Alkorta",
				season: "1991/92",
				positions: ["DFC", "MCD"],
				overall: 83,
				sourceRefs: ["athletic-official-1991-92-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["DFC-C", "MCD"]
			}),
			makePlayer({
				name: "Larrainzar",
				season: "1991/92",
				positions: ["LD", "DFC"],
				overall: 79,
				sourceRefs: ["athletic-official-1991-92-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["LD", "DFC-D"]
			}),
			makePlayer({
				name: "Patxi Salinas",
				season: "1991/92",
				positions: ["LI", "DFC"],
				overall: 80,
				sourceRefs: ["athletic-official-1991-92-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Garitano",
				season: "1991/92",
				positions: ["MC", "MCD"],
				overall: 81,
				sourceRefs: ["athletic-official-1991-92-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Urrutia",
				season: "1991/92",
				positions: ["MCD", "MC"],
				overall: 78,
				sourceRefs: ["athletic-official-1991-92-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Eskurza",
				season: "1991/92",
				positions: ["MC", "MP"],
				overall: 78,
				sourceRefs: ["athletic-official-1991-92-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Valverde",
				season: "1991/92",
				positions: [
					"ED",
					"SD",
					"DC"
				],
				overall: 80,
				sourceRefs: ["athletic-official-1991-92-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: [
					"ED",
					"SD",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Sarabia",
				season: "1991/92",
				positions: ["MP", "SD"],
				overall: 78,
				sourceRefs: ["athletic-official-1991-92-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MP", "SD"]
			}),
			makePlayer({
				name: "Ziganda",
				season: "1991/92",
				positions: ["DC"],
				overall: 80,
				sourceRefs: ["athletic-official-1991-92-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Luke",
				season: "1991/92",
				positions: ["DC", "SD"],
				overall: 77,
				sourceRefs: ["athletic-official-1991-92-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Luis Fernando",
				season: "1991/92",
				positions: ["EI", "MI"],
				overall: 77,
				sourceRefs: ["athletic-official-1991-92-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Mendilibar",
				season: "1991/92",
				positions: ["MC", "MCD"],
				overall: 76,
				sourceRefs: ["athletic-official-1991-92-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["MC", "MCD"]
			})
		]
	},
	{
		season: "1992/93",
		coach: makeCoach({
			name: "Jupp Heynckes",
			coachId: "jupp_heynckes",
			season: "1992/93",
			overall: 82,
			skills: {
				attack: 83,
				defense: 81,
				management: 83,
				mentality: 84,
				cup: 81,
				europe: 68
			},
			sourceRefs: ["athletic-official-1992-93-squad", "manual-athletic-1990s-coach-context"],
			dataConfidence: .7,
			notes: "Base jugable de la decada de 1990. Ratings calibrados por transicion post-Clemente, ciclo Heynckes, aparicion de Julen Guerrero, subcampeonato 1997/98 y bloque Etxeberria-Urzaiz; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Valencia",
				season: "1992/93",
				positions: ["POR"],
				overall: 79,
				sourceRefs: ["athletic-official-1992-93-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Biurrun",
				season: "1992/93",
				positions: ["POR"],
				overall: 76,
				sourceRefs: ["athletic-official-1992-93-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Andrinua",
				season: "1992/93",
				positions: ["DFC"],
				overall: 84,
				sourceRefs: ["athletic-official-1992-93-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Alkorta",
				season: "1992/93",
				positions: ["DFC", "MCD"],
				overall: 84,
				sourceRefs: ["athletic-official-1992-93-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["DFC-C", "MCD"]
			}),
			makePlayer({
				name: "Larrainzar",
				season: "1992/93",
				positions: ["LD", "DFC"],
				overall: 80,
				sourceRefs: ["athletic-official-1992-93-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["LD", "DFC-D"]
			}),
			makePlayer({
				name: "Patxi Salinas",
				season: "1992/93",
				positions: ["LI", "DFC"],
				overall: 79,
				sourceRefs: ["athletic-official-1992-93-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["LI", "DFC-I"]
			}),
			makePlayer({
				name: "Garitano",
				season: "1992/93",
				positions: ["MC", "MCD"],
				overall: 81,
				sourceRefs: ["athletic-official-1992-93-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Urrutia",
				season: "1992/93",
				positions: ["MCD", "MC"],
				overall: 79,
				sourceRefs: ["athletic-official-1992-93-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Eskurza",
				season: "1992/93",
				positions: ["MC", "MP"],
				overall: 79,
				sourceRefs: ["athletic-official-1992-93-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Guerrero",
				season: "1992/93",
				positions: ["MP", "MC"],
				overall: 78,
				sourceRefs: ["athletic-official-1992-93-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: [
					"MP",
					"MC-I",
					"MC-D"
				]
			}),
			makePlayer({
				name: "Valverde",
				season: "1992/93",
				positions: [
					"ED",
					"SD",
					"DC"
				],
				overall: 81,
				sourceRefs: ["athletic-official-1992-93-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: [
					"ED",
					"SD",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Ziganda",
				season: "1992/93",
				positions: ["DC"],
				overall: 82,
				sourceRefs: ["athletic-official-1992-93-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Luke",
				season: "1992/93",
				positions: ["DC", "SD"],
				overall: 77,
				sourceRefs: ["athletic-official-1992-93-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Luis Fernando",
				season: "1992/93",
				positions: ["EI", "MI"],
				overall: 78,
				sourceRefs: ["athletic-official-1992-93-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Mendilibar",
				season: "1992/93",
				positions: ["MC", "MCD"],
				overall: 76,
				sourceRefs: ["athletic-official-1992-93-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["MC", "MCD"]
			})
		]
	},
	{
		season: "1994/95",
		coach: makeCoach({
			name: "Javier Irureta",
			coachId: "javier_irureta",
			season: "1994/95",
			overall: 80,
			skills: {
				attack: 81,
				defense: 80,
				management: 80,
				mentality: 82,
				cup: 80,
				europe: 64
			},
			sourceRefs: ["athletic-official-1994-95-squad", "manual-athletic-1990s-coach-context"],
			dataConfidence: .66,
			notes: "Base jugable de la decada de 1990. Ratings calibrados por transicion post-Clemente, ciclo Heynckes, aparicion de Julen Guerrero, subcampeonato 1997/98 y bloque Etxeberria-Urzaiz; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Valencia",
				season: "1994/95",
				positions: ["POR"],
				overall: 80,
				sourceRefs: ["athletic-official-1994-95-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Iru",
				season: "1994/95",
				positions: ["POR"],
				overall: 74,
				sourceRefs: ["athletic-official-1994-95-squad"],
				dataConfidence: .52,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Andrinua",
				season: "1994/95",
				positions: ["DFC"],
				overall: 83,
				sourceRefs: ["athletic-official-1994-95-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Tabuenka",
				season: "1994/95",
				positions: ["DFC", "LD"],
				overall: 80,
				sourceRefs: ["athletic-official-1994-95-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["DFC-D", "LD"]
			}),
			makePlayer({
				name: "Larrazabal",
				season: "1994/95",
				positions: ["LI", "MI"],
				overall: 80,
				sourceRefs: ["athletic-official-1994-95-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["LI", "MI"]
			}),
			makePlayer({
				name: "Larrainzar",
				season: "1994/95",
				positions: ["LD", "DFC"],
				overall: 79,
				sourceRefs: ["athletic-official-1994-95-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["LD", "DFC-D"]
			}),
			makePlayer({
				name: "Urrutia",
				season: "1994/95",
				positions: ["MCD", "MC"],
				overall: 81,
				sourceRefs: ["athletic-official-1994-95-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Garitano",
				season: "1994/95",
				positions: ["MC", "MCD"],
				overall: 80,
				sourceRefs: ["athletic-official-1994-95-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Eskurza",
				season: "1994/95",
				positions: ["MC", "MP"],
				overall: 78,
				sourceRefs: ["athletic-official-1994-95-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Julen Guerrero",
				season: "1994/95",
				positions: ["MP", "MC"],
				overall: 86,
				sourceRefs: ["athletic-official-1994-95-squad"],
				dataConfidence: .82,
				tacticalSlotLabels: [
					"MP",
					"MC-I",
					"MC-D"
				]
			}),
			makePlayer({
				name: "Valverde",
				season: "1994/95",
				positions: [
					"ED",
					"SD",
					"DC"
				],
				overall: 80,
				sourceRefs: ["athletic-official-1994-95-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: [
					"ED",
					"SD",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Ziganda",
				season: "1994/95",
				positions: ["DC"],
				overall: 83,
				sourceRefs: ["athletic-official-1994-95-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Joseba Etxeberria",
				season: "1994/95",
				positions: ["ED", "DC"],
				overall: 78,
				sourceRefs: ["athletic-official-1994-95-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Goikoetxea",
				season: "1994/95",
				positions: ["EI", "MI"],
				overall: 77,
				sourceRefs: ["athletic-official-1994-95-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Bolo",
				season: "1994/95",
				positions: ["DC", "SD"],
				overall: 76,
				sourceRefs: ["athletic-official-1994-95-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["DC", "SD"]
			})
		]
	},
	{
		season: "1995/96",
		coach: makeCoach({
			name: "Amorrortu",
			coachId: "amorrortu",
			season: "1995/96",
			overall: 80,
			skills: {
				attack: 81,
				defense: 80,
				management: 80,
				mentality: 82,
				cup: 80,
				europe: 64
			},
			sourceRefs: ["athletic-official-1995-96-squad", "manual-athletic-1990s-coach-context"],
			dataConfidence: .64,
			notes: "Base jugable de la decada de 1990. Ratings calibrados por transicion post-Clemente, ciclo Heynckes, aparicion de Julen Guerrero, subcampeonato 1997/98 y bloque Etxeberria-Urzaiz; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Valencia",
				season: "1995/96",
				positions: ["POR"],
				overall: 81,
				sourceRefs: ["athletic-official-1995-96-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Iru",
				season: "1995/96",
				positions: ["POR"],
				overall: 74,
				sourceRefs: ["athletic-official-1995-96-squad"],
				dataConfidence: .52,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Andrinua",
				season: "1995/96",
				positions: ["DFC"],
				overall: 82,
				sourceRefs: ["athletic-official-1995-96-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Tabuenka",
				season: "1995/96",
				positions: ["DFC", "LD"],
				overall: 81,
				sourceRefs: ["athletic-official-1995-96-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["DFC-D", "LD"]
			}),
			makePlayer({
				name: "Larrazabal",
				season: "1995/96",
				positions: ["LI", "MI"],
				overall: 81,
				sourceRefs: ["athletic-official-1995-96-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["LI", "MI"]
			}),
			makePlayer({
				name: "Larrainzar",
				season: "1995/96",
				positions: ["LD", "DFC"],
				overall: 78,
				sourceRefs: ["athletic-official-1995-96-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["LD", "DFC-D"]
			}),
			makePlayer({
				name: "Urrutia",
				season: "1995/96",
				positions: ["MCD", "MC"],
				overall: 82,
				sourceRefs: ["athletic-official-1995-96-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Garitano",
				season: "1995/96",
				positions: ["MC", "MCD"],
				overall: 80,
				sourceRefs: ["athletic-official-1995-96-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Alkiza",
				season: "1995/96",
				positions: ["MC", "MP"],
				overall: 79,
				sourceRefs: ["athletic-official-1995-96-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Julen Guerrero",
				season: "1995/96",
				positions: ["MP", "MC"],
				overall: 87,
				sourceRefs: ["athletic-official-1995-96-squad"],
				dataConfidence: .84,
				tacticalSlotLabels: [
					"MP",
					"MC-I",
					"MC-D"
				]
			}),
			makePlayer({
				name: "Valverde",
				season: "1995/96",
				positions: [
					"ED",
					"SD",
					"DC"
				],
				overall: 79,
				sourceRefs: ["athletic-official-1995-96-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: [
					"ED",
					"SD",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Ziganda",
				season: "1995/96",
				positions: ["DC"],
				overall: 83,
				sourceRefs: ["athletic-official-1995-96-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Joseba Etxeberria",
				season: "1995/96",
				positions: ["ED", "DC"],
				overall: 81,
				sourceRefs: ["athletic-official-1995-96-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Bolo",
				season: "1995/96",
				positions: ["DC", "SD"],
				overall: 77,
				sourceRefs: ["athletic-official-1995-96-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["DC", "SD"]
			}),
			makePlayer({
				name: "Goikoetxea",
				season: "1995/96",
				positions: ["EI", "MI"],
				overall: 77,
				sourceRefs: ["athletic-official-1995-96-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["EI", "MI"]
			})
		]
	},
	{
		season: "1996/97",
		coach: makeCoach({
			name: "Luis Fernandez",
			coachId: "luis_fernandez",
			season: "1996/97",
			overall: 82,
			skills: {
				attack: 83,
				defense: 81,
				management: 82,
				mentality: 84,
				cup: 81,
				europe: 68
			},
			sourceRefs: ["athletic-official-1996-97-squad", "manual-athletic-1990s-coach-context"],
			dataConfidence: .7,
			notes: "Base jugable de la decada de 1990. Ratings calibrados por transicion post-Clemente, ciclo Heynckes, aparicion de Julen Guerrero, subcampeonato 1997/98 y bloque Etxeberria-Urzaiz; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Valencia",
				season: "1996/97",
				positions: ["POR"],
				overall: 80,
				sourceRefs: ["athletic-official-1996-97-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Iru",
				season: "1996/97",
				positions: ["POR"],
				overall: 75,
				sourceRefs: ["athletic-official-1996-97-squad"],
				dataConfidence: .54,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Andrinua",
				season: "1996/97",
				positions: ["DFC"],
				overall: 81,
				sourceRefs: ["athletic-official-1996-97-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Tabuenka",
				season: "1996/97",
				positions: ["DFC", "LD"],
				overall: 81,
				sourceRefs: ["athletic-official-1996-97-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["DFC-D", "LD"]
			}),
			makePlayer({
				name: "Larrazabal",
				season: "1996/97",
				positions: ["LI", "MI"],
				overall: 81,
				sourceRefs: ["athletic-official-1996-97-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["LI", "MI"]
			}),
			makePlayer({
				name: "Larrainzar",
				season: "1996/97",
				positions: ["LD", "DFC"],
				overall: 78,
				sourceRefs: ["athletic-official-1996-97-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["LD", "DFC-D"]
			}),
			makePlayer({
				name: "Urrutia",
				season: "1996/97",
				positions: ["MCD", "MC"],
				overall: 82,
				sourceRefs: ["athletic-official-1996-97-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Alkiza",
				season: "1996/97",
				positions: ["MC", "MP"],
				overall: 80,
				sourceRefs: ["athletic-official-1996-97-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Carlos Garcia",
				season: "1996/97",
				positions: ["MC", "MCD"],
				overall: 78,
				sourceRefs: ["athletic-official-1996-97-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Julen Guerrero",
				season: "1996/97",
				positions: ["MP", "MC"],
				overall: 87,
				sourceRefs: ["athletic-official-1996-97-squad"],
				dataConfidence: .84,
				tacticalSlotLabels: [
					"MP",
					"MC-I",
					"MC-D"
				]
			}),
			makePlayer({
				name: "Joseba Etxeberria",
				season: "1996/97",
				positions: ["ED", "DC"],
				overall: 83,
				sourceRefs: ["athletic-official-1996-97-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Ziganda",
				season: "1996/97",
				positions: ["DC"],
				overall: 82,
				sourceRefs: ["athletic-official-1996-97-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Urzaiz",
				season: "1996/97",
				positions: ["DC"],
				overall: 79,
				sourceRefs: ["athletic-official-1996-97-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Ezquerro",
				season: "1996/97",
				positions: ["EI", "SD"],
				overall: 78,
				sourceRefs: ["athletic-official-1996-97-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["EI", "SD"]
			}),
			makePlayer({
				name: "Bolo",
				season: "1996/97",
				positions: ["DC", "SD"],
				overall: 77,
				sourceRefs: ["athletic-official-1996-97-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["DC", "SD"]
			})
		]
	},
	{
		season: "1998/99",
		coach: makeCoach({
			name: "Luis Fernandez",
			coachId: "luis_fernandez",
			season: "1998/99",
			overall: 84,
			skills: {
				attack: 85,
				defense: 82,
				management: 84,
				mentality: 86,
				cup: 82,
				europe: 78
			},
			sourceRefs: ["athletic-official-1998-99-squad", "manual-athletic-1990s-coach-context"],
			dataConfidence: .76,
			notes: "Base jugable de la decada de 1990. Ratings calibrados por transicion post-Clemente, ciclo Heynckes, aparicion de Julen Guerrero, subcampeonato 1997/98 y bloque Etxeberria-Urzaiz; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Iru",
				season: "1998/99",
				positions: ["POR"],
				overall: 78,
				sourceRefs: ["athletic-official-1998-99-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Lafuente",
				season: "1998/99",
				positions: ["POR"],
				overall: 75,
				sourceRefs: ["athletic-official-1998-99-squad"],
				dataConfidence: .54,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Lacruz",
				season: "1998/99",
				positions: ["DFC", "LD"],
				overall: 80,
				sourceRefs: ["athletic-official-1998-99-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["DFC-D", "LD"]
			}),
			makePlayer({
				name: "Aitor Ocio",
				season: "1998/99",
				positions: ["DFC"],
				overall: 78,
				sourceRefs: ["athletic-official-1998-99-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Larrazabal",
				season: "1998/99",
				positions: ["LI", "MI"],
				overall: 80,
				sourceRefs: ["athletic-official-1998-99-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["LI", "MI"]
			}),
			makePlayer({
				name: "Felipe",
				season: "1998/99",
				positions: ["LD", "DFC"],
				overall: 78,
				sourceRefs: ["athletic-official-1998-99-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["LD", "DFC-D"]
			}),
			makePlayer({
				name: "Urrutia",
				season: "1998/99",
				positions: ["MCD", "MC"],
				overall: 81,
				sourceRefs: ["athletic-official-1998-99-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Alkiza",
				season: "1998/99",
				positions: ["MC", "MP"],
				overall: 80,
				sourceRefs: ["athletic-official-1998-99-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Tiko",
				season: "1998/99",
				positions: ["MC", "MP"],
				overall: 79,
				sourceRefs: ["athletic-official-1998-99-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Julen Guerrero",
				season: "1998/99",
				positions: ["MP", "MC"],
				overall: 84,
				sourceRefs: ["athletic-official-1998-99-squad"],
				dataConfidence: .76,
				tacticalSlotLabels: [
					"MP",
					"MC-I",
					"MC-D"
				]
			}),
			makePlayer({
				name: "Joseba Etxeberria",
				season: "1998/99",
				positions: ["ED", "DC"],
				overall: 86,
				sourceRefs: ["athletic-official-1998-99-squad"],
				dataConfidence: .82,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Urzaiz",
				season: "1998/99",
				positions: ["DC"],
				overall: 84,
				sourceRefs: ["athletic-official-1998-99-squad"],
				dataConfidence: .78,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Ezquerro",
				season: "1998/99",
				positions: ["EI", "SD"],
				overall: 80,
				sourceRefs: ["athletic-official-1998-99-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["EI", "SD"]
			}),
			makePlayer({
				name: "Yeste",
				season: "1998/99",
				positions: ["MP", "EI"],
				overall: 76,
				sourceRefs: ["athletic-official-1998-99-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["MP", "EI"]
			}),
			makePlayer({
				name: "Bolo",
				season: "1998/99",
				positions: ["DC", "SD"],
				overall: 77,
				sourceRefs: ["athletic-official-1998-99-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["DC", "SD"]
			})
		]
	},
	{
		season: "1999/00",
		coach: makeCoach({
			name: "Luis Fernandez",
			coachId: "luis_fernandez",
			season: "1999/00",
			overall: 82,
			skills: {
				attack: 83,
				defense: 81,
				management: 82,
				mentality: 84,
				cup: 81,
				europe: 70
			},
			sourceRefs: ["athletic-official-1999-00-squad", "manual-athletic-1990s-coach-context"],
			dataConfidence: .7,
			notes: "Base jugable de la decada de 1990. Ratings calibrados por transicion post-Clemente, ciclo Heynckes, aparicion de Julen Guerrero, subcampeonato 1997/98 y bloque Etxeberria-Urzaiz; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Lafuente",
				season: "1999/00",
				positions: ["POR"],
				overall: 78,
				sourceRefs: ["athletic-official-1999-00-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Iru",
				season: "1999/00",
				positions: ["POR"],
				overall: 76,
				sourceRefs: ["athletic-official-1999-00-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Lacruz",
				season: "1999/00",
				positions: ["DFC", "LD"],
				overall: 81,
				sourceRefs: ["athletic-official-1999-00-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["DFC-D", "LD"]
			}),
			makePlayer({
				name: "Aitor Ocio",
				season: "1999/00",
				positions: ["DFC"],
				overall: 79,
				sourceRefs: ["athletic-official-1999-00-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Larrazabal",
				season: "1999/00",
				positions: ["LI", "MI"],
				overall: 79,
				sourceRefs: ["athletic-official-1999-00-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["LI", "MI"]
			}),
			makePlayer({
				name: "Felipe",
				season: "1999/00",
				positions: ["LD", "DFC"],
				overall: 78,
				sourceRefs: ["athletic-official-1999-00-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["LD", "DFC-D"]
			}),
			makePlayer({
				name: "Urrutia",
				season: "1999/00",
				positions: ["MCD", "MC"],
				overall: 81,
				sourceRefs: ["athletic-official-1999-00-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Alkiza",
				season: "1999/00",
				positions: ["MC", "MP"],
				overall: 79,
				sourceRefs: ["athletic-official-1999-00-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Tiko",
				season: "1999/00",
				positions: ["MC", "MP"],
				overall: 80,
				sourceRefs: ["athletic-official-1999-00-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Julen Guerrero",
				season: "1999/00",
				positions: ["MP", "MC"],
				overall: 83,
				sourceRefs: ["athletic-official-1999-00-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: [
					"MP",
					"MC-I",
					"MC-D"
				]
			}),
			makePlayer({
				name: "Joseba Etxeberria",
				season: "1999/00",
				positions: ["ED", "DC"],
				overall: 86,
				sourceRefs: ["athletic-official-1999-00-squad"],
				dataConfidence: .82,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Urzaiz",
				season: "1999/00",
				positions: ["DC"],
				overall: 84,
				sourceRefs: ["athletic-official-1999-00-squad"],
				dataConfidence: .78,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Ezquerro",
				season: "1999/00",
				positions: ["EI", "SD"],
				overall: 81,
				sourceRefs: ["athletic-official-1999-00-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["EI", "SD"]
			}),
			makePlayer({
				name: "Yeste",
				season: "1999/00",
				positions: ["MP", "EI"],
				overall: 78,
				sourceRefs: ["athletic-official-1999-00-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MP", "EI"]
			}),
			makePlayer({
				name: "Bolo",
				season: "1999/00",
				positions: ["DC", "SD"],
				overall: 77,
				sourceRefs: ["athletic-official-1999-00-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["DC", "SD"]
			})
		]
	},
	{
		season: "2000/01",
		coach: makeCoach({
			name: "Txetxu Rojo",
			coachId: "txetxu_rojo",
			season: "2000/01",
			overall: 80,
			skills: {
				attack: 80,
				defense: 80,
				management: 80,
				mentality: 82,
				cup: 79,
				europe: 64
			},
			sourceRefs: ["athletic-official-2000-01-squad", "manual-athletic-2000s-coach-context"],
			dataConfidence: .64,
			notes: "Base jugable de la decada de 2000. Ratings calibrados por cambio de siglo, ciclo Heynckes-Valverde, crisis 2005/06-2006/07 y bloque Caparros con final de Copa 2008/09; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Lafuente",
				season: "2000/01",
				positions: ["POR"],
				overall: 79,
				sourceRefs: ["athletic-official-2000-01-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Iru",
				season: "2000/01",
				positions: ["POR"],
				overall: 75,
				sourceRefs: ["athletic-official-2000-01-squad"],
				dataConfidence: .54,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Lacruz",
				season: "2000/01",
				positions: ["DFC", "LD"],
				overall: 82,
				sourceRefs: ["athletic-official-2000-01-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["DFC-D", "LD"]
			}),
			makePlayer({
				name: "Aitor Ocio",
				season: "2000/01",
				positions: ["DFC"],
				overall: 80,
				sourceRefs: ["athletic-official-2000-01-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Larrazabal",
				season: "2000/01",
				positions: ["LI", "MI"],
				overall: 79,
				sourceRefs: ["athletic-official-2000-01-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["LI", "MI"]
			}),
			makePlayer({
				name: "Felipe",
				season: "2000/01",
				positions: ["LD", "DFC"],
				overall: 78,
				sourceRefs: ["athletic-official-2000-01-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["LD", "DFC-D"]
			}),
			makePlayer({
				name: "Urrutia",
				season: "2000/01",
				positions: ["MCD", "MC"],
				overall: 81,
				sourceRefs: ["athletic-official-2000-01-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Alkiza",
				season: "2000/01",
				positions: ["MC", "MP"],
				overall: 79,
				sourceRefs: ["athletic-official-2000-01-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Tiko",
				season: "2000/01",
				positions: ["MC", "MP"],
				overall: 81,
				sourceRefs: ["athletic-official-2000-01-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Julen Guerrero",
				season: "2000/01",
				positions: ["MP", "MC"],
				overall: 82,
				sourceRefs: ["athletic-official-2000-01-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"MP",
					"MC-I",
					"MC-D"
				]
			}),
			makePlayer({
				name: "Joseba Etxeberria",
				season: "2000/01",
				positions: ["ED", "DC"],
				overall: 86,
				sourceRefs: ["athletic-official-2000-01-squad"],
				dataConfidence: .82,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Urzaiz",
				season: "2000/01",
				positions: ["DC"],
				overall: 84,
				sourceRefs: ["athletic-official-2000-01-squad"],
				dataConfidence: .78,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Ezquerro",
				season: "2000/01",
				positions: ["EI", "SD"],
				overall: 81,
				sourceRefs: ["athletic-official-2000-01-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["EI", "SD"]
			}),
			makePlayer({
				name: "Yeste",
				season: "2000/01",
				positions: ["MP", "EI"],
				overall: 79,
				sourceRefs: ["athletic-official-2000-01-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["MP", "EI"]
			}),
			makePlayer({
				name: "Bolo",
				season: "2000/01",
				positions: ["DC", "SD"],
				overall: 77,
				sourceRefs: ["athletic-official-2000-01-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["DC", "SD"]
			})
		]
	},
	{
		season: "2001/02",
		coach: makeCoach({
			name: "Jupp Heynckes",
			coachId: "jupp_heynckes",
			season: "2001/02",
			overall: 83,
			skills: {
				attack: 84,
				defense: 82,
				management: 84,
				mentality: 85,
				cup: 82,
				europe: 70
			},
			sourceRefs: ["athletic-official-2001-02-squad", "manual-athletic-2000s-coach-context"],
			dataConfidence: .72,
			notes: "Base jugable de la decada de 2000. Ratings calibrados por cambio de siglo, ciclo Heynckes-Valverde, crisis 2005/06-2006/07 y bloque Caparros con final de Copa 2008/09; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Lafuente",
				season: "2001/02",
				positions: ["POR"],
				overall: 80,
				sourceRefs: ["athletic-official-2001-02-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Aranzubia",
				season: "2001/02",
				positions: ["POR"],
				overall: 76,
				sourceRefs: ["athletic-official-2001-02-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Lacruz",
				season: "2001/02",
				positions: ["DFC", "LD"],
				overall: 82,
				sourceRefs: ["athletic-official-2001-02-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["DFC-D", "LD"]
			}),
			makePlayer({
				name: "Aitor Ocio",
				season: "2001/02",
				positions: ["DFC"],
				overall: 81,
				sourceRefs: ["athletic-official-2001-02-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Del Horno",
				season: "2001/02",
				positions: ["LI", "MI"],
				overall: 78,
				sourceRefs: ["athletic-official-2001-02-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["LI", "MI"]
			}),
			makePlayer({
				name: "Felipe",
				season: "2001/02",
				positions: ["LD", "DFC"],
				overall: 77,
				sourceRefs: ["athletic-official-2001-02-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["LD", "DFC-D"]
			}),
			makePlayer({
				name: "Urrutia",
				season: "2001/02",
				positions: ["MCD", "MC"],
				overall: 80,
				sourceRefs: ["athletic-official-2001-02-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Orbaiz",
				season: "2001/02",
				positions: ["MC", "MCD"],
				overall: 80,
				sourceRefs: ["athletic-official-2001-02-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Tiko",
				season: "2001/02",
				positions: ["MC", "MP"],
				overall: 82,
				sourceRefs: ["athletic-official-2001-02-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Julen Guerrero",
				season: "2001/02",
				positions: ["MP", "MC"],
				overall: 81,
				sourceRefs: ["athletic-official-2001-02-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: [
					"MP",
					"MC-I",
					"MC-D"
				]
			}),
			makePlayer({
				name: "Joseba Etxeberria",
				season: "2001/02",
				positions: ["ED", "DC"],
				overall: 85,
				sourceRefs: ["athletic-official-2001-02-squad"],
				dataConfidence: .8,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Urzaiz",
				season: "2001/02",
				positions: ["DC"],
				overall: 84,
				sourceRefs: ["athletic-official-2001-02-squad"],
				dataConfidence: .78,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Ezquerro",
				season: "2001/02",
				positions: ["EI", "SD"],
				overall: 82,
				sourceRefs: ["athletic-official-2001-02-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["EI", "SD"]
			}),
			makePlayer({
				name: "Yeste",
				season: "2001/02",
				positions: ["MP", "EI"],
				overall: 80,
				sourceRefs: ["athletic-official-2001-02-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["MP", "EI"]
			}),
			makePlayer({
				name: "Bolo",
				season: "2001/02",
				positions: ["DC", "SD"],
				overall: 76,
				sourceRefs: ["athletic-official-2001-02-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["DC", "SD"]
			})
		]
	},
	{
		season: "2002/03",
		coach: makeCoach({
			name: "Jupp Heynckes",
			coachId: "jupp_heynckes",
			season: "2002/03",
			overall: 83,
			skills: {
				attack: 84,
				defense: 82,
				management: 84,
				mentality: 85,
				cup: 82,
				europe: 70
			},
			sourceRefs: ["athletic-official-2002-03-squad", "manual-athletic-2000s-coach-context"],
			dataConfidence: .72,
			notes: "Base jugable de la decada de 2000. Ratings calibrados por cambio de siglo, ciclo Heynckes-Valverde, crisis 2005/06-2006/07 y bloque Caparros con final de Copa 2008/09; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Aranzubia",
				season: "2002/03",
				positions: ["POR"],
				overall: 79,
				sourceRefs: ["athletic-official-2002-03-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Lafuente",
				season: "2002/03",
				positions: ["POR"],
				overall: 78,
				sourceRefs: ["athletic-official-2002-03-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Lacruz",
				season: "2002/03",
				positions: ["DFC", "LD"],
				overall: 82,
				sourceRefs: ["athletic-official-2002-03-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["DFC-D", "LD"]
			}),
			makePlayer({
				name: "Aitor Ocio",
				season: "2002/03",
				positions: ["DFC"],
				overall: 81,
				sourceRefs: ["athletic-official-2002-03-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Del Horno",
				season: "2002/03",
				positions: ["LI", "MI"],
				overall: 80,
				sourceRefs: ["athletic-official-2002-03-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["LI", "MI"]
			}),
			makePlayer({
				name: "Iraola",
				season: "2002/03",
				positions: ["LD", "MD"],
				overall: 77,
				sourceRefs: ["athletic-official-2002-03-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["LD", "MD"]
			}),
			makePlayer({
				name: "Orbaiz",
				season: "2002/03",
				positions: ["MC", "MCD"],
				overall: 82,
				sourceRefs: ["athletic-official-2002-03-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Gurpegui",
				season: "2002/03",
				positions: ["MCD", "MC"],
				overall: 78,
				sourceRefs: ["athletic-official-2002-03-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Tiko",
				season: "2002/03",
				positions: ["MC", "MP"],
				overall: 81,
				sourceRefs: ["athletic-official-2002-03-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Yeste",
				season: "2002/03",
				positions: ["MP", "EI"],
				overall: 82,
				sourceRefs: ["athletic-official-2002-03-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MP", "EI"]
			}),
			makePlayer({
				name: "Julen Guerrero",
				season: "2002/03",
				positions: ["MP", "MC"],
				overall: 80,
				sourceRefs: ["athletic-official-2002-03-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: [
					"MP",
					"MC-I",
					"MC-D"
				]
			}),
			makePlayer({
				name: "Joseba Etxeberria",
				season: "2002/03",
				positions: ["ED", "DC"],
				overall: 85,
				sourceRefs: ["athletic-official-2002-03-squad"],
				dataConfidence: .8,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Urzaiz",
				season: "2002/03",
				positions: ["DC"],
				overall: 83,
				sourceRefs: ["athletic-official-2002-03-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Ezquerro",
				season: "2002/03",
				positions: ["EI", "SD"],
				overall: 82,
				sourceRefs: ["athletic-official-2002-03-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["EI", "SD"]
			}),
			makePlayer({
				name: "Aduriz",
				season: "2002/03",
				positions: ["DC"],
				overall: 76,
				sourceRefs: ["athletic-official-2002-03-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			})
		]
	},
	{
		season: "2003/04",
		coach: makeCoach({
			name: "Ernesto Valverde",
			coachId: "ernesto_valverde",
			season: "2003/04",
			overall: 82,
			skills: {
				attack: 83,
				defense: 81,
				management: 83,
				mentality: 84,
				cup: 82,
				europe: 68
			},
			sourceRefs: ["athletic-official-2003-04-squad", "manual-athletic-2000s-coach-context"],
			dataConfidence: .7,
			notes: "Base jugable de la decada de 2000. Ratings calibrados por cambio de siglo, ciclo Heynckes-Valverde, crisis 2005/06-2006/07 y bloque Caparros con final de Copa 2008/09; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Aranzubia",
				season: "2003/04",
				positions: ["POR"],
				overall: 81,
				sourceRefs: ["athletic-official-2003-04-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Lafuente",
				season: "2003/04",
				positions: ["POR"],
				overall: 78,
				sourceRefs: ["athletic-official-2003-04-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Lacruz",
				season: "2003/04",
				positions: ["DFC", "LD"],
				overall: 82,
				sourceRefs: ["athletic-official-2003-04-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["DFC-D", "LD"]
			}),
			makePlayer({
				name: "Aitor Ocio",
				season: "2003/04",
				positions: ["DFC"],
				overall: 82,
				sourceRefs: ["athletic-official-2003-04-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Del Horno",
				season: "2003/04",
				positions: ["LI", "MI"],
				overall: 82,
				sourceRefs: ["athletic-official-2003-04-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["LI", "MI"]
			}),
			makePlayer({
				name: "Iraola",
				season: "2003/04",
				positions: ["LD", "MD"],
				overall: 80,
				sourceRefs: ["athletic-official-2003-04-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["LD", "MD"]
			}),
			makePlayer({
				name: "Orbaiz",
				season: "2003/04",
				positions: ["MC", "MCD"],
				overall: 83,
				sourceRefs: ["athletic-official-2003-04-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Gurpegui",
				season: "2003/04",
				positions: ["MCD", "MC"],
				overall: 80,
				sourceRefs: ["athletic-official-2003-04-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Tiko",
				season: "2003/04",
				positions: ["MC", "MP"],
				overall: 82,
				sourceRefs: ["athletic-official-2003-04-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Yeste",
				season: "2003/04",
				positions: ["MP", "EI"],
				overall: 84,
				sourceRefs: ["athletic-official-2003-04-squad"],
				dataConfidence: .78,
				tacticalSlotLabels: ["MP", "EI"]
			}),
			makePlayer({
				name: "Julen Guerrero",
				season: "2003/04",
				positions: ["MP", "MC"],
				overall: 79,
				sourceRefs: ["athletic-official-2003-04-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: [
					"MP",
					"MC-I",
					"MC-D"
				]
			}),
			makePlayer({
				name: "Joseba Etxeberria",
				season: "2003/04",
				positions: ["ED", "DC"],
				overall: 85,
				sourceRefs: ["athletic-official-2003-04-squad"],
				dataConfidence: .8,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Urzaiz",
				season: "2003/04",
				positions: ["DC"],
				overall: 84,
				sourceRefs: ["athletic-official-2003-04-squad"],
				dataConfidence: .78,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Ezquerro",
				season: "2003/04",
				positions: ["EI", "SD"],
				overall: 83,
				sourceRefs: ["athletic-official-2003-04-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["EI", "SD"]
			}),
			makePlayer({
				name: "Arriaga",
				season: "2003/04",
				positions: ["SD", "EI"],
				overall: 76,
				sourceRefs: ["athletic-official-2003-04-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["SD", "EI"]
			})
		]
	},
	{
		season: "2004/05",
		coach: makeCoach({
			name: "Ernesto Valverde",
			coachId: "ernesto_valverde",
			season: "2004/05",
			overall: 84,
			skills: {
				attack: 85,
				defense: 82,
				management: 84,
				mentality: 85,
				cup: 83,
				europe: 74
			},
			sourceRefs: ["athletic-official-2004-05-squad", "manual-athletic-2000s-coach-context"],
			dataConfidence: .76,
			notes: "Base jugable de la decada de 2000. Ratings calibrados por cambio de siglo, ciclo Heynckes-Valverde, crisis 2005/06-2006/07 y bloque Caparros con final de Copa 2008/09; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Aranzubia",
				season: "2004/05",
				positions: ["POR"],
				overall: 82,
				sourceRefs: ["athletic-official-2004-05-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Lafuente",
				season: "2004/05",
				positions: ["POR"],
				overall: 78,
				sourceRefs: ["athletic-official-2004-05-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Lacruz",
				season: "2004/05",
				positions: ["DFC", "LD"],
				overall: 82,
				sourceRefs: ["athletic-official-2004-05-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["DFC-D", "LD"]
			}),
			makePlayer({
				name: "Luis Prieto",
				season: "2004/05",
				positions: ["DFC"],
				overall: 80,
				sourceRefs: ["athletic-official-2004-05-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Del Horno",
				season: "2004/05",
				positions: ["LI", "MI"],
				overall: 84,
				sourceRefs: ["athletic-official-2004-05-squad"],
				dataConfidence: .78,
				tacticalSlotLabels: ["LI", "MI"]
			}),
			makePlayer({
				name: "Iraola",
				season: "2004/05",
				positions: ["LD", "MD"],
				overall: 82,
				sourceRefs: ["athletic-official-2004-05-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["LD", "MD"]
			}),
			makePlayer({
				name: "Orbaiz",
				season: "2004/05",
				positions: ["MC", "MCD"],
				overall: 84,
				sourceRefs: ["athletic-official-2004-05-squad"],
				dataConfidence: .78,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Gurpegui",
				season: "2004/05",
				positions: ["MCD", "MC"],
				overall: 81,
				sourceRefs: ["athletic-official-2004-05-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Tiko",
				season: "2004/05",
				positions: ["MC", "MP"],
				overall: 81,
				sourceRefs: ["athletic-official-2004-05-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Yeste",
				season: "2004/05",
				positions: ["MP", "EI"],
				overall: 85,
				sourceRefs: ["athletic-official-2004-05-squad"],
				dataConfidence: .8,
				tacticalSlotLabels: ["MP", "EI"]
			}),
			makePlayer({
				name: "Julen Guerrero",
				season: "2004/05",
				positions: ["MP", "MC"],
				overall: 78,
				sourceRefs: ["athletic-official-2004-05-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: [
					"MP",
					"MC-I",
					"MC-D"
				]
			}),
			makePlayer({
				name: "Joseba Etxeberria",
				season: "2004/05",
				positions: ["ED", "DC"],
				overall: 85,
				sourceRefs: ["athletic-official-2004-05-squad"],
				dataConfidence: .8,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Urzaiz",
				season: "2004/05",
				positions: ["DC"],
				overall: 84,
				sourceRefs: ["athletic-official-2004-05-squad"],
				dataConfidence: .78,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Ezquerro",
				season: "2004/05",
				positions: ["EI", "SD"],
				overall: 84,
				sourceRefs: ["athletic-official-2004-05-squad"],
				dataConfidence: .78,
				tacticalSlotLabels: ["EI", "SD"]
			}),
			makePlayer({
				name: "Llorente",
				season: "2004/05",
				positions: ["DC"],
				overall: 77,
				sourceRefs: ["athletic-official-2004-05-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			})
		]
	},
	{
		season: "2005/06",
		coach: makeCoach({
			name: "Javier Clemente",
			coachId: "javier_clemente",
			season: "2005/06",
			overall: 78,
			skills: {
				attack: 77,
				defense: 79,
				management: 80,
				mentality: 82,
				cup: 77,
				europe: 62
			},
			sourceRefs: ["athletic-official-2005-06-squad", "manual-athletic-2000s-coach-context"],
			dataConfidence: .62,
			notes: "Base jugable de la decada de 2000. Ratings calibrados por cambio de siglo, ciclo Heynckes-Valverde, crisis 2005/06-2006/07 y bloque Caparros con final de Copa 2008/09; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Aranzubia",
				season: "2005/06",
				positions: ["POR"],
				overall: 80,
				sourceRefs: ["athletic-official-2005-06-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Lafuente",
				season: "2005/06",
				positions: ["POR"],
				overall: 77,
				sourceRefs: ["athletic-official-2005-06-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Lacruz",
				season: "2005/06",
				positions: ["DFC", "LD"],
				overall: 80,
				sourceRefs: ["athletic-official-2005-06-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["DFC-D", "LD"]
			}),
			makePlayer({
				name: "Luis Prieto",
				season: "2005/06",
				positions: ["DFC"],
				overall: 79,
				sourceRefs: ["athletic-official-2005-06-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Expósito",
				season: "2005/06",
				positions: ["LI", "MI"],
				overall: 77,
				sourceRefs: ["athletic-official-2005-06-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["LI", "MI"]
			}),
			makePlayer({
				name: "Iraola",
				season: "2005/06",
				positions: ["LD", "MD"],
				overall: 83,
				sourceRefs: ["athletic-official-2005-06-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["LD", "MD"]
			}),
			makePlayer({
				name: "Orbaiz",
				season: "2005/06",
				positions: ["MC", "MCD"],
				overall: 83,
				sourceRefs: ["athletic-official-2005-06-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Gurpegui",
				season: "2005/06",
				positions: ["MCD", "MC"],
				overall: 81,
				sourceRefs: ["athletic-official-2005-06-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Tiko",
				season: "2005/06",
				positions: ["MC", "MP"],
				overall: 79,
				sourceRefs: ["athletic-official-2005-06-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Yeste",
				season: "2005/06",
				positions: ["MP", "EI"],
				overall: 84,
				sourceRefs: ["athletic-official-2005-06-squad"],
				dataConfidence: .78,
				tacticalSlotLabels: ["MP", "EI"]
			}),
			makePlayer({
				name: "Joseba Etxeberria",
				season: "2005/06",
				positions: ["ED", "DC"],
				overall: 83,
				sourceRefs: ["athletic-official-2005-06-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Urzaiz",
				season: "2005/06",
				positions: ["DC"],
				overall: 82,
				sourceRefs: ["athletic-official-2005-06-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Aduriz",
				season: "2005/06",
				positions: ["DC"],
				overall: 80,
				sourceRefs: ["athletic-official-2005-06-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Llorente",
				season: "2005/06",
				positions: ["DC"],
				overall: 79,
				sourceRefs: ["athletic-official-2005-06-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Javi Martinez",
				season: "2005/06",
				positions: ["MCD", "MC"],
				overall: 76,
				sourceRefs: ["athletic-official-2005-06-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["MCD", "MC"]
			})
		]
	},
	{
		season: "2006/07",
		coach: makeCoach({
			name: "Mané",
			coachId: "mane",
			season: "2006/07",
			overall: 78,
			skills: {
				attack: 78,
				defense: 78,
				management: 79,
				mentality: 82,
				cup: 77,
				europe: 60
			},
			sourceRefs: ["athletic-official-2006-07-squad", "manual-athletic-2000s-coach-context"],
			dataConfidence: .6,
			notes: "Base jugable de la decada de 2000. Ratings calibrados por cambio de siglo, ciclo Heynckes-Valverde, crisis 2005/06-2006/07 y bloque Caparros con final de Copa 2008/09; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Aranzubia",
				season: "2006/07",
				positions: ["POR"],
				overall: 79,
				sourceRefs: ["athletic-official-2006-07-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Lafuente",
				season: "2006/07",
				positions: ["POR"],
				overall: 77,
				sourceRefs: ["athletic-official-2006-07-squad"],
				dataConfidence: .58,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Amorebieta",
				season: "2006/07",
				positions: ["DFC"],
				overall: 80,
				sourceRefs: ["athletic-official-2006-07-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["DFC-C", "DFC-I"]
			}),
			makePlayer({
				name: "Luis Prieto",
				season: "2006/07",
				positions: ["DFC"],
				overall: 79,
				sourceRefs: ["athletic-official-2006-07-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Koikili",
				season: "2006/07",
				positions: ["LI", "MI"],
				overall: 76,
				sourceRefs: ["athletic-official-2006-07-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["LI", "MI"]
			}),
			makePlayer({
				name: "Iraola",
				season: "2006/07",
				positions: ["LD", "MD"],
				overall: 83,
				sourceRefs: ["athletic-official-2006-07-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["LD", "MD"]
			}),
			makePlayer({
				name: "Orbaiz",
				season: "2006/07",
				positions: ["MC", "MCD"],
				overall: 82,
				sourceRefs: ["athletic-official-2006-07-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Gurpegui",
				season: "2006/07",
				positions: ["MCD", "MC"],
				overall: 80,
				sourceRefs: ["athletic-official-2006-07-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Javi Martinez",
				season: "2006/07",
				positions: ["MCD", "MC"],
				overall: 80,
				sourceRefs: ["athletic-official-2006-07-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Yeste",
				season: "2006/07",
				positions: ["MP", "EI"],
				overall: 83,
				sourceRefs: ["athletic-official-2006-07-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["MP", "EI"]
			}),
			makePlayer({
				name: "Joseba Etxeberria",
				season: "2006/07",
				positions: ["ED", "DC"],
				overall: 82,
				sourceRefs: ["athletic-official-2006-07-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Aduriz",
				season: "2006/07",
				positions: ["DC"],
				overall: 82,
				sourceRefs: ["athletic-official-2006-07-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Llorente",
				season: "2006/07",
				positions: ["DC"],
				overall: 81,
				sourceRefs: ["athletic-official-2006-07-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Gabilondo",
				season: "2006/07",
				positions: ["EI", "MI"],
				overall: 79,
				sourceRefs: ["athletic-official-2006-07-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Susaeta",
				season: "2006/07",
				positions: ["ED", "MD"],
				overall: 76,
				sourceRefs: ["athletic-official-2006-07-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["ED", "MD"]
			})
		]
	},
	{
		season: "2007/08",
		coach: makeCoach({
			name: "Joaquín Caparrós",
			coachId: "joaquin_caparros",
			season: "2007/08",
			overall: 81,
			skills: {
				attack: 80,
				defense: 82,
				management: 82,
				mentality: 84,
				cup: 81,
				europe: 64
			},
			sourceRefs: ["athletic-official-2007-08-squad", "manual-athletic-2000s-coach-context"],
			dataConfidence: .68,
			notes: "Base jugable de la decada de 2000. Ratings calibrados por cambio de siglo, ciclo Heynckes-Valverde, crisis 2005/06-2006/07 y bloque Caparros con final de Copa 2008/09; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Aranzubia",
				season: "2007/08",
				positions: ["POR"],
				overall: 78,
				sourceRefs: ["athletic-official-2007-08-squad"],
				dataConfidence: .62,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Iraizoz",
				season: "2007/08",
				positions: ["POR"],
				overall: 80,
				sourceRefs: ["athletic-official-2007-08-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Amorebieta",
				season: "2007/08",
				positions: ["DFC"],
				overall: 82,
				sourceRefs: ["athletic-official-2007-08-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["DFC-C", "DFC-I"]
			}),
			makePlayer({
				name: "Aitor Ocio",
				season: "2007/08",
				positions: ["DFC"],
				overall: 80,
				sourceRefs: ["athletic-official-2007-08-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["DFC-C"]
			}),
			makePlayer({
				name: "Koikili",
				season: "2007/08",
				positions: ["LI", "MI"],
				overall: 78,
				sourceRefs: ["athletic-official-2007-08-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["LI", "MI"]
			}),
			makePlayer({
				name: "Iraola",
				season: "2007/08",
				positions: ["LD", "MD"],
				overall: 84,
				sourceRefs: ["athletic-official-2007-08-squad"],
				dataConfidence: .78,
				tacticalSlotLabels: ["LD", "MD"]
			}),
			makePlayer({
				name: "Orbaiz",
				season: "2007/08",
				positions: ["MC", "MCD"],
				overall: 82,
				sourceRefs: ["athletic-official-2007-08-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Gurpegui",
				season: "2007/08",
				positions: ["MCD", "MC"],
				overall: 80,
				sourceRefs: ["athletic-official-2007-08-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Javi Martinez",
				season: "2007/08",
				positions: ["MCD", "MC"],
				overall: 82,
				sourceRefs: ["athletic-official-2007-08-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Yeste",
				season: "2007/08",
				positions: ["MP", "EI"],
				overall: 83,
				sourceRefs: ["athletic-official-2007-08-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["MP", "EI"]
			}),
			makePlayer({
				name: "Joseba Etxeberria",
				season: "2007/08",
				positions: ["ED", "DC"],
				overall: 80,
				sourceRefs: ["athletic-official-2007-08-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["ED", "DC-D"]
			}),
			makePlayer({
				name: "Llorente",
				season: "2007/08",
				positions: ["DC"],
				overall: 83,
				sourceRefs: ["athletic-official-2007-08-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Aduriz",
				season: "2007/08",
				positions: ["DC"],
				overall: 81,
				sourceRefs: ["athletic-official-2007-08-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Gabilondo",
				season: "2007/08",
				positions: ["EI", "MI"],
				overall: 80,
				sourceRefs: ["athletic-official-2007-08-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Susaeta",
				season: "2007/08",
				positions: ["ED", "MD"],
				overall: 78,
				sourceRefs: ["athletic-official-2007-08-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["ED", "MD"]
			})
		]
	},
	{
		season: "2009/10",
		coach: makeCoach({
			name: "Joaquín Caparrós",
			coachId: "joaquin_caparros",
			season: "2009/10",
			overall: 82,
			skills: {
				attack: 81,
				defense: 83,
				management: 83,
				mentality: 85,
				cup: 82,
				europe: 70
			},
			sourceRefs: ["athletic-official-2009-10-squad", "manual-athletic-2000s-coach-context"],
			dataConfidence: .7,
			notes: "Base jugable de la decada de 2000. Ratings calibrados por cambio de siglo, ciclo Heynckes-Valverde, crisis 2005/06-2006/07 y bloque Caparros con final de Copa 2008/09; pendientes de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Iraizoz",
				season: "2009/10",
				positions: ["POR"],
				overall: 82,
				sourceRefs: ["athletic-official-2009-10-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Armando",
				season: "2009/10",
				positions: ["POR"],
				overall: 76,
				sourceRefs: ["athletic-official-2009-10-squad"],
				dataConfidence: .56,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Amorebieta",
				season: "2009/10",
				positions: ["DFC"],
				overall: 83,
				sourceRefs: ["athletic-official-2009-10-squad"],
				dataConfidence: .74,
				tacticalSlotLabels: ["DFC-C", "DFC-I"]
			}),
			makePlayer({
				name: "San Jose",
				season: "2009/10",
				positions: ["DFC", "MCD"],
				overall: 79,
				sourceRefs: ["athletic-official-2009-10-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["DFC-C", "MCD"]
			}),
			makePlayer({
				name: "Koikili",
				season: "2009/10",
				positions: ["LI", "MI"],
				overall: 78,
				sourceRefs: ["athletic-official-2009-10-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["LI", "MI"]
			}),
			makePlayer({
				name: "Iraola",
				season: "2009/10",
				positions: ["LD", "MD"],
				overall: 84,
				sourceRefs: ["athletic-official-2009-10-squad"],
				dataConfidence: .78,
				tacticalSlotLabels: ["LD", "MD"]
			}),
			makePlayer({
				name: "Orbaiz",
				season: "2009/10",
				positions: ["MC", "MCD"],
				overall: 81,
				sourceRefs: ["athletic-official-2009-10-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Gurpegui",
				season: "2009/10",
				positions: ["MCD", "MC"],
				overall: 81,
				sourceRefs: ["athletic-official-2009-10-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Javi Martinez",
				season: "2009/10",
				positions: ["MCD", "MC"],
				overall: 84,
				sourceRefs: ["athletic-official-2009-10-squad"],
				dataConfidence: .78,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Yeste",
				season: "2009/10",
				positions: ["MP", "EI"],
				overall: 81,
				sourceRefs: ["athletic-official-2009-10-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["MP", "EI"]
			}),
			makePlayer({
				name: "Susaeta",
				season: "2009/10",
				positions: ["ED", "MD"],
				overall: 81,
				sourceRefs: ["athletic-official-2009-10-squad"],
				dataConfidence: .68,
				tacticalSlotLabels: ["ED", "MD"]
			}),
			makePlayer({
				name: "Muniain",
				season: "2009/10",
				positions: ["EI", "MP"],
				overall: 78,
				sourceRefs: ["athletic-official-2009-10-squad"],
				dataConfidence: .6,
				tacticalSlotLabels: ["EI", "MP"]
			}),
			makePlayer({
				name: "Llorente",
				season: "2009/10",
				positions: ["DC"],
				overall: 85,
				sourceRefs: ["athletic-official-2009-10-squad"],
				dataConfidence: .8,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Toquero",
				season: "2009/10",
				positions: ["SD", "DC"],
				overall: 80,
				sourceRefs: ["athletic-official-2009-10-squad"],
				dataConfidence: .66,
				tacticalSlotLabels: ["SD", "DC"]
			}),
			makePlayer({
				name: "Gabilondo",
				season: "2009/10",
				positions: ["EI", "MI"],
				overall: 79,
				sourceRefs: ["athletic-official-2009-10-squad"],
				dataConfidence: .64,
				tacticalSlotLabels: ["EI", "MI"]
			})
		]
	},
	{
		season: "2010/11",
		coach: makeCoach({
			name: "Joaquín Caparrós",
			coachId: "joaquin_caparros",
			season: "2010/11",
			overall: 82,
			skills: {
				attack: 82,
				defense: 82,
				management: 82,
				mentality: 83,
				cup: 82,
				europe: 76
			},
			sourceRefs: ["athletic-official-2010-11-squad", "manual-athletic-2010s-coach-context"],
			dataConfidence: .72,
			notes: "Base jugable de la decada de 2010. Pendiente de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Iraizoz",
				season: "2010/11",
				positions: ["POR"],
				overall: 82,
				sourceRefs: ["athletic-official-2010-11-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Raul",
				season: "2010/11",
				positions: ["POR"],
				overall: 74,
				sourceRefs: ["athletic-official-2010-11-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Amorebieta",
				season: "2010/11",
				positions: ["DFC"],
				overall: 83,
				sourceRefs: ["athletic-official-2010-11-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"DFC-C",
					"DFC-I",
					"DFC-D"
				]
			}),
			makePlayer({
				name: "San Jose",
				season: "2010/11",
				positions: ["DFC", "MCD"],
				overall: 81,
				sourceRefs: ["athletic-official-2010-11-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"DFC-C",
					"DFC-I",
					"DFC-D",
					"MCD"
				]
			}),
			makePlayer({
				name: "Aurtenetxe",
				season: "2010/11",
				positions: ["LI", "DFC"],
				overall: 78,
				sourceRefs: ["athletic-official-2010-11-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"LI",
					"DFC-C",
					"DFC-I",
					"DFC-D"
				]
			}),
			makePlayer({
				name: "Iraola",
				season: "2010/11",
				positions: ["LD", "MD"],
				overall: 85,
				sourceRefs: ["athletic-official-2010-11-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["LD", "MD"]
			}),
			makePlayer({
				name: "Orbaiz",
				season: "2010/11",
				positions: ["MC", "MCD"],
				overall: 80,
				sourceRefs: ["athletic-official-2010-11-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Gurpegui",
				season: "2010/11",
				positions: ["MCD", "MC"],
				overall: 81,
				sourceRefs: ["athletic-official-2010-11-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Javi Martinez",
				season: "2010/11",
				positions: [
					"MCD",
					"MC",
					"DFC"
				],
				overall: 85,
				sourceRefs: ["athletic-official-2010-11-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"MCD",
					"MC",
					"DFC-C",
					"DFC-I",
					"DFC-D"
				]
			}),
			makePlayer({
				name: "Muniain",
				season: "2010/11",
				positions: ["EI", "MP"],
				overall: 81,
				sourceRefs: ["athletic-official-2010-11-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["EI", "MP"]
			}),
			makePlayer({
				name: "Susaeta",
				season: "2010/11",
				positions: ["ED", "MD"],
				overall: 82,
				sourceRefs: ["athletic-official-2010-11-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["ED", "MD"]
			}),
			makePlayer({
				name: "David Lopez",
				season: "2010/11",
				positions: [
					"EI",
					"MI",
					"MP"
				],
				overall: 80,
				sourceRefs: ["athletic-official-2010-11-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"EI",
					"MI",
					"MP"
				]
			}),
			makePlayer({
				name: "Llorente",
				season: "2010/11",
				positions: ["DC"],
				overall: 86,
				sourceRefs: ["athletic-official-2010-11-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Toquero",
				season: "2010/11",
				positions: ["SD", "DC"],
				overall: 80,
				sourceRefs: ["athletic-official-2010-11-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"SD",
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Gabilondo",
				season: "2010/11",
				positions: ["EI", "MI"],
				overall: 79,
				sourceRefs: ["athletic-official-2010-11-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["EI", "MI"]
			})
		]
	},
	{
		season: "2012/13",
		coach: makeCoach({
			name: "Marcelo Bielsa",
			coachId: "marcelo_bielsa",
			season: "2012/13",
			overall: 82,
			skills: {
				attack: 82,
				defense: 82,
				management: 82,
				mentality: 83,
				cup: 82,
				europe: 76
			},
			sourceRefs: ["athletic-official-2012-13-squad", "manual-athletic-2010s-coach-context"],
			dataConfidence: .72,
			notes: "Base jugable de la decada de 2010. Pendiente de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Iraizoz",
				season: "2012/13",
				positions: ["POR"],
				overall: 81,
				sourceRefs: ["athletic-official-2012-13-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Raul",
				season: "2012/13",
				positions: ["POR"],
				overall: 75,
				sourceRefs: ["athletic-official-2012-13-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Amorebieta",
				season: "2012/13",
				positions: ["DFC"],
				overall: 82,
				sourceRefs: ["athletic-official-2012-13-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"DFC-C",
					"DFC-I",
					"DFC-D"
				]
			}),
			makePlayer({
				name: "San Jose",
				season: "2012/13",
				positions: ["DFC", "MCD"],
				overall: 82,
				sourceRefs: ["athletic-official-2012-13-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"DFC-C",
					"DFC-I",
					"DFC-D",
					"MCD"
				]
			}),
			makePlayer({
				name: "Aurtenetxe",
				season: "2012/13",
				positions: ["LI", "DFC"],
				overall: 80,
				sourceRefs: ["athletic-official-2012-13-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"LI",
					"DFC-C",
					"DFC-I",
					"DFC-D"
				]
			}),
			makePlayer({
				name: "Iraola",
				season: "2012/13",
				positions: ["LD", "MD"],
				overall: 84,
				sourceRefs: ["athletic-official-2012-13-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["LD", "MD"]
			}),
			makePlayer({
				name: "Iturraspe",
				season: "2012/13",
				positions: ["MCD", "MC"],
				overall: 82,
				sourceRefs: ["athletic-official-2012-13-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "De Marcos",
				season: "2012/13",
				positions: [
					"MC",
					"MD",
					"LD"
				],
				overall: 82,
				sourceRefs: ["athletic-official-2012-13-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"MC",
					"MD",
					"LD"
				]
			}),
			makePlayer({
				name: "Herrera",
				season: "2012/13",
				positions: ["MC", "MP"],
				overall: 84,
				sourceRefs: ["athletic-official-2012-13-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Muniain",
				season: "2012/13",
				positions: ["EI", "MP"],
				overall: 83,
				sourceRefs: ["athletic-official-2012-13-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["EI", "MP"]
			}),
			makePlayer({
				name: "Susaeta",
				season: "2012/13",
				positions: ["ED", "MD"],
				overall: 83,
				sourceRefs: ["athletic-official-2012-13-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["ED", "MD"]
			}),
			makePlayer({
				name: "Ibai Gomez",
				season: "2012/13",
				positions: ["EI", "MI"],
				overall: 80,
				sourceRefs: ["athletic-official-2012-13-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Aduriz",
				season: "2012/13",
				positions: ["DC"],
				overall: 84,
				sourceRefs: ["athletic-official-2012-13-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Llorente",
				season: "2012/13",
				positions: ["DC"],
				overall: 82,
				sourceRefs: ["athletic-official-2012-13-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Toquero",
				season: "2012/13",
				positions: ["SD", "DC"],
				overall: 78,
				sourceRefs: ["athletic-official-2012-13-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"SD",
					"DC",
					"DC-I",
					"DC-D"
				]
			})
		]
	},
	{
		season: "2014/15",
		coach: makeCoach({
			name: "Ernesto Valverde",
			coachId: "ernesto_valverde",
			season: "2014/15",
			overall: 84,
			skills: {
				attack: 84,
				defense: 84,
				management: 84,
				mentality: 85,
				cup: 84,
				europe: 78
			},
			sourceRefs: ["athletic-official-2014-15-squad", "manual-athletic-2010s-coach-context"],
			dataConfidence: .72,
			notes: "Base jugable de la decada de 2010. Pendiente de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Iraizoz",
				season: "2014/15",
				positions: ["POR"],
				overall: 82,
				sourceRefs: ["athletic-official-2014-15-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Herrerin",
				season: "2014/15",
				positions: ["POR"],
				overall: 76,
				sourceRefs: ["athletic-official-2014-15-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Laporte",
				season: "2014/15",
				positions: ["DFC"],
				overall: 84,
				sourceRefs: ["athletic-official-2014-15-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"DFC-C",
					"DFC-I",
					"DFC-D"
				]
			}),
			makePlayer({
				name: "San Jose",
				season: "2014/15",
				positions: ["DFC", "MCD"],
				overall: 82,
				sourceRefs: ["athletic-official-2014-15-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"DFC-C",
					"DFC-I",
					"DFC-D",
					"MCD"
				]
			}),
			makePlayer({
				name: "Balenziaga",
				season: "2014/15",
				positions: ["LI"],
				overall: 81,
				sourceRefs: ["athletic-official-2014-15-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["LI"]
			}),
			makePlayer({
				name: "De Marcos",
				season: "2014/15",
				positions: [
					"LD",
					"MD",
					"MC"
				],
				overall: 83,
				sourceRefs: ["athletic-official-2014-15-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"LD",
					"MD",
					"MC"
				]
			}),
			makePlayer({
				name: "Iturraspe",
				season: "2014/15",
				positions: ["MCD", "MC"],
				overall: 83,
				sourceRefs: ["athletic-official-2014-15-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Beñat",
				season: "2014/15",
				positions: ["MC", "MCD"],
				overall: 82,
				sourceRefs: ["athletic-official-2014-15-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Rico",
				season: "2014/15",
				positions: ["MC", "MCD"],
				overall: 81,
				sourceRefs: ["athletic-official-2014-15-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Muniain",
				season: "2014/15",
				positions: ["EI", "MP"],
				overall: 84,
				sourceRefs: ["athletic-official-2014-15-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["EI", "MP"]
			}),
			makePlayer({
				name: "Susaeta",
				season: "2014/15",
				positions: ["ED", "MD"],
				overall: 82,
				sourceRefs: ["athletic-official-2014-15-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["ED", "MD"]
			}),
			makePlayer({
				name: "Ibai Gomez",
				season: "2014/15",
				positions: ["EI", "MI"],
				overall: 80,
				sourceRefs: ["athletic-official-2014-15-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Aduriz",
				season: "2014/15",
				positions: ["DC"],
				overall: 86,
				sourceRefs: ["athletic-official-2014-15-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Williams",
				season: "2014/15",
				positions: ["ED", "DC"],
				overall: 78,
				sourceRefs: ["athletic-official-2014-15-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"ED",
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Toquero",
				season: "2014/15",
				positions: ["SD", "DC"],
				overall: 77,
				sourceRefs: ["athletic-official-2014-15-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"SD",
					"DC",
					"DC-I",
					"DC-D"
				]
			})
		]
	},
	{
		season: "2016/17",
		coach: makeCoach({
			name: "Ernesto Valverde",
			coachId: "ernesto_valverde",
			season: "2016/17",
			overall: 85,
			skills: {
				attack: 85,
				defense: 85,
				management: 85,
				mentality: 86,
				cup: 85,
				europe: 79
			},
			sourceRefs: ["athletic-official-2016-17-squad", "manual-athletic-2010s-coach-context"],
			dataConfidence: .72,
			notes: "Base jugable de la decada de 2010. Pendiente de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Iraizoz",
				season: "2016/17",
				positions: ["POR"],
				overall: 80,
				sourceRefs: ["athletic-official-2016-17-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Kepa",
				season: "2016/17",
				positions: ["POR"],
				overall: 80,
				sourceRefs: ["athletic-official-2016-17-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Laporte",
				season: "2016/17",
				positions: ["DFC"],
				overall: 86,
				sourceRefs: ["athletic-official-2016-17-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"DFC-C",
					"DFC-I",
					"DFC-D"
				]
			}),
			makePlayer({
				name: "Yeray",
				season: "2016/17",
				positions: ["DFC"],
				overall: 82,
				sourceRefs: ["athletic-official-2016-17-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"DFC-C",
					"DFC-I",
					"DFC-D"
				]
			}),
			makePlayer({
				name: "Balenziaga",
				season: "2016/17",
				positions: ["LI"],
				overall: 81,
				sourceRefs: ["athletic-official-2016-17-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["LI"]
			}),
			makePlayer({
				name: "De Marcos",
				season: "2016/17",
				positions: [
					"LD",
					"MD",
					"MC"
				],
				overall: 83,
				sourceRefs: ["athletic-official-2016-17-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"LD",
					"MD",
					"MC"
				]
			}),
			makePlayer({
				name: "Iturraspe",
				season: "2016/17",
				positions: ["MCD", "MC"],
				overall: 80,
				sourceRefs: ["athletic-official-2016-17-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Beñat",
				season: "2016/17",
				positions: ["MC", "MCD"],
				overall: 83,
				sourceRefs: ["athletic-official-2016-17-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Raul Garcia",
				season: "2016/17",
				positions: [
					"MP",
					"MC",
					"SD"
				],
				overall: 84,
				sourceRefs: ["athletic-official-2016-17-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"MP",
					"MC",
					"SD"
				]
			}),
			makePlayer({
				name: "Muniain",
				season: "2016/17",
				positions: ["EI", "MP"],
				overall: 84,
				sourceRefs: ["athletic-official-2016-17-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["EI", "MP"]
			}),
			makePlayer({
				name: "Susaeta",
				season: "2016/17",
				positions: ["ED", "MD"],
				overall: 82,
				sourceRefs: ["athletic-official-2016-17-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["ED", "MD"]
			}),
			makePlayer({
				name: "Williams",
				season: "2016/17",
				positions: ["ED", "DC"],
				overall: 83,
				sourceRefs: ["athletic-official-2016-17-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"ED",
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Aduriz",
				season: "2016/17",
				positions: ["DC"],
				overall: 88,
				sourceRefs: ["athletic-official-2016-17-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Mikel Rico",
				season: "2016/17",
				positions: ["MC", "MCD"],
				overall: 80,
				sourceRefs: ["athletic-official-2016-17-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Sabin Merino",
				season: "2016/17",
				positions: ["EI", "DC"],
				overall: 78,
				sourceRefs: ["athletic-official-2016-17-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"EI",
					"DC",
					"DC-I",
					"DC-D"
				]
			})
		]
	},
	{
		season: "2017/18",
		coach: makeCoach({
			name: "José Ángel Ziganda",
			coachId: "jose_angel_ziganda",
			season: "2017/18",
			overall: 79,
			skills: {
				attack: 79,
				defense: 79,
				management: 79,
				mentality: 80,
				cup: 79,
				europe: 73
			},
			sourceRefs: ["athletic-official-2017-18-squad", "manual-athletic-2010s-coach-context"],
			dataConfidence: .72,
			notes: "Base jugable de la decada de 2010. Pendiente de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Kepa",
				season: "2017/18",
				positions: ["POR"],
				overall: 84,
				sourceRefs: ["athletic-official-2017-18-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Herrerin",
				season: "2017/18",
				positions: ["POR"],
				overall: 77,
				sourceRefs: ["athletic-official-2017-18-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Laporte",
				season: "2017/18",
				positions: ["DFC"],
				overall: 86,
				sourceRefs: ["athletic-official-2017-18-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"DFC-C",
					"DFC-I",
					"DFC-D"
				]
			}),
			makePlayer({
				name: "Yeray",
				season: "2017/18",
				positions: ["DFC"],
				overall: 82,
				sourceRefs: ["athletic-official-2017-18-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"DFC-C",
					"DFC-I",
					"DFC-D"
				]
			}),
			makePlayer({
				name: "Balenziaga",
				season: "2017/18",
				positions: ["LI"],
				overall: 80,
				sourceRefs: ["athletic-official-2017-18-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["LI"]
			}),
			makePlayer({
				name: "De Marcos",
				season: "2017/18",
				positions: [
					"LD",
					"MD",
					"MC"
				],
				overall: 82,
				sourceRefs: ["athletic-official-2017-18-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"LD",
					"MD",
					"MC"
				]
			}),
			makePlayer({
				name: "Iturraspe",
				season: "2017/18",
				positions: ["MCD", "MC"],
				overall: 79,
				sourceRefs: ["athletic-official-2017-18-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Beñat",
				season: "2017/18",
				positions: ["MC", "MCD"],
				overall: 82,
				sourceRefs: ["athletic-official-2017-18-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Raul Garcia",
				season: "2017/18",
				positions: [
					"MP",
					"MC",
					"SD"
				],
				overall: 84,
				sourceRefs: ["athletic-official-2017-18-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"MP",
					"MC",
					"SD"
				]
			}),
			makePlayer({
				name: "Muniain",
				season: "2017/18",
				positions: ["EI", "MP"],
				overall: 82,
				sourceRefs: ["athletic-official-2017-18-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["EI", "MP"]
			}),
			makePlayer({
				name: "Susaeta",
				season: "2017/18",
				positions: ["ED", "MD"],
				overall: 81,
				sourceRefs: ["athletic-official-2017-18-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["ED", "MD"]
			}),
			makePlayer({
				name: "Williams",
				season: "2017/18",
				positions: ["ED", "DC"],
				overall: 84,
				sourceRefs: ["athletic-official-2017-18-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"ED",
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Aduriz",
				season: "2017/18",
				positions: ["DC"],
				overall: 86,
				sourceRefs: ["athletic-official-2017-18-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Cordoba",
				season: "2017/18",
				positions: ["EI", "MI"],
				overall: 78,
				sourceRefs: ["athletic-official-2017-18-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Vesga",
				season: "2017/18",
				positions: ["MCD", "MC"],
				overall: 77,
				sourceRefs: ["athletic-official-2017-18-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MCD", "MC"]
			})
		]
	},
	{
		season: "2018/19",
		coach: makeCoach({
			name: "Gaizka Garitano",
			coachId: "gaizka_garitano",
			season: "2018/19",
			overall: 81,
			skills: {
				attack: 81,
				defense: 81,
				management: 81,
				mentality: 82,
				cup: 81,
				europe: 75
			},
			sourceRefs: ["athletic-official-2018-19-squad", "manual-athletic-2010s-coach-context"],
			dataConfidence: .72,
			notes: "Base jugable de la decada de 2010. Pendiente de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Herrerin",
				season: "2018/19",
				positions: ["POR"],
				overall: 79,
				sourceRefs: ["athletic-official-2018-19-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Unai Simon",
				season: "2018/19",
				positions: ["POR"],
				overall: 80,
				sourceRefs: ["athletic-official-2018-19-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Iñigo Martínez",
				season: "2018/19",
				positions: ["DFC"],
				overall: 85,
				sourceRefs: ["athletic-official-2018-19-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"DFC-C",
					"DFC-I",
					"DFC-D"
				]
			}),
			makePlayer({
				name: "Yeray",
				season: "2018/19",
				positions: ["DFC"],
				overall: 84,
				sourceRefs: ["athletic-official-2018-19-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"DFC-C",
					"DFC-I",
					"DFC-D"
				]
			}),
			makePlayer({
				name: "Yuri",
				season: "2018/19",
				positions: ["LI", "MI"],
				overall: 84,
				sourceRefs: ["athletic-official-2018-19-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["LI", "MI"]
			}),
			makePlayer({
				name: "Capa",
				season: "2018/19",
				positions: ["LD", "MD"],
				overall: 82,
				sourceRefs: ["athletic-official-2018-19-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["LD", "MD"]
			}),
			makePlayer({
				name: "Dani Garcia",
				season: "2018/19",
				positions: ["MCD", "MC"],
				overall: 82,
				sourceRefs: ["athletic-official-2018-19-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Beñat",
				season: "2018/19",
				positions: ["MC", "MCD"],
				overall: 81,
				sourceRefs: ["athletic-official-2018-19-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Raul Garcia",
				season: "2018/19",
				positions: [
					"MP",
					"MC",
					"SD"
				],
				overall: 84,
				sourceRefs: ["athletic-official-2018-19-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"MP",
					"MC",
					"SD"
				]
			}),
			makePlayer({
				name: "Muniain",
				season: "2018/19",
				positions: ["EI", "MP"],
				overall: 84,
				sourceRefs: ["athletic-official-2018-19-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["EI", "MP"]
			}),
			makePlayer({
				name: "Williams",
				season: "2018/19",
				positions: ["ED", "DC"],
				overall: 85,
				sourceRefs: ["athletic-official-2018-19-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"ED",
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Cordoba",
				season: "2018/19",
				positions: ["EI", "MI"],
				overall: 79,
				sourceRefs: ["athletic-official-2018-19-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Aduriz",
				season: "2018/19",
				positions: ["DC"],
				overall: 83,
				sourceRefs: ["athletic-official-2018-19-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "San Jose",
				season: "2018/19",
				positions: ["DFC", "MCD"],
				overall: 79,
				sourceRefs: ["athletic-official-2018-19-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"DFC-C",
					"DFC-I",
					"DFC-D",
					"MCD"
				]
			}),
			makePlayer({
				name: "Unai Lopez",
				season: "2018/19",
				positions: ["MC", "MP"],
				overall: 78,
				sourceRefs: ["athletic-official-2018-19-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MC", "MP"]
			})
		]
	},
	{
		season: "2019/20",
		coach: makeCoach({
			name: "Gaizka Garitano",
			coachId: "gaizka_garitano",
			season: "2019/20",
			overall: 82,
			skills: {
				attack: 82,
				defense: 82,
				management: 82,
				mentality: 83,
				cup: 82,
				europe: 76
			},
			sourceRefs: ["athletic-official-2019-20-squad", "manual-athletic-2010s-coach-context"],
			dataConfidence: .72,
			notes: "Base jugable de la decada de 2010. Pendiente de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Unai Simon",
				season: "2019/20",
				positions: ["POR"],
				overall: 83,
				sourceRefs: ["athletic-official-2019-20-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Herrerin",
				season: "2019/20",
				positions: ["POR"],
				overall: 77,
				sourceRefs: ["athletic-official-2019-20-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Iñigo Martínez",
				season: "2019/20",
				positions: ["DFC"],
				overall: 86,
				sourceRefs: ["athletic-official-2019-20-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"DFC-C",
					"DFC-I",
					"DFC-D"
				]
			}),
			makePlayer({
				name: "Yeray",
				season: "2019/20",
				positions: ["DFC"],
				overall: 84,
				sourceRefs: ["athletic-official-2019-20-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"DFC-C",
					"DFC-I",
					"DFC-D"
				]
			}),
			makePlayer({
				name: "Yuri",
				season: "2019/20",
				positions: ["LI", "MI"],
				overall: 85,
				sourceRefs: ["athletic-official-2019-20-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["LI", "MI"]
			}),
			makePlayer({
				name: "Capa",
				season: "2019/20",
				positions: ["LD", "MD"],
				overall: 83,
				sourceRefs: ["athletic-official-2019-20-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["LD", "MD"]
			}),
			makePlayer({
				name: "Dani Garcia",
				season: "2019/20",
				positions: ["MCD", "MC"],
				overall: 82,
				sourceRefs: ["athletic-official-2019-20-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Unai Lopez",
				season: "2019/20",
				positions: ["MC", "MP"],
				overall: 80,
				sourceRefs: ["athletic-official-2019-20-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Raul Garcia",
				season: "2019/20",
				positions: [
					"MP",
					"MC",
					"SD"
				],
				overall: 84,
				sourceRefs: ["athletic-official-2019-20-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"MP",
					"MC",
					"SD"
				]
			}),
			makePlayer({
				name: "Muniain",
				season: "2019/20",
				positions: ["EI", "MP"],
				overall: 84,
				sourceRefs: ["athletic-official-2019-20-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["EI", "MP"]
			}),
			makePlayer({
				name: "Williams",
				season: "2019/20",
				positions: ["ED", "DC"],
				overall: 85,
				sourceRefs: ["athletic-official-2019-20-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"ED",
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Cordoba",
				season: "2019/20",
				positions: ["EI", "MI"],
				overall: 78,
				sourceRefs: ["athletic-official-2019-20-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Villalibre",
				season: "2019/20",
				positions: ["DC"],
				overall: 78,
				sourceRefs: ["athletic-official-2019-20-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Ibai Gomez",
				season: "2019/20",
				positions: ["EI", "MI"],
				overall: 79,
				sourceRefs: ["athletic-official-2019-20-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["EI", "MI"]
			}),
			makePlayer({
				name: "Vesga",
				season: "2019/20",
				positions: ["MCD", "MC"],
				overall: 78,
				sourceRefs: ["athletic-official-2019-20-squad"],
				dataConfidence: .7,
				tacticalSlotLabels: ["MCD", "MC"]
			})
		]
	},
	{
		season: "2021/22",
		coach: makeCoach({
			name: "Marcelino",
			coachId: "marcelino_garcia_toral",
			season: "2021/22",
			overall: 83,
			skills: {
				attack: 82,
				defense: 84,
				management: 84,
				mentality: 86,
				cup: 84,
				europe: 72
			},
			sourceRefs: ["athletic-official-2021-22-squad", "manual-athletic-2020s-context"],
			dataConfidence: .74,
			notes: "Base jugable del bloque 2020s. Ratings calibrados por rendimiento reciente, Copa 2023/24, contexto europeo y continuidad del bloque Valverde. Pendiente de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Unai Simon",
				season: "2021/22",
				positions: ["POR"],
				overall: 84,
				sourceRefs: ["athletic-official-2021-22-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Agirrezabala",
				season: "2021/22",
				positions: ["POR"],
				overall: 77,
				sourceRefs: ["athletic-official-2021-22-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Iñigo Martínez",
				season: "2021/22",
				positions: ["DFC"],
				overall: 86,
				sourceRefs: ["athletic-official-2021-22-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"DFC-C",
					"DFC-I",
					"DFC-D"
				]
			}),
			makePlayer({
				name: "Yeray",
				season: "2021/22",
				positions: ["DFC"],
				overall: 84,
				sourceRefs: ["athletic-official-2021-22-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"DFC-C",
					"DFC-I",
					"DFC-D"
				]
			}),
			makePlayer({
				name: "Vivian",
				season: "2021/22",
				positions: ["DFC"],
				overall: 82,
				sourceRefs: ["athletic-official-2021-22-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"DFC-C",
					"DFC-I",
					"DFC-D"
				]
			}),
			makePlayer({
				name: "Balenziaga",
				season: "2021/22",
				positions: ["LI"],
				overall: 79,
				sourceRefs: ["athletic-official-2021-22-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["LI"]
			}),
			makePlayer({
				name: "De Marcos",
				season: "2021/22",
				positions: ["LD", "MD"],
				overall: 82,
				sourceRefs: ["athletic-official-2021-22-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["LD", "MD"]
			}),
			makePlayer({
				name: "Dani Garcia",
				season: "2021/22",
				positions: ["MCD", "MC"],
				overall: 82,
				sourceRefs: ["athletic-official-2021-22-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Vesga",
				season: "2021/22",
				positions: ["MCD", "MC"],
				overall: 80,
				sourceRefs: ["athletic-official-2021-22-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Vencedor",
				season: "2021/22",
				positions: ["MCD", "MC"],
				overall: 80,
				sourceRefs: ["athletic-official-2021-22-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Muniain",
				season: "2021/22",
				positions: ["EI", "MP"],
				overall: 85,
				sourceRefs: ["athletic-official-2021-22-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["EI", "MP"]
			}),
			makePlayer({
				name: "Sancet",
				season: "2021/22",
				positions: ["MP", "MC"],
				overall: 82,
				sourceRefs: ["athletic-official-2021-22-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["MP", "MC"]
			}),
			makePlayer({
				name: "Nico Williams",
				season: "2021/22",
				positions: ["EI", "ED"],
				overall: 80,
				sourceRefs: ["athletic-official-2021-22-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["EI", "ED"]
			}),
			makePlayer({
				name: "Iñaki Williams",
				season: "2021/22",
				positions: ["ED", "DC"],
				overall: 84,
				sourceRefs: ["athletic-official-2021-22-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"ED",
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Raul Garcia",
				season: "2021/22",
				positions: [
					"MP",
					"SD",
					"DC"
				],
				overall: 82,
				sourceRefs: ["athletic-official-2021-22-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"MP",
					"SD",
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Berenguer",
				season: "2021/22",
				positions: [
					"EI",
					"ED",
					"MI"
				],
				overall: 82,
				sourceRefs: ["athletic-official-2021-22-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"EI",
					"ED",
					"MI"
				]
			}),
			makePlayer({
				name: "Villalibre",
				season: "2021/22",
				positions: ["DC"],
				overall: 78,
				sourceRefs: ["athletic-official-2021-22-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			})
		]
	},
	{
		season: "2022/23",
		coach: makeCoach({
			name: "Ernesto Valverde",
			coachId: "ernesto_valverde",
			season: "2022/23",
			overall: 82,
			skills: {
				attack: 82,
				defense: 83,
				management: 84,
				mentality: 85,
				cup: 81,
				europe: 72
			},
			sourceRefs: ["athletic-official-2022-23-squad", "manual-athletic-2020s-context"],
			dataConfidence: .74,
			notes: "Base jugable del bloque 2020s. Ratings calibrados por rendimiento reciente, Copa 2023/24, contexto europeo y continuidad del bloque Valverde. Pendiente de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Unai Simon",
				season: "2022/23",
				positions: ["POR"],
				overall: 85,
				sourceRefs: ["athletic-official-2022-23-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Agirrezabala",
				season: "2022/23",
				positions: ["POR"],
				overall: 78,
				sourceRefs: ["athletic-official-2022-23-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Iñigo Martínez",
				season: "2022/23",
				positions: ["DFC"],
				overall: 85,
				sourceRefs: ["athletic-official-2022-23-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"DFC-C",
					"DFC-I",
					"DFC-D"
				]
			}),
			makePlayer({
				name: "Yeray",
				season: "2022/23",
				positions: ["DFC"],
				overall: 84,
				sourceRefs: ["athletic-official-2022-23-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"DFC-C",
					"DFC-I",
					"DFC-D"
				]
			}),
			makePlayer({
				name: "Vivian",
				season: "2022/23",
				positions: ["DFC"],
				overall: 83,
				sourceRefs: ["athletic-official-2022-23-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"DFC-C",
					"DFC-I",
					"DFC-D"
				]
			}),
			makePlayer({
				name: "Yuri",
				season: "2022/23",
				positions: ["LI", "MI"],
				overall: 83,
				sourceRefs: ["athletic-official-2022-23-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["LI", "MI"]
			}),
			makePlayer({
				name: "De Marcos",
				season: "2022/23",
				positions: ["LD", "MD"],
				overall: 82,
				sourceRefs: ["athletic-official-2022-23-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["LD", "MD"]
			}),
			makePlayer({
				name: "Dani Garcia",
				season: "2022/23",
				positions: ["MCD", "MC"],
				overall: 82,
				sourceRefs: ["athletic-official-2022-23-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Vesga",
				season: "2022/23",
				positions: ["MCD", "MC"],
				overall: 82,
				sourceRefs: ["athletic-official-2022-23-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Herrera",
				season: "2022/23",
				positions: ["MC", "MP"],
				overall: 81,
				sourceRefs: ["athletic-official-2022-23-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["MC", "MP"]
			}),
			makePlayer({
				name: "Sancet",
				season: "2022/23",
				positions: ["MP", "MC"],
				overall: 84,
				sourceRefs: ["athletic-official-2022-23-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["MP", "MC"]
			}),
			makePlayer({
				name: "Muniain",
				season: "2022/23",
				positions: ["EI", "MP"],
				overall: 83,
				sourceRefs: ["athletic-official-2022-23-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["EI", "MP"]
			}),
			makePlayer({
				name: "Nico Williams",
				season: "2022/23",
				positions: ["EI", "ED"],
				overall: 84,
				sourceRefs: ["athletic-official-2022-23-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["EI", "ED"]
			}),
			makePlayer({
				name: "Iñaki Williams",
				season: "2022/23",
				positions: ["ED", "DC"],
				overall: 84,
				sourceRefs: ["athletic-official-2022-23-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"ED",
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Guruzeta",
				season: "2022/23",
				positions: ["DC"],
				overall: 81,
				sourceRefs: ["athletic-official-2022-23-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Berenguer",
				season: "2022/23",
				positions: [
					"EI",
					"ED",
					"MI"
				],
				overall: 81,
				sourceRefs: ["athletic-official-2022-23-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"EI",
					"ED",
					"MI"
				]
			}),
			makePlayer({
				name: "Raul Garcia",
				season: "2022/23",
				positions: [
					"MP",
					"SD",
					"DC"
				],
				overall: 80,
				sourceRefs: ["athletic-official-2022-23-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"MP",
					"SD",
					"DC",
					"DC-I",
					"DC-D"
				]
			})
		]
	},
	{
		season: "2024/25",
		coach: makeCoach({
			name: "Ernesto Valverde",
			coachId: "ernesto_valverde",
			season: "2024/25",
			overall: 84,
			skills: {
				attack: 84,
				defense: 84,
				management: 85,
				mentality: 87,
				cup: 83,
				europe: 78
			},
			sourceRefs: ["athletic-official-2024-25-squad", "manual-athletic-2020s-context"],
			dataConfidence: .74,
			notes: "Base jugable del bloque 2020s. Ratings calibrados por rendimiento reciente, Copa 2023/24, contexto europeo y continuidad del bloque Valverde. Pendiente de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Unai Simon",
				season: "2024/25",
				positions: ["POR"],
				overall: 86,
				sourceRefs: ["athletic-official-2024-25-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Agirrezabala",
				season: "2024/25",
				positions: ["POR"],
				overall: 80,
				sourceRefs: ["athletic-official-2024-25-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Vivian",
				season: "2024/25",
				positions: ["DFC"],
				overall: 85,
				sourceRefs: ["athletic-official-2024-25-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"DFC-C",
					"DFC-I",
					"DFC-D"
				]
			}),
			makePlayer({
				name: "Paredes",
				season: "2024/25",
				positions: ["DFC"],
				overall: 83,
				sourceRefs: ["athletic-official-2024-25-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"DFC-C",
					"DFC-I",
					"DFC-D"
				]
			}),
			makePlayer({
				name: "Yeray",
				season: "2024/25",
				positions: ["DFC"],
				overall: 82,
				sourceRefs: ["athletic-official-2024-25-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"DFC-C",
					"DFC-I",
					"DFC-D"
				]
			}),
			makePlayer({
				name: "Yuri",
				season: "2024/25",
				positions: ["LI", "MI"],
				overall: 84,
				sourceRefs: ["athletic-official-2024-25-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["LI", "MI"]
			}),
			makePlayer({
				name: "De Marcos",
				season: "2024/25",
				positions: ["LD", "MD"],
				overall: 82,
				sourceRefs: ["athletic-official-2024-25-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["LD", "MD"]
			}),
			makePlayer({
				name: "Gorosabel",
				season: "2024/25",
				positions: ["LD", "MD"],
				overall: 80,
				sourceRefs: ["athletic-official-2024-25-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["LD", "MD"]
			}),
			makePlayer({
				name: "Dani Garcia",
				season: "2024/25",
				positions: ["MCD", "MC"],
				overall: 80,
				sourceRefs: ["athletic-official-2024-25-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Beñat Prados",
				season: "2024/25",
				positions: ["MCD", "MC"],
				overall: 83,
				sourceRefs: ["athletic-official-2024-25-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Galarreta",
				season: "2024/25",
				positions: ["MC", "MCD"],
				overall: 83,
				sourceRefs: ["athletic-official-2024-25-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Jauregizar",
				season: "2024/25",
				positions: ["MC", "MCD"],
				overall: 80,
				sourceRefs: ["athletic-official-2024-25-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Sancet",
				season: "2024/25",
				positions: ["MP", "MC"],
				overall: 86,
				sourceRefs: ["athletic-official-2024-25-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["MP", "MC"]
			}),
			makePlayer({
				name: "Nico Williams",
				season: "2024/25",
				positions: ["EI", "ED"],
				overall: 87,
				sourceRefs: ["athletic-official-2024-25-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["EI", "ED"]
			}),
			makePlayer({
				name: "Iñaki Williams",
				season: "2024/25",
				positions: ["ED", "DC"],
				overall: 85,
				sourceRefs: ["athletic-official-2024-25-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"ED",
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Guruzeta",
				season: "2024/25",
				positions: ["DC"],
				overall: 83,
				sourceRefs: ["athletic-official-2024-25-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Berenguer",
				season: "2024/25",
				positions: [
					"EI",
					"ED",
					"MI"
				],
				overall: 82,
				sourceRefs: ["athletic-official-2024-25-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"EI",
					"ED",
					"MI"
				]
			})
		]
	},
	{
		season: "2025/26",
		coach: makeCoach({
			name: "Ernesto Valverde",
			coachId: "ernesto_valverde",
			season: "2025/26",
			overall: 80,
			skills: {
				attack: 80,
				defense: 81,
				management: 82,
				mentality: 83,
				cup: 79,
				europe: 76
			},
			sourceRefs: ["athletic-official-2025-26-squad", "manual-athletic-2020s-context"],
			dataConfidence: .74,
			notes: "Base jugable del bloque 2020s. Ratings calibrados por rendimiento reciente, Copa 2023/24, contexto europeo y continuidad del bloque Valverde. Pendiente de refinado estadistico oficial por jugador."
		}),
		players: [
			makePlayer({
				name: "Unai Simon",
				season: "2025/26",
				positions: ["POR"],
				overall: 86,
				sourceRefs: ["athletic-official-2025-26-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Alex Padilla",
				season: "2025/26",
				positions: ["POR"],
				overall: 78,
				sourceRefs: ["athletic-official-2025-26-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["POR"]
			}),
			makePlayer({
				name: "Vivian",
				season: "2025/26",
				positions: ["DFC"],
				overall: 85,
				sourceRefs: ["athletic-official-2025-26-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"DFC-C",
					"DFC-I",
					"DFC-D"
				]
			}),
			makePlayer({
				name: "Paredes",
				season: "2025/26",
				positions: ["DFC"],
				overall: 83,
				sourceRefs: ["athletic-official-2025-26-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"DFC-C",
					"DFC-I",
					"DFC-D"
				]
			}),
			makePlayer({
				name: "Yeray",
				season: "2025/26",
				positions: ["DFC"],
				overall: 82,
				sourceRefs: ["athletic-official-2025-26-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"DFC-C",
					"DFC-I",
					"DFC-D"
				]
			}),
			makePlayer({
				name: "Yuri",
				season: "2025/26",
				positions: ["LI", "MI"],
				overall: 82,
				sourceRefs: ["athletic-official-2025-26-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["LI", "MI"]
			}),
			makePlayer({
				name: "Areso",
				season: "2025/26",
				positions: ["LD", "MD"],
				overall: 80,
				sourceRefs: ["athletic-official-2025-26-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["LD", "MD"]
			}),
			makePlayer({
				name: "Gorosabel",
				season: "2025/26",
				positions: ["LD", "MD"],
				overall: 80,
				sourceRefs: ["athletic-official-2025-26-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["LD", "MD"]
			}),
			makePlayer({
				name: "Beñat Prados",
				season: "2025/26",
				positions: ["MCD", "MC"],
				overall: 83,
				sourceRefs: ["athletic-official-2025-26-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["MCD", "MC"]
			}),
			makePlayer({
				name: "Galarreta",
				season: "2025/26",
				positions: ["MC", "MCD"],
				overall: 82,
				sourceRefs: ["athletic-official-2025-26-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Jauregizar",
				season: "2025/26",
				positions: ["MC", "MCD"],
				overall: 82,
				sourceRefs: ["athletic-official-2025-26-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["MC", "MCD"]
			}),
			makePlayer({
				name: "Sancet",
				season: "2025/26",
				positions: ["MP", "MC"],
				overall: 86,
				sourceRefs: ["athletic-official-2025-26-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["MP", "MC"]
			}),
			makePlayer({
				name: "Unai Gomez",
				season: "2025/26",
				positions: ["MP", "MC"],
				overall: 80,
				sourceRefs: ["athletic-official-2025-26-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["MP", "MC"]
			}),
			makePlayer({
				name: "Nico Williams",
				season: "2025/26",
				positions: ["EI", "ED"],
				overall: 88,
				sourceRefs: ["athletic-official-2025-26-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["EI", "ED"]
			}),
			makePlayer({
				name: "Iñaki Williams",
				season: "2025/26",
				positions: ["ED", "DC"],
				overall: 84,
				sourceRefs: ["athletic-official-2025-26-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"ED",
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Guruzeta",
				season: "2025/26",
				positions: ["DC"],
				overall: 82,
				sourceRefs: ["athletic-official-2025-26-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Berenguer",
				season: "2025/26",
				positions: [
					"EI",
					"ED",
					"MI"
				],
				overall: 81,
				sourceRefs: ["athletic-official-2025-26-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"EI",
					"ED",
					"MI"
				]
			}),
			makePlayer({
				name: "Maroan",
				season: "2025/26",
				positions: ["DC"],
				overall: 78,
				sourceRefs: ["athletic-official-2025-26-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: [
					"DC",
					"DC-I",
					"DC-D"
				]
			}),
			makePlayer({
				name: "Robert Navarro",
				season: "2025/26",
				positions: ["ED", "MP"],
				overall: 80,
				sourceRefs: ["athletic-official-2025-26-squad"],
				dataConfidence: .72,
				tacticalSlotLabels: ["ED", "MP"]
			})
		]
	}
];
//#endregion
//#region src/data/easyModeSeasonRanges.ts
var EASY_MODE_SEASON_RANGES = [
	{
		id: "all",
		label: "Todas las temporadas",
		description: "1928/29–2025/26. Experiencia histórica completa.",
		from: 1928,
		to: 2025
	},
	{
		id: "classic",
		label: "Athletic clásico",
		description: "1928/29–1959/60. Primeras décadas y posguerra.",
		from: 1928,
		to: 1959
	},
	{
		id: "transition",
		label: "Athletic de transición",
		description: "1960/61–1989/90. Barro, oficio y generaciones históricas.",
		from: 1960,
		to: 1989
	},
	{
		id: "modern",
		label: "Athletic moderno",
		description: "1990/91–2009/10. Etapa reconocible antes del ciclo reciente.",
		from: 1990,
		to: 2009
	},
	{
		id: "recent",
		label: "Athletic reciente",
		description: "2010/11–2025/26. Jugadores más cercanos para empezar fácil.",
		from: 2010,
		to: 2025
	}
];
//#endregion
//#region src/data/formations.ts
var FORMATIONS = [
	{
		id: "4-3-3",
		name: "4-3-3",
		description: "Sistema equilibrado y ofensivo. Ideal para equipos con extremos potentes, laterales fiables y un delantero centro determinante.",
		strengths: [
			"Buen equilibrio entre ataque y defensa",
			"Mucho peligro por bandas",
			"Permite juntar tres delanteros",
			"Funciona bien con laterales ofensivos"
		],
		weaknesses: [
			"Puede sufrir si los extremos ayudan poco en defensa",
			"Exige buenos laterales",
			"El mediocampo puede quedar superado ante sistemas con cinco medios"
		],
		slots: [
			{
				id: "gk",
				label: "POR",
				allowedPositions: ["POR"],
				line: "goalkeeper"
			},
			{
				id: "rb",
				label: "LD",
				allowedPositions: ["LD", "CAD"],
				line: "defense"
			},
			{
				id: "cb_1",
				label: "DFC-D",
				allowedPositions: ["DFC"],
				line: "defense"
			},
			{
				id: "cb_2",
				label: "DFC-I",
				allowedPositions: ["DFC"],
				line: "defense"
			},
			{
				id: "lb",
				label: "LI",
				allowedPositions: ["LI", "CAI"],
				line: "defense"
			},
			{
				id: "cm_1",
				label: "MCD",
				allowedPositions: ["MC", "MCD"],
				line: "midfield"
			},
			{
				id: "cm_2",
				label: "MC",
				allowedPositions: [
					"MC",
					"MCD",
					"MP"
				],
				line: "midfield"
			},
			{
				id: "cm_3",
				label: "MP",
				allowedPositions: ["MC", "MP"],
				line: "midfield"
			},
			{
				id: "lw",
				label: "EI",
				allowedPositions: ["EI", "MI"],
				line: "attack"
			},
			{
				id: "st",
				label: "DC",
				allowedPositions: ["DC", "SD"],
				line: "attack"
			},
			{
				id: "rw",
				label: "ED",
				allowedPositions: ["ED", "MD"],
				line: "attack"
			}
		],
		modifiers: {
			attack: 2,
			defense: -1,
			control: 1,
			risk: 1
		}
	},
	{
		id: "4-4-2",
		name: "4-4-2",
		description: "Sistema clásico, directo y estable. Muy útil para equipos con dos delanteros fuertes y buenos jugadores de banda.",
		strengths: [
			"Dos delanteros constantes en el área",
			"Sistema sencillo y sólido",
			"Buen equilibrio defensivo",
			"Ideal para fútbol directo y físico"
		],
		weaknesses: [
			"Menos creatividad entre líneas",
			"Puede perder el control contra mediocampos poblados",
			"Depende mucho del rendimiento de las bandas"
		],
		slots: [
			{
				id: "gk",
				label: "POR",
				allowedPositions: ["POR"],
				line: "goalkeeper"
			},
			{
				id: "rb",
				label: "LD",
				allowedPositions: ["LD", "CAD"],
				line: "defense"
			},
			{
				id: "cb_1",
				label: "DFC-D",
				allowedPositions: ["DFC"],
				line: "defense"
			},
			{
				id: "cb_2",
				label: "DFC-I",
				allowedPositions: ["DFC"],
				line: "defense"
			},
			{
				id: "lb",
				label: "LI",
				allowedPositions: ["LI", "CAI"],
				line: "defense"
			},
			{
				id: "lm",
				label: "MI",
				allowedPositions: ["MI", "EI"],
				line: "midfield"
			},
			{
				id: "cm_1",
				label: "MCD",
				allowedPositions: ["MC", "MCD"],
				line: "midfield"
			},
			{
				id: "cm_2",
				label: "MC",
				allowedPositions: ["MC", "MP"],
				line: "midfield"
			},
			{
				id: "rm",
				label: "MD",
				allowedPositions: ["MD", "ED"],
				line: "midfield"
			},
			{
				id: "st_1",
				label: "SD",
				allowedPositions: ["DC", "SD"],
				line: "attack"
			},
			{
				id: "st_2",
				label: "DC",
				allowedPositions: ["DC", "SD"],
				line: "attack"
			}
		],
		modifiers: {
			attack: 1,
			defense: 1,
			control: 1,
			risk: 0
		}
	},
	{
		id: "4-2-3-1",
		name: "4-2-3-1",
		description: "Sistema moderno y muy completo. Combina doble pivote, mediapunta, extremos y un delantero referencia.",
		strengths: [
			"Muy buen equilibrio táctico",
			"Protege bien la defensa con doble pivote",
			"Permite tener un mediapunta creativo",
			"Buen sistema para competir en Liga"
		],
		weaknesses: [
			"Depende mucho del mediapunta",
			"El delantero puede quedar aislado",
			"Necesita extremos con trabajo defensivo"
		],
		slots: [
			{
				id: "gk",
				label: "POR",
				allowedPositions: ["POR"],
				line: "goalkeeper"
			},
			{
				id: "rb",
				label: "LD",
				allowedPositions: ["LD", "CAD"],
				line: "defense"
			},
			{
				id: "cb_1",
				label: "DFC-D",
				allowedPositions: ["DFC"],
				line: "defense"
			},
			{
				id: "cb_2",
				label: "DFC-I",
				allowedPositions: ["DFC"],
				line: "defense"
			},
			{
				id: "lb",
				label: "LI",
				allowedPositions: ["LI", "CAI"],
				line: "defense"
			},
			{
				id: "dm_1",
				label: "MCD",
				allowedPositions: ["MCD", "MC"],
				line: "midfield"
			},
			{
				id: "dm_2",
				label: "MC",
				allowedPositions: ["MC", "MCD"],
				line: "midfield"
			},
			{
				id: "am",
				label: "MP",
				allowedPositions: [
					"MP",
					"MC",
					"SD"
				],
				line: "midfield"
			},
			{
				id: "lw",
				label: "EI",
				allowedPositions: ["EI", "MI"],
				line: "attack"
			},
			{
				id: "rw",
				label: "ED",
				allowedPositions: ["ED", "MD"],
				line: "attack"
			},
			{
				id: "st",
				label: "DC",
				allowedPositions: ["DC"],
				line: "attack"
			}
		],
		modifiers: {
			attack: 1,
			defense: 1,
			control: 2,
			risk: 0
		}
	},
	{
		id: "5-3-2",
		name: "5-3-2",
		description: "Sistema defensivo y competitivo. Ideal para protegerse atrás, jugar con carrileros y aprovechar dos delanteros.",
		strengths: [
			"Muy fuerte defensivamente",
			"Tres centrales dan mucha seguridad",
			"Bueno para partidos igualados",
			"Dos delanteros permiten salir rápido"
		],
		weaknesses: [
			"Menos producción ofensiva",
			"Depende mucho de los carrileros",
			"Puede sufrir para dominar partidos"
		],
		slots: [
			{
				id: "gk",
				label: "POR",
				allowedPositions: ["POR"],
				line: "goalkeeper"
			},
			{
				id: "cb_1",
				label: "DFC-D",
				allowedPositions: ["DFC"],
				line: "defense"
			},
			{
				id: "cb_2",
				label: "DFC-C",
				allowedPositions: ["DFC"],
				line: "defense"
			},
			{
				id: "cb_3",
				label: "DFC-I",
				allowedPositions: ["DFC"],
				line: "defense"
			},
			{
				id: "rwb",
				label: "CAD",
				allowedPositions: [
					"CAD",
					"LD",
					"MD"
				],
				line: "defense"
			},
			{
				id: "lwb",
				label: "CAI",
				allowedPositions: [
					"CAI",
					"LI",
					"MI"
				],
				line: "defense"
			},
			{
				id: "cm_1",
				label: "MC",
				allowedPositions: ["MC", "MCD"],
				line: "midfield"
			},
			{
				id: "cm_2",
				label: "MP",
				allowedPositions: ["MC", "MP"],
				line: "midfield"
			},
			{
				id: "cm_3",
				label: "MCD",
				allowedPositions: [
					"MC",
					"MCD",
					"MP"
				],
				line: "midfield"
			},
			{
				id: "st_1",
				label: "SD",
				allowedPositions: ["DC", "SD"],
				line: "attack"
			},
			{
				id: "st_2",
				label: "DC",
				allowedPositions: ["DC", "SD"],
				line: "attack"
			}
		],
		modifiers: {
			attack: -1,
			defense: 3,
			control: 2,
			risk: -1
		}
	},
	{
		id: "3-5-2",
		name: "3-5-2",
		description: "Sistema de control y superioridad en el centro del campo. Muy útil si se tienen buenos centrales, carrileros y dos delanteros.",
		strengths: [
			"Mucho dominio en mediocampo",
			"Dos delanteros generan amenaza constante",
			"Permite juntar muchos centrocampistas",
			"Fuerte si los carrileros tienen recorrido"
		],
		weaknesses: [
			"Riesgo por bandas",
			"Exige centrales rápidos",
			"Puede sufrir contra extremos muy abiertos"
		],
		slots: [
			{
				id: "gk",
				label: "POR",
				allowedPositions: ["POR"],
				line: "goalkeeper"
			},
			{
				id: "cb_1",
				label: "DFC-D",
				allowedPositions: ["DFC"],
				line: "defense"
			},
			{
				id: "cb_2",
				label: "DFC-C",
				allowedPositions: ["DFC"],
				line: "defense"
			},
			{
				id: "cb_3",
				label: "DFC-I",
				allowedPositions: ["DFC"],
				line: "defense"
			},
			{
				id: "rwb",
				label: "CAD",
				allowedPositions: [
					"CAD",
					"LD",
					"MD"
				],
				line: "midfield"
			},
			{
				id: "lwb",
				label: "CAI",
				allowedPositions: [
					"CAI",
					"LI",
					"MI"
				],
				line: "midfield"
			},
			{
				id: "dm",
				label: "MCD",
				allowedPositions: [
					"MCD",
					"MC",
					"DFC"
				],
				line: "midfield"
			},
			{
				id: "cm_1",
				label: "MC",
				allowedPositions: ["MC", "MP"],
				line: "midfield"
			},
			{
				id: "cm_2",
				label: "MP",
				allowedPositions: [
					"MC",
					"MCD",
					"MP"
				],
				line: "midfield"
			},
			{
				id: "st_1",
				label: "SD",
				allowedPositions: ["DC", "SD"],
				line: "attack"
			},
			{
				id: "st_2",
				label: "DC",
				allowedPositions: ["DC", "SD"],
				line: "attack"
			}
		],
		modifiers: {
			attack: 1,
			defense: -1,
			control: 2,
			risk: 1
		}
	},
	{
		id: "4-5-1",
		name: "4-5-1",
		description: "Sistema de control, resistencia y orden. Reduce riesgos, protege bien el centro y busca ganar desde la estabilidad.",
		strengths: [
			"Mucho control en mediocampo",
			"Reduce ocasiones rivales",
			"Muy estable en partidos largos",
			"Buena opción para ligas regulares"
		],
		weaknesses: [
			"Menos presencia en el área",
			"El delantero puede quedar solo",
			"Puede costar remontar partidos"
		],
		slots: [
			{
				id: "gk",
				label: "POR",
				allowedPositions: ["POR"],
				line: "goalkeeper"
			},
			{
				id: "rb",
				label: "LD",
				allowedPositions: ["LD", "CAD"],
				line: "defense"
			},
			{
				id: "cb_1",
				label: "DFC-D",
				allowedPositions: ["DFC"],
				line: "defense"
			},
			{
				id: "cb_2",
				label: "DFC-I",
				allowedPositions: ["DFC"],
				line: "defense"
			},
			{
				id: "lb",
				label: "LI",
				allowedPositions: ["LI", "CAI"],
				line: "defense"
			},
			{
				id: "dm",
				label: "MCD",
				allowedPositions: ["MCD", "MC"],
				line: "midfield"
			},
			{
				id: "cm_1",
				label: "MC",
				allowedPositions: ["MC", "MCD"],
				line: "midfield"
			},
			{
				id: "cm_2",
				label: "MP",
				allowedPositions: ["MC", "MP"],
				line: "midfield"
			},
			{
				id: "lm",
				label: "MI",
				allowedPositions: [
					"MI",
					"EI",
					"CAI"
				],
				line: "midfield"
			},
			{
				id: "rm",
				label: "MD",
				allowedPositions: [
					"MD",
					"ED",
					"CAD"
				],
				line: "midfield"
			},
			{
				id: "st",
				label: "DC",
				allowedPositions: ["DC", "SD"],
				line: "attack"
			}
		],
		modifiers: {
			attack: -1,
			defense: 2,
			control: 3,
			risk: -1
		}
	},
	{
		id: "3-4-3",
		name: "3-4-3",
		description: "Sistema ofensivo con tres centrales, dos carrileros y tres atacantes. Ideal para presionar alto y atacar con mucha amplitud.",
		strengths: [
			"Mucho poder ofensivo",
			"Tres atacantes constantes",
			"Carrileros con mucha presencia",
			"Muy buena para remontar o asumir riesgos"
		],
		weaknesses: [
			"Puede sufrir a la espalda de los carrileros",
			"Exige centrales rÃ¡pidos",
			"Menos seguridad si se pierde el balÃ³n en salida"
		],
		slots: [
			{
				id: "gk",
				label: "POR",
				allowedPositions: ["POR"],
				line: "goalkeeper"
			},
			{
				id: "cb_l",
				label: "DFC-I",
				allowedPositions: ["DFC", "LI"],
				line: "defense"
			},
			{
				id: "cb_c",
				label: "DFC-C",
				allowedPositions: ["DFC"],
				line: "defense"
			},
			{
				id: "cb_r",
				label: "DFC-D",
				allowedPositions: ["DFC", "LD"],
				line: "defense"
			},
			{
				id: "lm",
				label: "MI",
				allowedPositions: [
					"MI",
					"CAI",
					"EI"
				],
				line: "midfield"
			},
			{
				id: "cm_1",
				label: "MC",
				allowedPositions: ["MC", "MCD"],
				line: "midfield"
			},
			{
				id: "cm_2",
				label: "MC",
				allowedPositions: [
					"MC",
					"MP",
					"MCD"
				],
				line: "midfield"
			},
			{
				id: "rm",
				label: "MD",
				allowedPositions: [
					"MD",
					"CAD",
					"ED"
				],
				line: "midfield"
			},
			{
				id: "lw",
				label: "EI",
				allowedPositions: ["EI", "MI"],
				line: "attack"
			},
			{
				id: "st",
				label: "DC",
				allowedPositions: ["DC", "SD"],
				line: "attack"
			},
			{
				id: "rw",
				label: "ED",
				allowedPositions: ["ED", "MD"],
				line: "attack"
			}
		],
		modifiers: {
			attack: 4,
			defense: -1,
			control: 1,
			risk: 2
		}
	},
	{
		id: "5-4-1",
		name: "5-4-1",
		description: "Sistema muy defensivo y ordenado. Protege el Ã¡rea, cierra bandas y busca competir desde la solidez.",
		strengths: [
			"Muy fuerte defensivamente",
			"Cinco defensas protegen muy bien el Ã¡rea",
			"Bueno para partidos de mÃ¡xima dificultad",
			"Reduce mucho el riesgo"
		],
		weaknesses: [
			"Poca presencia ofensiva",
			"El delantero puede quedar aislado",
			"Cuesta generar ocasiones si no hay buenos carrileros"
		],
		slots: [
			{
				id: "gk",
				label: "POR",
				allowedPositions: ["POR"],
				line: "goalkeeper"
			},
			{
				id: "lwb",
				label: "CAI",
				allowedPositions: [
					"CAI",
					"LI",
					"MI"
				],
				line: "defense"
			},
			{
				id: "cb_l",
				label: "DFC-I",
				allowedPositions: ["DFC", "LI"],
				line: "defense"
			},
			{
				id: "cb_c",
				label: "DFC-C",
				allowedPositions: ["DFC"],
				line: "defense"
			},
			{
				id: "cb_r",
				label: "DFC-D",
				allowedPositions: ["DFC", "LD"],
				line: "defense"
			},
			{
				id: "rwb",
				label: "CAD",
				allowedPositions: [
					"CAD",
					"LD",
					"MD"
				],
				line: "defense"
			},
			{
				id: "lm",
				label: "MI",
				allowedPositions: [
					"MI",
					"EI",
					"CAI"
				],
				line: "midfield"
			},
			{
				id: "cm_1",
				label: "MCD",
				allowedPositions: ["MCD", "MC"],
				line: "midfield"
			},
			{
				id: "cm_2",
				label: "MC",
				allowedPositions: [
					"MC",
					"MCD",
					"MP"
				],
				line: "midfield"
			},
			{
				id: "rm",
				label: "MD",
				allowedPositions: [
					"MD",
					"ED",
					"CAD"
				],
				line: "midfield"
			},
			{
				id: "st",
				label: "DC",
				allowedPositions: ["DC", "SD"],
				line: "attack"
			}
		],
		modifiers: {
			attack: -2,
			defense: 5,
			control: 1,
			risk: -1
		}
	},
	{
		id: "3-6-1",
		name: "3-6-1",
		description: "Sistema de control extremo. Acumula centrocampistas, protege el centro y busca dominar la posesiÃ³n con un solo delantero.",
		strengths: [
			"Mucho control en el centro del campo",
			"Permite juntar muchos perfiles creativos",
			"Muy Ãºtil para dormir partidos",
			"Buena presiÃ³n tras pÃ©rdida"
		],
		weaknesses: [
			"Poca presencia en el Ã¡rea",
			"Exige carrileros con recorrido",
			"Puede atascarse si el delantero queda solo"
		],
		slots: [
			{
				id: "gk",
				label: "POR",
				allowedPositions: ["POR"],
				line: "goalkeeper"
			},
			{
				id: "cb_l",
				label: "DFC-I",
				allowedPositions: ["DFC", "LI"],
				line: "defense"
			},
			{
				id: "cb_c",
				label: "DFC-C",
				allowedPositions: ["DFC"],
				line: "defense"
			},
			{
				id: "cb_r",
				label: "DFC-D",
				allowedPositions: ["DFC", "LD"],
				line: "defense"
			},
			{
				id: "lm",
				label: "MI",
				allowedPositions: [
					"MI",
					"CAI",
					"EI"
				],
				line: "midfield"
			},
			{
				id: "dm",
				label: "MCD",
				allowedPositions: [
					"MCD",
					"MC",
					"DFC"
				],
				line: "midfield"
			},
			{
				id: "cm_1",
				label: "MC",
				allowedPositions: ["MC", "MCD"],
				line: "midfield"
			},
			{
				id: "cm_2",
				label: "MC",
				allowedPositions: ["MC", "MP"],
				line: "midfield"
			},
			{
				id: "am",
				label: "MP",
				allowedPositions: [
					"MP",
					"MC",
					"SD"
				],
				line: "midfield"
			},
			{
				id: "rm",
				label: "MD",
				allowedPositions: [
					"MD",
					"CAD",
					"ED"
				],
				line: "midfield"
			},
			{
				id: "st",
				label: "DC",
				allowedPositions: ["DC", "SD"],
				line: "attack"
			}
		],
		modifiers: {
			attack: -1,
			defense: 2,
			control: 4,
			risk: -1
		}
	},
	{
		id: "3-3-4",
		name: "3-3-4",
		description: "Sistema ultraofensivo y arriesgado. Cuatro atacantes, tres medios y tres defensas para partidos donde solo vale ganar.",
		strengths: [
			"MÃ¡xima presencia ofensiva",
			"Muchos rematadores y extremos",
			"Ideal para buscar goles",
			"Muy divertido para plantillas ofensivas"
		],
		weaknesses: [
			"MuchÃ­simo riesgo defensivo",
			"Puede partirse el equipo",
			"Exige centrales dominantes"
		],
		slots: [
			{
				id: "gk",
				label: "POR",
				allowedPositions: ["POR"],
				line: "goalkeeper"
			},
			{
				id: "cb_l",
				label: "DFC-I",
				allowedPositions: ["DFC", "LI"],
				line: "defense"
			},
			{
				id: "cb_c",
				label: "DFC-C",
				allowedPositions: ["DFC"],
				line: "defense"
			},
			{
				id: "cb_r",
				label: "DFC-D",
				allowedPositions: ["DFC", "LD"],
				line: "defense"
			},
			{
				id: "cm_1",
				label: "MC",
				allowedPositions: ["MC", "MCD"],
				line: "midfield"
			},
			{
				id: "cm_2",
				label: "MC",
				allowedPositions: [
					"MC",
					"MP",
					"MCD"
				],
				line: "midfield"
			},
			{
				id: "am",
				label: "MP",
				allowedPositions: [
					"MP",
					"MC",
					"SD"
				],
				line: "midfield"
			},
			{
				id: "lw",
				label: "EI",
				allowedPositions: ["EI", "MI"],
				line: "attack"
			},
			{
				id: "st_1",
				label: "DC",
				allowedPositions: ["DC", "SD"],
				line: "attack"
			},
			{
				id: "st_2",
				label: "SD",
				allowedPositions: [
					"SD",
					"DC",
					"MP"
				],
				line: "attack"
			},
			{
				id: "rw",
				label: "ED",
				allowedPositions: ["ED", "MD"],
				line: "attack"
			}
		],
		modifiers: {
			attack: 5,
			defense: -3,
			control: 0,
			risk: 3
		}
	},
	{
		id: "4-2-4",
		name: "4-2-4",
		description: "Sistema ofensivo clÃ¡sico con cuatro atacantes. Muy agresivo, vertical y pensado para atacar rÃ¡pido.",
		strengths: [
			"MuchÃ­sima amenaza arriba",
			"Dos delanteros y dos extremos",
			"Ideal para equipos con pegada",
			"Genera muchos duelos ofensivos"
		],
		weaknesses: [
			"Centro del campo poco protegido",
			"Puede sufrir ante rivales con muchos medios",
			"Sistema de alto riesgo"
		],
		slots: [
			{
				id: "gk",
				label: "POR",
				allowedPositions: ["POR"],
				line: "goalkeeper"
			},
			{
				id: "rb",
				label: "LD",
				allowedPositions: ["LD", "CAD"],
				line: "defense"
			},
			{
				id: "cb_1",
				label: "DFC-I",
				allowedPositions: ["DFC"],
				line: "defense"
			},
			{
				id: "cb_2",
				label: "DFC-D",
				allowedPositions: ["DFC"],
				line: "defense"
			},
			{
				id: "lb",
				label: "LI",
				allowedPositions: ["LI", "CAI"],
				line: "defense"
			},
			{
				id: "cm_1",
				label: "MCD",
				allowedPositions: ["MCD", "MC"],
				line: "midfield"
			},
			{
				id: "cm_2",
				label: "MC",
				allowedPositions: [
					"MC",
					"MCD",
					"MP"
				],
				line: "midfield"
			},
			{
				id: "lw",
				label: "EI",
				allowedPositions: ["EI", "MI"],
				line: "attack"
			},
			{
				id: "st_1",
				label: "DC",
				allowedPositions: ["DC", "SD"],
				line: "attack"
			},
			{
				id: "st_2",
				label: "SD",
				allowedPositions: [
					"SD",
					"DC",
					"MP"
				],
				line: "attack"
			},
			{
				id: "rw",
				label: "ED",
				allowedPositions: ["ED", "MD"],
				line: "attack"
			}
		],
		modifiers: {
			attack: 5,
			defense: -2,
			control: -1,
			risk: 3
		}
	},
	{
		id: "4-6-0",
		name: "4-6-0",
		description: "Sistema sin delantero fijo. Acumula mediapuntas y centrocampistas para atacar desde segunda lÃ­nea y desordenar marcas.",
		strengths: [
			"Mucho control y movilidad",
			"DifÃ­cil de defender si hay buenos mediapuntas",
			"Permite jugar sin delantero puro",
			"Muy Ãºtil con llegadores desde segunda lÃ­nea"
		],
		weaknesses: [
			"Puede faltar remate en el Ã¡rea",
			"Requiere mucha calidad tÃ©cnica",
			"No encaja bien con plantillas de delanteros clÃ¡sicos"
		],
		slots: [
			{
				id: "gk",
				label: "POR",
				allowedPositions: ["POR"],
				line: "goalkeeper"
			},
			{
				id: "rb",
				label: "LD",
				allowedPositions: ["LD", "CAD"],
				line: "defense"
			},
			{
				id: "cb_1",
				label: "DFC-I",
				allowedPositions: ["DFC"],
				line: "defense"
			},
			{
				id: "cb_2",
				label: "DFC-D",
				allowedPositions: ["DFC"],
				line: "defense"
			},
			{
				id: "lb",
				label: "LI",
				allowedPositions: ["LI", "CAI"],
				line: "defense"
			},
			{
				id: "dm_1",
				label: "MCD",
				allowedPositions: ["MCD", "MC"],
				line: "midfield"
			},
			{
				id: "dm_2",
				label: "MC",
				allowedPositions: ["MC", "MCD"],
				line: "midfield"
			},
			{
				id: "lm",
				label: "MI",
				allowedPositions: [
					"MI",
					"EI",
					"CAI"
				],
				line: "midfield"
			},
			{
				id: "am_1",
				label: "MP",
				allowedPositions: [
					"MP",
					"MC",
					"SD"
				],
				line: "midfield"
			},
			{
				id: "am_2",
				label: "MP",
				allowedPositions: [
					"MP",
					"MC",
					"SD"
				],
				line: "midfield"
			},
			{
				id: "rm",
				label: "MD",
				allowedPositions: [
					"MD",
					"ED",
					"CAD"
				],
				line: "midfield"
			}
		],
		modifiers: {
			attack: 0,
			defense: 1,
			control: 5,
			risk: -1
		}
	},
	{
		id: "5-2-3",
		name: "5-2-3",
		description: "Sistema de cinco defensas y tres atacantes. Protege atrÃ¡s sin renunciar a salir con extremos y un delantero referencia.",
		strengths: [
			"Buena protecciÃ³n defensiva",
			"Tres atacantes para contraatacar",
			"Carrileros importantes",
			"Ãštil contra rivales fuertes"
		],
		weaknesses: [
			"Solo dos centrocampistas",
			"Puede perder posesiÃ³n",
			"Depende de transiciones rÃ¡pidas"
		],
		slots: [
			{
				id: "gk",
				label: "POR",
				allowedPositions: ["POR"],
				line: "goalkeeper"
			},
			{
				id: "lwb",
				label: "CAI",
				allowedPositions: [
					"CAI",
					"LI",
					"MI"
				],
				line: "defense"
			},
			{
				id: "cb_l",
				label: "DFC-I",
				allowedPositions: ["DFC", "LI"],
				line: "defense"
			},
			{
				id: "cb_c",
				label: "DFC-C",
				allowedPositions: ["DFC"],
				line: "defense"
			},
			{
				id: "cb_r",
				label: "DFC-D",
				allowedPositions: ["DFC", "LD"],
				line: "defense"
			},
			{
				id: "rwb",
				label: "CAD",
				allowedPositions: [
					"CAD",
					"LD",
					"MD"
				],
				line: "defense"
			},
			{
				id: "cm_1",
				label: "MCD",
				allowedPositions: ["MCD", "MC"],
				line: "midfield"
			},
			{
				id: "cm_2",
				label: "MC",
				allowedPositions: [
					"MC",
					"MCD",
					"MP"
				],
				line: "midfield"
			},
			{
				id: "lw",
				label: "EI",
				allowedPositions: ["EI", "MI"],
				line: "attack"
			},
			{
				id: "st",
				label: "DC",
				allowedPositions: ["DC", "SD"],
				line: "attack"
			},
			{
				id: "rw",
				label: "ED",
				allowedPositions: ["ED", "MD"],
				line: "attack"
			}
		],
		modifiers: {
			attack: 2,
			defense: 3,
			control: -1,
			risk: -1
		}
	}
];
//#endregion
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
			attack: 78,
			midfield: 81,
			defense: 82,
			goalkeeping: 80,
			mentality: 84,
			overall: 81
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
			attack: 76,
			midfield: 77,
			defense: 79,
			goalkeeping: 78,
			mentality: 80,
			overall: 78
		}
	},
	{
		id: "elche_cf",
		name: "Elche CF",
		shirtIcon: "white_shirt_green_band",
		ratings: {
			attack: 76,
			midfield: 77,
			defense: 77,
			goalkeeping: 76,
			mentality: 78,
			overall: 77
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
			attack: 74,
			midfield: 76,
			defense: 79,
			goalkeeping: 77,
			mentality: 80,
			overall: 77
		}
	},
	{
		id: "girona_fc",
		name: "Girona FC",
		shirtIcon: "red_white_stripes_red_shorts",
		ratings: {
			attack: 75,
			midfield: 76,
			defense: 74,
			goalkeeping: 75,
			mentality: 75,
			overall: 75
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
			defense: 80,
			goalkeeping: 79,
			mentality: 83,
			overall: 83
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
			attack: 75,
			midfield: 76,
			defense: 77,
			goalkeeping: 77,
			mentality: 79,
			overall: 77
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
			attack: 79,
			midfield: 80,
			defense: 79,
			goalkeeping: 78,
			mentality: 83,
			overall: 80
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
			attack: 78,
			midfield: 80,
			defense: 79,
			goalkeeping: 79,
			mentality: 82,
			overall: 80
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
			attack: 89,
			midfield: 87,
			defense: 85,
			goalkeeping: 84,
			mentality: 87,
			overall: 87
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
function clamp$2(value, min, max) {
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
	return roundToOne(clamp$2(1.08 + ratingDiff / 34 + homeBonus, .28, 3.05));
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
	return clamp$2(Math.round(rawGoals), 0, 5);
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
		homeGoals: clamp$2(normalizedHome, 0, 6),
		awayGoals: clamp$2(normalizedAway, 0, 6)
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
	return clamp$2(Math.round(1 + random.next() * 93), 1, 95);
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
function clamp$1(value, min, max) {
	return Math.max(min, Math.min(max, value));
}
var SIMULATION_SESSION_SALT = Date.now() + Math.floor(Math.random() * 1e6);
function seededRandom$1(seed) {
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
			attack: clamp$1(overall + seededSignedOffset(id, 1), 55, 88),
			midfield: clamp$1(overall + seededSignedOffset(id, 2), 55, 88),
			defense: clamp$1(overall + seededSignedOffset(id, 3), 55, 88),
			goalkeeping: clamp$1(overall + seededSignedOffset(id, 4), 55, 88),
			mentality: clamp$1(overall + seededSignedOffset(id, 5), 55, 90),
			overall
		}
	};
}
function seededSignedOffset(id, salt) {
	const seed = id.split("").reduce((sum, char) => sum + char.charCodeAt(0), salt * 19);
	return Math.round(seededRandom$1(seed) * 6 - 3);
}
function createLeagueSeasonSalt() {
	return Date.now() + Math.floor(Math.random() * 1e6);
}
function hashString$1(value) {
	let hash = 0;
	for (let index = 0; index < value.length; index += 1) hash = (hash * 31 + value.charCodeAt(index)) % 1000003;
	return hash;
}
function getTeamSeasonForm(team, seasonSalt) {
	const roll = seededRandom$1(seasonSalt + hashString$1(team.id) * 17);
	const overall = team.ratings.overall;
	if (team.id === "villarreal_cf") {
		if (roll < .12) return 0;
		if (roll < .56) return 1;
		if (roll < .88) return 2;
		return 3;
	}
	if (team.id === "real_betis") {
		if (roll < .05) return -2;
		if (roll < .16) return -1;
		if (roll < .46) return 0;
		if (roll < .72) return 1;
		if (roll < .9) return 2;
		return 3;
	}
	if (team.id === "rayo_vallecano") {
		if (roll < .07) return -3;
		if (roll < .19) return -1;
		if (roll < .43) return 0;
		if (roll < .66) return 2;
		if (roll < .86) return 4;
		return 5;
	}
	if (team.id === "ca_osasuna") {
		if (roll < .04) return -2;
		if (roll < .16) return -1;
		if (roll < .48) return 0;
		if (roll < .74) return 2;
		if (roll < .9) return 4;
		return 5;
	}
	if (team.id === "sevilla_fc") {
		if (roll < .06) return -2;
		if (roll < .18) return -1;
		if (roll < .52) return 0;
		if (roll < .78) return 2;
		if (roll < .94) return 4;
		return 5;
	}
	if (team.id === "deportivo_alaves") {
		if (roll < .08) return -3;
		if (roll < .22) return -1;
		if (roll < .48) return 0;
		if (roll < .7) return 2;
		if (roll < .9) return 4;
		return 5;
	}
	if (team.id === "real_oviedo") {
		if (roll < .06) return -3;
		if (roll < .17) return -1;
		if (roll < .4) return 0;
		if (roll < .64) return 2;
		if (roll < .84) return 4;
		if (roll < .95) return 5;
		return 6;
	}
	if (team.id === "elche_cf") {
		if (roll < .08) return -4;
		if (roll < .22) return -2;
		if (roll < .44) return -1;
		if (roll < .62) return 0;
		if (roll < .8) return 2;
		if (roll < .94) return 4;
		return 5;
	}
	if (team.id === "girona_fc" || team.id === "getafe_cf") {
		if (roll < .08) return -4;
		if (roll < .22) return -2;
		if (roll < .42) return -1;
		if (roll < .6) return 0;
		if (roll < .78) return 2;
		if (roll < .93) return 4;
		return 5;
	}
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
	return clamp$1(Math.round(value + delta), 45, 99);
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
	return (seededRandom$1(seed) - .5) * amplitude;
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
	const selected = source[Math.floor(seededRandom$1(seed) * source.length)] ?? source[0];
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
	const roll = seededRandom$1(seed);
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
	const baseRating = team.ratings.attack * .24 + team.ratings.midfield * .22 + team.ratings.defense * .22 + team.ratings.goalkeeping * .16 + team.ratings.mentality * .16;
	if (team.id === "villarreal_cf") return baseRating + 2.4;
	if (team.id === "ca_osasuna") return baseRating + 3.7;
	if (team.id === "deportivo_alaves") return baseRating + 2;
	if (team.id === "sevilla_fc") return baseRating + 2.4;
	if (team.id === "real_oviedo") return baseRating + 2.4;
	if (team.id === "elche_cf") return baseRating + 1.2;
	if (team.id === "girona_fc") return baseRating + .7;
	if (team.id === "getafe_cf") return baseRating + .7;
	return baseRating;
}
function sampleGoals(expectedGoals, seedBase) {
	const roll = seededRandom$1(seedBase);
	const raw = expectedGoals + (seededRandom$1(seedBase + 9) - .5) * .85;
	if (roll < .16) return Math.max(0, Math.floor(raw - .55));
	if (roll > .91) return clamp$1(Math.round(raw + 1), 0, 5);
	return clamp$1(Math.round(raw), 0, 5);
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
	const homeExpected = clamp$1(1.15 + homeDiff / 38 + .16, .25, 3.1);
	const awayExpected = clamp$1(1.05 + awayDiff / 38 - .14, .2, 2.9);
	const matchSeed = fixture.matchday * 101 + seedOffset + Math.floor(seasonSalt % 1e5);
	const homeExpectedWithNoise = clamp$1(homeExpected + getMatchNoise(matchSeed + 5), .2, 3.25);
	const awayExpectedWithNoise = clamp$1(awayExpected + getMatchNoise(matchSeed + 17), .18, 3.05);
	let homeGoals = sampleGoals(homeExpectedWithNoise, matchSeed);
	let awayGoals = sampleGoals(awayExpectedWithNoise, matchSeed + 17);
	if (Math.abs(homeGoals - awayGoals) >= 4) {
		if (seededRandom$1(matchSeed + fixture.matchday * 37) < .55) if (homeGoals > awayGoals) homeGoals -= 1;
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
		attack: clamp$1(teamRating.attack + Math.round(boost * .45), 40, 99),
		defense: clamp$1(teamRating.defense + Math.round(boost * .35), 40, 99),
		control: clamp$1(teamRating.control + Math.round(boost * .45), 40, 99),
		physical: clamp$1(teamRating.physical + Math.round(boost * .25), 40, 99),
		mentality: clamp$1(teamRating.mentality + boost, 40, 99),
		overall: clamp$1(teamRating.overall + Math.round(boost * .35), 40, 99)
	};
}
function getCupRoundChaos(roundId) {
	if (roundId === "round_of_32") return .66;
	if (roundId === "round_of_16") return .54;
	if (roundId === "quarter_final") return .39;
	if (roundId === "semi_final") return .26;
	return .15;
}
function getCupUnderdogBoost(params) {
	const { underdogAverage, favoriteAverage, underdogIsHome, roundId } = params;
	const ratingGap = favoriteAverage - underdogAverage;
	if (ratingGap < 4) return underdogIsHome ? 1 : 0;
	const baseBoost = ratingGap * getCupRoundChaos(roundId) * .15;
	return clamp$1(Math.round(baseBoost + (underdogIsHome ? 2.7 : .55)), 0, 9);
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
				attack: clamp$1(userRating.attack + Math.round(userHomeUnderdogBoost * .35), 40, 99),
				defense: clamp$1(userRating.defense + Math.round(userHomeUnderdogBoost * .35), 40, 99),
				control: clamp$1(userRating.control + Math.round(userHomeUnderdogBoost * .25), 40, 99),
				mentality: clamp$1(userRating.mentality + userHomeUnderdogBoost, 40, 99),
				overall: clamp$1(userRating.overall + Math.round(userHomeUnderdogBoost * .25), 40, 99)
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
				attack: clamp$1(rival.ratings.attack + underdogBoost, 40, 99),
				midfield: clamp$1(rival.ratings.midfield + Math.round(underdogBoost * .75), 40, 99),
				defense: clamp$1(rival.ratings.defense + Math.round(underdogBoost * .75), 40, 99),
				goalkeeping: clamp$1(rival.ratings.goalkeeping + Math.round(underdogBoost * .45), 40, 99),
				mentality: clamp$1(rival.ratings.mentality + underdogBoost + (rivalIsHome ? 1 : 0), 40, 99),
				overall: clamp$1(rival.ratings.overall + Math.round(underdogBoost * .6), 40, 99)
			}
		},
		userRating: {
			...userRating,
			attack: clamp$1(userRating.attack - favoriteAwayPressure, 40, 99),
			defense: clamp$1(userRating.defense - favoriteAwayPressure, 40, 99),
			control: clamp$1(userRating.control - favoriteAwayPressure, 40, 99),
			mentality: clamp$1(userRating.mentality + 1, 40, 99),
			overall: clamp$1(userRating.overall - favoriteAwayPressure, 40, 99)
		}
	};
}
function applyCupEliteBalance(params) {
	const { expected, teamAverage, opponentAverage, roundId, isHome } = params;
	const ratingDiff = teamAverage - opponentAverage;
	let balancedExpected = expected;
	if (teamAverage >= 89 && opponentAverage >= 80 && ratingDiff >= 4) {
		if (roundId === "final") balancedExpected -= .22;
		else if (roundId === "semi_final") balancedExpected -= .17;
		else if (roundId === "quarter_final") balancedExpected -= .11;
		else if (roundId === "round_of_16") balancedExpected -= .06;
	}
	if (teamAverage >= 80 && opponentAverage >= 89 && ratingDiff <= -4) {
		if (roundId === "final") balancedExpected += .24;
		else if (roundId === "semi_final") balancedExpected += .18;
		else if (roundId === "quarter_final") balancedExpected += .12;
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
	const chaosRoll = seededRandom$1(seed);
	let expected = 1.02 + ratingDiff / 48 + (isHome ? .16 : -.05);
	if (teamIsUnderdog) {
		expected += roundChaos * .28;
		if (isHome) expected += .28 + roundChaos * .22;
		if (chaosRoll > .82 - roundChaos * .22) expected += .42;
	}
	if (teamIsFavorite && !isHome) expected -= roundChaos * .13;
	return clamp$1(applyCupEliteBalance({
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
	const adjustment = venue === "away" ? clamp$1((isVerySmall ? 5 : 3) - fatigue, 0, 4) : -clamp$1((isVerySmall ? 6 : 3) + fatigue, 1, 8);
	const adjust = (value, min = 45, max = 92) => clamp$1(value + adjustment, min, max);
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
	const homeWinsTieBreaker = seededRandom$1(seedBase) >= .5;
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
		const aliveAtHome = seededRandom$1((seed ?? 1300) + index * 53) >= .5;
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
		const userIsHome = cupResult.homeTeamName === userTeamName;
		const rivalAverage = getAverageRivalRating(cupContext.rival);
		const userAverage = cupContext.userRating.overall;
		const rivalIsHomeUnderdog = !userIsHome && rivalAverage + 5 < userAverage;
		const roundTieChaos = getCupRoundChaos(pendingCupFixture.roundId);
		const userAdvantage = (cupContext.userRating.mentality - cupContext.rival.ratings.mentality) / 88;
		const underdogTiePenalty = rivalIsHomeUnderdog ? roundTieChaos * .12 : 0;
		if (seededRandom$1(tieBreakerSeed) < clamp$1(.5 + userAdvantage - underdogTiePenalty, .32, .68)) cupResult = {
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
//#region src/domain/positionRules.ts
function getPlayerRuleLabels(player) {
	return Array.from(new Set([...player.positions.map((position) => String(position)), ...(player.tacticalSlotLabels ?? []).map((label) => String(label))]));
}
function positionFromLabel(label) {
	if (label === "POR") return "POR";
	if (label === "LD" || label === "CAD") return label;
	if (label === "LI" || label === "CAI") return label;
	if (label === "DFC" || label === "DFC-I" || label === "DFC-C" || label === "DFC-D") return "DFC";
	if (label === "MCD") return "MCD";
	if (label === "MC" || label === "MC-I" || label === "MC-C" || label === "MC-D") return "MC";
	if (label === "MP") return "MP";
	if (label === "MI") return "MI";
	if (label === "MD") return "MD";
	if (label === "EI") return "EI";
	if (label === "ED") return "ED";
	if (label === "SD") return "SD";
	if (label === "DC" || label === "DC-I" || label === "DC-D") return "DC";
}
function getExplicitAcceptedLabelsForSlot(slot) {
	return {
		POR: ["POR"],
		LD: ["LD"],
		LI: ["LI"],
		"DFC-I": [
			"DFC",
			"DFC-I",
			"DFC-C",
			"DFC-D"
		],
		"DFC-C": [
			"DFC",
			"DFC-I",
			"DFC-C",
			"DFC-D"
		],
		"DFC-D": [
			"DFC",
			"DFC-I",
			"DFC-C",
			"DFC-D"
		],
		CAD: [
			"CAD",
			"LD",
			"MD"
		],
		CAI: [
			"CAI",
			"LI",
			"MI"
		],
		MCD: [
			"MCD",
			"MC",
			"MC-C"
		],
		MC: [
			"MC",
			"MC-I",
			"MC-C",
			"MC-D",
			"MCD"
		],
		"MC-I": [
			"MC-I",
			"MC",
			"MI",
			"MCD"
		],
		"MC-C": [
			"MC-C",
			"MC",
			"MCD"
		],
		"MC-D": [
			"MC-D",
			"MC",
			"MD",
			"MCD"
		],
		MP: [
			"MP",
			"SD",
			"MC"
		],
		MI: ["MI"],
		MD: ["MD"],
		EI: ["EI", "MI"],
		ED: ["ED", "MD"],
		SD: [
			"SD",
			"MP",
			"DC"
		],
		DC: ["DC", "SD"],
		"DC-I": [
			"DC",
			"SD",
			"EI"
		],
		"DC-D": [
			"DC",
			"SD",
			"ED"
		]
	}[slot.label] ?? [slot.label, ...slot.allowedPositions.map(String)];
}
function getAssignedPosition(player, slot, matchedLabel) {
	const directPosition = player.positions.find((position) => slot.allowedPositions.includes(position));
	if (directPosition) return directPosition;
	const matchedPosition = positionFromLabel(matchedLabel);
	if (matchedPosition && slot.allowedPositions.includes(matchedPosition)) return matchedPosition;
	for (const playerLabel of getPlayerRuleLabels(player)) {
		const mappedPosition = positionFromLabel(playerLabel);
		if (mappedPosition && slot.allowedPositions.includes(mappedPosition)) return mappedPosition;
	}
	return slot.allowedPositions[0];
}
function resolvePlayerSlotPlacement(player, slot) {
	const playerLabels = getPlayerRuleLabels(player);
	const acceptedLabels = getExplicitAcceptedLabelsForSlot(slot);
	const matchedLabel = playerLabels.find((label) => acceptedLabels.includes(label));
	if (!matchedLabel) return {
		canPlace: false,
		reason: `${player.name} no puede ocupar ${slot.label}.`
	};
	const assignedPosition = getAssignedPosition(player, slot, matchedLabel);
	if (!assignedPosition) return {
		canPlace: false,
		reason: `${player.name} no tiene una posicion asignable para ${slot.label}.`
	};
	return {
		canPlace: true,
		assignedPosition
	};
}
function canPlayerFillSlot$1(player, slot) {
	return resolvePlayerSlotPlacement(player, slot).canPlace;
}
//#endregion
//#region src/simulation/teamRating.ts
function getSelectedPlayersAverageOverall(selectedPlayers) {
	if (selectedPlayers.length === 0) return 50;
	return average(selectedPlayers.map((selected) => selected.playerSeason.overall), 50);
}
function getRatingCeilingBySquadAverage(squadAverage, key) {
	if (key === "overall") return Math.min(99, Math.round(squadAverage + 5));
	if (key === "attack") return Math.min(99, Math.round(squadAverage + 8));
	if (key === "defense") return Math.min(99, Math.round(squadAverage + 8));
	if (key === "control") return Math.min(99, Math.round(squadAverage + 8));
	if (key === "physical") return Math.min(99, Math.round(squadAverage + 10));
	if (key === "mentality") return Math.min(99, Math.round(squadAverage + 10));
	if (key === "goalkeeping") return Math.min(99, Math.round(squadAverage + 10));
	return 99;
}
function capRatingBySquadAverage(value, squadAverage, key) {
	return Math.min(value, getRatingCeilingBySquadAverage(squadAverage, key));
}
/**
* Limita cualquier rating al rango 0-100.
*/
function clampRating(value) {
	return Math.max(0, Math.min(100, Math.round(value)));
}
/**
* Media simple segura. Si no hay valores, devuelve fallback.
*/
function average(values, fallback = 0) {
	if (values.length === 0) return fallback;
	return values.reduce((sum, value) => sum + value, 0) / values.length;
}
/**
* Media ponderada segura.
*/
function weightedAverage(items, fallback = 0) {
	const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
	if (totalWeight <= 0) return fallback;
	return items.reduce((sum, item) => sum + item.value * item.weight, 0) / totalWeight;
}
/**
* Calcula un pequeño bonus por confianza de datos.
*
* No queremos que dataConfidence cambie mucho el juego, pero sí evitar que
* jugadores con ratings muy estimados tengan ventaja injusta.
*/
function getDataConfidenceAdjustment(players, coach) {
	const playerConfidence = average(players.map((player) => player.dataConfidence), .6);
	const coachConfidence = coach?.dataConfidence ?? .7;
	const combinedConfidence = playerConfidence * .85 + coachConfidence * .15;
	if (combinedConfidence >= .85) return 1;
	if (combinedConfidence >= .7) return 0;
	if (combinedConfidence >= .55) return -1;
	return -2;
}
/**
* Devuelve los jugadores seleccionados de una línea concreta según el slot de formación.
*/
function getPlayersByLine(selectedPlayers, formation, line) {
	const slotIds = new Set(formation.slots.filter((slot) => slot.line === line).map((slot) => slot.id));
	return selectedPlayers.filter((selected) => slotIds.has(selected.slotId));
}
/**
* Aplica una pequeña bonificación/penalización si el once está completo o incompleto.
*
* Durante la construcción del once puede haber menos de 11 jugadores; esta función permite
* calcular un rating provisional sin romper la aplicación.
*/
function getCompletenessAdjustment(selectedPlayers, formation) {
	const expectedPlayers = formation.slots.length;
	const selectedCount = selectedPlayers.length;
	if (selectedCount >= expectedPlayers) return 0;
	return -(expectedPlayers - selectedCount) * 3;
}
/**
* Penaliza duplicados de slot o alineaciones incompletas.
*/
function getSelectionValidityAdjustment(selectedPlayers, formation) {
	const validSlotIds = new Set(formation.slots.map((slot) => slot.id));
	const usedSlotIds = /* @__PURE__ */ new Set();
	let penalty = 0;
	for (const selected of selectedPlayers) {
		if (!validSlotIds.has(selected.slotId)) penalty -= 5;
		if (usedSlotIds.has(selected.slotId)) penalty -= 8;
		usedSlotIds.add(selected.slotId);
	}
	return penalty;
}
/**
* Calcula medias por línea usando el overall de cada jugador.
*/
function calculateLineAverages(selectedPlayers, formation) {
	const goalkeepers = getPlayersByLine(selectedPlayers, formation, "goalkeeper");
	const defenders = getPlayersByLine(selectedPlayers, formation, "defense");
	const midfielders = getPlayersByLine(selectedPlayers, formation, "midfield");
	const attackers = getPlayersByLine(selectedPlayers, formation, "attack");
	return {
		goalkeeper: average(goalkeepers.map((selected) => selected.playerSeason.overall), 50),
		defense: average(defenders.map((selected) => selected.playerSeason.overall), 50),
		midfield: average(midfielders.map((selected) => selected.playerSeason.overall), 50),
		attack: average(attackers.map((selected) => selected.playerSeason.overall), 50)
	};
}
/**
* Calcula los ratings base sin formaciones ni entrenador.
*/
function calculateBaseRatings(selectedPlayers, formation) {
	const players = selectedPlayers.map((selected) => selected.playerSeason);
	const lineAverages = calculateLineAverages(selectedPlayers, formation);
	const goalkeepers = getPlayersByLine(selectedPlayers, formation, "goalkeeper").map((selected) => selected.playerSeason);
	const defenders = getPlayersByLine(selectedPlayers, formation, "defense").map((selected) => selected.playerSeason);
	const midfielders = getPlayersByLine(selectedPlayers, formation, "midfield").map((selected) => selected.playerSeason);
	const attackers = getPlayersByLine(selectedPlayers, formation, "attack").map((selected) => selected.playerSeason);
	const attack = weightedAverage([
		{
			value: average(attackers.map((player) => player.skills.shooting * .4 + player.skills.dribbling * .25 + player.skills.pace * .2 + player.skills.passing * .15), 50),
			weight: .5
		},
		{
			value: average(midfielders.map((player) => player.skills.passing * .45 + player.skills.dribbling * .25 + player.skills.shooting * .2 + player.skills.mentality * .1), 50),
			weight: .25
		},
		{
			value: average(players.map((player) => player.overall), 50),
			weight: .25
		}
	]);
	const defense = weightedAverage([
		{
			value: average(defenders.map((player) => player.skills.defending * .45 + player.skills.physical * .3 + player.skills.mentality * .15 + player.skills.pace * .1), 50),
			weight: .45
		},
		{
			value: average(midfielders.map((player) => player.skills.defending * .35 + player.skills.physical * .25 + player.skills.passing * .2 + player.skills.mentality * .2), 50),
			weight: .25
		},
		{
			value: average(goalkeepers.map((player) => player.skills.goalkeeping * .75 + player.skills.mentality * .15 + player.skills.physical * .1), 50),
			weight: .3
		}
	]);
	const control = weightedAverage([
		{
			value: average(midfielders.map((player) => player.skills.passing * .45 + player.skills.dribbling * .2 + player.skills.mentality * .2 + player.skills.physical * .15), 50),
			weight: .5
		},
		{
			value: average(defenders.map((player) => player.skills.passing * .5 + player.skills.mentality * .25 + player.skills.defending * .25), 50),
			weight: .2
		},
		{
			value: average(attackers.map((player) => player.skills.passing * .35 + player.skills.dribbling * .35 + player.skills.mentality * .3), 50),
			weight: .3
		}
	]);
	const physical = average(players.map((player) => player.skills.physical * .7 + player.skills.pace * .3), 50);
	const mentality = average(players.map((player) => player.skills.mentality), 50);
	const goalkeeping = average(goalkeepers.map((player) => player.skills.goalkeeping * .8 + player.skills.mentality * .1 + player.skills.passing * .1), 50);
	return {
		attack,
		defense,
		control,
		physical,
		mentality,
		goalkeeping,
		overall: weightedAverage([
			{
				value: attack,
				weight: .24
			},
			{
				value: defense,
				weight: .24
			},
			{
				value: control,
				weight: .18
			},
			{
				value: physical,
				weight: .1
			},
			{
				value: mentality,
				weight: .12
			},
			{
				value: goalkeeping,
				weight: .12
			}
		]),
		lineAverages
	};
}
/**
* Aplica modificadores de formación.
*/
function applyFormationModifiers(rating, formation) {
	const { modifiers } = formation;
	const attack = rating.attack + modifiers.attack;
	const defense = rating.defense + modifiers.defense;
	const control = rating.control + modifiers.control;
	/**
	* El riesgo táctico no se aplica directamente como "malo".
	* - Riesgo positivo: sube techo ofensivo, baja estabilidad defensiva.
	* - Riesgo negativo: sube estabilidad defensiva, baja algo el techo ofensivo.
	*/
	const riskAttackAdjustment = modifiers.risk > 0 ? modifiers.risk * .6 : modifiers.risk * .25;
	const riskDefenseAdjustment = modifiers.risk > 0 ? -modifiers.risk * .6 : Math.abs(modifiers.risk) * .5;
	const adjustedAttack = attack + riskAttackAdjustment;
	const adjustedDefense = defense + riskDefenseAdjustment;
	const overall = weightedAverage([
		{
			value: adjustedAttack,
			weight: .24
		},
		{
			value: adjustedDefense,
			weight: .24
		},
		{
			value: control,
			weight: .18
		},
		{
			value: rating.physical,
			weight: .1
		},
		{
			value: rating.mentality,
			weight: .12
		},
		{
			value: rating.goalkeeping,
			weight: .12
		}
	]);
	return {
		...rating,
		attack: adjustedAttack,
		defense: adjustedDefense,
		control,
		overall
	};
}
/**
* Aplica modificadores del entrenador.
*/
function applyCoachModifiers(rating, selectedCoach) {
	if (!selectedCoach) return rating;
	const coach = selectedCoach.coachSeason;
	/**
	* El entrenador suma como ajuste moderado, no debe tapar el nivel real del once.
	* Escala:
	* - entrenador 50: no suma ni resta
	* - entrenador 90: suma aprox +4
	*/
	const attackBonus = (coach.skills.attack - 50) * .1;
	const defenseBonus = (coach.skills.defense - 50) * .1;
	const controlBonus = (coach.skills.management - 50) * .07;
	const mentalityBonus = (coach.skills.mentality - 50) * .12;
	const attack = rating.attack + attackBonus;
	const defense = rating.defense + defenseBonus;
	const control = rating.control + controlBonus;
	const mentality = rating.mentality + mentalityBonus;
	const overall = weightedAverage([
		{
			value: attack,
			weight: .24
		},
		{
			value: defense,
			weight: .24
		},
		{
			value: control,
			weight: .18
		},
		{
			value: rating.physical,
			weight: .1
		},
		{
			value: mentality,
			weight: .12
		},
		{
			value: rating.goalkeeping,
			weight: .12
		}
	]);
	return {
		...rating,
		attack,
		defense,
		control,
		mentality,
		overall
	};
}
/**
* Detecta puntos fuertes del once.
*/
function detectStrengths(rating) {
	const strengths = [];
	if (rating.attack >= 84) strengths.push("Ataque de mucho nivel");
	if (rating.defense >= 84) strengths.push("Defensa muy fiable");
	if (rating.control >= 84) strengths.push("Gran control del centro del campo");
	if (rating.physical >= 84) strengths.push("Equipo poderoso en duelos e intensidad");
	if (rating.mentality >= 86) strengths.push("Mentalidad competitiva muy alta");
	if (rating.goalkeeping >= 84) strengths.push("Portería diferencial");
	if (strengths.length === 0 && rating.overall >= 78) strengths.push("Equipo equilibrado sin grandes puntos débiles");
	if (strengths.length === 0) strengths.push("Once competitivo, aunque todavía mejorable");
	return strengths;
}
/**
* Detecta puntos débiles del once.
*/
function detectWeaknesses(rating) {
	const weaknesses = [];
	if (rating.attack < 72) weaknesses.push("Puede tener problemas para generar goles");
	if (rating.defense < 72) weaknesses.push("Puede sufrir defensivamente ante rivales fuertes");
	if (rating.control < 72) weaknesses.push("Puede perder el control de los partidos");
	if (rating.physical < 70) weaknesses.push("Puede sufrir en duelos físicos");
	if (rating.mentality < 72) weaknesses.push("Puede ser irregular en partidos igualados");
	if (rating.goalkeeping < 72) weaknesses.push("La portería no parece diferencial");
	if (rating.attack >= 86 && rating.defense < 76) weaknesses.push("Equipo ofensivo, pero con riesgo de encajar demasiado");
	if (rating.defense >= 86 && rating.attack < 76) weaknesses.push("Equipo sólido, pero puede quedarse corto en ataque");
	if (weaknesses.length === 0) weaknesses.push("No presenta debilidades graves en el papel");
	return weaknesses;
}
/**
* Etiqueta general del perfil del equipo.
*/
function detectProfileLabel(rating) {
	if (rating.overall >= 88 && rating.attack >= 84 && rating.defense >= 84) return "Once histórico de nivel campeón";
	if (rating.attack >= 86 && rating.defense < 80) return "Equipo ofensivo y vertical";
	if (rating.defense >= 86 && rating.attack < 80) return "Equipo sólido y competitivo";
	if (rating.control >= 86) return "Equipo dominador de mediocampo";
	if (rating.physical >= 86) return "Equipo físico e intenso";
	if (rating.overall >= 82) return "Equipo equilibrado de alto nivel";
	if (rating.overall >= 76) return "Equipo competitivo";
	return "Equipo irregular y mejorable";
}
/**
* Calcula el rating colectivo del Athletic histórico del usuario.
*
* Esta función no simula partidos. Solo convierte:
* - formación
* - 11 jugadores elegidos
* - entrenador elegido
*
* en una ficha de equipo que luego usará matchEngine.ts.
*/
function calculateTeamRating(params) {
	const { selectedPlayers, selectedCoach, formation } = params;
	const playerSeasons = selectedPlayers.map((selected) => selected.playerSeason);
	const squadAverage = getSelectedPlayersAverageOverall(selectedPlayers);
	const coach = selectedCoach?.coachSeason;
	const withCoach = applyCoachModifiers(applyFormationModifiers(calculateBaseRatings(selectedPlayers, formation), formation), selectedCoach);
	const completenessAdjustment = getCompletenessAdjustment(selectedPlayers, formation);
	const validityAdjustment = getSelectionValidityAdjustment(selectedPlayers, formation);
	const dataConfidenceAdjustment = getDataConfidenceAdjustment(playerSeasons, coach);
	const globalAdjustment = completenessAdjustment + validityAdjustment + dataConfidenceAdjustment;
	const numericRating = {
		attack: clampRating(withCoach.attack + globalAdjustment),
		defense: clampRating(withCoach.defense + globalAdjustment),
		control: clampRating(withCoach.control + globalAdjustment),
		physical: clampRating(withCoach.physical + globalAdjustment),
		mentality: clampRating(withCoach.mentality + globalAdjustment),
		goalkeeping: clampRating(withCoach.goalkeeping + globalAdjustment),
		overall: clampRating(withCoach.overall + globalAdjustment)
	};
	const cappedRating = {
		attack: clampRating(capRatingBySquadAverage(numericRating.attack, squadAverage, "attack")),
		defense: clampRating(capRatingBySquadAverage(numericRating.defense, squadAverage, "defense")),
		control: clampRating(capRatingBySquadAverage(numericRating.control, squadAverage, "control")),
		physical: clampRating(capRatingBySquadAverage(numericRating.physical, squadAverage, "physical")),
		mentality: clampRating(capRatingBySquadAverage(numericRating.mentality, squadAverage, "mentality")),
		goalkeeping: clampRating(capRatingBySquadAverage(numericRating.goalkeeping, squadAverage, "goalkeeping")),
		overall: clampRating(capRatingBySquadAverage(numericRating.overall, squadAverage, "overall"))
	};
	return {
		...cappedRating,
		profileLabel: detectProfileLabel(cappedRating),
		strengths: detectStrengths(cappedRating),
		weaknesses: detectWeaknesses(cappedRating)
	};
}
/**
* Comprueba si un jugador puede ocupar un hueco concreto de la formación.
*
* Wrapper legacy: la regla real vive en domain/positionRules.ts.
*/
function canPlayerFillSlot(player, slot) {
	return canPlayerFillSlot$1(player, slot);
}
//#endregion
//#region scripts/balanceAuditCli.ts
var DEFAULT_OPTIONS = {
	simulations: 100,
	difficulty: "normal",
	range: "all",
	formationId: "4-3-3",
	profile: "balanced",
	jsonOnly: false,
	cupReport: false
};
function parseArgs(argv) {
	const options = { ...DEFAULT_OPTIONS };
	for (const arg of argv) {
		if (arg === "--help" || arg === "-h") {
			printHelp();
			process.exit(0);
		}
		const [rawKey, rawValue] = arg.replace(/^--/, "").split("=");
		const value = rawValue ?? "";
		if (rawKey === "sims" || rawKey === "simulations") {
			const parsed = Number(value);
			if (!Number.isFinite(parsed) || parsed <= 0) throw new Error("--sims debe ser un número positivo. Ejemplo: --sims=50");
			options.simulations = Math.round(parsed);
			continue;
		}
		if (rawKey === "difficulty") {
			if (![
				"facil",
				"normal",
				"leyenda"
			].includes(value)) throw new Error("--difficulty debe ser facil, normal o leyenda.");
			options.difficulty = value;
			continue;
		}
		if (rawKey === "range") {
			const validRanges = EASY_MODE_SEASON_RANGES.map((range) => range.id);
			if (!validRanges.includes(value)) throw new Error(`--range debe ser uno de: ${validRanges.join(", ")}.`);
			options.range = value;
			continue;
		}
		if (rawKey === "formation") {
			options.formationId = value;
			continue;
		}
		if (rawKey === "profile") {
			if (![
				"legendary",
				"strong",
				"balanced",
				"weak",
				"random"
			].includes(value)) throw new Error("--profile debe ser legendary, strong, balanced, weak o random.");
			options.profile = value;
			continue;
		}
		if (rawKey === "out") {
			options.out = value;
			continue;
		}
		if (rawKey === "csv") {
			options.csv = value;
			continue;
		}
		if (rawKey === "json") {
			options.jsonOnly = true;
			continue;
		}
		if (rawKey === "cup-report" || rawKey === "copa") {
			options.cupReport = true;
			continue;
		}
	}
	return options;
}
function printHelp() {
	console.log(`\nFutbol11 · Auditoría de balance por PowerShell\n\nUso:\n  npm run audit:balance\n  npm run audit:balance -- --sims=100 --profile=balanced --difficulty=normal --range=recent\n\nOpciones:\n  --sims=100             Número de temporadas completas a simular\n  --difficulty=normal    facil | normal | leyenda\n  --range=all            all | classic | transition | modern | recent\n  --formation=4-3-3      Formación usada para construir el once automático\n  --profile=balanced     legendary | strong | balanced | weak | random\n  --out=reports/x.json   Guarda informe JSON\n  --csv=reports/x.csv    Guarda resultados por simulación en CSV\n  --json                 Imprime solo JSON por consola\n\nPerfiles:\n  legendary              Once histórico top, útil para probar techo de rendimiento\n  balanced               Once competitivo normal, mejor perfil por defecto para balance\n  random                 Once aleatorio viable, útil para detectar varianza real de partidas\n`);
}
function normalizeName(value) {
	return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function isEliteName(teamName) {
	const normalized = normalizeName(teamName);
	return normalized.includes("real madrid") || normalized.includes("barcelona") || normalized.includes("atletico");
}
function countByName(values) {
	const counts = /* @__PURE__ */ new Map();
	for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
	return [...counts.entries()].sort((a, b) => {
		if (b[1] !== a[1]) return b[1] - a[1];
		return a[0].localeCompare(b[0]);
	});
}
function normalizeCupRoundForAudit(value) {
	if (value.includes("Campeón de Copa")) return "Campeón";
	if (value.includes("Final")) return "Finalista";
	if (value.includes("Semifinal")) return "Semifinal";
	if (value.includes("Cuartos")) return "Cuartos";
	if (value.includes("Octavos")) return "Octavos";
	if (value.includes("Dieciseisavos")) return "Dieciseisavos";
	return value || "Sin dato";
}
function getAthleticPosition(table) {
	return table.findIndex((row) => row.teamName === USER_TEAM_NAME) + 1;
}
function createBalanceWarning(params) {
	const warnings = [];
	if (params.relegatedTeams.map(normalizeName).some((name) => name.includes("villarreal"))) warnings.push("Villarreal desciende");
	if (params.athleticPosition > 10) warnings.push("Athletic bajo");
	if (isEliteName(params.leagueChampion) && isEliteName(params.cupChampion)) warnings.push("doblete/monopolio élite");
	return warnings.length === 0 ? "OK" : warnings.join(" · ");
}
function createAggregate(rows) {
	const simulations = rows.length || 1;
	return {
		simulations,
		athleticAveragePosition: rows.reduce((sum, row) => sum + row.athleticPosition, 0) / simulations,
		athleticAveragePoints: rows.reduce((sum, row) => sum + row.athleticPoints, 0) / simulations,
		athleticTop4Count: rows.filter((row) => row.athleticPosition <= 4).length,
		athleticLeagueTitles: rows.filter((row) => row.athleticPosition === 1).length,
		athleticCupTitles: rows.filter((row) => row.cupChampion === USER_TEAM_NAME).length,
		villarrealRelegations: rows.filter((row) => row.relegatedTeams.some((team) => normalizeName(team).includes("villarreal"))).length,
		eliteCupTitles: rows.filter((row) => isEliteName(row.cupChampion)).length,
		leagueChampionCounts: countByName(rows.map((row) => row.leagueChampion)),
		cupChampionCounts: countByName(rows.map((row) => row.cupChampion)),
		relegationCounts: countByName(rows.flatMap((row) => row.relegatedTeams)),
		cupRoundCounts: countByName(rows.map((row) => normalizeCupRoundForAudit(row.cupRound)))
	};
}
function clamp(value, min, max) {
	return Math.max(min, Math.min(max, value));
}
function toInternalDifficulty(difficulty) {
	if (difficulty === "facil") return "normal";
	if (difficulty === "normal") return "dificil";
	return "leyenda";
}
function applyDifficultyToTeamRating(teamRating, difficulty) {
	const internalDifficulty = toInternalDifficulty(difficulty);
	const modifier = internalDifficulty === "normal" ? 2 : internalDifficulty === "leyenda" ? -4 : 0;
	const apply = (value) => clamp(Math.round(value + modifier), 40, 99);
	return {
		...teamRating,
		attack: apply(teamRating.attack),
		defense: apply(teamRating.defense),
		control: apply(teamRating.control),
		physical: apply(teamRating.physical),
		mentality: apply(teamRating.mentality),
		goalkeeping: apply(teamRating.goalkeeping),
		overall: apply(teamRating.overall)
	};
}
function getRangeYears(rangeId) {
	const range = EASY_MODE_SEASON_RANGES.find((item) => item.id === rangeId);
	if (!range) return {
		from: 1928,
		to: 2025,
		label: "Todas las temporadas"
	};
	return {
		from: range.from ?? 1928,
		to: range.to ?? 2025,
		label: range.label
	};
}
function getSeasonStartYear(season) {
	const start = Number(season.split("/")[0]);
	return Number.isFinite(start) ? start : 0;
}
function getPlayersForRange(rangeId) {
	const { from, to } = getRangeYears(rangeId);
	return ATHLETIC_SEASONS.filter((season) => {
		const startYear = getSeasonStartYear(season.season);
		return startYear >= from && startYear <= to;
	}).flatMap((season) => season.players);
}
function getCoachForRange(rangeId) {
	const { from, to } = getRangeYears(rangeId);
	const coachSeason = ATHLETIC_SEASONS.filter((season) => {
		const startYear = getSeasonStartYear(season.season);
		return startYear >= from && startYear <= to;
	}).map((season) => season.coach).sort((a, b) => b.overall - a.overall || b.dataConfidence - a.dataConfidence)[0];
	return coachSeason ? { coachSeason } : void 0;
}
function findFormation(formationId) {
	const formation = FORMATIONS.find((item) => item.id === formationId) ?? FORMATIONS[0];
	if (!formation) throw new Error("No hay formaciones disponibles.");
	return formation;
}
function seededRandom(seed) {
	const x = Math.sin(seed + 20261503) * 1e4;
	return x - Math.floor(x);
}
function hashString(value) {
	let hash = 0;
	for (let index = 0; index < value.length; index += 1) hash = (hash * 31 + value.charCodeAt(index)) % 1000003;
	return hash;
}
function getProfileCandidateScore(params) {
	const { player, slotLabel, profile, seed } = params;
	const tacticalBonus = player.tacticalSlotLabels?.some((label) => label === slotLabel) ? 140 : 0;
	if (profile === "legendary") return tacticalBonus + player.overall * 10 + player.dataConfidence;
	const getTargetProfileScore = (target, floor, ceiling) => {
		const distancePenalty = Math.abs(player.overall - target) * 18;
		const tooLowPenalty = player.overall < floor ? 180 + (floor - player.overall) * 22 : 0;
		const tooHighPenalty = player.overall > ceiling ? 180 + (player.overall - ceiling) * 34 : 0;
		const confidenceBonus = player.dataConfidence * .55;
		return tacticalBonus + 1200 - distancePenalty - tooLowPenalty - tooHighPenalty + confidenceBonus;
	};
	if (profile === "strong") return getTargetProfileScore(84, 80, 86);
	if (profile === "balanced") return getTargetProfileScore(80, 76, 83);
	if (profile === "weak") return getTargetProfileScore(76, 72, 80);
	const random = seededRandom(seed + hashString(`${player.id}_${slotLabel}`));
	const viableBandBonus = player.overall >= 76 && player.overall <= 84 ? 90 : 0;
	const elitePenalty = player.overall > 86 ? 130 + (player.overall - 86) * 25 : 0;
	const lowPenalty = player.overall < 72 ? 120 : 0;
	return tacticalBonus + player.overall * 2.2 + viableBandBonus + random * 260 - elitePenalty - lowPenalty;
}
function createAutomaticEleven(params) {
	const { formation, range, profile, seed = 20261503 } = params;
	const players = getPlayersForRange(range);
	const selected = [];
	const usedCanonicalIds = /* @__PURE__ */ new Set();
	const slotsByScarcity = [...formation.slots].sort((a, b) => {
		return players.filter((player) => canPlayerFillSlot(player, a)).length - players.filter((player) => canPlayerFillSlot(player, b)).length;
	});
	for (const slot of slotsByScarcity) {
		const candidate = players.filter((player) => !usedCanonicalIds.has(player.canonicalPlayerId)).filter((player) => canPlayerFillSlot(player, slot)).sort((a, b) => {
			const scoreB = getProfileCandidateScore({
				player: b,
				slotLabel: slot.label,
				profile,
				seed
			});
			const scoreA = getProfileCandidateScore({
				player: a,
				slotLabel: slot.label,
				profile,
				seed
			});
			if (scoreB !== scoreA) return scoreB - scoreA;
			if (b.overall !== a.overall) return b.overall - a.overall;
			return b.dataConfidence - a.dataConfidence;
		})[0];
		if (!candidate) throw new Error(`No se pudo construir once automático: falta jugador para ${slot.label}.`);
		usedCanonicalIds.add(candidate.canonicalPlayerId);
		selected.push({
			slotId: slot.id,
			position: candidate.positions[0],
			playerSeason: candidate
		});
	}
	return selected.sort((a, b) => {
		return formation.slots.findIndex((slot) => slot.id === a.slotId) - formation.slots.findIndex((slot) => slot.id === b.slotId);
	});
}
function runBalanceAudit(params) {
	const { options, selectedPlayers, teamRating } = params;
	const baseSeed = Date.now() + Math.floor(Math.random() * 1e6);
	const rows = [];
	for (let index = 0; index < options.simulations; index += 1) {
		const finalContext = simulateFullCupAndLeague({
			context: createUserLeagueSimulation(),
			teamRating,
			selectedPlayers,
			seed: baseSeed + index * 1009
		});
		const summary = createFinalLeagueSummary({
			gameId: `balance_cli_${baseSeed}_${index}`,
			formationName: options.formationId,
			coachName: "Once automático CLI",
			context: finalContext
		});
		const table = summary.table ?? [];
		const leagueChampion = table[0]?.teamName ?? "Sin dato";
		const athleticPosition = getAthleticPosition(table) || summary.leaguePosition;
		const relegatedTeams = table.slice(-3).map((row) => row.teamName);
		const cupChampion = summary.cupChampionTeamName ?? (summary.cupTrophyWon ? "Athletic Club Histórico" : "Sin dato");
		rows.push({
			index: index + 1,
			leagueChampion,
			athleticPosition,
			athleticPoints: summary.points,
			cupChampion,
			cupRound: summary.cupRoundReached ?? "Sin dato",
			relegatedTeams,
			warning: createBalanceWarning({
				leagueChampion,
				cupChampion,
				athleticPosition,
				relegatedTeams
			})
		});
	}
	return rows;
}
function ensureParentDirectory(filePath) {
	const directory = path.dirname(filePath);
	if (directory && directory !== ".") fs.mkdirSync(directory, { recursive: true });
}
function toCsv(rows) {
	const escape = (value) => `"${String(value).replace(/"/g, "\"\"")}"`;
	const header = [
		"simulacion",
		"campeon_liga",
		"athletic_posicion",
		"athletic_puntos",
		"campeon_copa",
		"ronda_copa",
		"descensos",
		"alerta"
	];
	const lines = rows.map((row) => [
		row.index,
		row.leagueChampion,
		row.athleticPosition,
		row.athleticPoints,
		row.cupChampion,
		row.cupRound,
		row.relegatedTeams.join(" | "),
		row.warning
	].map(escape).join(","));
	return [header.join(","), ...lines].join("\n");
}
function printHumanReport(params) {
	const { options, formation, selectedPlayers, teamRating, aggregate, rows } = params;
	const range = getRangeYears(options.range);
	console.log("\nFutbol11 · Auditoría de balance por PowerShell");
	console.log("================================================");
	console.log(`Simulaciones: ${options.simulations}`);
	console.log(`Dificultad: ${options.difficulty}`);
	console.log(`Perfil auditoría: ${options.profile}`);
	console.log(`Rango: ${range.label} (${range.from}-${range.to})`);
	console.log(`Formación: ${formation.name}`);
	console.log(`Rating once automático: ${teamRating.overall} (${teamRating.profileLabel})`);
	console.log("\nOnce automático usado:");
	for (const selected of selectedPlayers) console.log(`- ${selected.playerSeason.name} ${selected.playerSeason.season} · ${selected.playerSeason.overall} · ${selected.playerSeason.positions.join("/")}`);
	console.log("\nResumen:");
	console.log(`- Media Athletic: ${aggregate.athleticAveragePosition.toFixed(1)}º · ${aggregate.athleticAveragePoints.toFixed(1)} pts`);
	console.log(`- Top 4 Athletic: ${aggregate.athleticTop4Count}/${aggregate.simulations}`);
	console.log(`- Ligas Athletic: ${aggregate.athleticLeagueTitles}/${aggregate.simulations}`);
	console.log(`- Copas Athletic: ${aggregate.athleticCupTitles}/${aggregate.simulations}`);
	console.log(`- Copas ganadas por élite: ${aggregate.eliteCupTitles}/${aggregate.simulations}`);
	console.log(`- Descensos Villarreal: ${aggregate.villarrealRelegations}/${aggregate.simulations}`);
	console.log("\nTop campeones de Liga:");
	for (const [team, count] of aggregate.leagueChampionCounts.slice(0, 8)) console.log(`- ${team}: ${count}`);
	console.log("\nTop campeones de Copa:");
	for (const [team, count] of aggregate.cupChampionCounts.slice(0, 8)) console.log(`- ${team}: ${count}`);
	if (options.cupReport) {
		console.log("\nRondas alcanzadas por Athletic en Copa:");
		for (const [round, count] of aggregate.cupRoundCounts) console.log(`- ${round}: ${count}/${aggregate.simulations}`);
	}
	console.log("\nTabla de descensos:");
	for (const [team, count] of aggregate.relegationCounts) console.log(`- ${team}: ${count}/${aggregate.simulations}`);
	const warnings = rows.filter((row) => row.warning !== "OK");
	console.log("\nAlertas:");
	if (warnings.length === 0) console.log("- OK: sin alertas rápidas.");
	else {
		for (const warning of warnings.slice(0, 15)) console.log(`- Sim ${warning.index}: ${warning.warning}`);
		if (warnings.length > 15) console.log(`- ... ${warnings.length - 15} alertas más`);
	}
}
function main() {
	const options = parseArgs(process.argv.slice(2));
	const formation = findFormation(options.formationId);
	const selectedPlayers = createAutomaticEleven({
		formation,
		range: options.range,
		profile: options.profile,
		seed: Date.now() + Math.floor(Math.random() * 1e6)
	});
	const selectedCoach = getCoachForRange(options.range);
	const teamRating = applyDifficultyToTeamRating(calculateTeamRating({
		selectedPlayers,
		selectedCoach,
		formation
	}), options.difficulty);
	const rows = runBalanceAudit({
		options,
		selectedPlayers,
		teamRating
	});
	const aggregate = createAggregate(rows);
	const report = {
		generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		options,
		formation: formation.name,
		selectedCoach: selectedCoach?.coachSeason.name ?? null,
		teamRating,
		selectedPlayers: selectedPlayers.map((selected) => ({
			slotId: selected.slotId,
			name: selected.playerSeason.name,
			season: selected.playerSeason.season,
			overall: selected.playerSeason.overall,
			positions: selected.playerSeason.positions
		})),
		aggregate,
		rows
	};
	if (options.out) {
		ensureParentDirectory(options.out);
		fs.writeFileSync(options.out, `${JSON.stringify(report, null, 2)}\n`, "utf8");
	}
	if (options.csv) {
		ensureParentDirectory(options.csv);
		fs.writeFileSync(options.csv, `${toCsv(rows)}\n`, "utf8");
	}
	if (options.jsonOnly) console.log(JSON.stringify(report, null, 2));
	else {
		printHumanReport({
			options,
			formation,
			selectedPlayers,
			teamRating,
			aggregate,
			rows
		});
		if (options.out) console.log(`\nJSON guardado en: ${options.out}`);
		if (options.csv) console.log(`CSV guardado en: ${options.csv}`);
	}
}
try {
	main();
} catch (error) {
	console.error("\nError en auditoría de balance:");
	console.error(error instanceof Error ? error.message : error);
	console.error("\nUsa: npm run audit:balance -- --help");
	process.exit(1);
}
//#endregion
export {};
