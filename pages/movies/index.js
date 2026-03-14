import { useEffect } from "react";
import Body from "../../components/Body";
import NodeCache from "node-cache";

export default function Home({ data }) {
  useEffect(() => {
    fetch("/api/revalidate/movies");
  }, [data]);
  return <Body data={data} query="movies" />;
}

export async function getStaticProps() {
  const cache = new NodeCache({ stdTTL: 120 });
  let data;
  if(cache.has("movies_200")){
    data = cache.get("movies_200");
  }else{
    data = await (
        await fetch(process.env.PRECOMPILED + "_200.json")
    ).json();
    cache.set("movies_200", data);
  }
  return {
    props: {
      data,
    },
  };
}
