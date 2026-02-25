'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import '../../styles/homepage.css';

interface Photographer {
  name: string;
  slug: string;
  image: string;
  role: string;
}

export default function HomePage({ photographers }: { photographers: Photographer[] }) {
  const [activeIndex, setActiveIndex] = useState(photographers.length - 1);
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimationAllowed, setIsAnimationAllowed] = useState(false);
  const [showDefaultImage, setShowDefaultImage] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth > 1024);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationAllowed(true);
      setShowDefaultImage(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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

  return (
    <div className="home-container">
      {showDefaultImage && (
        <div className="photographer-bg default-bg active" />
      )}

      {photographers.map((p, idx) => (
        <div
          key={p.slug}
          className={`photographer-bg ${isAnimationAllowed && activeIndex === idx ? 'active' : ''}`}
          style={{ backgroundImage: `url(${p.image})` }}
        />
      ))}

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