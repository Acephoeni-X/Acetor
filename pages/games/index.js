import { useEffect } from "react";
import Body from "../../components/Body";

export default function Home({ data }) {
  useEffect(() => {
    fetch("/api/revalidate/games");
  }, []);
  return <Body data={data} query="games" />;
}

export async function getServerSideProps() {
  let data = [];
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_PRECOMPILED + "_400.json");
    if (response.ok) {
      data = await response.json();
    }
  } catch (error) {
    console.error('Failed to fetch games data:', error);
  }
  return {
    props: {
      data,
    },
  };
}
