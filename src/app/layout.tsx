import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Lumen X Labs", template: "%s | Lumen X Labs" },
  description: "Digital solutions for business modernization, automation, and AI integration.",
  icons: { icon: '/favicon.ico' },
  metadataBase: new URL('https://lumenxlabs.com.co'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en" suppressHydrationWarning className={`${syne.variable} ${jakarta.variable} antialiased`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.lang = location.pathname.startsWith('/es') ? 'es' : 'en';`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/lumenXlogoSVG.svg" as="image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': 'https://lumenxlabs.com.co/#organization',
              name: 'Lumen X Labs',
              url: 'https://lumenxlabs.com.co',
              logo: 'https://lumenxlabs.com.co/lumenXlogoSVG.svg',
              description: 'Modernización empresarial, automatización de procesos e integraciones de IA.',
              foundingDate: '2024',
              founder: {
                '@type': 'Person',
                '@id': 'https://artagdev.com.co/#person',
                name: 'Christian Henao Aguirre',
                jobTitle: 'Founder & Lead Developer',
                url: 'https://artagdev.com.co',
              },
              knowsAbout: [
                'Automatización de procesos',
                'Integración de IA',
                'Desarrollo web',
                'Agentes WhatsApp con IA',
                'Transformación digital',
              ],
              sameAs: [
                'https://www.linkedin.com/company/lumenxlabs',
                'https://github.com/lumenxlabs',
              ],
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Pereira',
                addressRegion: 'Risaralda',
                addressCountry: 'CO',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': 'https://lumenxlabs.com.co/#localbusiness',
              name: 'Lumen X Labs',
              description: 'Soluciones digitales: automatización de procesos, integración de IA y desarrollo web.',
              url: 'https://lumenxlabs.com.co',
              telephone: '+57-317-128-7426',
              email: 'hello@lumenxlabs.com.co',
              areaServed: ['Pereira', 'Risaralda', 'Colombia'],
              parentOrganization: { '@id': 'https://lumenxlabs.com.co/#organization' },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Pereira',
                addressRegion: 'Risaralda',
                addressCountry: 'CO',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 4.808717,
                longitude: -75.690601,
              },
              priceRange: '$$',
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': 'https://lumenxlabs.com.co/#website',
              name: 'Lumen X Labs',
              url: 'https://lumenxlabs.com.co',
              description: 'Modernización empresarial, automatización de procesos e integraciones de IA.',
              inLanguage: ['es-CO', 'en-US'],
              publisher: { '@id': 'https://lumenxlabs.com.co/#organization' },
            }),
          }}
        />
      </head>
      <body>
        {gtmId && (
          <Script id="gtm" strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
