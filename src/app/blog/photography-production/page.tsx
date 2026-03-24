// ═══════════════════════════════════════════════════════════════════════════
// FILE: src/app/blog/photography-production/page.tsx
// Blog Post Page — Server Component
// Route: /blog/photography-production
// ═══════════════════════════════════════════════════════════════════════════

import BlogPostHero from "@/components/BlogPost/BlogPostHero";
import Footer from "@/components/dan-max/Footer";
import MenuOverlay from "@/components/home/Menuoverlay";


// ── Page Component ──────────────────────────────────────────────────────
export default async function PhotographyProductionBlog() {
   

    return (
        <>
            <MenuOverlay />
            <BlogPostHero />

            {/* Footer wrapper */}
            <div className="w-full h-[131vh] xl:h-[177vh]">
                <div className="fixed w-full bottom-0 z-[-1]">
                    <Footer />
                </div>
            </div>
        </>
    );
}