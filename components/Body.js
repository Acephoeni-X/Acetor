import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";

const Body = ({ data: initialData, query, error: initialError }) => {
  const [data, setData] = useState(initialData || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialError);

  useEffect(() => {
    // If we have no data, try to fetch on the client side
    // This bypasses Cloudflare blocks that affect Vercel's servers
    if (!data || data.length === 0) {
      fetchClientData();
    }
  }, [query]);

  const fetchClientData = async () => {
    setLoading(true);
    setError(null);
    
    let url = "";
    if (query === "") {
      url = `${process.env.NEXT_PUBLIC_PRECOMPILED}_all.json`;
    } else if (["audio", "movies", "application", "games", "porn", "others"].includes(query)) {
      const map = {
        "audio": "_100.json",
        "movies": "_200.json",
        "application": "_300.json",
        "games": "_400.json",
        "porn": "_500.json",
        "others": "_600.json"
      };
      url = `${process.env.NEXT_PUBLIC_PRECOMPILED}${map[query]}`;
    } else {
      // It's a search query
      url = `${process.env.NEXT_PUBLIC_SEARCH}${query}`;
    }

    try {
      const res = await fetch(url, {
        headers: {
          'Accept': 'application/json, text/plain, */*',
        }
      });
      
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const result = await res.json();
      setData(result || []);
    } catch (err) {
      console.error("Client-side fetch failed:", err);
      setError("Unable to load data. The Pirate Bay API might be blocking the request or down.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header query={query} data={data} />
      <div className={styles.container}>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-12 mx-auto">
            <div className="flex flex-col text-center w-full mb-10">
              <h1 className="sm:text-4xl text-3xl font-medium title-font mb-1 text-gray-300">
                {query !== ""
                  ? "Showing results for: " +
                    query.charAt(0).toUpperCase() +
                    query.slice(1)
                  : "Top 100"}
              </h1>
              {loading && <p className="text-green-400 mt-4 animate-pulse">Loading data from API...</p>}
              {error && (
                <div className="mt-4 bg-red-900/20 p-4 rounded border border-red-500/50">
                  <p className="text-red-400">{error}</p>
                  <button 
                    onClick={fetchClientData}
                    className="mt-2 text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition"
                  >
                    Retry Fetching
                  </button>
                </div>
              )}
            </div>
            <div className="w-full mx-auto overflow-auto">
              {!loading && !error && (!data || data.length === 0) ? (
                <div className="text-center py-10">
                  <p className="text-gray-400 text-xl">No torrents found matching your query.</p>
                </div>
              ) : (
                <table className="table-auto w-full text-left whitespace-no-wrap">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-300 text-sm bg-gray-600 rounded-tl rounded-bl">
                        Name
                      </th>
                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-300 text-sm bg-gray-600">
                        Size
                      </th>
                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-300 text-sm bg-gray-600">
                        Seeders
                      </th>
                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-300 text-sm bg-gray-600">
                        Leechers
                      </th>
                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-300 text-sm bg-gray-600">
                        User
                      </th>
                      <th className="w-10 title-font tracking-wider font-medium text-gray-300 text-sm bg-gray-600 rounded-tr rounded-br"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.map((d) => (
                      <tr
                        key={d.id}
                        className="hover:bg-gray-700 transition cursor-pointer"
                        onClick={() => (window.location.href = `/info/${d.id}`)}
                      >
                        <td className="border-b-2 border-gray-200 px-4 py-3 text-gray-300">
                          <Link href={`/info/${d.id}`} className="hover:underline">
                            {d.name}
                          </Link>
                        </td>
                        <td className="border-b-2 border-gray-200 px-4 py-3 text-gray-300">
                          {d.size ? convertToGB(d.size) + " GB" : "N/A"}
                        </td>
                        <td className="border-b-2 border-gray-200 px-4 py-3 text-green-300">
                          {d.seeders} ⬆
                        </td>
                        <td className="border-b-2 border-gray-200 px-4 py-3 text-red-300">
                          {d.leechers} ⬇
                        </td>
                        <td className="border-b-2 border-gray-200 px-4 py-3 text-gray-300">
                          {d.username}
                        </td>
                        <td className="border-b-2 border-gray-200 w-10 text-center text-gray-300"></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

function convertToGB(bytesValue) {
  if (!bytesValue || isNaN(bytesValue)) return "0.00";
  let gbValue = (bytesValue / (1024 * 1024 * 1024)).toFixed(2);
  return gbValue;
}

export default Body;
