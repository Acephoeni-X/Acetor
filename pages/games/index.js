import { useEffect } from "react";
import Body from "../../components/Body";
import { fetchWithCache } from "../../services/fetchWithCache";

export default function Home({ data }) {
  useEffect(() => {
    fetch("/api/revalidate/games");
  }, []);
  return <Body data={data} query="games" />;
}

export async function getServerSideProps() {
  let data = [];
  try {
    const url = process.env.NEXT_PUBLIC_PRECOMPILED + "_400.json";
    const result = await fetchWithCache(url);
    if (Array.isArray(result)) {
      data = result;
    }
  } catch (error) {
    console.error("Failed to fetch games data:", error);
  }
  return {
    props: {
      data,
    },
  };
}
