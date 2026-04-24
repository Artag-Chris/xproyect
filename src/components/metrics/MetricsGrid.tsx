'use client';

import styled from 'styled-components';
import Metric from './Metric';

interface MetricsGridProps {
  metrics: Array<{
    label: string;
    value: string | number;
    prefix?: string;
    suffix?: string;
    icon?: React.ReactNode;
  }>;
  columns?: 2 | 3 | 4;
}

const GridContainer = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$columns}, 1fr);
  border-top: 1px solid var(--border);
  border-left: 1px solid var(--border);
  background: var(--background);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GridItem = styled.div`
  border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  transition: background var(--transition-base);

  &:hover {
    background: var(--surface-secondary);
  }
`;

export default function MetricsGrid({ metrics, columns = 3 }: MetricsGridProps) {
  return (
    <GridContainer $columns={columns}>
      {metrics.map((metric, index) => (
        <GridItem key={index}>
          <Metric
            index={index}
            label={metric.label}
            value={metric.value}
            prefix={metric.prefix}
            suffix={metric.suffix}
            icon={metric.icon}
          />
        </GridItem>
      ))}
    </GridContainer>
  );
}
