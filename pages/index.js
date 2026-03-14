import { useEffect } from "react";
import Body from "../components/Body";
import { fetchWithCache } from "../services/fetchWithCache";

export default function Home({ data }) {
  useEffect(() => {
    fetch("/api/revalidate");
  }, []);
  return <Body data={data} query="" />;
}

export async function getServerSideProps() {
  let data = [];
  try {
    const url = process.env.NEXT_PUBLIC_PRECOMPILED + "_all.json";
    const result = await fetchWithCache(url);
    if (Array.isArray(result)) {
      data = result;
    }
  } catch (error) {
    console.error("Failed to fetch home data:", error);
  }
  return {
    props: {
      data,
    },
  };
}
