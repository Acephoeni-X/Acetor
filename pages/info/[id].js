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
  console.log(`Fetching data for id: ${id}`);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_INFO}${id}`);
    console.log(`Response status: ${res.status}`);
    console.log(`Response headers:`, res.headers.get('content-type'));
    let data = await res.json();
    console.log(`Parsed data:`, data);

    if (!data || typeof data !== "object" || Array.isArray(data)) {
      console.log(`Invalid data, returning notFound`);
      return { notFound: true };
    }

    if (data.imdb) {
      console.log(`Fetching IMDB data for: ${data.imdb}`);
      const res2 = await fetch(process.env.OMDB_API + data.imdb);
      console.log(`IMDB response status: ${res2.status}`);
      let imdbData = await res2.json();
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
