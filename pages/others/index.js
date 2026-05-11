import React from "react";
import Body from "../../components/Body";
import { fetchWithCache } from "../../services/fetchWithCache";

export default function Home({ data }) {
  return <Body data={data} query="others" />;
}

export async function getStaticProps() {
  try {
    const data = await fetchWithCache(process.env.PRECOMPILED + "_600.json");
    return {
      props: {
        data: data || [],
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Error fetching others data:", error);
    return {
      props: {
        data: [],
      },
      revalidate: 3600,
    };
  }
}
