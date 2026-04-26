'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 120px 20px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Heading = styled(motion.h2)`
  font-family: var(--font-syne);
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 60px;
  line-height: 1.1;
`;

const MethodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  width: 100%;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const MethodStep = styled(motion.div)`
  position: relative;
  padding: 40px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  text-align: left;
  transition: all var(--transition-base);

  &:hover {
    border-color: var(--primary);
    box-shadow: var(--shadow-md);
  }

  .step-number {
    font-family: var(--font-syne);
    font-size: 64px;
    font-weight: 800;
    color: var(--primary);
    opacity: 0.2;
    position: absolute;
    top: 20px;
    right: 30px;
    line-height: 1;
  }

  h3 {
    font-family: var(--font-syne);
    font-size: 24px;
    font-weight: 800;
    color: var(--text-primary);
    margin-bottom: 16px;
    position: relative;
    z-index: 1;
  }

  p {
    font-family: var(--font-jakarta);
    font-size: 16px;
    color: var(--text-secondary);
    line-height: 1.6;
    position: relative;
    z-index: 1;
  }
`;

export default function MethodSection() {
  const steps = [
    {
      title: "Reviso",
      desc: "Analizo a fondo tu operación actual, identificando cuellos de botella y fugas de tiempo que pasan desapercibidas."
    },
    {
      title: "Diseño",
      desc: "Creo un nuevo mapa de procesos optimizado, eliminando la fricción y diseñando la ruta más corta hacia el resultado."
    },
    {
      title: "Conecto",
      desc: "Implemento la tecnología (IA, Web, Automatizaciones) para que el proceso se ejecute solo, con precisión quirúrgica."
    }
  ];

  return (
    <Section>
      <Heading
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Mi Metodología de Transformación
      </Heading>

      <MethodGrid>
        {steps.map((step, i) => (
          <MethodStep
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            <div className="step-number">0{i + 1}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </MethodStep>
        ))}
      </MethodGrid>
    </Section>
  );
}
