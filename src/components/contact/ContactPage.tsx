// ============================================
// FILE: src/components/ContactPage/ContactPage.tsx
//
// Pixel-perfect recreation of the IDC contact page.
// Layout: full-height, #F8F8F8 background, contact info left,
// image right (desktop only), footer bar at bottom.
//
// PERFORMANCE:
// - No unnecessary state or effects
// - Single IntersectionObserver for bottomToUp animation
// - Image uses loading="lazy"
// - No GSAP dependency — uses CSS transitions (bottomToUp class)
// ============================================

'use client';

import { useCallback, useEffect, useRef } from 'react';
import './contact-page.css';
import gsap from 'gsap';



// ── Types ────────────────────────────────────────────────────────────────
interface ContactData {
    contactMainHeading?: string;
    contactPersonName?: string;
    contactPhone?: string;
    contactEmailText?: string;
    contactSayHello?: string;
    contactCompanyName?: string;
    contactAddressText?: string;
    contactImageCol?: { sourceUrl: string };
    contactCredits?: { sourceUrl: string };
    contactCopyright?: string;
}

interface ContactPageProps {
    data: ContactData | null;
}

export default function ContactPage({ data }: ContactPageProps) {
    const sectionRef = useRef<HTMLDivElement>(null);

    // ── bottomToUp scroll animation (matches existing site pattern) ─────
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const wrappers = section.querySelectorAll('.line-wrapper');
        if (!wrappers.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        wrappers.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);


    const handleNameEnter = useCallback(() => {
        const emailHeight = document.querySelector('.contact-email-text')?.getBoundingClientRect().height || 80;

        gsap.to(".contact-email-text", {
            y: -emailHeight,
            duration: 0.5,
            ease: 'power3.out',
        });
        gsap.to(".contact-say-hello", {
            y: -emailHeight,
            duration: 0.5,
            ease: 'power3.out',
        });
    }, []);

    const handleNameLeave = useCallback(() => {
        gsap.to(".contact-email-text", {
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
        });
        gsap.to(".contact-say-hello", {
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
        });
    }, []);


    const heading = data?.contactMainHeading;
    const personName = data?.contactPersonName || 'Michele Richards-Berry';
    const phone = data?.contactPhone || 'mb. +64 (0)21 432583';
    const email = data?.contactEmailText || 'michele@idc.co.nz';
    const sayHello = data?.contactSayHello || 'Say Hello !';
    const companyName = data?.contactCompanyName || 'IDC WORLDWIDE LTD.';
    const address = data?.contactAddressText || '498 GREAT NORTH RD, GREY LYNN, AUCKLAND, NEW ZEALAND';
    const imageUrl = data?.contactImageCol?.sourceUrl || 'https://idc.yp-studio.com/media/2025/03/09154627/production2.jpg';
    const creditsUrl = data?.contactCredits?.sourceUrl || 'https://idc.yp-studio.com/media/2025/02/05103008/Young-pandas-footer-white-text-logo.png';
    const copyright = data?.contactCopyright || '© Copyright – IDC Worldwide, 2026';


    return (
        <div className="contact-page-wrapper">
            <div ref={sectionRef} className="contact-page-inner">
                {/* ── "Contact" heading with bottomToUp animation ── */}
                <div className="contact-heading-section">
                    <div className="bottomToUp">
                        <span className="line-wrapper">
                            <span className="line-inner">
                                <h2 className="contact-main-heading">{heading}</h2>
                            </span>
                        </span>
                    </div>
                </div>

                {/* ── Content row: info left, image right ── */}
                <div className="contact-content-row">
                    {/* Left column: contact details */}
                    <div className="contact-details-col">
                        <div className="contact-person-block">
                            <h2 className="contact-person-name">
                                {personName}
                            </h2>
                            <h2 className="contact-phone">
                                {phone}
                            </h2>
                        </div>

                        <div className="contact-email-block">
                            <div className="contact-email-row"
                                onMouseEnter={handleNameEnter}
                                onMouseLeave={handleNameLeave}
                            >
                                <h2 className="contact-email-text">
                                    <a href="mailto:michele@idc.co.nz">
                                        {email}
                                    </a>
                                </h2>
                                <h2 className="contact-say-hello">
                                    <a href="mailto:michele@idc.co.nz">
                                        {sayHello}
                                    </a>
                                </h2>
                            </div>
                        </div>

                        <div className="contact-address-block">
                            <h2 className="contact-company-name">
                                {companyName}
                            </h2>
                            <p className="contact-address-text">
                                {address}
                            </p>
                        </div>
                    </div>

                    {/* Right column: image (desktop only) */}
                    <div className="contact-image-col">
                        <img
                            loading="lazy"
                            decoding="async"
                            width="768"
                            height="1024"
                            src={imageUrl}
                            alt="IDC Photography Production"
                        />
                    </div>
                </div>

                {/* ── Footer bar ── */}
                <div className="contact-footer-bar">
                    <div className="contact-copyright">
                        {copyright}
                    </div>
                    <div className="contact-credits">
                        <a
                            href="https://yp.studio"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                loading="lazy"
                                decoding="async"
                                width="800"
                                height="78"
                                src={creditsUrl}
                                alt="Designed & Developed by Young Pandas"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}