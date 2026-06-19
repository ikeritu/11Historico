// src/data/laliga2526Teams.ts

import type { RivalTeam } from "../types/game";

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

export const USER_TEAM_ID = "athletic_historico";

export const LALIGA_2526_TEAMS: RivalTeam[] = [
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
      overall: 83,
    },
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
      overall: 87,
    },
  },
  {
    id: "ca_osasuna",
    name: "CA Osasuna",
    shirtIcon: "red_shirt_navy_shorts",
    ratings: {
      // v0.15.7: último ajuste zona baja. Osasuna seguía algo alto
      // en descensos (33/100). Se sube estabilidad sin convertirlo
      // en equipo europeo fijo.
      attack: 78,
      midfield: 81,
      defense: 82,
      goalkeeping: 80,
      mentality: 84,
      overall: 81,
    },
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
      overall: 79,
    },
  },
  {
    id: "deportivo_alaves",
    name: "Deportivo Alavés",
    shirtIcon: "blue_white_stripes_blue_shorts",
    ratings: {
      // v0.15.6: zona baja II. Alavés debe seguir sufriendo, pero
      // no caer con frecuencia de descenso casi estructural.
      attack: 76,
      midfield: 77,
      defense: 79,
      goalkeeping: 78,
      mentality: 80,
      overall: 78,
    },
  },
  {
    id: "elche_cf",
    name: "Elche CF",
    shirtIcon: "white_shirt_green_band",
    ratings: {
      // v0.15.7: Elche estaba demasiado cerca del descenso estructural
      // (35/100). Mejora suave manteniéndolo como equipo de riesgo.
      attack: 76,
      midfield: 77,
      defense: 77,
      goalkeeping: 76,
      mentality: 78,
      overall: 77,
    },
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
      overall: 94,
    },
  },
  {
    id: "getafe_cf",
    name: "Getafe CF",
    shirtIcon: "blue_shirt_blue_shorts",
    ratings: {
      // v0.15.7: microayuda para repartir mejor la zona baja.
      attack: 74,
      midfield: 76,
      defense: 79,
      goalkeeping: 77,
      mentality: 80,
      overall: 77,
    },
  },
  {
    id: "girona_fc",
    name: "Girona FC",
    shirtIcon: "red_white_stripes_red_shorts",
    ratings: {
      // v0.15.7: microayuda. Girona puede caer, pero no debe quedar
      // demasiado castigado en simulación larga.
      attack: 75,
      midfield: 76,
      defense: 74,
      goalkeeping: 75,
      mentality: 75,
      overall: 75,
    },
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
      overall: 74,
    },
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
      overall: 78,
    },
  },
  {
    id: "real_betis",
    name: "Real Betis",
    shirtIcon: "green_white_stripes_white_shorts",
    ratings: {
      // v0.15.8: Betis descendía 20/100, demasiado para su entidad.
      // Ajuste defensivo/mental moderado, sin llevarlo a zona Champions.
      attack: 81,
      midfield: 83,
      defense: 80,
      goalkeeping: 79,
      mentality: 83,
      overall: 83,
    },
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
      overall: 91,
    },
  },
  {
    id: "real_oviedo",
    name: "Real Oviedo",
    shirtIcon: "blue_shirt_white_shorts",
    ratings: {
      // v0.15.7: Oviedo sigue siendo candidato principal al descenso,
      // pero se evita que el descenso sea casi automático en 100 tests.
      attack: 75,
      midfield: 76,
      defense: 77,
      goalkeeping: 77,
      mentality: 79,
      overall: 77,
    },
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
      overall: 81,
    },
  },
  {
    id: "rayo_vallecano",
    name: "Rayo Vallecano",
    shirtIcon: "white_shirt_red_sash",
    ratings: {
      // v0.15.8: Rayo estaba cayendo 41/100. Subida clara de estabilidad,
      // manteniéndolo como equipo de riesgo medio-bajo.
      attack: 79,
      midfield: 80,
      defense: 79,
      goalkeeping: 78,
      mentality: 83,
      overall: 80,
    },
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
      overall: 75,
    },
  },
  {
    id: "sevilla_fc",
    name: "Sevilla FC",
    shirtIcon: "white_shirt_red_details",
    ratings: {
      // v0.15.6: Sevilla estaba descendiendo 27/100, demasiado para su
      // entidad. Ajuste claro de estabilidad sin devolverlo a zona Champions.
      attack: 78,
      midfield: 80,
      defense: 79,
      goalkeeping: 79,
      mentality: 82,
      overall: 80,
    },
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
      overall: 77,
    },
  },
  {
    id: "villarreal_cf",
    name: "Villarreal CF",
    shirtIcon: "yellow_shirt_yellow_shorts",
    ratings: {
      // v0.15.8: microestabilidad para devolverlo al objetivo 0-3/100 descensos.
      attack: 89,
      midfield: 87,
      defense: 85,
      goalkeeping: 84,
      mentality: 87,
      overall: 87,
    },
  },
];

/**
 * Devuelve los rivales de liga excluyendo al Athletic real.
 * En el juego principal, el Athletic histórico del usuario sustituye al Athletic Club 25/26.
 */
export function getLaliga2526RivalsExcludingAthletic(): RivalTeam[] {
  return LALIGA_2526_TEAMS.filter((team) => team.id !== "athletic_club");
}

export function getLaliga2526TeamById(teamId: string): RivalTeam | undefined {
  return LALIGA_2526_TEAMS.find((team) => team.id === teamId);
}

export function getLaliga2526TeamIds(): string[] {
  return LALIGA_2526_TEAMS.map((team) => team.id);
}
