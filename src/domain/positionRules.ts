// src/domain/positionRules.ts

import type {
  Formation,
  FormationSlot,
  PlayerPosition,
  PlayerSeason,
  SelectedPlayer,
} from "../types/game";

export interface PlayerSlotPlacementResult {
  canPlace: boolean;
  assignedPosition?: PlayerPosition;
  reason?: string;
}

function normalizeName(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\b(julen|jose|joseba|javier|juan|ander|andoni|francisco|fran|rafa|rafael|luis|angel|agustin|ignacio|miguel|mikel|iker)\b/g, "")
    .replace(/\b(i|ii|iii|iv|v)\b/g, "")
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

export function getPlayerIdentityKey(player: PlayerSeason): string {
  if (player.canonicalPlayerId && player.canonicalPlayerId.length > 0) {
    return player.canonicalPlayerId;
  }

  const normalized = normalizeName(player.name);

  if (normalized.length > 0) return normalized;

  return player.playerId;
}

export function isPlayerAlreadySelected(
  player: PlayerSeason,
  selectedPlayers: SelectedPlayer[]
): boolean {
  const playerKey = getPlayerIdentityKey(player);
  const playerId = player.playerId;

  return selectedPlayers.some((selected) => {
    const selectedPlayer = selected.playerSeason;

    return (
      selectedPlayer.id === player.id ||
      selectedPlayer.playerId === playerId ||
      getPlayerIdentityKey(selectedPlayer) === playerKey
    );
  });
}

function getPlayerRuleLabels(player: PlayerSeason): string[] {
  return Array.from(
    new Set([
      ...player.positions.map((position) => String(position)),
      ...(player.tacticalSlotLabels ?? []).map((label) => String(label)),
    ])
  );
}

function positionFromLabel(label: string): PlayerPosition | undefined {
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

  return undefined;
}

function getExplicitAcceptedLabelsForSlot(slot: FormationSlot): string[] {
  const rules: Record<string, string[]> = {
    POR: ["POR"],

    LD: ["LD"],
    LI: ["LI"],
    "DFC-I": ["DFC", "DFC-I", "DFC-C", "DFC-D"],
    "DFC-C": ["DFC", "DFC-I", "DFC-C", "DFC-D"],
    "DFC-D": ["DFC", "DFC-I", "DFC-C", "DFC-D"],
    CAD: ["CAD", "LD", "MD"],
    CAI: ["CAI", "LI", "MI"],

    MCD: ["MCD", "MC", "MC-C"],
    MC: ["MC", "MC-I", "MC-C", "MC-D", "MCD"],
    "MC-I": ["MC-I", "MC", "MI", "MCD"],
    "MC-C": ["MC-C", "MC", "MCD"],
    "MC-D": ["MC-D", "MC", "MD", "MCD"],
    MP: ["MP", "SD", "MC"],
    MI: ["MI"],
    MD: ["MD"],

    EI: ["EI", "MI"],
    ED: ["ED", "MD"],
    SD: ["SD", "MP", "DC"],
    DC: ["DC", "SD"],
    "DC-I": ["DC", "SD", "EI"],
    "DC-D": ["DC", "SD", "ED"],
  };

  return rules[slot.label] ?? [slot.label, ...slot.allowedPositions.map(String)];
}

function getAssignedPosition(
  player: PlayerSeason,
  slot: FormationSlot,
  matchedLabel: string
): PlayerPosition | undefined {
  const directPosition = player.positions.find((position) => slot.allowedPositions.includes(position));

  if (directPosition) return directPosition;

  const matchedPosition = positionFromLabel(matchedLabel);

  if (matchedPosition && slot.allowedPositions.includes(matchedPosition)) {
    return matchedPosition;
  }

  for (const playerLabel of getPlayerRuleLabels(player)) {
    const mappedPosition = positionFromLabel(playerLabel);

    if (mappedPosition && slot.allowedPositions.includes(mappedPosition)) {
      return mappedPosition;
    }
  }

  return slot.allowedPositions[0];
}

export function resolvePlayerSlotPlacement(
  player: PlayerSeason,
  slot: FormationSlot
): PlayerSlotPlacementResult {
  const playerLabels = getPlayerRuleLabels(player);
  const acceptedLabels = getExplicitAcceptedLabelsForSlot(slot);
  const matchedLabel = playerLabels.find((label) => acceptedLabels.includes(label));

  if (!matchedLabel) {
    return {
      canPlace: false,
      reason: `${player.name} no puede ocupar ${slot.label}.`,
    };
  }

  const assignedPosition = getAssignedPosition(player, slot, matchedLabel);

  if (!assignedPosition) {
    return {
      canPlace: false,
      reason: `${player.name} no tiene una posicion asignable para ${slot.label}.`,
    };
  }

  return {
    canPlace: true,
    assignedPosition,
  };
}

export function canPlayerFillSlot(player: PlayerSeason, slot: FormationSlot): boolean {
  return resolvePlayerSlotPlacement(player, slot).canPlace;
}

export function getAvailableSlotsForPlayer(params: {
  player: PlayerSeason;
  formation: Formation;
  selectedPlayers: SelectedPlayer[];
}): FormationSlot[] {
  const { player, formation, selectedPlayers } = params;
  const occupiedSlotIds = new Set(selectedPlayers.map((selected) => selected.slotId));

  return formation.slots.filter(
    (slot) => !occupiedSlotIds.has(slot.id) && canPlayerFillSlot(player, slot)
  );
}

