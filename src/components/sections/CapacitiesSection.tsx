import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Section = styled.section`
  padding: 120px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Heading = styled.h2`
  font-family: var(--font-syne);
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 800;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 40px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 28px;
`;

const Card = styled(motion.div)`
  padding: 28px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: linear-gradient(135deg, rgba(0,0,0,0.04), rgba(255,255,255,0.04));
`;

const CardTitle = styled.h3`
  font-family: var(--font-syne);
  font-size: 18px;
  margin: 0 0 8px 0;
`;

const CardDesc = styled.p`
  margin: 0;
  font-family: var(--font-jakarta);
  color: var(--text-secondary);
  line-height: 1.5;
`;

export default function CapacitiesSection(){
  const capabilities = [
    { title: 'Automatización de procesos', desc: 'Orquestación entre sistemas, ejecución sin intervención humana.' },
    { title: 'IA integrada', desc: 'Modelos IA para toma de decisiones y operaciones en tiempo real.' },
    { title: 'Integración de datos', desc: 'Conexión de fuentes y normalización para una visión única.' },
    { title: 'Gobernanza y cumplimiento', desc: 'Políticas, seguridad y calidad de datos en tu stack.' },
    { title: 'Experiencia de usuario', desc: 'UI/UX refinada, accesibilidad y rendimiento.' },
    { title: 'Estrategia de negocio', desc: 'Transformación digital alineada con objetivos y ROI.' },
  ];

  return (
    <Section id="capacities">
      <Heading>Nuestras Capacidades Clave</Heading>
      <Grid>
        {capabilities.map((c, idx) => (
          <Card key={idx} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <CardTitle>{c.title}</CardTitle>
            <CardDesc>{c.desc}</CardDesc>
          </Card>
        ))}
      </Grid>
    </Section>
  )
}
