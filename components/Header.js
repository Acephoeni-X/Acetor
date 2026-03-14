import React from "react";
import Head from "next/head";

const Header = ({ query, data, image }) => {
  const safeQuery = typeof query === "string" ? query : "";
  const capitalized =
    safeQuery && safeQuery.length > 0
      ? safeQuery.charAt(0).toUpperCase() + safeQuery.slice(1)
      : "";

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="google-site-verification" content={process.env.GOOGLE} />
      <link rel="shortcut icon" href="/favicon.ico" />
      <title>
        Acetor
        {safeQuery === ""
          ? " | Free Movies, TV-Series, Music, Games and Softwares"
          : "-" + capitalized}
      </title>
      <link rel="shortcut icon" href="/Acetor.png" />
      <meta
        name="title"
        content={
          safeQuery === ""
            ? "Acetor is the most trusted Torrent website in the world, offering the most popular movies, TV-shows, applications, music, games and so on."
            : `Get Magnet links for ${safeQuery}, and also download many more popular movies, TV-shows, applications, music, games and so on.`
        }
      />

      <meta
        name="description"
        content={
          safeQuery === ""
            ? "Acetor is the most trusted Torrent website in the world, offering the most popular movies, TV-shows, applications, music, games and so on."
            : data && !Array.isArray(data) && data.name
            ? data.name
            : "Browse popular movies, games, and more."
        }
      />

      <meta
        name="keywords"
        content={
          data && !Array.isArray(data) && data.name
            ? data.name
            : "movies, games, apps, music, torrents"
        }
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://acetor.live" />
      <meta
        property="og:title"
        content={
          safeQuery === ""
            ? "Acetor"
            : "Acetor-" + capitalized
        }
      />
      <meta
        property="og:description"
        content={
          safeQuery === ""
            ? "Acetor is the most trusted Torrent website in the world, offering the most popular movies, TV-series, applications, music, games and so on."
            : data && !Array.isArray(data) && data.descr
            ? data.descr
            : "Browse torrents for movies, games, apps, music, and more."
        }
      />
      <meta property="og:image" content={image ? image : "/Acetor.png"} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://acetor.live" />
      <meta
        property="twitter:title"
        content={
          safeQuery === ""
            ? "Acetor"
            : "Acetor-" + capitalized
        }
      />
      <meta
        property="twitter:description"
        content={
          safeQuery === ""
            ? "Acetor is the most trusted Torrent website in the world, offering the most popular movies, TV-series, shows, applications, music, games and so on."
            : data && !Array.isArray(data) && data.descr
            ? data.descr
            : "Browse torrents for movies, games, apps, music, and more."
        }
      />
      <meta property="twitter:image" content={image ? image : "Acetor.png"} />
    </Head>
  );
};

export default Header;
