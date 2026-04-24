'use client';

import { useRef, useState } from 'react';
import styled from 'styled-components';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  autoplay?: boolean;
  controls?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
}

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: #000;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .video-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity var(--transition-base);

    &:hover {
      opacity: 1;
    }

    .play-button {
      width: 60px;
      height: 60px;
      background: #007bff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all var(--transition-base);

      &:hover {
        background: #0056b3;
        transform: scale(1.1);
      }

      svg {
        color: white;
        width: 24px;
        height: 24px;
        margin-left: 4px;
      }
    }
  }
`;

export default function VideoPlayer({
  src,
  poster,
  title = 'Video Player',
  autoplay = false,
  controls = true,
  muted = true,
  loop = false,
  className = '',
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoplay);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <VideoContainer className={className} title={title}>
      <video
        ref={videoRef}
        poster={poster}
        autoPlay={autoplay}
        controls={controls}
        muted={muted}
        loop={loop}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {!isPlaying && !autoplay && (
        <div className="video-overlay" onClick={handlePlay}>
          <div className="play-button">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </VideoContainer>
  );
}
