import { useEffect } from "react";
import Body from "../../components/Body";
import NodeCache from "node-cache";

export default function Home({ data }) {
  useEffect(() => {
    fetch("/api/revalidate/apps");
  }, [data]);
  return <Body data={data} query="application" />;
}

export async function getStaticProps() {
  let data;
  const cache = new NodeCache({ stdTTL: 120 });
  if (cache.has("apps_300")) {
    data = cache.get("apps_300");
  } else {
    try {
      const response = await fetch(process.env.PRECOMPILED + "_300.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      data = await response.json();
      cache.set("apps_300", data);
    } catch (error) {
      console.error('Failed to fetch apps data:', error);
      data = []; // Fallback to empty array
    }
  }
  return {
    props: {
      data,
    },
  };
}
