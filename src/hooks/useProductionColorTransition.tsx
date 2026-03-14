'use client';

import { useEffect, useRef } from 'react';

export function useProductionColorTransition() {
  const stRef = useRef<any>(null);
  const attemptsRef = useRef(0);

  useEffect(() => {
    let isMounted = true;
    let timeoutId: any = null;
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 740;

    const setup = async () => {
      const trigger = document.querySelector('.prod-content') as HTMLElement;
      const approach = document.querySelector('.prod-approach') as HTMLElement;
      const section3 = document.querySelector('.prod-section3-main') as HTMLElement;
      const content = document.querySelector('.prod-content') as HTMLElement; // ← ADD

      if (!trigger || !approach) {
        attemptsRef.current++;
        if (attemptsRef.current < 30 && isMounted) {
          timeoutId = setTimeout(setup, 100);
        }
        return;
      }

      const { loadScrollTrigger } = await import('@/lib/animations/gsapConfig');
      const { ScrollTrigger } = await loadScrollTrigger();
      if (!isMounted) return;

      const contentBottom = trigger.getBoundingClientRect().bottom + window.scrollY;
      const duration = window.innerHeight * (isMobile ? 0.4 : 0.3);
      const startPos = contentBottom - window.innerHeight * 0.38;
      const endPos = startPos + duration;

      stRef.current = ScrollTrigger.create({
        trigger: document.body,
        start: `${startPos}px top`,
        end: `${endPos}px top`,
        scrub: 1,
        onUpdate: (self: any) => {
          const p = Math.min(1, Math.max(0, self.progress));
          const v = Math.round(255 * p); // black → white
          const color = `rgb(${v},${v},${v})`;

          approach.style.backgroundColor = color; // ProductionApproach
          if (section3) section3.style.backgroundColor = color; // 3 headings div
          if (content) content.style.backgroundColor = color; // ← prod-content bhi
          
        },
      });
    };

    setup();

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
      if (stRef.current) {
        stRef.current.kill();
        stRef.current = null;
      }
      attemptsRef.current = 0;
    };
  }, []);
}