'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background);
  padding: 40px 20px;
  position: relative;
  overflow: hidden;
  padding-top: 80px;

  &::before {
    content: '';
    position: absolute;
    top: 10%;
    right: -10%;
    width: 60%;
    height: 60%;
    background: radial-gradient(circle, rgba(0, 123, 255, 0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }
`;

const HeroContent = styled.div`
  max-width: 1100px;
  width: 100%;
  text-align: left;
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const TitleWrapper = styled.div`
  overflow: hidden;
  margin-bottom: 20px;
`;

const Title = styled(motion.h1)`
  font-family: var(--font-syne);
  font-size: clamp(48px, 10vw, 96px);
  font-weight: 800;
  color: var(--text-primary);
  line-height: 0.9;
  letter-spacing: -0.04em;
  margin: 0;
`;

const BrandX = styled.span`
  color: var(--primary);
`;

const DescriptionWrapper = styled.div`
  overflow: hidden;
  margin-bottom: 40px;
`;

const Description = styled(motion.p)`
  font-family: var(--font-jakarta);
  font-size: clamp(18px, 2vw, 24px);
  color: var(--text-secondary);
  max-width: 600px;
  line-height: 1.4;
  margin: 0;

  @media (max-width: 992px) {
    margin: 0 auto;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 20px;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 16px 32px;
  border-radius: 8px;
  font-family: var(--font-syne);
  font-weight: 800;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all var(--transition-base);
  border: 1px solid var(--primary);

  ${(props) =>
    props.$variant === 'secondary'
      ? `
    background: transparent;
    color: var(--text-primary);
    border-color: var(--border);

    &:hover {
      background: var(--surface-secondary);
      border-color: var(--text-primary);
    }
  `
      : `
    background: var(--primary);
    color: white;

    &:hover {
      background: var(--primary-dark);
      box-shadow: 0 10px 30px rgba(0, 123, 255, 0.3);
      transform: translateY(-2px);
    }
  `}
`;

const VisualElement = styled(motion.div)`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background: var(--surface-secondary);
  border: 1px solid var(--border);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &::after {
    content: 'LUMEN';
    position: absolute;
    font-family: var(--font-syne);
    font-weight: 800;
    font-size: 12vw;
    color: var(--border-light);
    opacity: 0.5;
    z-index: 0;
  }
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
  return (
    <HeroSection>
      <HeroContent>
        <div className="flex flex-col">
          <TitleWrapper>
            <Title
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {title.split(' ').map((word, i) => 
                word.toUpperCase().includes('X') 
                ? <span key={i}>{word.split('').map((char, ci) => char.toUpperCase() === 'X' ? <BrandX key={ci}>X</BrandX> : char)} </span> : word + ' '
              )}
            </Title>
          </TitleWrapper>
          
          <DescriptionWrapper>
            <Description
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {description}
            </Description>
          </DescriptionWrapper>

          <ButtonGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button onClick={onPrimaryClick}>{primaryButtonText}</Button>
            <Button $variant="secondary" onClick={onSecondaryClick}>
              {secondaryButtonText}
            </Button>
          </ButtonGroup>
        </div>

        <VisualElement
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative z-10 p-12 text-center">
            <div className="text-6xl mb-4">⚡</div>
            <div className="font-syne font-bold text-sm uppercase tracking-widest opacity-60">
              Interactive Lab
            </div>
          </div>
        </VisualElement>
      </HeroContent>
    </HeroSection>
  );
}
