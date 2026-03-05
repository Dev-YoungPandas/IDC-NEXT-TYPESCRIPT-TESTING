// ============================================
// FILE: app/page.tsx (Homepage - Server Component)
// ============================================

import { fetchGraphQL } from '@/lib/graphql/client';
import { GET_HOMEPAGE_QUERY } from '@/lib/graphql/queries';
import HomePage from '@/components/home/HomePage';
import HomeSection2 from '@/components/home/homeSection2/HomeSection2';
import { Metadata } from 'next';



export async function generateMetadata(): Promise<Metadata> {

  try {
    const data = await fetchGraphQL(GET_HOMEPAGE_QUERY);
    const seo = data?.pageBy?.seo;

    return {
      title: seo?.title || "IDC",
      description: seo?.metaDesc || "NZ's best talent in photography, directing and cinematography",
      openGraph: {
        title: seo?.opengraphTitle || seo?.title || "IDC",
        description: seo?.opengraphDescription || seo?.metaDesc || "",
        images: seo?.opengraphImage?.sourceUrl
          ? [{ url: seo.opengraphImage.sourceUrl, width: seo.opengraphImage.mediaDetails?.width, height: seo.opengraphImage.mediaDetails?.height }]
          : [],
      },

      twitter: {
        card: "summary_large_image",
        title: seo?.twitterTitle || seo?.title || "IDC",
        description: seo?.twitterDescription || seo?.metaDesc || "",
        images: seo?.twitterImage?.sourceUrl ? [seo.twitterImage.sourceUrl] : [],
      },
    }
  } catch (error) {
      return {
        title:"IDC",
        description: "NZ's best talent in photography, directing and cinematography",

      }
  }
}




// Slug mapping — maps each photographer name field to their slug and video field
const PHOTOGRAPHER_SLUG_MAP: Record<number, string> = {
  1: 'dan-max',
  2: 'yuki-sato',
  3: 'guy-coombes',
  4: 'camilla-rutherford',
  5: 'dean-mackenzie',
  6: 'sacha-stejko',
};

function transformHomepageData(homepageidc: any) {
  if (!homepageidc) return [];

  const photographers = [];

  for (let i = 1; i <= 6; i++) {
    const name = homepageidc[`photographerName${i}`];
    const video = homepageidc[`photographer${i}Video${i}`];

    if (name) {
      photographers.push({
        name,
        slug: PHOTOGRAPHER_SLUG_MAP[i] || name.toLowerCase().replace(/\s+/g, '-'),
        video: video?.mediaItemUrl || '',
        mimeType: video?.mimeType || 'video/mp4',
      });
    }
  }

  return photographers;
}

export default async function Home() {
  let photographers: any[] = [];

  try {
    const data = await fetchGraphQL(GET_HOMEPAGE_QUERY);
    const homepageidc = data?.pageBy?.homepageidc;
    photographers = transformHomepageData(homepageidc);
  } catch (error) {
    console.error('Failed to fetch homepage data:', error);
  }

  // Fallback if API fails
  if (photographers.length === 0) {
    photographers = [
      { name: 'Dan Max', slug: 'dan-max', video: '', mimeType: 'video/mp4' },
      { name: 'Yuki Sato', slug: 'yuki-sato', video: '', mimeType: 'video/mp4' },
      { name: 'Guy Coombes', slug: 'guy-coombes', video: '', mimeType: 'video/mp4' },
      { name: 'Camilla Rutherford', slug: 'camilla-rutherford', video: '', mimeType: 'video/mp4' },
      { name: 'Dean Mackenzie', slug: 'dean-mackenzie', video: '', mimeType: 'video/mp4' },
      { name: 'Sacha Stejko', slug: 'sacha-stejko', video: '', mimeType: 'video/mp4' },
    ];
  }

  return (
    <>
      <div>

        <HomePage photographers={photographers} />

        <div className="homesection2-top-dash">

          <h5>Since 1999</h5>

          <h5>top rated </h5>

          <h5>Photography + Productiion</h5>

          <h5>Auckland, NZ</h5>


        </div>

        <div>
          <HomeSection2 />

        </div>

      </div>

    </>
  );
}