'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLocale } from '@/lib/locale-context';

const Section = styled.section`
  padding: 120px 40px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`;

const Heading = styled(motion.h2)`
  font-family: var(--font-syne);
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 60px;
  line-height: 1.1;
  text-wrap: balance;

  @media (max-width: 768px) {
    font-size: clamp(22px, 6vw, 28px);
    line-height: 1.3;
    margin-bottom: 28px;
  }
`;

const MethodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  width: 100%;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const MethodStep = styled.div`
  position: relative;
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

  .step-number {
    font-family: var(--font-syne);
    font-size: 64px;
    font-weight: 800;
    color: var(--primary);
    opacity: 0.15;
    position: absolute;
    top: 20px;
    right: 30px;
    line-height: 1;
    pointer-events: none;
    user-select: none;
  }

  h3 {
    font-family: var(--font-syne);
    font-size: 24px;
    font-weight: 800;
    color: var(--text-primary);
    margin-bottom: 16px;
    position: relative;
    z-index: 1;
  }

  p {
    font-family: var(--font-jakarta);
    font-size: 16px;
    color: var(--text-secondary);
    line-height: 1.6;
    position: relative;
    z-index: 1;
    overflow-wrap: break-word;
  }

  @media (max-width: 768px) {
    padding: 20px;

    .step-number {
      font-size: 28px;
      opacity: 0.12;
      top: 8px;
      right: 12px;
    }

    h3 {
      font-size: 18px;
      margin-bottom: 10px;
      padding-right: 32px;
    }

    p {
      font-size: 14px;
      line-height: 1.5;
    }
  }
`;

export default function MethodSection() {
  const { t } = useLocale();

  const steps = [
    { title: t('method.steps.0.title'), desc: t('method.steps.0.desc') },
    { title: t('method.steps.1.title'), desc: t('method.steps.1.desc') },
    { title: t('method.steps.2.title'), desc: t('method.steps.2.desc') },
  ];

  return (
    <Section id="method">
      <Heading
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {t('method.heading')}
      </Heading>

      <MethodGrid>
        {steps.map((step, i) => (
          <MethodStep key={i}>
            <div className="step-number">0{i + 1}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </MethodStep>
        ))}
      </MethodGrid>
    </Section>
  );
}
