import { useEffect } from "react";
import Body from "../../components/Body";

export default function Home({ data }) {
  useEffect(() => {
    fetch("/api/revalidate/xxx");
  }, []);
  return <Body data={data} query="porn" />;
}

export async function getServerSideProps() {
  let data = [];
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_PRECOMPILED + "_500.json");
    if (response.ok) {
      data = await response.json();
    }
  } catch (error) {
    console.error('Failed to fetch xxx data:', error);
  }
  return {
    props: {
      data,
    },
  };
}
