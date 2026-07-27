'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLocale } from '@/lib/locale-context';
import { useTrack } from '@/hooks/useTrack';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 40px 60px;
  position: relative;
  overflow: hidden;
  padding-top: 80px;

  @media (max-width: 768px) {
    padding: 80px 24px 60px;
    min-height: 90vh;
  }
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

const BgOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 1;
`;

const HeroContent = styled.div`
  max-width: 1280px;
  width: 100%;
  padding: 0 2rem;
  text-align: left;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    text-align: center;
    padding: 0;
  }
`;

const TitleWrapper = styled.div`
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const Title = styled(motion.h1)`
  font-family: var(--font-syne);
  font-size: clamp(48px, 10vw, 96px);
  font-weight: 800;
  color: white;
  line-height: 1.1;
  letter-spacing: -0.04em;
  margin: 0;

  @media (max-width: 768px) {
    font-size: clamp(22px, 8vw, 32px);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.01em;
  }
`;

const DescriptionWrapper = styled.div`
  margin-bottom: 48px;

  @media (max-width: 768px) {
    margin-bottom: 32px;
  }
`;

const Description = styled(motion.p)`
  font-family: var(--font-jakarta);
  font-size: clamp(18px, 2vw, 24px);
  color: rgba(255, 255, 255, 0.7);
  max-width: 640px;
  line-height: 1.7;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 1.5;
    max-width: 100%;
    margin: 0 auto;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 20px;
  justify-content: flex-start;
  flex-wrap: wrap;

  @media (max-width: 768px) {
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
    color: white;
    border-color: rgba(255, 255, 255, 0.4);

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: white;
    }
  `
      : `
    background: var(--primary-dark);
    color: white;

    &:hover {
      background: #004494;
      box-shadow: 0 10px 30px rgba(0, 123, 255, 0.3);
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(-1px) scale(0.97);
    }
  `}

  @media (max-width: 768px) {
    padding: 14px 24px;
    font-size: 13px;
    width: 100%;
  }
`;

export default function Hero() {
  const { t } = useLocale();
  const track = useTrack();

  return (
    <HeroSection id="hero">
      <HeroBg>
        <Image
          src="/1.png"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </HeroBg>
      <BgOverlay />
      <HeroContent>
        <TitleWrapper>
          <Title
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('hero.title')}
          </Title>
        </TitleWrapper>

        <DescriptionWrapper>
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('hero.description')}
          </Description>
        </DescriptionWrapper>

        <ButtonGroup
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button
            onClick={() => track('cta_clicked', { cta_text: t('hero.cta_primary'), cta_location: 'hero_primary' })}
          >
            {t('hero.cta_primary')}
          </Button>
          <Button
            $variant="secondary"
            onClick={() => track('cta_clicked', { cta_text: t('hero.cta_secondary'), cta_location: 'hero_secondary' })}
          >
            {t('hero.cta_secondary')}
          </Button>
        </ButtonGroup>
      </HeroContent>
    </HeroSection>
  );
}
