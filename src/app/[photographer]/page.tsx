import { fetchGraphQL } from '@/lib/graphql/client';
import {
  GET_CAMILLA_PAGE_QUERY,
  GET_DAN_PAGE_QUERY,
  GET_DEAN_PAGE_QUERY,
  GET_GUY_PAGE_QUERY,
  GET_SACHA_PAGE_QUERY,
  GET_YUKI_PAGE_QUERY,
} from '@/lib/graphql/queries';
import ClientPage from './ClientPage';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';



export async function generateMetadata({
  params,
}: {
  params: Promise<{ photographer: string }>
}): Promise<Metadata> {
  const { photographer } = await params;
  const config = PHOTOGRAPHER_CONFIG[photographer];


  if (!config) {
    return { title: "Not Found" };
  }

  try {
    const raw = await fetchGraphQL(config.query);
    const seo = raw?.pageBy?.seo;
    const photographerData = raw?.pageBy?.[config.dataKey];
    const name = photographerData?.photographerName || photographer;

    return {
      title: seo?.title || name,
      description: seo?.metaDesc || `${name} — IDC Photographer`,
      openGraph: {
        title: seo?.opengraphTitle || seo?.title || name,
        description: seo?.opengraphDescription || seo?.metaDesc || "",
        images: seo?.opengraphImage?.sourceUrl
          ? [{ url: seo.opengraphImage.sourceUrl }]
          : photographerData?.centerImage?.sourceUrl
            ? [{ url: photographerData.centerImage.sourceUrl }]
            : [],
      },
      twitter: {
        card: "summary_large_image",
        title: seo?.twitterTitle || seo?.title || name,
        description: seo?.twitterDescription || seo?.metaDesc || "",
        images: seo?.twitterImage?.sourceUrl
          ? [seo.twitterImage.sourceUrl]
          : photographerData?.centerImage?.sourceUrl
            ? [photographerData.centerImage.sourceUrl]
            : [],
      },
    };
  } catch {
    return { title: photographer };
  }

}


const PHOTOGRAPHER_CONFIG: Record<string, { query: string; dataKey: string }> = {
  'dan-max': {
    query: GET_DAN_PAGE_QUERY,
    dataKey: 'dan',
  },
  'yuki-sato': {
    query: GET_YUKI_PAGE_QUERY,
    dataKey: 'yuki',
  },

  'camilla-rutherford': {
    query: GET_CAMILLA_PAGE_QUERY,
    dataKey: 'camilla',
  },

  'sacha-stejko': {
    query: GET_SACHA_PAGE_QUERY,
    dataKey: 'sacha'
  },

  'guy-coombes': {
    query: GET_GUY_PAGE_QUERY,
    dataKey: 'guy'
  },

  'dean-mackenzie': {
    query: GET_DEAN_PAGE_QUERY,
    dataKey: 'dean'
  }
  // Add more as you create queries
};

export default async function PhotographerPage({
  params,
}: {
  params: Promise<{ photographer: string }>;
}) {
  const { photographer } = await params;
  const config = PHOTOGRAPHER_CONFIG[photographer];

  if (!config) {
    notFound();
  }

  let data = null;

  try {
    const raw = await fetchGraphQL(config.query);
    // Normalize: extract the photographer data so every page gets the same shape
    data = raw?.pageBy?.[config.dataKey] || null;
  } catch (error) {
    console.error(`Failed to fetch ${photographer} data:`, error);
  }

  const heroImageUrl = data?.centerImage?.sourceUrl;

  return (
    <>
      {heroImageUrl && (
        <link
          rel="preload"
          as="image"
          href={heroImageUrl}
          // @ts-ignore
          fetchPriority="high"
        />
      )}
      <ClientPage data={data} photographer={photographer} />
    </>
  );
}