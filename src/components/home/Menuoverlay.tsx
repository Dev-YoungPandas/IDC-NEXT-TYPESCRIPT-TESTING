'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useRouter, usePathname } from 'next/navigation';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Photographer {
  name: string;
  slug: string;
}

interface MenuOverlayProps {
  photographers?: Photographer[];
}

// ─── Constants ───────────────────────────────────────────────────────────────
const DEFAULT_PHOTOGRAPHERS: Photographer[] = [
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
  { label: 'Photography service', href: '/photographyservice' },
  { label: 'What our clients say', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
];

const PHOTOGRAPHER_IMAGES = [
  'https://images.unsplash.com/photo-1503104538136-7491acef4d5d?q=80&w=1470&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503104538136-7491acef4d5d?q=80&w=1470&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503104538136-7491acef4d5d?q=80&w=1470&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503104538136-7491acef4d5d?q=80&w=1470&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503104538136-7491acef4d5d?q=80&w=1470&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503104538136-7491acef4d5d?q=80&w=1470&auto=format&fit=crop',
];

const PRELOADER_SESSION_KEY = 'idc_preloader_shown';

// ─── Component ───────────────────────────────────────────────────────────────
export default function MenuOverlay({ photographers }: MenuOverlayProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const isImageClicked = useRef(false);
  const isAnimating = useRef(false);
  const pathname = usePathname();

  // ─── Refs ──────────────────────────────────────────────────────────────
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuTextRef = useRef<HTMLHeadingElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const menuItemsARef = useRef<(HTMLDivElement | null)[]>([]);
  const menuItemsBRef = useRef<(HTMLDivElement | null)[]>([]);
  const noBlurRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  // Preloader refs
  const preloaderRef = useRef<HTMLDivElement>(null);
  const smallFrameRef = useRef<HTMLDivElement>(null);
  const smallCornersRef = useRef<(HTMLDivElement | null)[]>([]);
  const fullSiteCornersRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerSectionRef = useRef<HTMLDivElement>(null);
  const preloaderLogoRef = useRef<HTMLImageElement>(null);
  const preloaderBgRef = useRef<HTMLDivElement>(null);

  const photoList = photographers?.length ? photographers : DEFAULT_PHOTOGRAPHERS;

  const isMobile = useCallback(() => {
    return typeof window !== 'undefined' && window.innerWidth <= 1024;
  }, []);

  // ─── Helper: filter null refs ──────────────────────────────────────────
  const getElements = (refs: React.MutableRefObject<(HTMLElement | null)[]>) =>
    refs.current.filter(Boolean) as HTMLElement[];

  // ═══════════════════════════════════════════════════════════════════════
  // PRELOADER + HEADER INTRO ANIMATION
  // Replaces the old separate "Header intro animation" useEffect.
  // Sequence: preloader → header fade-in
  // ═══════════════════════════════════════════════════════════════════════
  useEffect(() => {
    // Lock scroll during entire preloader sequence
    const smallCorners = getElements(smallCornersRef);
    const fullSiteCorners = getElements(fullSiteCornersRef);
    const isHomepage = pathname === '/';


    if (!isHomepage) {
      if (preloaderRef.current) preloaderRef.current.style.display = 'none';
      if (smallFrameRef.current) smallFrameRef.current.style.display = 'none';
      smallCorners.forEach((el) => { el.style.display = 'none'; });
      fullSiteCorners.forEach((c) => { c.style.display = 'block'; });

      if (logoRef.current) {
        logoRef.current.style.transform = 'translateY(0)';
        logoRef.current.style.opacity = '1';
      }
      if (menuTextRef.current) {
        menuTextRef.current.style.transform = 'translateY(0)';
        menuTextRef.current.style.opacity = '1';
      }

      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
      return;
    }
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const mobile = typeof window !== 'undefined' && window.innerWidth <= 768;





    // Initial states
    gsap.set(fullSiteCorners, { display: 'none' });
    gsap.set(logoRef.current, { y: 50, opacity: 0 });
    gsap.set(menuTextRef.current, { y: 50, opacity: 0 });

    if (preloaderBgRef.current) {
      gsap.set(preloaderBgRef.current, { filter: 'blur(20px)' });
    }

    const tl = gsap.timeline();

    // ── Step 1: Preloader logo slides UP into view ──
    tl.fromTo(
      preloaderLogoRef.current,
      { y: 150 },
      { y: 0, duration: 0.5 }
    );

    // ── Step 2: Preloader logo slides UP and OUT (after 1s pause) ──
    tl.fromTo(
      preloaderLogoRef.current,
      { y: 0 },
      { y: -150, delay: 1, duration: 0.8 }
    );

    // ── Step 3: All simultaneous ("h1" label) ──
    // 3a: Small frame EXPANDS to full viewport
    tl.fromTo(
      smallFrameRef.current,
      {
        width: mobile ? '40vw' : '20vw',
        height: mobile ? '120px' : '10vw',
      },
      {
        width: mobile ? '97vw' : '97vw',
        height: mobile ? '98vh' : '94vh',
        duration: 1,
        onComplete: () => {
          if (smallFrameRef.current) {
            smallFrameRef.current.style.display = 'none';
          }
        },
      },
      'expand'
    );

    // 3b: Header section UN-BLURS (reveals the page behind)
    if (preloaderBgRef.current) {
      tl.fromTo(
        preloaderBgRef.current,
        { filter: 'blur(20px)' },
        { filter: 'blur(0px)', duration: 1 },
        'expand'
      );
    }

    // 3c: Small corners GROW from 20px to full-site-corner size
    tl.fromTo(
      smallCorners,
      {
        width: mobile ? '15px' : '20px',
        height: mobile ? '15px' : '20px',
      },
      {
        width: mobile ? '30px' : '70px',
        height: mobile ? '30px' : '70px',
        duration: 1,
        onComplete: () => {
          // Hide all small corners
          smallCorners.forEach((el) => {
            el.style.display = 'none';
          });
        },
      },
      'expand'
    );

    // 3d: Show full-site corners (swap from small to full)
    tl.call(
      () => {
        fullSiteCorners.forEach((corner) => {
          gsap.set(corner, { display: 'block' });
        });
      },
      [],
      'expand'
    );

    // ── Step 4: Hide preloader container ──
    tl.call(() => {
      if (preloaderRef.current) {
        preloaderRef.current.style.display = 'none';
      }
    });

    // ── Step 5: Header intro (logo + MENU text fade in) ──
    tl.to(logoRef.current, { y: 0, opacity: 1, duration: 0.8 }, 'headerIn');
    tl.to(menuTextRef.current, { y: 0, opacity: 1, duration: 0.8 }, 'headerIn');

    // ── Step 6: Unlock scroll ──
    tl.call(() => {
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';


      try { sessionStorage.setItem(PRELOADER_SESSION_KEY, '1'); } catch { }

    });

    return () => {
      tl.kill();
    };
  }, [pathname]);

  // ─── Set initial GSAP states for menu items ────────────────────────────
  useEffect(() => {
    gsap.set(getElements(menuItemsARef), { y: '110%' });
    gsap.set(getElements(menuItemsBRef), { y: '110%' });
    gsap.set(getElements(noBlurRef), { y: '110%' });
    gsap.set(getElements(imagesRef), { opacity: 0, scale: 0.8 });
  }, []);

  // ─── Open / Close toggle ──────────────────────────────────────────────
  const handleMenuToggle = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const overlay = overlayRef.current;
    const itemsA = getElements(menuItemsARef);
    const itemsB = getElements(menuItemsBRef);
    const noBlur = getElements(noBlurRef);

    if (!overlay) {
      isAnimating.current = false;
      return;
    }

    if (!isOpen) {
      // ── OPEN ──
      if (paragraphRef.current) {
        const text = paragraphRef.current.textContent || '';
        paragraphRef.current.innerHTML = text
          .split('')
          .map((char) => `<span class="word" style="display:inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
          .join('');
      }
      const words = paragraphRef.current?.querySelectorAll('.word') || [];

      gsap.to(overlay, {
        opacity: 1,
        duration: 0.5,
        onStart: () => {
          overlay.style.visibility = 'visible';
          document.documentElement.style.overflow = 'hidden';
          document.body.style.overflow = 'hidden';
        },
      });

      gsap.fromTo(words, { x: '-100%', opacity: 0 }, { x: '0%', opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out' });

      itemsA.forEach((el, i) => gsap.to(el, { y: '0%', duration: 0.5, delay: i * 0.1, ease: 'power3.out' }));
      noBlur.forEach((el, i) => gsap.to(el, { y: '0%', duration: 0.5, delay: i * 0.1, ease: 'power3.out' }));
      itemsB.forEach((el, i) => gsap.to(el, { y: '0%', duration: 0.5, delay: i * 0.1, ease: 'power3.out' }));

      setIsOpen(true);
      setTimeout(() => { isAnimating.current = false; }, 600);
    } else {
      // ── CLOSE ──

      // ★ MOBILE CLOSE: simple fade + hard reset
      if (isMobile()) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            overlay.style.visibility = 'hidden';
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';

            // Reset menu items to initial off-screen positions
            gsap.set(itemsA, { y: '110%', opacity: 1, filter: 'none' });
            gsap.set(itemsB, { y: '110%', opacity: 1, filter: 'none' });
            gsap.set(noBlur, { y: '110%' });
            gsap.set(getElements(imagesRef), { opacity: 0, scale: 0.8 });

            // Nuke ALL inline styles on header elements to restore them
            if (logoRef.current) logoRef.current.style.cssText = '';
            if (menuTextRef.current) menuTextRef.current.style.cssText = '';

            isAnimating.current = false;
          },
        });

        isImageClicked.current = false;
        setIsOpen(false);
        return;
      }

      // ── DESKTOP CLOSE ──
      const words = paragraphRef.current?.querySelectorAll('.word') || [];

      gsap.to(words, { x: '-100%', opacity: 0, duration: 0.5, stagger: 0.05, ease: 'power3.in' });
      gsap.fromTo(itemsA, { y: '0%' }, { y: '110%', duration: 0.5, ease: 'power3.in', stagger: 0.1 });
      gsap.fromTo(noBlur, { y: '0%' }, { y: '110%', duration: 0.5, ease: 'power3.in', stagger: 0.1 });
      gsap.fromTo(itemsB, { y: '0%' }, {
        y: '110%', duration: 0.5, ease: 'power3.in', stagger: 0.1,
        onComplete: () => {
          gsap.to(overlay, {
            delay: 0.3,
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              overlay.style.visibility = 'hidden';
              document.body.style.overflow = '';
              document.documentElement.style.overflow = '';
              isAnimating.current = false;
            },
          });
        },
      });

      isImageClicked.current = false;
      setIsOpen(false);
    }
  }, [isOpen, isMobile]);

  // ─── Name hover → image reveal (desktop only) ─────────────────────────
  const handleNameEnter = useCallback((index: number) => {
    if (isMobile() || isImageClicked.current) return;
    const images = getElements(imagesRef);
    const image = images[index];
    if (!image) return;

    gsap.to(images, { opacity: 0, duration: 0.5, ease: 'sine.in' });
    gsap.to(image, { scale: 1, opacity: 1, duration: 0.5, ease: 'sine.in' });
  }, [isMobile]);

  const handleNameLeave = useCallback((index: number) => {
    if (isMobile() || isImageClicked.current) return;
    const image = imagesRef.current[index];
    if (!image) return;

    gsap.to(image, { scale: 0.2, opacity: 0, duration: 0.5, ease: 'sine.in' });
  }, [isMobile]);

  // ─── Page-link hover blur (desktop) ───────────────────────────────────
  const handlePageLinkEnter = useCallback((el: HTMLDivElement | null) => {
    if (isMobile()) return;
    gsap.to(getElements(menuItemsARef), { opacity: 0.5, filter: 'blur(2px)', duration: 0.3 });
    gsap.to(getElements(menuItemsBRef), { opacity: 0.5, filter: 'blur(5px)', duration: 0.3 });
    if (el) gsap.to(el, { opacity: 1, filter: 'blur(0px)', duration: 0.3 });
  }, [isMobile]);

  const handlePageLinkLeave = useCallback(() => {
    if (isMobile()) return;
    gsap.to(getElements(menuItemsARef), { opacity: 1, filter: 'blur(0px)', duration: 0.3 });
    gsap.to(getElements(menuItemsBRef), { opacity: 1, filter: 'blur(0px)', duration: 0.3 });
  }, [isMobile]);

  // ─── Photographer hover blur (desktop) ────────────────────────────────
  const handlePhotographerEnter = useCallback((el: HTMLDivElement | null) => {
    if (isMobile()) return;
    gsap.to(getElements(menuItemsBRef), { opacity: 0.5, filter: 'blur(5px)', duration: 0.3 });
    gsap.to(getElements(menuItemsARef), { opacity: 0, duration: 0.5 });
    if (el) gsap.to(el, { opacity: 1, filter: 'blur(0px)', duration: 0.3 });
  }, [isMobile]);

  const handlePhotographerLeave = useCallback(() => {
    if (isMobile()) return;
    gsap.to(getElements(menuItemsBRef), { opacity: 1, filter: 'blur(0px)', duration: 0.3 });
    gsap.to(getElements(menuItemsARef), { opacity: 1, duration: 0.5 });
  }, [isMobile]);

  // ─── Navigate with exit animation ─────────────────────────────────────
  const handleNavigate = useCallback((e: React.MouseEvent, href: string) => {
    e.preventDefault();

    if (isMobile()) {
      const overlay = overlayRef.current;
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0, duration: 0.3,
          onComplete: () => {
            overlay.style.visibility = 'hidden';
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            router.push(href);
          },
        });
      } else {
        router.push(href);
      }
      return;
    }

    // Desktop exit animation
    const itemsA = getElements(menuItemsARef);
    const itemsB = getElements(menuItemsBRef);
    const noBlur = getElements(noBlurRef);

    noBlur.forEach((el) => gsap.to(el, { y: 110, duration: 0.5, ease: 'power2.inOut' }));
    gsap.to(logoRef.current, { y: -50, opacity: 0, duration: 0.8 });
    gsap.to(menuTextRef.current, { y: -50, opacity: 0, duration: 0.8 });
    gsap.to(paragraphRef.current, { y: -50, opacity: 0, duration: 0.8 });
    itemsA.forEach((el) => gsap.to(el, { y: 100, duration: 0.5, ease: 'power2.inOut' }));
    itemsB.forEach((el) => gsap.to(el, { y: 100, duration: 0.5, ease: 'power2.inOut' }));

    setTimeout(() => router.push(href), 500);
  }, [isMobile, router]);

  // ─── Render ────────────────────────────────────────────────────────────
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          PRELOADER
          ═══════════════════════════════════════════════════════════════════ */}
      <div ref={preloaderRef} className="preloader-hero">

        <div ref={preloaderBgRef} className="preloader-bg"></div>

        {/* Small frame with L-shaped corners */}
        <div ref={smallFrameRef} className="smallFrame">
          <div
            className="corners smallCorner smallCorner1"
            ref={(el) => { smallCornersRef.current[0] = el; }}
          ></div>
          <div
            className="corners smallCorner smallCorner2"
            ref={(el) => { smallCornersRef.current[1] = el; }}
          ></div>
          <div
            className="corners smallCorner smallCorner3"
            ref={(el) => { smallCornersRef.current[2] = el; }}
          ></div>
          <div
            className="corners smallCorner smallCorner4"
            ref={(el) => { smallCornersRef.current[3] = el; }}
          ></div>
        </div>

        {/* Preloader IDC logo (centered, animates up then out) */}
        <div className="heading">
          <div className="elem">
            <img
              ref={preloaderLogoRef}
              src="https://idc.co.nz/headless/wp-content/uploads/2025/03/IDC-logo.svg"
              alt="IDC Logo"
            />
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          HEADER + OVERLAY
          The "center" class is used by the preloader to blur/unblur this.
        
        ═══════════════════════════════════════════════════════════════════ */}


      <div className="header-upper">
        <a href="/">
          <div ref={logoRef} className="logo__pre">

            <img
              src="https://idc.co.nz/headless/wp-content/uploads/2025/03/IDC-logo.svg"
              alt="IDC Logo"
            />
          </div>
        </a>
        <div>
          <h3
            ref={menuTextRef}
            className="h3 menutext"
            onClick={handleMenuToggle}
            style={{ cursor: 'pointer' }}
          >
            {isOpen ? 'CLOSE' : 'MENU'}
          </h3>
        </div>
      </div>
      <div ref={headerSectionRef} className="header-section center hero">


        {/* ── Overlay ── */}
        <div ref={overlayRef} className="overlay">
          <div className="menu-options">
            {/* ── Background Images ── */}
            <div className="images">
              {photoList.map((p, i) => (
                <img
                  key={p.slug}
                  ref={(el) => { imagesRef.current[i] = el; }}
                  id={p.name.split(' ')[0]}
                  className={`images image${i + 1}`}
                  src={PHOTOGRAPHER_IMAGES[i]}
                  alt={p.name}
                />
              ))}
            </div>

            {/* ── Left Column: Page Links + Socials ── */}
            <div className="other-options">
              <div className="Container">
                <p ref={paragraphRef} className="p">
                  imagedrivencontent
                </p>
              </div>

              <div className="page-option">
                {PAGE_LINKS.map((link, i) => (
                  <div key={link.href} style={{ overflow: 'hidden' }}>
                    <div
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
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div style={{ overflow: 'hidden' }}>
                <div
                  className="menu-item social-media-icon"
                  ref={(el) => { noBlurRef.current[0] = el; }}
                >
                  <a href="https://www.instagram.com/_idc_photography/" target="_blank" rel="noopener noreferrer">
                    <svg aria-hidden="true" fill="#ffffff" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/company/idc-worldwide-ltd/" target="_blank" rel="noopener noreferrer">
                    <svg aria-hidden="true" fill="#ffffff" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* ── Right Column: Photographer Names ── */}
            <div className="name-wrapper blend-text">
              {photoList.map((p, i) => (
                <div key={p.slug} style={{ overflow: 'hidden' }}>
                  <div
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
                    onClick={() => { isImageClicked.current = true; }}
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
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          CORNER DECORATIONS (outside everything, independent z-index)
          Hidden initially by CSS, shown by preloader animation via ref.
          ═══════════════════════════════════════════════════════════════════ */}
      <div
        className="full-site-corner blend-text corners-bottom-right"
        ref={(el) => { fullSiteCornersRef.current[0] = el; }}
      ></div>
      <div
        className="full-site-corner blend-text corners-top-right"
        ref={(el) => { fullSiteCornersRef.current[1] = el; }}
      ></div>
      <div
        className="full-site-corner blend-text corners-bottom-left"
        ref={(el) => { fullSiteCornersRef.current[2] = el; }}
      ></div>
      <div
        className="full-site-corner blend-text corners-top-left"
        ref={(el) => { fullSiteCornersRef.current[3] = el; }}
      ></div>
    </>
  );
}