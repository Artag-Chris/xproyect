import { ImageResponse } from 'next/og'

export const alt = 'Lumen X Labs — Modernization, Automation & AI'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const es = lang === 'es'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#ffffff',
          padding: '64px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              backgroundColor: '#007bff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            L
          </div>
          <div style={{ fontSize: 30, fontWeight: 800, color: '#001a33' }}>Lumen X Labs</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: 62,
              fontWeight: 800,
              color: '#001a33',
              maxWidth: 980,
              lineHeight: 1.1,
              display: 'flex',
            }}
          >
            {es
              ? 'Modernización, automatización e IA para tu negocio'
              : 'Modernization, automation & AI for your business'}
          </div>
          <div style={{ fontSize: 28, color: '#007bff', fontWeight: 600, display: 'flex' }}>
            {es ? 'Soluciones construidas en Pereira para todo el mundo' : 'Solutions built in Pereira, delivered worldwide'}
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 20, color: '#425466' }}>
          lumenxlabs.com.co
        </div>
      </div>
    ),
    size,
  )
}