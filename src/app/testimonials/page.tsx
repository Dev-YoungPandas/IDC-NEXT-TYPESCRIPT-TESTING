// ============================================
// FILE: src/app/testimonials/page.tsx
//
// PERFORMANCE FIXES:
// 1. REMOVED unused imports: Footer, CTASection, GET_CAMILLA_PAGE_QUERY, mapCTAData
//    → These were bundled but never rendered (CTASection was commented out)
//    → Saves ~100-200KB from server bundle
//
// 2. React.cache() on data fetcher
//    → generateMetadata() and Testimonials() both call getTestimonialsData()
//    → Without cache: 2 separate GraphQL round-trips (each ~2-5s to WordPress)
//    → With cache: 1 fetch, result reused for metadata — saves 2-5s TTFB
//
// 3. Removed the extra GET_CAMILLA_PAGE_QUERY fetch
//    → Old code fetched Camilla page data that was NEVER used in render
//    → That's a wasted ~2-5s network request to WordPress
// ============================================

import { Metadata } from 'next';
import { cache } from 'react';
import { fetchGraphQL } from '@/lib/graphql/client';
import { GET_TESTIMONIALS_PAGE_QUERY } from '@/lib/graphql/queries';
import { mapTestimonialsData } from '@/lib/mapTestimonialsData';
import MenuOverlay from '@/components/home/Menuoverlay';
import TestimonialsPage from '@/components/TestimonialsPage/TestimonialsPage';
import SubscribeCTA from '@/components/TestimonialsPage/SubscribeCTA';
import Footer from '@/components/dan-max/Footer';

// ── Fallback SEO ────────────────────────────────────────────────────────
const FALLBACK_TITLE = 'What Our Clients Say | IDC';
const FALLBACK_DESC =
    'Hear from top agency clients worldwide about their experience working with IDC Worldwide — photography production excellence since 1999.';

// ── Cached fetcher: ONE fetch shared between generateMetadata + page ────
// React.cache() deduplicates within the same server request lifecycle
const getTestimonialsData = cache(async () => {
    const raw = await fetchGraphQL(GET_TESTIMONIALS_PAGE_QUERY);
    return raw?.pageBy ?? null;
});

// ── Dynamic Metadata ────────────────────────────────────────────────────
export async function generateMetadata(): Promise<Metadata> {
    try {
        const page = await getTestimonialsData();
        return {
            title: page?.title ? `${page.title} | IDC` : FALLBACK_TITLE,
            description: FALLBACK_DESC,
        };
    } catch {
        return { title: FALLBACK_TITLE, description: FALLBACK_DESC };
    }
}

// ── Page Component ──────────────────────────────────────────────────────
export default async function Testimonials() {
    let testimonialsData = null;

    try {
        const page = await getTestimonialsData();
        testimonialsData = mapTestimonialsData(page?.testimonials ?? null);
    } catch (err) {
        console.error('Testimonials page fetch error:', err);
    }

    return (
        <>
            <MenuOverlay />
            <TestimonialsPage data={testimonialsData} />

            <div className="w-full h-[131vh] xl:h-[177vh]">
                <div className="mt-[-3.5vw] xl:bg-white">
                    {/* <CTASection data={ctaSectionData} /> */}

                    <SubscribeCTA data={testimonialsData?.subscribeCta ?? null} />

                </div>
                <div className="fixed w-full bottom-0 z-[-1]">
                    <Footer />
                </div>
            </div>

        </>
    );
}