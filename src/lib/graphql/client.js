// ============================================
// FILE: lib/graphql/client.js
// ============================================
// KEY CHANGES:
// 1. Added next.revalidate for ISR caching on the server
// 2. Works in both server and client environments
// 3. Server-side requests are cached and revalidated every 60 seconds
//    meaning subsequent visitors get instant responses from cache

// const GRAPHQL_ENDPOINT = 'http://raj-locals.local/graphql';


const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT


export async function fetchGraphQL(query, variables = {}) {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
      // ✅ Server-side caching: revalidate every 60 seconds
      // First request fetches from CMS, subsequent requests served from cache
      // This means LCP is not blocked by network latency for cached pages
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data, errors } = await response.json();

    if (errors) {
      throw new Error(errors[0].message);
    }

    return data;
  } catch (error) {
    console.error('GraphQL Error:', error);
    throw error;
  }
}