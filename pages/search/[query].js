import React from "react";
import Body from "../../components/Body";
import { fetchWithCache } from "../../services/fetchWithCache";

const Query = ({ data, query }) => {
  return <Body data={data} query={query} />;
};

export default Query;

export async function getServerSideProps(context) {
  const query = context.query.query;
  const url = `${process.env.NEXT_PUBLIC_SEARCH}${encodeURIComponent(query)}`;

  let data = [];
  try {
    const result = await fetchWithCache(url);
    if (Array.isArray(result)) {
      data = result;
    }
  } catch (error) {
    console.error("Failed to fetch search data:", error);
  }

  return {
    props: {
      data,
      query,
    },
  };
}
