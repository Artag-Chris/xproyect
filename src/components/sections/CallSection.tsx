'use client';

import { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useLocale } from '@/lib/locale-context'
import { useTrack } from '@/hooks/useTrack'

const Section = styled.section`
  padding: 120px 40px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  overflow: hidden;

  background-image: radial-gradient(circle, var(--border) 1px, transparent 1px);
  background-size: 40px 40px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 800px 500px at 50% 40%, color-mix(in srgb, var(--primary) 6%, transparent), transparent 70%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 80px 24px;
    background-size: 28px 28px;

    &::before {
      display: none;
    }
  }
`;

const Accent = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-bottom: 28px;

  &::before, &::after {
    content: '';
    height: 2px;
    width: 80px;
    background: var(--primary);
    opacity: 0.2;
  }
`;

const AccentX = styled.span`
  color: var(--primary);
  font-family: var(--font-syne);
  font-size: 24px;
  font-weight: 800;
  opacity: 0.6;
  letter-spacing: 0.05em;
`;

const Heading = styled(motion.h2)`
  font-family: var(--font-syne);
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 16px;
  line-height: 1.1;
  text-wrap: balance;

  @media (max-width: 768px) {
    font-size: clamp(22px, 6vw, 28px);
    line-height: 1.15;
  }
`;

const Sub = styled(motion.p)`
  font-family: var(--font-jakarta);
  color: var(--text-secondary);
  font-size: clamp(16px, 1.4vw, 18px);
  line-height: 1.7;
  margin-bottom: 48px;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 36px;
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  max-width: 720px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
    max-width: 100%;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 18px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--primary) 3%, var(--surface));
  font-family: var(--font-jakarta);
  font-size: 15px;
  color: var(--text-primary);
  outline: none;
  transition: border-color var(--transition-base), box-shadow var(--transition-base), background var(--transition-base);

  &::placeholder {
    color: var(--text-tertiary);
  }

  &:focus {
    border-color: var(--primary);
    box-shadow: var(--focus-ring);
    background: var(--surface);
  }

  @media (max-width: 768px) {
    padding: 14px 16px;
  }
`;

const Label = styled.label`
  display: block;
  font-family: var(--font-jakarta);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 6px;
  text-align: left;
`;

const FullRow = styled.div`
  grid-column: 1 / -1;
  margin-top: 12px;

  @media (max-width: 768px) {
    margin-top: 8px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 16px 40px;
  border-radius: 8px;
  border: none;
  background: var(--primary);
  color: white;
  font-family: var(--font-syne);
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  transition: background var(--transition-base), transform var(--transition-base), box-shadow var(--transition-base);
  letter-spacing: 0.02em;

  &:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 123, 255, 0.3);
  }

  &:active {
    transform: translateY(-1px) scale(0.97);
  }

  @media (min-width: 768px) {
    width: auto;
    align-self: center;
    padding: 16px 48px;
  }
`;

const TrustLine = styled.p`
  font-family: var(--font-jakarta);
  font-size: 13px;
  color: var(--text-tertiary);
  margin-top: 20px;
  letter-spacing: 0.04em;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const NarrativeLink = styled(motion.a)`
  display: inline-block;
  margin-top: 48px;
  font-family: var(--font-syne);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-tertiary);
  text-decoration: none;
  letter-spacing: 0.06em;
  position: relative;
  z-index: 1;
  transition: color var(--transition-base);

  &:hover {
    color: var(--primary);
  }

  @media (max-width: 768px) {
    margin-top: 36px;
    font-size: 12px;
  }
`;

const ResetButton = styled.button`
  margin: 0 auto;
  padding: 12px 32px;
  border-radius: 8px;
  border: 1px solid var(--primary);
  background: transparent;
  color: var(--primary);
  font-family: var(--font-syne);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background var(--transition-base), color var(--transition-base), transform var(--transition-base);
  display: block;

  &:hover {
    background: var(--primary);
    color: white;
  }

  &:active {
    transform: scale(0.97);
  }
`;

export default function CallSection(){
  const { t } = useLocale();
  const track = useTrack();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '' });

  const onSubmit = (e: React.FormEvent) => { 
    e.preventDefault(); 
    track('form_submitted', { form_type: 'contact' }); 
    try {
      const existing = JSON.parse(localStorage.getItem('lumen_contacts') || '[]');
      existing.push({ ...formData, timestamp: new Date().toISOString() });
      localStorage.setItem('lumen_contacts', JSON.stringify(existing));
    } catch {}
    setSubmitted(true);
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  if (submitted) {
    return (
      <Section id="contact">
        <Heading>
          {t('call.form.thank_you')}
        </Heading>
        <Sub>
          {t('call.form.thank_you_desc')}
        </Sub>
        <ResetButton onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', company: '' }); }}>
          {t('call.form.submit_another')}
        </ResetButton>
        <NarrativeLink
          as="a"
          href="#pain"
        >
          {t('narrative.cta')} →
        </NarrativeLink>
      </Section>
    );
  }

  return (
    <Section id="contact">
      <Accent
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <AccentX>X</AccentX>
      </Accent>

      <Heading
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {t('call.heading')}
      </Heading>

      <Sub
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {t('call.subtitle')}
      </Sub>

      <Form onSubmit={onSubmit}>
        <div>
          <Label htmlFor="call-name">{t('call.form.name_label')}</Label>
          <Input id="call-name" value={formData.name} onChange={handleChange('name')} placeholder={t('call.form.name_placeholder')} required />
        </div>
        <div>
          <Label htmlFor="call-email">{t('call.form.email_label')}</Label>
          <Input id="call-email" value={formData.email} onChange={handleChange('email')} placeholder={t('call.form.email_placeholder')} type="email" required />
        </div>
        <div>
          <Label htmlFor="call-phone">{t('call.form.phone_label')}</Label>
          <Input id="call-phone" value={formData.phone} onChange={handleChange('phone')} placeholder={t('call.form.phone_placeholder')} />
        </div>
        <div>
          <Label htmlFor="call-company">{t('call.form.company_label')}</Label>
          <Input id="call-company" value={formData.company} onChange={handleChange('company')} placeholder={t('call.form.company_placeholder')} />
        </div>
        <FullRow>
          <Button type="submit">{t('call.form.submit')}</Button>
        </FullRow>
      </Form>

      <TrustLine>
        {t('call.trust')}
      </TrustLine>

      <NarrativeLink
        href="#pain"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {t('narrative.cta')} →
      </NarrativeLink>
    </Section>
  )
}
