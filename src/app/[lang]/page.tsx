'use client';
import Hero from '@/components/sections/Hero';
import PainSection from '@/components/sections/PainSection';
import MethodSection from '@/components/sections/MethodSection';
import CapacitiesSection from '@/components/sections/CapacitiesSection';
import ProofSection from '@/components/sections/ProofSection';
import ShowcaseSection from '@/components/sections/ShowcaseSection';
import CallSection from '@/components/sections/CallSection';
import Footer from '@/components/common/Footer';

export default function Home() {
  return (
    <>
      <Hero />
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
