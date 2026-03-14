import React from "react";
import Imdb from "../../components/Imdb";
import Info from "../../components/Info";
import print_magnet from "../../services/magnet";
import NodeCache from "node-cache";


const cache = new NodeCache({ stdTTL: 600 }); // 10 min

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
  console.log('Inside this')
  const { id } = context.query;
  const cached = cache.get(id);
  let data;
  if (cached) {
    data = cached;
  }else{
    data = await (await fetch(`${process.env.NEXT_PUBLIC_INFO}${id}`)).json()
    cache.set(id, data);
  }
  console.log('data', data)
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