'use client';

import Link from 'next/link'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useLocale } from '@/lib/locale-context'
import { useTrack } from '@/hooks/useTrack'

const Section = styled.section`
  padding: 120px 40px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`;

const Heading = styled(motion.h2)`
  font-family: var(--font-syne);
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 800;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 60px;
  line-height: 1.1;
  text-wrap: balance;

  @media (max-width: 768px) {
    font-size: clamp(22px, 6vw, 28px);
    line-height: 1.3;
    margin-bottom: 28px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  width: 100%;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const Card = styled(motion.div)`
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--border);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  transition: all var(--transition-base);
  cursor: pointer;

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-4px);
  }
`;

const Thumb = styled.div<{ $gradient: string }>`
  height: 120px;
  background: ${(props) => props.$gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::after {
    content: '◆';
    font-size: 32px;
    color: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 900px) {
    height: 80px;

    &::after {
      font-size: 24px;
    }
  }
`;

const Body = styled.div`
  padding: 40px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    padding: 20px;
    gap: 12px;
  }
`;

const CardTitle = styled.h3`
  font-family: var(--font-syne);
  font-size: 24px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 4px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const CardDesc = styled.p`
  font-family: var(--font-jakarta);
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.6;
  flex: 1;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ResultBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: color-mix(in srgb, var(--primary) 8%, transparent);
  border-radius: 8px;
  font-family: var(--font-syne);
  font-size: 13px;
  font-weight: 700;
  color: var(--primary);
  letter-spacing: 0.02em;
  margin-top: auto;

  &::before {
    content: '→';
    font-size: 16px;
  }
`;

const gradients = [
  'linear-gradient(135deg, #007bff 0%, #4da3ff 100%)',
  'linear-gradient(135deg, #0056b3 0%, #007bff 100%)',
  'linear-gradient(135deg, #4da3ff 0%, #b0d4ff 100%)',
];

export default function ShowcaseSection() {
  const { t, locale } = useLocale();
  const track = useTrack();

  const items = [
    { title: t('showcase.items.0.title'), desc: t('showcase.items.0.desc'), result: t('showcase.items.0.result') },
    { title: t('showcase.items.1.title'), desc: t('showcase.items.1.desc'), result: t('showcase.items.1.result') },
    { title: t('showcase.items.2.title'), desc: t('showcase.items.2.desc'), result: t('showcase.items.2.result') },
  ];

  const slugs = ['web-development', 'process-automation', 'web-development'];

  return (
    <Section id="showcase">
      <Heading
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {t('showcase.heading')}
      </Heading>
      <Grid>
        {items.map((it, idx) => (
          <Link key={idx} href={`/${locale}/services/${slugs[idx]}`} style={{ textDecoration: 'none' }}>
            <Card
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              onClick={() => track('showcase_card_clicked', { card_title: it.title, card_index: idx })}
            >
              <Thumb $gradient={gradients[idx]} />
              <Body>
                <CardTitle>{it.title}</CardTitle>
                <CardDesc>{it.desc}</CardDesc>
                <ResultBadge>{it.result}</ResultBadge>
              </Body>
            </Card>
          </Link>
        ))}
      </Grid>
    </Section>
  );
}
