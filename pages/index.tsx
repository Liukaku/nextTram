import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Results from "../components/Results";
import Search from "../components/Search";
import CTX from "../components/util/store";

const IndexPage = () => {
  const [searchID, updateSearch] = useState<number>();

  useEffect(() => {
    document.getElementsByTagName("body")[0].style.backgroundColor = "#D1D5DB";
  }, []);

  return (
    <CTX.Provider value={[searchID, updateSearch]}>
      <Head>
        <title>Tram Stop Times</title>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
      </Head>

      <div className="w-4/5 mt-20 mx-auto border-2 border-b-gray-500 border-l-gray-500 border-r-gray-100 border-t-gray-100">
        <Search />
        <Results />
      </div>
    </CTX.Provider>
  );
};

export default IndexPage;
