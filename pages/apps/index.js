import { useEffect } from "react";
import Body from "../../components/Body";

export default function Home({ data }) {
  useEffect(() => {
    fetch("/api/revalidate/apps");
  }, []);
  return <Body data={data} query="application" />;
}

export async function getServerSideProps() {
  let data = [];
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_PRECOMPILED + "_300.json");
    if (response.ok) {
      data = await response.json();
    }
  } catch (error) {
    console.error('Failed to fetch apps data:', error);
  }
  return {
    props: {
      data,
    },
  };
}
