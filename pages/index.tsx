import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Results from "../components/Results";
import Search from "../components/Search";
import CTX from "../components/util/store";

const IndexPage = () => {
  const [searchID, updateSearch] = useState<number>();

  useEffect(() => {
    document.getElementsByTagName("body")[0].style.backgroundColor = "#E5E7EB";
  }, []);

  return (
    <CTX.Provider value={[searchID, updateSearch]}>
      <Head>
        <title>Tram Stop Times</title>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
      </Head>
      <div className="w-64 mt-20 mx-auto">
        <Search />
        <Results />
      </div>
    </CTX.Provider>
  );
};

export default IndexPage;
