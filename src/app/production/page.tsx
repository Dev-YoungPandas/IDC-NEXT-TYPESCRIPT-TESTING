// src/app/production/page.tsx
import { Metadata } from 'next';
import MenuOverlay from '@/components/home/Menuoverlay';
import ProductionSections from '@/components/ProductionSections/ProductionSections';
import CTASection from '@/components/dan-max/CTASection';
import Footer from '@/components/dan-max/Footer';
import { fetchGraphQL } from '@/lib/graphql/client';
import { GET_PRODUCTION_QUERY } from '@/lib/graphql/queries';

export const metadata: Metadata = {
  title: 'Production',
  description: 'IDC Production — World-class photography production in New Zealand.',
};

export default async function Production() {

  let ctaData: Record<string, any> | null = null;

  try {
    const raw = await fetchGraphQL(GET_PRODUCTION_QUERY);
    ctaData = raw?.pageBy?.productionPageData ?? null;

    console.log(ctaData, "ctasectionData")
  } catch (err) {
    console.error('Production page fetch error:', err);
  }


  const ctaSectionData = ctaData
    ? {
      // danMarquee: ctaData.productionCtaMarqueeText,
      marqueeTopLineImage: ctaData.productionCtaMarqueeTopLineImage,
      marqueeBottomLineImage: ctaData.productionCtaMarqueeBottomLineImage,
      marqueeImage: ctaData.productionCtaBgImage,
      // CTASection uses `photographerName` for the label beside the arrow.
      // Pass the production-specific label (e.g. "IDC") or fall back to null
      productionMarqueeHeading: ctaData.productionTestimonialMarqueeHeading ?? null,
      productionMarqueeParagraph: ctaData.productionTestimonialMarqueeParagraph ?? null,
      productionMarqueeContact: ctaData.productionTestimonialMarqueeContact ?? null,
      productionBgImage: ctaData.productionCtaBgImage.sourceUrl ?? null,
    }
    : null;


  return (
    <>
      <MenuOverlay />
      <ProductionSections />
      {/* <CTASection variant="subscribe" /> */}


      <div className='w-full  h-[131vh] xl:h-[177vh]'>
        <div className='mt-[-3.5vw] xl:bg-white'>
          <CTASection data={ctaSectionData} />
        </div>

        <div className='fixed w-full bottom-0 z-[-1]'>
          <Footer />
        </div>
      </div>
    </>
  );
}