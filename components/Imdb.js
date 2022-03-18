import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";

const Imdb = ({ data, magnet }) => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <Header image={data.Poster} query={data.Title} data={data} />
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 h-auto mx-auto flex flex-wrap align-middle justify-center">
            <div className="w-6/12 sm:w-4/12 px-4 mb-3">
              <img
                src={data.Poster}
                alt={"Image: " + data.Title}
                className="shadow rounded max-w-full h-auto align-middle border-none"
              />
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 lg:mt-0">
              <h2 className="text-sm title-font text-green-300 tracking-widest">
                {data.Genre}
              </h2>
              <h1 className="text-gray-200 text-3xl title-font font-medium mb-1  break-words">
                {data.name}
              </h1>
              <div className="flex mb-4">
                <span className="flex flex-row space-x-4">
                  <span className="text-gray-200">
                    <span className="text-orange-300">Rating</span>
                    <span>{" " + data.imdbRating}</span>
                  </span>
                  <span className="text-gray-200">
                    <span className="text-orange-300">Votes</span>
                    <span>{" " + data.imdbVotes}</span>
                  </span>
                </span>
              </div>
              <p className="leading-relaxed text-gray-300">{data.Plot}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5 "></div>
              <div className="flex mt-5 flex-wrap">
                <button
                  className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  onClick={() => {
                    window.open(magnet, "_ blank");
                  }}
                >
                  Download Magnet
                </button>

                {modal ? (
                  <button
                    className="flex mx-auto mt-16 text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg "
                    data-modal-toggle="popup-modal"
                    disabled
                  >
                    Copied to Clipboard
                  </button>
                ) : (
                  <button
                    className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg "
                    data-modal-toggle="popup-modal"
                    onClick={() => {
                      navigator.clipboard.writeText(magnet);
                      setModal(true);
                      setTimeout(() => {
                        setModal(false);
                      }, 1000);
                    }}
                  >
                    Copy Magnet
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="container px-5 mx-auto">
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-yellow-300">
                {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
              </h2>
              <p className="leading-relaxed">Status</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-300">
                {convertToGB(data.size) + " GB"}
              </h2>
              <p className="leading-relaxed">Size</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-green-300">
                {data.seeders}
              </h2>
              <p className="leading-relaxed">Seeders</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-red-300">
                {data.leechers}
              </h2>
              <p className="leading-relaxed">Leechers</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Imdb;

function convertToGB(bytesValue) {
  let gbValue = (bytesValue / (1024 * 1024 * 1024)).toFixed(2);
  return gbValue;
}
