import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function logOk(message: string): void {
  console.log(`✓ ${message}`);
}

function read(path: string): string {
  return readFileSync(join(ROOT, path), "utf8");
}

function assertIncludes(source: string, expected: string, label: string): void {
  assert(source.includes(expected), `${label}: falta ${expected}`);
}

console.log("QA European Matchday UI");

const componentPath = "src/components/EuropeanMatchEvent.tsx";
const cssPath = "src/components/EuropeanMatchEvent.css";
const docPath = "docs/v0_24_2a_EUROPEAN_UI_MATCHDAY_VIEW.md";

assert(existsSync(join(ROOT, componentPath)), "Debe existir EuropeanMatchEvent.tsx.");
assert(existsSync(join(ROOT, cssPath)), "Debe existir EuropeanMatchEvent.css.");
assert(existsSync(join(ROOT, docPath)), "Debe existir el documento de fase v0.24.2a.");

const component = read(componentPath);
const css = read(cssPath);

assertIncludes(component, "european-match-event-badge", "badge de competición");
assertIncludes(component, "getCompetitionBadge", "helper de badge");
assertIncludes(component, "getPhaseNarrative", "copy narrativo por fase");
assertIncludes(component, "Noche grande en San Mamés", "narrativa local");
assertIncludes(component, "Salida europea exigente", "narrativa visitante");
assertIncludes(component, "Final europea", "narrativa de final");
assertIncludes(component, "Progreso europeo", "bloque de progreso");
assertIncludes(component, "GF {summary.goalsFor} / GC {summary.goalsAgainst}", "goles a favor/en contra visibles");
logOk("EuropeanMatchEvent muestra competición, narrativa, progreso y métricas europeas");

assertIncludes(css, "european-match-event-card-champions", "estilo Champions");
assertIncludes(css, "european-match-event-card-europa", "estilo Europa League");
assertIncludes(css, "european-match-event-card-conference", "estilo Conference League");
assertIncludes(css, "european-match-event-scoreboard", "marcador visual");
assertIncludes(css, "european-match-event-progress", "barra de progreso");
assertIncludes(css, "min-height: 44px", "áreas táctiles");
assertIncludes(css, "@media (max-width: 560px)", "responsive móvil");
logOk("CSS europeo incluye variantes visuales, progreso y responsive móvil");

console.log("QA european matchday UI OK");
