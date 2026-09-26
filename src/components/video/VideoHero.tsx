'use client';

import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface VideoHeroProps {
  src: string;
}

const VideoEl = styled.video<{ $visible: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transition: opacity 700ms ease;
`;

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void) => number;
  cancelIdleCallback?: (handle: number) => void;
};

function canPlayVideo(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;

  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (connection?.saveData) return false;
  if (connection?.effectiveType && /(^|-)2g$/.test(connection.effectiveType)) return false;

  return true;
}

export default function VideoHero({ src }: VideoHeroProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!canPlayVideo()) return;

    const idleWindow = window as IdleWindow;
    const handle = idleWindow.requestIdleCallback
      ? idleWindow.requestIdleCallback(() => setMounted(true))
      : window.setTimeout(() => setMounted(true), 200);

    return () => {
      if (idleWindow.cancelIdleCallback) idleWindow.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!mounted || !video) return;

    const start = () => {
      video.play().catch(() => {});
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) start();
    video.addEventListener('canplay', start, { once: true });
    return () => video.removeEventListener('canplay', start);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <VideoEl
      ref={videoRef}
      src={src}
      $visible={visible}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      disablePictureInPicture
      onCanPlay={() => setVisible(true)}
    />
  );
}
