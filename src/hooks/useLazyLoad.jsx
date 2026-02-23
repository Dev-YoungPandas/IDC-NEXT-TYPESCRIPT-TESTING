'use client'

import { useEffect, useRef, useState } from 'react';

export function useLazyLoad(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true,
  } = options;

  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observerRef.current.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}