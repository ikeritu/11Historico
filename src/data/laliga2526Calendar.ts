// src/data/laliga2526Calendar.ts

import type { LeagueFixture } from "../types/game";
import { USER_TEAM_ID } from "./laliga2526Teams";

/**
 * Calendario real de Liga del Athletic Club 2025/26, adaptado al modo juego.
 *
 * Decisión del MVP:
 * - El Athletic real 2025/26 se sustituye por USER_TEAM_ID = "athletic_historico".
 * - Este archivo contiene los 38 partidos reales del Athletic en LaLiga 2025/26.
 * - Es riguroso para el calendario del equipo del usuario.
 *
 * Nota importante:
 * - No contiene todavía los 380 partidos completos de LaLiga.
 * - Para una clasificación 100% realista de los 20 equipos, más adelante habrá que añadir
 *   el calendario completo de todas las jornadas.
 * - Para el MVP permite simular una temporada completa del Athletic histórico contra sus
 *   38 rivales reales en el orden/calendario real.
 *
 * Fuente principal:
 * - Athletic Club official matches 2025/26:
 *   https://www.athletic-club.eus/en/teams/athletic-club/2025-26/matches/
 *
 * Fuente complementaria:
 * - AS results LALIGA EA Sports 2025/2026:
 *   https://en.as.com/resultados/futbol/primera/2025_2026/
 */

export interface SourcedLeagueFixture extends LeagueFixture {
  date: string;
  sourceRefs: string[];
}

export const LALIGA_2526_CALENDAR_SOURCE_REFS = [
  "athletic-official-2025-26-matches",
  "as-laliga-2025-26-results",
];

function makeFixture(params: {
  matchday: number;
  date: string;
  homeTeamId: string;
  awayTeamId: string;
}): SourcedLeagueFixture {
  const userHome = params.homeTeamId === USER_TEAM_ID;
  const userAway = params.awayTeamId === USER_TEAM_ID;

  return {
    id: `md${String(params.matchday).padStart(2, "0")}_${params.homeTeamId}_vs_${params.awayTeamId}`,
    matchday: params.matchday,
    date: params.date,
    homeTeamId: params.homeTeamId,
    awayTeamId: params.awayTeamId,
    includesUserTeam: userHome || userAway,
    sourceRefs: LALIGA_2526_CALENDAR_SOURCE_REFS,
  };
}

/**
 * 38 partidos reales del Athletic Club 2025/26, sustituyendo Athletic Club por Athletic Histórico.
 */
export const LALIGA_2526_USER_TEAM_FIXTURES: SourcedLeagueFixture[] = [
  makeFixture({ matchday: 1, date: "2025-08-17", homeTeamId: "athletic_historico", awayTeamId: "sevilla_fc" }),
  makeFixture({ matchday: 2, date: "2025-08-25", homeTeamId: "athletic_historico", awayTeamId: "rayo_vallecano" }),
  makeFixture({ matchday: 3, date: "2025-08-31", homeTeamId: "real_betis", awayTeamId: "athletic_historico" }),
  makeFixture({ matchday: 4, date: "2025-09-13", homeTeamId: "athletic_historico", awayTeamId: "deportivo_alaves" }),
  makeFixture({ matchday: 5, date: "2025-09-20", homeTeamId: "valencia_cf", awayTeamId: "athletic_historico" }),
  makeFixture({ matchday: 6, date: "2025-09-23", homeTeamId: "athletic_historico", awayTeamId: "girona_fc" }),
  makeFixture({ matchday: 7, date: "2025-09-27", homeTeamId: "villarreal_cf", awayTeamId: "athletic_historico" }),
  makeFixture({ matchday: 8, date: "2025-10-04", homeTeamId: "athletic_historico", awayTeamId: "rcd_mallorca" }),
  makeFixture({ matchday: 9, date: "2025-10-19", homeTeamId: "elche_cf", awayTeamId: "athletic_historico" }),
  makeFixture({ matchday: 10, date: "2025-10-25", homeTeamId: "athletic_historico", awayTeamId: "getafe_cf" }),
  makeFixture({ matchday: 11, date: "2025-11-01", homeTeamId: "real_sociedad", awayTeamId: "athletic_historico" }),
  makeFixture({ matchday: 12, date: "2025-11-09", homeTeamId: "athletic_historico", awayTeamId: "real_oviedo" }),
  makeFixture({ matchday: 13, date: "2025-11-22", homeTeamId: "fc_barcelona", awayTeamId: "athletic_historico" }),
  makeFixture({ matchday: 14, date: "2025-11-29", homeTeamId: "levante_ud", awayTeamId: "athletic_historico" }),
  makeFixture({ matchday: 15, date: "2025-12-06", homeTeamId: "athletic_historico", awayTeamId: "atletico_madrid" }),
  makeFixture({ matchday: 16, date: "2025-12-14", homeTeamId: "celta_vigo", awayTeamId: "athletic_historico" }),
  makeFixture({ matchday: 17, date: "2025-12-22", homeTeamId: "athletic_historico", awayTeamId: "rcd_espanyol" }),
  makeFixture({ matchday: 18, date: "2026-01-03", homeTeamId: "ca_osasuna", awayTeamId: "athletic_historico" }),
  makeFixture({ matchday: 19, date: "2025-12-03", homeTeamId: "athletic_historico", awayTeamId: "real_madrid" }),
  makeFixture({ matchday: 20, date: "2026-01-17", homeTeamId: "rcd_mallorca", awayTeamId: "athletic_historico" }),
  makeFixture({ matchday: 21, date: "2026-01-24", homeTeamId: "sevilla_fc", awayTeamId: "athletic_historico" }),
  makeFixture({ matchday: 22, date: "2026-02-01", homeTeamId: "athletic_historico", awayTeamId: "real_sociedad" }),
  makeFixture({ matchday: 23, date: "2026-02-08", homeTeamId: "athletic_historico", awayTeamId: "levante_ud" }),
  makeFixture({ matchday: 24, date: "2026-02-15", homeTeamId: "real_oviedo", awayTeamId: "athletic_historico" }),
  makeFixture({ matchday: 25, date: "2026-02-20", homeTeamId: "athletic_historico", awayTeamId: "elche_cf" }),
  makeFixture({ matchday: 26, date: "2026-02-28", homeTeamId: "rayo_vallecano", awayTeamId: "athletic_historico" }),
  makeFixture({ matchday: 27, date: "2026-03-07", homeTeamId: "athletic_historico", awayTeamId: "fc_barcelona" }),
  makeFixture({ matchday: 28, date: "2026-03-14", homeTeamId: "girona_fc", awayTeamId: "athletic_historico" }),
  makeFixture({ matchday: 29, date: "2026-03-22", homeTeamId: "athletic_historico", awayTeamId: "real_betis" }),
  makeFixture({ matchday: 30, date: "2026-04-05", homeTeamId: "getafe_cf", awayTeamId: "athletic_historico" }),
  makeFixture({ matchday: 31, date: "2026-04-12", homeTeamId: "athletic_historico", awayTeamId: "villarreal_cf" }),
  makeFixture({ matchday: 32, date: "2026-04-25", homeTeamId: "atletico_madrid", awayTeamId: "athletic_historico" }),
  makeFixture({ matchday: 33, date: "2026-04-21", homeTeamId: "athletic_historico", awayTeamId: "ca_osasuna" }),
  makeFixture({ matchday: 34, date: "2026-05-02", homeTeamId: "deportivo_alaves", awayTeamId: "athletic_historico" }),
  makeFixture({ matchday: 35, date: "2026-05-10", homeTeamId: "athletic_historico", awayTeamId: "valencia_cf" }),
  makeFixture({ matchday: 36, date: "2026-05-13", homeTeamId: "rcd_espanyol", awayTeamId: "athletic_historico" }),
  makeFixture({ matchday: 37, date: "2026-05-17", homeTeamId: "athletic_historico", awayTeamId: "celta_vigo" }),
  makeFixture({ matchday: 38, date: "2026-05-23", homeTeamId: "real_madrid", awayTeamId: "athletic_historico" }),
];

/**
 * Alias usado por el MVP.
 *
 * Ahora mismo representa el calendario real del Athletic histórico, no el calendario completo
 * de 380 partidos de LaLiga.
 */
export const LALIGA_2526_CALENDAR: SourcedLeagueFixture[] = LALIGA_2526_USER_TEAM_FIXTURES;

export function getLaliga2526Calendar(): SourcedLeagueFixture[] {
  return LALIGA_2526_CALENDAR;
}

export function getLaliga2526UserTeamFixtures(): SourcedLeagueFixture[] {
  return LALIGA_2526_USER_TEAM_FIXTURES;
}

export function getUserTeamFixtureByMatchday(
  matchday: number
): SourcedLeagueFixture | undefined {
  return LALIGA_2526_USER_TEAM_FIXTURES.find(
    (fixture) => fixture.matchday === matchday
  );
}

export function getNextUserTeamFixture(params: {
  playedFixtureIds: string[];
}): SourcedLeagueFixture | undefined {
  const played = new Set(params.playedFixtureIds);

  return LALIGA_2526_USER_TEAM_FIXTURES.find(
    (fixture) => !played.has(fixture.id)
  );
}

export function isFullLaligaCalendarAvailable(): boolean {
  return false;
}
