// // src/components/dan-max/CTASection.tsx
// 'use client';

// import Marquee from 'react-fast-marquee';
// import { useLazyLoad } from '@/hooks/useLazyLoad';
// import '../../styles/ctasection.css';
// import { useEffect, useState } from 'react';

// /* ── Page-agnostic data shape ─────────────────────────────────────────────── */
// export interface CTASectionData {
//   /** Marquee scrolling text (optional — photographer pages use danMarquee) */
//   marqueeText?: string | null;
//   /** Top decorative line SVG */
//   marqueeTopLineImage?: { sourceUrl: string } | null;
//   /** Bottom decorative line SVG */
//   marqueeBottomLineImage?: { sourceUrl: string } | null;
//   /** Background image object (has sourceUrl) */
//   bgImage?: { sourceUrl: string } | null;
//   /** Large heading inside the CTA block */
//   heading?: string | null;
//   /** Paragraph text beneath the heading */
//   paragraph?: string | null;
//   /** Contact label shown beside the arrow (production/photography pages) */
//   contactLabel?: string | null;
//   /** Photographer name — when present, renders the diagonal-arrow SVG instead of the right-arrow */
//   photographerName?: string | null;
// }

// /* ── Fallback assets ──────────────────────────────────────────────────────── */
// const DEFAULT_TOP_LINE =
//   'https://idc.co.nz/headless/wp-content/uploads/2025/03/IDC-top.svg';
// const DEFAULT_BOTTOM_LINE =
//   'https://idc.co.nz/headless/wp-content/uploads/2025/03/IDC-bottom.svg';
// const DEFAULT_BG =
//   'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=1470&auto=format&fit=crop';

// /* ── Component ────────────────────────────────────────────────────────────── */
// export default function CTASection({ data }: { data?: CTASectionData | null }) {
//   const { ref, isVisible } = useLazyLoad({ threshold: 0.1 });
//   const [marqueeSpeed, setMarqueeSpeed] = useState(150);

//   useEffect(() => {
//     let timeoutId: ReturnType<typeof setTimeout>;

//     const handleResize = () => {
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(() => {
//         setMarqueeSpeed(window.innerWidth <= 740 ? 60 : 150);
//       }, 200);
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => {
//       clearTimeout(timeoutId);
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   /* ── Derived values ─────────────────────────────────────────────────────── */
//   const marqueeText = data?.marqueeText;
//   const bgImage = data?.bgImage?.sourceUrl || DEFAULT_BG;
//   const topLine = data?.marqueeTopLineImage?.sourceUrl || DEFAULT_TOP_LINE;
//   const bottomLine = data?.marqueeBottomLineImage?.sourceUrl || DEFAULT_BOTTOM_LINE;
//   const hasPhotographerName = Boolean(data?.photographerName);

//   return (
//     <div className="ctasection-parent">
//       {/* ── Top decorative line ─────────────────────────────────────────── */}
//       <div className="marqueeTopLine">
//         <img
//           className="marqueeTopLine-Image"
//           src={topLine}
//           alt="marqueeTopLineImage"
//         />
//       </div>

//       {/* ── Main CTA block ─────────────────────────────────────────────── */}
//       <div ref={ref} className="ctasection">
//         {isVisible && (
//           <>
//             {/* Scrolling marquee (only if text exists) */}
//             {marqueeText && (
//               <Marquee
//                 direction="right"
//                 speed={marqueeSpeed}
//                 className="marquee"
//                 autoFill
//               >
//                 <span className="marquee-item uppercase">{marqueeText}</span>
//               </Marquee>
//             )}

//             {/* Heading */}
//             {data?.heading && (
//               <div className="productionpage-marquee-data1">
//                 <div className="production-center-align production-testimonial-marqueeHeading">
//                   <h1>{data.heading}</h1>
//                 </div>
//               </div>
//             )}

//             {/* Paragraph */}
//             {data?.paragraph && (
//               <div className="productionpage-marquee-data2">
//                 <div className="production-center-align productionTestimonialMarqueeParagraph">
//                   <p>{data.paragraph}</p>
//                 </div>
//               </div>
//             )}

//             {/* Arrow + label row */}
//             <div
//               className={`ctasection-photographer-name ${
//                 data?.contactLabel
//                   ? 'ctasection-photographer-name--production'
//                   : ''
//               }`}
//             >
//               <div className="ctasection-photographer-name-inner">
//                 {/* Diagonal arrow for photographer pages, right arrow otherwise */}
//                 {hasPhotographerName ? (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="500"
//                     viewBox="0 0 375 374.999991"
//                     height="500"
//                     preserveAspectRatio="xMidYMid meet"
//                   >
//                     <defs>
//                       <clipPath id="430d2caef3">
//                         <path
//                           d="M 40.539062 40.539062 L 334.539062 40.539062 L 334.539062 334.539062 L 40.539062 334.539062 Z M 40.539062 40.539062"
//                           clipRule="nonzero"
//                         />
//                       </clipPath>
//                     </defs>
//                     <g clipPath="url(#430d2caef3)">
//                       <path
//                         fill="#ffffff"
//                         d="M 334.449219 40.539062 L 334.449219 334.160156 L 275.679688 334.160156 L 275.679688 140.859375 L 82.09375 334.445312 L 40.539062 292.890625 L 234.125 99.308594 L 40.828125 99.308594 L 40.828125 40.539062 Z M 334.449219 40.539062"
//                         fillOpacity="1"
//                         fillRule="nonzero"
//                       />
//                     </g>
//                   </svg>
//                 ) : (
//                   <svg
//                     aria-hidden="true"
//                     fill="white"
//                     className="e-font-icon-svg e-fas-arrow-right"
//                     viewBox="0 0 448 512"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
//                   </svg>
//                 )}

//                 <h1 className="marquee-photographer-name">
//                   {hasPhotographerName
//                     ? data.photographerName!.split(' ')[0] || 'OUR S WEBSITE'
//                     : data?.contactLabel}
//                 </h1>
//               </div>
//             </div>

//             {/* Background image */}
//             <img
//               className="ctasection-bg-image"
//               src={bgImage}
//               alt="Portfolio request background"
//             />
//           </>
//         )}
//       </div>

//       {/* ── Bottom decorative line ─────────────────────────────────────── */}
//       <div className="marqueeBottomLine">
//         <img src={bottomLine} alt="marqueeBottomLineImage" />
//       </div>
//     </div>
//   );
// }