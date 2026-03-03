'use client'

import { useEffect, useRef } from 'react';

export function useColorTransition(triggerSelector, targetSelector) {
  const scrollTriggerRef = useRef(null);
  const attemptsRef = useRef(0);

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

      // FIX: Detect if Awards section exists and calculate its height
      // Then offset the trigger start/end to compensate
      const awardSection = document.querySelector('[class*="award-main-section"]');
      const awardHeight = awardSection ? awardSection.getBoundingClientRect().height : 0;
      
      // Convert award height to a viewport percentage offset
      const viewportHeight = window.innerHeight;
      const awardOffsetPercent = (awardHeight / viewportHeight) * 100;

      // Adjust trigger positions: push them further down by the award section height
      const baseStart = isMobile ? 70 : 120;
      const baseEnd = isMobile ? 80 : 140;
      
      const adjustedStart = baseStart + awardOffsetPercent;
      const adjustedEnd = baseEnd + awardOffsetPercent;

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger,
        start: `top -${adjustedStart}%`,
        end: `top -${adjustedEnd}%`,
        scrub: 3,
        // markers: true,
        onUpdate: (self) => {
          const p = self.progress;
          const r = Math.round(255 - 255 * p);
          section2.style.backgroundColor = `rgb(${r},${r},${r})`;
          const t = Math.round(255 * p);
          targetsArray.forEach(el => {
            el.style.color = `rgb(${t},${t},${t})`;
          });
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
  }, [triggerSelector, targetSelector]);
}