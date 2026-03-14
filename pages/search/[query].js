import React from "react";
import Body from "../../components/Body";

const Query = ({ query }) => {
  return <Body data={[]} query={query} />;
};

export default Query;

export async function getServerSideProps({ params }) {
  return {
    props: {
      query: params?.query ?? "",
    },
  };
}
