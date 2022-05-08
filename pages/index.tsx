import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Results from "../components/Results";
import Search from "../components/Search";
import CTX from "../components/util/store";
import { motion } from "framer-motion";

const IndexPage = () => {
  const [searchID, updateSearch] = useState<number>();

  useEffect(() => {
    document.getElementsByTagName("body")[0].style.background =
      "url(/background.png)";
  }, []);

  return (
    <CTX.Provider value={[searchID, updateSearch]}>
      <Head>
        <title>Tram Stop Times</title>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
      </Head>

      <motion.div
        initial={{ y: 600, x: 100, opacity: 0 }}
        animate={{ y: 0, x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "anticipate" }}
        className="w-4/5 mt-20 mx-auto border-2 pb-10 bg-gray-200  border-b-gray-500 border-l-gray-500 border-r-gray-100 border-t-gray-100 shadow-xl"
      >
        <div className="p-1 text-xl text-white mb-5 headerBarGrey leading-none bg-zinc-300  border-t-zinc-200 border-r-zinc-200 border-l-zinc-400 border-b-zinc-400">
          Metrolink Tram Time Checker
        </div>
        <Search />
        <Results />
      </motion.div>
    </CTX.Provider>
  );
};

export default IndexPage;
