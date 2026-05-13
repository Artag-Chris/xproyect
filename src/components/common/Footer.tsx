'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { useLocale } from '@/lib/locale-context';

const FooterContainer = styled.footer`
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
  padding: 60px 20px 20px;
  margin-top: 100px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: 16px;
    font-weight: 700;
    color: var(--foreground);
    margin-bottom: 16px;
  }

  ul {
    list-style: none;

    li {
      margin-bottom: 10px;

      a {
        color: #495057;
        text-decoration: none;
        transition: color var(--transition-base);

        &:hover {
          color: #007bff;
        }
      }
    }
  }

  p {
    color: #495057;
    font-size: 14px;
    line-height: 1.6;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #e9ecef;
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }

  p {
    color: #495057;
    font-size: 14px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;

  a {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: white;
    border: 1px solid #e9ecef;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #007bff;
    text-decoration: none;
    transition: all var(--transition-base);

    &:hover {
      background: #007bff;
      color: white;
      transform: translateY(-2px);
    }
  }
`;

export default function Footer() {
  const { t } = useLocale();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <h3>{t('footer.about_title')}</h3>
            <p>
              Lumen <span style={{ color: 'var(--primary)' }}>X</span> Labs {t('footer.about_text')}
            </p>
          </FooterSection>

          <FooterSection>
            <h3>{t('footer.quick_links')}</h3>
            <ul>
              <li><Link href="/">{t('nav.home')}</Link></li>
              <li><Link href="/projects">{t('nav.projects')}</Link></li>
              <li><Link href="/about">{t('nav.about')}</Link></li>
              <li><Link href="/contact">{t('nav.contact')}</Link></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>{t('footer.services')}</h3>
            <ul>
              <li><a href="#">{t('footer.service_items.0')}</a></li>
              <li><a href="#">{t('footer.service_items.1')}</a></li>
              <li><a href="#">{t('footer.service_items.2')}</a></li>
              <li><a href="#">{t('footer.service_items.3')}</a></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>{t('footer.connect')}</h3>
            <p>{t('footer.connect_text')}</p>
            <SocialLinks>
              <a href="#" title="Twitter">𝕏</a>
              <a href="#" title="LinkedIn">in</a>
              <a href="#" title="GitHub">gh</a>
            </SocialLinks>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <p>&copy; 2024 Lumen <span style={{ color: 'var(--primary)' }}>X</span> Labs. {t('footer.copyright')}</p>
          <SocialLinks>
            <a href="#">{t('footer.privacy')}</a>
            <a href="#">{t('footer.terms')}</a>
            <a href="#">{t('footer.cookies')}</a>
          </SocialLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
}
