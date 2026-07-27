'use client';

import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useTheme } from '@/lib/theme-context';
import { useLocale } from '@/lib/locale-context';
import { usePathname, useRouter } from 'next/navigation';
import { useLenis } from '@/lib/lenis-context';
import { useTrack } from '@/hooks/useTrack';

const NavWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(var(--rgb-surface), 0.8);
  border-bottom: 1px solid var(--border);
  transition: background-color 0.5s ease, border-color 0.5s ease;
`;

const NavContainer = styled.nav`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 0 1.25rem;
    height: 70px;
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const LogoImage = styled.img`
  height: 110px;
  width: auto;
  aspect-ratio: 612 / 408;
  transition: transform 0.2s ease;

  @media (max-width: 768px) {
    height: 80px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const LinkItem = styled.a<{ $active?: boolean }>`
  font-family: var(--font-syne);
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${props => props.$active ? 'var(--primary)' : 'var(--text-secondary)'};
  text-decoration: none;
  transition: color var(--transition-base);
  position: relative;
  padding: 4px 0;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.$active ? '100%' : '0'};
    height: 2px;
    background: var(--primary);
    transition: width var(--transition-base);
  }

  &:hover {
    color: var(--text-primary);
    &::after {
      width: 100%;
    }
  }

  &:active {
    opacity: 0.6;
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownTrigger = styled.a`
  font-family: var(--font-syne);
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color var(--transition-base);
  position: relative;
  padding: 4px 0;
  cursor: pointer;

  &:hover {
    color: var(--text-primary);
  }

  &:active {
    opacity: 0.6;
  }
`;

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  min-width: 260px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 8px;
  box-shadow: var(--shadow-md);
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: all 0.2s ease;
  margin-top: 8px;
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 10px 16px;
  border-radius: 6px;
  font-family: var(--font-jakarta);
  font-size: 14px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.15s ease;

  &:hover {
    background: color-mix(in srgb, var(--primary) 8%, transparent);
    color: var(--primary);
  }

  &:active {
    background: color-mix(in srgb, var(--primary) 15%, transparent);
    transform: scale(0.97);
  }
`;

const CTA = styled.a`
  font-family: var(--font-syne);
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: var(--primary-dark);
  color: white;
  padding: 10px 24px;
  border-radius: 8px;
  border: 1px solid var(--primary-dark);
  text-decoration: none;
  transition: all var(--transition-base);
  cursor: pointer;

  &:hover {
    background: transparent;
    color: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
  }

  &:active {
    transform: translateY(-1px) scale(0.97);
  }
`;

const ThemeToggle = styled.button`
  background: var(--surface-secondary);
  border: 1px solid var(--border);
  color: var(--text-primary);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-base);
  margin-left: 2rem;

  &:hover {
    border-color: var(--primary);
    background: var(--surface-tertiary);
  }

  &:active {
    transform: scale(0.92);
  }
`;

const LocaleToggle = styled.button`
  background: var(--primary-dark);
  border: 1px solid var(--primary-dark);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: var(--font-syne);
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all var(--transition-base);
  margin-left: 8px;
  line-height: 1;

  &:hover {
    background: var(--primary-dark);
    border-color: var(--primary-dark);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.92);
  }
`;

const MobileToggle = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-primary);
  z-index: 101;
  transition: opacity var(--transition-base);

  &:active {
    opacity: 0.6;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: var(--background);
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(100%)')};
  z-index: 100;
`;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t, locale } = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();
  const track = useTrack();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') && lenis) {
      e.preventDefault();
      lenis.scrollTo(href);
    }
  }, [lenis]);

  return (
    <NavWrapper>
      <NavContainer>
        <LogoLink href={`/${locale}`} onClick={() => track('nav_link_clicked', { link_text: 'logo', link_href: `/${locale}`, location: 'header' })}>
           <LogoImage
            src="/lumenXlogoSVG.svg"
            alt="Lumen X Labs Logo"
            width={165}
            height={110}
          />
        </LogoLink>

        <div className="flex items-center gap-4">
          <NavLinks>
            <LinkItem href={`/${locale}`} onClick={() => { track('nav_link_clicked', { link_text: t('nav.hero'), link_href: `/${locale}`, location: 'header' }); }}>{t('nav.hero')}</LinkItem>
            <LinkItem href="#capacities" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { handleNavClick(e, '#capacities'); track('nav_link_clicked', { link_text: t('nav.capacities'), link_href: '#capacities', location: 'header' }); }}>{t('nav.capacities')}</LinkItem>
            <DropdownWrapper
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <DropdownTrigger
                onClick={(e) => { e.preventDefault(); setDropdownOpen(prev => !prev); track('nav_link_clicked', { link_text: t('nav.services'), link_href: 'dropdown', location: 'header' }); }}
                onKeyDown={(e: React.KeyboardEvent) => { if (e.key === 'Escape') setDropdownOpen(false); }}
                href="#"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                {t('nav.services')}
              </DropdownTrigger>
              <DropdownMenu $isOpen={dropdownOpen}>
                <DropdownItem href={`/${locale}/services/process-automation`} onClick={() => track('nav_link_clicked', { link_text: 'Process Automation', link_href: `/${locale}/services/process-automation`, location: 'header_dropdown' })}>{t('services.process-automation.hero.title')}</DropdownItem>
                <DropdownItem href={`/${locale}/services/ai-for-business`} onClick={() => track('nav_link_clicked', { link_text: 'AI for Business', link_href: `/${locale}/services/ai-for-business`, location: 'header_dropdown' })}>{t('services.ai-for-business.hero.title')}</DropdownItem>
                <DropdownItem href={`/${locale}/services/web-development`} onClick={() => track('nav_link_clicked', { link_text: 'Web Development', link_href: `/${locale}/services/web-development`, location: 'header_dropdown' })}>{t('services.web-development.hero.title')}</DropdownItem>
                <DropdownItem href={`/${locale}/services/digital-transformation`} onClick={() => track('nav_link_clicked', { link_text: 'Digital Transformation', link_href: `/${locale}/services/digital-transformation`, location: 'header_dropdown' })}>{t('services.digital-transformation.hero.title')}</DropdownItem>
                <DropdownItem href={`/${locale}/services/ai-colombia-business`} onClick={() => track('nav_link_clicked', { link_text: 'AI Colombia', link_href: `/${locale}/services/ai-colombia-business`, location: 'header_dropdown' })}>{t('services.ai-colombia-business.hero.title')}</DropdownItem>
              </DropdownMenu>
            </DropdownWrapper>
            <LinkItem href="#showcase" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { handleNavClick(e, '#showcase'); track('nav_link_clicked', { link_text: t('nav.cases'), link_href: '#showcase', location: 'header' }); }}>{t('nav.cases')}</LinkItem>
            <CTA href="#contact" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { handleNavClick(e, '#contact'); track('cta_clicked', { cta_text: t('nav.contact'), cta_location: 'nav_cta' }); }}>{t('nav.contact')}</CTA>
          </NavLinks>

          <div className="desktop-only flex items-center gap-2">
            <LocaleToggle
              onClick={() => {
                const newLocale = locale === 'en' ? 'es' : 'en';
                track('locale_switched', { locale_from: locale, locale_to: newLocale });
                const newPath = pathname.replace(/^\/[a-z]{2}/, `/${newLocale}`);
                router.push(newPath);
              }}
              title="Toggle language"
            >
              {locale === 'en' ? 'ES' : 'EN'}
            </LocaleToggle>

            <ThemeToggle onClick={() => { toggleTheme(); track('theme_toggled', { theme: theme === 'light' ? 'dark' : 'light' }); }} aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'} title="Toggle Theme">
              {theme === 'light' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              )}
            </ThemeToggle>
          </div>
        </div>

        <MobileToggle onClick={() => setIsOpen(!isOpen)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
        </MobileToggle>
      </NavContainer>

        <MobileMenu $isOpen={isOpen}>
          <LinkItem href={`/${locale}`} onClick={() => { closeMenu(); }} style={{ fontSize: '2rem' }}>{t('nav.hero')}</LinkItem>
          <LinkItem href="#capacities" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { handleNavClick(e, '#capacities'); closeMenu(); }} style={{ fontSize: '2rem' }}>{t('nav.capacities')}</LinkItem>
          <LinkItem href={`/${locale}/services/process-automation`} onClick={closeMenu} style={{ fontSize: '1.2rem', opacity: 0.7 }}>{t('services.process-automation.hero.title')}</LinkItem>
          <LinkItem href={`/${locale}/services/ai-for-business`} onClick={closeMenu} style={{ fontSize: '1.2rem', opacity: 0.7 }}>{t('services.ai-for-business.hero.title')}</LinkItem>
          <LinkItem href={`/${locale}/services/web-development`} onClick={closeMenu} style={{ fontSize: '1.2rem', opacity: 0.7 }}>{t('services.web-development.hero.title')}</LinkItem>
          <LinkItem href={`/${locale}/services/digital-transformation`} onClick={closeMenu} style={{ fontSize: '1.2rem', opacity: 0.7 }}>{t('services.digital-transformation.hero.title')}</LinkItem>
          <LinkItem href={`/${locale}/services/ai-colombia-business`} onClick={closeMenu} style={{ fontSize: '1.2rem', opacity: 0.7 }}>{t('services.ai-colombia-business.hero.title')}</LinkItem>
          <LinkItem href="#showcase" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { handleNavClick(e, '#showcase'); closeMenu(); }} style={{ fontSize: '2rem' }}>{t('nav.cases')}</LinkItem>
          <CTA href="#contact" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { handleNavClick(e, '#contact'); closeMenu(); }} style={{ fontSize: '1.2rem' }}>{t('nav.contact')}</CTA>

          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <LocaleToggle
              onClick={() => {
                const newLocale = locale === 'en' ? 'es' : 'en';
                const newPath = pathname.replace(/^\/[a-z]{2}/, `/${newLocale}`);
                router.push(newPath);
                closeMenu();
              }}
              title="Toggle language"
            >
              {locale === 'en' ? 'ES' : 'EN'}
            </LocaleToggle>

            <ThemeToggle onClick={() => { toggleTheme(); closeMenu(); }} aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'} title="Toggle Theme">
              {theme === 'light' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              )}
            </ThemeToggle>
          </div>

          <button
            onClick={closeMenu}
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontSize: '1.5rem'
            }}
          >
            Close
          </button>
        </MobileMenu>
    </NavWrapper>
  );
}
