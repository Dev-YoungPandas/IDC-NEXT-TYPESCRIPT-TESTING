// ═══════════════════════════════════════════════════════════════════════════
// FILE: src/lib/mapTestimonialsData.ts
// Maps raw WordPress ACF numbered fields into clean typed arrays.
// ═══════════════════════════════════════════════════════════════════════════

// ── Types ────────────────────────────────────────────────────────────────

export interface Testimonial {
    name: string;
    logo: string;
    quote: string;
    designation: string;
    company: string;
}

export interface AgencyClient {
    name: string;
    logo: string;
}

export interface SubscribeCTAData {
    heading: string;
    subheading: string;
    inputFullName: string;
    inputEmail: string;
    inputCompany: string;
    bgImage: string;
    filmStripTop: string;
    filmStripBottom: string;
}

export interface TestimonialsPageData {
    heroHeading: string;
    testimonials: Testimonial[];
    agencyClients: AgencyClient[];
    subscribeCta: SubscribeCTAData | null;
}

// ── Mapper ───────────────────────────────────────────────────────────────

/**
 * Transforms raw WordPress ACF data (numbered fields like tpPersonName1,
 * tpPersonName2, etc.) into structured arrays.
 *
 * Filters out entries where any required field is missing, so partial
 * CMS data won't render broken cards.
 */
export function mapTestimonialsData(
    raw: Record<string, any> | null | undefined
): TestimonialsPageData | null {
    if (!raw) return null;

    const heroHeading = raw.tpHeroHeading ?? 'WHAT OUR CLIENTS SAY.';

    // ── Build testimonials (6 slots) ──────────────────────────────────────
    const TESTIMONIAL_COUNT = 6;
    const testimonials: Testimonial[] = [];

    for (let i = 1; i <= TESTIMONIAL_COUNT; i++) {
        const name = raw[`tpPersonName${i}`];
        const logo = raw[`tpCompanyLogo${i}`]?.sourceUrl;
        const quote = raw[`tpQuoteText${i}`];
        const designation = raw[`tpDesignationText${i}`];
        const company = raw[`tpCompanyText${i}`];

        // Only include entries with all required fields populated
        if (name && quote && designation && company) {
            testimonials.push({ name, logo: logo ?? '', quote, designation, company });
        }
    }

    // ── Build agency clients (16 slots) ───────────────────────────────────
    const AGENCY_COUNT = 16;
    const agencyClients: AgencyClient[] = [];

    for (let i = 1; i <= AGENCY_COUNT; i++) {
        const name = raw[`tpAgencyName${i}`];
        const logo = raw[`tpAgencyLogo${i}`]?.sourceUrl;

        // Only include entries that have at least a name
        if (name) {
            agencyClients.push({ name, logo: logo ?? '' });
        }
    }

    // ── Build Subscribe CTA data ──────────────────────────────────────────
    const subscribeCta: SubscribeCTAData | null =
        raw.sctaHeading || raw.sctaBg?.sourceUrl
            ? {
                heading: raw.sctaHeading ?? 'Subscribe',
                subheading: raw.sctaSubheading ?? 'The latest imagery, straight to your inbox',
                inputFullName: raw.sctaInputFullName ?? 'Your full name',
                inputEmail: raw.sctaInputEmail ?? 'Email',
                inputCompany: raw.sctaInputCompany ?? 'Company',
                bgImage: raw.sctaBg?.sourceUrl ?? '',
                filmStripTop: raw.sctaFilmStripTop?.sourceUrl ?? '',
                filmStripBottom: raw.sctaFilmStripBottom?.sourceUrl ?? '',
            }
            : null;

    return { heroHeading, testimonials, agencyClients, subscribeCta };
}