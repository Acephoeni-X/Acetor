import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";

const Body = ({ data: initialData, query }) => {
  const [data, setData] = useState(initialData || []);
  const [status, setStatus] = useState(initialData && initialData.length ? "loaded" : "loading");

  useEffect(() => {
    // If server-side data failed (empty), try fetching from the browser (can solve Cloudflare JS challenges)
    const shouldFetch = !initialData || !initialData.length;
    if (!shouldFetch) return;

    const fetchClientData = async () => {
      setStatus("loading");
      try {
        const suffix = getSuffix(query);
        const res = await fetch(`${process.env.NEXT_PUBLIC_PRECOMPILED}${suffix}.json`);
        if (res.ok) {
          const json = await res.json();
          setData(Array.isArray(json) ? json : []);
          setStatus("loaded");
        } else {
          setStatus("error");
        }
      } catch (err) {
        setStatus("error");
      }
    };

    fetchClientData();
  }, [query, initialData]);

  const getSuffix = (q) => {
    switch (q) {
      case "movies":
        return "_200";
      case "games":
        return "_400";
      case "audio":
        return "_100";
      case "application":
        return "_300";
      case "others":
        return "_600";
      case "porn":
        return "_500";
      default:
        return "_all";
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
                    query?.charAt(0)?.toUpperCase() +
                    query?.slice(1)
                  : "Top 100"}
              </h1>
              {status === "loading" && (
                <p className="text-gray-500">Loading data…</p>
              )}
              {status === "error" && (
                <p className="text-red-300">
                  Unable to load data right now. Please refresh or try again later.
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
                        No results available. Please refresh or try another category.
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

function convertToGB(bytesValue) {
  if (!bytesValue || isNaN(bytesValue)) return "0.00";
  let gbValue = (bytesValue / (1024 * 1024 * 1024)).toFixed(2);
  return gbValue;
}

export default Body;
