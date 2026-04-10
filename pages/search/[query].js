import React from "react";
import Body from "../../components/Body";

const Query = ({ data, query }) => {
  return <Body data={data} query={query} />;
};

export default Query;

export async function getServerSideProps(context) {
  const { query } = context.query;
  let data = await fetch(`${process.env.NEXT_PUBLIC_SEARCH}${query} `)
  data = await data.json();
  console.log("Raw data from fetch:", data);
  console.log("Here is a data", data);
  return {
    props: {
      data: data,
      query,
    },
  };
}
