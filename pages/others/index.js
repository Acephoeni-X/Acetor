import { useEffect } from "react";
import Body from "../../components/Body";
import { fetchWithCache } from "../../services/fetchWithCache";

export default function Home({ data }) {
  useEffect(() => {
    fetch("/api/revalidate/others");
  }, []);
  return <Body data={data} query="others" />;
}

export async function getServerSideProps() {
  let data = [];
  try {
    const url = process.env.NEXT_PUBLIC_PRECOMPILED + "_600.json";
    const result = await fetchWithCache(url);
    if (Array.isArray(result)) {
      data = result;
    }
  } catch (error) {
    console.error("Failed to fetch others data:", error);
  }
  return {
    props: {
      data,
    },
  };
}
