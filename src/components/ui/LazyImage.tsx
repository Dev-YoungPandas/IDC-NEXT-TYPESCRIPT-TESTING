// ============================================
// FILE: components/ui/LazyImage.tsx
// ============================================
// KEY CHANGES:
// 1. REMOVED IntersectionObserver — was creating a double lazy-load chain:
//    JS load → Observer init → Observer fires → img added to DOM → browser loads img
//    Now: img is in DOM immediately → browser's native lazy loading handles it
// 2. Native loading="lazy" is FASTER because the browser preparser can
//    discover the image URL while parsing HTML, before JS even executes
// 3. Priority images bypass lazy loading entirely

'use client';

import { useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export default function LazyImage({
  src,
  alt,
  className = '',
  priority = false,
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);

  if (!src) return <div className={`relative ${className} bg-gray-200`} />;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt || ''}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        {...(priority ? { fetchPriority: 'high' as any } : {})}
      />
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
}