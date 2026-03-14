import { useEffect } from "react";
import Body from "../components/Body";

export default function Home({ data }) {
  useEffect(() => {
    fetch("/api/revalidate");
  }, []);
  return <Body data={data} query="" />;
}

export async function getServerSideProps() {
  let data = [];
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_PRECOMPILED + "_all.json");
    if (response.ok) {
      data = await response.json();
    }
  } catch (error) {
    console.error('Failed to fetch home data:', error);
  }
  return {
    props: {
      data,
    },
  };
}
