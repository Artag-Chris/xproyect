'use client';
import Footer from '@/components/common/Footer';
import Hero from '@/components/sections/Hero';
import PainSection from '@/components/sections/PainSection';
import MethodSection from '@/components/sections/MethodSection';
import CapacitiesSection from '@/components/sections/CapacitiesSection';
import ProofSection from '@/components/sections/ProofSection';
import ShowcaseSection from '@/components/sections/ShowcaseSection';
import CallSection from '@/components/sections/CallSection';

// Video section removed for narrative-first approach; use optional visuals later

export default function Home() {

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
