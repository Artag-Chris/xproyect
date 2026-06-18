'use client';

import { useLocale } from '@/lib/locale-context';
import ServiceHero from './ServiceHero';
import ServiceFeatures from './ServiceFeatures';
import ServiceWhyUs from './ServiceWhyUs';
import ServiceFAQ from './ServiceFAQ';
import ServiceCTA from './ServiceCTA';
import Footer from '@/components/common/Footer';

interface Props {
  slug: string;
}

export default function ServicePage({ slug }: Props) {
  const { t, tRaw } = useLocale();

  const data = tRaw(`services.${slug}`) as Record<string, unknown> | undefined;
  if (!data) return null;

  const hero = data.hero as Record<string, string> || {};
  const features = (data.features || []) as Array<{ title: string; desc: string }>;
  const whyUs = (data.why_us || []) as Array<{ title: string; desc: string }>;
  const faq = (data.faq || []) as Array<{ question: string; answer: string }>;
  const cta = data.cta as Record<string, string> || {};

  return (
    <>
      <ServiceHero title={hero.title || ''} desc={hero.desc || ''} cta={hero.cta || ''} />
      <ServiceFeatures heading={t('service_features_heading')} items={features} />
      <ServiceWhyUs heading={t('service_whyus_heading')} items={whyUs} />
      <ServiceFAQ heading={t('service_faq_heading')} items={faq} />
      <ServiceCTA title={cta.title || t('service_cta_default')} button={cta.button || t('service_cta_button')} />
      <Footer />
    </>
  );
}
