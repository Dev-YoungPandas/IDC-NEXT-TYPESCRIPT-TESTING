'use client';

import ReactLenis from 'lenis/react';
import DanMaxPage from '@/components/dan-max/DanMaxPage';

export default function ClientPage({
  data,
  photographer,
}: {
  data: any;
  photographer: string;
}) {
  if (!data) return null;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.07,
        duration: 1.2,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      }}
    >
      <DanMaxPage data={data} photographer={photographer} />
    </ReactLenis>
  );
}