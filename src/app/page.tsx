'use client';
import Footer from '@/components/common/Footer';
import Hero from '@/components/sections/Hero';
import PainSection from '@/components/sections/PainSection';
import MethodSection from '@/components/sections/MethodSection';
import CapacitiesSection from '@/components/sections/CapacitiesSection';
import ProofSection from '@/components/sections/ProofSection';
import ShowcaseSection from '@/components/sections/ShowcaseSection';
import CallSection from '@/components/sections/CallSection';
import styled from 'styled-components';

const Section = styled.section`
  max-width: 1200px;
  margin: 80px auto;
  padding: 0 20px;

  h2 {
    font-size: 42px;
    font-weight: 700;
    color: var(--foreground);
    margin-bottom: 40px;
    text-align: center;
  }
`;

// Video section removed for narrative-first approach; use optional visuals later

export default function Home() {
  const metrics = [
    {
      label: 'Projects Completed',
      value: 150,
      icon: '🚀',
    },
    {
      label: 'Happy Clients',
      value: 98,
      suffix: '%',
      icon: '😊',
    },
    {
      label: 'Years Experience',
      value: 5,
      suffix: '+',
      icon: '⚡',
    },
  ];

  return (
    <>
      <Hero
        title="Welcome to Lumen X Labs"
        description="Creating digital experiences with innovative solutions. From video production to interactive metrics, we bring your vision to life."
        primaryButtonText="View Our Work"
        secondaryButtonText="Get in Touch"
        videoSrc="/videos/hero-demo.mp4"
        videoPoster="/videos/hero-poster.jpg"
      />

      <PainSection />
      <MethodSection />
      <CapacitiesSection />
      <ProofSection />
      <ShowcaseSection />
      <CallSection />

      <Footer />
    </>
  );
}
