'use client';

import styled from 'styled-components';
import { useLocale } from '@/lib/locale-context';
import StageHeader from './StageHeader';

const Section = styled.section`
  padding: 120px 40px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  width: 100%;
`;

const Card = styled.div`
  padding: 40px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  text-align: left;
  box-shadow: var(--shadow-sm);
  transition: border-color var(--transition-base), box-shadow var(--transition-base);

  &:hover {
    border-color: var(--primary);
    box-shadow: var(--shadow-md);
  }

  h3 {
    font-family: var(--font-syne);
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 16px;
    color: var(--text-primary);
  }

  p {
    font-family: var(--font-jakarta);
    font-size: 16px;
    color: var(--text-secondary);
    line-height: 1.6;
    overflow-wrap: break-word;
  }

  @media (max-width: 768px) {
    padding: 24px;

    h3 {
      font-size: 18px;
      margin-bottom: 10px;
    }

    p {
      font-size: 14px;
      line-height: 1.5;
    }
  }
`;

export default function PainSection() {
  const { t, tRaw } = useLocale();
  const stage = tRaw('narrative.stages.0') as Record<string, string>;

  const painPoints = [
    { title: t('pain.items.0.title'), desc: t('pain.items.0.desc') },
    { title: t('pain.items.1.title'), desc: t('pain.items.1.desc') },
    { title: t('pain.items.2.title'), desc: t('pain.items.2.desc') },
  ];

  return (
    <Section id="pain">
      <StageHeader
        num="1.0"
        label={stage?.label ?? 'Stage 1.0'}
        heading={stage?.heading ?? 'Diagnose'}
        description={stage?.description ?? ''}
      />
      <Grid>
        {painPoints.map((point, i) => (
          <Card key={i}>
            <h3>{point.title}</h3>
            <p>{point.desc}</p>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
