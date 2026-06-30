import React from 'react';
import { MAIMReel } from './MAIMReel';

/**
 * MAIM Reel A — "Activate"
 *
 * Theme: Activation. Waking up from the system.
 * Voiceover: "Most people are waiting for permission. You don't need it."
 *
 * ASSETS NEEDED (drop into /public/assets/):
 *   reel_a_shot1.jpg  — high contrast portrait or dark cinematic still
 *   reel_a_shot2.jpg  — hands on laptop, agent dashboard, or movement image
 *
 * VOICEOVER SCRIPT (~20s):
 *   [0–5s]  "Most people are waiting for permission."
 *   [5–10s] "They're waiting for the right time. The right sign."
 *   [10–15s] "You don't need permission to activate."
 *   [15–20s] "The movement is already in motion."
 */
export const MAIMReelA: React.FC = () => {
  return (
    <MAIMReel
      letter="A"
      headline="Activate"
      subline="The movement is in motion"
      shot1Src="reel_a_shot1.jpg"
      shot1Type="image"
      shot2Src="reel_a_shot2.jpg"
      shot2Type="image"
      captions={[
        {
          text: "Most people are waiting for permission.",
          startFrame: 165,
          endFrame: 315,
        },
        {
          text: "Waiting for the right time. The right sign.",
          startFrame: 315,
          endFrame: 435,
        },
        {
          text: "You don't need permission to activate.",
          startFrame: 450,
          endFrame: 600,
        },
        {
          text: "The movement is already in motion.",
          startFrame: 600,
          endFrame: 720,
        },
      ]}
      ctaHeadline="Ready to activate?"
      ctaText="Link in bio →"
      ctaUrl="maim.co/activate"
    />
  );
};
