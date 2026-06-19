import {
  createUserLeagueSimulation,
  simulateFullCupAndLeague,
  createFinalLeagueSummary,
} from "../../src/simulation/leagueSimulator";

const RUNS = Number(process.env.AUDIT_RUNS ?? "10");

const teamRating = {
  attack: Number(process.env.AUDIT_ATTACK ?? "93"),
  defense: Number(process.env.AUDIT_DEFENSE ?? "93"),
  control: Number(process.env.AUDIT_CONTROL ?? "93"),
  physical: Number(process.env.AUDIT_PHYSICAL ?? "90"),
  mentality: Number(process.env.AUDIT_MENTALITY ?? "90"),
  goalkeeping: Number(process.env.AUDIT_GOALKEEPING ?? "95"),
  overall: Number(process.env.AUDIT_OVERALL ?? "90"),
  profileLabel: "Audit batch rating",
};

function stripAccents(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function normalizeKnownMojibake(value: string): string {
  return value
    .replace(/â”œÃ¢â”¬Â®|â”œÂ®|ÃƒÂ©|ÃƒÂ¨/g, "e")
    .replace(/â”œÃ¢â”¬Â¡|â”œÂ¡|ÃƒÃ­|ÃƒÂ­/g, "i")
    .replace(/â”œÃ¢â”¬â”‚|â”œâ”‚|ÃƒÃ³|ÃƒÂ³/g, "o")
    .replace(/â”œÃ¢â”¬Âº|â”œÂº|ÃƒÃ§|ÃƒÂ§/g, "c")
    .replace(/â”œÃ¢â”¬Â±|â”œÂ±|ÃƒÃ±/g, "n")
    .replace(/Ã‚Âº/g, "")
    .replace(/Hist.*rico/g, "Historico")
    .replace(/Alav.*s/g, "Alaves");
}

function norm(value: unknown): string {
  return stripAccents(normalizeKnownMojibake(String(value ?? "")))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function cleanName(value: unknown): string {
  return normalizeKnownMojibake(stripAccents(String(value ?? "")))
    .replace(/Hist.*rico/g, "Historico")
    .replace(/Alav.*s/g, "Alaves")
    .replace(/Ã‚Âº/g, "")
    .trim();
}

function getPosition(summary: any, matcher: (row: any) => boolean): number {
  const index = summary.table.findIndex(matcher);
  return index >= 0 ? index + 1 : 0;
}

function isTeam(row: any, needle: string): boolean {
  const haystack = `${row.teamName ?? ""} ${row.teamId ?? ""}`;
  return norm(haystack).includes(norm(needle));
}

function isWatchedRelegated(row: any, watched: string): boolean {
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

const selectedPlayers: any[] = [];
const results: any[] = [];

for (let i = 1; i <= RUNS; i += 1) {
  const seed = 143000 + i * 1009;
  let context = createUserLeagueSimulation();
  context = simulateFullCupAndLeague({
    context,
    teamRating: teamRating as any,
    selectedPlayers,
    userTeamName: "Athletic Club Historico",
    seed,
  });

  const summary = createFinalLeagueSummary({
    gameId: `audit-${i}`,
    formationName: "Audit",
    coachName: "Audit",
    context,
    userTeamName: "Athletic Club Historico",
  });

  const table = summary.table;
  const relegated = table.slice(-3);

  results.push({
    run: i,
    seed,
    leaguePosition: summary.leaguePosition,
    points: summary.points,
    cupStatus: summary.cupStatus,
    cupChampion: cleanName(summary.cupChampionTeamName ?? ""),
    cupRunnerUp: cleanName(summary.cupRunnerUpTeamName ?? ""),
    relegated: relegated.map((row: any) => ({
      teamId: cleanName(row.teamId),
      teamName: cleanName(row.teamName),
      points: row.points,
      goalDifference: row.goalDifference,
    })),
    watchedPositions: {
      Villarreal: getPosition(summary, (row: any) => isTeam(row, "Villarreal")),
      Girona: getPosition(summary, (row: any) => isTeam(row, "Girona")),
      Sevilla: getPosition(summary, (row: any) => isTeam(row, "Sevilla")),
      Valencia: getPosition(summary, (row: any) => isTeam(row, "Valencia")),
      Oviedo: getPosition(summary, (row: any) => isTeam(row, "Oviedo")),
      Alaves: getPosition(summary, (row: any) => isTeam(row, "Alaves")),
      Osasuna: getPosition(summary, (row: any) => isTeam(row, "Osasuna")),
    },
  });
}

const watchedTeams = [
  "Real Oviedo",
  "Deportivo Alaves",
  "CA Osasuna",
  "Villarreal CF",
  "Girona FC",
  "Sevilla FC",
  "Valencia CF",
];

const relegationCounts: Record<string, number> = Object.fromEntries(
  watchedTeams.map((team) => [team, 0])
);

const cupChampionCounts: Record<string, number> = {};
const cupRunnerUpCounts: Record<string, number> = {};

for (const result of results) {
  for (const row of result.relegated) {
    for (const watched of watchedTeams) {
      if (isWatchedRelegated(row, watched)) {
        relegationCounts[watched] += 1;
      }
    }
  }

  cupChampionCounts[result.cupChampion] = (cupChampionCounts[result.cupChampion] ?? 0) + 1;
  cupRunnerUpCounts[result.cupRunnerUp] = (cupRunnerUpCounts[result.cupRunnerUp] ?? 0) + 1;
}

const villarrealDanger = results.filter((r) => r.watchedPositions.Villarreal >= 17).length;
const villarrealRelegated = relegationCounts["Villarreal CF"] ?? 0;
const gironaRelegated = relegationCounts["Girona FC"] ?? 0;

const madridBarcaCupWins = results.filter((r) => {
  const champion = norm(r.cupChampion);
  return champion.includes("real madrid") || champion.includes("barcelona");
}).length;

const eliteCupWins = results.filter((r) => {
  const champion = norm(r.cupChampion);
  return (
    champion.includes("real madrid") ||
    champion.includes("barcelona") ||
    champion.includes("athletic") ||
    champion.includes("atletico")
  );
}).length;

const smallCupChampions = results.filter((r) => {
  const champion = norm(r.cupChampion);
  return (
    champion.includes("numancia") ||
    champion.includes("alcorcon") ||
    champion.includes("sestao") ||
    champion.includes("racing") ||
    champion.includes("zaragoza") ||
    champion.includes("elche")
  );
}).length;

const alerts: string[] = [];

if (villarrealRelegated >= 2 || villarrealDanger >= 4) {
  alerts.push("AJUSTAR: Villarreal supera el umbral de riesgo.");
} else if (villarrealRelegated === 1 || villarrealDanger >= 2) {
  alerts.push("VIGILAR: Villarreal tiene algun susto, pero no exige ajuste todavia.");
} else {
  alerts.push("OK: Villarreal estable.");
}

if (gironaRelegated <= 3) {
  alerts.push("OK: Girona baja 0-3 veces en 10; tolerable segun regla.");
} else {
  alerts.push("VIGILAR/AJUSTAR: Girona baja mas de 3 veces en 10.");
}

if (madridBarcaCupWins >= Math.ceil(RUNS * 0.7)) {
  alerts.push("AJUSTAR COPA: Madrid/Barca copan demasiadas Copas.");
} else {
  alerts.push("OK: Copa no esta monopolizada por Madrid/Barca.");
}

if (madridBarcaCupWins === 0 && smallCupChampions >= 1) {
  alerts.push("VIGILAR COPA: Copa muy abierta; Madrid/Barca 0 victorias y al menos un campeon pequeno.");
}

const audit = {
  generatedAt: new Date().toISOString(),
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
    alerts,
  },
};

console.log(JSON.stringify(audit, null, 2));
