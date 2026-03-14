import { useEffect } from "react";
import Body from "../../components/Body";
import { fetchWithCache } from "../../services/fetchWithCache";

export default function Home({ data }) {
  useEffect(() => {
    fetch("/api/revalidate/audio");
  }, []);
  return <Body data={data} query="audio" />;
}

export async function getServerSideProps() {
  let data = [];
  try {
    const url = process.env.NEXT_PUBLIC_PRECOMPILED + "_100.json";
    const result = await fetchWithCache(url);
    if (Array.isArray(result)) {
      data = result;
    }
  } catch (error) {
    console.error("Failed to fetch audio data:", error);
  }
  return {
    props: {
      data,
    },
  };
}
