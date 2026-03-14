import { useEffect } from "react";
import Body from "../../components/Body";
import NodeCache from "node-cache";

export default function Home({ data }) {
  useEffect(() => {
    fetch("/api/revalidate/games");
  }, [data]);
  return <Body data={data} query="games" />;
}

export async function getStaticProps() {
  const cache = new NodeCache({ stdTTL: 120 });
  let data;
  if (cache.get("games_400")) {
    data = cache;
  } else {
    data = await (
      await fetch(process.env.PRECOMPILED + "_400.json")
    ).json();
    cache.set("games_400", data);
  }
  return {
    props: {
      data,
    },
  };
}
