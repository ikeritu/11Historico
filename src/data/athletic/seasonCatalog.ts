// src/data/athletic/seasonCatalog.ts

import type { SeasonId } from "../../types/game";

export type AthleticHistoricalSeasonStatus = "playable" | "planned" | "researching";

export type AthleticHistoricalEra =
  | "pre_war"
  | "post_war"
  | "classic"
  | "modern"
  | "contemporary";

export interface AthleticHistoricalSeasonCatalogItem {
  season: SeasonId;
  startYear: number;
  endYear: number;
  status: AthleticHistoricalSeasonStatus;
  era: AthleticHistoricalEra;
}

/**
 * Catálogo maestro para la expansión histórica.
 *
 * "playable" = temporada ya tiene plantilla jugable en src/data/athletic/seasons.ts.
 * "planned" = temporada reservada para añadir plantilla, entrenador, ratings y fuentes.
 *
 * Nota: se excluyen 1936/37, 1937/38 y 1938/39 como temporadas de liga nacional no disputadas.
 */
export const ATHLETIC_HISTORICAL_SEASON_CATALOG: AthleticHistoricalSeasonCatalogItem[] = [
  { season: "1928/29", startYear: 1928, endYear: 1929, status: "playable", era: "pre_war" },
  { season: "1929/30", startYear: 1929, endYear: 1930, status: "playable", era: "pre_war" },
  { season: "1930/31", startYear: 1930, endYear: 1931, status: "playable", era: "pre_war" },
  { season: "1931/32", startYear: 1931, endYear: 1932, status: "playable", era: "pre_war" },
  { season: "1932/33", startYear: 1932, endYear: 1933, status: "playable", era: "pre_war" },
  { season: "1933/34", startYear: 1933, endYear: 1934, status: "playable", era: "pre_war" },
  { season: "1934/35", startYear: 1934, endYear: 1935, status: "playable", era: "pre_war" },
  { season: "1935/36", startYear: 1935, endYear: 1936, status: "playable", era: "pre_war" },
  { season: "1939/40", startYear: 1939, endYear: 1940, status: "playable", era: "post_war" },
  { season: "1940/41", startYear: 1940, endYear: 1941, status: "playable", era: "post_war" },
  { season: "1941/42", startYear: 1941, endYear: 1942, status: "playable", era: "post_war" },
  { season: "1942/43", startYear: 1942, endYear: 1943, status: "playable", era: "post_war" },
  { season: "1943/44", startYear: 1943, endYear: 1944, status: "playable", era: "post_war" },
  { season: "1944/45", startYear: 1944, endYear: 1945, status: "playable", era: "post_war" },
  { season: "1945/46", startYear: 1945, endYear: 1946, status: "playable", era: "post_war" },
  { season: "1946/47", startYear: 1946, endYear: 1947, status: "playable", era: "post_war" },
  { season: "1947/48", startYear: 1947, endYear: 1948, status: "playable", era: "post_war" },
  { season: "1948/49", startYear: 1948, endYear: 1949, status: "playable", era: "post_war" },
  { season: "1949/50", startYear: 1949, endYear: 1950, status: "playable", era: "post_war" },
  { season: "1950/51", startYear: 1950, endYear: 1951, status: "playable", era: "post_war" },
  { season: "1951/52", startYear: 1951, endYear: 1952, status: "playable", era: "post_war" },
  { season: "1952/53", startYear: 1952, endYear: 1953, status: "playable", era: "post_war" },
  { season: "1953/54", startYear: 1953, endYear: 1954, status: "playable", era: "post_war" },
  { season: "1954/55", startYear: 1954, endYear: 1955, status: "playable", era: "post_war" },
  { season: "1955/56", startYear: 1955, endYear: 1956, status: "playable", era: "post_war" },
  { season: "1956/57", startYear: 1956, endYear: 1957, status: "playable", era: "post_war" },
  { season: "1957/58", startYear: 1957, endYear: 1958, status: "playable", era: "post_war" },
  { season: "1958/59", startYear: 1958, endYear: 1959, status: "playable", era: "post_war" },
  { season: "1959/60", startYear: 1959, endYear: 1960, status: "playable", era: "post_war" },
  { season: "1960/61", startYear: 1960, endYear: 1961, status: "playable", era: "classic" },
  { season: "1961/62", startYear: 1961, endYear: 1962, status: "playable", era: "classic" },
  { season: "1962/63", startYear: 1962, endYear: 1963, status: "playable", era: "classic" },
  { season: "1963/64", startYear: 1963, endYear: 1964, status: "playable", era: "classic" },
  { season: "1964/65", startYear: 1964, endYear: 1965, status: "playable", era: "classic" },
  { season: "1965/66", startYear: 1965, endYear: 1966, status: "playable", era: "classic" },
  { season: "1966/67", startYear: 1966, endYear: 1967, status: "playable", era: "classic" },
  { season: "1967/68", startYear: 1967, endYear: 1968, status: "playable", era: "classic" },
  { season: "1968/69", startYear: 1968, endYear: 1969, status: "playable", era: "classic" },
  { season: "1969/70", startYear: 1969, endYear: 1970, status: "playable", era: "classic" },
  { season: "1970/71", startYear: 1970, endYear: 1971, status: "playable", era: "classic" },
  { season: "1971/72", startYear: 1971, endYear: 1972, status: "playable", era: "classic" },
  { season: "1972/73", startYear: 1972, endYear: 1973, status: "playable", era: "classic" },
  { season: "1973/74", startYear: 1973, endYear: 1974, status: "playable", era: "classic" },
  { season: "1974/75", startYear: 1974, endYear: 1975, status: "playable", era: "classic" },
  { season: "1975/76", startYear: 1975, endYear: 1976, status: "playable", era: "classic" },
  { season: "1976/77", startYear: 1976, endYear: 1977, status: "playable", era: "classic" },
  { season: "1977/78", startYear: 1977, endYear: 1978, status: "playable", era: "classic" },
  { season: "1978/79", startYear: 1978, endYear: 1979, status: "playable", era: "classic" },
  { season: "1979/80", startYear: 1979, endYear: 1980, status: "playable", era: "classic" },
  { season: "1980/81", startYear: 1980, endYear: 1981, status: "playable", era: "modern" },
  { season: "1981/82", startYear: 1981, endYear: 1982, status: "playable", era: "modern" },
  { season: "1982/83", startYear: 1982, endYear: 1983, status: "playable", era: "modern" },
  { season: "1983/84", startYear: 1983, endYear: 1984, status: "playable", era: "modern" },
  { season: "1984/85", startYear: 1984, endYear: 1985, status: "playable", era: "modern" },
  { season: "1985/86", startYear: 1985, endYear: 1986, status: "playable", era: "modern" },
  { season: "1986/87", startYear: 1986, endYear: 1987, status: "playable", era: "modern" },
  { season: "1987/88", startYear: 1987, endYear: 1988, status: "playable", era: "modern" },
  { season: "1988/89", startYear: 1988, endYear: 1989, status: "playable", era: "modern" },
  { season: "1989/90", startYear: 1989, endYear: 1990, status: "playable", era: "modern" },
  { season: "1990/91", startYear: 1990, endYear: 1991, status: "playable", era: "modern" },
  { season: "1991/92", startYear: 1991, endYear: 1992, status: "playable", era: "modern" },
  { season: "1992/93", startYear: 1992, endYear: 1993, status: "playable", era: "modern" },
  { season: "1993/94", startYear: 1993, endYear: 1994, status: "playable", era: "modern" },
  { season: "1994/95", startYear: 1994, endYear: 1995, status: "playable", era: "modern" },
  { season: "1995/96", startYear: 1995, endYear: 1996, status: "playable", era: "modern" },
  { season: "1996/97", startYear: 1996, endYear: 1997, status: "playable", era: "modern" },
  { season: "1997/98", startYear: 1997, endYear: 1998, status: "playable", era: "modern" },
  { season: "1998/99", startYear: 1998, endYear: 1999, status: "playable", era: "modern" },
  { season: "1999/00", startYear: 1999, endYear: 2000, status: "playable", era: "modern" },
  { season: "2000/01", startYear: 2000, endYear: 2001, status: "playable", era: "contemporary" },
  { season: "2001/02", startYear: 2001, endYear: 2002, status: "playable", era: "contemporary" },
  { season: "2002/03", startYear: 2002, endYear: 2003, status: "playable", era: "contemporary" },
  { season: "2003/04", startYear: 2003, endYear: 2004, status: "playable", era: "contemporary" },
  { season: "2004/05", startYear: 2004, endYear: 2005, status: "playable", era: "contemporary" },
  { season: "2005/06", startYear: 2005, endYear: 2006, status: "playable", era: "contemporary" },
  { season: "2006/07", startYear: 2006, endYear: 2007, status: "playable", era: "contemporary" },
  { season: "2007/08", startYear: 2007, endYear: 2008, status: "playable", era: "contemporary" },
  { season: "2008/09", startYear: 2008, endYear: 2009, status: "playable", era: "contemporary" },
  { season: "2009/10", startYear: 2009, endYear: 2010, status: "playable", era: "contemporary" },
  { season: "2010/11", startYear: 2010, endYear: 2011, status: "playable", era: "contemporary" },
  { season: "2011/12", startYear: 2011, endYear: 2012, status: "playable", era: "contemporary" },
  { season: "2012/13", startYear: 2012, endYear: 2013, status: "playable", era: "contemporary" },
  { season: "2013/14", startYear: 2013, endYear: 2014, status: "playable", era: "contemporary" },
  { season: "2014/15", startYear: 2014, endYear: 2015, status: "playable", era: "contemporary" },
  { season: "2015/16", startYear: 2015, endYear: 2016, status: "playable", era: "contemporary" },
  { season: "2016/17", startYear: 2016, endYear: 2017, status: "playable", era: "contemporary" },
  { season: "2017/18", startYear: 2017, endYear: 2018, status: "playable", era: "contemporary" },
  { season: "2018/19", startYear: 2018, endYear: 2019, status: "playable", era: "contemporary" },
  { season: "2019/20", startYear: 2019, endYear: 2020, status: "playable", era: "contemporary" },
  { season: "2020/21", startYear: 2020, endYear: 2021, status: "playable", era: "contemporary" },
  { season: "2021/22", startYear: 2021, endYear: 2022, status: "playable", era: "contemporary" },
  { season: "2022/23", startYear: 2022, endYear: 2023, status: "playable", era: "contemporary" },
  { season: "2023/24", startYear: 2023, endYear: 2024, status: "playable", era: "contemporary" },
  { season: "2024/25", startYear: 2024, endYear: 2025, status: "playable", era: "contemporary" },
  { season: "2025/26", startYear: 2025, endYear: 2026, status: "playable", era: "contemporary" }
];

export function getAllAthleticHistoricalSeasons(): SeasonId[] {
  return ATHLETIC_HISTORICAL_SEASON_CATALOG.map((item) => item.season);
}

export function getPlayableAthleticHistoricalSeasons(): SeasonId[] {
  return ATHLETIC_HISTORICAL_SEASON_CATALOG
    .filter((item) => item.status === "playable")
    .map((item) => item.season);
}

export function getPlannedAthleticHistoricalSeasons(): SeasonId[] {
  return ATHLETIC_HISTORICAL_SEASON_CATALOG
    .filter((item) => item.status === "planned")
    .map((item) => item.season);
}

export function getAthleticHistoricalSeasonCatalogItem(
  season: SeasonId
): AthleticHistoricalSeasonCatalogItem | undefined {
  return ATHLETIC_HISTORICAL_SEASON_CATALOG.find((item) => item.season === season);
}

export function getAthleticHistoricalProgress(): {
  total: number;
  playable: number;
  planned: number;
} {
  const playable = ATHLETIC_HISTORICAL_SEASON_CATALOG.filter(
    (item) => item.status === "playable"
  ).length;

  return {
    total: ATHLETIC_HISTORICAL_SEASON_CATALOG.length,
    playable,
    planned: ATHLETIC_HISTORICAL_SEASON_CATALOG.length - playable,
  };
}










