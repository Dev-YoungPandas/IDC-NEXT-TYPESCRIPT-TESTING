'use client';

import { useEffect, useRef } from 'react';

export function useHomeColorTransition() {
  const scrollTriggerRef = useRef<any>(null);
  const attemptsRef = useRef(0);

  useEffect(() => {
    let isMounted = true;
    let timeoutId: any = null;
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 740;

    const setup = async () => {
      // The heading section = trigger point
      const headingSection = document.querySelector('.homesection3-heading-section');
      // The full page wrapper = what changes color
      const wrapper = document.querySelector('.homepage-wrapper') as HTMLElement;

      if (!headingSection || !wrapper) {
        attemptsRef.current++;
        if (attemptsRef.current < 30 && isMounted) {
          timeoutId = setTimeout(setup, 100);
        }
        return;
      }

      const { loadScrollTrigger } = await import('@/lib/animations/gsapConfig');
      const { ScrollTrigger } = await loadScrollTrigger();

      if (!isMounted) return;

      // Calculate positions — same approach as useColorTransition
      const headingTop = headingSection.getBoundingClientRect().top + window.scrollY;
      const transitionDuration = window.innerHeight * (isMobile ? 0.3 : 0.2);
      const startPos = headingTop - window.innerHeight * (isMobile ? 0.7 : 0.8);
      const endPos = startPos + transitionDuration;

      const applyColors = (progress: number) => {
        const p = Math.min(1, Math.max(0, progress));
        // Background: white(255) → black(0)
        const bg = Math.round(255 - 255 * p);
        wrapper.style.backgroundColor = `rgb(${bg},${bg},${bg})`;
      };

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: document.body,
        start: `${startPos}px top`,
        end: `${endPos}px top`,
        scrub: true,
        onUpdate: (self: any) => {
          applyColors(self.progress);
        },
      });
    };

    setup();

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      attemptsRef.current = 0;
    };
  }, []);
}