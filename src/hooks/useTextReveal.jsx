'use client'

import { useEffect, useRef } from 'react';

export function useTextReveal(enabled = true) {
  const containerRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // Find all text elements
    const textElements = container.querySelectorAll(
      'h1, h2, h3, h4, h5, h6, p'
    );

    // Split text into lines
    textElements.forEach((element) => {
      if (element.classList.contains('split-processed')) return;

      const text = element.textContent;
      const lines = text.split('\n').filter(line => line.trim());
      
      element.innerHTML = lines.map(line => `
        <span class="line-wrapper">
          <span class="line-inner">${line}</span>
        </span>
      `).join('');
      
      element.classList.add('split-processed');
    });

    // Intersection Observer for animation
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lines = entry.target.querySelectorAll('.line-wrapper');
            lines.forEach((line) => {
              line.classList.add('animate');
            });
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: isMobile ? '0px 0px -20% 0px' : '0px 0px -15% 0px',
        threshold: 0.1,
      }
    );

    textElements.forEach((element) => {
      observerRef.current.observe(element);
    });

    // CLEANUP
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [enabled]);

  return containerRef;
}