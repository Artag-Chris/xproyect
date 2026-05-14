'use client';

import React from 'react'
import styled from 'styled-components'
import { useLocale } from '@/lib/locale-context'

const Section = styled.section`
  padding: 120px 20px;
  max-width: 640px;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 768px) {
    padding: 80px 24px;
  }
`;

const Heading = styled.h2`
  font-family: var(--font-syne);
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 16px;
  text-wrap: balance;

  @media (max-width: 768px) {
    font-size: clamp(22px, 6vw, 28px);
    line-height: 1.15;
  }
`;

const Sub = styled.p`
  font-family: var(--font-jakarta);
  color: var(--text-secondary);
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 48px;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 36px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 480px;
  margin: 0 auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: transparent;
  font-family: var(--font-jakarta);
  font-size: 15px;
  color: var(--text-primary);
  outline: none;
  transition: border-color var(--transition-base);

  &::placeholder {
    color: var(--text-tertiary);
  }

  &:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary) 15%, transparent);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px 32px;
  border-radius: 8px;
  border: none;
  background: var(--primary);
  color: white;
  font-family: var(--font-syne);
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all var(--transition-base);

  &:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  }

  @media (min-width: 768px) {
    width: auto;
    align-self: center;
  }
`;

export default function CallSection(){
  const { t } = useLocale();
  const onSubmit = (e: React.FormEvent) => { e.preventDefault(); alert(t('call.form.alert')); };

  return (
    <Section id="contact">
      <Heading>{t('call.heading')}</Heading>
      <Sub>{t('call.subtitle')}</Sub>
      <Form onSubmit={onSubmit}>
        <Input placeholder={t('call.form.name_placeholder')} required />
        <Input placeholder={t('call.form.email_placeholder')} type="email" required />
        <Input placeholder={t('call.form.phone_placeholder')} />
        <Input placeholder={t('call.form.company_placeholder')} />
        <Button type="submit">{t('call.form.submit')}</Button>
      </Form>
    </Section>
  )
}
