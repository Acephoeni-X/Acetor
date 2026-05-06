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
  const { res, query: { id } } = context;

  // Set cache headers: shared cache for 1 hour, stale-while-revalidate for 1 day
  // Info pages are usually stable
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400'
  );

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  };

  try {
    const infoRes = await fetch(`${process.env.NEXT_PUBLIC_INFO}${id}`, { headers });
    if (!infoRes.ok) throw new Error(`Info API responded with ${infoRes.status}`);
    const data = await infoRes.json();

    if (data.imdb) {
      try {
        const imdbRes = await fetch(process.env.OMDB_API + data.imdb, { headers });
        if (imdbRes.ok) {
          const imdbData = await imdbRes.json();
          Object.assign(data, imdbData);
        }
      } catch (imdbError) {
        console.error("OMDB Fetch error:", imdbError);
        // Continue even if IMDB fetch fails
      }
    }

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error("Fetch error in getServerSideProps:", error);
    return {
      notFound: true, // Show 404 if the main data fetch fails
    };
  }
}
