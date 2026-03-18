// src/components/PhotographyServiceSections/PhotographyServiceSections.tsx

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import './photographyservicesections.css';
import ProductionApproach from '../ProductionSections/ProductionApproach';
import TestimonialProductionSection from '../TestimonialSection/TestimonialProductionSection';
import AccordianSection from '../ProductionSections/AccordianSection';
import { usePhotographyServiceColorTransition } from '@/hooks/usePhotographyServiceColorTransition';

// ─── Fallback Accordion Content (used when API doesn't provide content bodies) ─
const ACCORDION_CONTENT = [
    `<p>IDC's photography production services combine logistical expertise with creative efficiency. Whether you're running a single-day location shoot or a multi-region campaign, we ensure seamless communication and operational control throughout.</p>
<p>Our team provides:</p>
<ul>
<li><strong>Pre-production management –</strong> scheduling, budgeting, and permissions handled end-to-end.</li>
<li><strong>Crew coordination –</strong> connecting international clients with trusted local photographers, assistants, stylists, and suppliers.</li>
<li><strong>Location scouting –</strong> verified, shoot-ready sites with local access contacts.</li>
<li><strong>On-location logistics –</strong> transport, accommodation, catering, and compliance supervision.</li>
<li><strong>Post-shoot wrap support –</strong> data management, equipment returns, and file handover.</li>
</ul>`,
    `<ul>
<li><strong>Production precision –</strong> Every element, from call sheets to local compliance, is managed by experienced coordinators.</li>
<li><strong>Strong local partnerships –</strong> Established relationships with councils, venues, and suppliers ensure rapid approvals and cost control.</li>
<li><strong>Adaptable support –</strong> Scalable services to match campaign scope, budget, and crew size.</li>
<li><strong>Risk management built-in –</strong> Weather contingencies, backup transport, and safety protocols keep the schedule stable.</li>
<li><strong>Sustainable logistics –</strong> IDC integrates responsible transport and minimal-impact practices for all shoots.</li>
</ul>`,
    `<h4>Auckland</h4>
<p>The country's central hub for advertising and editorial work, from coastal beaches to modern architecture, all within a compact radius.</p>
<h4>Wellington</h4>
<p>A dynamic urban setting with creative infrastructure and accessible coastal landscapes, ideal for brand and portrait photography.</p>
<h4>Canterbury & Queenstown</h4>
<p>Expansive plains, alpine backdrops, and clear seasonal light, perfect for lifestyle, automotive, and tourism campaigns.</p>
<h4>Remote & Regional NZ</h4>
<p>IDC's team coordinates the logistics for hard-to-reach locations, ensuring production remains compliant, safe, and efficient.</p>`,
];

// ─── Fallback titles ─────────────────────────────────────────────────────────
const FALLBACK_ACCORDION_TITLES = [
    'Full-Service Photography Production',
    'Why Choose IDC for Photography Production',
    'Key Photography Locations in New Zealand',
];

// ─── Chevron SVGs ────────────────────────────────────────────────────────────
const ChevronDown = () => (
    <svg aria-hidden="true" className="ps-accordion__chevron-svg" fill="#7A7A7A" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
        <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
    </svg>
);

const ChevronUp = () => (
    <svg aria-hidden="true" className="ps-accordion__chevron-svg" fill="#7A7A7A" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
        <path d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z" />
    </svg>
);

// ─── Component ───────────────────────────────────────────────────────────────
export default function PhotographyServiceSections({ data }: { data?: Record<string, any> | null }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

    usePhotographyServiceColorTransition();

    const handleToggle = useCallback((index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    }, []);

    useEffect(() => {
        panelRefs.current.forEach((panel, i) => {
            if (!panel) return;
            panel.style.maxHeight = openIndex === i ? panel.scrollHeight + 'px' : '0px';
        });
    }, [openIndex]);

    /* ── API data with fallbacks ──────────────────────────────────────────── */
    const heroHeading = data?.photographyServiceHerosectionHeading || 'PHOTOGRAPHY SERVICES';
    const heroBottom1 = data?.photographyServiceHeroBottom1 || 'since 1999';
    const heroBottom2 = data?.photographyServiceHeroBottom2 || 'top rated';
    const heroBottom3 = data?.photographyServiceHeroBottom3 || 'photographer + service';
    const heroBottom4 = data?.photographyServiceHeroBottom4 || 'auckland, nz';
    const sec2Heading = data?.photographyServiceSec2Heading || 'Photography Services in New Zealand';
    const sec2Paragraph = data?.photographyServiceSec2Paragraph || "New Zealand's striking locations and natural light attract photographers and brands from around the world, but a great image depends on precise planning and coordination.\n\nIDC delivers professional photography production support for international campaigns, editorial shoots, and commercial stills. Our experienced team manages logistics, permits, and on-site execution so your creative direction stays on schedule and within scope.";

    // Accordion titles from API, fallback to hardcoded
    const accordionData = [
        { title: data?.photographyServiceSec2AccordionTitle1 || FALLBACK_ACCORDION_TITLES[0], content: ACCORDION_CONTENT[0] },
        { title: data?.photographyServiceSec2AccordionTitle2 || FALLBACK_ACCORDION_TITLES[1], content: ACCORDION_CONTENT[1] },
        { title: data?.photographyServiceSec2AccordionTitle3 || FALLBACK_ACCORDION_TITLES[2], content: ACCORDION_CONTENT[2] },
    ];

    return (
        <>
            <div className="photography-service-wrapper">
                {/* SECTION 1 — HERO */}
                <section className="photography-service-hero">
                    <div className="photography-service-hero-heading">
                        <h1>{heroHeading}</h1>
                    </div>
                    <div className="photography-service-hero-bottom">
                        <h5>{heroBottom1}</h5>
                        <h5>{heroBottom2}</h5>
                        <h5>{heroBottom3}</h5>
                        <h5>{heroBottom4}</h5>
                    </div>
                </section>

                {/* SECTION 2 — CONTENT + ACCORDION */}
                <section className="photography-service-section2">
                    <div className="photography-service-sec2-inner">
                        <h1>{sec2Heading}</h1>

                        <div className="photography-service-sec2-paragraph">
                            {sec2Paragraph.split('\n\n').map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>

                        <div className="ps-accordion">
                            {accordionData.map((item, i) => {
                                const isOpen = openIndex === i;
                                return (
                                    <div key={i}>
                                        <div className={`ps-accordion__item${isOpen ? ' ps-accordion__item--open' : ''}`}>
                                            <button
                                                className="ps-accordion__trigger"
                                                onClick={() => handleToggle(i)}
                                                aria-expanded={isOpen}
                                                aria-controls={`ps-panel-${i}`}
                                            >
                                                <span className="ps-accordion__title">{item.title}</span>
                                                <span className="ps-accordion__chevron">
                                                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                                                </span>
                                            </button>
                                        </div>
                                        <div
                                            id={`ps-panel-${i}`}
                                            ref={(el) => { panelRefs.current[i] = el; }}
                                            className="ps-accordion__panel"
                                            role="region"
                                        >
                                            <div
                                                className="ps-accordion__content"
                                                dangerouslySetInnerHTML={{ __html: item.content }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className='pb-[150px] xl:pb-[13vw]'>
                    <ProductionApproach />
                </section>

                <div>
                    <TestimonialProductionSection pageUri="/photography-service/" />
                </div>

                <div>
                    <AccordianSection />
                </div>
            </div>
        </>
    );
}