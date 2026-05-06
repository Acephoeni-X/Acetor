import Body from "../../components/Body";

export default function Home({ data }) {
  return <Body data={data} query="audio" />;
}

export async function getStaticProps() {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_PRECOMPILED + "_100.json", {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
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
