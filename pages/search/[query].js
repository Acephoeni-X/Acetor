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

  const url = `${process.env.NEXT_PUBLIC_SEARCH}${query}`;
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://apibay.org/',
    'Origin': 'https://apibay.org'
  };

  try {
    const fetchRes = await fetch(url, { headers });

    if (!fetchRes.ok) {
      const errorText = await fetchRes.text();
      console.error(`Fetch failed for ${url}. Status: ${fetchRes.status}. Body: ${errorText.substring(0, 100)}`);
      throw new Error(`API Status ${fetchRes.status}`);
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
