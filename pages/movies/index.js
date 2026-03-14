import { useEffect } from "react";
import Body from "../../components/Body";
import { fetchWithCache } from "../../services/fetchWithCache";

export default function Home({ data }) {
  useEffect(() => {
    fetch("/api/revalidate/movies");
  }, []);
  return <Body data={data} query="movies" />;
}

export async function getServerSideProps() {
  let data = [];
  try {
    const url = process.env.NEXT_PUBLIC_PRECOMPILED + "_200.json";
    const result = await fetchWithCache(url);
    if (Array.isArray(result)) {
      data = result;
    }
  } catch (error) {
    console.error("Failed to fetch movies data:", error);
  }
  return {
    props: {
      data,
    },
  };
}
