'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import './accordiansection.css';



// ─── FAQ Data ────────────────────────────────────────────────────────────────
const FAQ_DATA = [
  {
    question: "What's the best time of year for photography in New Zealand?",
    answer: `<p>New Zealand's diverse climate allows for photography all year round, with each season offering unique advantages:</p>
<ul>
<li><strong>Summer (December–February):</strong> Long daylight hours, clear skies, and bright coastal settings.</li>
<li><strong>Autumn (March–May):</strong> Warm tones, stable weather, and cinematic golden light.</li>
<li><strong>Winter (June–August):</strong> Crisp conditions and snow-covered alpine scenery.</li>
<li><strong>Spring (September–November):</strong> Lush landscapes and vibrant colours ideal for outdoor shoots.</li>
</ul>
<p>IDC helps you plan around seasonal lighting, weather patterns, and accessibility so your production captures the best natural conditions possible for your creative vision.</p>`,
  },
  {
    question: 'Do I need a local production partner for photography in New Zealand?',
    answer: `<p>Yes. For most international photography productions, partnering with a local production services company is essential to meet permitting, tax, and legal requirements. A New Zealand–based partner also ensures smooth coordination with local assistants, stylists, suppliers, and authorities.</p>
<p>IDC acts as your full-service production partner on the ground, handling logistics, compliance, and location management so your creative team can focus on capturing exceptional images. With our in-depth local expertise and industry connections, we help you navigate every step of photography production in New Zealand efficiently and cost-effectively.</p>`,
  },
  {
    question: 'What permits are required for photography production in New Zealand?',
    answer: `<p>Most commercial photography in New Zealand requires permits, especially when shooting in public spaces, heritage sites, or protected conservation areas. Depending on your chosen locations, you may need permissions from local councils, regional offices, or the Department of Conservation (DOC). Drone photography also requires Civil Aviation Authority (CAA) certification.</p>
<p>IDC manages every step of this process for international and local productions alike. Our team handles all applications, safety documentation, and insurance requirements, ensuring your production remains compliant with all regional and national regulations. With long-standing relationships across New Zealand authorities, we can streamline approvals and reduce waiting times, so your project stays on schedule.</p>`,
  },
  {
    question: 'What are the typical production costs in New Zealand?',
    answer: `<p>Photography production costs in New Zealand vary depending on the scope of your project, shooting locations, and the size of your crew. Generally, New Zealand offers excellent value compared to other global production hubs, combining top-tier talent and equipment with favourable exchange rates.</p>
<p>IDC provides transparent, itemised budgets and guidance on how to structure your production to make the most of local crew rates and location efficiencies, helping you achieve premium quality at globally competitive costs. Our detailed knowledge of New Zealand's photography production landscape ensures you receive maximum value while maintaining the highest production standards.</p>`,
  },
  {
    question: 'How far in advance should we plan our NZ photography production?',
    answer: `<p>For optimal results, we recommend beginning your New Zealand photography production planning at least 8-12 weeks before your intended shoot dates. This timeline allows for comprehensive location scouting, securing permits, booking the best local talent, and developing weather contingency plans.</p>
<p>For complex multi-location shoots or projects during peak season (December-February), extending this timeline to 12-16 weeks provides additional flexibility and often results in cost savings. IDC can accommodate faster turnarounds when necessary, but early planning ensures you have access to the best locations, crew, and equipment for your specific creative needs.</p>`,
  },
];

// ─── Chevron SVGs ────────────────────────────────────────────────────────────
const ChevronDown = () => (
  <svg
    aria-hidden="true"
    className="prod-faq__chevron-svg"
    viewBox="0 0 448 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
  </svg>
);

const ChevronUp = () => (
  <svg
    aria-hidden="true"
    className="prod-faq__chevron-svg"
    viewBox="0 0 448 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z" />
  </svg>
);

// ─── Component ───────────────────────────────────────────────────────────────
export default function AccordianSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLHeadingElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* Toggle — only one open at a time */
  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  /* Animate panel open / close via scrollHeight */
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

  /* GSAP scroll-triggered entrance */
  useEffect(() => {
    let cancelled = false;

    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        if (headingRef.current) {
          gsap.fromTo(
            headingRef.current,
            { y: 60, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
              scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true },
            }
          );
        }

        if (accordionRef.current) {
          const items = accordionRef.current.querySelectorAll('.prod-faq__item');
          gsap.fromTo(
            items,
            { y: 40, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out',
              scrollTrigger: { trigger: accordionRef.current, start: 'top 80%', once: true },
            }
          );
        }

        if (bgTextRef.current) {
          gsap.fromTo(
            bgTextRef.current,
            { y: 40, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 1, ease: 'power2.out',
              scrollTrigger: { trigger: bgTextRef.current, start: 'top 90%', once: true },
            }
          );
        }
      });
    });

    return () => { cancelled = true; };
  }, []);

  return (
    <section ref={sectionRef} className="prod-faq">
      {/* Background watermark text */}
      {/* <h2 ref={bgTextRef} className="prod-faq__bg-text">
        Frequently Asked Questions About New Zealand Photography &amp; Production
      </h2> */}

      <div className="prod-faq__layout">
        {/* Left — FAQ'S heading */}
        <div className="prod-faq__left">
          <h3 ref={headingRef} className="prod-faq__heading">
            FAQ&apos;S
          </h3>
        </div>

        {/* Right — Accordion */}
        <div ref={accordionRef} className="prod-faq__right">
          {FAQ_DATA.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`prod-faq__item${isOpen ? ' prod-faq__item--open' : ''}`}
              >
                <button
                  className="prod-faq__trigger"
                  onClick={() => handleToggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`prod-faq-panel-${i}`}
                >
                  <span className="prod-faq__question">{item.question}</span>
                  <span className="prod-faq__chevron">
                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                  </span>
                </button>

                <div
                  id={`prod-faq-panel-${i}`}
                  ref={(el) => { panelRefs.current[i] = el; }}
                  className="prod-faq__panel"
                  role="region"
                >
                  <div
                    className="prod-faq__answer"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}