import React from "react";
import Imdb from "../../components/Imdb";
import Info from "../../components/Info";
import print_magnet from "../../services/magnet";
import { fetchWithCache } from "../../services/fetchWithCache";

const Id = ({ data, error }) => {
  const magnet = print_magnet(data?.info_hash ?? "", "Acetor-" + (data?.name ?? ""));

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-16">
        <div className="max-w-lg text-center">
          <h1 className="text-2xl font-semibold text-gray-200">Unable to load item</h1>
          <p className="mt-3 text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!data || !Object.keys(data).length) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-16">
        <div className="max-w-lg text-center">
          <h1 className="text-2xl font-semibold text-gray-200">Loading…</h1>
          <p className="mt-3 text-gray-400">Please wait while we fetch the latest information.</p>
        </div>
      </div>
    );
  }

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
  let data = null;
  let error = null;

  try {
    const url = `${process.env.NEXT_PUBLIC_INFO}${id}`;
    const result = await fetchWithCache(url, { ttl: 600 });
    if (result && typeof result === "object" && !Array.isArray(result)) {
      data = result;
    } else {
      error = "The upstream API did not return valid data. Please try again later.";
    }
  } catch (err) {
    console.error("Failed to fetch info data:", err);
    error = "Unable to reach the backend service. Please try again later.";
  }

  if (data?.imdb) {
    try {
      const imdbResult = await fetchWithCache(process.env.OMDB_API + data.imdb, {
        ttl: 3600,
      });
      if (imdbResult && typeof imdbResult === "object") {
        Object.assign(data, imdbResult);
      }
    } catch (err) {
      console.error("Failed to fetch OMDB data:", err);
      // Ignore OMDB failures; keep the main data usable.
    }
  }

  return {
    props: {
      data: data ?? {},
      error,
    },
  };
}