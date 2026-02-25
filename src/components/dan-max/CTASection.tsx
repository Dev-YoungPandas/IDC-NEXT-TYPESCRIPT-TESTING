'use client'

import Marquee from 'react-fast-marquee';
import { useLazyLoad } from '@/hooks/useLazyLoad';
import "../../styles/ctasection.css"
import { useEffect, useState } from 'react';

export default function CTASection({ data }: { data?: any }) {
  const { ref, isVisible } = useLazyLoad({ threshold: 0.1 });
  const [marqueeSpeed, setMarqueeSpeed] = useState(150);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setMarqueeSpeed(window.innerWidth <= 740 ? 60 : 150);
      }, 200);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const marqueeText = data?.danMarquee || 'REQUEST PORTFOLIO';
  const bgImage = data?.marqueeImage?.sourceUrl || 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=1470&auto=format&fit=crop';

  return (
    <div ref={ref} className="ctasection">
      {isVisible && (
        <>
          <Marquee
            direction="right"
            speed={marqueeSpeed}
            className="marquee"
            autoFill={true}
          >
            <span className="marquee-item uppercase">{marqueeText}</span>
          </Marquee>

          <img
            src={bgImage}
            alt="Portfolio request background"
          />
        </>
      )}
    </div>
  );
}