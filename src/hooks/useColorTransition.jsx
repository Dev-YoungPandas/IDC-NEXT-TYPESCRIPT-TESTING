'use client'

import { useEffect, useRef } from 'react';

export function useColorTransition(triggerSelector, targetSelector) {
  const scrollTriggerRef = useRef(null);
  const attemptsRef = useRef(0);
  const rafRef = useRef(null);
  const currentProgress = useRef(0);

  useEffect(() => {
    if (!triggerSelector || !targetSelector) return;

    let isMounted = true;
    let timeoutId = null;
    const isMobile = window.innerWidth <= 740;

    const setup = async () => {
      const trigger = document.querySelector(triggerSelector);
      const section2 = document.querySelector('.section2');
      const targets = document.querySelectorAll(targetSelector);

      if (!trigger || !section2 || targets.length === 0) {
        attemptsRef.current++;
        if (attemptsRef.current < 30 && isMounted) {
          timeoutId = setTimeout(setup, 100);
        }
        return;
      }

      const { loadScrollTrigger } = await import('@/lib/animations/gsapConfig');
      const { ScrollTrigger } = await loadScrollTrigger();

      if (!isMounted) return;

      const targetsArray = Array.from(targets);

      // Anchor to section2 bottom — consistent regardless of Awards height
      const section2Bottom = section2.offsetTop + section2.offsetHeight;
      const transitionDuration = window.innerHeight * (isMobile ? 0.3 : 0.2);
      const endPos = section2Bottom - window.innerHeight * (isMobile ? 0.6 : 0.12);
      const startPos = endPos - transitionDuration;

      // Apply color instantly — no lerp, no delay
      const applyColors = (progress) => {
        const p = Math.min(1, Math.max(0, progress));
        const r = Math.round(255 - 255 * p);
        const t = Math.round(255 * p);
        section2.style.backgroundColor = `rgb(${r},${r},${r})`;
        targetsArray.forEach(el => {
          el.style.color = `rgb(${t},${t},${t})`;
        });
      };

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: document.body,
        start: `${startPos}px top`,
        end: `${endPos}px top`,
        scrub: true,  // true = instant sync, no delay
        onUpdate: (self) => {
          applyColors(self.progress);
        },
      });
    };

    setup();

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      attemptsRef.current = 0;
    };
  }, [triggerSelector, targetSelector]);
}