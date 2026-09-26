import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  async headers() {
    const cacheControl = [
      { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
    ];

    return [{ source: '/lumenxxlabsHero.mp4', headers: cacheControl }];
  },
};

let config: NextConfig = nextConfig;

if (process.env.ANALYZE === 'true') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const withBundleAnalyzer = require('@next/bundle-analyzer').default;
  config = withBundleAnalyzer()(nextConfig);
}

export default config;
