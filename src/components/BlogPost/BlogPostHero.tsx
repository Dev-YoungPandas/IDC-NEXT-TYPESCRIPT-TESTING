'use client';

import { useEffect, useRef, useCallback } from 'react';
import "./blog-post.css";

// ─── Types ───────────────────────────────────────────────────────────────────
interface BlogData {
    bpDateBadge?: string;
    bpTitle?: string;
    bpFeaturedImage?: { sourceUrl: string };

    wpBlockHeading1?: string;
    wpBlockHeading2?: string;
    wpBlockHeading3?: string;
    wpBlockHeading4?: string;
    wpBlockHeading4Para?: string;
    wpBlockHeading5?: string;
    wpBlockHeading5Para?: string;
    wpBlockHeading6?: string;
    wpBlockHeading6Para?: string;
    wpBlockHeading7?: string;
    wpBlockHeading8?: string;
    wpBlockHeading9?: string;
    wpBlockHeading10?: string;
    wpBlockHeading11?: string;
    wpBlockHeading12?: string;
    wpBlockHeading13?: string;

    wpBlockParagraph1?: string;
    wpBlockParagraph2?: string;
    wpBlockParagraph3?: string;
    wpBlockParagraph4?: string;
    wpBlockParagraph5?: string;
    wpBlockParagraph6?: string;
    wpBlockParagraph7?: string;
    wpBlockParagraph8?: string;
    wpBlockParagraph9?: string;

    wpBlockList1?: string;
    wpBlockList1ParaTop?: string;
    wpBlockList1ParaBottom?: string;

    wpBlockList2?: string;
    wpBlockList2Para1?: string;
    wpBlockList2Para2?: string;

    wpBlockList3?: string;
    wpBlockList3Para1?: string;
    wpBlockList3Para2?: string;

    wpBlockList4?: string;
    wpBlockList4Para1?: string;
    wpBlockList4Para2?: string;

    wpBlockList5?: string;
    wpBlockList5Heading?: string;
    wpBlockList6?: string;
    wpBlockList6Heading?: string;
    wpBlockList7?: string;
    wpBlockList7Heading?: string;
    wpBlockList8?: string;
    wpBlockList8Heading?: string;

    wpBlockList9?: string;
    wpBlockList9Heading?: string;
    wpBlockList10?: string;
    wpBlockList10Heading?: string;
    wpBlockList11?: string;
    wpBlockList11Heading?: string;

    bpAccordionToggleTitle1?: string;
    bpAccordionToggleTitle2?: string;
    bpAccordionToggleTitle3?: string;
    bpAccordionToggleTitle4?: string;
    bpAccordionToggleTitle5?: string;
    bpAccordionPanel1?: string;
    bpAccordionPanel2?: string;
    bpAccordionPanel3?: string;
    bpAccordionPanel4?: string;
    bpAccordionPanel5?: string;
}

interface BlogPostHeroProps {
    data: BlogData | null;
}

// ─── Helper: renders raw HTML from WP (paragraphs, lists, etc.) ──────────────
// All wpBlockParagraph* and wpBlockList* fields come back as raw HTML strings.
// dangerouslySetInnerHTML is safe here because the content comes from your
// own trusted WordPress CMS, not from user input.
function WPHtml({ html, className }: { html?: string; className?: string }) {
    if (!html) return null;
    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}

// ─── Helper: "Bold heading + optional sub-paragraph + HTML list" block ───────
// Used for the challenge sections (Weather Variability, Remote Location, etc.)
function ChallengeBlock({
    heading,
    subPara,
    listHtml,
}: {
    heading?: string;
    subPara?: string;
    listHtml?: string;
}) {
    if (!heading && !listHtml) return null;
    return (
        <>
            {heading && <p><strong>{heading}</strong></p>}
            {subPara && <p>{subPara}</p>}
            <WPHtml html={listHtml} />
        </>
    );
}

// ─── Helper: "Bold season heading + HTML list" block ────────────────────────
function SeasonBlock({
    heading,
    listHtml,
}: {
    heading?: string;
    listHtml?: string;
}) {
    if (!heading && !listHtml) return null;
    return (
        <>
            {heading && <p><strong>{heading}</strong></p>}
            <WPHtml html={listHtml} />
        </>
    );
}

// ─── Accordion item ───────────────────────────────────────────────────────────
function AccordionItem({
    title,
    panel,
    onToggle,
    isHtml = false,
}: {
    title?: string;
    panel?: string;
    onToggle: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isHtml?: boolean;

}) {
    if (!title) return null;
    return (
        <div className="bp-accordion-item">
            <h3 className="bp-accordion-heading">
                <button
                    className="bp-accordion-toggle"
                    aria-expanded="false"
                    onClick={onToggle}
                >
                    <span className="bp-accordion-toggle-title">{title}</span>
                    <span className="bp-accordion-toggle-icon" aria-hidden="true">+</span>
                </button>
            </h3>
            <div className="bp-accordion-panel" hidden>
                {isHtml
                    ? <div dangerouslySetInnerHTML={{ __html: panel ?? '' }} />
                    : <p>{panel}</p>
                }
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BlogPostHero({ data }: BlogPostHeroProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);
    const sidebarStickyRef = useRef<HTMLDivElement>(null);

    // ── Accordion toggle ──────────────────────────────────────────────────
    const handleAccordionClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        const btn = e.currentTarget;
        const panel = btn
            .closest('.bp-accordion-item')
            ?.querySelector('.bp-accordion-panel') as HTMLElement | null;
        if (!panel) return;
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!isOpen));
        panel.hidden = isOpen;
    }, []);

    // ── GSAP sidebar pin ──────────────────────────────────────────────────
    useEffect(() => {
        if (typeof window === 'undefined' || window.innerWidth <= 1024) return;
        if (!bodyRef.current || !sidebarStickyRef.current) return;

        let cancelled = false;
        let ctx: any;

        Promise.all([
            import('gsap'),
            import('gsap/ScrollTrigger'),
        ]).then(([{ gsap }, { ScrollTrigger }]) => {
            if (cancelled) return;
            gsap.registerPlugin(ScrollTrigger);
            ctx = gsap.context(() => {
                ScrollTrigger.create({
                    trigger: bodyRef.current,
                    start: 'top 100px',
                    end: '+=4700',
                    pin: sidebarStickyRef.current,
                    pinSpacing: false,
                });
            }, sectionRef);
        });

        return () => {
            cancelled = true;
            if (ctx) ctx.revert();
        };
    }, []);

    // ── Shorthand + fallbacks ─────────────────────────────────────────────
    const d = data ?? {};

    const featuredImageUrl =
        d.bpFeaturedImage?.sourceUrl ??
        'https://idc.yp-studio.com/media/2025/02/09183825/C_Rutherford__48A4948_YETI_optimized-1.jpg';

    const accordions = [
        { title: d.bpAccordionToggleTitle1, panel: d.bpAccordionPanel1, isHtml: false },
        { title: d.bpAccordionToggleTitle2, panel: d.bpAccordionPanel2, isHtml: false },
        { title: d.bpAccordionToggleTitle3, panel: d.bpAccordionPanel3, isHtml: true },
        { title: d.bpAccordionToggleTitle4, panel: d.bpAccordionPanel4, isHtml: false },
        { title: d.bpAccordionToggleTitle5, panel: d.bpAccordionPanel5, isHtml: true },
    ];

    return (
        <div ref={sectionRef} className="bp-section">

            {/* ════════════════════════════════════════════════════════════
                HERO
            ════════════════════════════════════════════════════════════ */}
            <div className="bp-hero">
                <h2 className="bp-date-badge">
                    {d.bpDateBadge }
                </h2>
                <h1 className="bp-title">
                    {d.bpTitle ?? 'THE ULTIMATE GUIDE TO PHOTOGRAPHY PRODUCTION IN NEW ZEALAND'}
                </h1>
            </div>

            {/* ════════════════════════════════════════════════════════════
                FEATURED IMAGE
            ════════════════════════════════════════════════════════════ */}
            <div
                className="bp-featured-image"
                style={{ backgroundImage: `url(${featuredImageUrl})` }}
            />

            {/* ════════════════════════════════════════════════════════════
                BODY — sidebar + content
            ════════════════════════════════════════════════════════════ */}
            <div ref={bodyRef} className="bp-body">

                {/* ── Sidebar ─────────────────────────────────────────── */}
                <aside className="bp-sidebar">
                    <div ref={sidebarStickyRef} className="bp-sidebar-sticky">

                        <div className="bp-details-block">
                            <h3 className="bp-details-title">Details</h3>
                            <div className="bp-details-rows">
                                <div className="bp-details-row">
                                    <span className="bp-details-label">Date</span>
                                    <span className="bp-details-value">
                                        {d.bpDateBadge ?? 'May 11, 2025'}
                                    </span>
                                </div>
                                <div className="bp-details-row">
                                    <span className="bp-details-label">Reading</span>
                                    <span className="bp-details-value">11 min</span>
                                </div>
                            </div>
                        </div>

                        <div className="bp-share-block">
                            <h3 className="bp-share-title">Share</h3>
                            <ul className="bp-share-links">
                                <li>
                                    <a href="https://www.instagram.com/_idc_photography/" target="_blank" rel="noopener noreferrer" className="bp-share-link">
                                        <svg className="bp-share-icon" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                        </svg>
                                        <span className="bp-share-text">instagram</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/company/idc-worldwide-ltd/" target="_blank" rel="noopener noreferrer" className="bp-share-link">
                                        <svg className="bp-share-icon" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                                        </svg>
                                        <span className="bp-share-text">linkedin</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </aside>

                {/* ── Content column ──────────────────────────────────── */}
                <div className="bp-content">

                    {/* ── Section 1: Intro ──────────────────────────────── */}
                    {d.wpBlockHeading1 && (
                        <h1 className="wp-block-heading">{d.wpBlockHeading1}</h1>
                    )}
                    {/* wpBlockParagraph1 contains two <p> tags as raw HTML */}
                    <WPHtml html={d.wpBlockParagraph1} />

                    <div style={{ height: 40 }} aria-hidden="true" className="wp-block-spacer" />

                    {/* ── Section 2: Planning timeline ──────────────────── */}
                    {d.wpBlockHeading2 && (
                        <h2 className="wp-block-heading">{d.wpBlockHeading2}</h2>
                    )}
                    <WPHtml html={d.wpBlockParagraph2} />
                    {d.wpBlockList1ParaTop && <p>{d.wpBlockList1ParaTop}</p>}
                    {/* wpBlockList1 is a raw HTML <ul> string */}
                    <WPHtml html={d.wpBlockList1} />
                    {d.wpBlockList1ParaBottom && <p>{d.wpBlockList1ParaBottom}</p>}

                    <div style={{ height: 40 }} aria-hidden="true" className="wp-block-spacer" />


                    {/* ── Section 3: Hidden locations ───────────────────── */}
                    {d.wpBlockHeading3 && (
                        <h2 className="wp-block-heading">{d.wpBlockHeading3}</h2>
                    )}
                    <WPHtml html={d.wpBlockParagraph3} />

                    {d.wpBlockHeading4 && (
                        <h3 className="wp-block-heading">{d.wpBlockHeading4}</h3>
                    )}
                    {d.wpBlockHeading4Para && <p>{d.wpBlockHeading4Para}</p>}

                    {d.wpBlockHeading5 && (
                        <h3 className="wp-block-heading">{d.wpBlockHeading5}</h3>
                    )}
                    {d.wpBlockHeading5Para && <p>{d.wpBlockHeading5Para}</p>}

                    {d.wpBlockHeading6 && (
                        <h3 className="wp-block-heading">{d.wpBlockHeading6}</h3>
                    )}
                    {d.wpBlockHeading6Para && <p>{d.wpBlockHeading6Para}</p>}

                    <div style={{ height: 40 }} aria-hidden="true" className="wp-block-spacer" />


                    {/* ── Section 4: Production challenges ──────────────── */}
                    {d.wpBlockHeading7 && (
                        <h2 className="wp-block-heading">{d.wpBlockHeading7}</h2>
                    )}
                    <WPHtml html={d.wpBlockParagraph4} />

                    {/* Weather Variability */}
                    <ChallengeBlock
                        heading={d.wpBlockList2Para1}
                        subPara={d.wpBlockList2Para2}
                        listHtml={d.wpBlockList2}
                    />

                    {/* Remote Location Access */}
                    <ChallengeBlock
                        heading={d.wpBlockList3Para1}
                        subPara={d.wpBlockList3Para2}
                        listHtml={d.wpBlockList3}
                    />

                    {/* Permit Complexities */}
                    <ChallengeBlock
                        heading={d.wpBlockList4Para1}
                        subPara={d.wpBlockList4Para2}
                        listHtml={d.wpBlockList4}
                    />

                    <div style={{ height: 40 }} aria-hidden="true" className="wp-block-spacer" />


                    {/* ── Section 5: Seasonal ───────────────────────────── */}
                    {d.wpBlockHeading8 && (
                        <h2 className="wp-block-heading">{d.wpBlockHeading8}</h2>
                    )}
                    <WPHtml html={d.wpBlockParagraph5} />

                    <SeasonBlock heading={d.wpBlockList5Heading} listHtml={d.wpBlockList5} />
                    <SeasonBlock heading={d.wpBlockList6Heading} listHtml={d.wpBlockList6} />
                    <SeasonBlock heading={d.wpBlockList7Heading} listHtml={d.wpBlockList7} />
                    <SeasonBlock heading={d.wpBlockList8Heading} listHtml={d.wpBlockList8} />

                    <div style={{ height: 40 }} aria-hidden="true" className="wp-block-spacer" />


                    {/* ── Section 6: Building the team ──────────────────── */}
                    {d.wpBlockHeading9 && (
                        <h2 className="wp-block-heading">{d.wpBlockHeading9}</h2>
                    )}
                    <WPHtml html={d.wpBlockParagraph6} />

                    {d.wpBlockList9Heading && (
                        <p><strong>{d.wpBlockList9Heading}</strong></p>
                    )}
                    {/* wpBlockList9 has inline <strong> tags — render as HTML */}
                    <WPHtml html={d.wpBlockList9} />

                    {d.wpBlockHeading10 && (
                        <h3 className="wp-block-heading">{d.wpBlockHeading10}</h3>
                    )}
                    <WPHtml html={d.wpBlockParagraph7} />

                    {d.wpBlockList10Heading && (
                        <p><strong>{d.wpBlockList10Heading}</strong></p>
                    )}
                    {/* wpBlockList10 also has inline <strong> tags */}
                    <WPHtml html={d.wpBlockList10} />

                    <div style={{ height: 40 }} aria-hidden="true" className="wp-block-spacer" />


                    {/* ── Section 7: Budgeting ───────────────────────────── */}
                    {d.wpBlockHeading11 && (
                        <h2 className="wp-block-heading">{d.wpBlockHeading11}</h2>
                    )}
                    <WPHtml html={d.wpBlockParagraph8} />

                    {d.wpBlockList11Heading && (
                        <p><strong>{d.wpBlockList11Heading}</strong></p>
                    )}
                    <WPHtml html={d.wpBlockList11} />

                    <div style={{ height: 40 }} aria-hidden="true" className="wp-block-spacer" />


                    {/* ── Section 8: CTA ────────────────────────────────── */}
                    {d.wpBlockHeading12 && (
                        <h2 className="wp-block-heading">{d.wpBlockHeading12}</h2>
                    )}
                    {/* wpBlockParagraph9 has two <p> tags — render as HTML */}
                    <WPHtml html={d.wpBlockParagraph9} />

                    <div className="wp-block-buttons">
                        <div className="wp-block-button">
                            <a className="wp-block-button__link" href="https://idc.co.nz/contact/">
                                Contact Us
                            </a>
                        </div>
                    </div>

                    <div style={{ height: 40 }} aria-hidden="true" className="wp-block-spacer" />


                    {/* ── Section 9: FAQ accordion ──────────────────────── */}
                    {d.wpBlockHeading13 && (
                        <h2 className="wp-block-heading">{d.wpBlockHeading13}</h2>
                    )}

                    <div className="bp-accordion" role="group">
                        {accordions.map((item, i) => (
                            <AccordionItem
                                key={i}
                                title={item.title}
                                panel={item.panel}
                                isHtml={item.isHtml}
                                onToggle={handleAccordionClick}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}


