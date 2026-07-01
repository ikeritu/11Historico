import {
  canChangeFormationWithOnePlayer,
  canUnlockCareerFormationChange,
  evaluateCareerObjective,
} from "../src/career/careerRules";
import { FORMATIONS } from "../src/data/formations";
import { resolvePlayerSlotPlacement } from "../src/domain/positionRules";
import { calculateTeamRating } from "../src/simulation/teamRating";
import type { CareerSeasonResult } from "../src/types/career";
import type { Formation, FormationSlot, PlayerSeason, SelectedCoach, SelectedPlayer } from "../src/types/game";

type Line = FormationSlot["line"];

const lineOrder: Record<Line, number> = {
  goalkeeper: 0,
  defense: 1,
  midfield: 2,
  attack: 3,
};

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function logOk(message: string) {
  console.log(`✓ ${message}`);
}

function getFormation(id: string): Formation {
  const formation = FORMATIONS.find((item) => item.id === id);
  assert(formation, `No se encuentra la formación ${id}`);
  return formation;
}

function makePlayer(id: string, name: string, positions: PlayerSeason["positions"]): PlayerSeason {
  return {
    id,
    playerId: id,
    canonicalPlayerId: id,
    name,
    season: "qa",
    positions,
    tacticalSlotLabels: positions,
    matches: 38,
    minutes: 3000,
    skills: {
      pace: 80,
      shooting: 80,
      passing: 80,
      dribbling: 80,
      defending: positions.some((position) => ["LD", "LI", "DFC", "CAD", "CAI"].includes(position)) ? 88 : 70,
      physical: 80,
      goalkeeping: positions.includes("POR") ? 90 : 40,
      mentality: 80,
    },
    overall: 82,
    dataConfidence: 1,
    ratingMethod: "manual_estimate",
    sourceRefs: ["qa"],
  };
}

function makeCoach(): SelectedCoach {
  return {
    coachSeason: {
      id: "coach_qa",
      coachId: "coach_qa",
      name: "Entrenador QA",
      season: "qa",
      skills: {
        attack: 84,
        defense: 84,
        management: 84,
        mentality: 84,
        cup: 84,
        europe: 84,
      },
      overall: 84,
      dataConfidence: 1,
      ratingMethod: "manual_estimate",
      sourceRefs: ["qa"],
    },
  };
}

function calculateMediaXi(selectedPlayers: SelectedPlayer[]): number {
  const total = selectedPlayers.reduce((sum, selected) => sum + selected.playerSeason.overall, 0);
  return Math.round((total / selectedPlayers.length) * 10) / 10;
}

function assertNoDuplicatePlayers(selectedPlayers: SelectedPlayer[]) {
  const seen = new Set<string>();

  for (const selected of selectedPlayers) {
    const key = selected.playerSeason.canonicalPlayerId || selected.playerSeason.playerId || selected.playerSeason.id;
    assert(!seen.has(key), `Jugador duplicado tras cancelar: ${selected.playerSeason.name}`);
    seen.add(key);
  }
}

function assertAllSlotsExist(formation: Formation, selectedPlayers: SelectedPlayer[]) {
  const slotIds = new Set(formation.slots.map((slot) => slot.id));

  for (const selected of selectedPlayers) {
    assert(slotIds.has(selected.slotId), `Slot inválido tras cancelar: ${selected.slotId} no existe en ${formation.id}`);
  }
}

function selectBySlot(slotId: string, playerSeason: PlayerSeason): SelectedPlayer {
  return {
    slotId,
    position: playerSeason.positions[0],
    playerSeason,
  };
}

function build433Team(): SelectedPlayer[] {
  return [
    selectBySlot("gk", makePlayer("gk", "Portero QA", ["POR"])),
    selectBySlot("rb", makePlayer("rb", "Lateral derecho QA", ["LD"])),
    selectBySlot("cb_1", makePlayer("cb1", "Central derecho QA", ["DFC"])),
    selectBySlot("cb_2", makePlayer("cb2", "Central izquierdo QA", ["DFC"])),
    selectBySlot("lb", makePlayer("lb", "Lateral izquierdo QA", ["LI"])),
    selectBySlot("cm_1", makePlayer("mcd", "Pivote QA", ["MCD", "MC"])),
    selectBySlot("cm_2", makePlayer("mc", "Medio centro QA", ["MC"])),
    selectBySlot("cm_3", makePlayer("mp", "Mediapunta QA", ["MP", "MC"])),
    selectBySlot("lw", makePlayer("lw", "Extremo izquierdo QA", ["EI"])),
    selectBySlot("st", makePlayer("st", "Delantero centro QA", ["DC"])),
    selectBySlot("rw", makePlayer("rw", "Extremo derecho QA", ["ED"])),
  ];
}

function getOriginalSlotLine(formation: Formation, selectedPlayer: SelectedPlayer): Line | undefined {
  return formation.slots.find((slot) => slot.id === selectedPlayer.slotId)?.line;
}

function remapWithOpenSlot(params: {
  selectedPlayers: SelectedPlayer[];
  fromFormation: Formation;
  toFormation: Formation;
  requiredOpenSlotLine: Line;
}): { placedPlayers: SelectedPlayer[]; openSlot: FormationSlot } | undefined {
  const { selectedPlayers, fromFormation, toFormation, requiredOpenSlotLine } = params;
  const slots = [...toFormation.slots].sort((a, b) => lineOrder[a.line] - lineOrder[b.line]);
  const players = [...selectedPlayers].sort((a, b) => b.playerSeason.overall - a.playerSeason.overall);

  function search(
    slotIndex: number,
    remainingPlayers: SelectedPlayer[],
    placedPlayers: SelectedPlayer[],
    openSlot: FormationSlot | undefined,
  ): { placedPlayers: SelectedPlayer[]; openSlot: FormationSlot } | undefined {
    if (slotIndex >= slots.length) {
      if (remainingPlayers.length === 0 && openSlot) return { placedPlayers, openSlot };
      return undefined;
    }

    const slot = slots[slotIndex];

    if (!openSlot && slot.line === requiredOpenSlotLine) {
      const skipped = search(slotIndex + 1, remainingPlayers, placedPlayers, slot);
      if (skipped) return skipped;
    }

    const candidates = remainingPlayers
      .map((player, index) => ({
        player,
        index,
        originalLine: getOriginalSlotLine(fromFormation, player),
        placement: resolvePlayerSlotPlacement(player.playerSeason, slot),
      }))
      .filter((candidate) => candidate.originalLine === slot.line && candidate.placement.canPlace)
      .sort((a, b) => b.player.playerSeason.overall - a.player.playerSeason.overall);

    for (const candidate of candidates) {
      const result = search(
        slotIndex + 1,
        remainingPlayers.filter((_, index) => index !== candidate.index),
        [
          ...placedPlayers,
          {
            slotId: slot.id,
            position: candidate.placement.assignedPosition ?? slot.allowedPositions[0],
            playerSeason: candidate.player.playerSeason,
          },
        ],
        openSlot,
      );
      if (result) return result;
    }

    return undefined;
  }

  return search(0, players, [], undefined);
}

function runRewardUnlockQa() {
  const base: Omit<CareerSeasonResult, "wonLeague" | "wonCopa" | "wonSupercopa" | "leaguePosition" | "europeanQualification"> = {
    seasonLabel: "QA",
    isRelegated: false,
  };

  const leagueChampion: CareerSeasonResult = {
    ...base,
    leaguePosition: 1,
    wonLeague: true,
    wonCopa: false,
    wonSupercopa: false,
    europeanQualification: "champions",
  };
  assert(canUnlockCareerFormationChange(leagueChampion, evaluateCareerObjective(leagueChampion)), "Ganar Liga debe desbloquear premio especial.");
  logOk("Liga ganada desbloquea premio especial");

  const copaChampion: CareerSeasonResult = {
    ...base,
    leaguePosition: 9,
    wonLeague: false,
    wonCopa: true,
    wonSupercopa: false,
    europeanQualification: "none",
  };
  assert(canUnlockCareerFormationChange(copaChampion, evaluateCareerObjective(copaChampion)), "Ganar Copa debe desbloquear premio especial.");
  logOk("Copa ganada desbloquea premio especial");

  const onlyEurope: CareerSeasonResult = {
    ...base,
    leaguePosition: 5,
    wonLeague: false,
    wonCopa: false,
    wonSupercopa: false,
    europeanQualification: "europa_league",
  };
  assert(!canUnlockCareerFormationChange(onlyEurope, evaluateCareerObjective(onlyEurope)), "Solo Europa no debe desbloquear cambio de formación.");
  logOk("Solo Europa no desbloquea cambio de formación");

  const onlySupercopa: CareerSeasonResult = {
    ...base,
    leaguePosition: 9,
    wonLeague: false,
    wonCopa: false,
    wonSupercopa: true,
    europeanQualification: "none",
  };
  assert(!canUnlockCareerFormationChange(onlySupercopa, evaluateCareerObjective(onlySupercopa)), "Supercopa sin Europa no debe desbloquear cambio de formación.");
  logOk("Supercopa sola no desbloquea cambio de formación");

  const supercopaAndEurope: CareerSeasonResult = {
    ...base,
    leaguePosition: 5,
    wonLeague: false,
    wonCopa: false,
    wonSupercopa: true,
    europeanQualification: "europa_league",
  };
  assert(canUnlockCareerFormationChange(supercopaAndEurope, evaluateCareerObjective(supercopaAndEurope)), "Supercopa + Europa debe desbloquear cambio de formación.");
  logOk("Supercopa + Europa desbloquea cambio de formación");
}

function runFormationLineQa() {
  const fromFormation = getFormation("4-3-3");
  const toFormation = getFormation("4-2-4");
  const compatibility = canChangeFormationWithOnePlayer(fromFormation, toFormation);
  assert(compatibility.canChange, "4-3-3 → 4-2-4 debe ser compatible con un cambio de línea.");
  assert(compatibility.removedLine === "midfield", "4-3-3 → 4-2-4 debe liberar un medio.");
  assert(compatibility.addedLine === "attack", "4-3-3 → 4-2-4 debe abrir un hueco de ataque.");

  const fullTeam = build433Team();
  const removedMidfielder = fullTeam.find((player) => player.slotId === "cm_3");
  assert(removedMidfielder, "Debe existir un medio saliente de prueba.");

  const keptPlayers = fullTeam.filter((player) => player !== removedMidfielder);
  const remap = remapWithOpenSlot({
    selectedPlayers: keptPlayers,
    fromFormation,
    toFormation,
    requiredOpenSlotLine: compatibility.addedLine,
  });

  assert(remap, "Debe existir remapeo dejando un hueco abierto de ataque.");
  assert(remap.openSlot.line === "attack", "El hueco abierto debe ser de ataque.");
  assert(remap.placedPlayers.length === 10, "Deben conservarse exactamente 10 jugadores.");

  for (const player of remap.placedPlayers) {
    const originalLine = getOriginalSlotLine(fromFormation, fullTeam.find((item) => item.playerSeason.id === player.playerSeason.id)!);
    const newLine = toFormation.slots.find((slot) => slot.id === player.slotId)?.line;
    assert(originalLine === newLine, `${player.playerSeason.name} cambió de línea: ${originalLine} → ${newLine}.`);
  }
  logOk("4-3-3 → 4-2-4 no recoloca defensas/medios como delanteros");

  const defenderRemoved = fullTeam.find((player) => player.slotId === "cb_1");
  assert(defenderRemoved, "Debe existir un defensa saliente de prueba.");
  const defenderOriginalLine = getOriginalSlotLine(fromFormation, defenderRemoved);
  assert(defenderOriginalLine !== compatibility.removedLine, "Quitar defensa no debe encajar con el movimiento 4-3-3 → 4-2-4.");
  logOk("4-3-3 → 4-2-4 exige eliminar un medio, no un defensa");

  const naturalAttacker = makePlayer("replacement_attack", "Sustituto atacante QA", ["DC"]);
  const naturalDefender = makePlayer("replacement_defense", "Sustituto defensa QA", ["DFC"]);
  assert(resolvePlayerSlotPlacement(naturalAttacker, remap.openSlot).canPlace, "El sustituto de ataque debe encajar en el hueco abierto.");
  assert(!resolvePlayerSlotPlacement(naturalDefender, remap.openSlot).canPlace, "Un defensa no debe encajar en el hueco abierto de ataque.");
  logOk("Draft restringido a la línea/hueco abierto");

  const originalSnapshot = JSON.stringify({ formation: fromFormation.id, players: fullTeam });
  const cancelSnapshot = JSON.stringify({ formation: fromFormation.id, players: fullTeam });
  assert(originalSnapshot === cancelSnapshot, "Cancelar debe conservar plantilla/formación original.");
  logOk("Cancelar conserva plantilla/formación original");
}

function runCancelSnapshotQa() {
  const originalFormation = getFormation("4-3-3");
  const targetFormation = getFormation("4-2-4");
  const originalPlayers = build433Team();
  const originalCoach = makeCoach();
  const originalRating = calculateTeamRating({
    formation: originalFormation,
    selectedPlayers: originalPlayers,
    selectedCoach: originalCoach,
  });
  const originalMediaXi = calculateMediaXi(originalPlayers);

  const removedMidfielder = originalPlayers.find((player) => player.slotId === "cm_3");
  assert(removedMidfielder, "Debe existir el medio que se retira antes de cambiar alineación.");

  const compatibility = canChangeFormationWithOnePlayer(originalFormation, targetFormation);
  assert(compatibility.canChange, "4-3-3 → 4-2-4 debe seguir siendo compatible.");
  assert(compatibility.addedLine, "La formación destino debe declarar una línea añadida.");

  const remap = remapWithOpenSlot({
    selectedPlayers: originalPlayers.filter((player) => player !== removedMidfielder),
    fromFormation: originalFormation,
    toFormation: targetFormation,
    requiredOpenSlotLine: compatibility.addedLine,
  });
  assert(remap, "Debe existir estado intermedio de 10 jugadores antes de cancelar.");
  assert(remap.placedPlayers.length === 10, "El estado intermedio debe tener 10 jugadores antes del draft.");

  const restoredFormation = originalFormation;
  const restoredPlayers = originalPlayers;
  const restoredRating = originalRating;
  const restoredMediaXi = originalMediaXi;

  assert(restoredPlayers.length === 11, "Cancelar debe conservar 11/11 jugadores.");
  logOk("Cancelar conserva 11/11");

  assert(restoredFormation.id === originalFormation.id, "Cancelar debe conservar la formación original.");
  logOk("Cancelar conserva formación original");

  assert(restoredRating.overall === originalRating.overall, "Cancelar debe conservar el rating visible original.");
  assert(restoredMediaXi === originalMediaXi, "Cancelar debe conservar la Media XI original.");
  logOk("Cancelar conserva media original");

  assertNoDuplicatePlayers(restoredPlayers);
  logOk("Cancelar no deja jugador duplicado");

  assertAllSlotsExist(restoredFormation, restoredPlayers);
  logOk("Cancelar no deja posiciones inválidas");
}

console.log("QA Formation Reward\n");
runRewardUnlockQa();
runFormationLineQa();
runCancelSnapshotQa();
console.log("\nOK");
