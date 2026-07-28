'use client';

import styled from 'styled-components';
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

const HeroSection = styled(Section)`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 60px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
`;

const PhotoPlaceholder = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-syne);
  font-size: 72px;
  font-weight: 800;
  color: white;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 180px;
    height: 180px;
    font-size: 48px;
  }
`;

const HeroContent = styled.div`
  h1 {
    font-family: var(--font-syne);
    font-size: clamp(32px, 4vw, 48px);
    font-weight: 800;
    color: var(--text-primary);
    margin-bottom: 8px;
    line-height: 1.1;
  }

  p.subtitle {
    font-family: var(--font-syne);
    font-size: clamp(16px, 1.5vw, 20px);
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 16px;
  }

  p.description {
    font-family: var(--font-jakarta);
    font-size: 18px;
    color: var(--text-secondary);
    line-height: 1.7;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;

  @media (max-width: 768px) {
    justify-content: center;
  }

  a {
    font-family: var(--font-syne);
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-secondary);
    text-decoration: none;
    padding: 8px 16px;
    border: 1px solid var(--border);
    border-radius: 8px;
  transition: border-color var(--transition-base), color var(--transition-base);

  &:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
`;

const Heading = styled(motion.h2)`
  font-family: var(--font-syne);
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 40px;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: clamp(22px, 6vw, 28px);
    margin-bottom: 24px;
  }
`;

const StoryText = styled(motion.p)`
  font-family: var(--font-jakarta);
  font-size: 17px;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 20px;
  max-width: 800px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const TeamCard = styled(motion.div)`
  padding: 40px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--surface);
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const TeamAvatar = styled.div<{ $gradient?: string }>`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${props => props.$gradient || 'linear-gradient(135deg, var(--primary), var(--primary-dark))'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-syne);
  font-size: 24px;
  font-weight: 800;
  color: white;
  flex-shrink: 0;
`;

const TeamName = styled.h3`
  font-family: var(--font-syne);
  font-size: 20px;
  font-weight: 800;
  color: var(--text-primary);
`;

const TeamRole = styled.p`
  font-family: var(--font-syne);
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--primary);
`;

const TeamBio = styled.p`
  font-family: var(--font-jakarta);
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.6;
`;

const ArtagCard = styled(motion.div)`
  padding: 60px;
  border-radius: 16px;
  background: linear-gradient(135deg, color-mix(in srgb, var(--primary) 5%, transparent), transparent);
  border: 1px solid color-mix(in srgb, var(--primary) 15%, transparent);
  text-align: center;

  @media (max-width: 768px) {
    padding: 32px 20px;
  }
`;

const ArtagButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  padding: 14px 32px;
  border-radius: 8px;
  background: var(--primary-dark);
  color: white;
  font-family: var(--font-syne);
  font-size: 13px;
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

const CTASection = styled(Section)`
  text-align: center;
`;

const CTAHeading = styled(motion.h2)`
  font-family: var(--font-syne);
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 16px;
  line-height: 1.1;
`;

const CTADesc = styled(motion.p)`
  font-family: var(--font-jakarta);
  font-size: 18px;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto 32px;
`;

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 40px;
  border-radius: 8px;
  background: var(--primary-dark);
  color: white;
  font-family: var(--font-syne);
  font-size: 14px;
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

export default function AboutPage() {
  const { t, locale } = useLocale();
  const track = useTrack();

  return (
    <>
      <HeroSection>
        <PhotoPlaceholder>
          CH
        </PhotoPlaceholder>
        <HeroContent>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('about.hero.title')}
          </motion.h1>
          <motion.p
            className="subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('about.hero.subtitle')}
          </motion.p>
          <motion.p
            className="description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('about.hero.description')}
          </motion.p>
          <SocialLinks>
            <motion.a
              href="https://linkedin.com/in/artag"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              onClick={() => track('social_link_clicked', { platform: 'linkedin', location: 'about_page' })}
            >
              LinkedIn
            </motion.a>
            <motion.a
              href="https://github.com/Artag-Chris"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              onClick={() => track('social_link_clicked', { platform: 'github', location: 'about_page' })}
            >
              GitHub
            </motion.a>
            <motion.a
              href="https://artagdev.com.co"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              onClick={() => track('social_link_clicked', { platform: 'artagdev', location: 'about_page' })}
            >
              Artag Dev
            </motion.a>
          </SocialLinks>
        </HeroContent>
      </HeroSection>

      <Section>
        <Heading
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('about.story.heading')}
        </Heading>
        <StoryText
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t('about.story.p1')}
        </StoryText>
        <StoryText
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {t('about.story.p2')}
        </StoryText>
        <StoryText
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t('about.story.p3')}
        </StoryText>
      </Section>

      <Section>
        <Heading
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('about.team.heading')}
        </Heading>
        <TeamGrid>
          <TeamCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TeamAvatar>CH</TeamAvatar>
            <TeamName>{t('about.team.founder_name')}</TeamName>
            <TeamRole>{t('about.team.founder_role')}</TeamRole>
            <TeamBio>{t('about.team.founder_bio')}</TeamBio>
          </TeamCard>
          <TeamCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <TeamAvatar $gradient="linear-gradient(135deg, #4da3ff, #b0d4ff)">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4"/>
                <path d="M20 21a8 8 0 1 0-16 0"/>
              </svg>
            </TeamAvatar>
            <TeamName>{t('about.team.designer_name')}</TeamName>
            <TeamRole>{t('about.team.designer_role')}</TeamRole>
            <TeamBio>{t('about.team.designer_bio')}</TeamBio>
          </TeamCard>
        </TeamGrid>
      </Section>

      <Section>
        <ArtagCard
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Heading style={{ marginBottom: 16 }}>
            {t('about.artag.heading')}
          </Heading>
          <StoryText style={{ margin: '0 auto 0', maxWidth: 600, textAlign: 'center' }}>
            {t('about.artag.description')}
          </StoryText>
          <ArtagButton
            href="https://artagdev.com.co"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('artag_link_clicked', { location: 'about_page' })}
          >
            {t('about.artag.button')} →
          </ArtagButton>
        </ArtagCard>
      </Section>

      <CTASection>
        <CTAHeading
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('about.cta.heading')}
        </CTAHeading>
        <CTADesc
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t('about.cta.description')}
        </CTADesc>
        <CTAButton
          href={`/${locale}/#contact`}
          onClick={() => track('cta_clicked', { cta_text: t('about.cta.button'), cta_location: 'about_page' })}
        >
          {t('about.cta.button')} →
        </CTAButton>
      </CTASection>
    </>
  );
}
