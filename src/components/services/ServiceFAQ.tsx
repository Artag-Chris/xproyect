'use client';
import { useState } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 80px 40px 120px;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 60px 24px;
  }
`;

const Heading = styled.h2`
  font-family: var(--font-syne);
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 60px;
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 32px;
  }
`;

const Item = styled.div`
  border-bottom: 1px solid var(--border-color, rgba(0, 123, 255, 0.15));
  padding: 16px 0;
`;

const QuestionBtn = styled.button`
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

const Answer = styled.p<{ $open: boolean }>`
  max-height: ${({ $open }) => ($open ? '300px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease, margin 0.3s ease;
  margin: ${({ $open }) => ($open ? '12px 0 0' : '0')};
  color: var(--text-secondary);
  font-family: var(--font-jakarta);
  font-size: 16px;
  line-height: 1.6;
`;

const Arrow = styled.span<{ $open: boolean }>`
  font-size: 20px;
  color: var(--primary);
  transition: transform 0.3s ease;
  transform: ${({ $open }) => ($open ? 'rotate(45deg)' : 'rotate(0deg)')};
  flex-shrink: 0;
`;

interface Props {
  heading: string;
  items: Array<{ question: string; answer: string }>;
}

export default function ServiceFAQ({ heading, items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
              acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
          }),
        }}
      />
      <Section>
        <Heading>{heading}</Heading>
        {items.map((item, index) => (
          <Item key={index}>
            <QuestionBtn
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              aria-expanded={openIndex === index}
            >
              {item.question}
              <Arrow $open={openIndex === index}>+</Arrow>
            </QuestionBtn>
            <Answer $open={openIndex === index}>{item.answer}</Answer>
          </Item>
        ))}
      </Section>
    </>
  );
}
