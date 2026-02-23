'use client'

import { useEffect, useRef, ReactNode } from 'react';

interface QuoteRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number; // ms between each line
}

export default function QuoteReveal({ children, className = '', staggerDelay = 400 }: QuoteRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // Find all text elements inside
    const textElements = container.querySelectorAll('h1, h2, h3, h4, h5, h6, p');

    // Split each text element into lines
    textElements.forEach((element) => {
      if (element.classList.contains('quote-split-done')) return;

      const html = element.innerHTML.trim();
      // Split by <br>, <br/>, <br />, or newlines
      const lines = html.split(/<br\s*\/?>|\n/).filter((line: string) => line.trim());

      if (lines.length <= 1) {
        // Single line — wrap it as one line
        element.innerHTML = `
          <span class="quote-line-wrapper">
            <span class="quote-line-inner">${html}</span>
          </span>
        `;
      } else {
        // Multiple lines
        element.innerHTML = lines.map((line: string) => `
          <span class="quote-line-wrapper">
            <span class="quote-line-inner">${line.trim()}</span>
          </span>
        `).join('');
      }

      element.classList.add('quote-split-done');
    });

    // Collect ALL line wrappers across all elements in order
    const allLines = container.querySelectorAll('.quote-line-wrapper');

    // Observe the container itself
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            allLines.forEach((line, i) => {
              setTimeout(() => {
                line.classList.add('quote-animate');
              }, i * staggerDelay);
            });

            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: isMobile ? '0px 0px -20% 0px' : '0px 0px -15% 0px',
        threshold: 0.1,
      }
    );

    observerRef.current.observe(container);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [staggerDelay]);

  return (
    <div ref={containerRef} className={`quote-reveal ${className}`}>
      {children}
    </div>
  );
}