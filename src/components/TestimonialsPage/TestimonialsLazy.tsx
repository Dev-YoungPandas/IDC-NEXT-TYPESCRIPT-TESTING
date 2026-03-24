'use client';

import dynamic from 'next/dynamic';

// ── Lazy-load: overlay never visible at first paint ─────────────────────
export const LazyMenuOverlay = dynamic(
    () => import('@/components/home/Menuoverlay'),
    { ssr: false }
);

// ── Lazy-load: below fold, not needed for LCP ───────────────────────────
export const LazySubscribeCTA = dynamic(
    () => import('@/components/TestimonialsPage/SubscribeCTA'),
    { ssr: false, loading: () => <div style={{ minHeight: '68vh' }} /> }
);

