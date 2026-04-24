'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface MetricProps {
  label: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
  index?: number;
}

const MetricContainer = styled.div`
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all var(--transition-base);
`;

const IconWrapper = styled(motion.div)`
  font-size: 32px;
  margin-bottom: 24px;
  display: inline-block;
  filter: grayscale(1);
  transition: filter var(--transition-base);

  ${MetricContainer}:hover & {
    filter: grayscale(0);
    transform: scale(1.1);
  }
`;

const MetricValue = styled.div`
  font-family: var(--font-syne);
  font-size: 48px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 8px;
  line-height: 1;
  letter-spacing: -0.02em;
`;

const MetricLabel = styled.div`
  font-family: var(--font-jakarta);
  font-size: 12px;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

function CountUp({ end, prefix = '', suffix = '' }: { end: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end]);

  return (
    <>
      {prefix}{count.toLocaleString()}{suffix}
    </>
  );
}

export default function Metric({ label, value, prefix = '', suffix = '', icon, index = 0 }: MetricProps) {
  const isNumeric = typeof value === 'number';

  return (
    <MetricContainer
      as={motion.div}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {icon && (
        <IconWrapper
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: (index * 0.1) + 0.2 }}
        >
          {icon}
        </IconWrapper>
      )}
      <MetricValue>
        {isNumeric ? (
          <CountUp end={value as number} prefix={prefix} suffix={suffix} />
        ) : (
          <>{prefix}{value}{suffix}</>
        )}
      </MetricValue>
      <MetricLabel>{label}</MetricLabel>
    </MetricContainer>
  );
}
