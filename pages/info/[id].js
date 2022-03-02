import React from "react";
import Info from "../../components/Info";
import print_magnet from "../../services/magnet";

const Id = ({ data }) => {
  let magnet = print_magnet(data.info_hash, "Acetor-" + data.name);
  return (
    <div>
      <Info data={data} magnet={magnet} />
    </div>
  );
};

export default Id;

export async function getServerSideProps(context) {
  const { id } = context.query;
  let data = await (await fetch(`${process.env.NEXT_PUBLIC_INFO}${id}`)).json();

  return {
    props: {
      data,
    },
  };
}
