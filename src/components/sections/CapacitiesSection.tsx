'use client';

import Link from 'next/link'
import styled from 'styled-components'
import { useLocale } from '@/lib/locale-context'
import StageHeader from './StageHeader'

const Section = styled.section`
  padding: 100px 40px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  width: 100%;

  @media (max-width: 992px) {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div<{ $wide?: boolean }>`
  padding: ${props => props.$wide ? '48px' : '32px'};
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
  text-align: left;
  transition: border-color var(--transition-base), box-shadow var(--transition-base);
  grid-column: ${props => props.$wide ? '1 / -1' : 'auto'};

  &:hover {
    border-color: var(--primary);
    box-shadow: var(--shadow-md);
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const CardTitle = styled.h3`
  font-family: var(--font-syne);
  font-size: 24px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

const CardDesc = styled.p`
  margin: 0;
  font-family: var(--font-jakarta);
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.6;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1.5;
  }
`;

export default function CapacitiesSection(){
  const { t, tRaw, locale } = useLocale();
  const stage = tRaw('narrative.stages.2') as Record<string, string>;

  const capabilities = [
    { title: t('capacities.items.0.title'), desc: t('capacities.items.0.desc') },
    { title: t('capacities.items.1.title'), desc: t('capacities.items.1.desc') },
    { title: t('capacities.items.2.title'), desc: t('capacities.items.2.desc') },
    { title: t('capacities.items.3.title'), desc: t('capacities.items.3.desc') },
    { title: t('capacities.items.4.title'), desc: t('capacities.items.4.desc') },
    { title: t('capacities.items.5.title'), desc: t('capacities.items.5.desc') },
  ];

  const slugs = ['process-automation', 'ai-for-business', 'digital-transformation', 'ai-colombia-business', 'web-development', 'process-automation'];

  return (
    <Section id="capacities">
      <StageHeader
        num="3.0"
        label={stage?.label ?? 'Stage 3.0'}
        heading={stage?.heading ?? 'Build'}
        description={stage?.description ?? ''}
      />
      <Grid>
        {capabilities.map((c, idx) => (
          <Link key={idx} href={`/${locale}/services/${slugs[idx]}`} style={{ textDecoration: 'none' }}>
            <Card $wide={idx === 2 || idx === 5}>
              <CardTitle>{c.title}</CardTitle>
              <CardDesc>{c.desc}</CardDesc>
            </Card>
          </Link>
        ))}
      </Grid>
    </Section>
  )
}
