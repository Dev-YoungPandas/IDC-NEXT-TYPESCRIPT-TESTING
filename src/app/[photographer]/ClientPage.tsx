'use client';

import ReactLenis from 'lenis/react';
import DanMaxPage from '@/components/dan-max/DanMaxPage';
import Yukisatopage from '@/components/yuki-sato/Yukisatopage';

const PHOTOGRAPHER_COMPONENTS: Record<string, React.ComponentType<{ serverData: any }>> = {
  'dan-max': DanMaxPage,
  'yuki-sato': Yukisatopage,
};

export default function ClientPage({
  data,
  photographer,
}: {
  data: any;
  photographer: string;
}) {
  const PageComponent = PHOTOGRAPHER_COMPONENTS[photographer];

  if (!PageComponent) return null;

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
      <PageComponent serverData={data} />
    </ReactLenis>
  );
}