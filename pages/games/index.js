import { useEffect } from "react";
import Body from "../../components/Body";
import NodeCache from "node-cache";

export default function Home({ data }) {
  useEffect(() => {
    fetch("/api/revalidate/games");
  }, [data]);
  return <Body data={data} query="games" />;
}

export async function getStaticProps() {
  const cache = new NodeCache({ stdTTL: 120 });
  let data;
  if (cache.has("games_400")) {
    data = cache.get("games_400");
  } else {
    try {
      const response = await fetch(process.env.PRECOMPILED + "_400.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      data = await response.json();
      cache.set("games_400", data);
    } catch (error) {
      console.error('Failed to fetch games data:', error);
      data = []; // Fallback to empty array
    }
  }
  return {
    props: {
      data,
    },
  };
}
