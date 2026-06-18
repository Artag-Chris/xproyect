'use client';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 80px 40px 120px;
  max-width: 1200px;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const Card = styled(motion.div)`
  padding: 40px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--surface);
  text-align: left;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const CardTitle = styled.h3`
  font-family: var(--font-syne);
  font-size: 24px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 12px;
`;

const CardDesc = styled.p`
  font-family: var(--font-jakarta);
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
`;

interface Props {
  heading: string;
  items: Array<{ title: string; desc: string }>;
}

export default function ServiceFeatures({ heading, items }: Props) {
  return (
    <Section>
      <Heading>{heading}</Heading>
      <Grid>
        {items.map((item, idx) => (
          <Card
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <CardTitle>{item.title}</CardTitle>
            <CardDesc>{item.desc}</CardDesc>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
