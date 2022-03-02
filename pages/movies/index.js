import { useEffect } from "react";
import Body from "../../components/Body";

export default function Home({ data }) {
  useEffect(() => {
    fetch("/api/revalidate/movies");
  }, [data]);
  return <Body data={data} query="movies" />;
}

export async function getStaticProps() {
  const data = await (
    await fetch(process.env.PRECOMPILED + "_200.json")
  ).json();
  return {
    props: {
      data,
    },
  };
}
