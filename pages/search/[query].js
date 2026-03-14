import React from "react";
import Body from "../../components/Body";
import NodeCache from "node-cache";

const Query = ({ data, query }) => {
  return <Body data={data} query={query} />;
};

export default Query;

export async function getServerSideProps(context) {
  const cache = new NodeCache({ stdTTL: 120 });
  let data;
  if (cache.get(`search_${context.query.query}`)) {
    data = cache.get(`search_${context.query.query}`);
  } else {
    data = await (
      await fetch(`${process.env.NEXT_PUBLIC_SEARCH}${context.query.query} `)
    ).json();
    cache.set(`search_${context.query.query}`, data);
  }
  const query = context.query.query;
  console.log("Here is a data", data);
  return {
    props: {
      data: data.json(),
      query,
    },
  };
}
