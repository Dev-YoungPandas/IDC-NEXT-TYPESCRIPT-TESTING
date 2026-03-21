'use client';

import { useEffect, useRef, useCallback } from 'react';
import './testimonials-page.css';

// ═══════════════════════════════════════════════════════════════════════════
// DATA — Testimonials
// ═══════════════════════════════════════════════════════════════════════════
const TESTIMONIALS = [
  {
    name: 'Haidee Wallace',
    logo: 'https://idc.yp-studio.com/media/2025/03/05110110/IDC-Photographers-brand-work-logos-6-1.png',
    quote:
      'IDC provided us with the perfect photographer, an amazing production crew with a high caliber of creative and organizational skills, and a stunning location. Michele and her team are a pleasure to work with. The final output shifted our client\'s brand to a whole new level.',
    designation: 'Account Director',
    company: 'Dow Goodfolk',
  },
  {
    name: 'Breigh Sutherland',
    logo: 'https://idc.yp-studio.com/media/2025/03/05110110/IDC-Photographers-brand-work-logos-7.png',
    quote:
      '...you guys were such an incredible stellar team, managing the agency and facilitating your needs seamlessly. I know we\'ll be working together soon as I\'ll absolutely be recommending you guys and of course the amazing Sacha for future projects.',
    designation: 'Executive Producer',
    company: 'Chirp Films',
  },
  {
    name: 'Paola Dashwood',
    logo: 'https://idc.yp-studio.com/media/2025/03/05110110/IDC-Photographers-brand-work-logos-8.png',
    quote:
      'A delight to deal with from day one. Highly organized, totally engaged in the task and utterly committed to a great outcome for all involved.',
    designation: 'Account Director',
    company: 'P and P Dashwood',
  },
  {
    name: 'Andrew Hook',
    logo: 'https://idc.yp-studio.com/media/2025/03/05110110/IDC-Photographers-brand-work-logos-9.png',
    quote:
      'Michele has always been totally committed to getting the job done right, and delivering excellent results every time, on every project.',
    designation: 'Executive Creative Director',
    company: 'Havas Worldwide',
  },
  {
    name: 'Sebastian Kim',
    logo: 'https://idc.yp-studio.com/media/2025/03/05110110/IDC-Photographers-brand-work-logos-10.png',
    quote:
      'There were so many production hurdles and logistics to overcome, but I was fortunate enough to have Michele produce the project without a hitch.',
    designation: 'Founder',
    company: 'New York photographer Jack + Jones',
  },
  {
    name: 'Sylvia Pérez',
    logo: 'https://idc.yp-studio.com/media/2025/03/11111123/IDC-Photographers-brand-work-logos-17.png',
    quote:
      'I really value great partnerships, and my relationship with Michele and IDC Worldwide is one I hold dear. Michele is solutions-focused, deeply cares about the photographers she represents, and always goes above and beyond to deliver. Her attention to detail and thoroughness are next level- this is from start to finish.\n\nI\'ve had the pleasure (and honour) of working with a few IDC photographers, all of whom are passionate about their craft and great to collaborate with. It\'s been an absolute joy working with them, and I\'m looking forward to many more projects together.',
    designation: 'Business Director',
    company: 'Misterwolf',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// DATA — Agency Clients
// ═══════════════════════════════════════════════════════════════════════════
const AGENCY_CLIENTS = [
  { name: 'McCann Healthcare New York', logo: 'https://idc.yp-studio.com/media/2025/02/05104954/9.png' },
  { name: 'Colenso BBDO New Zealand', logo: 'https://idc.yp-studio.com/media/2025/02/05104954/10.png' },
  { name: 'Special Group New Zealand', logo: 'https://idc.yp-studio.com/media/2025/02/05110110/64.png' },
  { name: 'DDB New Zealand', logo: 'https://idc.yp-studio.com/media/2025/02/05110101/59.png' },
  { name: 'FCB New Zealand', logo: 'https://idc.yp-studio.com/media/2025/02/05104954/16.png' },
  { name: 'Saatchi & Saatchi New Zealand', logo: 'https://idc.yp-studio.com/media/2025/02/05104954/6.png' },
  { name: 'JWT New York', logo: 'https://idc.yp-studio.com/media/2025/02/05110110/75.png' },
  { name: 'Saatchi Wellness New York', logo: 'https://idc.yp-studio.com/media/2025/04/06115525/IDC-Photographers-brand-work-logos-19.png' },
  { name: 'BETC London', logo: 'https://idc.yp-studio.com/media/2025/04/06115520/IDC-Photographers-brand-work-logos-21.png' },
  { name: 'BBDO Shanghai', logo: 'https://idc.yp-studio.com/media/2025/02/05110110/70.png' },
  { name: 'Hogarth Worldwide Singapore', logo: 'https://idc.yp-studio.com/media/2025/04/06115523/IDC-Photographers-brand-work-logos-20.png' },
  { name: 'Ogilvy Hong Kong', logo: 'https://idc.yp-studio.com/media/2025/02/05110110/71.png' },
  { name: 'TBWA Shanghai', logo: 'https://idc.yp-studio.com/media/2025/04/06120313/IDC-Photographers-brand-work-logos-23.png' },
  { name: 'TBWA Singapore', logo: 'https://idc.yp-studio.com/media/2025/02/05104954/13.png' },
  { name: 'TBWA New Zealand', logo: 'https://idc.yp-studio.com/media/2025/02/05104954/49-1.png' },
  { name: 'Leo Burnett Shanghai', logo: 'https://idc.yp-studio.com/media/2025/04/06115518/IDC-Photographers-brand-work-logos-22.png' },
];

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export default function TestimonialsPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const agencyRowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const agencyStickyRef = useRef<HTMLDivElement>(null);

  // ─── GSAP Animations ──────────────────────────────────────────────────
  useEffect(() => {
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
            validRows.forEach((row, i) => {
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
  }, []);

  // ─── Mobile agency row tap toggle ─────────────────────────────────────
  const handleAgencyClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth > 1024) return;
    const row = e.currentTarget;
    row.classList.toggle('tp-active');
  }, []);

  return (
    <div ref={sectionRef} className="tp-section">
      {/* ── Hero Heading ── */}
      <div className="tp-hero">
        <h2 ref={headingRef} className="tp-hero-heading">
          WHAT OUR CLIENTS SAY.
        </h2>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          DESKTOP TABLE
          ══════════════════════════════════════════════════════════════════ */}
      <div ref={tableContainerRef} className="tp-table tp-table-container">
        {/* Header row */}
        <div className="tp-table-header">
          <div className="tp-table-header-cell">name</div>
          <div className="tp-table-header-cell">what&apos;s your impression?</div>
          <div className="tp-table-header-cell">Designation</div>
          <div className="tp-table-header-cell">Company</div>
        </div>

        {/* Testimonial rows */}
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            className="tp-row tp-row-anim"
            ref={(el) => { rowRefs.current[i] = el; }}
          >
            {/* Name + Logo */}
            <div className="tp-cell-name">
              <span className="tp-person-name">{t.name}</span>
              <img
                className="tp-company-logo"
                src={t.logo}
                alt={t.company}
                loading="lazy"
                decoding="async"
                width={300}
                height={58}
              />
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

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE CARDS (hidden on desktop)
          ══════════════════════════════════════════════════════════════════ */}
      <div className="tp-mobile-cards">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="tp-mobile-card">
            <img
              className="tp-mobile-card-logo"
              src={t.logo}
              alt={t.company}
              loading="lazy"
              decoding="async"
              width={300}
              height={58}
            />
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

      {/* ══════════════════════════════════════════════════════════════════
          AGENCY CLIENTS — "Top companies"
          ══════════════════════════════════════════════════════════════════ */}
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
          {AGENCY_CLIENTS.map((agency, i) => (
            <div
              key={i}
              className="tp-agency-row tp-agency-anim"
              ref={(el) => { agencyRowRefs.current[i] = el; }}
              onClick={handleAgencyClick}
            >
              <div className="tp-agency-logo-wrap">
                <img
                  className="tp-agency-logo"
                  src={agency.logo}
                  alt={agency.name}
                  loading="lazy"
                  decoding="async"
                  width={300}
                  height={58}
                />
              </div>
              <span className="tp-agency-name">{agency.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}