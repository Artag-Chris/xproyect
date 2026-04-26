"use client";

import React from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
`;

const VideoEl = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default function VideoHero({ src, poster }: { src: string; poster?: string }) {
  return (
    <VideoContainer aria-label="Video hero background">
      <VideoEl src={src} poster={poster} autoPlay muted loop playsInline />
    </VideoContainer>
  );
}
