'use client';

import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useLocale } from '@/lib/locale-context'

const Section = styled.section`
  padding: 120px 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`;

const Heading = styled.h2`
  font-family: var(--font-syne);
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 800;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 48px;
  text-wrap: balance;

  @media (max-width: 768px) {
    font-size: clamp(20px, 5vw, 26px);
    line-height: 1.3;
    margin: 0 auto 32px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const Card = styled(motion.div)`
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: all var(--transition-base);

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-4px);
  }
`;

const Accent = styled.div<{ $color: string }>`
  height: 4px;
  background: ${(props) => props.$color};
`;

const Body = styled.div`
  padding: 28px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const CardTitle = styled.h3`
  font-family: var(--font-syne);
  font-size: 18px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 10px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const CardDesc = styled.p`
  font-family: var(--font-jakarta);
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
`;

const accentColors = ['#007bff', '#0056b3', '#4da3ff'];

export default function ProofSection() {
  const { t } = useLocale();

  const items = [
    { title: t('proof.items.0.title'), desc: t('proof.items.0.desc') },
    { title: t('proof.items.1.title'), desc: t('proof.items.1.desc') },
    { title: t('proof.items.2.title'), desc: t('proof.items.2.desc') },
  ];

  return (
    <Section id="proof">
      <Heading>{t('proof.heading')}</Heading>
      <Grid>
        {items.map((it, idx) => (
          <Card
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
          >
            <Accent $color={accentColors[idx]} />
            <Body>
              <CardTitle>{it.title}</CardTitle>
              <CardDesc>{it.desc}</CardDesc>
            </Body>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
