import { useEffect } from "react";
import Body from "../components/Body";

export default function Home({ data }) {
  useEffect(() => {
    fetch("/api/revalidate");
  }, [data]);
  return <Body data={data} query="" />;
}

export async function getStaticProps() {
  let data;
  try {
    const response = await fetch(process.env.PRECOMPILED + "_all.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    data = await response.json();
  } catch (error) {
    console.error('Failed to fetch home data:', error);
    data = []; // Fallback to empty array
  }
  return {
    props: {
      data,
    },
  };
}
