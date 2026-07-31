'use client';
import styled from 'styled-components';
import { useTrack } from '@/hooks/useTrack';
import ContactDropdown from '@/components/common/ContactDropdown';

const Section = styled.section`
  padding: 80px 40px 120px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 60px 24px;
  }
`;

const Title = styled.h2`
  font-family: var(--font-syne);
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 32px;
`;

const CTAButton = styled.button`
  background: var(--primary);
  color: white;
  border: 1px solid var(--primary);
  padding: 16px 32px;
  border-radius: 8px;
  font-family: var(--font-syne);
  font-weight: 800;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: background var(--transition-base), box-shadow var(--transition-base), transform var(--transition-base);

  &:hover {
    background: var(--primary-dark);
    box-shadow: 0 10px 30px rgba(0, 123, 255, 0.3);
    transform: translateY(-2px);
  }
`;

interface Props {
  title: string;
  button: string;
}

export default function ServiceCTA({ title, button }: Props) {
  const track = useTrack();

  return (
    <Section>
      <Title>{title}</Title>
      <ContactDropdown
        source="service_cta"
        align="center"
        trigger={({ isOpen, toggle }) => (
          <CTAButton
            aria-expanded={isOpen}
            aria-haspopup="menu"
            onClick={() => {
              track('cta_clicked', { cta_text: button, cta_location: 'service_cta' });
              toggle();
            }}
          >
            {button}
          </CTAButton>
        )}
      />
    </Section>
  );
}
