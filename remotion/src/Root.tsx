import React from 'react';
import {Composition} from 'remotion';
import {ABCReel} from './compositions/ABCReel';
import {abcSample} from './data/abc-sample';
import {CohortTeaser} from './compositions/CohortTeaser';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="ABCReel"
        component={ABCReel}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{lesson: abcSample[0]}}
      />
      <Composition id="CohortTeaser" component={CohortTeaser} durationInFrames={240} fps={30} width={1920} height={1080} />
      <Composition id="CohortTeaserVertical" component={CohortTeaser} durationInFrames={240} fps={30} width={1080} height={1920} />
    </>
  );
};
