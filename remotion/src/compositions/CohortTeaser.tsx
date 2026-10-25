import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, continueRender, delayRender} from 'remotion';
import {maimTokens} from '../theme/tokens';

// 8-second founding-cohort teaser (Major's UX brief, 25 Oct 2026).
// Token colours only; the Academy badge is the approved file, never redrawn.
const c = maimTokens.colors;

const fontHandle = delayRender('fonts');
Promise.all([
  new FontFace('Archivo Black', `url(${staticFile('ArchivoBlack-Regular.ttf')})`).load(),
  new FontFace('Oswald', `url(${staticFile('Oswald-Variable.ttf')})`, {weight: '200 700'}).load(),
]).then((faces) => { faces.forEach((f) => document.fonts.add(f)); continueRender(fontHandle); });

const Beat: React.FC<{from: number; to: number; children: React.ReactNode}> = ({from, to, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (frame < from || frame >= to) return null;
  const enter = spring({frame: frame - from, fps, config: {damping: 14, mass: 0.7}});
  const exit = interpolate(frame, [to - 8, to], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: Math.min(enter, exit),
      transform: `translateY(${(1 - enter) * 60}px) scale(${0.92 + 0.08 * enter})`}}>
      {children}
    </AbsoluteFill>
  );
};

export const CohortTeaser: React.FC = () => {
  const frame = useCurrentFrame();
  const {width, height, fps} = useVideoConfig();
  const vertical = height > width;
  const big = vertical ? 150 : 170;
  const head: React.CSSProperties = {fontFamily: 'Archivo Black', color: c.clarityWhite, fontSize: big, lineHeight: 1, textAlign: 'center', margin: 0};
  const kick: React.CSSProperties = {fontFamily: 'Oswald', fontWeight: 500, color: c.crownGold, fontSize: vertical ? 40 : 44, letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 28px'};
  const bar = interpolate(frame, [0, 30], [0, 1], {extrapolateRight: 'clamp'});
  const glow = interpolate(frame, [0, 240], [0.18, 0.35]);
  const badgeIn = spring({frame: frame - 150, fps, config: {damping: 12}});
  const pulse = 1 + 0.03 * Math.sin((frame - 195) / 4);
  return (
    <AbsoluteFill style={{background: c.black}}>
      <AbsoluteFill style={{background: `radial-gradient(circle at 50% 55%, ${c.legacyGold}${Math.round(glow * 255).toString(16).padStart(2, '0')} 0%, ${c.black} 62%)`}} />
      {/* tri-bar signature, flat and exact */}
      <div style={{position: 'absolute', left: '50%', bottom: vertical ? 160 : 90, transform: 'translateX(-50%)', display: 'flex', gap: 14}}>
        {[c.jamaicanGreen, c.crownGold, c.championBlue].map((col, i) => (
          <div key={col} style={{width: 90 * Math.min(1, Math.max(0, bar * 3 - i)), height: 10, borderRadius: 5, background: col}} />
        ))}
      </div>
      <Beat from={0} to={60}>
        <p style={kick}>MAIM Academy</p>
        <h1 style={head}>Founding<br />cohort</h1>
      </Beat>
      <Beat from={60} to={105}>
        <h1 style={{...head, fontSize: big * 1.6, color: c.crownGold}}>20</h1>
        <p style={{...kick, margin: '18px 0 0', color: c.clarityWhite}}>spots. That's it.</p>
      </Beat>
      <Beat from={105} to={150}>
        <p style={kick}>Starts</p>
        <h1 style={head}>11 November</h1>
        <p style={{...kick, margin: '28px 0 0', color: c.smokeGray, letterSpacing: '0.08em', textTransform: 'none'}}>Four live sessions · US$249 once</p>
      </Beat>
      {frame >= 150 && frame < 195 && (
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
          <Img src={staticFile('academy-badge.png')} style={{width: vertical ? 620 : 520, opacity: badgeIn, transform: `scale(${0.7 + 0.3 * badgeIn})`}} />
        </AbsoluteFill>
      )}
      <Beat from={195} to={248}>
        <div style={{background: c.crownGold, color: c.black, fontFamily: 'Archivo Black', fontSize: vertical ? 76 : 80, padding: '34px 64px', borderRadius: 24, transform: `scale(${pulse})`}}>
          Reserve your spot
        </div>
        <p style={{...kick, margin: '36px 0 0', color: c.clarityWhite, letterSpacing: '0.04em', textTransform: 'none', fontSize: vertical ? 40 : 40}}>academy.majoraimindset.com</p>
      </Beat>
    </AbsoluteFill>
  );
};
