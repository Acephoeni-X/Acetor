import React, { useState, useEffect } from "react";
import Imdb from "../../components/Imdb";
import Info from "../../components/Info";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import print_magnet from "../../services/magnet";
import { useRouter } from "next/router";

const Id = ({ data: initialData }) => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!data && id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_INFO}${id}`);
      if (!res.ok) throw new Error(`API Status ${res.status}`);
      const infoData = await res.json();

      if (infoData.imdb) {
        try {
          const imdbRes = await fetch(process.env.OMDB_API + infoData.imdb);
          if (imdbRes.ok) {
            const imdbDetails = await imdbRes.json();
            Object.assign(infoData, imdbDetails);
          }
        } catch (e) {
          console.error("OMDB fetch failed", e);
        }
      }
      setData(infoData);
    } catch (err) {
      console.error("Client fetch failed", err);
      setError("Failed to load torrent information. The API might be blocked.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-gray-300">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
            <p className="text-xl">Loading torrent details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-gray-300">
          <div className="text-center p-8 bg-red-900/20 border border-red-500/50 rounded-lg max-w-md">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
            <p className="mb-6">{error || "Torrent details could not be retrieved."}</p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => router.back()}
                className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded transition"
              >
                Go Back
              </button>
              <button 
                onClick={fetchData}
                className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded transition"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400'
  );

  const url = `${process.env.NEXT_PUBLIC_INFO}${id}`;
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/plain, */*',
    'Referer': 'https://apibay.org/',
  };

  try {
    const infoRes = await fetch(url, { headers });
    if (!infoRes.ok) {
      console.error(`Fetch failed for ${url}. Status: ${infoRes.status}`);
      throw new Error(`Status ${infoRes.status}`);
    }
    const data = await infoRes.json();

    if (data.imdb) {
      try {
        const imdbRes = await fetch(process.env.OMDB_API + data.imdb, { headers: { 'User-Agent': headers['User-Agent'] } });
        if (imdbRes.ok) {
          const imdbData = await imdbRes.json();
          Object.assign(data, imdbData);
        }
      } catch (e) {}
    }

    return { props: { data } };
  } catch (error) {
    console.error("Server-side info fetch failed, falling back to client:", error.message);
    return { props: { data: null } };
  }
}
