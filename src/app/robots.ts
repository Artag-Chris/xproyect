import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // AI search / citation crawlers — allow (blocking these blocks citations)
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Claude-SearchBot', allow: '/' },
      // AI training crawlers — block (opt out of model training)
      { userAgent: 'GPTBot', disallow: '/' },
      { userAgent: 'ChatGPT-User', disallow: '/' },
      { userAgent: 'ClaudeBot', disallow: '/' },
      { userAgent: 'anthropic-ai', disallow: '/' },
      { userAgent: 'Google-Extended', disallow: '/' },
      { userAgent: 'Applebot-Extended', disallow: '/' },
      { userAgent: 'CCBot', disallow: '/' },
      // Everything else
      { userAgent: '*', allow: '/' },
    ],
    sitemap: 'https://lumenxlabs.com.co/sitemap.xml',
  };
}