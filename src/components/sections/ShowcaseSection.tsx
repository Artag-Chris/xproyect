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
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
`;

const Card = styled(motion.div)`
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border);
  background: rgba(255,255,255,0.04);
  display: flex;
  flex-direction: column;
`;

const Thumb = styled.div`
  height: 140px;
  background: linear-gradient(135deg, #8ec5ff 0%, #e0aaff 100%);
`;

const Caption = styled.div`
  padding: 12px 14px;
  font-family: var(--font-jakarta);
  color: var(--text-secondary);
`;

export default function ShowcaseSection(){
  const { t } = useLocale();

  const items = [
    { title: t('showcase.items.0.title'), desc: t('showcase.items.0.desc') },
    { title: t('showcase.items.1.title'), desc: t('showcase.items.1.desc') },
    { title: t('showcase.items.2.title'), desc: t('showcase.items.2.desc') },
    { title: t('showcase.items.3.title'), desc: t('showcase.items.3.desc') },
    { title: t('showcase.items.4.title'), desc: t('showcase.items.4.desc') },
    { title: t('showcase.items.5.title'), desc: t('showcase.items.5.desc') },
  ];

  return (
    <Section id="showcase">
      <Heading>{t('showcase.heading')}</Heading>
      <Grid>
        {items.map((it, idx) => (
          <Card key={idx} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay: idx*0.05 }}>
            <Thumb />
            <Caption>
              <strong>{it.title}</strong>
              <div style={{ fontSize:12 }}>{it.desc}</div>
            </Caption>
          </Card>
        ))}
      </Grid>
    </Section>
  )
}
