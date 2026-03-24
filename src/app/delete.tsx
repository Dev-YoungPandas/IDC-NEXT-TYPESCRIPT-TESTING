// ============================================
// FILE: src/app/testimonials/page.tsx
// 
// PERFORMANCE OPTIMIZATIONS:
// 1. Shared getTestimonialsData() — Next.js deduplicates identical fetch
//    calls within the same request, so generateMetadata + page use ONE fetch
// 2. MenuOverlay dynamic import with ssr:false — saves ~200KB from initial bundle
//    (it's a hidden overlay, never visible at first paint)
// 3. SubscribeCTA dynamic import — below fold, not needed for FCP/LCP
// 4. Removed separate CTA fetch (GET_CAMILLA_PAGE_QUERY) — was unused in render
// ============================================

import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { fetchGraphQL } from '@/lib/graphql/client';
import { GET_TESTIMONIALS_PAGE_QUERY } from '@/lib/graphql/queries';
import { mapTestimonialsData } from '@/lib/mapTestimonialsData';
import TestimonialsPage from '@/components/TestimonialsPage/TestimonialsPage';

// ── Lazy-load: overlay never visible at first paint ─────────────────────
const MenuOverlay = dynamic(() => import('@/components/home/Menuoverlay'), {
    ssr: false,
});

// ── Lazy-load: below fold, not needed for LCP ───────────────────────────
const SubscribeCTA = dynamic(
    () => import('@/components/TestimonialsPage/SubscribeCTA'),
    { ssr: false, loading: () => <div style={{ minHeight: '68vh' }} /> }
);

// ── Fallback SEO ────────────────────────────────────────────────────────
const FALLBACK_TITLE = 'What Our Clients Say | IDC';
const FALLBACK_DESC =
    'Hear from top agency clients worldwide about their experience working with IDC Worldwide — photography production excellence since 1999.';

// ── Shared data fetcher (deduplicated by Next.js within same request) ───
async function getTestimonialsData() {
    const raw = await fetchGraphQL(GET_TESTIMONIALS_PAGE_QUERY);
    return raw?.pageBy ?? null;
}

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
            <SubscribeCTA data={testimonialsData?.subscribeCta ?? null} />
        </>
    );
}




{/* <div
    className="tp-quote-text"
    dangerouslySetInnerHTML={{ __html: t.quote }}
/> */}



// {/* <>
//     <MenuOverlay />
//     <TestimonialsPage data={testimonialsData} />

//     <div className="w-full h-[131vh] xl:h-[177vh]">
//         <div className="mt-[-3.5vw] xl:bg-white">
//             {/* <CTASection data={ctaSectionData} /> */}

//             <SubscribeCTA data={testimonialsData?.subscribeCta ?? null} />

//         </div>
//         <div className="fixed w-full bottom-0 z-[-1]">
//             <Footer />
//         </div>
//     </div>

// </> */}