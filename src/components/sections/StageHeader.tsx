'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';

interface StageHeaderProps {
  num: string;
  label: string;
  heading: string;
  description: string;
}

const HeaderGrid = styled.div`
  display: grid;
  grid-template-columns: 6rem 1fr;
  gap: 64px;
  align-items: baseline;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 4px;
    margin-bottom: 32px;
  }
`;

const StageNum = styled.div`
  font-family: var(--font-syne);
  font-size: 64px;
  font-weight: 800;
  color: var(--primary);
  opacity: 0.15;
  line-height: 0.85;
  user-select: none;

  @media (max-width: 768px) {
    font-size: 28px;
    opacity: 0.12;
  }
`;

const RightCol = styled.div``;

const StageLabel = styled.p`
  font-family: var(--font-syne);
  font-size: 12px;
  font-weight: 600;
  color: var(--text-tertiary);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

const StageHeading = styled.h2`
  font-family: var(--font-syne);
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.1;
  margin-bottom: 16px;
  text-wrap: balance;

  @media (max-width: 768px) {
    font-size: clamp(20px, 5vw, 26px);
    margin-bottom: 10px;
  }
`;

const StageDesc = styled.p`
  font-family: var(--font-jakarta);
  font-size: 17px;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 600px;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 1.5;
  }
`;

export default function StageHeader({ num, label, heading, description }: StageHeaderProps) {
  return (
    <HeaderGrid
      as={motion.div}
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
    >
      <StageNum>{num}</StageNum>
      <RightCol>
        <StageLabel>{label}</StageLabel>
        <StageHeading>{heading}</StageHeading>
        <StageDesc>{description}</StageDesc>
      </RightCol>
    </HeaderGrid>
  );
}
