/**
 * Aura-inspired design tokens for Major AI Mindset ABC Studio.
 * Sourced from DESIGN.md — single source of truth for all UI implementations.
 */

export const colors = {
  gold: "#D4AF37",
  black: "#050505",
  nearBlack: "#080808",
  parchment: "#EAE2D3",
  lime: "#A3E635",
  darkSurface: "#18181B",
  textLight: "#FFFFFF",
  textDark: "#111827",
  mutedDark: "#A1A1AA",
  mutedLight: "#4B5563",
  borderDark: "#27272A",
  borderLight: "#E5E7EB",
} as const;

export const fonts = {
  display: "Cinzel",
  body: "Inter",
  mono: "JetBrains Mono",
} as const;

export const radii = {
  editorialCard: "16px",
  systemCard: "8px",
  pill: "9999px",
} as const;

export const spacing = {
  base: "8px",
  gap: "16px",
  cardPadding: "24px",
  sectionPadding: "80px",
} as const;

/** Level badge color mapping */
export const levelColors: Record<string, string> = {
  beginner: colors.lime,
  intermediate: colors.gold,
  advanced: colors.parchment,
};

/** Status badge color mapping */
export const statusColors: Record<string, string> = {
  idea: colors.mutedDark,
  drafted: colors.mutedDark,
  designed: colors.gold,
  recorded: colors.gold,
  edited: colors.gold,
  scheduled: colors.lime,
  published: colors.lime,
  repurposed: colors.lime,
};

export const tokens = { colors, fonts, radii, spacing, levelColors, statusColors };
export default tokens;
