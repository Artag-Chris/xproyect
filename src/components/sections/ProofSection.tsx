'use client';

import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useLocale } from '@/lib/locale-context'

const Section = styled.section`
  padding: 120px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Heading = styled.h2`
  font-family: var(--font-syne);
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 800;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 40px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
`;

const Card = styled(motion.div)`
  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: rgba(255,255,255,0.04);
`;

const Quote = styled.p`
  font-family: var(--font-jakarta);
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.6;
  margin: 0 0 8px 0;
`;

const Cred = styled.p`
  font-family: var(--font-jakarta);
  color: var(--text-primary);
  font-weight: 600;
  margin: 0;
`;

export default function ProofSection(){
  const { t } = useLocale();

  const items = [
    { name: t('proof.items.0.name'), text: t('proof.items.0.text') },
    { name: t('proof.items.1.name'), text: t('proof.items.1.text') },
    { name: t('proof.items.2.name'), text: t('proof.items.2.text') },
  ];

  return (
    <Section id="proof">
      <Heading>{t('proof.heading')}</Heading>
      <Grid>
        {items.map((it, idx) => (
          <Card key={idx} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay: idx*0.15 }}>
            <Cred>{it.name}</Cred>
            <Quote>{it.text}</Quote>
          </Card>
        ))}
      </Grid>
    </Section>
  )
}
