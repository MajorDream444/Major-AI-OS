import React from 'react';
import { AbsoluteFill } from 'remotion';
import { BRAND } from '../brand';
import { IntroSeal } from '../components/IntroSeal';
import { LetterTitle } from '../components/LetterTitle';
import { VideoShot } from '../components/VideoShot';
import { VoiceoverCaption } from '../components/VoiceoverCaption';
import { CTASlide } from '../components/CTASlide';
import { LogoOutro } from '../components/LogoOutro';
import { TIMING } from '../brand';
import type { CaptionLine } from '../components/VoiceoverCaption';

export interface MAIMReelProps {
  letter: string;
  headline: string;
  subline?: string;
  shot1Src: string;
  shot1Type: 'image' | 'video';
  shot2Src: string;
  shot2Type: 'image' | 'video';
  captions: CaptionLine[];
  ctaHeadline: string;
  ctaText: string;
  ctaUrl?: string;
}

/**
 * MAIMReel
 * The core assembly template. Feed it content props — it renders a complete reel.
 * Layer order (bottom to top):
 *   1. Black base
 *   2. Shot 1 (image/video + ken burns)
 *   3. Shot 2 (image/video + ken burns)
 *   4. Voiceover captions
 *   5. CTA slide
 *   6. Letter title (overlays shots)
 *   7. Intro seal (full screen, fades before title)
 *   8. Logo outro (full screen, closes reel)
 */
export const MAIMReel: React.FC<MAIMReelProps> = ({
  letter,
  headline,
  subline,
  shot1Src,
  shot1Type,
  shot2Src,
  shot2Type,
  captions,
  ctaHeadline,
  ctaText,
  ctaUrl,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.colors.black }}>

      {/* Shot 1 */}
      <VideoShot
        src={shot1Src}
        type={shot1Type}
        startFrame={TIMING.shot1In}
        endFrame={TIMING.shot1Out}
        kenBurns
        tintColor="rgba(0,0,0,0.35)"
      />

      {/* Shot 2 */}
      <VideoShot
        src={shot2Src}
        type={shot2Type}
        startFrame={TIMING.shot2In}
        endFrame={TIMING.shot2Out}
        kenBurns
        tintColor="rgba(0,0,0,0.3)"
      />

      {/* Voiceover captions */}
      <VoiceoverCaption lines={captions} />

      {/* CTA card */}
      <CTASlide
        headline={ctaHeadline}
        ctaText={ctaText}
        url={ctaUrl}
      />

      {/* Letter title — overlays early shots */}
      <LetterTitle
        letter={letter}
        headline={headline}
        subline={subline}
      />

      {/* Intro seal — first 2.5s */}
      <IntroSeal />

      {/* Logo outro — last 2s */}
      <LogoOutro />

    </AbsoluteFill>
  );
};
