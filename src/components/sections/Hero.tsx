'use client';

import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 40px 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(0, 123, 255, 0.05) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  text-align: center;
  position: relative;
  z-index: 1;
  animation: slideUp 0.8s ease-out;

  h1 {
    font-size: clamp(32px, 8vw, 72px);
    font-weight: 800;
    color: #000;
    margin-bottom: 20px;
    background: linear-gradient(135deg, #000 0%, #007bff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    font-size: 18px;
    color: #495057;
    margin-bottom: 30px;
    line-height: 1.6;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all var(--transition-base);
  border: none;
  text-decoration: none;

  ${(props) =>
    props.variant === 'secondary'
      ? `
    background: white;
    color: #007bff;
    border: 2px solid #007bff;

    &:hover {
      background: #f8f9fa;
      transform: translateY(-2px);
    }
  `
      : `
    background: #007bff;
    color: white;

    &:hover {
      background: #0056b3;
      box-shadow: 0 10px 25px rgba(0, 123, 255, 0.3);
      transform: translateY(-2px);
    }
  `}
`;

interface HeroProps {
  title: string;
  description: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export default function Hero({
  title,
  description,
  primaryButtonText = 'Get Started',
  secondaryButtonText = 'Learn More',
  onPrimaryClick,
  onSecondaryClick,
}: HeroProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <HeroSection ref={ref}>
      <HeroContent>
        <h1>{title}</h1>
        <p>{description}</p>
        <ButtonGroup>
          <Button onClick={onPrimaryClick}>{primaryButtonText}</Button>
          <Button variant="secondary" onClick={onSecondaryClick}>
            {secondaryButtonText}
          </Button>
        </ButtonGroup>
      </HeroContent>
    </HeroSection>
  );
}
