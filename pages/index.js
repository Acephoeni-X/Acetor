import Body from "../components/Body";

export default function Home({ data }) {
  return <Body data={data} query="" />;
}

export async function getStaticProps() {
  const url = process.env.NEXT_PUBLIC_PRECOMPILED + "_all.json";
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/plain, */*',
    'Referer': 'https://apibay.org/',
  };

  try {
    const res = await fetch(url, { headers });
    if (!res.ok) {
      console.error(`Fetch failed for ${url}. Status: ${res.status}`);
      throw new Error(`API Status ${res.status}`);
    }
    const data = await res.json();
    return {
      props: {
        data,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error("Fetch error in getStaticProps:", error);
    return {
      props: {
        data: [],
      },
      revalidate: 60, // Try again sooner if it failed
    };
  }
}
