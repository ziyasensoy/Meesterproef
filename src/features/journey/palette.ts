import type { LayerId } from "@/types/journey";

interface LayerPalette {
  accent: string;
  glow: string;
  bg: string;
}

const LAYER_PALETTES: Record<LayerId, LayerPalette> = {
  intro: { accent: "#89cff0", glow: "#c5e8f7", bg: "#0a2845" },
  dive: { accent: "#00e5cc", glow: "#89cff0", bg: "#0d2035" },
  surface: { accent: "#89cff0", glow: "#5eb8e8", bg: "#0d3a5c" },
  nature: { accent: "#00e5cc", glow: "#b8e986", bg: "#0a1a2e" },
  pollution: { accent: "#e8a87c", glow: "#6a8fa8", bg: "#101c28" },
  infrastructure: { accent: "#9d4edd", glow: "#5eb8e8", bg: "#0c1424" },
  history: { accent: "#d4a574", glow: "#c9b458", bg: "#121820" },
  politics: { accent: "#c9b458", glow: "#89cff0", bg: "#0e1828" },
  finale: { accent: "#89cff0", glow: "#ffffff", bg: "#0c1520" },
};

const LAYER_ORDER: LayerId[] = [
  "intro",
  "surface",
  "nature",
  "pollution",
  "infrastructure",
  "history",
  "politics",
  "finale",
];

function parseHex(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function toHex(r: number, g: number, b: number): string {
  const c = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

function lerpHex(a: string, b: string, t: number): string {
  const [r1, g1, b1] = parseHex(a);
  const [r2, g2, b2] = parseHex(b);
  return toHex(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t);
}

function smoothstep(t: number): number {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

function applyPaletteValues(palette: LayerPalette): void {
  document.documentElement.style.setProperty("--color-accent", palette.accent);
  document.documentElement.style.setProperty("--color-glow", palette.glow);
  document.documentElement.style.setProperty("--color-bg-shift", palette.bg);
}

function blendPalettes(
  from: LayerPalette,
  to: LayerPalette,
  t: number,
): LayerPalette {
  return {
    accent: lerpHex(from.accent, to.accent, t),
    glow: lerpHex(from.glow, to.glow, t),
    bg: lerpHex(from.bg, to.bg, t),
  };
}

export function applyLayerPalette(layer: string): void {
  const palette = LAYER_PALETTES[layer as LayerId] ?? LAYER_PALETTES.intro;
  applyPaletteValues(palette);
}

/** Smoothly blend palette between layers based on scroll position. */
export function updatePaletteFromScroll(): void {
  const sections = [
    ...document.querySelectorAll<HTMLElement>("[data-layer]"),
  ];
  if (sections.length === 0) return;

  const vh = window.innerHeight;
  const focusY = vh * 0.4;

  let fromIdx = 0;
  for (let i = 0; i < sections.length; i++) {
    const top = sections[i].getBoundingClientRect().top;
    if (top <= focusY) fromIdx = i;
  }

  const fromEl = sections[fromIdx];
  const toIdx = Math.min(fromIdx + 1, sections.length - 1);
  const toEl = sections[toIdx];

  const fromId = (fromEl.dataset.layer ?? "intro") as LayerId;
  const toId = (toEl.dataset.layer ?? "intro") as LayerId;
  const fromPalette = LAYER_PALETTES[fromId] ?? LAYER_PALETTES.intro;
  const toPalette = LAYER_PALETTES[toId] ?? LAYER_PALETTES.intro;

  if (fromIdx === toIdx || fromEl === toEl) {
    applyPaletteValues(fromPalette);
    return;
  }

  const fromRect = fromEl.getBoundingClientRect();
  const toRect = toEl.getBoundingClientRect();
  const blendStart = fromRect.bottom - vh * 0.25;
  const blendEnd = toRect.top + vh * 0.15;
  const span = Math.max(blendEnd - blendStart, vh * 0.35);
  const raw = (focusY - blendStart) / span;
  const t = smoothstep(raw);

  applyPaletteValues(blendPalettes(fromPalette, toPalette, t));
}

export function getLayerOrder(): readonly LayerId[] {
  return LAYER_ORDER;
}
