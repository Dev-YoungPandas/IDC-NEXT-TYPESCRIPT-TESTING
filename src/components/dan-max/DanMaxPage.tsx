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

const AwardSection = dynamic(() => import('./AwardSection'),{
  ssr:false,
  loading: () => null
})

export default function DanMaxPage({ data }: { data: any }) {
  if (!data) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-800">
        <p className="text-white text-xl">No data found</p>
      </div>
    );
  }


  console.log(data.section2Paragraph, "hhhh")
  return (
    <div className="danmax-section full-body-container">

      <div className='z-50'>

        <HeroSection data={data} />

        <div className="danmax-section2 section2">
          <div className="Quote-Section">
            <TextReveal className="danmax-textreveal">
              <h3>{data.section2Paragraph}</h3>
              <div className="Quote-Section-para">
                <p>-{data.photographerName?.split(' ')[0]}</p>

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

          

          {data?.awardHeadingMain && <AwardSection data={data}/>}
          <TestimonialSection data={data} />
        </div>



      </div>

      <div className='w-full h-[131vh] xl:h-[177vh]'>
        <CTASection data={data} />


        <div className='fixed w-full bottom-0 z-[-1]'>
          <Footer />
        </div>
      </div>



    </div>
  );
}