import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Section = styled.section`
  padding: 120px 20px;
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
`;

const Heading = styled.h2`
  font-family: var(--font-syne);
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 16px;
`;

const Sub = styled.p`
  font-family: var(--font-jakarta);
  color: var(--text-secondary);
  font-size: 16px;
  margin-bottom: 28px;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Input = styled.input`
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: white;
`;

const Button = styled.button`
  padding: 12px 20px;
  border-radius: 8px;
  border: none;
  background: var(--primary);
  color: white;
  font-family: var(--font-syne);
  font-weight: 700;
  cursor: pointer;
`;

export default function CallSection(){
  const onSubmit = (e: React.FormEvent) => { e.preventDefault(); alert('Gracias por tu interés. Nos pondremos en contacto pronto.'); };
  return (
    <Section id="contact">
      <Heading>¿Listo para empezar?</Heading>
      <Sub>Agenda una consultoría de 30 minutos para entender tus objetivos y mapear una ruta de transformación.</Sub>
      <Form onSubmit={onSubmit}>
        <Input placeholder="Nombre" required />
        <Input placeholder="Email" type="email" required />
        <Input placeholder="Teléfono" />
        <Input placeholder="Empresa" />
        <div style={{gridColumn:'1 / -1'}}>
          <Button type="submit">Solicitar Consulta</Button>
        </div>
      </Form>
    </Section>
  )
}
