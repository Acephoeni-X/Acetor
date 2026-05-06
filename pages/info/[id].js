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

  const url = `${process.env.NEXT_PUBLIC_INFO}${id}`;
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://apibay.org/',
    'Origin': 'https://apibay.org'
  };

  try {
    const infoRes = await fetch(url, { headers });
    if (!infoRes.ok) {
      const errorText = await infoRes.text();
      console.error(`Fetch failed for ${url}. Status: ${infoRes.status}. Body: ${errorText.substring(0, 100)}`);
      throw new Error(`API Status ${infoRes.status}`);
    }
    const data = await infoRes.json();

    if (data.imdb) {
      try {
        const imdbRes = await fetch(process.env.OMDB_API + data.imdb, { 
          headers: {
            'User-Agent': headers['User-Agent']
          }
        });
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
