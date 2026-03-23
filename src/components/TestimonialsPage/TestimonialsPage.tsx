'use client';

import { useEffect, useRef, useCallback } from 'react';
import type { TestimonialsPageData } from '@/lib/mapTestimonialsData';
import './testimonials-page.css';

// ═══════════════════════════════════════════════════════════════════════════
// PROPS
// ═══════════════════════════════════════════════════════════════════════════
interface TestimonialsPageProps {
  data: TestimonialsPageData | null;
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export default function TestimonialsPage({ data }: TestimonialsPageProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const agencyRowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const agencyStickyRef = useRef<HTMLDivElement>(null);

  // Derive data with fallback to empty arrays
  const heroHeading = data?.heroHeading ?? 'WHAT OUR CLIENTS SAY.';
  const testimonials = data?.testimonials ?? [];
  const agencyClients = data?.agencyClients ?? [];

  // ─── GSAP Animations ──────────────────────────────────────────────────
  useEffect(() => {
    // Skip animations if no data
    if (!testimonials.length && !agencyClients.length) return;

    let cancelled = false;
    let ctx: any;

    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          // Hero heading slide up
          if (headingRef.current) {
            gsap.fromTo(
              headingRef.current,
              { y: 100, opacity: 0 },
              { y: 0, opacity: 1, duration: 1, delay: 0.4, ease: 'power2.out' }
            );
          }

          // Table container fade in
          if (tableContainerRef.current) {
            gsap.fromTo(
              tableContainerRef.current,
              { y: 60, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: 0.6,
                ease: 'power2.out',
              }
            );
          }

          // Testimonial rows stagger entrance on scroll
          const validRows = rowRefs.current.filter(Boolean) as HTMLDivElement[];
          if (validRows.length > 0) {
            validRows.forEach((row) => {
              gsap.fromTo(
                row,
                { y: 30, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.7,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: row,
                    start: 'top 90%',
                    once: true,
                  },
                }
              );
            });
          }

          // Agency rows stagger entrance on scroll
          const validAgencyRows = agencyRowRefs.current.filter(Boolean) as HTMLDivElement[];
          if (validAgencyRows.length > 0) {
            gsap.fromTo(
              validAgencyRows,
              { y: 20, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.06,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: validAgencyRows[0],
                  start: 'top 85%',
                  once: true,
                },
              }
            );
          }

          // Sticky heading for agencies on desktop
          if (agencyStickyRef.current && window.innerWidth > 1024) {
            ScrollTrigger.create({
              trigger: agencyStickyRef.current.parentElement,
              start: 'top -100px',
              end: '+=1700',
              pin: agencyStickyRef.current,
              pinSpacing: false,
            });
          }
        }, sectionRef);
      });
    });

    return () => {
      cancelled = true;
      if (ctx) ctx.revert();
    };
  }, [testimonials.length, agencyClients.length]);

  // ─── Mobile agency row tap toggle ─────────────────────────────────────
  const handleAgencyClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth > 1024) return;
    const row = e.currentTarget;
    row.classList.toggle('tp-active');
  }, []);

  // ─── Guard: render nothing meaningful if no data at all ───────────────
  if (!data) {
    return (
      <div className="tp-section">
        <div className="tp-hero">
          <h2 className="tp-hero-heading" style={{ opacity: 1 }}>
            WHAT OUR CLIENTS SAY.
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="tp-section">
      {/* ── Hero Heading ── */}
      <div className="tp-hero">
        <h2 ref={headingRef} className="tp-hero-heading">
          {heroHeading}
        </h2>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          DESKTOP TABLE
          ══════════════════════════════════════════════════════════════════ */}
      {testimonials.length > 0 && (
        <div ref={tableContainerRef} className="tp-table tp-table-container">
          {/* Header row */}
          <div className="tp-table-header">
            <div className="tp-table-header-cell">name</div>
            <div className="tp-table-header-cell">what&apos;s your impression?</div>
            <div className="tp-table-header-cell">Designation</div>
            <div className="tp-table-header-cell">Company</div>
          </div>

          {/* Testimonial rows */}
          {testimonials.map((t, i) => (
            <div
              key={`testimonial-${i}`}
              className="tp-row tp-row-anim"
              ref={(el) => { rowRefs.current[i] = el; }}
            >
              {/* Name + Logo */}
              <div className="tp-cell-name">
                <span className="tp-person-name">{t.name}</span>
                {t.logo && (
                  <img
                    className="tp-company-logo"
                    src={t.logo}
                    alt={t.company}
                    loading="lazy"
                    decoding="async"
                    width={300}
                    height={58}
                  />
                )}
              </div>

              {/* Quote */}
              <div className="tp-cell-quote">
                <p className="tp-quote-text">
                  {t.quote.split('\n\n').map((para, pi) => (
                    <span key={pi}>
                      {pi > 0 && <><br /><br /></>}
                      {para}
                    </span>
                  ))}
                </p>
              </div>

              {/* Designation */}
              <div className="tp-cell-designation">
                <span className="tp-designation-text">{t.designation}</span>
              </div>

              {/* Company */}
              <div className="tp-cell-company">
                <span className="tp-company-text">{t.company}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE CARDS (hidden on desktop)
          ══════════════════════════════════════════════════════════════════ */}
      {testimonials.length > 0 && (
        <div className="tp-mobile-cards">
          {testimonials.map((t, i) => (
            <div key={`mobile-${i}`} className="tp-mobile-card">
              {t.logo && (
                <img
                  className="tp-mobile-card-logo"
                  src={t.logo}
                  alt={t.company}
                  loading="lazy"
                  decoding="async"
                  width={300}
                  height={58}
                />
              )}
              <div className="tp-mobile-card-name">{t.name}</div>
              <p className="tp-mobile-card-quote">
                {t.quote.split('\n\n').map((para, pi) => (
                  <span key={pi}>
                    {pi > 0 && <><br /><br /></>}
                    {para}
                  </span>
                ))}
              </p>
              <div className="tp-mobile-card-role">{t.designation}</div>
              <div className="tp-mobile-card-company">{t.company}</div>
            </div>
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          AGENCY CLIENTS — "Top companies"
          ══════════════════════════════════════════════════════════════════ */}
      {agencyClients.length > 0 && (
        <div className="tp-agencies">
          {/* Sticky left column */}
          <div ref={agencyStickyRef} className="tp-agencies-sticky-col">
            <h2 className="tp-agencies-heading">Top companies</h2>
            <h3 className="tp-agencies-subheading">
              <a href="https://idc.co.nz">Agency Clients:</a>
            </h3>
          </div>

          {/* Scrolling agency list */}
          <div className="tp-agencies-list">
            {agencyClients.map((agency, i) => (
              <div
                key={`agency-${i}`}
                className="tp-agency-row tp-agency-anim"
                ref={(el) => { agencyRowRefs.current[i] = el; }}
                onClick={handleAgencyClick}
              >
                <div className="tp-agency-logo-wrap">
                  {agency.logo && (
                    <img
                      className="tp-agency-logo"
                      src={agency.logo}
                      alt={agency.name}
                      loading="lazy"
                      decoding="async"
                      width={300}
                      height={58}
                    />
                  )}
                </div>
                <span className="tp-agency-name">{agency.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}