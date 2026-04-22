// Analytics Configuration
// Add your analytics IDs here

export const analytics = {
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
  gtmId: process.env.NEXT_PUBLIC_GTM_ID,
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  tiktokPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID,
};

export const siteConfig = {
  name: 'Lumen X Labs',
  description: 'Creating digital experiences with innovative solutions',
  url: 'https://lumenxlabs.com',
  ogImage: '/og-image.png',
  links: {
    twitter: 'https://twitter.com/lumenxlabs',
    github: 'https://github.com/lumenxlabs',
    linkedin: 'https://linkedin.com/company/lumenxlabs',
  },
};

export const routes = {
  home: '/',
  about: '/about',
  projects: '/projects',
  blog: '/blog',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
};
