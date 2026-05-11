import React from "react";
import Body from "../../components/Body";

const Query = ({ data, query }) => {
  return <Body data={data} query={query} />;
};

export default Query;

export async function getServerSideProps(context) {
  const { query } = context.query;
  let data = await (
    await fetch(`${process.env.NEXT_PUBLIC_SEARCH}${query} `)
  ).json();
  return {
    props: {
      data,
      query,
    },
  };
}
