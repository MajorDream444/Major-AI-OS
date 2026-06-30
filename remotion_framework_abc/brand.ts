/**
 * MAIM Brand Config
 * Single source of truth for all Remotion templates.
 * Change values here → all reels update automatically.
 */

export const BRAND = {
  // Colors
  colors: {
    black:      '#0A0A0A',
    white:      '#FFFFFF',
    gold:       '#C9A84C',   // Sovereign Gold — primary accent
    goldLight:  '#E8C97A',   // hover / highlight
    goldDark:   '#8A6E2F',   // shadow / depth
    charcoal:   '#1A1A1A',   // card backgrounds
    muted:      '#888888',   // secondary text
  },

  // Typography — swap font names if you load custom fonts via @remotion/google-fonts
  fonts: {
    heading:  'Georgia, serif',
    body:     'Helvetica Neue, Arial, sans-serif',
    mono:     'Courier New, monospace',
  },

  // Logo text fallback (replace with actual logo image in public/assets/)
  logoText: 'M.A.I.M.',
  tagline:  'Major AI Movement',

  // Reel dimensions — 9:16 vertical
  width:  1080,
  height: 1920,

  // Default FPS
  fps: 30,

  // Default duration per reel (30 seconds)
  durationSeconds: 30,
} as const;

// Derived
export const DURATION_FRAMES = BRAND.durationSeconds * BRAND.fps; // 900 frames

// Timing map (in frames at 30fps)
// Adjust these to shift when each section appears
export const TIMING = {
  // Intro seal: 0–2.5s
  sealIn:       0,
  sealOut:      75,

  // Letter title card: 1s–5s
  titleIn:      30,
  titleOut:     150,

  // Shot 1 (image/video): 5s–15s
  shot1In:      150,
  shot1Out:     450,

  // Voiceover captions appear with shot 1: 5.5s
  captionIn:    165,
  captionOut:   420,

  // Shot 2 (image/video): 15s–25s
  shot2In:      450,
  shot2Out:     750,

  // CTA: 25s–29s
  ctaIn:        750,
  ctaOut:       870,

  // Logo outro: 28s–30s
  outroIn:      840,
  outroOut:     900,
} as const;
