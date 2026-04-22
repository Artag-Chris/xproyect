import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Hero from '@/components/sections/Hero';
import MetricsGrid from '@/components/metrics/MetricsGrid';
import VideoPlayer from '@/components/video/VideoPlayer';
import styled from 'styled-components';

const Section = styled.section`
  max-width: 1200px;
  margin: 80px auto;
  padding: 0 20px;

  h2 {
    font-size: 42px;
    font-weight: 700;
    color: #000;
    margin-bottom: 40px;
    text-align: center;
  }
`;

const DemoVideoSection = styled(Section)`
  h2 {
    margin-bottom: 30px;
  }

  .video-wrapper {
    max-width: 800px;
    margin: 0 auto;
  }
`;

export default function Home() {
  const metrics = [
    {
      label: 'Projects Completed',
      value: 150,
      icon: '🚀',
    },
    {
      label: 'Happy Clients',
      value: 98,
      suffix: '%',
      icon: '😊',
    },
    {
      label: 'Years Experience',
      value: 5,
      suffix: '+',
      icon: '⚡',
    },
  ];

  return (
    <>
      <Header />
      
      <Hero
        title="Welcome to Lumen X Labs"
        description="Creating digital experiences with innovative solutions. From video production to interactive metrics, we bring your vision to life."
        primaryButtonText="View Our Work"
        secondaryButtonText="Get in Touch"
      />

      <Section>
        <h2>Our Impact</h2>
        <MetricsGrid metrics={metrics} columns={3} />
      </Section>

      <DemoVideoSection>
        <h2>Featured Work</h2>
        <div className="video-wrapper">
          <VideoPlayer
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            poster="https://via.placeholder.com/800x450?text=Video+Placeholder"
            title="Demo Video"
            controls
          />
        </div>
      </DemoVideoSection>

      <Section style={{ marginTop: '100px', marginBottom: '100px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Ready to Start?</h2>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '18px', color: '#495057', marginBottom: '30px' }}>
            Let's create something amazing together.
          </p>
          <button
            style={{
              padding: '12px 32px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0056b3';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 123, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#007bff';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Contact Us
          </button>
        </div>
      </Section>

      <Footer />
    </>
  );
}
