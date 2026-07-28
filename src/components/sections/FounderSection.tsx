'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale } from '@/lib/locale-context';
import { useTrack } from '@/hooks/useTrack';

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
  grid-template-columns: 300px 1fr;
  gap: 60px;
  align-items: center;
  padding: 60px;
  border-radius: 16px;
  background: var(--surface);
  border: 1px solid var(--border);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 32px 20px;
    text-align: center;
  }
`;

const PhotoWrap = styled.div`
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-syne);
  font-size: 56px;
  font-weight: 800;
  color: white;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 140px;
    height: 140px;
    font-size: 36px;
  }
`;

const Content = styled.div`
  h3 {
    font-family: var(--font-syne);
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--primary);
    margin-bottom: 8px;
  }

  h2 {
    font-family: var(--font-syne);
    font-size: clamp(24px, 3vw, 36px);
    font-weight: 800;
    color: var(--text-primary);
    margin-bottom: 16px;
    line-height: 1.1;
  }

  p {
    font-family: var(--font-jakarta);
    font-size: 16px;
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: 24px;
    max-width: 600px;

    @media (max-width: 768px) {
      margin: 0 auto 24px;
    }
  }
`;

const AboutLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 8px;
  background: var(--primary-dark);
  color: white;
  font-family: var(--font-syne);
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  text-decoration: none;
  transition: background var(--transition-base), transform var(--transition-base);

  &:hover {
    background: var(--primary);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(-1px) scale(0.97);
  }
`;

export default function FounderSection() {
  const { t, locale } = useLocale();
  const track = useTrack();

  return (
    <Section>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
      >
        <Grid>
          <PhotoWrap>
            CH
          </PhotoWrap>
          <Content>
            <h3>{t('about.team.founder_role')}</h3>
            <h2>{t('about.team.founder_name')}</h2>
            <p>{t('about.story.p2')}</p>
            <AboutLink
              href={`/${locale}/about`}
              onClick={() => track('cta_clicked', { cta_text: 'About us', cta_location: 'founder_section' })}
            >
              {t('nav.about')} →
            </AboutLink>
          </Content>
        </Grid>
      </motion.div>
    </Section>
  );
}
