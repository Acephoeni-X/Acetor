import React from "react";
import Imdb from "../../components/Imdb";
import Info from "../../components/Info";
import print_magnet from "../../services/magnet";
import { fetchWithCache } from "../../services/fetchWithCache";

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
  let data = {};

  try {
    const url = `${process.env.NEXT_PUBLIC_INFO}${id}`;
    const result = await fetchWithCache(url, { ttl: 600 });
    if (result && typeof result === "object" && !Array.isArray(result)) {
      data = result;
    }
  } catch (error) {
    console.error("Failed to fetch info data:", error);
  }

  if (data.imdb) {
    try {
      const imdbResult = await fetchWithCache(process.env.OMDB_API + data.imdb, {
        ttl: 3600,
      });
      if (imdbResult && typeof imdbResult === "object") {
        Object.assign(data, imdbResult);
      }
    } catch (error) {
      console.error("Failed to fetch OMDB data:", error);
    }
  }

  return {
    props: {
      data,
    },
  };
}