import Body from "../../components/Body";

export default function Home({ data }) {
  return <Body data={data} query="application" />;
}

export async function getStaticProps() {
  const url = process.env.NEXT_PUBLIC_PRECOMPILED + "_300.json";
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://apibay.org/',
    'Origin': 'https://apibay.org'
  };

  try {
    const res = await fetch(url, { headers });
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Fetch failed for ${url}. Status: ${res.status}. Body: ${errorText.substring(0, 100)}`);
      throw new Error(`API Status ${res.status}`);
    }
    const data = await res.json();
    return {
      props: { data },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      props: { data: [] },
      revalidate: 60,
    };
  }
}
