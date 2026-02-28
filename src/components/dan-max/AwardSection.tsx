
'use client'

import { useMemo, useState } from "react";
import styles from "../../styles/awardsection.module.css"

interface AwardItem {
    heading: string;
    paragraph: string;
    year: string;
    image: string;
    altText: string;
}


export default function AwardSection({ data }: { data?: any }) {


    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const hasAwardData = data?.awardHeadingMain || data?.awardParagraphMain;

    const awards: AwardItem[] = useMemo(() => {

        if (!data) return [];

        const items: AwardItem[] = [];
        for (let i = 1; i <= 18; i++) {
            const heading = data[`aw${i}Heading`] || '';
            const paragraph = data[`aw${i}Paragraph`] || '';
            const year = data[`aw${i}Year`] || '';
            const image = data[`aw${i}Image`]?.sourceUrl || '';
            const altText = data[`aw${i}Image`]?.altText || '';


            // Only include if at least heading or paragraph exists
            if (heading.trim() || paragraph.trim()) {
                items.push({ heading, paragraph, year, image, altText });
            }

        }

        return items;
    }, [data])

    const handleContainerClick = (index: number, e: React.MouseEvent) => {
        if (window.innerWidth > 1024) return;
        setActiveIndex(prev => (prev === index ? null : index));

    }

    if (!hasAwardData) return null;



    return (
        <div className={styles['award-main-section']} onClick={() => setActiveIndex(null)}>

            <div className={styles['award-top-section']}>
                <div className={styles['award-top-text-left']}>
                    <p className={styles['award-main-para']}>{data?.awardParagraphMain}</p>

                    <h1 className={styles['award-main-heading']}>{data?.awardHeadingMain}</h1>

                </div>

                <div className={styles['award-top-text-right']}>
                    <p className={styles['award-main-year']}>{data?.awardMainYear}</p>
                </div>
            </div>

            <div className={styles['award-bottom-section']}>

                {awards.map((award, index) => (
                    <div
                        key={index}
                        className={`${styles['aw1']} ${styles['award-container']} ${activeIndex === index ? styles['active'] : ''}`}
                        onClick={(e) => handleContainerClick(index, e)}
                    >
                        <div className={styles['accordian-header']}>
                            {award.image && (
                                <img
                                    className={`${styles['award-img']} ${styles['marginLeft']}`}
                                    src={award.image}
                                    alt={award.altText}
                                    loading="lazy"
                                    decoding="async"
                                />
                            )}
                            <h4>{award.heading}</h4>
                        </div>
                        <h6>{award.paragraph}</h6>
                        <h5>{award.year}</h5>
                    </div>
                ))}


            </div>


        </div>
    )
}