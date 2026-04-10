import { useEffect } from "react";
import Body from "../../components/Body";

export default function Home({ data }) {
  useEffect(() => {
    fetch("/api/revalidate/games");
  }, [data]);
  return <Body data={data} query="games" />;
}

export async function getStaticProps() {
  const data = await (
    await fetch(process.env.NEXT_PUBLIC_PRECOMPILED + "_400.json")
  ).json();
  return {
    props: {
      data,
    },
  };
}
