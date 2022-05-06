import React, { useContext, useEffect, useState } from "react";
import CTX from "./util/store";

interface LoadingObj {
  searched: Boolean;
  awaiting: Boolean;
}

interface StopObj {
  Id: number;
  StationLocation: string;
  Direction: string;
  Dest0: string;
  MessageBoard: String;
}

const Results = () => {
  const [searchID, updateSearchID] = useContext(CTX);
  const [searchResults, updateResults] = useState<Array<StopObj>>([]);
  const [loading, updateLoading] = useState<LoadingObj>({
    searched: false,
    awaiting: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const results = await fetch(
        `https://tram-server.herokuapp.com/api/${searchID}`
      );
      const stops = await results.json();
      return stops;
    };
    fetchData().then((res) => {
      console.log(res);
    });
  }, [searchID]);

  return (
    <div>
      {loading.searched ? (
        loading.awaiting ? (
          <div>Waiting</div>
        ) : searchResults.length ? (
          <div>success!</div>
        ) : (
          <div>no response</div>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default Results;
