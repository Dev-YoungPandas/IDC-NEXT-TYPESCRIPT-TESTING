'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './categories.css';

interface Category {
  title: string;
  count: number;
  href: string;
  image: string;
  alt: string;
}

interface CategoriesPageProps {
  categories: Category[];
}

/*
  Mobile WP sequence (flat):
  0=Beauty → 1=Still+Products → 2=Landscapes → 3=Lifestyle → 4=Portraits →
  5=People In Places → 6=Kids+Young → 7=Fashion → 8=Sports → 9=Food+Beverage

  Desktop columns (unchanged from your working code):
  LEFT  (even): Beauty(0), Landscapes(2), Portraits(4), Kids+Young(6), Sports(8)
  RIGHT (odd):  Still+Products(1), Lifestyle(3), People In Places(5), Fashion(7), Food+Beverage(9)
*/

export default function CategoriesPage({ categories }: CategoriesPageProps) {
  const router = useRouter();
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // if (headingRef.current) {
    //   const heading = headingRef.current;
    //   const lines = heading.querySelectorAll('.cat-heading-line');
    //   lines.forEach((line) => {
    //     const wrapper = document.createElement('span');
    //     wrapper.className = 'line-wrapper';
    //     const inner = document.createElement('span');
    //     inner.className = 'line-inner';
    //     inner.textContent = line.textContent;
    //     wrapper.appendChild(inner);
    //     line.replaceWith(wrapper);
    //   });
    //   const observer = new IntersectionObserver(
    //     (entries) => {
    //       entries.forEach((entry) => {
    //         if (entry.isIntersecting) {
    //           heading.querySelectorAll('.line-wrapper').forEach((w) => w.classList.add('animate'));
    //           observer.unobserve(heading);
    //         }
    //       });
    //     },
    //     { rootMargin: '0px 0px -15% 0px', threshold: 0.1 }
    //   );
    //   observer.observe(heading);
    // }

    const isMobile = window.innerWidth < 768;
    const startVal = isMobile ? 'top 5%' : 'top 10%';
    const endVal = isMobile ? 'bottom 5%' : 'bottom 10%';

    document.querySelectorAll('.cat-content-inner').forEach((inner) => {
      ScrollTrigger.create({
        trigger: inner, start: startVal, end: endVal, scrub: true,
        onEnter: () => {
          const o = document.querySelector('.overlay');
          if (o && getComputedStyle(o).visibility === 'visible') return;
          gsap.to('.logo__pre', { filter: 'blur(5px)', duration: 0.5, ease: 'power2.out' });
        },
        onLeave: () => gsap.to('.logo__pre', { filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' }),
        onLeaveBack: () => gsap.to('.logo__pre', { filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' }),
        onEnterBack: () => {
          const o = document.querySelector('.overlay');
          if (o && getComputedStyle(o).visibility === 'visible') return;
          gsap.to('.logo__pre', { filter: 'blur(5px)', duration: 0.5, ease: 'power2.out' });
        },
      });
    });

    const mm = gsap.matchMedia();
    // mm.add('(min-width: 768px)', () => {
    //   document.querySelectorAll('.cat-hide-container').forEach((c) => {
    //     gsap.to(c, { opacity: 0, scrollTrigger: { trigger: c, start: 'bottom 12%', end: 'bottom 2%', scrub: true } });
    //   });
    // });
    // mm.add('(max-width: 767px)', () => {
    //   document.querySelectorAll('.cat-hide-container').forEach((c) => {
    //     gsap.to(c, { opacity: 0, scrollTrigger: { trigger: c, start: 'bottom 5%', end: 'bottom 1%', scrub: true } });
    //   });
    // });

    return () => { ScrollTrigger.getAll().forEach((st) => st.kill()); mm.revert(); };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    router.push(href);
  };

  // Desktop: split into left/right columns (same as your working code)
  const leftCol: { cat: Category; pos: number }[] = [];
  const rightCol: { cat: Category; pos: number }[] = [];
  categories.forEach((cat, idx) => {
    if (idx % 2 === 0) leftCol.push({ cat, pos: leftCol.length });
    else rightCol.push({ cat, pos: rightCol.length });
  });

  // Desktop item renderer (uses cat-left-N / cat-right-N classes — YOUR existing CSS)
  const renderDesktopItem = (cat: Category, colPosition: number, column: 'left' | 'right') => (
    <div
      key={cat.href}
      className={`cat-grid-item cat-hide-container cat-${column}-${colPosition}`}
    >
      <a href={cat.href} className="cat-image-link expand-text" onClick={(e) => handleClick(e, cat.href)}>
        <div className="cat-image-wrapper">
          <img className="cat-image" src={cat.image} alt={cat.alt} loading={colPosition < 1 ? 'eager' : 'lazy'} decoding="async" />
        </div>
      </a>
      <div className="cat-text">
        <a href={cat.href} className="cat-title-link expand-text cat-content-inner" onClick={(e) => handleClick(e, cat.href)}>
          <h5 className="cat-title">{cat.title}</h5>
        </a>
        <a href={cat.href} className="cat-count-link expand-text" onClick={(e) => handleClick(e, cat.href)}>
          <h5 className="cat-count">({cat.count})</h5>
        </a>
      </div>
    </div>
  );

  // Mobile item renderer (uses cat-mob-N classes — new mobile-only CSS)
  const renderMobileItem = (cat: Category, idx: number) => (
    <div key={`mob-${cat.href}`} className={`cat-mob-item cat-hide-container cat-mob-${idx}`}>
      <a href={cat.href} className="cat-image-link expand-text" onClick={(e) => handleClick(e, cat.href)}>
        <div className="cat-mob-image-wrapper">
          <img className="cat-mob-image" src={cat.image} alt={cat.alt} loading={idx < 2 ? 'eager' : 'lazy'} decoding="async" />
        </div>
      </a>
      <div className="cat-text cat-mob-text">
        <a href={cat.href} className="cat-title-link expand-text cat-content-inner" onClick={(e) => handleClick(e, cat.href)}>
          <h5 className="cat-title">{cat.title}</h5>
        </a>
        <a href={cat.href} className="cat-count-link expand-text" onClick={(e) => handleClick(e, cat.href)}>
          <h5 className="cat-count">({cat.count})</h5>
        </a>
      </div>
    </div>
  );

  return (
    <div className="categories-page-wrapper">
      {/* ── Heading (shared) ── */}
      <div className="categories-hero-section cat-content-inner">
        <div className="categories-hero-inner">
          <h2 ref={headingRef} className="categories-main-heading bottomToUp">
            <span className="cat-heading-line">GET A FEEL</span>
            <span className="cat-heading-line">FOR WHAT WE DO.</span>
          </h2>
        </div>
      </div>

      {/* ── DESKTOP: Two-column grid (your existing layout, UNCHANGED) ── */}
      <div className="categories-grid cat-content-inner">
        <div className="categories-col categories-col-left">
          {leftCol.map(({ cat, pos }) => renderDesktopItem(cat, pos, 'left'))}
        </div>
        <div className="categories-col categories-col-right">
          {rightCol.map(({ cat, pos }) => renderDesktopItem(cat, pos, 'right'))}
        </div>
      </div>

      {/* ── MOBILE: Flat list, correct WP sequence ── */}
      <div className="categories-mobile-list">
        {categories.map((cat, idx) => renderMobileItem(cat, idx))}
      </div>
    </div>
  );
}