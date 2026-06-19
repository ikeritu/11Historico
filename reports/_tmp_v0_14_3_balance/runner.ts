import { build } from "esbuild";
import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const tmpDir = path.join(projectRoot, "reports", "_tmp_v0_14_3_balance");
const simulationTs = path.join(tmpDir, "simulation.ts");
const simulationMjs = path.join(tmpDir, "simulation.bundle.mjs");
const resultJson = path.join(projectRoot, "reports", "v0_14_3_balance_batch_results.json");

const runs = Number(process.env.AUDIT_RUNS ?? "10");
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

const simulationCode = String.raw
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

function norm(value: unknown): string {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\\u0300-\\u036f]/g, "")
    .toLowerCase();
}

function getRow(summary: any, matcher: (row: any) => boolean): any | undefined {
  return summary.table.find(matcher);
}

function getPosition(summary: any, matcher: (row: any) => boolean): number {
  const index = summary.table.findIndex(matcher);
  return index >= 0 ? index + 1 : 0;
}

function isTeam(row: any, needle: string): boolean {
  return norm(row.teamName).includes(norm(needle)) || norm(row.teamId).includes(norm(needle));
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
    userTeamName: "Athletic Club HistÃ³rico",
    seed,
  });

  const summary = createFinalLeagueSummary({
    gameId: \udit-\\,
    formationName: "Audit",
    coachName: "Audit",
    context,
    userTeamName: "Athletic Club HistÃ³rico",
  });

  const table = summary.table;
  const relegated = table.slice(-3);
  const villarrealPos = getPosition(summary, (row: any) => isTeam(row, "Villarreal"));
  const gironaPos = getPosition(summary, (row: any) => isTeam(row, "Girona"));
  const sevillaPos = getPosition(summary, (row: any) => isTeam(row, "Sevilla"));
  const valenciaPos = getPosition(summary, (row: any) => isTeam(row, "Valencia"));

  results.push({
    run: i,
    seed,
    leaguePosition: summary.leaguePosition,
    points: summary.points,
    cupStatus: summary.cupStatus,
    cupChampion: summary.cupChampionTeamName ?? "",
    cupRunnerUp: summary.cupRunnerUpTeamName ?? "",
    relegated: relegated.map((row: any) => ({
      teamId: row.teamId,
      teamName: row.teamName,
      points: row.points,
      goalDifference: row.goalDifference,
    })),
    watchedPositions: {
      Villarreal: villarrealPos,
      Girona: gironaPos,
      Sevilla: sevillaPos,
      Valencia: valenciaPos,
    },
  });
}

const watchedTeams = ["Real Oviedo", "Deportivo AlavÃ©s", "CA Osasuna", "Villarreal CF", "Girona FC", "Sevilla FC", "Valencia CF"];
const relegationCounts: Record<string, number> = Object.fromEntries(watchedTeams.map((team) => [team, 0]));
const cupChampionCounts: Record<string, number> = {};
const cupRunnerUpCounts: Record<string, number> = {};

for (const result of results) {
  for (const row of result.relegated) {
    for (const watched of watchedTeams) {
      if (norm(row.teamName).includes(norm(watched)) || norm(watched).includes(norm(row.teamName))) {
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

const alerts: string[] = [];

if (villarrealRelegated > 0 || villarrealDanger >= 4) {
  alerts.push("AJUSTAR: Villarreal aparece demasiado abajo o desciende demasiadas veces.");
} else {
  alerts.push("OK: Villarreal no exige ajuste con esta muestra.");
}

if (gironaRelegated <= 3) {
  alerts.push("OK: Girona baja 0-3 veces en 10; tolerable segÃºn regla.");
} else {
  alerts.push("VIGILAR/AJUSTAR: Girona baja mÃ¡s de 3 veces en 10.");
}

if (madridBarcaCupWins >= Math.ceil(RUNS * 0.7)) {
  alerts.push("AJUSTAR COPA: Madrid/BarÃ§a copan demasiadas Copas.");
} else {
  alerts.push("OK: Copa no estÃ¡ monopolizada por Madrid/BarÃ§a.");
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
    alerts,
  },
};

console.log(JSON.stringify(audit, null, 2));
;

fs.writeFileSync(simulationTs, simulationCode, "utf8");

await build({
  entryPoints: [simulationTs],
  bundle: true,
  platform: "node",
  format: "esm",
  outfile: simulationMjs,
  external: [],
  logLevel: "silent",
});

const { spawnSync } = await import("node:child_process");
const run = spawnSync(process.execPath, [simulationMjs], {
  cwd: projectRoot,
  encoding: "utf8",
  env: process.env,
});

if (run.status !== 0) {
  console.error(run.stderr);
  console.error(run.stdout);
  process.exit(run.status ?? 1);
}

fs.writeFileSync(resultJson, run.stdout, "utf8");
console.log(run.stdout);
