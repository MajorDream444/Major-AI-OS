import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { BRAND } from '../brand';

/**
 * IntroSeal
 * Opens each MAIM reel with an animated circular seal.
 * Fades in, holds, then fades out.
 */
export const IntroSeal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, fps * 0.6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const scale = interpolate(frame, [0, fps * 0.8], [0.7, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.4)),
  });

  const fadeOut = interpolate(frame, [fps * 2, fps * 2.5], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BRAND.colors.black,
        opacity,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Outer ring */}
        <div
          style={{
            width: 340,
            height: 340,
            borderRadius: '50%',
            border: `4px solid ${BRAND.colors.gold}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Inner ring */}
          <div
            style={{
              width: 300,
              height: 300,
              borderRadius: '50%',
              border: `1px solid ${BRAND.colors.goldDark}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <div
              style={{
                fontFamily: BRAND.fonts.heading,
                fontSize: 64,
                fontWeight: 700,
                color: BRAND.colors.gold,
                letterSpacing: 6,
                lineHeight: 1,
              }}
            >
              {BRAND.logoText}
            </div>
            <div
              style={{
                width: 180,
                height: 1,
                backgroundColor: BRAND.colors.goldDark,
              }}
            />
            <div
              style={{
                fontFamily: BRAND.fonts.body,
                fontSize: 18,
                fontWeight: 300,
                color: BRAND.colors.muted,
                letterSpacing: 4,
                textTransform: 'uppercase',
              }}
            >
              {BRAND.tagline}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
