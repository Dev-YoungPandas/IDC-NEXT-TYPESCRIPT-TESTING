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

    console.log(data.photographerName, "data in ctasection page")

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const marqueeText = data?.danMarquee;
  const bgImage = data?.marqueeImage?.sourceUrl || 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=1470&auto=format&fit=crop';


  return (

    <div className='ctasection-parent'>
      <div className='marqueeTopLine'>
        <img className='marqueeTopLine-Image' src={data?.marqueeTopLineImage?.sourceUrl || "https://idc.co.nz/headless/wp-content/uploads/2025/03/IDC-top.svg"} alt="marqueeTopLineImage" />

      </div>
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

            <div className='productionpage-marquee-data1'>
              <div className='production-center-align production-testimonial-marqueeHeading'>
                <h1 className=''>{data?.productionMarqueeHeading}</h1>
              </div>



            </div>

            <div className='productionpage-marquee-data2'>
              <div className='production-center-align productionTestimonialMarqueeParagraph'>
                <p>
                  {data?.productionMarqueeParagraph}
                </p>

              </div>

            </div>


            <div className={`ctasection-photographer-name ${data?.productionMarqueeContact ? 'ctasection-photographer-name--production' : ''}`}>
              <div className='ctasection-photographer-name-inner'>
                {/* <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="500" viewBox="0 0 375 374.999991" height="500" preserveAspectRatio="xMidYMid meet"><defs><clipPath id="430d2caef3"><path d="M 40.539062 40.539062 L 334.539062 40.539062 L 334.539062 334.539062 L 40.539062 334.539062 Z M 40.539062 40.539062 " clipRule="nonzero"></path></clipPath></defs><g clipPath="url(#430d2caef3)"><path fill="#ffffff" d="M 334.449219 40.539062 L 334.449219 334.160156 L 275.679688 334.160156 L 275.679688 140.859375 L 82.09375 334.445312 L 40.539062 292.890625 L 234.125 99.308594 L 40.828125 99.308594 L 40.828125 40.539062 Z M 334.449219 40.539062 " fillOpacity="1" fillRule="nonzero"></path></g></svg> */}
                {/* <h1 className='marquee-photographer-name'>{data.photographerName.split(' ')[0]}'S WEBSITE</h1> */}
                 {data?.photographerName ? <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="500" viewBox="0 0 375 374.999991" height="500" preserveAspectRatio="xMidYMid meet"><defs><clipPath id="430d2caef3"><path d="M 40.539062 40.539062 L 334.539062 40.539062 L 334.539062 334.539062 L 40.539062 334.539062 Z M 40.539062 40.539062 " clipRule="nonzero"></path></clipPath></defs><g clipPath="url(#430d2caef3)"><path fill="#ffffff" d="M 334.449219 40.539062 L 334.449219 334.160156 L 275.679688 334.160156 L 275.679688 140.859375 L 82.09375 334.445312 L 40.539062 292.890625 L 234.125 99.308594 L 40.828125 99.308594 L 40.828125 40.539062 Z M 334.449219 40.539062 " fillOpacity="1" fillRule="nonzero"></path></g></svg> : <svg aria-hidden="true" fill='white' className="e-font-icon-svg e-fas-arrow-right" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path></svg>} 

                <h1 className='marquee-photographer-name'>{data?.photographerName ? data?.photographerName?.split(' ')[0] || 'OUR S WEBSITE' : data?.productionMarqueeContact}</h1>


              </div>
            </div>

            <img
              className='ctasection-bg-image'
              src={bgImage ? bgImage : data.productionBgImage}
              alt="Portfolio request background"
            />
          </>
        )}productionBgImage
      </div>

      <div className='marqueeBottomLine'>
        <img src={data?.marqueeBottomLineImage?.sourceUrl || "https://idc.co.nz/headless/wp-content/uploads/2025/03/IDC-bottom.svg"} alt="marqueeBottomLineImage" />

      </div>

    </div>
  );
}