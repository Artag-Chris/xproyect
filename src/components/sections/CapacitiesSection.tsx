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
  margin-bottom: 40px;
  text-wrap: balance;

  @media (max-width: 768px) {
    font-size: clamp(20px, 5vw, 26px);
    line-height: 1.3;
    margin: 0 auto 28px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 28px;
`;

const Card = styled(motion.div)`
  padding: 28px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: var(--surface);
  box-shadow: var(--shadow-sm);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const CardTitle = styled.h3`
  font-family: var(--font-syne);
  font-size: 18px;
  margin: 0 0 8px 0;
`;

const CardDesc = styled.p`
  margin: 0;
  font-family: var(--font-jakarta);
  color: var(--text-secondary);
  line-height: 1.5;
  overflow-wrap: break-word;
`;

export default function CapacitiesSection(){
  const { t } = useLocale();

  const capabilities = [
    { title: t('capacities.items.0.title'), desc: t('capacities.items.0.desc') },
    { title: t('capacities.items.1.title'), desc: t('capacities.items.1.desc') },
    { title: t('capacities.items.2.title'), desc: t('capacities.items.2.desc') },
    { title: t('capacities.items.3.title'), desc: t('capacities.items.3.desc') },
    { title: t('capacities.items.4.title'), desc: t('capacities.items.4.desc') },
    { title: t('capacities.items.5.title'), desc: t('capacities.items.5.desc') },
  ];

  return (
    <Section id="capacities">
      <Heading>{t('capacities.heading')}</Heading>
      <Grid>
        {capabilities.map((c, idx) => (
          <Card key={idx} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <CardTitle>{c.title}</CardTitle>
            <CardDesc>{c.desc}</CardDesc>
          </Card>
        ))}
      </Grid>
    </Section>
  )
}
