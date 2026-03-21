// ============================================
// FILE: app/testimonials/page.tsx (Testimonials - Server Component)
// ============================================

import { Metadata } from 'next';
import MenuOverlay from '@/components/home/Menuoverlay';
import Footer from '@/components/dan-max/Footer';
import CTASection from '@/components/dan-max/CTASection';
import { fetchGraphQL } from '@/lib/graphql/client';
import { GET_CAMILLA_PAGE_QUERY } from '@/lib/graphql/queries';
import { mapCTAData } from '@/lib/mapCTAData';
import TestimonialsPage from '@/components/TestimonialsPage/TestimonialsPage';

export const metadata: Metadata = {
    title: 'What Our Clients Say | IDC',
    description:
        'Hear from top agency clients worldwide about their experience working with IDC Worldwide — photography production excellence since 1999.',
};

export default async function Testimonials() {
    let ctaData: Record<string, any> | null = null;

    try {
        const raw = await fetchGraphQL(GET_CAMILLA_PAGE_QUERY);
        ctaData = raw?.pageBy?.camilla ?? null;
    } catch (err) {
        console.error('Testimonials page fetch error:', err);
    }

    const ctaSectionData = ctaData ? mapCTAData(ctaData) : null;

    return (
        <>
            <MenuOverlay />
            <TestimonialsPage />

            <div className="w-full h-[131vh] xl:h-[177vh]">
                <div className="mt-[-3.5vw] xl:bg-white">
                    <CTASection data={ctaSectionData} />
                </div>
                <div className="fixed w-full bottom-0 z-[-1]">
                    <Footer />
                </div>
            </div>

        </>
    );
}