'use client';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTrack } from '@/hooks/useTrack';

const HeroSection = styled.section`
  padding: 140px 40px 80px;
  max-width: 1280px;
  margin: 0 auto;
  position: relative;

  @media (max-width: 768px) {
    padding: 100px 24px 60px;
  }
`;

const Title = styled(motion.h1)`
  font-family: var(--font-syne);
  font-size: clamp(36px, 6vw, 64px);
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.1;
  margin-bottom: 20px;
  max-width: 900px;
`;

const Description = styled(motion.p)`
  font-family: var(--font-jakarta);
  font-size: clamp(16px, 2vw, 20px);
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 640px;
  margin-bottom: 40px;
`;

const CTAButton = styled(motion.button)`
  background: var(--primary);
  color: white;
  border: 1px solid var(--primary);
  padding: 16px 32px;
  border-radius: 8px;
  font-family: var(--font-syne);
  font-weight: 800;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: background var(--transition-base), box-shadow var(--transition-base), transform var(--transition-base);

  &:hover {
    background: var(--primary-dark);
    box-shadow: 0 10px 30px rgba(0, 123, 255, 0.3);
    transform: translateY(-2px);
  }
`;

interface Props {
  title: string;
  desc: string;
  cta: string;
}

export default function ServiceHero({ title, desc, cta }: Props) {
  const track = useTrack();

  return (
    <HeroSection>
      <Title
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </Title>
      <Description
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        {desc}
      </Description>
      <CTAButton
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => track('cta_clicked', { cta_text: cta, cta_location: 'service_hero' })}
      >
        {cta}
      </CTAButton>
    </HeroSection>
  );
}
