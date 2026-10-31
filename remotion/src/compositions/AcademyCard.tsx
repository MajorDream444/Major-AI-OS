import React, {useEffect, useState} from 'react';
import {AbsoluteFill, cancelRender, continueRender, delayRender, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {maimTokens} from '../theme/tokens';

// MAIM Academy on-screen teaching cards (Expertise episode, 30 Oct 2026).
// Rendered with alpha and laid over the footage in the right-hand zone, clear of
// the presenter, the Academy badge, the episode panel and the CTA bar.
// Token colours only. Items can arrive in sync with speech via `at` (seconds).
const c = maimTokens.colors;
const W = 464;
// Full-frame placement on a 1920x1080 canvas. AcademyCardRegion renders only the
// card's strip (five times fewer pixels); the editor lays it over at REGION_ORIGIN.
export const FULL_ORIGIN = {x: 1384, y: 150};
export const REGION_ORIGIN = {x: 1360, y: 126};

export type CardItem = {n?: string; title: string; sub?: string; at?: number};
export type AcademyCardProps = {
  kind: 'question' | 'quote' | 'steps' | 'cta';
  label: string;
  lines?: string[];          // question / quote text, one entry per line break
  items?: CardItem[];        // steps
  duration: number;          // seconds on screen
  region?: boolean;          // true: draw inside the 528x700 strip, not the full frame
};

const useFonts = () => {
  const [h] = useState(() => delayRender('Academy card fonts'));
  useEffect(() => {
    Promise.all([400, 500, 800].map((w) => new FontFace('AcademyInter', `url("${staticFile(`Inter-${w}.woff2`)}")`, {weight: String(w)}).load()))
      .then((faces) => { faces.forEach((f) => document.fonts.add(f)); continueRender(h); })
      .catch(cancelRender);
  }, [h]);
};

export const AcademyCard: React.FC<AcademyCardProps> = ({kind, label, lines = [], items = [], duration, region = false}) => {
  const X0 = region ? FULL_ORIGIN.x - REGION_ORIGIN.x : FULL_ORIGIN.x;
  const Y0 = region ? FULL_ORIGIN.y - REGION_ORIGIN.y : FULL_ORIGIN.y;
  useFonts();
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const enter = spring({frame, fps, config: {damping: 20, mass: 0.9}});
  const exit = interpolate(t, [duration - 0.35, duration], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const rule = interpolate(frame, [6, 20], [0, 44], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const rise = (delay: number) => {
    const k = spring({frame: frame - delay, fps, config: {damping: 18}});
    return {opacity: k, transform: `translateY(${(1 - k) * 12}px)`};
  };
  const big = kind === 'quote' ? 34 : 29;
  return (
    <AbsoluteFill style={{fontFamily: 'AcademyInter, Arial, sans-serif'}}>
      <div style={{position: 'absolute', left: X0, top: Y0, width: W, opacity: Math.min(enter, exit),
        transform: `translateX(${(1 - enter) * 40}px)`, background: 'rgba(24,24,27,0.90)',
        border: `2px solid ${c.borderDark}`, borderRadius: 12, padding: '22px 24px 24px',
        boxShadow: '0 18px 40px rgba(5,5,5,0.45)'}}>
        <div style={{fontSize: 20, fontWeight: 800, letterSpacing: '0.04em', color: c.crownGold}}>{label}</div>
        <div style={{height: 3, width: rule, background: c.crownGold, margin: '10px 0 18px'}} />
        {lines.map((ln, i) => (
          <div key={i} style={{fontSize: big, lineHeight: 1.28, fontWeight: kind === 'quote' ? 800 : 500,
            color: c.clarityWhite, ...rise(8 + i * 4)}}>{ln}</div>
        ))}
        {items.map((it, i) => {
          const start = it.at !== undefined ? Math.round(it.at * fps) : 8 + i * 6;
          if (frame < start) return null;
          const k = spring({frame: frame - start, fps, config: {damping: 16}});
          const isLast = items.filter((x) => (x.at !== undefined ? Math.round(x.at * fps) : 0) <= frame).length - 1 === i;
          return (
            <div key={i} style={{display: 'flex', gap: 16, alignItems: 'flex-start', marginTop: i === 0 && lines.length === 0 ? 0 : 14,
              opacity: k, transform: `translateX(${(1 - k) * 24}px)`}}>
              <div style={{flex: '0 0 36px', height: 36, borderRadius: 18, border: `2px solid ${c.crownGold}`,
                background: isLast && kind === 'steps' ? c.crownGold : 'transparent',
                color: isLast && kind === 'steps' ? c.black : c.crownGold, fontSize: 18, fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${0.6 + 0.4 * k})`}}>{it.n ?? i + 1}</div>
              <div>
                <div style={{fontSize: 26, lineHeight: 1.25, fontWeight: 500, color: c.clarityWhite}}>{it.title}</div>
                {it.sub ? <div style={{fontSize: 20, lineHeight: 1.3, color: c.smokeGray, marginTop: 2}}>{it.sub}</div> : null}
              </div>
            </div>
          );
        })}
        {kind === 'cta' ? (
          <div style={{marginTop: 18, display: 'flex', gap: 10, ...rise(30)}}>
            {[c.jamaicanGreen, c.crownGold, c.championBlue].map((col) => (
              <div key={col} style={{width: 40, height: 5, borderRadius: 2, background: col}} />
            ))}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
