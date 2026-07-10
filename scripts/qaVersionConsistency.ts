import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { APP_STATUS, APP_VERSION, APP_VERSION_NAME } from "../src/config/appVersion";

type PackageJson = {
  name?: string;
  version?: string;
  scripts?: Record<string, string>;
};

type PackageLockJson = {
  name?: string;
  version?: string;
  packages?: Record<string, { version?: string }>;
};

const ROOT = process.cwd();

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function logOk(message: string): void {
  console.log(`✓ ${message}`);
}

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, "utf8")) as T;
}

function getExpectedPackageVersion(appVersion: string): string {
  const match = /^v(?<base>\d+\.\d+\.\d+)(?<suffix>[a-z]\d*)?$/.exec(appVersion);
  assert(match?.groups?.base, `APP_VERSION no tiene formato esperado: ${appVersion}`);

  const { base, suffix } = match.groups;
  return suffix ? `${base}-${suffix}.0` : base;
}

function assertNoMojibake(label: string, value: string): void {
  assert(!/[�ÃÂ]/.test(value), `${label} contiene posible mojibake: ${value}`);
}

function testPackageVersionMatchesAppVersion(): void {
  const packageJson = readJson<PackageJson>(join(ROOT, "package.json"));
  const expectedPackageVersion = getExpectedPackageVersion(APP_VERSION);

  assert(packageJson.version === expectedPackageVersion, `package.json debe usar ${expectedPackageVersion}, pero usa ${packageJson.version}`);
  logOk("package.json versiona la fase pública actual");
}

function testPackageLockMatchesPackageJson(): void {
  const packageJson = readJson<PackageJson>(join(ROOT, "package.json"));
  const packageLock = readJson<PackageLockJson>(join(ROOT, "package-lock.json"));

  assert(packageLock.version === packageJson.version, "package-lock.json version debe coincidir con package.json.");
  assert(packageLock.packages?.[""]?.version === packageJson.version, "package-lock raíz debe coincidir con package.json.");
  logOk("package-lock.json está alineado con package.json");
}

function testAppVersionMetadata(): void {
  assert(APP_VERSION === "v0.24.1c", `APP_VERSION debe ser v0.24.1c, pero es ${APP_VERSION}`);
  assert(APP_VERSION_NAME.trim().length > 0, "APP_VERSION_NAME no puede estar vacío.");
  assert(APP_STATUS.trim().length > 0, "APP_STATUS no puede estar vacío.");
  assertNoMojibake("APP_VERSION_NAME", APP_VERSION_NAME);
  assertNoMojibake("APP_STATUS", APP_STATUS);
  logOk("appVersion.ts está auditado");
}

function testDocsMentionCurrentVersion(): void {
  const changelog = readFileSync(join(ROOT, "CHANGELOG.md"), "utf8");
  const readme = readFileSync(join(ROOT, "README.md"), "utf8");
  const releaseDocPath = join(ROOT, "docs", "v0_24_1c_EUROPEAN_TOURNAMENT_CALENDAR.md");

  assert(changelog.startsWith("# Changelog\n\n## v0.24.1c"), "CHANGELOG debe empezar por v0.24.1c.");
  assert(readme.includes("Versión pública actual: `v0.24.1c_EUROPEAN_TOURNAMENT_CALENDAR`."), "README debe apuntar a v0.24.1c_EUROPEAN_TOURNAMENT_CALENDAR.");
  assert(existsSync(releaseDocPath), "Debe existir docs/v0_24_1c_EUROPEAN_TOURNAMENT_CALENDAR.md.");
  logOk("README, CHANGELOG y doc de fase apuntan a v0.24.1c");
}

function testQaScriptsAreRegistered(): void {
  const packageJson = readJson<PackageJson>(join(ROOT, "package.json"));

  assert(packageJson.scripts?.["qa:version"], "Debe existir script qa:version.");
  assert(packageJson.scripts?.["qa:tech-debt"], "Debe existir script qa:tech-debt.");
  assert(packageJson.scripts?.["qa:tech-health-baseline"], "Debe existir script qa:tech-health-baseline.");
  assert(packageJson.scripts?.["qa:release-stabilization"], "Debe existir script qa:release-stabilization.");
  assert(packageJson.scripts?.["qa:agentjacking"], "Debe existir script qa:agentjacking.");
  assert(packageJson.scripts?.["qa:formation-reward"], "Debe conservar qa:formation-reward.");
  assert(packageJson.scripts?.["qa:career-ranking"], "Debe conservar qa:career-ranking.");
  assert(packageJson.scripts?.["qa:global-ranking"], "Debe existir script qa:global-ranking.");
  assert(packageJson.scripts?.["qa:team-power"], "Debe existir script qa:team-power.");
  assert(packageJson.scripts?.["qa:global-ranking-real"], "Debe existir script qa:global-ranking-real.");
  assert(packageJson.scripts?.["qa:global-ranking-ui"], "Debe existir script qa:global-ranking-ui.");
  assert(packageJson.scripts?.["qa:season-luck-wheel"], "Debe existir script qa:season-luck-wheel.");
  assert(packageJson.scripts?.["qa:european-qualification"], "Debe existir script qa:european-qualification.");
  assert(packageJson.scripts?.["qa:european-qualification-ui"], "Debe existir script qa:european-qualification-ui.");
  assert(packageJson.scripts?.["qa:european-persistence"], "Debe existir script qa:european-persistence.");
  assert(packageJson.scripts?.["qa:european-tournament"], "Debe existir script qa:european-tournament.");
  assert(packageJson.scripts?.["qa:european-match-engine"], "Debe existir script qa:european-match-engine.");
  assert(packageJson.scripts?.["qa:european-calendar"], "Debe existir script qa:european-calendar.");
  assert(packageJson.scripts?.["qa:tech-debt"]?.includes("qa:tech-health-baseline"), "qa:tech-debt debe incluir qa:tech-health-baseline.");
  assert(packageJson.scripts?.["qa:tech-debt"]?.includes("qa:hooks-simulation-deps"), "qa:tech-debt debe incluir qa:hooks-simulation-deps.");
  assert(packageJson.scripts?.["qa:tech-debt"]?.includes("qa:agentjacking"), "qa:tech-debt debe incluir qa:agentjacking.");
  assert(packageJson.scripts?.["qa:tech-debt"]?.includes("qa:season-luck-wheel"), "qa:tech-debt debe incluir qa:season-luck-wheel.");
  assert(packageJson.scripts?.["qa:tech-debt"]?.includes("qa:european-qualification"), "qa:tech-debt debe incluir qa:european-qualification.");
  assert(packageJson.scripts?.["qa:tech-debt"]?.includes("qa:european-qualification-ui"), "qa:tech-debt debe incluir qa:european-qualification-ui.");
  assert(packageJson.scripts?.["qa:tech-debt"]?.includes("qa:european-persistence"), "qa:tech-debt debe incluir qa:european-persistence.");
  assert(packageJson.scripts?.["qa:tech-debt"]?.includes("qa:european-tournament"), "qa:tech-debt debe incluir qa:european-tournament.");
  assert(packageJson.scripts?.["qa:tech-debt"]?.includes("qa:european-match-engine"), "qa:tech-debt debe incluir qa:european-match-engine.");
  assert(packageJson.scripts?.["qa:tech-debt"]?.includes("qa:european-calendar"), "qa:tech-debt debe incluir qa:european-calendar.");
  logOk("scripts QA críticos registrados");
}

console.log("QA Version Consistency");

testAppVersionMetadata();
testPackageVersionMatchesAppVersion();
testPackageLockMatchesPackageJson();
testDocsMentionCurrentVersion();
testQaScriptsAreRegistered();

console.log("QA version consistency OK");
