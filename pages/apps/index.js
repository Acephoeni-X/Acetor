import { useEffect } from "react";
import Body from "../../components/Body";
import NodeCache from "node-cache";

export default function Home({ data }) {
  useEffect(() => {
    fetch("/api/revalidate/apps");
  }, [data]);
  return <Body data={data} query="application" />;
}

export async function getStaticProps() {
  let data;
  const cache = new NodeCache({ stdTTL: 120 });
  if (cache.get("audio_300")) {
    data = cache;
  } else {
    data = await (
      await fetch(process.env.PRECOMPILED + "_300.json")
    ).json();
    cache.set("audio_300", data);
  }
  return {
    props: {
      data,
    },
  };
}
