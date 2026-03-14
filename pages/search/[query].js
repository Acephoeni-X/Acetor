import React from "react";
import SearchBody from "../../components/SearchBody";

const Query = ({ query }) => {
  return <SearchBody query={query} />;
};

export default Query;

export async function getServerSideProps({ params }) {
  return {
    props: {
      query: params?.query ?? "",
    },
  };
}
