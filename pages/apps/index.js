import { useEffect } from "react";
import Body from "../../components/Body";

export default function Home({ data }) {
  useEffect(() => {
    fetch("/api/revalidate/apps");
  }, [data]);
  return <Body data={data} query="application" />;
}

export async function getStaticProps() {
  const data = await (
    await fetch(process.env.PRECOMPILED + "_300.json")
  ).json();
  return {
    props: {
      data,
    },
  };
}
