// src/lib/mapCTAData.ts
import type { CTASectionData } from '@/components/dan-max/CTASection';

/**
 * Maps raw WordPress ACF CTA fields (same names across pages)
 * into the unified CTASectionData shape that CTASection expects.
 */
export function mapCTAData(
  raw: Record<string, any> | null | undefined,
  overrides?: Partial<CTASectionData>
): CTASectionData | null {
  if (!raw) return null;

  return {
    marqueeText: raw.danMarquee ?? null,
    marqueeTopLineImage: raw.productionCtaMarqueeTopLineImage ?? null,
    marqueeBottomLineImage: raw.productionCtaMarqueeBottomLineImage ?? null,
    bgImage: raw.productionCtaBgImage ?? null,
    heading: raw.productionTestimonialMarqueeHeading ?? null,
    paragraph: raw.productionTestimonialMarqueeParagraph ?? null,
    contactLabel: raw.productionTestimonialMarqueeContact ?? null,
    photographerName: null,
    ...overrides,
  };
}