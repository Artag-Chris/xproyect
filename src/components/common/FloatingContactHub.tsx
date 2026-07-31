'use client';

import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from '@/lib/lenis-context';
import { useLocale } from '@/lib/locale-context';
import { useTrack } from '@/hooks/useTrack';
import { useContactOptions, type ContactOption } from './contact-options';

const Wrapper = styled(motion.div)`
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 50;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
  }
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  right: calc(100% + 16px);
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  padding: 10px 20px;
  border-radius: 12px;
  background: rgba(var(--rgb-surface), 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid color-mix(in srgb, var(--primary) 15%, transparent);
  box-shadow: var(--shadow-sm);
  font-family: var(--font-jakarta);
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
  pointer-events: none;
  letter-spacing: 0.01em;

  @media (max-width: 768px) {
    right: auto;
    left: 50%;
    top: auto;
    bottom: calc(100% + 14px);
    transform: translateX(-50%);
    padding: 8px 16px;
    font-size: 12px;
  }
`;

const PulseRing = styled.div`
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 2px solid var(--primary);
  opacity: 0;
  pointer-events: none;
  animation: pulse-ring 2.4s ease-out infinite;
  animation-delay: 1.2s;

  @keyframes pulse-ring {
    0% { transform: scale(1); opacity: 0.4; }
    60% { transform: scale(1.25); opacity: 0.1; }
    100% { transform: scale(1.4); opacity: 0; }
  }
`;

const TriggerGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const MenuContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
`;

const TriggerButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1.5px solid color-mix(in srgb, var(--primary) 25%, transparent);
  background: rgba(var(--rgb-surface), 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 123, 255, 0);
  transition: box-shadow 0.4s ease;
  color: var(--primary);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--primary) 12%, transparent) 0%,
      transparent 60%
    );
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: -5px;
    border-radius: 50%;
    border: 1.5px solid color-mix(in srgb, var(--primary) 12%, transparent);
    pointer-events: none;
  }

  &:hover {
    box-shadow: 0 6px 32px rgba(0, 0, 0, 0.08), 0 0 28px color-mix(in srgb, var(--primary) 10%, transparent);

    &::after {
      border-color: color-mix(in srgb, var(--primary) 20%, transparent);
    }
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const OptionLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px 12px 14px;
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--border) 30%, transparent);
  background: rgba(var(--rgb-surface), 0.55);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  cursor: pointer;
  text-decoration: none;
  color: var(--text-primary);
  font-family: var(--font-jakarta);
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  transition: background 0.25s ease, border-color 0.25s ease, transform 0.15s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--primary) 4%, transparent) 0%,
      transparent 50%
    );
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  &:hover {
    background: rgba(var(--rgb-surface), 0.8);
    border-color: color-mix(in srgb, var(--primary) 20%, transparent);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: scale(0.96);
  }
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.01em;
`;

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease,
    },
  },
  exit: {
    opacity: 0,
    y: 6,
    transition: {
      duration: 0.2,
      ease,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.04,
      duration: 0.4,
      ease,
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: -4,
    scale: 0.95,
    transition: {
      delay: i * 0.02,
      duration: 0.2,
      ease,
    },
  }),
};

interface FloatingContactHubProps {
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  email?: string;
  scheduleAnchor?: string;
}

const XIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function FloatingContactHub({
  whatsapp = 'https://wa.me/',
  instagram = 'https://instagram.com/lumenxlabs',
  facebook = 'https://facebook.com/lumenxlabs',
  linkedin = 'https://linkedin.com/company/lumenxlabs',
  email = 'mailto:hello@lumenxlabs.com',
  scheduleAnchor = '#contact',
}: FloatingContactHubProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 100);
    return () => clearTimeout(timer);
  }, []);
  const menuRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const { t } = useLocale();
  const track = useTrack();

  const dismissTooltip = () => {
    setShowTooltip(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const items: ContactOption[] = useContactOptions({
    whatsapp,
    instagram,
    facebook,
    linkedin,
    email,
    scheduleAnchor,
  });

  const handleOptionClick = (id: string, href: string) => {
    setIsOpen(false);
    track('contact_option_clicked', { platform: id });
    if (href.startsWith('#') && lenis) {
      lenis.scrollTo(href);
    }
  };

  return (
    <Wrapper
      ref={menuRef}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease, delay: 0.8 }}
    >
      <AnimatePresence mode="wait">
        {isOpen && (
          <MenuContainer
            key="menu"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {items.map((item, index) => (
              <OptionLink
                key={item.id}
                href={item.href}
                target={item.id !== 'schedule' ? '_blank' : undefined}
                rel="noopener noreferrer"
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={() => handleOptionClick(item.id, item.href)}
              >
                {item.icon}
                <Label>{item.label}</Label>
              </OptionLink>
            ))}
          </MenuContainer>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTooltip && (
          <Tooltip
            key="tooltip"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.5, ease, delay: 1.2 }}
          >
            {t('contact_hub.tooltip')}
          </Tooltip>
        )}
      </AnimatePresence>

      <TriggerGroup>
        {showTooltip && <PulseRing />}
        <TriggerButton
          onClick={() => {
            dismissTooltip();
            const next = !isOpen;
            setIsOpen(next);
            track('contact_hub_toggled', { action: next ? 'open' : 'close' });
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.4, ease }}
          aria-label={isOpen ? 'Close contact menu' : 'Open contact menu'}
        >
          <XIcon />
        </TriggerButton>
      </TriggerGroup>
    </Wrapper>
  );
}
