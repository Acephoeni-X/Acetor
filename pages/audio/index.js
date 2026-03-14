import { useEffect } from "react";
import Body from "../../components/Body";

export default function Home({ data }) {
  useEffect(() => {
    fetch("/api/revalidate/audio");
  }, [data]);
  return <Body data={data} query="audio" />;
}

export async function getStaticProps() {
  let data;
  try {
    const response = await fetch(process.env.PRECOMPILED + "_100.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    data = await response.json();
  } catch (error) {
    console.error('Failed to fetch audio data:', error);
    data = []; // Fallback to empty array
  }
  return {
    props: {
      data,
    },
  };
}
