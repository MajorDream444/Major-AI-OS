import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import type {ABCLesson} from '../data/abc-sample';
import {maimTokens} from '../theme/tokens';

type ABCReelProps = {
  lesson: ABCLesson;
};

const t = maimTokens;

export const ABCReel: React.FC<ABCReelProps> = ({lesson}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = spring({frame, fps, config: {damping: 18, stiffness: 90}});
  const glow = interpolate(frame, [0, 90, 180, 900], [0.2, 0.55, 0.35, 0.2], {
    extrapolateRight: 'clamp',
  });
  const lessonOpacity = interpolate(frame, [165, 220], [0, 1], {extrapolateRight: 'clamp'});
  const actionOpacity = interpolate(frame, [500, 560], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 20%, rgba(216,175,85,${glow}) 0%, ${t.colors.black} 42%, ${t.colors.charcoal} 100%)`,
        color: t.colors.clarityWhite,
        fontFamily: t.fonts.body,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 46,
          border: `2px solid ${t.colors.legacyGold}`,
          borderRadius: 48,
          opacity: 0.55,
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: t.layout.safeTop,
          left: t.layout.safeX,
          right: t.layout.safeX,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          letterSpacing: 4,
          textTransform: 'uppercase',
          fontSize: 30,
          color: t.colors.smokeGray,
        }}
      >
        <span>Major AI Mindset</span>
        <span>ABC OS</span>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 275,
          left: 0,
          right: 0,
          textAlign: 'center',
          transform: `scale(${0.9 + reveal * 0.1})`,
        }}
      >
        <div
          style={{
            fontFamily: t.fonts.headline,
            fontSize: 330,
            lineHeight: 1,
            color: t.colors.crownGold,
            textShadow: '0 0 45px rgba(216,175,85,0.35)',
          }}
        >
          {lesson.letter}
        </div>
        <div
          style={{
            fontFamily: t.fonts.headline,
            fontSize: 82,
            letterSpacing: 1,
            textTransform: 'uppercase',
            color: t.colors.clarityWhite,
          }}
        >
          {lesson.word}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: t.layout.safeX,
          right: t.layout.safeX,
          top: 835,
          padding: 46,
          borderRadius: 36,
          background: 'rgba(24,24,27,0.74)',
          border: `1px solid ${t.colors.borderDark}`,
          boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
          opacity: lessonOpacity,
        }}
      >
        <div
          style={{
            fontFamily: t.fonts.headline,
            fontSize: 64,
            lineHeight: 1.08,
            color: t.colors.pureWhite,
          }}
        >
          {lesson.bigIdea}
        </div>
        <div
          style={{
            marginTop: 28,
            height: 6,
            width: 220,
            borderRadius: 999,
            background: `linear-gradient(90deg, ${t.colors.jamaicanGreen}, ${t.colors.championBlue}, ${t.colors.championOrange})`,
          }}
        />
        <div
          style={{
            marginTop: 30,
            fontSize: 41,
            lineHeight: 1.25,
            color: t.colors.clarityWhite,
          }}
        >
          {lesson.lesson}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: t.layout.safeX,
          right: t.layout.safeX,
          bottom: 250,
          opacity: actionOpacity,
        }}
      >
        <div
          style={{
            fontFamily: t.fonts.mono,
            color: t.colors.crownGold,
            fontSize: 28,
            textTransform: 'uppercase',
            letterSpacing: 3,
            marginBottom: 18,
          }}
        >
          5-minute action
        </div>
        <div
          style={{
            fontFamily: t.fonts.headline,
            fontSize: 58,
            lineHeight: 1.12,
            color: t.colors.pureWhite,
          }}
        >
          {lesson.action}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: t.layout.safeX,
          right: t.layout.safeX,
          bottom: t.layout.safeBottom,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 31,
          color: t.colors.smokeGray,
        }}
      >
        <span>{lesson.cta}</span>
        <span style={{color: t.colors.crownGold}}>Likkle by likkle.</span>
      </div>
    </AbsoluteFill>
  );
};
