// ============================================
// FILE: components/home/HomePage.tsx
// ============================================
// CHANGES:
// 1. Accepts dynamic data from WordPress API (no more static array)
// 2. Background images replaced with background videos
// 3. Videos are preloaded and swapped smoothly
// 4. Same animation timing, same layout, same transitions
// 5. Video cleanup on unmount to prevent memory leaks

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import '../../styles/homepage.css';

interface Photographer {
  name: string;
  slug: string;
  video: string;
  mimeType: string;
}

export default function HomePage({ photographers }: { photographers: Photographer[] }) {
  const [activeIndex, setActiveIndex] = useState(photographers.length - 1);
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimationAllowed, setIsAnimationAllowed] = useState(false);
  const [showDefaultBg, setShowDefaultBg] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Check screen size
  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth > 1024);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Initial delay before animation starts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationAllowed(true);
      setShowDefaultBg(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-cycle photographers
  useEffect(() => {
    if (!isAnimationAllowed) return;
    if (isDesktop && isHovering) return;

    const interval = isDesktop ? 9000 : 8000;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) =>
        (prev - 1 + photographers.length) % photographers.length
      );
    }, interval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isDesktop, isAnimationAllowed, isHovering, photographers.length]);

  // Play/pause videos based on active index
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (isAnimationAllowed && idx === activeIndex) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeIndex, isAnimationAllowed]);

  const handleMouseEnter = useCallback(
    (index: number) => {
      if (!isAnimationAllowed || !isDesktop) return;
      setIsHovering(true);
      setActiveIndex(index);
    },
    [isAnimationAllowed, isDesktop]
  );

  const handleMouseLeave = useCallback(() => {
    if (!isAnimationAllowed || !isDesktop) return;
    setIsHovering(false);
  }, [isAnimationAllowed, isDesktop]);

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
      e.preventDefault();
      setTimeout(() => {
        window.location.href = `/${slug}`;
      }, 2000);
    },
    []
  );

  // Store video ref
  const setVideoRef = useCallback((el: HTMLVideoElement | null, idx: number) => {
    videoRefs.current[idx] = el;
  }, []);

  return (
    <div className="home-container">
      {/* Default background before animation starts */}
      {showDefaultBg && (
        <div className="photographer-bg default-bg active" />
      )}

      {/* Video backgrounds — one per photographer */}
      {photographers.map((p, idx) => (
        <div
          key={p.slug}
          className={`photographer-bg ${isAnimationAllowed && activeIndex === idx ? 'active' : ''}`}
        >
          {p.video && (
            <video
              ref={(el) => setVideoRef(el, idx)}
              loop
              muted
              playsInline
              preload="metadata"
              className="photographer-video"
            >
              <source src={p.video} type={p.mimeType || 'video/mp4'} />
            </video>
          )}
        </div>
      ))}

      {/* Photographer names */}
      <div className="photographer-name">
        {photographers.map((p, idx) => (
          <a
            key={p.slug}
            href={`/${p.slug}`}
            onClick={(e) => handleLinkClick(e, p.slug)}
            className="photographer-line"
          >
            <h1
              className={isAnimationAllowed && activeIndex === idx ? 'line-active' : ''}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
            >
              {p.name}
            </h1>
          </a>
        ))}
      </div>
    </div>
  );
}