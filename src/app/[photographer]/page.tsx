import { fetchGraphQL } from '@/lib/graphql/client';
import { GET_DAN_PAGE_QUERY, GET_YUKI_PAGE_QUERY } from '@/lib/graphql/queries';
import ClientPage from './ClientPage';
import { notFound } from 'next/navigation';

// Add queries for each photographer
const PHOTOGRAPHER_CONFIG: Record<string, { query: string; dataKey: string }> = {
  'dan-max': {
    query: GET_DAN_PAGE_QUERY,
    dataKey: 'dan',
  },
  'yuki-sato': {
    query: GET_YUKI_PAGE_QUERY, // Replace with GET_YUKI_PAGE_QUERY when ready
    dataKey: 'yuki',
  },
  
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
    data = await fetchGraphQL(config.query);
  } catch (error) {
    console.error(`Failed to fetch ${photographer} data:`, error);
  }

  const heroImageUrl = data?.pageBy?.[config.dataKey]?.centerImage?.sourceUrl;

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