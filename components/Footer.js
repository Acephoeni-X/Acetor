import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="text-gray-200 body-font mt-24">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <Image
            src="https://github.com/Rishi-Sharma2002/TorrentWebsite/blob/master/src/AceTor.png?raw=true"
            width={50}
            height={54}
            className="hover:cursor-pointer hover:animate-bounce "
            alt="acetor"
          ></Image>
        </a>
        <p className="text-sm text-gray-200 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2022 Acetor —
          <a
            href="https://github.com/Rishi-Sharma2002"
            className="text-gray-600 ml-1"
            rel="noopener noreferrer"
            target="_blank"
          >
            @AcephoeniX02
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
