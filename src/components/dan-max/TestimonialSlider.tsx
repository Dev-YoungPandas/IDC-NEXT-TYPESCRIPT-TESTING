'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import '../../styles/testimonial-slider.css';

/* ─────────────────────────────────────────────
   Types
   ───────────────────────────────────────────── */
interface SlideItem {
  keyword: string;
  text: string;
  authorName: string;
  authorRole: string;
}

interface TestimonialSliderProps {
  data: any;
}

/* ─────────────────────────────────────────────
   Extract slides from API data
   Handles 1–3 slides, skips empty entries
   ───────────────────────────────────────────── */
function extractItems(data: any): SlideItem[] {
  if (!data) return [];
  const raw: SlideItem[] = [
    {
      keyword: data.h4 || '',
      text: data.section5Paragraph2 || '',
      authorName: data.section5AuthorName2 || '',
      authorRole: data.section5AuthorRole2 || '',
    },
    {
      keyword: data.h5 || '',
      text: data.section5Paragraph3Data3 || '',
      authorName: data.section5AuthorName3 || '',
      authorRole: data.section5AuthorRole3 || '',
    },
    {
      keyword: data.h6 || '',
      text: data.section5Paragraph4Data4 || '',
      authorName: data.section5AuthorName4 || '',
      authorRole: data.section5AuthorRole4 || '',
    },
  ];
  return raw.filter((item) => item.text || item.keyword);
}

/* ─────────────────────────────────────────────
   Component
   ───────────────────────────────────────────── */
export default function TestimonialSlider({ data }: TestimonialSliderProps) {
  const items = useMemo(() => extractItems(data), [data]);
  const total = items.length;

  const [current, setCurrent] = useState(0);
  const [animClass, setAnimClass] = useState('ts-visible');
  const [displayIndex, setDisplayIndex] = useState(0);

  const lockRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);

  /* ── Transition logic ── */
  const transitionTo = useCallback(
    (nextIdx: number, dir: 'next' | 'prev' = 'next') => {
      if (lockRef.current || total <= 1) return;
      lockRef.current = true;

      // Exit
      setAnimClass(dir === 'next' ? 'ts-exit-left' : 'ts-exit-right');

      setTimeout(() => {
        setCurrent(nextIdx);
        setDisplayIndex(nextIdx);
        // Snap to enter position (no transition)
        setAnimClass(dir === 'next' ? 'ts-enter-right' : 'ts-enter-left');

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setAnimClass('ts-visible');
            setTimeout(() => {
              lockRef.current = false;
            }, 480);
          });
        });
      }, 420);
    },
    [total]
  );

  const goNext = useCallback(() => {
    transitionTo((current + 1) % total, 'next');
  }, [current, total, transitionTo]);

  const goPrev = useCallback(() => {
    transitionTo((current - 1 + total) % total, 'prev');
  }, [current, total, transitionTo]);

  /* ── Autoplay ── */
  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (total <= 1) return;
    timerRef.current = setInterval(() => {
      if (!pausedRef.current && !lockRef.current) goNext();
    }, 4000);
  }, [total, goNext]);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoplay]);

  const handleNext = () => {
    goNext();
    startAutoplay();
  };

  const handlePrev = () => {
    goPrev();
    startAutoplay();
  };

  if (total === 0) return null;

  const slide = items[current];

  return (
    <section
      className="ts-section"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => {
        pausedRef.current = false;
        startAutoplay();
      }}
    >
      {/* Top label */}
      <p className="ts-label">WHAT CLIENTS SAY</p>

      {/* Main heading */}
      <h2 className="ts-main-heading">TESTIMONIALS</h2>

      {/* Yellow dot accent */}
      <div className="ts-yellow-dot" />

      {/* Animated slide content */}
      <div className={`ts-slide-area ${animClass}`}>
        {slide.keyword && <h3 className="ts-keyword">{slide.keyword}</h3>}
        {slide.text && <p className="ts-text">{slide.text}</p>}
        <div className="ts-author">
          {slide.authorName && (
            <p className="ts-author-name">- {slide.authorName}</p>
          )}
          {slide.authorRole && (
            <p className="ts-author-role">{slide.authorRole}</p>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="ts-bottom-bar">
        {total > 1 && (
          <div className="ts-arrows">
            <button
              className="ts-arrow-btn"
              onClick={handlePrev}
              aria-label="Previous testimonial"
            >
              <svg width="36" height="16" viewBox="0 0 36 16" fill="none">
                <path d="M8 1L1 8L8 15" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="1" y1="8" x2="35" y2="8" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
            <button
              className="ts-arrow-btn"
              onClick={handleNext}
              aria-label="Next testimonial"
            >
              <svg width="36" height="16" viewBox="0 0 36 16" fill="none">
                <path d="M28 1L35 8L28 15" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="35" y1="8" x2="1" y2="8" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        )}

        {total > 1 && (
          <div className="ts-counter">
            <span className="ts-counter-text">
              {displayIndex + 1} / {total}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}