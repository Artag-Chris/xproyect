'use client';

import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
  padding: 60px 20px 20px;
  margin-top: 100px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: 16px;
    font-weight: 700;
    color: #000;
    margin-bottom: 16px;
  }

  ul {
    list-style: none;

    li {
      margin-bottom: 10px;

      a {
        color: #495057;
        text-decoration: none;
        transition: color var(--transition-base);

        &:hover {
          color: #007bff;
        }
      }
    }
  }

  p {
    color: #495057;
    font-size: 14px;
    line-height: 1.6;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #e9ecef;
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }

  p {
    color: #495057;
    font-size: 14px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;

  a {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: white;
    border: 1px solid #e9ecef;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #007bff;
    text-decoration: none;
    transition: all var(--transition-base);

    &:hover {
      background: #007bff;
      color: white;
      transform: translateY(-2px);
    }
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <h3>About</h3>
            <p>
              Lumen X Labs is a digital solutions company specializing in video production,
              metrics tracking, and interactive experiences.
            </p>
          </FooterSection>

          <FooterSection>
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/projects">Projects</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Services</h3>
            <ul>
              <li>
                <a href="#">Video Production</a>
              </li>
              <li>
                <a href="#">Analytics</a>
              </li>
              <li>
                <a href="#">Interactive Design</a>
              </li>
              <li>
                <a href="#">Web Development</a>
              </li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Connect</h3>
            <p>Get in touch with us for inquiries and collaborations.</p>
            <SocialLinks>
              <a href="#" title="Twitter">
                𝕏
              </a>
              <a href="#" title="LinkedIn">
                in
              </a>
              <a href="#" title="GitHub">
                gh
              </a>
            </SocialLinks>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <p>&copy; 2024 Lumen X Labs. All rights reserved.</p>
          <SocialLinks>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </SocialLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
}
