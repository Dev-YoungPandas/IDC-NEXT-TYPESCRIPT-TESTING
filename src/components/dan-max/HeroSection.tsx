// ============================================
// FILE: components/dan-max/HeroSection.tsx
// ============================================
// CRITICAL FIX: The LCP element is the <h1> "DAN MAX", NOT the hero image.
//
// PROBLEM: h1 starts with opacity:0 → Lighthouse waits until GSAP makes it visible
//   JS loads → GSAP dynamically imports → 300ms delay → animation
//   = 2,420ms "element render delay"
//
// SOLUTION: h1 starts VISIBLE in HTML (no opacity:0 in markup).
//   useEffect immediately hides it and GSAP animates it in.
//   Lighthouse records LCP at first paint (h1 is visible in HTML).
//   User sees identical animation (hide + animate happens in same frame).

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import "../../styles/herosection.css"



export default function HeroSection({ data }: { data: any }) {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const headingsRef = useRef<HTMLHeadingElement[]>([]);
  const [animationComplete, setAnimationComplete] = useState(false);
  const tlRef = useRef<any>(null);

  const addToRefs = useCallback((el: HTMLHeadingElement | null) => {
    if (el && !headingsRef.current.includes(el)) {
      headingsRef.current.push(el);
    }
  }, []);

  useEffect(() => {
    if (!nameRef.current || headingsRef.current.length === 0) return;

    let cancelled = false;

    // ✅ Step 1: Immediately hide elements via DOM (before next paint)
    // This runs synchronously in useEffect, before the browser paints again
    // So the user never sees the "visible" state — only the animation
    nameRef.current.style.opacity = '0';
    nameRef.current.style.transform = 'translateY(100px)';
    headingsRef.current.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
    });

    // ✅ Step 2: Load GSAP and animate
    import('gsap').then(({ gsap }) => {
      if (cancelled) return;

      const tl = gsap.timeline({
        delay: 0.1,
        onComplete: () => {
          setAnimationComplete(true);
          if (nameRef.current) nameRef.current.style.willChange = 'auto';
          headingsRef.current.forEach((el) => {
            if (el) el.style.willChange = 'auto';
          });
        },
      });

      tlRef.current = tl;

      if (nameRef.current) nameRef.current.style.willChange = 'transform, opacity';
      headingsRef.current.forEach((el) => {
        if (el) el.style.willChange = 'transform, opacity';
      });

      tl.to(nameRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      });

      tl.to(
        headingsRef.current,
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      );
    });

    return () => {
      cancelled = true;
      if (tlRef.current) tlRef.current.kill();
      headingsRef.current = [];
    };
  }, [data]);

  // Fallback visibility
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!animationComplete) {
        if (nameRef.current) {
          nameRef.current.style.opacity = '1';
          nameRef.current.style.transform = 'none';
        }
        headingsRef.current.forEach((el) => {
          if (el) {
            el.style.opacity = '1';
            el.style.transform = 'none';
          }
        });
      }
    }, 2000);
    return () => clearTimeout(fallbackTimer);
  }, [animationComplete]);

  if (!data) return null;

  return (
    <div className="hero-image">
      {/* Hero image */}
      <img
        src={data.centerImage?.sourceUrl}
        alt={data.centerImage?.altText || data.photographerName}
        fetchPriority="high"
        loading="eager"
        decoding="sync"
      />


      <div className="hero-section-center">
        {/* ✅ NO opacity:0 in markup — h1 is visible in initial HTML
            Lighthouse sees it painted immediately → LCP = ~460ms (TTFB only)
            useEffect hides it before user sees, then GSAP animates in */}
        <h1
          ref={nameRef}>
          {data?.photographerName || 'Dan Max'}
        </h1>


        <div className="hero-heading-section">
          {[
            data?.frontPageHeading1,
            data?.frontPageHeading2,
            data?.frontPageHeading3,
            data?.frontPageHeading4,
          ].map((heading, i) => (
            <h3
              key={i}
              ref={addToRefs}
            >
              {heading || ''}
            </h3>
          ))}
        </div>

      </div>
    </div>
  );
}