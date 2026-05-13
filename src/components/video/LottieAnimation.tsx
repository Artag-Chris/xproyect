'use client';

import Lottie from 'lottie-react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

interface LottieAnimationProps {
  url: string;
  loop?: boolean;
  autoplay?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
}

const LottieContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    filter: drop-shadow(0 0 10px rgba(0, 123, 255, 0.1));
  }
`;

export default function LottieAnimation({
  url,
  loop = true,
  autoplay = true,
  width = 200,
  height = 200,
  className = '',
}: LottieAnimationProps) {
  const [animationData, setAnimationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setAnimationData(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [url]);

  if (isLoading) {
    return (
      <LottieContainer style={{ width, height }} className={className}>
        <div className="animate-pulse bg-gray-200 rounded-lg w-full h-full" />
      </LottieContainer>
    );
  }

  return (
    <LottieContainer style={{ width, height }} className={className}>
      {animationData ? (
        <Lottie animationData={animationData} loop={loop} autoplay={autoplay} />
      ) : (
        <div className="text-gray-400">Animation failed to load</div>
      )}
    </LottieContainer>
  );
}
