import React from 'react';
import {AcademyEpisodeTitle} from './compositions/AcademyEpisodeTitle';
import {AcademyCard} from './compositions/AcademyCard';
import {Composition} from 'remotion';
import {ABCReel} from './compositions/ABCReel';
import {abcSample} from './data/abc-sample';
import {CohortTeaser} from './compositions/CohortTeaser';

export const Root: React.FC = () => {
  return (
    <>
      <Composition id="AcademyEpisodeTitle" component={AcademyEpisodeTitle} durationInFrames={150} fps={30} width={1920} height={1080} defaultProps={{title:"What lives in your head is not expertise", context:"Undocumented knowledge is risk", showBackdrop:true, mirroredSource:false}} />
      {/* Teaching cards for Academy episodes; duration comes from the duration prop (seconds). */}
      <Composition id="AcademyCard" component={AcademyCard} fps={30} width={1920} height={1080}
        durationInFrames={150} calculateMetadata={({props}) => ({durationInFrames: Math.ceil(props.duration * 30)})}
        defaultProps={{kind: 'steps', label: 'MY CONTENT WORKFLOW', duration: 5, items: [{title: 'Talk it out', sub: 'morning musings', at: 0.3}, {title: 'NotebookLM podcast', at: 1.5}, {title: 'Agents pressure-test it', at: 2.7}]} as const} />
      <Composition id="AcademyCardRegion" component={AcademyCard} fps={30} width={528} height={700}
        durationInFrames={150} calculateMetadata={({props}) => ({durationInFrames: Math.ceil(props.duration * 30)})}
        defaultProps={{kind: 'quote', label: 'THE WHOLE IDEA', duration: 5, region: true, lines: ['When you automate something,', 'you have to itemize', 'everything that you do.']} as const} />
      <Composition id="AcademyEpisodeTitle4K" component={AcademyEpisodeTitle} durationInFrames={150} fps={30} width={3840} height={2160} defaultProps={{title:"What lives in your head is not expertise", context:"Undocumented knowledge is risk", showBackdrop:true, mirroredSource:false}} />
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
