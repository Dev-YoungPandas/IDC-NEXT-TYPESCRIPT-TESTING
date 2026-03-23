// ============================================
// FILE: src/app/testimonials/page.tsx (Testimonials - Server Component)
// ============================================

import { Metadata } from 'next';
import MenuOverlay from '@/components/home/Menuoverlay';
import Footer from '@/components/dan-max/Footer';
import CTASection from '@/components/dan-max/CTASection';
import { fetchGraphQL } from '@/lib/graphql/client';
import { GET_CAMILLA_PAGE_QUERY, GET_TESTIMONIALS_PAGE_QUERY } from '@/lib/graphql/queries';
import { mapCTAData } from '@/lib/mapCTAData';
import { mapTestimonialsData } from '@/lib/mapTestimonialsData';
import TestimonialsPage from '@/components/TestimonialsPage/TestimonialsPage';
import SubscribeCTA from '@/components/TestimonialsPage/SubscribeCTA';

// ── Fallback SEO values ─────────────────────────────────────────────────
const FALLBACK_TITLE = 'What Our Clients Say | IDC';
const FALLBACK_DESC =
    'Hear from top agency clients worldwide about their experience working with IDC Worldwide — photography production excellence since 1999.';

// ── Dynamic Metadata ────────────────────────────────────────────────────
export async function generateMetadata(): Promise<Metadata> {
    try {
        const raw = await fetchGraphQL(GET_TESTIMONIALS_PAGE_QUERY);
        const page = raw?.pageBy;

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
    let ctaData: Record<string, any> | null = null;
    let testimonialsData = null;

    try {
        // Fetch both queries concurrently for better performance
        const [ctaRaw, testimonialsRaw] = await Promise.all([
            fetchGraphQL(GET_CAMILLA_PAGE_QUERY),
            fetchGraphQL(GET_TESTIMONIALS_PAGE_QUERY),
        ]);

        ctaData = ctaRaw?.pageBy?.camilla ?? null;
        testimonialsData = mapTestimonialsData(testimonialsRaw?.pageBy?.testimonials ?? null);
    } catch (err) {
        console.error('Testimonials page fetch error:', err);
    }

    const ctaSectionData = ctaData ? mapCTAData(ctaData) : null;

    return (
        <>
            <MenuOverlay />
            <TestimonialsPage data={testimonialsData} />
            <SubscribeCTA data={testimonialsData?.subscribeCta ?? null} />

            {/* <div className="w-full h-[131vh] xl:h-[177vh]">
                <div className="mt-[-3.5vw] xl:bg-white">
                    <CTASection data={ctaSectionData} />
                </div>
                <div className="fixed w-full bottom-0 z-[-1]">
                    <Footer />
                </div>
            </div> */}
        </>
    );
}