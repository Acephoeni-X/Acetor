import { useEffect } from "react";
import Body from "../../components/Body";

export default function Home({ data }) {
  useEffect(() => {
    fetch("/api/revalidate/xxx");
  }, [data]);
  return <Body data={data} query="porn" />;
}

export async function getStaticProps() {
  const data = await (
    await fetch(process.env.PRECOMPILED + "_500.json")
  ).json();
  return {
    props: {
      data,
    },
  };
}
