
import { useCallback, useEffect, useRef, useState } from "react";
import TextReveal from "../animations/TextReveal";
import "./ProductionPremier.css";


// ─── Accordion Data ───────────────────────────────────────────────────────────
const ACCORDION_DATA = [
    {
        title: "New Zealand's Premier Production Partner for International Projects",
        content: `<p>As a leading NZ production company, IDC bridges the gap between international creative standards and New Zealand's unique production landscape. Our deep understanding of both global protocols and local logistics ensures every photography project runs seamlessly, from concept to completion.</p>
<p>When you choose IDC, you're working with a production partner who understands international expectations, delivers local expertise, and solves challenges before they reach your shoot location.</p>`,
    },
    {
        title: "Why Choose IDC as Your NZ Photography Production Partner?",
        content: `<ul>
<li><strong>Streamlined International Coordination –</strong> We manage every detail of your production logistics, permits, and on-the-ground operations, so your team can focus entirely on the creative process.</li>
<li><strong>Trusted Local Network –</strong> Access our established network of New Zealand's top-tier assistants, stylists, suppliers, and location managers, all vetted for professionalism and experience with international productions.</li>
<li><strong>Flexible Production Models –</strong> Whether you need full-service production or targeted support, IDC's adaptive approach ensures efficient resource use and cost transparency at every stage.</li>
<li><strong>Creative Partnership Approach –</strong> We collaborate closely with your team to maintain artistic integrity, ensuring your vision is realised on time and within scope.</li>
<li><strong>Responsible, Sustainable Photography –</strong> IDC integrates eco-conscious practices across every production, helping you meet sustainability goals while maintaining the highest industry standards.</li>
</ul>`,
    },
    {
        title: "Our Comprehensive Photography Production Services in New Zealand",
        content: `<p>From concept to completion, IDC offers end-to-end NZ photography production support tailored to international clients:</p>
<ul>
<li><strong>Location Scouting & Management –</strong> Find the perfect settings across New Zealand's diverse landscapes.</li>
<li><strong>Crew & Equipment Coordination –</strong> Connect with skilled professionals and cutting-edge gear for any scale of production.</li>
<li><strong>Permit Acquisition & Compliance –</strong> Navigate NZ's photography regulations smoothly with our experienced team.</li>
<li><strong>Logistics & Transportation –</strong> Efficient, reliable coordination of people, equipment, and vehicles across all regions.</li>
<li><strong>Accommodation & Catering –</strong> Comfortable, well-located options for production teams large or small.</li>
<li><strong>Budget Management & Reporting –</strong> Transparent financial tracking and detailed cost management.</li>
</ul>
<p>Every service is delivered with IDC's signature hands-on support and attention to detail, ensuring your photography production runs smoothly from start to finish.</p>`,
    },
];

// ─── Chevron Up SVG ───────────────────────────────────────────────────────────
const ChevronUp = () => (
    <svg
        aria-hidden="true"
        className="premier-accordion__chevron-svg"
        fill="#7A7A7A"
        viewBox="0 0 448 512"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z" />
    </svg>
);

// ─── Chevron Down SVG ─────────────────────────────────────────────────────────
const ChevronDown = () => (
    <svg
        aria-hidden="true"
        className="premier-accordion__chevron-svg"
        fill="#7A7A7A"
        viewBox="0 0 448 512"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
    </svg>
);



export default function ProductionPremier() {


    const sectionRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const videoWrapRef = useRef<HTMLDivElement>(null);
    const rightColRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const paraRef = useRef<HTMLParagraphElement>(null);
    const attrRef = useRef<HTMLParagraphElement>(null);
    const mobileImgRef = useRef<HTMLImageElement>(null);


    // ─── Accordion state ────────────────────────────────────────────────────
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

    // ─── Toggle — only one open at a time ───────────────────────────────────
    const handleToggle = useCallback((index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    }, []);


    // ─── Animate panel open/close via maxHeight ──────────────────────────────
    useEffect(() => {
        panelRefs.current.forEach((panel, i) => {
            if (!panel) return;
            if (openIndex === i) {
                panel.style.maxHeight = panel.scrollHeight + 'px';
            } else {
                panel.style.maxHeight = '0px';
            }
        });
    }, [openIndex]);



    useEffect(() => {
        let cancelled = false;

        import('gsap').then(({ gsap }) => {
            import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
                if (cancelled) return;
                gsap.registerPlugin(ScrollTrigger);

                /* ── Sticky left heading (desktop only) ─────────────────────── */
                if (window.innerWidth > 740 && stickyRef.current && sectionRef.current) {
                    ScrollTrigger.create({
                        trigger: sectionRef.current,
                        start: '170px 50px',
                        end: '+=430vh',
                        pin: stickyRef.current,
                        pinSpacing: false,
                        markers: true
                    });
                }

                if (window.innerWidth < 740 && stickyRef.current && sectionRef.current) {
                    ScrollTrigger.create({
                        trigger: sectionRef.current,
                        start: '200px 100px',
                        end: '+=400vh',
                        pin: stickyRef.current,
                        pinSpacing: false,
                    });
                }



                if (window.innerWidth > 740 && videoWrapRef.current) {

                    const parallaxAmount = -35;

                    const tl1 = gsap.fromTo(
                        videoWrapRef.current,
                        { yPercent: 0 },
                        {
                            yPercent: parallaxAmount * 2.3,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: videoWrapRef.current,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: 0.6,
                                invalidateOnRefresh: true,
                            },
                        }
                    );
                }


                /* ── Video parallax mobile ─────────────────────────────────────────── */
                if (window.innerWidth < 740 && videoWrapRef.current) {

                    const parallaxAmount = -20;

                    const tl1 = gsap.fromTo(
                        videoWrapRef.current,
                        { yPercent: 0 },
                        {
                            yPercent: parallaxAmount * 2.3,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: videoWrapRef.current,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: 0.6,
                                invalidateOnRefresh: true,
                            },
                        }
                    );
                }

                /* ── Right column parallax (desktop) ────────────────────────── */
                if (rightColRef.current && window.innerWidth > 740) {
                    gsap.to(rightColRef.current, {
                        y: -50,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: rightColRef.current,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                        },
                    });
                }

                /* ── Text entrance animations ───────────────────────────────── */
                const textEls = [headingRef.current, paraRef.current, attrRef.current].filter(Boolean);
                textEls.forEach((el, i) => {
                    gsap.fromTo(
                        el,
                        { y: 50, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            delay: i * 0.12,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: el,
                                start: 'top 88%',
                                once: true,
                            },
                        }
                    );
                });

            });
        });

        return () => { cancelled = true; };
    }, []);



    return (
        <section ref={sectionRef} className="prod-premier-main">

            <div className="prod-premier-left">
                {/* Sticky heading block */}
                <TextReveal>
                    <div ref={stickyRef} className="prod-premier__sticky">
                        <h2 className="prod-premier__sticky-text prod-premier__name blend-text">
                            IDC  Production
                        </h2>

                    </div>

                </TextReveal>

                {/* Video block with parallax */}
                <div ref={videoWrapRef} className="prod-premier__video-wrap">


                    <img className="prod-premier__image" src="https://idc.yp-studio.com/media/2025/03/09154625/production.jpg" alt="" />
                </div>


            </div>

            <div ref={rightColRef} className="prod-premier-right">

                <div className="premier-accordion">

                    {ACCORDION_DATA.map((item, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div key={i}>
                                <div

                                    className={`premier-accordion__item${isOpen ? ' premier-accordion__item--open' : ''}`}
                                >
                                    {/* ── Trigger row ── */}
                                    <button
                                        className="premier-accordion__trigger"
                                        onClick={() => handleToggle(i)}
                                        aria-expanded={isOpen}
                                        aria-controls={`premier-panel-${i}`}
                                    >
                                        <span className="premier-accordion__title">{item.title}</span>
                                        <span className="premier-accordion__chevron">
                                            {isOpen ? <ChevronUp /> : <ChevronDown />}
                                        </span>
                                    </button>

                                    {/* ── Collapsible panel ── */}

                                </div>
                                <div
                                    id={`premier-panel-${i}`}
                                    ref={(el) => { panelRefs.current[i] = el; }}
                                    className="premier-accordion__panel"
                                    role="region"
                                >
                                    <div
                                        className="premier-accordion__content"
                                        dangerouslySetInnerHTML={{ __html: item.content }}
                                    />
                                </div>

                            </div>
                        );

                    })}

                </div>

            </div>



        </section>
    )
}