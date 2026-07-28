'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';

interface StageDividerProps {
  num: string;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 60px 0;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 40px 0;
    gap: 16px;
  }
`;

const Line = styled.div`
  flex: 1;
  height: 2px;
  background: var(--border);
`;

const Num = styled.span`
  font-family: var(--font-syne);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-tertiary);
  letter-spacing: 0.08em;
  white-space: nowrap;
`;

export default function StageDivider({ num }: StageDividerProps) {
  return (
    <Wrapper
      as={motion.div}
      initial={{ opacity: 0, scaleX: 0.8 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      <Line />
      <Num>{num}</Num>
      <Line />
    </Wrapper>
  );
}
