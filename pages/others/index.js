import { useEffect } from "react";
import Body from "../../components/Body";

export default function Home({ data }) {
  useEffect(() => {
    fetch("/api/revalidate/others");
  }, [data]);
  return <Body data={data} query="others" />;
}

export async function getStaticProps() {
  const data = await (
    await fetch(process.env.PRECOMPILED + "_600.json")
  ).json();
  return {
    props: {
      data,
    },
  };
}
