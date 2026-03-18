'use client';

import { useEffect, useRef } from 'react';

export function usePhotographyServiceColorTransition() {
  const stRef = useRef<any>(null);
  const attemptsRef = useRef(0);

  useEffect(() => {
    let isMounted = true;
    let timeoutId: any = null;
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 740;

    const setup = async () => {
      const trigger = document.querySelector('.photography-service-section2') as HTMLElement;
      const approach = document.querySelector('.prod-approach') as HTMLElement;

      if (!trigger || !approach) {
        attemptsRef.current++;
        if (attemptsRef.current < 30 && isMounted) {
          timeoutId = setTimeout(setup, 100);
        }
        return;
      }

      const wrapper = document.querySelector('.photography-service-wrapper') as HTMLElement;
      const targets = [trigger, approach, wrapper].filter(Boolean) as HTMLElement[];

      const { loadScrollTrigger } = await import('@/lib/animations/gsapConfig');
      const { ScrollTrigger } = await loadScrollTrigger();
      if (!isMounted) return;

      const triggerBottom = trigger.getBoundingClientRect().bottom + window.scrollY;

      // ── Mobile vs Desktop trigger positions ────────────────────────
      let startPos: number;
      let endPos: number;

      if (isMobile) {
        const duration = window.innerHeight * 0.4;
        startPos = triggerBottom - window.innerHeight * 0.2; // ← adjust this value
        endPos = startPos + duration;                        // ← adjust this value
      } else {
        const duration = window.innerHeight * 0.3;
        startPos = triggerBottom - window.innerHeight * 0.38;
        endPos = startPos + duration;
      }

      stRef.current = ScrollTrigger.create({
        trigger: document.body,
        start: `${startPos}px top`,
        end: `${endPos}px top`,
        scrub: 1,
        onUpdate: (self: any) => {
          const p = Math.min(1, Math.max(0, self.progress));
          const v = Math.round(255 * p);
          const color = `rgb(${v},${v},${v})`;

          targets.forEach((el) => {
            el.style.backgroundColor = color;
          });
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