import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
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
    <html className={`${syne.variable} ${jakarta.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/lumenXlogoSVG.svg" as="image" />
        {gtmId && (
          /* eslint-disable-next-line @next/next/next-script-for-ga */
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Lumen X Labs',
              url: 'https://lumenxlabs.com.co',
              logo: 'https://lumenxlabs.com.co/lumenXlogoSVG.svg',
              description: 'Modernización empresarial, automatización de procesos e integraciones de IA.',
              foundingDate: '2024',
              founders: [{ '@type': 'Person', name: 'Chris Artag' }],
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
              name: 'Lumen X Labs',
              description: 'Soluciones digitales: automatización de procesos, integración de IA y desarrollo web.',
              url: 'https://lumenxlabs.com.co',
              telephone: '+57-300-000-0000',
              email: 'hello@lumenxlabs.com.co',
              areaServed: ['Pereira', 'Risaralda', 'Colombia'],
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Pereira',
                addressRegion: 'Risaralda',
                addressCountry: 'CO',
              },
              priceRange: '$$',
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
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
