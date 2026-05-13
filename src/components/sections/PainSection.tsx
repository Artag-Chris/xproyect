'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLocale } from '@/lib/locale-context';

const Section = styled.section`
  padding: 120px 20px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Heading = styled(motion.h2)`
  font-family: var(--font-syne);
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 24px;
  line-height: 1.1;
`;

const Text = styled(motion.p)`
  font-family: var(--font-jakarta);
  font-size: 18px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 60px;
`;

const ChaosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  width: 100%;
`;

const ChaosCard = styled(motion.div)`
  padding: 40px;
  background: var(--surface-secondary);
  border: 1px solid var(--border);
  border-radius: 12px;
  text-align: left;
  transition: all var(--transition-base);

  &:hover {
    border-color: var(--primary);
    transform: translateY(-5px);
  }

  h3 {
    font-family: var(--font-syne);
    font-size: 20px;
    margin-bottom: 12px;
    color: var(--text-primary);
  }

  p {
    font-family: var(--font-jakarta);
    font-size: 15px;
    color: var(--text-secondary);
    line-height: 1.5;
  }
`;

export default function PainSection() {
  const { t } = useLocale();

  const painPoints = [
    { title: t('pain.items.0.title'), desc: t('pain.items.0.desc') },
    { title: t('pain.items.1.title'), desc: t('pain.items.1.desc') },
    { title: t('pain.items.2.title'), desc: t('pain.items.2.desc') },
  ];

  return (
    <Section>
      <ContentWrapper>
        <Heading
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('pain.heading')}
        </Heading>
        <Text
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t('pain.subtitle')}
        </Text>
      </ContentWrapper>

      <ChaosGrid>
        {painPoints.map((point, i) => (
          <ChaosCard
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          >
            <h3>{point.title}</h3>
            <p>{point.desc}</p>
          </ChaosCard>
        ))}
      </ChaosGrid>
    </Section>
  );
}
