// ============================================
// FILE: components/dan-max/DanMaxPage.tsx
// ============================================
// KEY CHANGES:
// 1. Accepts serverData prop — no more client-side fetching
// 2. No more loading spinner blocking first paint
// 3. Below-fold sections dynamically imported to reduce initial JS bundle
// 4. HeroSection renders immediately with data (not after fetch)

'use client';

import dynamic from 'next/dynamic';
import HeroSection from './HeroSection';
import TextReveal from '../animations/TextReveal';
import Footer from './Footer';

import "../../styles/danmaxpage.css";

// ✅ Dynamic imports for below-the-fold components
// These are NOT needed for initial render or LCP
// Loading them lazily reduces initial JS parse time by ~100-200ms
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

export default function DanMaxPage({ serverData }: { serverData: any }) {
  // ✅ Data already available — no useGQLQuery, no loading state
  const dan = serverData?.pageBy?.dan;

  if (!dan) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-800">
        <p className="text-white text-xl">No data found</p>
      </div>
    );
  }

  return (
    <div className="danmax-section full-body-container">
      {/* Hero Section — renders immediately, hero image starts loading ASAP */}
      <HeroSection data={dan} />

      {/* Section 2 */}
      <div className="danmax-section2 section2">
        {/* Quote Section */}
        <div className="Quote-Section">
          <TextReveal className="danmax-textreveal">
            <h3>
              {dan.section2Paragraph}
            </h3>
            <div className="Quote-Section-para">
              <p>
                - {dan.photographerName}
              </p>
            </div>
          </TextReveal>
        </div>

        {/* Portfolio Grid */}
        <PortfolioGrid data={dan} />

        {/* Button */}
        <div className="danmax-btn-section ">
          <div className="danmax-btn">
            <p className="color-transition-text">
              {dan.section2Button}
            </p>
          </div>
        </div>

        {/* About */}
        <AboutSection data={dan} />

        {/* Testimonials */}
        <TestimonialSection data={dan} />
      </div>

      {/* CTA */}
      <CTASection />



      <Footer />
    </div>
  );
}