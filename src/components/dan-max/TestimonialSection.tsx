// ============================================
// FILE: components/dan-max/TestimonialSection.tsx
// ============================================
// Changes: rating image uses loading="lazy" and decoding="async"

'use client';

import TextReveal from '@/components/animations/TextReveal';
import { useLazyLoad } from '@/hooks/useLazyLoad';
import '../../styles/TestimonialSection.css';



export default function TestimonialSection({ data }: { data: any }) {
  const { ref, isVisible } = useLazyLoad({ threshold: 0.2 });

  if (!data) return null;

  return (
    <div ref={ref} className="testimonial-section">
      {isVisible && (
        <>
          {/* Clients Section */}
          <div className="Clients-Section">
            <TextReveal className="text-reveal">
              <p className="client-nz">
                {data.section4Paragraph1}
              </p>
              <div>
                <h1 className="color-transition-text">
                  {data.section4Heading1}

                </h1>
              </div>

              <h6>
                - {data.photographerName}
              </h6>
            </TextReveal>

            <div className="testimonial-box">
              <div className='testimonial-box-row1'>

                <div className='testimonial-box-row1-inner1'>
                  <div className='testimonial-pic testimonial-pic1'>
                    <img src={data.section4Img1.sourceUrl} alt="" />
                  </div>
                  <div className='testimonial-pic testimonial-pic2'>
                    <img src={data.section4Img2.sourceUrl} alt="" />

                  </div>
                  <div className='testimonial-pic testimonial-pic3'>
                    <img src={data.section4Img3.sourceUrl} alt="" />

                  </div>
                </div>

                <div className='testimonial-box-row1-inner2'>
                  <div className='testimonial-pic testimonial-pic4'>
                    <img src={data.section4Img4.sourceUrl} alt="" />
                  </div>
                  <div className='testimonial-pic testimonial-pic5'>
                    <img src={data.section4Img5.sourceUrl} alt="" />
                  </div>
                  <div className='testimonial-pic testimonial-pic6'>
                    <img src={data.section4Img6.sourceUrl} alt="" />
                  </div>
                </div>

              </div>

              <div className='testimonial-box-row2'>

                <div className='testimonial-box-row2-inner1'>
                  <div className='testimonial-pic testimonial-pic7'>
                    <img src={data.section4Img7.sourceUrl} alt="" />
                  </div>
                  <div className='testimonial-pic testimonial-pic8'>
                    <img src={data.section4Img8.sourceUrl} alt="" />

                  </div>
                  <div className='testimonial-pic testimonial-pic9'>
                    <img src={data.section4Img9.sourceUrl} alt="" />

                  </div>
                </div>


                <div className='testimonial-box-row2-inner2'>
                  <div className='testimonial-pic testimonial-pic10'>
                    <img src={data.section4Img10.sourceUrl} alt="" />
                  </div>
                  <div className='testimonial-pic testimonial-pic11'>
                    <img src={data.section4Img11.sourceUrl} alt="" />
                  </div>
                  <div className='testimonial-pic testimonial-pic12'>
                    <img src={data.section4Img12.sourceUrl} alt="" />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Testimonial */}
          <TextReveal className="Testimonial-textreveal">
            <p className="client-nz">
              {data.section5Paragraph}
            </p>

            <h1 className="testimonial-heading color-transition-text ">
              {data.section5Heading}
            </h1>

            <img
              src={data.section5Image.sourceUrl}
              alt="Rating"
              loading="lazy"
              decoding="async"
              width="150"
              height="30"
            />

            <h6 className="color-transition-text ">
              {data.section5Paragraph2}
            </h6>

            <div className="mt-[3vw]">
              <h5>
                {data.section5Paragraph3}
              </h5>
              <h4 className="color-transition-text ">
                {data.section5Paragraph4}
              </h4>
            </div>
          </TextReveal>
        </>
      )}
    </div>
  );
}