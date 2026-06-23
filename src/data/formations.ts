// src/data/formations.ts

// Etiquetas afinadas + modificadores equilibrados: ninguna formación debe tener ventaja neta grande sobre las demás.

import type { Formation } from "../types/game";

export const FORMATIONS: Formation[] = [
  {
    id: "4-3-3",
    name: "4-3-3",
    description:
      "Sistema equilibrado y ofensivo. Ideal para equipos con extremos potentes, laterales fiables y un delantero centro determinante.",
    strengths: [
      "Buen equilibrio entre ataque y defensa",
      "Mucho peligro por bandas",
      "Permite juntar tres delanteros",
      "Funciona bien con laterales ofensivos",
    ],
    weaknesses: [
      "Puede sufrir si los extremos ayudan poco en defensa",
      "Exige buenos laterales",
      "El mediocampo puede quedar superado ante sistemas con cinco medios",
    ],
    slots: [
      {
        id: "gk",
        label: "POR",
        allowedPositions: ["POR"],
        line: "goalkeeper",
      },
      {
        id: "rb",
        label: "LD",
        allowedPositions: ["LD", "CAD"],
        line: "defense",
      },
      {
        id: "cb_1",
        label: "DFC-D",
        allowedPositions: ["DFC"],
        line: "defense",
      },
      {
        id: "cb_2",
        label: "DFC-I",
        allowedPositions: ["DFC"],
        line: "defense",
      },
      {
        id: "lb",
        label: "LI",
        allowedPositions: ["LI", "CAI"],
        line: "defense",
      },
      {
        id: "cm_1",
        label: "MCD",
        allowedPositions: ["MC", "MCD"],
        line: "midfield",
      },
      {
        id: "cm_2",
        label: "MC",
        allowedPositions: ["MC", "MCD", "MP"],
        line: "midfield",
      },
      {
        id: "cm_3",
        label: "MP",
        allowedPositions: ["MC", "MP"],
        line: "midfield",
      },
      {
        id: "lw",
        label: "EI",
        allowedPositions: ["EI", "MI"],
        line: "attack",
      },
      {
        id: "st",
        label: "DC",
        allowedPositions: ["DC", "SD"],
        line: "attack",
      },
      {
        id: "rw",
        label: "ED",
        allowedPositions: ["ED", "MD"],
        line: "attack",
      },
    ],
    modifiers: {
      attack: 2,
      defense: -1,
      control: 1,
      risk: 1,
    },
  },

  {
    id: "4-4-2",
    name: "4-4-2",
    description:
      "Sistema clásico, directo y estable. Muy útil para equipos con dos delanteros fuertes y buenos jugadores de banda.",
    strengths: [
      "Dos delanteros constantes en el área",
      "Sistema sencillo y sólido",
      "Buen equilibrio defensivo",
      "Ideal para fútbol directo y físico",
    ],
    weaknesses: [
      "Menos creatividad entre líneas",
      "Puede perder el control contra mediocampos poblados",
      "Depende mucho del rendimiento de las bandas",
    ],
    slots: [
      {
        id: "gk",
        label: "POR",
        allowedPositions: ["POR"],
        line: "goalkeeper",
      },
      {
        id: "rb",
        label: "LD",
        allowedPositions: ["LD", "CAD"],
        line: "defense",
      },
      {
        id: "cb_1",
        label: "DFC-D",
        allowedPositions: ["DFC"],
        line: "defense",
      },
      {
        id: "cb_2",
        label: "DFC-I",
        allowedPositions: ["DFC"],
        line: "defense",
      },
      {
        id: "lb",
        label: "LI",
        allowedPositions: ["LI", "CAI"],
        line: "defense",
      },
      {
        id: "lm",
        label: "MI",
        allowedPositions: ["MI", "EI"],
        line: "midfield",
      },
      {
        id: "cm_1",
        label: "MCD",
        allowedPositions: ["MC", "MCD"],
        line: "midfield",
      },
      {
        id: "cm_2",
        label: "MC",
        allowedPositions: ["MC", "MP"],
        line: "midfield",
      },
      {
        id: "rm",
        label: "MD",
        allowedPositions: ["MD", "ED"],
        line: "midfield",
      },
      {
        id: "st_1",
        label: "SD",
        allowedPositions: ["DC", "SD"],
        line: "attack",
      },
      {
        id: "st_2",
        label: "DC",
        allowedPositions: ["DC", "SD"],
        line: "attack",
      },
    ],
    modifiers: {
      attack: 1,
      defense: 1,
      control: 1,
      risk: 0,
    },
  },

  {
    id: "4-2-3-1",
    name: "4-2-3-1",
    description:
      "Sistema moderno y muy completo. Combina doble pivote, mediapunta, extremos y un delantero referencia.",
    strengths: [
      "Muy buen equilibrio táctico",
      "Protege bien la defensa con doble pivote",
      "Permite tener un mediapunta creativo",
      "Buen sistema para competir en Liga",
    ],
    weaknesses: [
      "Depende mucho del mediapunta",
      "El delantero puede quedar aislado",
      "Necesita extremos con trabajo defensivo",
    ],
    slots: [
      {
        id: "gk",
        label: "POR",
        allowedPositions: ["POR"],
        line: "goalkeeper",
      },
      {
        id: "rb",
        label: "LD",
        allowedPositions: ["LD", "CAD"],
        line: "defense",
      },
      {
        id: "cb_1",
        label: "DFC-D",
        allowedPositions: ["DFC"],
        line: "defense",
      },
      {
        id: "cb_2",
        label: "DFC-I",
        allowedPositions: ["DFC"],
        line: "defense",
      },
      {
        id: "lb",
        label: "LI",
        allowedPositions: ["LI", "CAI"],
        line: "defense",
      },
      {
        id: "dm_1",
        label: "MCD",
        allowedPositions: ["MCD", "MC"],
        line: "midfield",
      },
      {
        id: "dm_2",
        label: "MC",
        allowedPositions: ["MC", "MCD"],
        line: "midfield",
      },
      {
        id: "am",
        label: "MP",
        allowedPositions: ["MP", "MC", "SD"],
        line: "midfield",
      },
      {
        id: "lw",
        label: "EI",
        allowedPositions: ["EI", "MI"],
        line: "attack",
      },
      {
        id: "rw",
        label: "ED",
        allowedPositions: ["ED", "MD"],
        line: "attack",
      },
      {
        id: "st",
        label: "DC",
        allowedPositions: ["DC"],
        line: "attack",
      },
    ],
    modifiers: {
      attack: 1,
      defense: 1,
      control: 2,
      risk: 0,
    },
  },

  {
    id: "5-3-2",
    name: "5-3-2",
    description:
      "Sistema defensivo y competitivo. Ideal para protegerse atrás, jugar con carrileros y aprovechar dos delanteros.",
    strengths: [
      "Muy fuerte defensivamente",
      "Tres centrales dan mucha seguridad",
      "Bueno para partidos igualados",
      "Dos delanteros permiten salir rápido",
    ],
    weaknesses: [
      "Menos producción ofensiva",
      "Depende mucho de los carrileros",
      "Puede sufrir para dominar partidos",
    ],
    slots: [
      {
        id: "gk",
        label: "POR",
        allowedPositions: ["POR"],
        line: "goalkeeper",
      },
      {
        id: "cb_1",
        label: "DFC-D",
        allowedPositions: ["DFC"],
        line: "defense",
      },
      {
        id: "cb_2",
        label: "DFC-C",
        allowedPositions: ["DFC"],
        line: "defense",
      },
      {
        id: "cb_3",
        label: "DFC-I",
        allowedPositions: ["DFC"],
        line: "defense",
      },
      {
        id: "rwb",
        label: "CAD",
        allowedPositions: ["CAD", "LD", "MD"],
        line: "defense",
      },
      {
        id: "lwb",
        label: "CAI",
        allowedPositions: ["CAI", "LI", "MI"],
        line: "defense",
      },
      {
        id: "cm_1",
        label: "MC",
        allowedPositions: ["MC", "MCD"],
        line: "midfield",
      },
      {
        id: "cm_2",
        label: "MP",
        allowedPositions: ["MC", "MP"],
        line: "midfield",
      },
      {
        id: "cm_3",
        label: "MCD",
        allowedPositions: ["MC", "MCD", "MP"],
        line: "midfield",
      },
      {
        id: "st_1",
        label: "SD",
        allowedPositions: ["DC", "SD"],
        line: "attack",
      },
      {
        id: "st_2",
        label: "DC",
        allowedPositions: ["DC", "SD"],
        line: "attack",
      },
    ],
    modifiers: {
      attack: -1,
      defense: 3,
      control: 2,
      risk: -1,
    },
  },

  {
    id: "3-5-2",
    name: "3-5-2",
    description:
      "Sistema de control y superioridad en el centro del campo. Muy útil si se tienen buenos centrales, carrileros y dos delanteros.",
    strengths: [
      "Mucho dominio en mediocampo",
      "Dos delanteros generan amenaza constante",
      "Permite juntar muchos centrocampistas",
      "Fuerte si los carrileros tienen recorrido",
    ],
    weaknesses: [
      "Riesgo por bandas",
      "Exige centrales rápidos",
      "Puede sufrir contra extremos muy abiertos",
    ],
    slots: [
      {
        id: "gk",
        label: "POR",
        allowedPositions: ["POR"],
        line: "goalkeeper",
      },
      {
        id: "cb_1",
        label: "DFC-D",
        allowedPositions: ["DFC"],
        line: "defense",
      },
      {
        id: "cb_2",
        label: "DFC-C",
        allowedPositions: ["DFC"],
        line: "defense",
      },
      {
        id: "cb_3",
        label: "DFC-I",
        allowedPositions: ["DFC"],
        line: "defense",
      },
      {
        id: "rwb",
        label: "CAD",
        allowedPositions: ["CAD", "LD", "MD"],
        line: "midfield",
      },
      {
        id: "lwb",
        label: "CAI",
        allowedPositions: ["CAI", "LI", "MI"],
        line: "midfield",
      },
      {
        id: "dm",
        label: "MCD",
        allowedPositions: ["MCD", "MC", "DFC"],
        line: "midfield",
      },
      {
        id: "cm_1",
        label: "MC",
        allowedPositions: ["MC", "MP"],
        line: "midfield",
      },
      {
        id: "cm_2",
        label: "MP",
        allowedPositions: ["MC", "MCD", "MP"],
        line: "midfield",
      },
      {
        id: "st_1",
        label: "SD",
        allowedPositions: ["DC", "SD"],
        line: "attack",
      },
      {
        id: "st_2",
        label: "DC",
        allowedPositions: ["DC", "SD"],
        line: "attack",
      },
    ],
    modifiers: {
      attack: 1,
      defense: -1,
      control: 2,
      risk: 1,
    },
  },

  {
    id: "4-5-1",
    name: "4-5-1",
    description:
      "Sistema de control, resistencia y orden. Reduce riesgos, protege bien el centro y busca ganar desde la estabilidad.",
    strengths: [
      "Mucho control en mediocampo",
      "Reduce ocasiones rivales",
      "Muy estable en partidos largos",
      "Buena opción para ligas regulares",
    ],
    weaknesses: [
      "Menos presencia en el área",
      "El delantero puede quedar solo",
      "Puede costar remontar partidos",
    ],
    slots: [
      {
        id: "gk",
        label: "POR",
        allowedPositions: ["POR"],
        line: "goalkeeper",
      },
      {
        id: "rb",
        label: "LD",
        allowedPositions: ["LD", "CAD"],
        line: "defense",
      },
      {
        id: "cb_1",
        label: "DFC-D",
        allowedPositions: ["DFC"],
        line: "defense",
      },
      {
        id: "cb_2",
        label: "DFC-I",
        allowedPositions: ["DFC"],
        line: "defense",
      },
      {
        id: "lb",
        label: "LI",
        allowedPositions: ["LI", "CAI"],
        line: "defense",
      },
      {
        id: "dm",
        label: "MCD",
        allowedPositions: ["MCD", "MC"],
        line: "midfield",
      },
      {
        id: "cm_1",
        label: "MC",
        allowedPositions: ["MC", "MCD"],
        line: "midfield",
      },
      {
        id: "cm_2",
        label: "MP",
        allowedPositions: ["MC", "MP"],
        line: "midfield",
      },
      {
        id: "lm",
        label: "MI",
        allowedPositions: ["MI", "EI", "CAI"],
        line: "midfield",
      },
      {
        id: "rm",
        label: "MD",
        allowedPositions: ["MD", "ED", "CAD"],
        line: "midfield",
      },
      {
        id: "st",
        label: "DC",
        allowedPositions: ["DC", "SD"],
        line: "attack",
      },
    ],
    modifiers: {
      attack: -1,
      defense: 2,
      control: 3,
      risk: -1,
    },
  },

  {
    id: "3-4-3",
    name: "3-4-3",
    description:
      "Sistema ofensivo con tres centrales, dos carrileros y tres atacantes. Ideal para presionar alto y atacar con mucha amplitud.",
    strengths: [
      "Mucho poder ofensivo",
      "Tres atacantes constantes",
      "Carrileros con mucha presencia",
      "Muy buena para remontar o asumir riesgos",
    ],
    weaknesses: [
      "Puede sufrir a la espalda de los carrileros",
      "Exige centrales rápidos",
      "Menos seguridad si se pierde el balón en salida",
    ],
    slots: [
      { id: "gk", label: "POR", allowedPositions: ["POR"], line: "goalkeeper" },
      { id: "cb_l", label: "DFC-I", allowedPositions: ["DFC", "LI"], line: "defense" },
      { id: "cb_c", label: "DFC-C", allowedPositions: ["DFC"], line: "defense" },
      { id: "cb_r", label: "DFC-D", allowedPositions: ["DFC", "LD"], line: "defense" },
      { id: "lm", label: "MI", allowedPositions: ["MI", "CAI", "EI"], line: "midfield" },
      { id: "cm_1", label: "MC", allowedPositions: ["MC", "MCD"], line: "midfield" },
      { id: "cm_2", label: "MC", allowedPositions: ["MC", "MP", "MCD"], line: "midfield" },
      { id: "rm", label: "MD", allowedPositions: ["MD", "CAD", "ED"], line: "midfield" },
      { id: "lw", label: "EI", allowedPositions: ["EI", "MI"], line: "attack" },
      { id: "st", label: "DC", allowedPositions: ["DC", "SD"], line: "attack" },
      { id: "rw", label: "ED", allowedPositions: ["ED", "MD"], line: "attack" },
    ],
    modifiers: {
      attack: 4,
      defense: -1,
      control: 1,
      risk: 2,
    },
  },

  {
    id: "5-4-1",
    name: "5-4-1",
    description:
      "Sistema muy defensivo y ordenado. Protege el área, cierra bandas y busca competir desde la solidez.",
    strengths: [
      "Muy fuerte defensivamente",
      "Cinco defensas protegen muy bien el área",
      "Bueno para partidos de máxima dificultad",
      "Reduce mucho el riesgo",
    ],
    weaknesses: [
      "Poca presencia ofensiva",
      "El delantero puede quedar aislado",
      "Cuesta generar ocasiones si no hay buenos carrileros",
    ],
    slots: [
      { id: "gk", label: "POR", allowedPositions: ["POR"], line: "goalkeeper" },
      { id: "lwb", label: "CAI", allowedPositions: ["CAI", "LI", "MI"], line: "defense" },
      { id: "cb_l", label: "DFC-I", allowedPositions: ["DFC", "LI"], line: "defense" },
      { id: "cb_c", label: "DFC-C", allowedPositions: ["DFC"], line: "defense" },
      { id: "cb_r", label: "DFC-D", allowedPositions: ["DFC", "LD"], line: "defense" },
      { id: "rwb", label: "CAD", allowedPositions: ["CAD", "LD", "MD"], line: "defense" },
      { id: "lm", label: "MI", allowedPositions: ["MI", "EI", "CAI"], line: "midfield" },
      { id: "cm_1", label: "MCD", allowedPositions: ["MCD", "MC"], line: "midfield" },
      { id: "cm_2", label: "MC", allowedPositions: ["MC", "MCD", "MP"], line: "midfield" },
      { id: "rm", label: "MD", allowedPositions: ["MD", "ED", "CAD"], line: "midfield" },
      { id: "st", label: "DC", allowedPositions: ["DC", "SD"], line: "attack" },
    ],
    modifiers: {
      attack: -2,
      defense: 5,
      control: 1,
      risk: -1,
    },
  },

  {
    id: "3-6-1",
    name: "3-6-1",
    description:
      "Sistema de control extremo. Acumula centrocampistas, protege el centro y busca dominar la posesión con un solo delantero.",
    strengths: [
      "Mucho control en el centro del campo",
      "Permite juntar muchos perfiles creativos",
      "Muy útil para dormir partidos",
      "Buena presión tras pérdida",
    ],
    weaknesses: [
      "Poca presencia en el área",
      "Exige carrileros con recorrido",
      "Puede atascarse si el delantero queda solo",
    ],
    slots: [
      { id: "gk", label: "POR", allowedPositions: ["POR"], line: "goalkeeper" },
      { id: "cb_l", label: "DFC-I", allowedPositions: ["DFC", "LI"], line: "defense" },
      { id: "cb_c", label: "DFC-C", allowedPositions: ["DFC"], line: "defense" },
      { id: "cb_r", label: "DFC-D", allowedPositions: ["DFC", "LD"], line: "defense" },
      { id: "lm", label: "MI", allowedPositions: ["MI", "CAI", "EI"], line: "midfield" },
      { id: "dm", label: "MCD", allowedPositions: ["MCD", "MC", "DFC"], line: "midfield" },
      { id: "cm_1", label: "MC", allowedPositions: ["MC", "MCD"], line: "midfield" },
      { id: "cm_2", label: "MC", allowedPositions: ["MC", "MP"], line: "midfield" },
      { id: "am", label: "MP", allowedPositions: ["MP", "MC", "SD"], line: "midfield" },
      { id: "rm", label: "MD", allowedPositions: ["MD", "CAD", "ED"], line: "midfield" },
      { id: "st", label: "DC", allowedPositions: ["DC", "SD"], line: "attack" },
    ],
    modifiers: {
      attack: -1,
      defense: 2,
      control: 4,
      risk: -1,
    },
  },

  {
    id: "3-3-4",
    name: "3-3-4",
    description:
      "Sistema ultraofensivo y arriesgado. Cuatro atacantes, tres medios y tres defensas para partidos donde solo vale ganar.",
    strengths: [
      "Máxima presencia ofensiva",
      "Muchos rematadores y extremos",
      "Ideal para buscar goles",
      "Muy divertido para plantillas ofensivas",
    ],
    weaknesses: [
      "Muchísimo riesgo defensivo",
      "Puede partirse el equipo",
      "Exige centrales dominantes",
    ],
    slots: [
      { id: "gk", label: "POR", allowedPositions: ["POR"], line: "goalkeeper" },
      { id: "cb_l", label: "DFC-I", allowedPositions: ["DFC", "LI"], line: "defense" },
      { id: "cb_c", label: "DFC-C", allowedPositions: ["DFC"], line: "defense" },
      { id: "cb_r", label: "DFC-D", allowedPositions: ["DFC", "LD"], line: "defense" },
      { id: "cm_1", label: "MC", allowedPositions: ["MC", "MCD"], line: "midfield" },
      { id: "cm_2", label: "MC", allowedPositions: ["MC", "MP", "MCD"], line: "midfield" },
      { id: "am", label: "MP", allowedPositions: ["MP", "MC", "SD"], line: "midfield" },
      { id: "lw", label: "EI", allowedPositions: ["EI", "MI"], line: "attack" },
      { id: "st_1", label: "DC", allowedPositions: ["DC", "SD"], line: "attack" },
      { id: "st_2", label: "SD", allowedPositions: ["SD", "DC", "MP"], line: "attack" },
      { id: "rw", label: "ED", allowedPositions: ["ED", "MD"], line: "attack" },
    ],
    modifiers: {
      attack: 5,
      defense: -3,
      control: 0,
      risk: 3,
    },
  },

  {
    id: "4-2-4",
    name: "4-2-4",
    description:
      "Sistema ofensivo clásico con cuatro atacantes. Muy agresivo, vertical y pensado para atacar rápido.",
    strengths: [
      "Muchísima amenaza arriba",
      "Dos delanteros y dos extremos",
      "Ideal para equipos con pegada",
      "Genera muchos duelos ofensivos",
    ],
    weaknesses: [
      "Centro del campo poco protegido",
      "Puede sufrir ante rivales con muchos medios",
      "Sistema de alto riesgo",
    ],
    slots: [
      { id: "gk", label: "POR", allowedPositions: ["POR"], line: "goalkeeper" },
      { id: "rb", label: "LD", allowedPositions: ["LD", "CAD"], line: "defense" },
      { id: "cb_1", label: "DFC-I", allowedPositions: ["DFC"], line: "defense" },
      { id: "cb_2", label: "DFC-D", allowedPositions: ["DFC"], line: "defense" },
      { id: "lb", label: "LI", allowedPositions: ["LI", "CAI"], line: "defense" },
      { id: "cm_1", label: "MCD", allowedPositions: ["MCD", "MC"], line: "midfield" },
      { id: "cm_2", label: "MC", allowedPositions: ["MC", "MCD", "MP"], line: "midfield" },
      { id: "lw", label: "EI", allowedPositions: ["EI", "MI"], line: "attack" },
      { id: "st_1", label: "DC", allowedPositions: ["DC", "SD"], line: "attack" },
      { id: "st_2", label: "SD", allowedPositions: ["SD", "DC", "MP"], line: "attack" },
      { id: "rw", label: "ED", allowedPositions: ["ED", "MD"], line: "attack" },
    ],
    modifiers: {
      attack: 5,
      defense: -2,
      control: -1,
      risk: 3,
    },
  },

  {
    id: "4-6-0",
    name: "4-6-0",
    description:
      "Sistema sin delantero fijo. Acumula mediapuntas y centrocampistas para atacar desde segunda línea y desordenar marcas.",
    strengths: [
      "Mucho control y movilidad",
      "Difícil de defender si hay buenos mediapuntas",
      "Permite jugar sin delantero puro",
      "Muy útil con llegadores desde segunda línea",
    ],
    weaknesses: [
      "Puede faltar remate en el área",
      "Requiere mucha calidad técnica",
      "No encaja bien con plantillas de delanteros clásicos",
    ],
    slots: [
      { id: "gk", label: "POR", allowedPositions: ["POR"], line: "goalkeeper" },
      { id: "rb", label: "LD", allowedPositions: ["LD", "CAD"], line: "defense" },
      { id: "cb_1", label: "DFC-I", allowedPositions: ["DFC"], line: "defense" },
      { id: "cb_2", label: "DFC-D", allowedPositions: ["DFC"], line: "defense" },
      { id: "lb", label: "LI", allowedPositions: ["LI", "CAI"], line: "defense" },
      { id: "dm_1", label: "MCD", allowedPositions: ["MCD", "MC"], line: "midfield" },
      { id: "dm_2", label: "MC", allowedPositions: ["MC", "MCD"], line: "midfield" },
      { id: "lm", label: "MI", allowedPositions: ["MI", "EI", "CAI"], line: "midfield" },
      { id: "am_1", label: "MP", allowedPositions: ["MP", "MC", "SD"], line: "midfield" },
      { id: "am_2", label: "MP", allowedPositions: ["MP", "MC", "SD"], line: "midfield" },
      { id: "rm", label: "MD", allowedPositions: ["MD", "ED", "CAD"], line: "midfield" },
    ],
    modifiers: {
      attack: 0,
      defense: 1,
      control: 5,
      risk: -1,
    },
  },

  {
    id: "5-2-3",
    name: "5-2-3",
    description:
      "Sistema de cinco defensas y tres atacantes. Protege atrás sin renunciar a salir con extremos y un delantero referencia.",
    strengths: [
      "Buena protección defensiva",
      "Tres atacantes para contraatacar",
      "Carrileros importantes",
      "Útil contra rivales fuertes",
    ],
    weaknesses: [
      "Solo dos centrocampistas",
      "Puede perder posesión",
      "Depende de transiciones rápidas",
    ],
    slots: [
      { id: "gk", label: "POR", allowedPositions: ["POR"], line: "goalkeeper" },
      { id: "lwb", label: "CAI", allowedPositions: ["CAI", "LI", "MI"], line: "defense" },
      { id: "cb_l", label: "DFC-I", allowedPositions: ["DFC", "LI"], line: "defense" },
      { id: "cb_c", label: "DFC-C", allowedPositions: ["DFC"], line: "defense" },
      { id: "cb_r", label: "DFC-D", allowedPositions: ["DFC", "LD"], line: "defense" },
      { id: "rwb", label: "CAD", allowedPositions: ["CAD", "LD", "MD"], line: "defense" },
      { id: "cm_1", label: "MCD", allowedPositions: ["MCD", "MC"], line: "midfield" },
      { id: "cm_2", label: "MC", allowedPositions: ["MC", "MCD", "MP"], line: "midfield" },
      { id: "lw", label: "EI", allowedPositions: ["EI", "MI"], line: "attack" },
      { id: "st", label: "DC", allowedPositions: ["DC", "SD"], line: "attack" },
      { id: "rw", label: "ED", allowedPositions: ["ED", "MD"], line: "attack" },
    ],
    modifiers: {
      attack: 2,
      defense: 3,
      control: -1,
      risk: -1,
    },
  },
];

export function getFormationById(formationId: string): Formation | undefined {
  return FORMATIONS.find((formation) => formation.id === formationId);
}

