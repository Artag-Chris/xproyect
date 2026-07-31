'use client';

import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '@/lib/locale-context';
import { useLenis } from '@/lib/lenis-context';
import { useTrack } from '@/hooks/useTrack';
import { useContactOptions, type ContactOption } from './contact-options';

const Wrap = styled.div`
  position: relative;
  display: inline-block;
`;

const Dropdown = styled(motion.div)<{ $align: 'left' | 'center' }>`
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

  ${(props) =>
    props.$align === 'center' &&
    `
    left: 50%;
    transform: translateX(-50%);
  `}

  @media (max-width: 768px) {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    width: min(280px, calc(100vw - 48px));
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

interface ContactDropdownProps {
  source: string;
  align?: 'left' | 'center';
  trigger: (props: { isOpen: boolean; toggle: () => void }) => React.ReactNode;
}

export default function ContactDropdown({ source, align = 'left', trigger }: ContactDropdownProps) {
  const { t } = useLocale();
  const track = useTrack();
  const lenis = useLenis();
  const [isOpen, setIsOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const items: ContactOption[] = useContactOptions();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
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

  const handleOptionClick = (id: string, href: string) => {
    setIsOpen(false);
    track('contact_option_clicked', { platform: id, source });
    if (href.startsWith('#') && lenis) {
      lenis.scrollTo(href);
    }
  };

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <Wrap ref={wrapRef}>
      {trigger({ isOpen, toggle })}
      <AnimatePresence>
        {isOpen && (
          <Dropdown
            key="contact-dropdown"
            role="menu"
            $align={align}
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
    </Wrap>
  );
}
