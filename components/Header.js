import React from "react";
import Head from "next/head";

const Header = ({ query, data }) => {
  return (
    <Head>
      <title>
        Acetor
        {query === ""
          ? ""
          : "-" + query.charAt(0).toUpperCase() + query.slice(1)}
      </title>
      <link
        rel="shortcut icon"
        href="https://github.com/Rishi-Sharma2002/TorrentWebsite/blob/master/src/AceTor.png?raw=true"
      />
      <meta
        name="title"
        content={
          query === ""
            ? "Get Magnet links for everything !!!"
            : `Get Magnet links for ${query}`
        }
      />
      {/* <meta name="keywords" content={ d data.map((d) => d.name)} /> */}
    </Head>
  );
};

export default Header;
