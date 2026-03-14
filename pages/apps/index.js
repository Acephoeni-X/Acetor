import { useEffect } from "react";
import Body from "../../components/Body";
import { fetchWithCache } from "../../services/fetchWithCache";

export default function Home({ data }) {
  useEffect(() => {
    fetch("/api/revalidate/apps");
  }, []);
  return <Body data={data} query="application" />;
}

export async function getServerSideProps() {
  let data = [];
  try {
    const url = process.env.NEXT_PUBLIC_PRECOMPILED + "_300.json";
    const result = await fetchWithCache(url);
    if (Array.isArray(result)) {
      data = result;
    }
  } catch (error) {
    console.error("Failed to fetch apps data:", error);
  }
  return {
    props: {
      data,
    },
  };
}
