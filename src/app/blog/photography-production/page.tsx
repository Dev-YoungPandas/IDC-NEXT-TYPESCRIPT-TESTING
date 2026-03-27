// ═══════════════════════════════════════════════════════════════════════════
// FILE: src/app/blog/photography-production/page.tsx
// Blog Post Page — Server Component
// Route: /blog/photography-production
// ═══════════════════════════════════════════════════════════════════════════

import BlogPostHero from "@/components/BlogPost/BlogPostHero";
import CTASection from "@/components/dan-max/CTASection";
import Footer from "@/components/dan-max/Footer";
import MenuOverlay from "@/components/home/Menuoverlay";
import { fetchGraphQL } from "@/lib/graphql/client";
import { GET_BLOG_PHOTOGRAPHY_PRODUCTION_QUERY, GET_PHOTOGRAPHY_SERVICE_QUERY, GET_PRODUCTION_QUERY } from "@/lib/graphql/queries";
import { mapCTAData } from "@/lib/mapCTAData";
import { Metadata } from "next";


const FALLBACK_TITLE = 'Photography Production | IDC';
const FALLBACK_DESC =
    'Expert photography production services — learn how IDC Worldwide delivers premium results for brands and agencies.';


export async function generateMetadata(): Promise<Metadata> {
    try {
        const raw = await fetchGraphQL(GET_BLOG_PHOTOGRAPHY_PRODUCTION_QUERY);
        console.log(raw, "raw pages")
        const seo = raw?.pageBy?.seo;
        const page = raw?.pageBy;

        const ogImage = seo?.opengraphImage?.sourceUrl;
        const ogWidth = seo?.opengraphImage?.mediaDetails?.width;
        const ogHeight = seo?.opengraphImage?.mediaDetails?.height;

        return {
            title: seo?.title || page?.title || FALLBACK_TITLE,
            description: seo?.metaDesc || FALLBACK_DESC,

            // Canonical URL — tells search engines the preferred URL
            ...(seo?.canonical && {
                alternates: { canonical: seo.canonical },
            }),

            openGraph: {
                title: seo?.opengraphTitle || seo?.title || page?.title || FALLBACK_TITLE,
                description: seo?.opengraphDescription || seo?.metaDesc || FALLBACK_DESC,
                ...(seo?.opengraphUrl && { url: seo.opengraphUrl }),
                ...(seo?.opengraphType && { type: seo.opengraphType }),
                ...(seo?.opengraphSiteName && { siteName: seo.opengraphSiteName }),
                ...(ogImage && {
                    images: [
                        {
                            url: ogImage,
                            ...(ogWidth && { width: Number(ogWidth) }),
                            ...(ogHeight && { height: Number(ogHeight) }),
                        },
                    ],
                }),
            },

            twitter: {
                card: 'summary_large_image',
                title: seo?.twitterTitle || seo?.opengraphTitle || seo?.title || page?.title || FALLBACK_TITLE,
                description:
                    seo?.twitterDescription || seo?.opengraphDescription || seo?.metaDesc || FALLBACK_DESC,
                ...(seo?.twitterImage?.sourceUrl && {
                    images: [seo.twitterImage.sourceUrl],
                }),
            },
        };
    } catch (err) {
        console.error('Blog photography-production generateMetadata error:', err);
        return { title: FALLBACK_TITLE, description: FALLBACK_DESC };
    }
}


// ── Page Component ──────────────────────────────────────────────────────
export default async function PhotographyProductionBlog() {
    let ctaData: Record<string, any> | null = null;
    let blogData = null;

    try {
        const [blogRaw, ctaRaw] = await Promise.all([
            fetchGraphQL(GET_BLOG_PHOTOGRAPHY_PRODUCTION_QUERY),
            fetchGraphQL(GET_PRODUCTION_QUERY),

        ]);

        blogData = blogRaw?.pageBy?.blogPhotographyproduction ?? null;
        ctaData = ctaRaw?.pageBy?.productionPageData ?? null;

    } catch (err) {
        console.error('Blog photography production fetch error:', err);
    }


    const ctaSectionData = mapCTAData(ctaData);

    return (
        <>
            <MenuOverlay />
            <BlogPostHero data={blogData} />

            {/* Footer wrapper */}
            <div className="w-full h-[131vh]  xl:h-[177vh]">
                <div className="mt-[-3.5vmax]  xl:bg-white">
                    <CTASection data={ctaSectionData} />
                </div>
                <div className="fixed w-full bottom-0 z-[-1]">
                    <Footer />
                </div>
            </div>
        </>
    );
}