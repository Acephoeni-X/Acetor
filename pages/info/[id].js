import React from "react";
import Imdb from "../../components/Imdb";
import Info from "../../components/Info";
import print_magnet from "../../services/magnet";

const Id = ({ data }) => {
  let magnet = print_magnet(data.info_hash, "Acetor-" + data.name);
  return (
    <div>
      {data.imdb ? (
        <Imdb data={data} magnet={magnet} />
      ) : (
        <Info data={data} magnet={magnet} />
      )}
    </div>
  );
};

export default Id;

export async function getServerSideProps(context) {
  const { id } = context.query;
  let data = await (await fetch(`${process.env.NEXT_PUBLIC_INFO}${id}`)).json();
  if (data.imdb) {
    let imdbData = await (await fetch(process.env.OMDB_API + data.imdb)).json();
    Object.assign(data, imdbData);
  }
  return {
    props: {
      data,
    },
  };
}
