'use client';

import TextReveal from '@/components/animations/TextReveal';
import { useLazyLoad } from '@/hooks/useLazyLoad';
import '../../styles/TestimonialSection.css';

export default function TestimonialSection({ data }: { data: any }) {
  const { ref, isVisible } = useLazyLoad({ threshold: 0.2 });

  if (!data) return null;

  // console.log(data.section5Paragraph3Name, "section5Paragraph3Name")

  // Collect all testimonial images dynamically
  const testimonialImages: { sourceUrl: string; altText?: string }[] = [];
  let i = 1;
  while (data[`section4Img${i}`]?.sourceUrl) {
    testimonialImages.push(data[`section4Img${i}`]);
    i++;
  }

  return (
    <div ref={ref} className="testimonial-section">
      {isVisible && (
        <>
          <div className="Clients-Section">
            <TextReveal className="text-reveal">
              <p className="client-nz">{data.section4Paragraph1}</p>
              <div>
                <h1 className="color-transition-text">{data.section4Heading1}</h1>
              </div>
              <h6>- {data.photographerName}</h6>
            </TextReveal>

            {testimonialImages.length > 0 && (
              <div className="testimonial-grid">
                {testimonialImages.map((img, idx) => (
                  <div key={idx} className="testimonial-grid-item">
                    <img
                      src={img.sourceUrl}
                      alt={img.altText || ''}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <TextReveal className="Testimonial-textreveal">
            <p className="client-nz">{data.section5Paragraph}</p>

            <h1 className="testimonial-heading color-transition-text">
              {data.section5Heading}
            </h1>

            {data.section5Image?.sourceUrl && (
              <img
                src={data.section5Image.sourceUrl}
                alt="Rating"
                loading="lazy"
                decoding="async"
                width="150"
                height="30"
              />
            )}

            <h6 className="color-transition-text">{data.section5Paragraph2}</h6>

            <div className="testimonial-bottom-text">
              <h5>{data.section5Paragraph3}</h5>
              <h4 className="color-transition-text">{data.section5Paragraph4}</h4>
            </div>
          </TextReveal>
        </>
      )}
    </div>
  );
}