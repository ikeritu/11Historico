import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function logOk(message: string): void {
  console.log(`✓ ${message}`);
}

function read(path: string): string {
  return readFileSync(join(ROOT, path), "utf8");
}

function testUiFilesExist(): void {
  assert(existsSync(join(ROOT, "src/components/SeasonLuckWheelModal.tsx")), "Debe existir SeasonLuckWheelModal.tsx.");
  assert(existsSync(join(ROOT, "src/components/SeasonLuckWheelModal.css")), "Debe existir SeasonLuckWheelModal.css.");
  logOk("modal de ruleta creado");
}

function testModalSupportsRequiredFlow(): void {
  const component = read("src/components/SeasonLuckWheelModal.tsx");

  for (const text of ["Jugar ruleta", "No jugar", "Parar flecha", "Continuar temporada"]) {
    assert(component.includes(text), `El modal debe mostrar acción: ${text}.`);
  }

  assert(component.includes("resolveSeasonLuckWheel"), "El modal debe resolver la ruleta con el motor v0.23.2a.");
  assert(component.includes("declineSeasonLuckWheel"), "El modal debe permitir rechazar sin efecto.");
  assert(component.includes("SEASON_LUCK_WHEEL_PRIZE_SEGMENTS"), "El modal debe mostrar los premios definidos por el motor.");
  logOk("modal soporta jugar, rechazar, parar y continuar");
}

function testCssProvidesWheelAndPrecisionAnimation(): void {
  const css = read("src/components/SeasonLuckWheelModal.css");

  assert(css.includes("@keyframes seasonWheelSpin"), "La ruleta debe tener animación de giro.");
  assert(css.includes("season-wheel-precision-bar"), "Debe existir barra de precisión.");
  assert(css.includes("season-wheel-precision-marker"), "Debe existir flecha/marcador móvil.");
  assert(css.includes("conic-gradient"), "La ruleta debe usar segmentos visuales de premios.");
  logOk("CSS contiene ruleta, segmentos, flecha y animación");
}

function testLeagueIntegration(): void {
  const leagueView = read("src/components/LeagueSimulatorView.tsx");
  const simulator = read("src/simulation/leagueSimulator.ts");

  assert(leagueView.includes("SeasonLuckWheelModal"), "LeagueSimulatorView debe montar el modal de ruleta.");
  assert(leagueView.includes("setIsAutoSimulating(false)"), "La simulación automática debe poder pausarse al ofrecer ruleta.");
  assert(leagueView.includes("copa_elimination"), "Debe existir trigger por eliminación de Copa.");
  assert(leagueView.includes("mid_season"), "Debe existir trigger de mitad de temporada.");
  assert(leagueView.includes("applySeasonLuckWheelRatingDelta"), "Los efectos de media deben llegar al rating de simulación.");
  assert(simulator.includes("seasonLuckWheel?: SeasonLuckWheelState"), "El contexto de liga debe persistir el estado de ruleta.");
  logOk("LeagueSimulatorView integra pausa, triggers y ratingDelta");
}

function testPackageScriptRegistered(): void {
  const packageJson = JSON.parse(read("package.json")) as { scripts?: Record<string, string> };
  const scripts = packageJson.scripts ?? {};

  assert(scripts["qa:season-luck-wheel-ui"], "Debe existir script qa:season-luck-wheel-ui.");
  assert(scripts["qa:tech-debt"]?.includes("qa:season-luck-wheel-ui"), "qa:tech-debt debe incluir qa:season-luck-wheel-ui.");
  logOk("QA UI registrada en package.json");
}

console.log("QA Season Luck Wheel UI");

testUiFilesExist();
testModalSupportsRequiredFlow();
testCssProvidesWheelAndPrecisionAnimation();
testLeagueIntegration();
testPackageScriptRegistered();

console.log("QA season luck wheel UI OK");
