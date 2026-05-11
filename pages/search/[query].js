import React from "react";
import Body from "../../components/Body";
import { fetchWithCache } from "../../services/fetchWithCache";

const Query = ({ data, query }) => {
  return <Body data={data} query={query} />;
};

export default Query;

export async function getServerSideProps(context) {
  const { query } = context.query;
  try {
    const data = await fetchWithCache(`${process.env.NEXT_PUBLIC_SEARCH}${query}`);
    return {
      props: {
        data: data || [],
        query,
      },
    };
  } catch (error) {
    console.error("Error fetching search data:", error);
    return {
      props: {
        data: [],
        query,
      },
    };
  }
}
