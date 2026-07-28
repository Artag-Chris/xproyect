'use client';

import styled from 'styled-components';
import { useLocale } from '@/lib/locale-context';

const FooterWrapper = styled.footer`
  padding: 80px 40px 40px;
  max-width: 1280px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 48px 16px 32px;
  }
`;

const ClosingLine = styled.p`
  font-family: var(--font-syne);
  font-size: clamp(28px, 5vw, 48px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  max-width: 20ch;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    margin-bottom: 40px;
    max-width: 100%;
  }
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-top: 20px;
  border-top: 1px solid var(--border);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`;

const Brand = styled.span`
  font-family: var(--font-syne);
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
`;

const MetaRight = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;

  a {
    font-family: var(--font-jakarta);
    font-size: 13px;
    color: var(--text-tertiary);
    text-decoration: none;
    transition: color var(--transition-base);

    &:hover {
      color: var(--primary);
    }
  }
`;

const Copyright = styled.span`
  font-family: var(--font-jakarta);
  font-size: 13px;
  color: var(--text-tertiary);
`;

const BrandX = styled.span`
  color: var(--primary);
`;

export default function Footer() {
  const { t } = useLocale();

  return (
    <FooterWrapper>
      {/* Hallmark · Footer: Ft5 */}
      <ClosingLine>
        Lumen <BrandX>X</BrandX> Labs {t('footer.about_text')}
      </ClosingLine>
      <Meta>
        <Brand>
          Lumen <BrandX>X</BrandX> Labs
        </Brand>
        <MetaRight>
          <a href="mailto:hello@lumenxlabs.com.co">Contact</a>
          <Copyright>&copy; {new Date().getFullYear()} Lumen <BrandX>X</BrandX> Labs.</Copyright>
        </MetaRight>
      </Meta>
    </FooterWrapper>
  );
}
