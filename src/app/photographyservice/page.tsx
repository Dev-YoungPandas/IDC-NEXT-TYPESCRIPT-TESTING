// src/app/photography-service/page.tsx
import { Metadata } from 'next';
import MenuOverlay from '@/components/home/Menuoverlay';
import CTASection from '@/components/dan-max/CTASection';
import Footer from '@/components/dan-max/Footer';
import { fetchGraphQL } from '@/lib/graphql/client';
import { GET_PHOTOGRAPHY_SERVICE_QUERY } from '@/lib/graphql/queries';
import { mapCTAData } from '@/lib/mapCTAData';
import PhotographyServiceSections from '@/components/PhotographyServiceSections/PhotographyServiceSections';

export const metadata: Metadata = {
  title: 'Photography Service',
  description: 'IDC Photography Service — Premium photography production services across New Zealand.',
};

export default async function PhotographyService() {
  let ctaData: Record<string, any> | null = null;

  try {
    const raw = await fetchGraphQL(GET_PHOTOGRAPHY_SERVICE_QUERY);
    console.log(raw, "raw")
    // ⚠️ Change 'photographyServicePageData' to match your actual ACF group name
    ctaData = raw?.pageBy?.productionPageData ?? null;
    console.log(ctaData,"ctadata")
  } catch (err) {
    console.error('Photography service page fetch error:', err);
  }

  const ctaSectionData = mapCTAData(ctaData);

  console.log(ctaSectionData, "ctasection")

  return (
    <>
      <MenuOverlay />
      <PhotographyServiceSections />

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