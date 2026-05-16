'use client';

import { useState } from 'react';
import { useLocale } from '@/lib/locale-context';
import styled from 'styled-components';

const Section = styled.section`
  padding: 120px 40px;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 80px 24px;
  }
`;

const Heading = styled.h2`
  font-family: var(--font-syne);
  font-weight: 800;
  font-size: clamp(32px, 5vw, 56px);
  text-align: center;
  margin-bottom: 60px;
  color: var(--text-primary);

  @media (max-width: 768px) {
    margin-bottom: 32px;
  }
`;

const FAQItem = styled.div`
  border-bottom: 1px solid var(--border-color, rgba(0, 123, 255, 0.15));
  padding: 16px 0;
`;

const QuestionButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 0;
  color: var(--text-primary);
  font-family: var(--font-syne);
  font-weight: 700;
  font-size: 18px;
  text-align: left;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Answer = styled.p<{ $isOpen: boolean }>`
  max-height: ${({ $isOpen }) => ($isOpen ? '300px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease, margin 0.3s ease;
  margin: ${({ $isOpen }) => ($isOpen ? '12px 0 0' : '0')};
  color: var(--text-secondary, rgba(255, 255, 255, 0.7));
  font-family: var(--font-jakarta);
  font-size: 16px;
  line-height: 1.6;
`;

const Arrow = styled.span<{ $isOpen: boolean }>`
  font-size: 20px;
  color: var(--primary);
  transition: transform 0.3s ease;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(45deg)' : 'rotate(0deg)')};
  flex-shrink: 0;
`;

export default function FAQSection() {
  const { t } = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = t('faq.items') as unknown as Array<{ question: string; answer: string }>;
  const heading = t('faq.heading') as string;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: items.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />
      <Section id="faq">
        <Heading>{heading}</Heading>
        {items.map((item, index) => (
          <FAQItem key={index}>
            <QuestionButton
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              aria-expanded={openIndex === index}
            >
              {item.question}
              <Arrow $isOpen={openIndex === index}>+</Arrow>
            </QuestionButton>
            <Answer $isOpen={openIndex === index}>{item.answer}</Answer>
          </FAQItem>
        ))}
      </Section>
    </>
  );
}
