'use client';

import React from 'react';
import styled from 'styled-components';
import { useLocale } from '@/lib/locale-context';

export const IconWrap = styled.span`
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

export function ContactIcon({ icon: Icon }: { icon: React.ComponentType }) {
  return (
    <IconWrap>
      <Icon />
    </IconWrap>
  );
}

export const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 0 1" />
    <path d="M12 10a.5.5 0 0 0 0 1" />
    <path d="M15 10a.5.5 0 0 0 0 1" />
    <path d="M9.5 13.5c.5.5 1.5 1 2.5 1s2-.5 2.5-1" />
  </svg>
);

export const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.5" />
  </svg>
);

export const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export interface ContactOption {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  isAnchor: boolean;
}

export interface ContactHrefs {
  whatsapp: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  email: string;
  scheduleAnchor: string;
}

const DEFAULT_HREFS: ContactHrefs = {
  whatsapp: 'https://wa.me/573171287426',
  instagram: 'https://instagram.com/lumenxlabs',
  facebook: 'https://facebook.com/lumenxlabs',
  linkedin: 'https://linkedin.com/company/lumenxlabs',
  email: 'mailto:hello@lumenxlabs.com',
  scheduleAnchor: '#contact',
};

export function useContactOptions(overrides?: Partial<ContactHrefs>): ContactOption[] {
  const { t } = useLocale();
  const hrefs = { ...DEFAULT_HREFS, ...overrides };

  return [
    { id: 'whatsapp', label: 'WhatsApp', href: hrefs.whatsapp, icon: <ContactIcon icon={WhatsAppIcon} />, isAnchor: false },
    { id: 'instagram', label: 'Instagram', href: hrefs.instagram, icon: <ContactIcon icon={InstagramIcon} />, isAnchor: false },
    { id: 'facebook', label: 'Facebook', href: hrefs.facebook, icon: <ContactIcon icon={FacebookIcon} />, isAnchor: false },
    { id: 'linkedin', label: 'LinkedIn', href: hrefs.linkedin, icon: <ContactIcon icon={LinkedInIcon} />, isAnchor: false },
    { id: 'email', label: 'Email', href: hrefs.email, icon: <ContactIcon icon={EmailIcon} />, isAnchor: false },
    { id: 'schedule', label: t('contact.schedule'), href: hrefs.scheduleAnchor, icon: <ContactIcon icon={CalendarIcon} />, isAnchor: true },
  ];
}
