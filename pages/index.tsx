import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Results from "../components/Results";
import Search from "../components/Search";
import CTX from "../components/util/store";
import { motion } from "framer-motion";

const IndexPage = ({ url, stops }) => {
  const [searchID, updateSearch] = useState<number>();

  useEffect(() => {
    document.getElementsByTagName("body")[0].style.background =
      "#009 url(/background.png) repeat scroll 100% 100%";
  }, []);

  return (
    <CTX.Provider value={[searchID, updateSearch]}>
      <Head>
        <title>Tram Stop Times</title>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
        <meta
          name="description"
          content="Website for checking tram stop departure times"
        />
        <meta
          name="keywords"
          content="HTML, CSS, JavaScript, React, NextJS, tram, metrolink"
        />
        <meta name="author" content="Liukaku" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <motion.div
        initial={{ y: 600, x: 100, opacity: 0 }}
        animate={{ y: 0, x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "anticipate" }}
        className="md:w-4/5 w-10/12 mt-20 mx-auto border-2 pb-10 bg-gray-300  border-b-gray-500 border-l-gray-500 border-r-gray-100 border-t-gray-100 shadow-xl"
      >
        <div className="p-1 text-xl text-white mb-5 headerBarGrey leading-none bg-zinc-300  border-t-zinc-200 border-r-zinc-200 border-l-zinc-400 border-b-zinc-400">
          Metrolink Tram Time Checker
        </div>
        <Search stops={stops} />
        <Results url={url} />
      </motion.div>
    </CTX.Provider>
  );
};

export default IndexPage;

export async function getStaticProps() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const stopsUrl = process.env.NEXT_PUBLIC_STOPS_URL;
  const stops: Record<string, string> = await (await fetch(stopsUrl)).json();
  return {
    props: {
      url: apiUrl,
      stops: stops,
    },
  };
}
