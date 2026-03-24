'use client';

import { useEffect, useRef, useCallback } from 'react';
import "./blog-post.css";

// ═══════════════════════════════════════════════════════════════════════════
// BlogPostHero — Blog post page matching the Elementor reference.
//
// GSAP SIDEBAR PIN:
// - bp-sidebar-sticky is pinned at top: 100px within bp-body
// - ScrollTrigger.create() with pin: true, pinSpacing: false
// - trigger: bp-body (the two-column parent container)
// - start: sidebar hits 100px from viewport top
// - end: bottom of bp-body minus sidebar height (so it stops at section end)
// - Desktop only (>1024px) — on mobile the sidebar is static/stacked
// - Proper cleanup via gsap.context().revert() on unmount
//
// WHY bp-body AS TRIGGER:
// bp-body is the flex row that contains both sidebar and content.
// Using it as the trigger means the pin starts when this section
// enters the viewport and ends when the section scrolls out —
// the sidebar stays pinned only within its parent's bounds.
//
// OPTIMIZATIONS:
// 1. Single Promise.all import — avoids sequential chunk parsing
// 2. gsap.context() scopes all triggers to sectionRef — automatic cleanup
// 3. No per-frame callbacks — ScrollTrigger's native pin uses
//    will-change: transform internally (hardware-accelerated)
// 4. cancelled flag prevents setup after unmount during async import
// 5. pinSpacing: false prevents layout shifts (sidebar column width
//    is already reserved by the flex layout)
// 6. matchMedia-style guard (window.innerWidth > 1024) avoids
//    creating triggers on mobile that would immediately be killed
// ═══════════════════════════════════════════════════════════════════════════

export default function BlogPostHero() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);
    const sidebarStickyRef = useRef<HTMLDivElement>(null);

    // ─── Accordion toggle handler ───────────────────────────────────────
    const handleAccordionClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        const btn = e.currentTarget;
        const panel = btn.closest('.bp-accordion-item')?.querySelector('.bp-accordion-panel') as HTMLElement | null;
        if (!panel) return;

        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!isOpen));
        panel.hidden = isOpen;
    }, []);

    // ─── GSAP ScrollTrigger pin for sidebar ─────────────────────────────
    useEffect(() => {
        // Guard: only pin on desktop
        if (typeof window === 'undefined' || window.innerWidth <= 1024) return;
        if (!bodyRef.current || !sidebarStickyRef.current) return;

        let cancelled = false;
        let ctx: any;

        // Single combined import — avoids two sequential network requests
        Promise.all([
            import('gsap'),
            import('gsap/ScrollTrigger'),
        ]).then(([{ gsap }, { ScrollTrigger }]) => {
            if (cancelled) return;
            gsap.registerPlugin(ScrollTrigger);

            // gsap.context scopes all ScrollTriggers to sectionRef
            // — calling ctx.revert() on unmount kills everything cleanly
            ctx = gsap.context(() => {
                ScrollTrigger.create({
                    trigger: bodyRef.current,
                    // Pin starts when the sidebar-sticky element's top
                    // reaches 100px from the viewport top.
                    // "top 100px" = trigger's top hits viewport's 100px line
                    start: 'top 100px',
                    end: '+=4600',
                    // Pin ends when the bottom of bp-body reaches viewport's
                    // 100px line + the sidebar's own height.
                    // This ensures the sidebar stops exactly at bp-body's
                    // bottom edge — never overflowing outside.
                    // end: () => {
                    //     const bodyEl = bodyRef.current!;
                    //     const stickyEl = sidebarStickyRef.current!;
                    //     // Total scrollable distance = body height - sidebar height
                    //     // so the sidebar "parks" at the bottom of the body
                    //     return `+=${bodyEl.offsetHeight - stickyEl.offsetHeight}`;
                    // },
                    pin: sidebarStickyRef.current,
                    pinSpacing: false, // No extra space — flex layout handles width
                });
            }, sectionRef);
        });

        return () => {
            cancelled = true;
            // ctx.revert() removes all ScrollTriggers, pins, and inline
            // styles that GSAP added — zero cleanup leaks
            if (ctx) ctx.revert();
        };
    }, []);

    return (
        <div ref={sectionRef} className="bp-section">
            {/* ══════════════════════════════════════════════════════════════
                HERO — Centered date + title
                ══════════════════════════════════════════════════════════════ */}
            <div className="bp-hero">
                <h2 className="bp-date-badge">May 11, 2025</h2>
                <h1 className="bp-title">
                    THE ULTIMATE GUIDE TO PHOTOGRAPHY PRODUCTION IN NEW ZEALAND
                </h1>
            </div>

            {/* ══════════════════════════════════════════════════════════════
                FEATURED IMAGE — Full-width background cover (80vh)
                ══════════════════════════════════════════════════════════════ */}
            <div
                className="bp-featured-image"
                style={{
                    backgroundImage:
                        'url(https://idc.yp-studio.com/media/2025/02/09183825/C_Rutherford__48A4948_YETI_optimized-1.jpg)',
                }}
            />

            {/* ══════════════════════════════════════════════════════════════
                CONTENT AREA — Two-column: sticky sidebar + post content
                ══════════════════════════════════════════════════════════════ */}
            <div ref={bodyRef} className="bp-body">
                {/* ── Left sticky sidebar ── */}
                <aside className="bp-sidebar">
                    <div ref={sidebarStickyRef} className="bp-sidebar-sticky">
                        {/* Details block */}
                        <div className="bp-details-block">
                            <h3 className="bp-details-title">Details</h3>
                            <div className="bp-details-rows">
                                <div className="bp-details-row">
                                    <span className="bp-details-label">Date</span>
                                    <span className="bp-details-value">May 11, 2025</span>
                                </div>
                                <div className="bp-details-row">
                                    <span className="bp-details-label">Reading</span>
                                    <span className="bp-details-value">11 min</span>
                                </div>
                            </div>
                        </div>

                        {/* Share block */}
                        <div className="bp-share-block">
                            <h3 className="bp-share-title">Share</h3>
                            <ul className="bp-share-links">
                                <li>
                                    <a
                                        href="https://www.instagram.com/_idc_photography/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bp-share-link"
                                    >
                                        <svg
                                            className="bp-share-icon"
                                            viewBox="0 0 448 512"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                        >
                                            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                        </svg>
                                        <span className="bp-share-text">instagram</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.linkedin.com/company/idc-worldwide-ltd/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bp-share-link"
                                    >
                                        <svg
                                            className="bp-share-icon"
                                            viewBox="0 0 448 512"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                        >
                                            <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                                        </svg>
                                        <span className="bp-share-text">linkedin</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </aside>

                {/* ── Right content column ── */}
                <div className="bp-content">
                    <h1 className="wp-block-heading">Photography Production in New Zealand: Insider Tips for International Creatives</h1>

                    <p>New Zealand&apos;s extraordinary landscapes have captivated photographers for generations, but turning creative vision into successful imagery requires more than just finding the perfect location. As specialists in photography production across New Zealand, we&apos;ve supported countless international shoots, from global advertising campaigns to editorial features.</p>

                    <p><br />In this guide, we share our insider knowledge to help you plan, prepare, and execute exceptional photography projects in Aotearoa New Zealand.</p>

                    <div style={{ height: 40 }} aria-hidden="true" className="wp-block-spacer" />

                    <h2 className="wp-block-heading">Planning Your Photography Production Timeline</h2>

                    <p>One of the most common questions we receive is &ldquo;How far in advance should we start planning?&rdquo; While every project has unique requirements, we recommend beginning your New Zealand photography production planning at least 8-12 weeks before your intended shoot dates.</p>

                    <p><br />This timeline allows for:</p>

                    <ul className="wp-block-list">
                        <li>Location research and scouting&nbsp;– Identifying and securing the perfect settings</li>
                        <li>Seasonal considerations&nbsp;– Aligning your creative needs with optimal lighting conditions</li>
                        <li>Permit applications&nbsp;– Navigating council, conservation, and private property requirements</li>
                        <li>Crew and equipment booking&nbsp;– Securing the best local talent and resources</li>
                        <li>Accommodation and transport logistics&nbsp;– Especially important during peak tourism seasons</li>
                    </ul>

                    <p>For complex multi-location shoots, extending this timeline to 12-16 weeks provides additional flexibility and often results in cost savings through more strategic planning.</p>

                    <div style={{ height: 40 }} aria-hidden="true" className="wp-block-spacer" />

                    <h2 className="wp-block-heading">Beyond the Postcard: Hidden Photography Locations in New Zealand</h2>

                    <p>While iconic locations like Milford Sound and Mount Cook feature prominently in photography of New Zealand, experienced producers know that some of the most compelling imagery comes from lesser-known spots.</p>

                    <h3 className="wp-block-heading">Auckland&apos;s Hidden Coastal Gems</h3>

                    <p>Just 30 minutes from Auckland&apos;s urban centre, the west coast black sand beaches offer dramatic textures and light conditions perfect for fashion and lifestyle photography. Locations like Bethell&apos;s Beach and Piha provide moody, atmospheric backdrops with relatively easy access from the city.</p>

                    <h3 className="wp-block-heading">Central Otago&apos;s Textural Landscapes</h3>

                    <p>Beyond Queenstown&apos;s well-documented beauty lies Central Otago&apos;s sculptural landscapes, rolling hills, weathered rock formations, and golden tussock that create abstract, textural backgrounds ideal for product and conceptual photography.</p>

                    <h3 className="wp-block-heading">Marlborough Sounds&apos; Secluded Bays</h3>

                    <p>The intricate waterways of the Marlborough Sounds offer secluded, pristine settings accessible only by boat. These locations provide unique perspectives of New Zealand&apos;s coastline without the crowds often found at more accessible spots.</p>

                    <div style={{ height: 40 }} aria-hidden="true" className="wp-block-spacer" />

                    <h2 className="wp-block-heading">Production Challenges Unique to Photography in New Zealand</h2>

                    <p>Understanding the specific challenges of photography production in New Zealand allows for better preparation and smoother execution.</p>

                    <p><strong>Weather Variability</strong></p>

                    <p>New Zealand&apos;s weather can change dramatically within hours. Our production approach includes:</p>

                    <ul className="wp-block-list">
                        <li>Understanding seasonal challenges for a location</li>
                        <li>Building flexible scheduling with weather contingency days</li>
                        <li>Identifying backup locations with similar light characteristics</li>
                        <li>Preparing alternative shot lists for varying conditions</li>
                    </ul>

                    <p><strong>Remote Location Access</strong></p>

                    <p>Many of New Zealand&apos;s most photogenic locations require specialised access. Our production team coordinates:</p>

                    <ul className="wp-block-list">
                        <li>Helicopter transfers for alpine and remote coastal locations</li>
                        <li>4WD vehicle access for off-road settings</li>
                        <li>Boat transportation for island and coastal shoots</li>
                        <li>Safety protocols and communications for areas without cellular coverage</li>
                    </ul>

                    <p><strong>Permit Complexities</strong></p>

                    <p>Different regions and environments have varying permit requirements. We navigate:</p>

                    <ul className="wp-block-list">
                        <li>Department of Conservation concessions for protected landscapes</li>
                        <li>Local council permits for urban and suburban locations</li>
                        <li>Māori land access protocols and cultural considerations</li>
                        <li>Private property negotiations and location fees</li>
                    </ul>

                    <div style={{ height: 40 }} aria-hidden="true" className="wp-block-spacer" />

                    <h2 className="wp-block-heading">Seasonal Considerations for Photography in New Zealand</h2>

                    <p>Each season offers distinct advantages for photography in New Zealand, influencing both creative possibilities and production logistics.</p>

                    <p><strong>Summer (December-February)</strong></p>

                    <ul className="wp-block-list">
                        <li>14-16 hours of daylight for extended shooting schedules</li>
                        <li>Access to alpine regions without snow restrictions</li>
                        <li>Vibrant coastal scenes with azure waters</li>
                        <li>Higher tourism presence requiring more advance planning</li>
                    </ul>

                    <p><strong>Autumn (March-May)</strong></p>

                    <ul className="wp-block-list">
                        <li>Spectacular colour transformations, especially in Central Otago and Canterbury</li>
                        <li>Stable weather patterns with clear, crisp light</li>
                        <li>Reduced tourist numbers at popular locations</li>
                        <li>Golden hour light with extended transition periods</li>
                    </ul>

                    <p><strong>Winter (June-August)</strong></p>

                    <ul className="wp-block-list">
                        <li>Snow-covered alpine landscapes in the South Island</li>
                        <li>Dramatic low-angle light throughout the day</li>
                        <li>Misty mornings in valley locations</li>
                        <li>Significantly reduced crowds at iconic locations</li>
                    </ul>

                    <p><strong>Spring (September-November)</strong></p>

                    <ul className="wp-block-list">
                        <li>Blossoming landscapes and fresh greenery</li>
                        <li>Lambing season creating pastoral imagery opportunities</li>
                        <li>Waterfalls and rivers at peak flow</li>
                        <li>Variable weather requiring flexible scheduling</li>
                    </ul>

                    <div style={{ height: 40 }} aria-hidden="true" className="wp-block-spacer" />

                    <h2 className="wp-block-heading">Building the Right Team: Local Expertise for International Vision</h2>

                    <p>The success of photography production in New Zealand often depends on assembling the right blend of international creative direction and local production knowledge.</p>

                    <p><strong>Key Local Roles Worth Investing In:</strong></p>

                    <ul className="wp-block-list">
                        <li><strong>Location Scout/Manager&nbsp;–</strong> Someone with deep knowledge of regional access, permissions, and seasonal variations</li>
                        <li><strong>Production Coordinator&nbsp;–</strong> A detail-oriented professional familiar with New Zealand&apos;s logistics and supplier networks</li>
                        <li><strong>Local Photography Assistant&nbsp;–</strong> Technical support with understanding of local light conditions and equipment resources</li>
                        <li><strong>Cultural Advisor&nbsp;–</strong> Essential when photographing locations with cultural significance to Māori communities</li>
                    </ul>

                    <h3 className="wp-block-heading">Case Study: Fashion Campaign Success Through Local Collaboration</h3>

                    <p>New Zealand&apos;s natural environment is both its greatest asset and most precious resource. Sustainable production practices are increasingly important for both ethical and practical reasons.</p>

                    <p><br />Our approach to sustainable photography production includes:</p>

                    <ul className="wp-block-list">
                        <li><strong>Location Impact Assessment&nbsp;–</strong> Evaluating and minimising environmental footprint before shooting</li>
                        <li><strong>Carbon-Offset Transportation&nbsp;–</strong> Partnering with providers who offset emissions from necessary vehicles</li>
                        <li><strong>Waste Reduction Protocols&nbsp;–</strong> Implementing comprehensive recycling and waste management systems</li>
                        <li><strong>Local Sourcing&nbsp;–</strong> Prioritizing local suppliers to reduce transportation impacts</li>
                        <li><strong>Digital Workflows&nbsp;–</strong> Minimising physical materials through efficient digital systems</li>
                    </ul>

                    <div style={{ height: 40 }} aria-hidden="true" className="wp-block-spacer" />

                    <h2 className="wp-block-heading">Budgeting Wisely for Photography in New Zealand</h2>

                    <p>Understanding the financial landscape of photography production in New Zealand helps international clients allocate resources effectively.</p>

                    <p><strong>Cost-Saving Strategies:</strong></p>

                    <ul className="wp-block-list">
                        <li><strong>Shoulder Season Scheduling&nbsp;–</strong> Booking between peak seasons for reduced accommodation and location costs</li>
                        <li><strong>Multi-Client Collaborations&nbsp;–</strong> Sharing production infrastructure across multiple shoots</li>
                        <li><strong>Equipment Consolidation&nbsp;–</strong> Renting locally rather than shipping internationally</li>
                        <li><strong>Tax Advantages&nbsp;–</strong> Structuring production to benefit from GST exemptions where applicable</li>
                        <li><strong>Location Clustering&nbsp;–</strong> Grouping locations geographically to minimize travel time and costs</li>
                    </ul>

                    <div style={{ height: 40 }} aria-hidden="true" className="wp-block-spacer" />

                    <h2 className="wp-block-heading">Ready to Plan Your Photography Production in New Zealand?</h2>

                    <p>Every successful photography project in New Zealand begins with thoughtful planning and local expertise. Our production team specializes in turning creative concepts into logistical reality—managing the details so you can focus on capturing extraordinary images.</p>

                    <p>Contact us to discuss your next photography production in New Zealand, and discover how our local knowledge can enhance your creative vision.</p>

                    <div className="wp-block-buttons">
                        <div className="wp-block-button">
                            <a className="wp-block-button__link" href="https://idc.co.nz/contact/">Contact Us</a>
                        </div>
                    </div>

                    <div style={{ height: 40 }} aria-hidden="true" className="wp-block-spacer" />

                    <h2 className="wp-block-heading">Frequently Asked Questions About Photography Production in New Zealand</h2>

                    {/* ── FAQ Accordion ── */}
                    <div className="bp-accordion" role="group">
                        <div className="bp-accordion-item">
                            <h3 className="bp-accordion-heading">
                                <button className="bp-accordion-toggle" aria-expanded="false" onClick={handleAccordionClick}>
                                    <span className="bp-accordion-toggle-title">How does photography production differ from filming production in New Zealand?</span>
                                    <span className="bp-accordion-toggle-icon" aria-hidden="true">+</span>
                                </button>
                            </h3>
                            <div className="bp-accordion-panel" hidden>
                                <p>While both share logistical elements, photography production in New Zealand typically offers more flexibility with smaller crews and equipment requirements. Photography permits are often processed more quickly (5-10 days versus 10-20 for filming) and usually at lower costs. Still productions can also access locations that might be restricted for larger film crews, particularly in conservation areas.</p>
                            </div>
                        </div>

                        <div className="bp-accordion-item">
                            <h3 className="bp-accordion-heading">
                                <button className="bp-accordion-toggle" aria-expanded="false" onClick={handleAccordionClick}>
                                    <span className="bp-accordion-toggle-title">What makes New Zealand unique for commercial photography production?</span>
                                    <span className="bp-accordion-toggle-icon" aria-hidden="true">+</span>
                                </button>
                            </h3>
                            <div className="bp-accordion-panel" hidden>
                                <p>New Zealand offers an unmatched combination of location diversity and production efficiency. Within a single day&apos;s travel, photographers can capture alpine scenery, subtropical beaches, ancient forests, and modern urban settings, all with world-class production infrastructure.</p>
                            </div>
                        </div>

                        <div className="bp-accordion-item">
                            <h3 className="bp-accordion-heading">
                                <button className="bp-accordion-toggle" aria-expanded="false" onClick={handleAccordionClick}>
                                    <span className="bp-accordion-toggle-title">How can we maximise our shooting schedule in New Zealand?</span>
                                    <span className="bp-accordion-toggle-icon" aria-hidden="true">+</span>
                                </button>
                            </h3>
                            <div className="bp-accordion-panel" hidden>
                                <p>Strategic planning is essential for efficient photography production in New Zealand. We recommend grouping locations by geographic proximity, scheduling flexible weather days, planning around optimal light conditions, building in travel buffer days, and considering helicopter access for remote locations.</p>
                            </div>
                        </div>

                        <div className="bp-accordion-item">
                            <h3 className="bp-accordion-heading">
                                <button className="bp-accordion-toggle" aria-expanded="false" onClick={handleAccordionClick}>
                                    <span className="bp-accordion-toggle-title">What equipment is available locally versus what should we bring?</span>
                                    <span className="bp-accordion-toggle-icon" aria-hidden="true">+</span>
                                </button>
                            </h3>
                            <div className="bp-accordion-panel" hidden>
                                <p>New Zealand offers excellent equipment resources in major centres like Auckland and Wellington. Professional-grade cameras, lighting, and grip equipment are readily available for rental. We generally recommend bringing specialised or personal preference items while sourcing standard equipment locally.</p>
                            </div>
                        </div>

                        <div className="bp-accordion-item">
                            <h3 className="bp-accordion-heading">
                                <button className="bp-accordion-toggle" aria-expanded="false" onClick={handleAccordionClick}>
                                    <span className="bp-accordion-toggle-title">How do we navigate cultural considerations when photographing in New Zealand?</span>
                                    <span className="bp-accordion-toggle-icon" aria-hidden="true">+</span>
                                </button>
                            </h3>
                            <div className="bp-accordion-panel" hidden>
                                <p>Respecting cultural contexts is vital when photographing in New Zealand, particularly regarding Māori cultural elements and significant sites. We recommend consulting with cultural advisors, understanding restrictions around sacred sites, seeking appropriate permissions, and respecting protocols around portraiture and representation.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}