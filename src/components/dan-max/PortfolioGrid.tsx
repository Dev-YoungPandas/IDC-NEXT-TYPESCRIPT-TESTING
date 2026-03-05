'use client';

import { useState, useEffect } from 'react';
import LazyImage from '../ui/LazyImage';
import { useLazyLoad } from '../../hooks/useLazyLoad';
import "../../styles/portfoliogrid.css"

function PortfolioCard({
  images,
  heading,
  count,
  video,
  totalItems,
  currentPart,
}: {
  images: any[];
  heading: string;
  count: number;
  video?: string;
  totalItems: number;
  currentPart: number;
}) {
  const isVideo = !!video;

  // Pick the image for the current part (0, 1, or 2)
  // If that part's image doesn't exist, fall back to first available
  const currentImage = images[currentPart] || images[0];

  return (
    <div
      className="portfolio-main-section"
      style={{ width: `${100 / totalItems - 2}vmax` } as React.CSSProperties}
    >
      {isVideo ? (
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="portfolio-main-video portfolio-main-img"
        />
      ) : (
        <LazyImage
          src={currentImage?.sourceUrl}
          alt={heading}
          className="portfolio-main-img"
        />
      )}

      <div className="portfolio-main-dets">
        <div className="portfolio-main-cen">
          <h2 className="color-transition-text">{heading}</h2>
          <p className="portfolio-count color-transition-text">({count})</p>
        </div>

        <svg
          className="color-transition-text portfolio-arrow"
          xmlns="http://www.w3.org/2000/svg"
          width="500"
          height="500"
          viewBox="0 0 375 374.999991"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <clipPath id="dc73adff0a">
              <path
                d="M 40.539062 40.539062 L 334.539062 40.539062 L 334.539062 334.539062 L 40.539062 334.539062 Z M 40.539062 40.539062"
                clipRule="nonzero"
              />
            </clipPath>
          </defs>
          <g clipPath="url(#dc73adff0a)">
            <path
              fill="#040606"
              fillOpacity="1"
              fillRule="nonzero"
              d="M 334.449219 40.539062 L 334.449219 334.160156 L 275.679688 334.160156 L 275.679688 140.859375 L 82.09375 334.445312 L 40.539062 292.890625 L 234.125 99.308594 L 40.828125 99.308594 L 40.828125 40.539062 Z M 334.449219 40.539062"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

// Calculate which part (0, 1, or 2) based on current time
// Changes every 6 hours: 0→1→2→0→1→2...
function getCurrentPart(): number {
  const SIX_HOURS_MS = 6 * 60 * 60 * 1000;
          // const SIX_HOURS_MS = 3 * 1000;

  const now = Date.now();
  // Divide total milliseconds since epoch by 6 hours, mod 3
  return Math.floor(now / SIX_HOURS_MS) % 3;
}

export default function PortfolioGrid({ data }: { data: any }) {
  const { ref, isVisible } = useLazyLoad({ threshold: 0.1 });
  const [currentPart, setCurrentPart] = useState(() => getCurrentPart());

  useEffect(() => {
    // Calculate ms until next 6-hour boundary
    const SIX_HOURS_MS = 6 * 60 * 60 * 1000;
        // const SIX_HOURS_MS = 3 * 1000;

    const now = Date.now();
    const msUntilNextChange = SIX_HOURS_MS - (now % SIX_HOURS_MS);

    // Set timeout for the first change, then interval every 6 hours
    const timeout = setTimeout(() => {
      setCurrentPart(getCurrentPart());

      const interval = setInterval(() => {
        setCurrentPart(getCurrentPart());
      }, SIX_HOURS_MS);

      // Store interval id for cleanup
      cleanupInterval = interval;
    }, msUntilNextChange);

    let cleanupInterval: NodeJS.Timeout | null = null;

    return () => {
      clearTimeout(timeout);
      if (cleanupInterval) clearInterval(cleanupInterval);
    };
  }, []);

  if (!data) return null;

  // Each card gets an array of 3 images (Part1, Part2, Part3)
  // Video cards stay unchanged — only image cards rotate
  const portfolioItems = [
    {
      count: data.section2Count1,
      images: [data.section2ImagePart1, data.section2ImagePart2, data.section2ImagePart3],
      video: data.section2Video1?.mediaItemUrl,
      heading: data.section2Heading1,
    },
    {
      count: data.section2Count2,
      images: [data.section2Image2Part1, data.section2Image2Part2, data.section2Image2Part3],
      video: data.section2Video2?.mediaItemUrl,
      heading: data.section2Heading2,
    },
    {
      count: data.section2Count3,
      images: [data.section2Image3Part1, data.section2Image3Part2, data.section2Image3Part3],
      video: data.section2Video3?.mediaItemUrl,
      heading: data.section2Heading3,
    },
    {
      count: data.section2Count4,
      images: [data.section2Image4Part1, data.section2Image4Part2, data.section2Image4Part3],
      video: data.section2Video4?.mediaItemUrl,
      heading: data.section2Heading4,
    },
  ].filter(item => item.images[0]?.sourceUrl || item.video || item.heading);

  return (
    <div ref={ref} className="portfolio-card">
      {portfolioItems.map((item, index) => (
        <PortfolioCard
          key={index}
          images={item.images}
          video={item.video}
          heading={item.heading}
          count={item.count}
          totalItems={portfolioItems.length}
          currentPart={currentPart}
        />
      ))}
    </div>
  );
}