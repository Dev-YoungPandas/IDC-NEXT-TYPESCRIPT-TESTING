'use client';

import { useRef, useCallback, useState } from 'react';
import type { SubscribeCTAData } from '@/lib/mapTestimonialsData';
import './subscribe-cta.css';

// ═══════════════════════════════════════════════════════════════════════════
// FALLBACK DEFAULTS
// ═══════════════════════════════════════════════════════════════════════════
const DEFAULTS = {
    heading: 'Subscribe',
    subheading: 'The latest imagery, straight to your inbox',
    inputFullName: 'Your full name',
    inputEmail: 'Email',
    inputCompany: 'Company',
    bgImage:
        'https://idc.yp-studio.com/media/2025/02/09181729/Annabella_sitting_in_car_window_down_GuyCoombes_IDC-e1739726109279.jpg',
};

// ═══════════════════════════════════════════════════════════════════════════
// PROPS
// ═══════════════════════════════════════════════════════════════════════════
interface SubscribeCTAProps {
    data: SubscribeCTAData | null;
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export default function SubscribeCTA({ data }: SubscribeCTAProps) {
    const formRef = useRef<HTMLDivElement>(null);
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    // ─── Derive values from data with fallbacks ────────────────────────────
    const heading = data?.heading || DEFAULTS.heading;
    const subheading = data?.subheading || DEFAULTS.subheading;
    const placeholderName = data?.inputFullName || DEFAULTS.inputFullName;
    const placeholderEmail = data?.inputEmail || DEFAULTS.inputEmail;
    const placeholderCompany = data?.inputCompany || DEFAULTS.inputCompany;
    const bgImage = data?.bgImage || DEFAULTS.bgImage;
    const filmStripTop = data?.filmStripTop || '';
    const filmStripBottom = data?.filmStripBottom || '';

    // ─── Cached form field refs ────────────────────────────────────────────
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const companyRef = useRef<HTMLInputElement>(null);

    // ─── Submit handler ────────────────────────────────────────────────────
    const handleSubmit = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const name = nameRef.current?.value?.trim();
        const email = emailRef.current?.value?.trim();
        const company = companyRef.current?.value?.trim();

        // Basic validation
        if (!name || !email || !company) return;

        setFormState('submitting');

        // TODO: Replace with actual API endpoint (e.g. Elementor form handler / Mailchimp / etc.)
        setTimeout(() => {
            setFormState('success');
            setTimeout(() => {
                setFormState('idle');
                if (nameRef.current) nameRef.current.value = '';
                if (emailRef.current) emailRef.current.value = '';
                if (companyRef.current) companyRef.current.value = '';
            }, 3000);
        }, 800);
    }, []);

    return (
        <section className="scta">
            {/* ── Film strip top border ── */}
            {filmStripTop && (
                <div className="scta__film-strip scta__film-strip--top">
                    <img src={filmStripTop} alt="" loading="lazy" decoding="async" />
                </div>
            )}

            {/* ── Main background container ── */}
            <div
                className="scta__bg"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                {/* Dark overlay */}
                <div className="scta__overlay" />

                {/* ── Content positioned at bottom ── */}
                <div ref={formRef} className="scta__content">
                    {/* Left: Headings */}
                    <div className="scta__text-col">
                        <h2 className="scta__heading">{heading}</h2>
                        <p className="scta__subheading">{subheading}</p>
                    </div>

                    {/* Right: Form */}
                    <div className="scta__form-col">
                        <div className="scta__fields">
                            <div className="scta__field">
                                <input
                                    ref={nameRef}
                                    type="text"
                                    className="scta__input"
                                    placeholder={placeholderName}
                                    required
                                    autoComplete="name"
                                    disabled={formState === 'submitting'}
                                />
                            </div>
                            <div className="scta__field">
                                <input
                                    ref={emailRef}
                                    type="email"
                                    className="scta__input"
                                    placeholder={placeholderEmail}
                                    required
                                    autoComplete="email"
                                    disabled={formState === 'submitting'}
                                />
                            </div>
                            <div className="scta__field">
                                <input
                                    ref={companyRef}
                                    type="text"
                                    className="scta__input"
                                    placeholder={placeholderCompany}
                                    required
                                    autoComplete="organization"
                                    disabled={formState === 'submitting'}
                                />
                            </div>
                        </div>

                        <div className="scta__btn-wrap">
                            {formState === 'success' ? (
                                <span className="scta__success-msg">Thank you!</span>
                            ) : (
                                <button
                                    type="button"
                                    className="scta__btn"
                                    onClick={handleSubmit}
                                    disabled={formState === 'submitting'}
                                >
                                    <span className="scta__btn-text">
                                        {formState === 'submitting' ? 'Sending...' : 'Subscribe'}
                                    </span>
                                    <span className="scta__btn-icon">
                                        <svg
                                            aria-hidden="true"
                                            viewBox="0 0 448 512"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="14"
                                            height="14"
                                            fill="currentColor"
                                        >
                                            <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
                                        </svg>
                                    </span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Film strip bottom border ── */}
            {filmStripBottom && (
                <div className="scta__film-strip scta__film-strip--bottom">
                    <img src={filmStripBottom} alt="" loading="lazy" decoding="async" />
                </div>
            )}
        </section>
    );
}