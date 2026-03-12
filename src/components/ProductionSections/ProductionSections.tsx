'use client';

import { useEffect, useRef, useState } from 'react';
import './production.css';
import AccordianSection from './AccordianSection';
import ProductionApproach from './ProductionApproach';

// ─── Hardcoded data (replace with API data later) ────────────────────────
const HERO_DATA = {
  videoUrl: 'https://player.vimeo.com/video/1008670231?muted=1&autoplay=1&loop=1&background=1&app_id=122963',
  heading: 'IDC',
  subHeading1: 'PRODUCING',
  subHeading2: 'RESULTS',
  infoItems: [
    'Since 1999',
    'top rated',
    'Photography + Productiion',
    'Auckland, NZ',
  ],
};

const CONTENT_DATA = {
  heading: 'Your Vision, Our Expertise: World-Class Photography Production in New Zealand',
  paragraph:
    'Whether your project requires full production support, partial assistance, or line production, IDC delivers the flexibility and precision your team needs. From remote collaboration to on-location shoots across New Zealand\'s breathtaking landscapes, we adapt our services to align with your creative goals. With over 25 years of international experience, IDC has built its reputation on excellence, reliability, and clear communication at every stage of production. For international photographers, art directors, and creative teams, we\'re your trusted local partner for world-class photography production in New Zealand.',
  ctaText: 'Testimonials',
  ctaHref: '/testimonials',
};

export default function ProductionSections() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingsRef = useRef<HTMLHeadingElement[]>([]);
  const contentHeadingRef = useRef<HTMLHeadingElement>(null);
  const contentParaRef = useRef<HTMLParagraphElement>(null);
  const contentCtaRef = useRef<HTMLAnchorElement>(null);
  const infoBarRef = useRef<HTMLDivElement>(null);
  const [animReady, setAnimReady] = useState(false);

  // ─── Hero text animation (GSAP) ────────────────────────────────────
  useEffect(() => {
    let tl: any;
    let cancelled = false;

    import('gsap').then(({ gsap }) => {
      if (cancelled) return;

      // Hide elements before animation
      if (headingRef.current) {
        gsap.set(headingRef.current, { y: 80, opacity: 0 });
      }
      subHeadingsRef.current.forEach((el) => {
        if (el) gsap.set(el, { y: 40, opacity: 0 });
      });
      if (infoBarRef.current) {
        gsap.set(infoBarRef.current, { y: 20, opacity: 0 });
      }

      setAnimReady(true);

      tl = gsap.timeline({ delay: 0.3 });

      // IDC heading slides up
      tl.to(headingRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      });

      // PRODUCING / RESULTS slides up
      tl.to(
        subHeadingsRef.current,
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' },
        '-=0.5'
      );

      // Info bar fades in
      tl.to(
        infoBarRef.current,
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );
    });

    return () => {
      cancelled = true;
      if (tl) tl.kill();
    };
  }, []);

  // ─── Content section scroll animation ──────────────────────────────

  useEffect(() => {
    let cancelled = false;

    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        const targets = [contentHeadingRef.current, contentParaRef.current, contentCtaRef.current].filter(Boolean);

        targets.forEach((el, i) => {
          gsap.fromTo(
            el,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: i * 0.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                once: true,
              },
            }
          );
        });
      });
    });

    return () => { cancelled = true; };
  }, []);

  const addSubRef = (el: HTMLHeadingElement | null) => {
    if (el && !subHeadingsRef.current.includes(el)) {
      subHeadingsRef.current.push(el);
    }
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 — HERO (Video + IDC + PRODUCING RESULTS)
          ═══════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="prod-hero">

        <img
          className="prod-hero__poster"
          src="https://idc.yp-studio.com/media/2025/04/04073441/Sacha_Stejko_IDC_TBWA_Anchor_MakeAmazing_Woman_Pouring_Cream_A_optimized.jpg"
          alt="IDC Production"
          loading="eager"
          fetchPriority="high"
        />


        <iframe
          className="prod-hero__video"
          src="https://player.vimeo.com/video/1008670231?muted=1&autoplay=1&loop=1&background=1&app_id=122963"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
          title="IDC TBWA BTS with ANCHOR Make Amazing"
          data-ready="true"
        />

        {/* Gradient overlay */}
        <div className="prod-hero__overlay" />

        {/* Main heading — bottom left */}
        <h1 ref={headingRef} className="prod-hero__heading blend-text">
          {HERO_DATA.heading}
        </h1>

        {/* Sub headings — bottom right */}
        <div className="prod-hero__subheadings blend-text">
          <h2 ref={addSubRef} className="prod-hero__subheading">
            {HERO_DATA.subHeading1}
          </h2>
          <h2 ref={addSubRef} className="prod-hero__subheading">
            {HERO_DATA.subHeading2}
          </h2>
        </div>

        {/* Info bar — top strip */}

      </section>

      <div>
        <div ref={infoBarRef} className="prod-hero__infobar content__inner">
          {HERO_DATA.infoItems.map((item, i) => (
            <h5 key={i} className="prod-hero__info-item">{item}</h5>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 — CONTENT (Heading + Paragraph + CTA)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="prod-content">
        <div className="prod-content__inner">
          <h1 ref={contentHeadingRef} className="prod-content__heading">
            {CONTENT_DATA.heading}
          </h1>

          <p ref={contentParaRef} className="prod-content__paragraph">
            {CONTENT_DATA.paragraph}
          </p>

          <a
            ref={contentCtaRef}
            href={CONTENT_DATA.ctaHref}
            className="prod-content__cta blend-text"
          >
            <span className="prod-content__cta-text">{CONTENT_DATA.ctaText}</span>
            <span className="prod-content__cta-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 375 374.999991"
                width="500"
                height="500"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <clipPath id="prod-arrow">
                    <path
                      d="M 0 4.464844 L 370.5 4.464844 L 370.5 374.964844 L 0 374.964844 Z"
                      clipRule="nonzero"
                    />
                  </clipPath>
                </defs>
                <g clipPath="url(#prod-arrow)">
                  <path
                    fill="#ffffff"
                    d="M 370.527344 4.464844 L 370.527344 374.625 L 296.4375 374.625 L 296.4375 130.9375 L 52.386719 374.988281 L 0 322.597656 L 244.050781 78.550781 L 0.363281 78.550781 L 0.363281 4.464844 Z M 370.527344 4.464844"
                    fillOpacity="1"
                    fillRule="nonzero"
                  />
                </g>
              </svg>
            </span>
          </a>
        </div>
      </section>


     

      <ProductionApproach/>



      <div>
        <AccordianSection />
      </div>
    </>
  );
}