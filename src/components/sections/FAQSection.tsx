'use client';

import { useState } from 'react';
import { useLocale } from '@/lib/locale-context';
import styled from 'styled-components';

const Section = styled.section`
  padding: 80px 40px;
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
  border-bottom: 1px solid var(--border);
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
  transition: opacity var(--transition-base);

  &:active {
    opacity: 0.6;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const AnswerWrapper = styled.div<{ $isOpen: boolean }>`
  display: grid;
  grid-template-rows: ${({ $isOpen }) => ($isOpen ? '1fr' : '0fr')};
  transition: grid-template-rows 0.3s ease;
  margin-top: ${({ $isOpen }) => ($isOpen ? '12px' : '0')};
`;

const Answer = styled.p`
  overflow: hidden;
  min-height: 0;
  color: var(--text-secondary);
  font-family: var(--font-jakarta);
  font-size: 16px;
  line-height: 1.6;
`;

const Arrow = styled.span<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  transition: transform 0.3s ease;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(45deg)' : 'rotate(0deg)')};
  flex-shrink: 0;
`;

export default function FAQSection() {
  const { t, tRaw } = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = (tRaw('faq.items') ?? []) as Array<{ question: string; answer: string }>;
  const heading = t('faq.heading');

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
              aria-controls={`faq-answer-${index}`}
            >
              {item.question}
              <Arrow $isOpen={openIndex === index}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </Arrow>
            </QuestionButton>
            <AnswerWrapper $isOpen={openIndex === index}>
              <Answer id={`faq-answer-${index}`}>{item.answer}</Answer>
            </AnswerWrapper>
          </FAQItem>
        ))}
      </Section>
    </>
  );
}
