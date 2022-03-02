import { useState } from "react";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Info = ({ data, magnet }) => {
  const [desc, setDesc] = useState(data.descr);
  const [modal, setModal] = useState(false);

  return (
    <>
      <Header query={data.name} data={data} />
      <div>
        <section className="text-gray-400 body-font">
          <div className="container px-5 pt-16 mx-auto">
            <div className="flex flex-col text-center w-full mb-10">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-green-200">
                {data.name}
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base mt-10 mb-10">
                <textarea
                  className="
                    form-control
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-300
                    bg-black bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
                  id="exampleFormControlTextarea1"
                  rows="10"
                  column="50"
                  placeholder="No description provided"
                  readOnly
                  defaultValue={desc}
                ></textarea>
              </p>
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
                  Copied...
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
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Info;
function convertToGB(bytesValue) {
  let gbValue = (bytesValue / (1024 * 1024 * 1024)).toFixed(2);
  return gbValue;
}
