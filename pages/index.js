import React from "react";
import Body from "../components/Body";

export default function Home({ data }) {
  return <Body data={data} query="" />;
}

export async function getStaticProps() {
  const data = await (
    await fetch(process.env.PRECOMPILED + "_all.json")
  ).json();
  return {
    props: {
      data,
    },
    revalidate: 3600, // Regenerate every hour
  };
}
