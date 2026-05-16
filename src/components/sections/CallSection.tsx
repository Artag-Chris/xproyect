'use client';

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
    width: 100vw;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
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

const Form = styled(motion.form)`
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
  transition: all var(--transition-base);

  &::placeholder {
    color: var(--text-tertiary);
  }

  &:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 12%, transparent);
    background: var(--surface);
  }

  @media (max-width: 768px) {
    padding: 14px 16px;
  }
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
  transition: all var(--transition-base);
  letter-spacing: 0.02em;

  &:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 123, 255, 0.3);
  }

  @media (min-width: 768px) {
    width: auto;
    align-self: center;
    padding: 16px 48px;
  }
`;

const TrustLine = styled(motion.p)`
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

export default function CallSection(){
  const { t } = useLocale();
  const track = useTrack();
  const onSubmit = (e: React.FormEvent) => { e.preventDefault(); track('form_submitted', { form_type: 'contact' }); alert(t('call.form.alert')); };

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
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {t('call.heading')}
      </Heading>

      <Sub
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {t('call.subtitle')}
      </Sub>

      <Form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Input placeholder={t('call.form.name_placeholder')} required />
        <Input placeholder={t('call.form.email_placeholder')} type="email" required />
        <Input placeholder={t('call.form.phone_placeholder')} />
        <Input placeholder={t('call.form.company_placeholder')} />
        <FullRow>
          <Button type="submit">{t('call.form.submit')}</Button>
        </FullRow>
      </Form>

      <TrustLine
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {t('call.trust')}
      </TrustLine>
    </Section>
  )
}
