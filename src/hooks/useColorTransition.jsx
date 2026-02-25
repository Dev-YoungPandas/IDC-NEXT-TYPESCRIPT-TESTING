// ============================================
// FILE: hooks/useColorTransition.jsx
// ============================================
// FIX: ScrollTrigger is now loaded lazily via loadScrollTrigger()
// This keeps ScrollTrigger (~30KB) out of the initial JS bundle
// It only loads when this hook actually runs (below the fold)

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

      // Retry every 100ms until elements exist in DOM
      if (!trigger || !section2 || targets.length === 0) {
        attemptsRef.current++;
        if (attemptsRef.current < 30 && isMounted) {
          timeoutId = setTimeout(setup, 100);
        }
        return;
      }

      // ✅ Lazy-load ScrollTrigger only when elements are ready
      const { loadScrollTrigger } = await import('@/lib/animations/gsapConfig');
      const { ScrollTrigger } = await loadScrollTrigger();

      if (!isMounted) return;

      const targetsArray = Array.from(targets);

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger,
        start: isMobile ? 'top -30%' : 'top -120%',
        end: isMobile ? 'top -50%' : 'top -140%',
        scrub: 3,
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