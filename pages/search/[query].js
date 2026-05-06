import React from "react";
import Body from "../../components/Body";

const Query = ({ data, query, error }) => {
  return <Body data={data} query={query} error={error} />;
};

export default Query;

export async function getServerSideProps(context) {
  const { res, query: { query } } = context;
  
  // Set cache headers: shared cache for 60s, stale-while-revalidate for 120s
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=120'
  );

  try {
    const fetchRes = await fetch(`${process.env.NEXT_PUBLIC_SEARCH}${query}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!fetchRes.ok) {
      throw new Error(`API responded with status: ${fetchRes.status}`);
    }

    const data = await fetchRes.json();
    
    return {
      props: {
        data: data || [],
        query,
      },
    };
  } catch (error) {
    console.error("Fetch error in getServerSideProps:", error);
    return {
      props: {
        data: [],
        query,
        error: "Failed to fetch search results. Please try again later.",
      },
    };
  }
}
