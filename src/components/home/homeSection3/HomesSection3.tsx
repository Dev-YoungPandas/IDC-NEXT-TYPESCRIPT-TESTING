'use client';

import { useEffect, useRef } from 'react';
import { useHomeColorTransition } from '@/hooks/useHomeColorTransition';
import "./homesection3.css";

export default function HomesSection3() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftImgRef = useRef<HTMLDivElement>(null);
  const rightImgRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<any[]>([]);

  // ✅ Full page white → black transition (triggers at heading section)
  useHomeColorTransition();

  useEffect(() => {
    let isMounted = true;

    const setup = async () => {
      if (!sectionRef.current || !leftImgRef.current || !rightImgRef.current) return;

      const isMobile = window.innerWidth <= 740;

      // ✅ No parallax on mobile — skip entirely
      if (isMobile) return;

      const { loadScrollTrigger } = await import('@/lib/animations/gsapConfig');
      const { ScrollTrigger } = await loadScrollTrigger();
      const gsap = (await import('gsap')).default;

      if (!isMounted) return;

      const parallaxAmount = -20;

      const tl1 = gsap.fromTo(
        leftImgRef.current,
        { yPercent: 0 },
        {
          yPercent: parallaxAmount * 2.3,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }
      );

      const tl2 = gsap.fromTo(
        rightImgRef.current,
        { yPercent: 0 },
        {
          yPercent: parallaxAmount * 2.3,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }
      );

      triggersRef.current = [tl1.scrollTrigger, tl2.scrollTrigger];
    };

    setup();

    return () => {
      isMounted = false;
      triggersRef.current.forEach((st) => st?.kill());
      triggersRef.current = [];
    };
  }, []);

  return (
    <div className="homesection3-parent" ref={sectionRef}>
      <div className="homesection3-top"></div>

      <div className="homesection3-heading-section">
        <h3 className="homesection3-heading-para">IDC</h3>
        <h3 className="homesection3-heading-title">Production</h3>
      </div>

      <div className="homesection3-center">
        <div className="homesection3-center-inner">
          <div className="homesection3-center-container">
            <div className="h3-center-box1 h3-parallax-item" ref={leftImgRef}>
              <img src="https://idc.yp-studio.com/media/2025/04/04072314/Home-Prod2-2.jpg" alt="IDC production behind the scenes" />
            </div>
            <div className="h3-center-box2">
              <video autoPlay loop muted playsInline src="https://idc.yp-studio.com/media/2025/03/09215455/Vid1Production30.webm#t=0,100000" />
            </div>
            <div className="h3-center-box3 h3-parallax-item" ref={rightImgRef}>
              <img src="https://idc.yp-studio.com/media/2025/04/04072500/Home-Prod-3.jpg" alt="IDC production photography" />
            </div>
          </div>
        </div>
      </div>

      <div className="homesection3-text-container">
        <p>
          IDC Worldwide&apos;s line production ensures seamless execution for
          photography and TVC stills, offering tailored support for every project.
          With 25+ years of global experience, we provide expert coordination,
          sustainability-focused solutions, and a hands-on approach to bring
          creative visions to life.
        </p>
        <div className="homesection3-btn-main">
          <div className="h3-btn-text">
            <h3>About IDC Production</h3>
          </div>
          <div className="h3-btn-svg">
            <svg xmlns="http://www.w3.org/2000/svg" width="500" viewBox="0 0 375 374.999991" height="500" preserveAspectRatio="xMidYMid meet">
              <defs><clipPath id="0395154183"><path d="M 0 4.464844 L 370.5 4.464844 L 370.5 374.964844 L 0 374.964844 Z M 0 4.464844" clipRule="nonzero" /></clipPath></defs>
              <g clipPath="url(#0395154183)"><path fill="#ffffff" d="M 370.527344 4.464844 L 370.527344 374.625 L 296.4375 374.625 L 296.4375 130.9375 L 52.386719 374.988281 L 0 322.597656 L 244.050781 78.550781 L 0.363281 78.550781 L 0.363281 4.464844 Z M 370.527344 4.464844" fillOpacity="1" fillRule="nonzero" /></g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}