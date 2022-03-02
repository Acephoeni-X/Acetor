import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const [input, setInput] = useState("search");
  return (
    <header className="text-gray-200 body-font ">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/">
          <a className="flex title-font font-medium items-center text-gray-500 mb-4 md:mb-0">
            <Image
              src="https://github.com/Rishi-Sharma2002/TorrentWebsite/blob/master/src/AceTor.png?raw=true"
              width={50}
              height={54}
              className="hover:cursor-pointer hover:animate-bounce "
              alt="acetor"
            ></Image>
          </a>
        </Link>

        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link href={"/audio/"}>
            <a className="mr-5 hover:text-green-200 hover:cursor-pointer">
              Audio
            </a>
          </Link>
          <Link href={"/movies/"}>
            <a className="mr-5 hover:text-green-200 hover:cursor-pointer">
              Movies
            </a>
          </Link>

          <Link href={"/apps/"}>
            <a className="mr-5 hover:text-green-200 hover:cursor-pointer">
              Applications
            </a>
          </Link>

          <Link href={"/games/"}>
            <a className="mr-5 hover:text-green-200 hover:cursor-pointer">
              Games
            </a>
          </Link>

          <Link href={"/xxx/"}>
            <a className="mr-5 hover:text-green-200 hover:cursor-pointer">
              Porn
            </a>
          </Link>

          <Link href={"/others/"}>
            <a className="mr-5 hover:text-green-200 hover:cursor-pointer">
              Others
            </a>
          </Link>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/search/${input}`);
            }}
          >
            <input
              type="text"
              id="name"
              name="name"
              className="w-full  bg-gray-600 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder={input !== "" ? input : "search"}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </form>
        </nav>
        {/* <button className="inline-flex items-center bg-gray-500 border-0 py-1 px-3 focus:outline-none hover:bg-green-200 rounded text-base mt-4 md:mt-0">
          History
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button> */}
      </div>
    </header>
  );
};

export default Navbar;
