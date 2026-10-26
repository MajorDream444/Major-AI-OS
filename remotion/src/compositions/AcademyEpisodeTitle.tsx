import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, delayRender, continueRender, cancelRender} from 'remotion';

export type AcademyTitleProps = {title: string; context: string; showBackdrop: boolean; mirroredSource: boolean};
/** Always composite after the recording has been normalized to readable orientation. */
export const AcademyEpisodeTitle: React.FC<AcademyTitleProps> = ({title, context, showBackdrop, mirroredSource}) => {
  const [fontHandle]=useState(()=>delayRender('Load Academy title font'));
  useEffect(()=>{
    const font=new FontFace('AcademyInter', `url("${staticFile('AcademyInter.ttf')}")`);
    font.load().then(loaded=>{document.fonts.add(loaded);continueRender(fontHandle);}).catch(cancelRender);
  },[fontHandle]);
  const frame=useCurrentFrame();
  const {width,fps}=useVideoConfig();
  const scale=width/1920;
  if (title.length>100 || context.length>70) throw new Error('Shorten panel copy: title <=100, context <=70 characters.');
  return <AbsoluteFill style={{backgroundColor:showBackdrop?'#050505':'transparent'}}>
    {showBackdrop ? <Img src={staticFile('academy-master.png')} style={{width:'100%',height:'100%',transform:mirroredSource?'scaleX(-1)':undefined}}/> : null}
    <div style={{position:'absolute',left:90*scale,top:838*scale,width:394*scale,height:104*scale,overflow:'hidden',fontFamily:'AcademyInter, Arial, sans-serif',color:'#F7F4EA',opacity:interpolate(frame,[0,.4*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),transform:`translateY(${interpolate(frame,[0,.4*fps],[8*scale,0],{extrapolateRight:'clamp'})}px)`}}>
      <div style={{fontSize:(title.length>65?21:23)*scale,lineHeight:1.25,fontWeight:500}}>{title}</div>
      <div style={{fontSize:17*scale,lineHeight:1.2,color:'#A8A8A8',marginTop:6*scale}}>{context}</div>
    </div>

  </AbsoluteFill>;
};
