// src/lib/mapFaqData.ts

/**
 * Maps raw WordPress FAQ fields (faqsTitle1-5, faqsParagraph1-5)
 * into an array of { title, content } for AccordianSection.
 * Returns null if no FAQ data found.
 */
export function mapFaqData(
  raw: Record<string, any> | null | undefined
): { title: string; content: string }[] | null {
  if (!raw) return null;

  const faqs: { title: string; content: string }[] = [];

  for (let i = 1; i <= 5; i++) {
    const title = raw[`faqsTitle${i}`];
    const content = raw[`faqsParagraph${i}`];
    if (title && content) {
      faqs.push({ title, content });
    }
  }

  return faqs.length > 0 ? faqs : null;
}