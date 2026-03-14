import { useEffect } from "react";
import Body from "../../components/Body";

export default function Home({ data }) {
  useEffect(() => {
    fetch("/api/revalidate/audio");
  }, []);
  return <Body data={data} query="audio" />;
}

export async function getServerSideProps() {
  let data = [];
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_PRECOMPILED + "_100.json");
    if (response.ok) {
      data = await response.json();
    }
  } catch (error) {
    console.error('Failed to fetch audio data:', error);
  }
  return {
    props: {
      data,
    },
  };
}
