'use client';

import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from '@/lib/lenis-context';
import { useLocale } from '@/lib/locale-context';

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
  transition: background 0.25s ease, border-color 0.25s ease;
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
`;

const IconWrap = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--primary) 8%, transparent);
  color: var(--primary);
  flex-shrink: 0;
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

interface ContactItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

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

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 0 1" />
    <path d="M12 10a.5.5 0 0 0 0 1" />
    <path d="M15 10a.5.5 0 0 0 0 1" />
    <path d="M9.5 13.5c.5.5 1.5 1 2.5 1s2-.5 2.5-1" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.5" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

function FloatingIcon({ icon: Icon }: { icon: React.ComponentType }) {
  return (
    <IconWrap>
      <Icon />
    </IconWrap>
  );
}

export default function FloatingContactHub({
  whatsapp = 'https://wa.me/',
  instagram = 'https://instagram.com/lumenxlabs',
  facebook = 'https://facebook.com/lumenxlabs',
  linkedin = 'https://linkedin.com/company/lumenxlabs',
  email = 'mailto:hello@lumenxlabs.com',
  scheduleAnchor = '#contact',
}: FloatingContactHubProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const { t } = useLocale();

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

  const items: ContactItem[] = [
    { id: 'whatsapp', label: 'WhatsApp', href: whatsapp, icon: <FloatingIcon icon={WhatsAppIcon} /> },
    { id: 'instagram', label: 'Instagram', href: instagram, icon: <FloatingIcon icon={InstagramIcon} /> },
    { id: 'facebook', label: 'Facebook', href: facebook, icon: <FloatingIcon icon={FacebookIcon} /> },
    { id: 'linkedin', label: 'LinkedIn', href: linkedin, icon: <FloatingIcon icon={LinkedInIcon} /> },
    { id: 'email', label: 'Email', href: email, icon: <FloatingIcon icon={EmailIcon} /> },
    { id: 'schedule', label: t('contact.schedule'), href: scheduleAnchor, icon: <FloatingIcon icon={CalendarIcon} /> },
  ];

  const handleOptionClick = (href: string) => {
    setIsOpen(false);
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
                onClick={() => handleOptionClick(item.href)}
              >
                {item.icon}
                <Label>{item.label}</Label>
              </OptionLink>
            ))}
          </MenuContainer>
        )}
      </AnimatePresence>

      <TriggerButton
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.4, ease }}
        aria-label={isOpen ? 'Close contact menu' : 'Open contact menu'}
      >
        <XIcon />
      </TriggerButton>
    </Wrapper>
  );
}
