import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";

const SearchBody = ({ query }) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!query) {
      setData([]);
      setStatus("idle");
      return;
    }

    const fetchResults = async () => {
      setStatus("loading");

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SEARCH}${encodeURIComponent(query)}`
        );
        if (!res.ok) {
          setStatus("error");
          return;
        }

        const json = await res.json();
        setData(Array.isArray(json) ? json : []);
        setStatus("loaded");
      } catch (err) {
        setStatus("error");
      }
    };

    fetchResults();
  }, [query]);

  const convertToGB = (bytesValue) => {
    if (!bytesValue || isNaN(bytesValue)) return "0.00";
    return (bytesValue / (1024 * 1024 * 1024)).toFixed(2);
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
                  ? "Search results for: " + query
                  : "Search"
                }
              </h1>
              {status === "loading" && (
                <p className="text-gray-500">Searching…</p>
              )}
              {status === "error" && (
                <p className="text-red-300">
                  Unable to search right now. Please refresh or try again later.
                </p>
              )}
            </div>
            <div className="w-full mx-auto overflow-auto">
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
                  {data.map((d) => (
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
                  {status === "loaded" && data.length === 0 && (
                    <tr>
                      <td colSpan={6} className="border-b-2 border-gray-200 px-4 py-6 text-center text-gray-400">
                        No results found. Try a different search term.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default SearchBody;
