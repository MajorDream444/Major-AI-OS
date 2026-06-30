import React from 'react';
import {Composition} from 'remotion';
import {ABCReel} from './compositions/ABCReel';
import {abcSample} from './data/abc-sample';

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
    </>
  );
};
