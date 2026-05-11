import React from "react";
import Body from "../../components/Body";

export default function Home({ data }) {
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
    revalidate: 3600,
  };
}
