'use client';

import { useEffect, useRef } from 'react';
import './productionapproach.css';
import TextReveal from '../animations/TextReveal';

// ─── Section Data ────────────────────────────────────────────────────────────
const APPROACH_DATA = {
    subtitle: 'Behind the passion',
    name: 'Michele Richards-Berry',
    videoSrc: 'https://idc.yp-studio.com/media/2025/03/09215501/Vid2Production30.webm#t=0,100000',
    studioImg: 'https://idc.yp-studio.com/media/2025/03/09154625/production.jpg',
    portraitImg: 'https://idc.yp-studio.com/media/2025/03/09144103/Michele_Richards_Berry-e1741531286763.jpg',
    heading: 'Our Hands-On Approach to Production Excellence',
    paragraph:
        'At IDC, we believe the best productions are built on communication, precision, and adaptability. Our team remains involved from start to finish, ensuring consistency and care at every phase. Unlike larger production companies, we maintain personal oversight of each project—giving clients direct access to decision-makers and production leads. This approach ensures seamless collaboration and on-the-ground problem-solving that keeps your photography project on track.',
    attribution: '— Michele, Production Director',
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function ProductionApproach() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const videoWrapRef = useRef<HTMLDivElement>(null);
    const rightColRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const paraRef = useRef<HTMLParagraphElement>(null);
    const attrRef = useRef<HTMLParagraphElement>(null);
    const mobileImgRef = useRef<HTMLImageElement>(null);

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
                        start: 'top 100px',
                        end: '+=800vh',
                        pin: stickyRef.current,
                        pinSpacing: false,
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

                    const parallaxAmount = -15;

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


                /* ── Video parallax ─────────────────────────────────────────── */
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
        <section ref={sectionRef} className="prod-approach ">
            {/* ── Left Column ──────────────────────────────────────────────── */}
            <div className="prod-approach__left">
                {/* Sticky heading block */}
                <TextReveal>
                    <div ref={stickyRef} className="prod-approach__sticky">
                        <h2 className="prod-approach__sticky-text prod-approach__subtitle blend-text">
                            {APPROACH_DATA.subtitle}
                        </h2>
                        <h2 className="prod-approach__sticky-text prod-approach__name blend-text">
                            {APPROACH_DATA.name}
                        </h2>
                    </div>

                </TextReveal>

                {/* Video block with parallax */}
                <div ref={videoWrapRef} className="prod-approach__video-wrap">
                    <video
                        className="prod-approach__video"
                        autoPlay
                        muted
                        playsInline
                        loop
                        src={APPROACH_DATA.videoSrc}
                    />
                </div>

                {/* Mobile-only portrait image */}
                <div className="prod-approach__mobile-portrait">
                    <img
                        ref={mobileImgRef}
                        src={APPROACH_DATA.portraitImg}
                        alt="Michele Richards-Berry"
                        loading="lazy"
                    />
                </div>
            </div>

            {/* ── Right Column ─────────────────────────────────────────────── */}
            <div ref={rightColRef} className="prod-approach__right">
                {/* Images row (desktop only) */}
                <div className="prod-approach__images">
                    <div className="prod-approach__img-studio">
                        <img
                            src={APPROACH_DATA.studioImg}
                            alt="IDC production studio"
                            loading="lazy"
                        />
                    </div>
                    <div className="prod-approach__img-portrait">
                        <img
                            src={APPROACH_DATA.portraitImg}
                            alt="Michele Richards-Berry"
                            loading="lazy"
                        />
                    </div>
                </div>

                {/* Text content */}
                <h3 ref={headingRef} className="prod-approach__heading">
                    {APPROACH_DATA.heading}
                </h3>

                <p ref={paraRef} className="prod-approach__paragraph">
                    {APPROACH_DATA.paragraph}
                </p>

                <p ref={attrRef} className="prod-approach__attribution">
                    {APPROACH_DATA.attribution}
                </p>
            </div>
        </section>
    );
}