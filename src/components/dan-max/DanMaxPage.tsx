'use client';

import dynamic from 'next/dynamic';
import HeroSection from './HeroSection';
import TextReveal from '../animations/TextReveal';
import Footer from './Footer';

import "../../styles/danmaxpage.css";

const PortfolioGrid = dynamic(() => import('./PortfolioGrid'), {
  ssr: false,
  loading: () => <div style={{ height: '40vmax' }} />,
});
const AboutSection = dynamic(() => import('./AboutSection'), {
  ssr: false,
  loading: () => <div style={{ height: '100vh' }} />,
});
const TestimonialSection = dynamic(() => import('./TestimonialSection'), {
  ssr: false,
  loading: () => <div style={{ height: '50vh' }} />,
});
const CTASection = dynamic(() => import('./CTASection'), {
  ssr: false,
  loading: () => <div style={{ height: '30vh' }} />,
});

export default function DanMaxPage({ data }: { data: any }) {
  if (!data) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-800">
        <p className="text-white text-xl">No data found</p>
      </div>
    );
  }

  return (
    <div className="danmax-section full-body-container">
      <HeroSection data={data} />

      <div className="danmax-section2 section2">
        <div className="Quote-Section">
          <TextReveal className="danmax-textreveal">
            <h3>{data.section2Paragraph}</h3>
            <div className="Quote-Section-para">
              <p>- {data.photographerName}</p>
            </div>
          </TextReveal>
        </div>

        <PortfolioGrid data={data} />

        <div className="danmax-btn-section">
          <div className="danmax-btn">
            <p className="color-transition-text">{data.section2Button}</p>
          </div>
        </div>

        <AboutSection data={data} />
        <TestimonialSection data={data} />
      </div>

      <CTASection data={data} />
      <Footer />
    </div>
  );
}