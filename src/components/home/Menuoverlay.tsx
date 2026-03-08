'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// ─── Types ───────────────────────────────────────────────────────────────────
interface MenuOverlayProps {
  photographers?: {
    name: string;
    slug: string;
  }[];
}

// ─── Default photographer list (matches your PHOTOGRAPHER_SLUG_MAP) ─────────
const DEFAULT_PHOTOGRAPHERS = [
  { name: 'Yuki Sato', slug: 'yuki-sato' },
  { name: 'Dan Max', slug: 'dan-max' },
  { name: 'Sacha Stejko', slug: 'sacha-stejko' },
  { name: 'Guy Coombes', slug: 'guy-coombes' },
  { name: 'Dean Mackenzie', slug: 'dean-mackenzie' },
  { name: 'Camilla Rutherford', slug: 'camilla-rutherford' },
];

const PAGE_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Categories', href: '/categories' },
  { label: 'Production', href: '/production' },
  { label: 'What our clients say', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
];

// Placeholder images – swap these for your real photographer images
const PHOTOGRAPHER_IMAGES = [
  'https://images.unsplash.com/photo-1503104538136-7491acef4d5d?q=80&w=1470&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503104538136-7491acef4d5d?q=80&w=1470&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503104538136-7491acef4d5d?q=80&w=1470&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503104538136-7491acef4d5d?q=80&w=1470&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503104538136-7491acef4d5d?q=80&w=1470&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503104538136-7491acef4d5d?q=80&w=1470&auto=format&fit=crop',
];

export default function MenuOverlay({ photographers }: MenuOverlayProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const isImageClicked = useRef(false);

  // ─── Refs ────────────────────────────────────────────────────────────────
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuTextRef = useRef<HTMLHeadingElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  const menuItemsARef = useRef<(HTMLDivElement | null)[]>([]);
  const menuItemsBRef = useRef<(HTMLDivElement | null)[]>([]);
  const noBlurRef = useRef<(HTMLDivElement | null)[]>([]);
  const namesRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const wordSpansRef = useRef<(HTMLSpanElement | null)[]>([]);

  const photoList = photographers && photographers.length > 0 ? photographers : DEFAULT_PHOTOGRAPHERS;

  const isMobile = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 1024;
  }, []);

  // ─── Header intro animation (replaces second <script>) ──────────────────
  useEffect(() => {
    // Disable scrolling during intro
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline();

    tl.fromTo(
      logoRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 1 },
      'same'
    ).fromTo(
      menuTextRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 1 },
      'same'
    );

    // Re-enable scroll after animation
    const timeout = setTimeout(() => {
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    }, 1000);

    return () => {
      clearTimeout(timeout);
      tl.kill();
    };
  }, []);

  // ─── Set initial GSAP states for menu items ──────────────────────────────
  useEffect(() => {
    gsap.set(menuItemsARef.current.filter(Boolean), { y: '110%' });
    gsap.set(menuItemsBRef.current.filter(Boolean), { y: '110%' });
    gsap.set(noBlurRef.current.filter(Boolean), { y: '110%' });
    gsap.set(imagesRef.current.filter(Boolean), { opacity: 0, scale: 0.8 });
  }, []);

  // ─── Open / Close toggle ─────────────────────────────────────────────────
  const handleMenuToggle = useCallback(() => {
    const overlay = overlayRef.current;
    const menuItemsA = menuItemsARef.current.filter(Boolean);
    const menuItemsB = menuItemsBRef.current.filter(Boolean);
    const noBlur = noBlurRef.current.filter(Boolean);

    if (!overlay) return;

    if (!isOpen) {
      // ── OPEN ──
      // Split paragraph text into letter spans
      if (paragraphRef.current) {
        const text = paragraphRef.current.textContent || '';
        paragraphRef.current.innerHTML = text
          .split('')
          .map((char) => `<span class="word" style="display:inline-block">${char}</span>`)
          .join('');
      }
      const menuWords = paragraphRef.current?.querySelectorAll('.word') || [];

      gsap.to(overlay, {
        opacity: 1,
        duration: 0.5,
        onStart: () => {
          overlay.style.visibility = 'visible';
          document.documentElement.style.overflow = 'hidden';
          document.body.style.overflow = 'hidden';
        },
      });

      gsap.fromTo(
        menuWords,
        { x: '-100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out' }
      );

      menuItemsA.forEach((item, index) => {
        gsap.to(item, { y: '0%', duration: 0.5, delay: index * 0.1, ease: 'power3.out' });
      });
      noBlur.forEach((item, index) => {
        gsap.to(item, { y: '0%', duration: 0.5, delay: index * 0.1, ease: 'power3.out' });
      });
      menuItemsB.forEach((item, index) => {
        gsap.to(item, { y: '0%', duration: 0.5, delay: index * 0.1, ease: 'power3.out' });
      });

      setIsOpen(true);
    } else {
      // ── CLOSE ──
      const menuWords = paragraphRef.current?.querySelectorAll('.word') || [];

      gsap.to(menuWords, {
        x: '-100%',
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power3.in',
      });

      gsap.fromTo(menuItemsA, { y: '0%' }, { y: '110%', duration: 0.5, ease: 'power3.in', stagger: 0.1 });
      gsap.fromTo(noBlur, { y: '0%' }, { y: '110%', duration: 0.5, ease: 'power3.in', stagger: 0.1 });
      gsap.fromTo(
        menuItemsB,
        { y: '0%' },
        {
          y: '110%',
          duration: 0.5,
          ease: 'power3.in',
          stagger: 0.1,
          onComplete: () => {
            gsap.to(overlay, {
              delay: 0.5,
              opacity: 0,
              duration: 0.5,
              onComplete: () => {
                overlay.style.visibility = 'hidden';
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
              },
            });
          },
        }
      );

      // Reset clicked state
      isImageClicked.current = false;
      setIsOpen(false);
    }
  }, [isOpen]);

  // ─── Name hover → image reveal (desktop only) ───────────────────────────
  const handleNameEnter = useCallback(
    (index: number) => {
      if (isMobile() || isImageClicked.current) return;
      const images = imagesRef.current.filter(Boolean);
      const image = images[index];
      if (!image) return;

      gsap.to(images, { opacity: 0, duration: 0.5, ease: 'sine.in' });
      gsap.to(image, { scale: 1, duration: 0.5, ease: 'sine.in' });
      gsap.to(image, { opacity: 1, duration: 0.5, ease: 'sine.in' });
    },
    [isMobile]
  );

  const handleNameLeave = useCallback(
    (index: number) => {
      if (isMobile() || isImageClicked.current) return;
      const image = imagesRef.current[index];
      if (!image) return;

      gsap.to(image, { scale: 0.2, duration: 0.5, ease: 'sine.in' });
      gsap.to(image, { opacity: 0, duration: 0.5, ease: 'sine.in' });
    },
    [isMobile]
  );

  const handleNameClick = useCallback(() => {
    isImageClicked.current = true;
  }, []);

  // ─── Page‑link hover blur (desktop, menuItemsA) ─────────────────────────
  const handlePageLinkEnter = useCallback(
    (el: HTMLDivElement | null) => {
      if (isMobile()) return;
      const menuItemsA = menuItemsARef.current.filter(Boolean);
      const menuItemsB = menuItemsBRef.current.filter(Boolean);
      gsap.to(menuItemsA, { opacity: 0.5, filter: 'blur(2px)', duration: 0.3 });
      gsap.to(menuItemsB, { opacity: 0.5, filter: 'blur(5px)', duration: 0.3 });
      if (el) gsap.to(el, { opacity: 1, filter: 'blur(0px)', duration: 0.3 });
    },
    [isMobile]
  );

  const handlePageLinkLeave = useCallback(() => {
    if (isMobile()) return;
    const menuItemsA = menuItemsARef.current.filter(Boolean);
    const menuItemsB = menuItemsBRef.current.filter(Boolean);
    gsap.to(menuItemsA, { opacity: 1, filter: 'blur(0px)', duration: 0.3 });
    gsap.to(menuItemsB, { opacity: 1, filter: 'blur(0px)', duration: 0.3 });
  }, [isMobile]);

  // ─── Photographer‑name hover blur (desktop, menuItemsB) ─────────────────
  const handlePhotographerEnter = useCallback(
    (el: HTMLDivElement | null) => {
      if (isMobile()) return;
      const menuItemsA = menuItemsARef.current.filter(Boolean);
      const menuItemsB = menuItemsBRef.current.filter(Boolean);
      gsap.to(menuItemsB, { opacity: 0.5, filter: 'blur(5px)', duration: 0.3 });
      gsap.to(menuItemsA, { opacity: 0, duration: 0.5 });
      if (el) gsap.to(el, { opacity: 1, filter: 'blur(0px)', duration: 0.3 });
    },
    [isMobile]
  );

  const handlePhotographerLeave = useCallback(() => {
    if (isMobile()) return;
    const menuItemsA = menuItemsARef.current.filter(Boolean);
    const menuItemsB = menuItemsBRef.current.filter(Boolean);
    gsap.to(menuItemsB, { opacity: 1, filter: 'blur(0px)', duration: 0.3 });
    gsap.to(menuItemsA, { opacity: 1, duration: 0.5 });
  }, [isMobile]);

  // ─── Navigate with exit animation (desktop link clicks) ─────────────────
  const handleNavigate = useCallback(
    (e: React.MouseEvent, href: string) => {
      if (isMobile()) return; // Let default Link behaviour handle mobile
      e.preventDefault();

      const menuItemsA = menuItemsARef.current.filter(Boolean);
      const menuItemsB = menuItemsBRef.current.filter(Boolean);
      const noBlur = noBlurRef.current.filter(Boolean);

      noBlur.forEach((item) => {
        gsap.to(item, { y: 110, duration: 0.5, ease: 'power2.inOut' });
      });

      gsap.to(logoRef.current, { y: -50, opacity: 0, duration: 0.8 });
      gsap.to(menuTextRef.current, { y: -50, opacity: 0, duration: 0.8 });
      gsap.to(paragraphRef.current, { y: -50, opacity: 0, duration: 0.8 });

      menuItemsA.forEach((item) => {
        gsap.to(item, { y: 100, duration: 0.5, ease: 'power2.inOut' });
      });
      menuItemsB.forEach((item) => {
        gsap.to(item, { y: 100, duration: 0.5, ease: 'power2.inOut' });
      });

      setTimeout(() => {
        router.push(href);
      }, 500);
    },
    [isMobile, router]
  );

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Fixed Header ── */}
      <div className="header-section hero">

        <div className='header-upper'>
          <div ref={logoRef} className="logo__pre">
            <img
              src="https://idc.co.nz/headless/wp-content/uploads/2025/03/IDC-logo.svg"
              alt="IDC Logo"
            />
          </div>

          <div>
            <h3
              ref={menuTextRef}
              className="h3"
              onClick={handleMenuToggle}
              style={{ cursor: 'pointer' }}
            >
              {isOpen ? 'CLOSE' : 'MENU'}
            </h3>
          </div>

        </div>


        {/* ── Overlay ── */}
        <div ref={overlayRef} className="overlay">
          <div className="menu-options">
            {/* Corner elements */}
            <div className="corners-bottom-right" />
            <div className="corners-bottom-left full-site-corner blend-text" />

            {/* ── Background Images ── */}
            <div className="images">
              {photoList.map((p, i) => (
                <img
                  key={p.slug}
                  ref={(el) => { imagesRef.current[i] = el; }}
                  id={p.name.split(' ')[0]}
                  className={`images image${i + 1}`}
                  src={PHOTOGRAPHER_IMAGES[i] || PHOTOGRAPHER_IMAGES[0]}
                  alt={p.name}
                />
              ))}
            </div>

            {/* ── Left Column: Logo + Page Links + Socials ── */}
            <div className="other-options">
              <div className="Container">
                {/* <img
                  src="https://idc.co.nz/headless/wp-content/uploads/2025/03/IDC-logo.svg"
                  alt="IDC Logo"
                /> */}
                <p ref={paragraphRef} className="p">
                  imagedrivencontent
                </p>
              </div>

              <div className="page-option">
                {PAGE_LINKS.map((link, i) => (
                  <div
                    key={link.href}
                    className="menu-item"
                    ref={(el) => { menuItemsARef.current[i] = el; }}
                    onMouseEnter={() => handlePageLinkEnter(menuItemsARef.current[i])}
                    onMouseLeave={handlePageLinkLeave}
                  >
                    <h2>
                      <a
                        href={link.href}
                        className="a"
                        onClick={(e) => handleNavigate(e, link.href)}
                      >
                        {link.label}
                      </a>
                    </h2>
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div
                className="menu-item"
                ref={(el) => { noBlurRef.current[0] = el; }}
              >
                <svg aria-hidden="true" className="e-font-icon-svg e-fab-instagram" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>




                <svg aria-hidden="true" className="e-font-icon-svg e-fab-linkedin-in" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg>


              </div>
            </div>

            {/* ── Right Column: Photographer Names ── */}
            <div className="name-wrapper blend-text">
              {photoList.map((p, i) => (
                <div
                  key={p.slug}
                  className={`menu-item items-end name${i + 1}`}
                  ref={(el) => { menuItemsBRef.current[i] = el; }}
                  onMouseEnter={() => {
                    handlePhotographerEnter(menuItemsBRef.current[i]);
                    handleNameEnter(i);
                  }}
                  onMouseLeave={() => {
                    handlePhotographerLeave();
                    handleNameLeave(i);
                  }}
                  onClick={handleNameClick}
                >
                  <h2>
                    <a
                      href={`/${p.slug}`}
                      className="b"
                      onClick={(e) => handleNavigate(e, `/${p.slug}`)}
                    >
                      {p.name}
                    </a>
                  </h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Corner decorations (outside overlay) ── */}
      <div className="full-site-corner blend-text corners-bottom-right" />
      <div className="full-site-corner blend-text corners-top-right" />
      <div className="full-site-corner blend-text corners-bottom-left" />
      <div className="full-site-corner blend-text corners-top-left" />
    </>
  );
}