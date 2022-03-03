import React from "react";
import Head from "next/head";

const Header = ({ query, data, image }) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="google-site-verification" content={process.env.GOOGLE} />
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

      <meta
        name="description"
        content={
          query === ""
            ? "Get Magnet/Torrent links for everything !!!"
            : Object.keys(data).length >= 0
            ? data.name
            : data.map((m) => m.name)
        }
      />

      <meta
        name="keywords"
        content={
          Object.keys(data).length >= 0 ? data.name : data.map((m) => m.name)
        }
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://acetor.live" />
      <meta
        property="og:title"
        content={
          query === ""
            ? "Acetor"
            : "Acetor-" + query.charAt(0).toUpperCase() + query.slice(1)
        }
      />
      <meta
        property="og:description"
        content={
          query === ""
            ? "Get Magnet/Torrent links for everything !!!"
            : Object.keys(data).length >= 0
            ? data.descr
            : data.map((m) => m.descr)
        }
      />
      <meta
        property="og:image"
        content={
          image
            ? image
            : "https://github.com/Rishi-Sharma2002/TorrentWebsite/blob/master/src/AceTor.png?raw=true"
        }
      />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://acetor.live" />
      <meta
        property="twitter:title"
        content={
          query === ""
            ? "Acetor"
            : "Acetor-" + query.charAt(0).toUpperCase() + query.slice(1)
        }
      />
      <meta
        property="twitter:description"
        content={
          query === ""
            ? "Get Magnet/Torrent links for everything !!!"
            : Object.keys(data).length >= 0
            ? data.descr
            : data.map((m) => m.descr)
        }
      />
      <meta
        property="twitter:image"
        content={
          image
            ? image
            : "https://github.com/Rishi-Sharma2002/TorrentWebsite/blob/master/src/AceTor.png?raw=true"
        }
      />
    </Head>
  );
};

export default Header;
