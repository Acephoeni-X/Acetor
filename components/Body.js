import React from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";

const Body = ({ data, query }) => {
  return (
    <>
      <Header query={query} data={data} />
      <div className={styles.container}>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-12 mx-auto">
            <div className="flex flex-col text-center w-full mb-10">
              <h1 className="sm:text-4xl text-3xl font-medium title-font mb-1 text-gray-300">
                {query !== ""
                  ? "Showing results for: " +
                    query.charAt(0).toUpperCase() +
                    query.slice(1)
                  : "Top 100"}
              </h1>
            </div>
            <div className=" w-full mx-auto overflow-auto">
              <table className="table-auto w-full text-left whitespace-no-wrap">
                <thead>
                  <tr>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-300 text-sm bg-gray-600 rounded-tl rounded-bl">
                      Name
                    </th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-300 text-sm bg-gray-600">
                      Size
                    </th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-300 text-sm bg-gray-600">
                      Seeders
                    </th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-300 text-sm bg-gray-600">
                      Leechers
                    </th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-300 text-sm bg-gray-600">
                      User
                    </th>
                    <th className="w-10 title-font tracking-wider font-medium text-gray-300 text-sm bg-gray-600 rounded-tr rounded-br"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((d) => (
                    <tr key={d.id}>
                      <Link href={"/info/" + d.id} passHref>
                        <td
                          className="border-b-2 border-gray-200 px-4 py-3 text-gray-300"
                          style={{ cursor: "pointer" }}
                        >
                          {d.name}
                        </td>
                      </Link>
                      <td className="border-b-2 border-gray-200 px-4 py-3 text-gray-300">
                        {convertToGB(d.size) + " GB"}
                      </td>
                      <td className="border-b-2 border-gray-200 px-4 py-3 text-green-300">
                        {d.seeders + "  ⬆"}
                      </td>
                      <td className="border-b-2 border-gray-200 px-4 py-3 text-lg text-red-300">
                        {d.leechers + "  ⬇"}
                      </td>
                      <td className="border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-300">
                        {d.username}
                      </td>
                      <td className="border-b-2 border-gray-200 w-10 text-center text-gray-300"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};
function convertToGB(bytesValue) {
  let gbValue = (bytesValue / (1024 * 1024 * 1024)).toFixed(2);
  return gbValue;
}

export default Body;
