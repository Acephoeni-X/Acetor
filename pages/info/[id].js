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
  console.log(`Fetching data for id: ${id}`);
  try {
    const data = await fetchWithCache(`${process.env.NEXT_PUBLIC_INFO}${id}`);
    console.log(`Fetched data:`, data);

    if (!data || typeof data !== "object" || Array.isArray(data)) {
      console.log(`Invalid data, returning notFound`);
      return { notFound: true };
    }

    if (data.imdb) {
      console.log(`Fetching IMDB data for: ${data.imdb}`);
      const imdbData = await fetchWithCache(process.env.OMDB_API + data.imdb);
      console.log(`IMDB data:`, imdbData);
      if (imdbData && typeof imdbData === "object" && !Array.isArray(imdbData)) {
        Object.assign(data, imdbData);
        console.log(`Merged data:`, data);
      }
    }

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      notFound: true,
    };
  }
}
