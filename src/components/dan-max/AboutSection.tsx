// ============================================
// FILE: components/dan-max/AboutSection.tsx
// ============================================
// Changes: Uses simplified LazyImage (no double lazy-load)

'use client';

import { useColorTransition } from '@/hooks/useColorTransition';
import TextReveal from '@/components/animations/TextReveal';
import LazyImage from '@/components/ui/LazyImage';
import { useLazyLoad } from '@/hooks/useLazyLoad';
import { useMemo } from 'react';
import "../../styles/aboutsection.css"
import { useEffect, useRef } from 'react';



export default function AboutSection({ data }: { data: any }) {
  const { ref, isVisible } = useLazyLoad({ threshold: 0.2 });

  const section4Ref = useRef<HTMLDivElement>(null);

  useColorTransition('.section4', '.color-transition-text');

  useEffect(() => {

    if (!isVisible) return;
    const timer = setTimeout(() => {

      section4Ref.current?.classList.add('visible');
    }, 800);
    return () => clearTimeout(timer)
  }, [isVisible])

  if (!data) return null;


  const isVideo = !!data?.section3Video1?.mediaItemUrl;
  // console.log(data.section3Video1.mediaItemUrl, "section3Video1")

  return (
    <div ref={ref} className="about-section">
      {isVisible && (
        <TextReveal className="aboutSec-textreaveal">
          <p>
            {data?.section3Paragraph1}
          </p>

          <h1>
            {data?.section3Heading1}
          </h1>
          <h5>

            {data.section3Paragraph2}
          </h5>
          <h6>
            - {data.photographerName}
          </h6>
        </TextReveal>
      )}

      <div ref={section4Ref} className="section4 about-section4">
        <div className="about-section4-left">
          <div className="about-section4-img1">

            {isVideo ? (
              <video
                src={data.section3Video1.mediaItemUrl}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="about-section4-media"
              />
            ) : (
              <LazyImage
                src={data.section3Image1?.sourceUrl}
                alt={data.section3Image1?.altText}
                className="about-section4-media"
              />
            )}

          </div>
          <div className="about-section4-img2">
            <LazyImage
              src={data.section3Image2?.sourceUrl}
              alt={data.section3Image2?.altText}
              className="w-full h-full"
            />
          </div>
        </div>

        <div className="about-section4-right">
          {useMemo(() => {
            const text = (data.section3Paragraph3 || '').replace(/<[^>]*>/g, '').trim();
            const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
            const perGroup = Math.ceil(sentences.length / 4);
            const paragraphs = [];
            for (let i = 0; i < sentences.length; i += perGroup) {
              paragraphs.push(sentences.slice(i, i + perGroup).join('').trim());
            }
            return paragraphs.map((para, i) => <p key={i}>{para}</p>);
          }, [data.section3Paragraph3])}
        </div>
      </div>
    </div>
  );
}