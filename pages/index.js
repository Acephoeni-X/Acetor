import React from "react";
import Body from "../components/Body";
import { fetchWithCache } from "../services/fetchWithCache";

export default function Home({ data }) {
  return <Body data={data} query="" />;
}

export async function getStaticProps() {
  try {
    const data = await fetchWithCache(process.env.PRECOMPILED + "_all.json");
    return {
      props: {
        data: data || [],
      },
      revalidate: 3600, // Regenerate every hour
    };
  } catch (error) {
    console.error("Error fetching home data:", error);
    return {
      props: {
        data: [],
      },
      revalidate: 3600,
    };
  }
}
