'use client';

import styled from 'styled-components';
import { useLocale } from '@/lib/locale-context';

const FooterContainer = styled.footer`
  background: var(--surface);
  border-top: 1px solid var(--border);
  padding: 60px 40px 20px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-family: var(--font-syne);
    font-size: 14px;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 16px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  ul {
    list-style: none;

    li {
      margin-bottom: 10px;

      a {
        font-family: var(--font-jakarta);
        color: var(--text-secondary);
        text-decoration: none;
        font-size: 14px;
        transition: color var(--transition-base);

        &:hover {
          color: var(--primary);
        }
      }
    }
  }

  p {
    font-family: var(--font-jakarta);
    color: var(--text-secondary);
    font-size: 14px;
    line-height: 1.6;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;

  a {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--surface-secondary);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
    font-family: var(--font-jakarta);
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    transition: all var(--transition-base);

    &:hover {
      background: var(--primary);
      color: white;
      border-color: var(--primary);
      transform: translateY(-2px);
    }
  }
`;

const BrandX = styled.span`
  color: var(--primary);
`;

const FooterBottom = styled.div`
  border-top: 1px solid var(--border);
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  font-family: var(--font-jakarta);
  color: var(--text-tertiary);
  font-size: 13px;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 20px;

  a {
    font-family: var(--font-jakarta);
    color: var(--text-tertiary);
    text-decoration: none;
    font-size: 13px;
    transition: color var(--transition-base);

    &:hover {
      color: var(--primary);
    }
  }
`;

export default function Footer() {
  const { t, tRaw, locale } = useLocale();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <h3>{t('footer.about_title')}</h3>
            <p>
              Lumen <BrandX>X</BrandX> Labs {t('footer.about_text')}
            </p>
          </FooterSection>

          <FooterSection>
            <h3>{t('footer.quick_links')}</h3>
            <ul>
              <li><a href={`/${locale}`}>{t('nav.hero')}</a></li>
              <li><a href="#capacities">{t('nav.services')}</a></li>
              <li><a href="#showcase">{t('nav.cases')}</a></li>
              <li><a href="#contact">{t('nav.contact')}</a></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>{t('footer.services')}</h3>
            <ul>
              {(tRaw('footer.service_links') as Array<{ title: string; slug: string }>).map((s, i) => (
                <li key={i}>
                  <a href={`/${locale}/services/${s.slug}`}>{s.title}</a>
                </li>
              ))}
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>{t('footer.connect')}</h3>
            <p>{t('footer.connect_text')}</p>
            <SocialIcons>
              <a href="#" title="Twitter / X">X</a>
              <a href="#" title="LinkedIn">in</a>
              <a href="#" title="GitHub">GH</a>
            </SocialIcons>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <Copyright>&copy; 2024 Lumen <BrandX>X</BrandX> Labs. {t('footer.copyright')}</Copyright>
          <LegalLinks>
            <a href="#">{t('footer.privacy')}</a>
            <a href="#">{t('footer.terms')}</a>
            <a href="#">{t('footer.cookies')}</a>
          </LegalLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
}
