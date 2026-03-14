import { useEffect } from "react";
import Body from "../../components/Body";

export default function Home({ data }) {
  useEffect(() => {
    fetch("/api/revalidate/xxx");
  }, [data]);
  return <Body data={data} query="porn" />;
}

export async function getStaticProps() {
  let data;
  try {
    const response = await fetch(process.env.PRECOMPILED + "_500.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    data = await response.json();
  } catch (error) {
    console.error('Failed to fetch xxx data:', error);
    data = []; // Fallback to empty array
  }
  return {
    props: {
      data,
    },
  };
}
