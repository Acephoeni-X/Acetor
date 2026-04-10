import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Imdb from "../../components/Imdb";
import Info from "../../components/Info";
import print_magnet from "../../services/magnet";

const Id = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchInfo = async () => {
      setStatus("loading");
      setError(null);

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_INFO}${id}`);
        const json = await res.json();

        if (!res.ok) {
          setError(json?.error || "Unable to load item.");
          setStatus("error");
          return;
        }

        setData(json);
        setStatus("loaded");
      } catch (err) {
        setError("Unable to load item. Please try again.");
        setStatus("error");
      }
    };

    fetchInfo();
  }, [id]);

  const magnet = print_magnet(data?.info_hash ?? "", "Acetor-" + (data?.name ?? ""));

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-16">
        <div className="max-w-lg text-center">
          <h1 className="text-2xl font-semibold text-gray-200">Unable to load item</h1>
          <p className="mt-3 text-gray-400">{error}</p>
          <button
            className="mt-6 inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
            onClick={() => router.replace(router.asPath)}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (status === "loading" || !data) {
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
