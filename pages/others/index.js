import { useEffect } from "react";
import Body from "../../components/Body";
import NodeCache from "node-cache";

export default function Home({ data }) {
  useEffect(() => {
    fetch("/api/revalidate/others");
  }, [data]);
  return <Body data={data} query="others" />;
}

export async function getStaticProps() {
  const cache = new NodeCache({ stdTTL: 120 });
  let data;
  if (cache.get("others_600")) {
    data = cache;
  } else {
    data = await (
      await fetch(process.env.PRECOMPILED + "_600.json")
    ).json();
    cache.set("others_600", data);
  } return {
    props: {
      data,
    },
  };
}
