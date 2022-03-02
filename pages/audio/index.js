import { useEffect } from "react";
import Body from "../../components/Body";

export default function Home({ data }) {
  useEffect(() => {
    fetch("/api/revalidate/audio");
  }, [data]);
  return <Body data={data} query="audio" />;
}

export async function getStaticProps() {
  const data = await (
    await fetch(process.env.PRECOMPILED + "_100.json")
  ).json();
  return {
    props: {
      data,
    },
  };
}
