'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useLazyLoad } from '@/hooks/useLazyLoad';
import './TestimonialProductionSection.css';

// ─── GraphQL Query ────────────────────────────────────────────────────────────
const GET_PRODUCTION_TESTIMONIAL_QUERY = `
  query GetProductionTestimonial {
    pageBy(uri: "/production/") {
      id
      title
      slug
      productionPageData {
        productionTestimonialHeading
        productionTestimonialParagraph1
        productionTestimonialPara1Role1
        productionTestimonialPara1Name1
        productionTestimonialParagraph2
        productionTestimonialPara2Role2
        productionTestimonialPara2Name2
        productionTestimonialParagraph3
        productionTestimonialPara3Role3
        productionTestimonialPara3Name3
        productionTestimonialParagraph4
      }
    }
  }
`;

// ─── Types ────────────────────────────────────────────────────────────────────
interface ProdTestimonialSlide {
  quote: string;
  name: string;
  role: string;
}

interface ProductionTestimonialData {
  productionTestimonialHeading?: string;
  productionTestimonialParagraph1?: string;
  productionTestimonialPara1Role1?: string;
  productionTestimonialPara1Name1?: string;
  productionTestimonialParagraph2?: string;
  productionTestimonialPara2Role2?: string;
  productionTestimonialPara2Name2?: string;
  productionTestimonialParagraph3?: string;
  productionTestimonialPara3Role3?: string;
  productionTestimonialPara3Name3?: string;
  productionTestimonialParagraph4?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function TestimonialProductionSection() {
  const { ref, isVisible } = useLazyLoad({ threshold: 0.2 });

  // const [data, setData] = useState<ProductionTestimonialData | null>(null);
  const [data, setData] = useState<ProductionTestimonialData | null>(null);

  const [loading, setLoading] = useState(true);

  // ─── Fetch data ─────────────────────────────────────────────────────────
  useEffect(() => {
    fetch('https://idc.co.nz/headless/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: GET_PRODUCTION_TESTIMONIAL_QUERY }),
    })
      .then((res) => res.json())
      .then((result) => {

        const pageData = result?.data?.pageBy?.productionPageData;
        console.log('pageData:', pageData); // ADD THIS
        if (pageData) {
          setData(pageData);
          console.log('setData called with:', pageData); // ADD THIS
        }
      })
      .catch((err) => console.error('Production testimonial fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  // ─── Build slides from fields ────────────────────────────────────────────
  const allSlides: ProdTestimonialSlide[] = data
    ? [
      {
        quote: data.productionTestimonialParagraph1 || '',
        name: data.productionTestimonialPara1Name1 || '',
        role: data.productionTestimonialPara1Role1 || '',
      },
      {
        quote: data.productionTestimonialParagraph2 || '',
        name: data.productionTestimonialPara2Name2 || '',
        role: data.productionTestimonialPara2Role2 || '',
      },
      {
        quote: data.productionTestimonialParagraph3 || '',
        name: data.productionTestimonialPara3Name3 || '',
        role: data.productionTestimonialPara3Role3 || '',
      },
    ]
    : [];

  // Only keep slides that have at least a quote or name
  const slides = allSlides.filter((s) => s.quote.trim() || s.name.trim());
  const totalSlides = slides.length;
  const isSlider = totalSlides > 1;

  // ─── Slider state ────────────────────────────────────────────────────────
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [incomingIndex, setIncomingIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const [phase, setPhase] = useState<'idle' | 'animating'>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearAuto = useCallback(() => {
    if (autoRef.current) {
      clearInterval(autoRef.current);
      autoRef.current = null;
    }
  }, []);

  const animate = useCallback(
    (dir: 'left' | 'right') => {
      if (phase === 'animating' || !isSlider) return;

      const next =
        dir === 'left'
          ? (currentIndex + 1) % totalSlides
          : (currentIndex - 1 + totalSlides) % totalSlides;

      setDirection(dir);
      setIncomingIndex(next);
      setPhase('animating');

      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        setCurrentIndex(next);
        setDisplayIndex(next);
        setIncomingIndex(null);
        setPhase('idle');
      }, 500);
    },
    [phase, currentIndex, totalSlides, isSlider]
  );

  // ─── Auto-play ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isVisible || !isSlider) return;
    autoRef.current = setInterval(() => animate('left'), 3000);
    return () => clearAuto();
  }, [isVisible, animate, clearAuto, isSlider]);

  const handlePrev = useCallback(() => {
    if (phase === 'animating' || !isSlider) return;
    clearAuto();
    animate('right');
    autoRef.current = setInterval(() => animate('left'), 3000);
  }, [phase, clearAuto, animate, isSlider]);

  const handleNext = useCallback(() => {
    if (phase === 'animating' || !isSlider) return;
    clearAuto();
    animate('left');
    autoRef.current = setInterval(() => animate('left'), 3000);
  }, [phase, clearAuto, animate, isSlider]);

  // ─── Cleanup ─────────────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      clearAuto();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [clearAuto]);

  // ─── CSS class helpers ───────────────────────────────────────────────────
  const currentClass =
    phase === 'animating'
      ? direction === 'left'
        ? 'pt-slide-exit-left'
        : 'pt-slide-exit-right'
      : 'pt-slide-active';

  const incomingClass =
    direction === 'left' ? 'pt-slide-enter-from-right' : 'pt-slide-enter-from-left';

  // ─── Render single slide content ─────────────────────────────────────────
  const renderSlide = (index: number) => (
    <>
      <h6 className="pt-color-text">{slides[index]?.quote}</h6>
      <div className="pt-slide-bottom">
                <h4 className="pt-color-text">{slides[index]?.role}</h4>

        <h5>{slides[index]?.name}</h5>
      </div>
    </>
  );

  if (loading || !data || slides.length === 0) return null;

  return (
    <div ref={ref} className="pt-section">
      {(
        <>

          <div>

            {/* ── Heading ─────────────────────────────────────────────── */}
            {data.productionTestimonialHeading && (
              <div className="pt-heading-wrap">
                <h1 className="pt-heading pt-color-text">
                  {data.productionTestimonialHeading}
                </h1>
              </div>
            )}



            {/* ── Slider ──────────────────────────────────────────────── */}
            <div className="pt-slider">
              <div className="pt-carousel">
                <div className="pt-carousel-container">

                  {/* Current slide */}
                  <div
                    className={`pt-slide ${isSlider ? currentClass : 'pt-slide-active'}`}
                    key={`current-${displayIndex}`}
                  >
                    {renderSlide(displayIndex)}
                  </div>

                  {/* Incoming slide (only during animation) */}
                  {isSlider && phase === 'animating' && incomingIndex !== null && (
                    <div
                      className={`pt-slide ${incomingClass}`}
                      key={`incoming-${incomingIndex}`}
                    >
                      {renderSlide(incomingIndex)}
                    </div>
                  )}

                </div>
              </div>

              {/* ── Arrows + counter (only if more than 1 slide) ──────── */}
              {isSlider && (
                <div className="pt-arrow-parent">
                  <div className="pt-arrow">

                    <button
                      onClick={handlePrev}
                      className="pt-arrow-btn"
                      aria-label="Previous testimonial"
                      type="button"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62.23 20.12">
                        <line x1="2.4" y1="10.06" x2="61.23" y2="10.06" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        <path fill="white" d="M16.07,19.66c.3-.46.16-1.08-.31-1.38L2.86,10.06,15.77,1.84c.47-.3.6-.92.31-1.38-.3-.46-.92-.6-1.38-.31L.46,9.22c-.29.18-.46.5-.46.84s.17.66.46.84l14.23,9.06c.17.11.35.16.54.16.33,0,.65-.16.84-.46Z" />
                      </svg>
                    </button>

                    <button
                      onClick={handleNext}
                      className="pt-arrow-btn"
                      aria-label="Next testimonial"
                      type="button"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62.23 20.12">
                        <line x1="59.83" y1="10.06" x2="1" y2="10.06" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        <path fill="white" d="M46.16.46c-.3.46-.16,1.08.31,1.38l12.91,8.22-12.91,8.22c-.47.3-.6.92-.31,1.38.3.46.92.6,1.38.31l14.23-9.06c.29-.18.46-.5.46-.84s-.17-.66-.46-.84L47.54.16c-.17-.11-.35-.16-.54-.16-.33,0-.65.16-.84.46Z" />
                      </svg>
                    </button>

                  </div>

                  <div className="pt-slider-number">
                    <p className="pt-slider-count">
                      {displayIndex + 1}/{totalSlides}
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>

        </>
      )}
    </div>
  );
}