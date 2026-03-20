// src/app/production/page.tsx
import { Metadata } from 'next';
import MenuOverlay from '@/components/home/Menuoverlay';
import ProductionSections from '@/components/ProductionSections/ProductionSections';
import CTASection from '@/components/dan-max/CTASection';
import Footer from '@/components/dan-max/Footer';
import { fetchGraphQL } from '@/lib/graphql/client';
import { GET_PRODUCTION_QUERY } from '@/lib/graphql/queries';
import { mapCTAData } from '@/lib/mapCTAData';
import { mapFaqData } from '@/lib/mapFaqData';

export const metadata: Metadata = {
  title: 'IDC Production',
  description: 'IDC Production — World-class photography production in New Zealand.',
};

export default async function Production() {
  let ctaData: Record<string, any> | null = null;
  let faqSectionData: { title: string; content: string }[] | null = null;


  try {
    const raw = await fetchGraphQL(GET_PRODUCTION_QUERY);
    ctaData = raw?.pageBy?.productionPageData ?? null;
     faqSectionData = mapFaqData(ctaData);

  } catch (err) {
    console.error('Production page fetch error:', err);
  }

  // mapCTAData reads the ACF field names and outputs { heading, paragraph, contactLabel, bgImage, ... }
  const ctaSectionData = mapCTAData(ctaData);

  return (
    <>
      <MenuOverlay />
      <ProductionSections faqData={faqSectionData} />

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