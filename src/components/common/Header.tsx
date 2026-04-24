'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '@/lib/theme-context';

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
`;

const LogoImage = styled.img`
  height: 50px;
  width: auto;
  transition: transform 0.2s ease;

  @media (max-width: 768px) {
    height: 40px;
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

const LinkItem = styled(Link)<{ $active?: boolean }>`
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
`;

const CTA = styled(Link)`
  font-family: var(--font-syne);
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: var(--primary);
  color: white;
  padding: 10px 24px;
  border-radius: 8px;
  border: 1px solid var(--primary);
  text-decoration: none;
  transition: all var(--transition-base);
  
  &:hover {
    background: transparent;
    color: var(--primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
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
`;

const MobileToggle = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-primary);
  z-index: 101;

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
  z-//index: 100;
`;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <NavWrapper>
      <NavContainer>
        <LogoLink href="/">
          <LogoImage 
            src="/lumenXlogo-removebg-preview.png" 
            alt="Lumen X Labs Logo" 
          />
        </LogoLink>

        <div className="flex items-center gap-16">
          <NavLinks>
            <LinkItem href="/" $active>Home</LinkItem>
            <LinkItem href="/about">About</LinkItem>
            <LinkItem href="/projects">Projects</LinkItem>
            <CTA href="/contact">Contact</CTA>
          </NavLinks>

          <ThemeToggle onClick={toggleTheme} title="Toggle Theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </ThemeToggle>
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
          <LinkItem href="/" onClick={() => setIsOpen(false)} style={{ fontSize: '2rem' }} $active>Home</LinkItem>
          <LinkItem href="/about" onClick={() => setIsOpen(false)} style={{ fontSize: '2rem' }}>About</LinkItem>
          <LinkItem href="/projects" onClick={() => setIsOpen(false)} style={{ fontSize: '2rem' }}>Projects</LinkItem>
          <CTA href="/contact" onClick={() => setIsOpen(false)} style={{ fontSize: '1.2rem' }}>Contact</CTA>
          <button 
            onClick={() => setIsOpen(false)}
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
