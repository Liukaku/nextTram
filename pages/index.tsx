import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Results from "../components/Results";
import Search from "../components/Search";
import CTX from "../components/util/store";

const IndexPage = () => {
  const [searchID, updateSearch] = useState<number>();

  useEffect(() => {
    console.log(searchID);
  }, [searchID]);

  return (
    <CTX.Provider value={[searchID, updateSearch]}>
      <Head>
        <title>Tram Stop Times</title>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
      </Head>
      <div className="w-10 mx-auto bg-slate-700">
        <Search />
        <Results />
      </div>
    </CTX.Provider>
  );
};

export default IndexPage;
