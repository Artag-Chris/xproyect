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

const GridContainer = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 20px 0;

  @media (min-width: 768px) {
    grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  }
`;

export default function MetricsGrid({ metrics, columns = 3 }: MetricsGridProps) {
  return (
    <GridContainer columns={columns}>
      {metrics.map((metric, index) => (
        <Metric
          key={index}
          label={metric.label}
          value={metric.value}
          prefix={metric.prefix}
          suffix={metric.suffix}
          icon={metric.icon}
          animated={true}
        />
      ))}
    </GridContainer>
  );
}
