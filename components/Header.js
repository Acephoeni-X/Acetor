import React from "react";
import Head from "next/head";

const Header = ({ query, data, image }) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="google-site-verification" content={process.env.GOOGLE} />
      <link rel="shortcut icon" href="/favicon.ico" />
      <title>
        Acetor
        {query === ""
          ? " | Free Movies, TV-Series, Music, Games and Softwares"
          : "-" + query.charAt(0).toUpperCase() + query.slice(1)}
      </title>
      <link rel="shortcut icon" href="/Acetor.png" />
      <meta
        name="title"
        content={
          query === ""
            ? "Acetor is the most trusted Torrent website in the world, offering the most popular movies, TV-shows, applications, music, games and so on."
            : `Get Magnet links for ${query}, and also download many more popular movies, TV-shows, applications, music, games and so on.`
        }
      />

      <meta
        name="description"
        content={
          query === ""
            ? "Acetor is the most trusted Torrent website in the world, offering the most popular movies, TV-shows, applications, music, games and so on."
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
            ? "Acetor is the most trusted Torrent website in the world, offering the most popular movies, TV-series, applications, music, games and so on."
            : Object.keys(data).length >= 0
            ? data.descr
            : data.map((m) => m.descr)
        }
      />
      <meta property="og:image" content={image ? image : "/Acetor.png"} />

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
            ? "Acetor is the most trusted Torrent website in the world, offering the most popular movies, TV-series, shows, applications, music, games and so on."
            : Object.keys(data).length >= 0
            ? data.descr
            : data.map((m) => m.descr)
        }
      />
      <meta property="twitter:image" content={image ? image : "Acetor.png"} />
    </Head>
  );
};

export default Header;
