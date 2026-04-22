'use client';

import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface MetricProps {
  label: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
  animated?: boolean;
}

const MetricCard = styled.div`
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-sm);

  &:hover {
    border-color: #007bff;
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  .metric-icon {
    font-size: 32px;
    margin-bottom: 12px;
    display: inline-block;
  }

  .metric-value {
    font-size: 32px;
    font-weight: bold;
    color: #007bff;
    margin: 12px 0;
    font-variant-numeric: tabular-nums;
  }

  .metric-label {
    font-size: 14px;
    color: #495057;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

function CountUp({ end, duration = 2000, prefix = '', suffix = '' }: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
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
  }, [end, duration]);

  return (
    <>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </>
  );
}

export default function Metric({ label, value, prefix = '', suffix = '', icon, animated = true }: MetricProps) {
  const isNumeric = typeof value === 'number';

  return (
    <MetricCard>
      {icon && <div className="metric-icon">{icon}</div>}
      <div className="metric-value">
        {animated && isNumeric ? (
          <CountUp end={value as number} prefix={prefix} suffix={suffix} />
        ) : (
          <>
            {prefix}
            {value}
            {suffix}
          </>
        )}
      </div>
      <div className="metric-label">{label}</div>
    </MetricCard>
  );
}
