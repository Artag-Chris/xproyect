'use client';

import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLocale } from '@/lib/locale-context';
import { useTrack } from '@/hooks/useTrack';
import { useLenis } from '@/lib/lenis-context';
import { useContactOptions, type ContactOption } from '@/components/common/contact-options';

const HeroSection = styled.section`
  position: relative;
  padding: 140px 40px 100px;

  @media (max-width: 768px) {
    padding: 100px 24px 60px;
  }
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

const BgOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 1;
`;

const HeroContent = styled.div`
  max-width: 1280px;
  width: 100%;
  padding: 0 2rem;
  text-align: left;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    text-align: center;
    padding: 0;
  }
`;

const TitleWrapper = styled.div`
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const Title = styled(motion.h1)`
  font-family: var(--font-syne);
  font-size: clamp(48px, 10vw, 96px);
  font-weight: 800;
  color: white;
  line-height: 1.1;
  letter-spacing: -0.04em;
  margin: 0;

  @media (max-width: 768px) {
    font-size: clamp(22px, 8vw, 32px);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.01em;
  }
`;

const DescriptionWrapper = styled.div`
  margin-bottom: 48px;

  @media (max-width: 768px) {
    margin-bottom: 32px;
  }
`;

const Description = styled(motion.p)`
  font-family: var(--font-jakarta);
  font-size: clamp(18px, 2vw, 24px);
  color: rgba(255, 255, 255, 0.7);
  max-width: 640px;
  line-height: 1.7;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 1.5;
    max-width: 100%;
    margin: 0 auto;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 20px;
  justify-content: flex-start;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 16px 32px;
  border-radius: 8px;
  font-family: var(--font-syne);
  font-weight: 800;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: background var(--transition-base), box-shadow var(--transition-base), transform var(--transition-base), border-color var(--transition-base);
  border: 1px solid var(--primary);

  ${(props) =>
    props.$variant === 'secondary'
      ? `
    background: transparent;
    color: white;
    border-color: rgba(255, 255, 255, 0.4);

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: white;
    }
  `
      : `
    background: var(--primary-dark);
    color: white;

    &:hover {
      background: #004494;
      box-shadow: 0 10px 30px rgba(0, 123, 255, 0.3);
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(-1px) scale(0.97);
    }
  `}

  @media (max-width: 768px) {
    padding: 14px 24px;
    font-size: 13px;
    width: 100%;
  }
`;

const ContactWrap = styled.div`
  position: relative;
`;

const Dropdown = styled(motion.div)`
  position: absolute;
  top: calc(100% + 12px);
  left: 0;
  z-index: 30;
  min-width: 280px;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid color-mix(in srgb, var(--border) 40%, transparent);
  background: rgba(var(--rgb-surface), 0.82);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    left: 0;
    right: 0;
  }
`;

const DropdownHeading = styled.p`
  margin: 0 0 12px;
  font-family: var(--font-syne);
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--text-tertiary);
`;

const DropdownOption = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px 10px 10px;
  border-radius: 12px;
  border: 1px solid transparent;
  cursor: pointer;
  text-decoration: none;
  color: var(--text-primary);
  font-family: var(--font-jakarta);
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  transition: background 0.25s ease, border-color 0.25s ease, transform 0.15s ease;

  &:hover {
    background: rgba(var(--rgb-surface), 0.6);
    border-color: color-mix(in srgb, var(--primary) 20%, transparent);
  }

  &:active {
    transform: scale(0.97);
  }
`;

const DropdownLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.01em;
`;

const ease = [0.22, 1, 0.36, 1] as const;

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.97,
    transition: { duration: 0.2, ease },
  },
};

const dropdownItemVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.3,
      ease,
    },
  }),
  exit: {
    opacity: 0,
    x: -4,
    transition: { duration: 0.15, ease },
  },
};

export default function Hero() {
  const { t } = useLocale();
  const track = useTrack();
  const lenis = useLenis();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);
  const items: ContactOption[] = useContactOptions();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) {
        setIsContactOpen(false);
      }
    };

    if (isContactOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isContactOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isContactOpen) {
        setIsContactOpen(false);
      }
    };

    if (isContactOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isContactOpen]);

  const handleOptionClick = (id: string, href: string) => {
    setIsContactOpen(false);
    track('contact_option_clicked', { platform: id, source: 'hero' });
    if (href.startsWith('#') && lenis) {
      lenis.scrollTo(href);
    }
  };

  return (
    <HeroSection id="hero">
      <HeroBg>
        <Image
          src="/1.png"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </HeroBg>
      <BgOverlay />
      <HeroContent>
        <TitleWrapper>
          <Title
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('hero.title')}
          </Title>
        </TitleWrapper>

        <DescriptionWrapper>
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('hero.description')}
          </Description>
        </DescriptionWrapper>

        <ButtonGroup
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button
            onClick={() => track('cta_clicked', { cta_text: t('hero.cta_primary'), cta_location: 'hero_primary' })}
          >
            {t('hero.cta_primary')}
          </Button>
          <ContactWrap ref={contactRef}>
            <Button
              $variant="secondary"
              aria-expanded={isContactOpen}
              aria-haspopup="menu"
              onClick={() => {
                track('cta_clicked', { cta_text: t('hero.cta_secondary'), cta_location: 'hero_secondary' });
                setIsContactOpen((prev) => !prev);
              }}
            >
              {t('hero.cta_secondary')}
            </Button>
            <AnimatePresence>
              {isContactOpen && (
                <Dropdown
                  key="contact-dropdown"
                  role="menu"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <DropdownHeading>{t('contact_hub.heading')}</DropdownHeading>
                  {items.map((item, index) => (
                    <DropdownOption
                      key={item.id}
                      role="menuitem"
                      href={item.href}
                      target={!item.isAnchor ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      custom={index}
                      variants={dropdownItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      onClick={() => handleOptionClick(item.id, item.href)}
                    >
                      {item.icon}
                      <DropdownLabel>{item.label}</DropdownLabel>
                    </DropdownOption>
                  ))}
                </Dropdown>
              )}
            </AnimatePresence>
          </ContactWrap>
        </ButtonGroup>
      </HeroContent>
    </HeroSection>
  );
}
