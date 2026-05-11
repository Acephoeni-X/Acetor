import React from "react";
import Body from "../../components/Body";

export default function Home({ data }) {
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
    revalidate: 3600,
  };
}
