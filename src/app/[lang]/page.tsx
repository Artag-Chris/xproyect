'use client';
import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import Footer from '@/components/common/Footer';

const PainSection = dynamic(() => import('@/components/sections/PainSection'), { ssr: false });
const MethodSection = dynamic(() => import('@/components/sections/MethodSection'), { ssr: false });
const CapacitiesSection = dynamic(() => import('@/components/sections/CapacitiesSection'), { ssr: false });
const ProofSection = dynamic(() => import('@/components/sections/ProofSection'), { ssr: false });
const ShowcaseSection = dynamic(() => import('@/components/sections/ShowcaseSection'), { ssr: false });
const FAQSection = dynamic(() => import('@/components/sections/FAQSection'), { ssr: false });
const FounderSection = dynamic(() => import('@/components/sections/FounderSection'), { ssr: false });
const CallSection = dynamic(() => import('@/components/sections/CallSection'), { ssr: false });
const StageDivider = dynamic(() => import('@/components/sections/StageDivider'), { ssr: false });

export default function Home() {
  return (
    <>
      <Hero />
      <PainSection />
      <StageDivider num="01" />
      <MethodSection />
      <StageDivider num="02" />
      <CapacitiesSection />
      <StageDivider num="03" />
      <ShowcaseSection />
      <StageDivider num="04" />
      <ProofSection />
      <FounderSection />
      <FAQSection />
      <CallSection />
      <Footer />
    </>
  );
}
