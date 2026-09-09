'use client';
import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import Footer from '@/components/common/Footer';

const PainSection = dynamic(() => import('@/components/sections/PainSection'));
const MethodSection = dynamic(() => import('@/components/sections/MethodSection'));
const CapacitiesSection = dynamic(() => import('@/components/sections/CapacitiesSection'));
const ProofSection = dynamic(() => import('@/components/sections/ProofSection'));
const ShowcaseSection = dynamic(() => import('@/components/sections/ShowcaseSection'));
const FAQSection = dynamic(() => import('@/components/sections/FAQSection'));
const FounderSection = dynamic(() => import('@/components/sections/FounderSection'));
const CallSection = dynamic(() => import('@/components/sections/CallSection'));
const StageDivider = dynamic(() => import('@/components/sections/StageDivider'));

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
