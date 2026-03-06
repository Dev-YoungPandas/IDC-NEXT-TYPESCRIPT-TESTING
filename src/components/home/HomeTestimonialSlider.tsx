'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useLazyLoad } from '@/hooks/useLazyLoad';
import '../../styles/TestimonialSection.css';
import TextReveal from '../animations/TextReveal';

interface TestimonialSlide {
    image: string;
    quote: string;
    name: string;
    role: string;
}

export default function HomeTestimonialSlider({ data }: { data: any }) {
    const { ref, isVisible } = useLazyLoad({ threshold: 0.2 });

    const allSlides: TestimonialSlide[] = [
        {
            image: data?.section5Image?.sourceUrl || '',
            quote: data?.section5Paragraph2 || '',
            name: data?.section5Paragraph3 || '',
            role: data?.section5Paragraph4 || '',
        },
        {
            image: data?.section5Paragraph3Image3?.sourceUrl || data?.section5Image?.sourceUrl || '',
            quote: data?.section5Paragraph3Data3 || '',
            name: data?.section5Paragraph3Name || '',
            role: data?.section5Paragraph3Work || data?.section5Paragraph2Work || '',
        },
        {
            image: data?.section5Paragraph4Image4?.sourceUrl || data?.section5Image?.sourceUrl || '',
            quote: data?.section5Paragraph4Data4 || '',
            name: data?.section5Paragraph4Name || '',
            role: data?.section5Paragraph4Work || '',
        },
    ];

    const slides = allSlides.filter((s) => s.quote.trim() || s.name.trim());
    const totalSlides = slides.length;
    const isSlider = totalSlides > 1;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayIndex, setDisplayIndex] = useState(0);
    const [incomingIndex, setIncomingIndex] = useState<number | null>(null);
    const [direction, setDirection] = useState<'left' | 'right'>('left');
    const [phase, setPhase] = useState<'idle' | 'animating'>('idle');
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const clearAuto = useCallback(() => {
        if (autoRef.current) {
            clearInterval(autoRef.current);
            autoRef.current = null;
        }
    }, []);

    const animate = useCallback((dir: 'left' | 'right') => {
        if (phase === 'animating' || !isSlider) return;

        const next = dir === 'left'
            ? (currentIndex + 1) % totalSlides
            : (currentIndex - 1 + totalSlides) % totalSlides;

        setDirection(dir);
        setIncomingIndex(next);
        setPhase('animating');

        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            setCurrentIndex(next);
            setDisplayIndex(next);
            setIncomingIndex(null);
            setPhase('idle');
        }, 500);
    }, [phase, currentIndex, totalSlides, isSlider]);

    useEffect(() => {
        if (!isVisible || !isSlider) return;
        autoRef.current = setInterval(() => animate('left'), 3000);
        return () => clearAuto();
    }, [isVisible, animate, clearAuto, isSlider]);

    const handlePrev = useCallback(() => {
        if (phase === 'animating' || !isSlider) return;
        clearAuto();
        animate('right');
        autoRef.current = setInterval(() => animate('left'), 3000);
    }, [phase, clearAuto, animate, isSlider]);

    const handleNext = useCallback(() => {
        if (phase === 'animating' || !isSlider) return;
        clearAuto();
        animate('left');
        autoRef.current = setInterval(() => animate('left'), 3000);
    }, [phase, clearAuto, animate, isSlider]);

    useEffect(() => {
        return () => {
            clearAuto();
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [clearAuto]);

    if (!data || slides.length === 0) return null;

    const renderSlide = (index: number) => (
        <>
            {slides[index]?.image && (
                <img
                    src={slides[index].image}
                    alt="Rating"
                    loading="lazy"
                    decoding="async"
                    width="150"
                    height="30"
                />
            )}
            <h6>{slides[index]?.quote}</h6>
            <div className="testimonial-bottom-text">
                <h5>-{slides[index]?.name}</h5>
                <h4>{slides[index]?.role}</h4>
            </div>
        </>
    );

    const currentClass = phase === 'animating'
        ? direction === 'left' ? 'testimonial-slide-exit-left' : 'testimonial-slide-exit-right'
        : 'testimonial-slide-active';

    const incomingClass = direction === 'left'
        ? 'testimonial-slide-enter-from-right'
        : 'testimonial-slide-enter-from-left';

    return (
        <div ref={ref} className="testimonial-section home-testimonial-section">
            {isVisible && (

                <>

                    <TextReveal className="Testimonial-textreveal">
                        <p className="client-nz">{data.section5Paragraph}</p>
                        <h1 className="testimonial-heading">
                            {data.section5Heading}
                        </h1>
                    </TextReveal>
                    <div className="testimonial-slider">
                        <div className="testimonial-carausal">
                            <div className="testimonial-carousel-container">
                                <div className={`testimonial-slide ${isSlider ? currentClass : 'testimonial-slide-active'}`} key={`current-${displayIndex}`}>
                                    {renderSlide(displayIndex)}
                                </div>

                                {isSlider && phase === 'animating' && incomingIndex !== null && (
                                    <div className={`testimonial-slide ${incomingClass}`} key={`incoming-${incomingIndex}`}>
                                        {renderSlide(incomingIndex)}
                                    </div>
                                )}
                            </div>
                        </div>

                        {isSlider && (
                            <div className="testimonial-arrow-parent">
                                <div className="testimonial-arrow">
                                    <button onClick={handlePrev} className="testimonial-arrow-btn" aria-label="Previous testimonial" type="button">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62.23 20.12">
                                            <line x1="2.4" y1="10.06" x2="61.23" y2="10.06" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                            <path fill="white" d="M16.07,19.66c.3-.46.16-1.08-.31-1.38L2.86,10.06,15.77,1.84c.47-.3.6-.92.31-1.38-.3-.46-.92-.6-1.38-.31L.46,9.22c-.29.18-.46.5-.46.84s.17.66.46.84l14.23,9.06c.17.11.35.16.54.16.33,0,.65-.16.84-.46Z" />
                                        </svg>
                                    </button>
                                    <button onClick={handleNext} className="testimonial-arrow-btn" aria-label="Next testimonial" type="button">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62.23 20.12">
                                            <line x1="59.83" y1="10.06" x2="1" y2="10.06" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                            <path fill="white" d="M46.16.46c-.3.46-.16,1.08.31,1.38l12.91,8.22-12.91,8.22c-.47.3-.6.92-.31,1.38.3.46.92.6,1.38.31l14.23-9.06c.29-.18.46-.5.46-.84s-.17-.66-.46-.84L47.54.16c-.17-.11-.35-.16-.54-.16-.33,0-.65.16-.84.46Z" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="slider-number">
                                    <p className="slider-number-count">{displayIndex + 1}/{totalSlides}</p>
                                </div>
                            </div>
                        )}
                    </div>

                </>
            )}
        </div>
    );
}