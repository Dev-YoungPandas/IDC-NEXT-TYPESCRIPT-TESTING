// src/components/dan-max/DanMaxPage.tsx
'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import HeroSection from './HeroSection';
import TextReveal from '../animations/TextReveal';
import Footer from './Footer';
import type { CTASectionData } from './CTASection';

import "../../styles/danmaxpage.css";
import CamillaMotionPage from './CamillaMotionPage';

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

const AwardSection = dynamic(() => import('./AwardSection'), {
  ssr: false,
  loading: () => null
});

/**
 * Maps raw photographer WordPress ACF data into the CTASectionData shape.
 * Photographer pages store marquee text in `danMarquee` and background
 * image in `marqueeImage`, while CTASection expects `marqueeText` and `bgImage`.
 */
function mapPhotographerCTAData(raw: Record<string, any> | null | undefined): CTASectionData | null {
  if (!raw) return null;

  return {
    marqueeText: raw.danMarquee ?? null,
    marqueeTopLineImage: raw.marqueeTopLineImage ?? null,
    marqueeBottomLineImage: raw.marqueeBottomLineImage ?? null,
    bgImage: raw.marqueeImage ?? null,
    heading: null,
    paragraph: null,
    contactLabel: null,
    photographerName: raw.photographerName ?? null,
  };
}

export default function DanMaxPage({ data, photographer }: { data: any; photographer: string }) {
  if (!data) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-800">
        <p className="text-white text-xl">No data found</p>
      </div>
    );
  }

  /* ── Map raw photographer data → CTASectionData (memoised to avoid re-creation) */
  const ctaSectionData = useMemo(() => mapPhotographerCTAData(data), [data]);

  return (
    <div className="danmax-section full-body-container">

      <div className='z-50'>

        <HeroSection data={data} />

        <CamillaMotionPage data={data} />
        <div className="danmax-section2 section2">
          <div className={`Quote-Section ${photographer === "dan-max" ? "Quote-Section--bottom" : ""}`}>
            <TextReveal className={`danmax-textreveal ${photographer === "dan-max" ? "danmax-textreveal--narrow" : ''}`}>
              <div>
                <h3>{data.section2Paragraph}</h3>
                <div className="Quote-Section-para">
                  <p>-{data.photographerName?.split(' ')[0]}</p>

                </div>
              </div>

            </TextReveal>

            <div>
              <svg aria-hidden="true" fill='#f1f1f1' className="quote-svg e-font-icon-svg e-fas-quote-left" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg>
            </div>
          </div>

          <PortfolioGrid data={data} />

          <div className="danmax-btn-section">
            <div className="danmax-btn">
              <p className="color-transition-text">{data.section2Button}</p>
            </div>
          </div>

          <AboutSection data={data} />

          {data?.awardHeadingMain && <AwardSection data={data} />}
          <TestimonialSection data={data} />


        </div>


      </div>

      <div className='w-full h-[131vh] xl:h-[177vh]'>
        {/* Pass mapped CTA data instead of raw data */}
        <CTASection data={ctaSectionData} />


        <div className='fixed w-full bottom-0 z-[-1]'>
          <Footer />
        </div>
      </div>


    </div>
  );
}