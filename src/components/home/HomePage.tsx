'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import '../../styles/homepage.css';

interface Photographer {
  name: string;
  slug: string;
  image: string;
  role: string;
}

const PHOTOGRAPHERS_DATA = [
  { name: 'Dan Max', slug: 'dan-max', image: 'https://images.unsplash.com/photo-1503673508983-5f2fbaf1df4d?w=800&auto=format&fit=crop&q=60' },
  { name: 'Yuki Sato', slug: 'yuki-sato', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=60' },
  { name: 'Guy Coombes', slug: 'guy-coombes', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=60' },
  { name: 'Camilla Ritherford', slug: 'camilla-ritherford', image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop&q=60' },
  { name: 'Dean Mackenzie', slug: 'dean-mackenzie', image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&auto=format&fit=crop&q=60' },
  { name: 'Sacha Stejko', slug: 'sacha-stejko', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=60' },
];

export default function HomePage({ photographers }: { photographers: Photographer[] }) {
  const [activeIndex, setActiveIndex] = useState(5);
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimationAllowed, setIsAnimationAllowed] = useState(false);
  const [showDefaultImage, setShowDefaultImage] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true); // default true to avoid flash
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Detect desktop vs mobile
  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth > 1024);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Initial 3-second delay then start animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationAllowed(true);
      setShowDefaultImage(false); // Hide default image like WordPress does
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-cycle timer
  // Desktop: 9s, pauses on hover
  // Mobile: 8s, no hover pause
  useEffect(() => {
    if (!isAnimationAllowed) return;
    if (isDesktop && isHovering) return; // Only desktop pauses on hover

    const interval = isDesktop ? 9000 : 8000;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) =>
        (prev - 1 + PHOTOGRAPHERS_DATA.length) % PHOTOGRAPHERS_DATA.length
      );
    }, interval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isDesktop, isAnimationAllowed, isHovering]);

  // Desktop hover handlers
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

  // Delayed navigation (matches WordPress 2s delay on link click)
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
      {/* Default image — shown for first 3 seconds before animation starts */}
      {showDefaultImage && (
        <div className="photographer-bg default-bg active" />
      )}

      {/* Background images — crossfade based on active index */}
      {PHOTOGRAPHERS_DATA.map((p, idx) => (
        <div
          key={idx}
          className={`photographer-bg ${isAnimationAllowed && activeIndex === idx ? 'active' : ''}`}
          style={{ backgroundImage: `url(${p.image})` }}
        />
      ))}

      {/* Names panel */}
      <div className="photographer-name">
        {PHOTOGRAPHERS_DATA.map((p, idx) => (
          <a
            key={idx}
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