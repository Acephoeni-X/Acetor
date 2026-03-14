import { useEffect } from "react";
import Body from "../../components/Body";
import NodeCache from "node-cache";

export default function Home({ data }) {
  useEffect(() => {
    fetch("/api/revalidate/others");
  }, [data]);
  return <Body data={data} query="others" />;
}

export async function getStaticProps() {
  const cache = new NodeCache({ stdTTL: 120 });
  let data;
  if (cache.has("others_600")) {
    data = cache.get("others_600");
  } else {
    try {
      const response = await fetch(process.env.PRECOMPILED + "_600.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      data = await response.json();
      cache.set("others_600", data);
    } catch (error) {
      console.error('Failed to fetch others data:', error);
      data = []; // Fallback to empty array
    }
  } return {
    props: {
      data,
    },
  };
}
