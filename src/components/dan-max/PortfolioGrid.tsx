// ============================================
// FILE: components/dan-max/PortfolioGrid.tsx
// ============================================
// KEY CHANGES:
// 1. Single IntersectionObserver for the entire grid instead of 4 separate ones
//    (4 observers = 4x JS execution during initial load)
// 2. Inline SVG arrow instead of importing react-icons/fi
//    react-icons can pull in ~20-50KB depending on tree-shaking
// 3. Images always in DOM with native lazy loading

'use client';

import LazyImage from '../ui/LazyImage';
import { useLazyLoad } from '../../hooks/useLazyLoad';

import "../../styles/portfoliogrid.css"

// ✅ Inline arrow icon — avoids importing the entire react-icons/fi bundle
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="1em"
      height="1em"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function PortfolioCard({
  image,
  heading,
  count,
  video,
  totalItems,

}: {
  image: any;
  heading: string;
  count: number;
  video?: string;
  totalItems: number;
}) {

  const isVideo = !!video;


  return (
    <div className="portfolio-main-section "
      style={{ width: `${100 / totalItems - 2}vmax` } as React.CSSProperties}
    >
      {/* ✅ LazyImage always rendered — native loading="lazy" handles visibility
          This lets the browser preparser discover image URLs early */}

      {
        isVideo ? (
          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
            preload='metadata'
            className='portfolio-main-video portfolio-main-img'
          />
        ) : (
          <LazyImage
            src={image?.sourceUrl}
            alt={heading}
            className="portfolio-main-img"
          />
        )
      }

      <div className="portfolio-main-dets ">
        <div className="portfolio-main-cen">
          <h2 className="color-transition-text">
            {heading}
          </h2>
          <p className="portfolio-count color-transition-text">
            ({count})
          </p>
        </div>
        {/* <ArrowIcon className="color-transition-text portfolio-arrow" /> */}

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

export default function PortfolioGrid({ data }: { data: any }) {
  // ✅ Single observer for the entire grid
  const { ref, isVisible } = useLazyLoad({ threshold: 0.1 });

  if (!data) return null;

  // console.log(data.section2Video4.mediaItemUrl, "ggg")

  const portfolioItems = [
    { count: data.section2Count1, image: data.section2Images, video: data.section2Video1?.mediaItemUrl, heading: data.section2Heading1 },
    { count: data.section2Count2, image: data.section2Image2, video: data.section2Video2?.mediaItemUrl, heading: data.section2Heading2 },
    { count: data.section2Count3, image: data.section2Image3, video: data.section2Video3?.mediaItemUrl, heading: data.section2Heading3 },
    { count: data.section2Count4, image: data.section2Image4, video: data.section2Video4?.mediaItemUrl, heading: data.section2Heading4 },
  ].filter(item => item.image?.sourceUrl || item.video || item.heading)

  return (
    <div
      ref={ref}
      className="portfolio-card"
    >
      {portfolioItems.map((item, index) => (
        <PortfolioCard
          key={index}
          image={item.image}
          video={item.video}
          heading={item.heading}
          count={item.count}
          totalItems={portfolioItems.length}
        />
      ))}
    </div>
  );
}