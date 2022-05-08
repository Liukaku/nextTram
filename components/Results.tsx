import React, { useContext, useEffect, useState } from "react";
import TimeResult from "./TimeResult";
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
  const [searchResults, updateResults] = useState<StopObj>();
  const [loading, updateLoading] = useState<LoadingObj>({
    searched: false,
    awaiting: false,
  });

  const _looper = [0, 1, 2, 3];

  useEffect(() => {
    const fetchData = async () => {
      const results = await fetch(
        `https://tram-server.herokuapp.com/api/${searchID}`
      );
      const stops = await results.json();
      return stops;
    };
    if (searchID) {
      fetchData().then((res) => {
        console.log(res);
      });
    }
  }, [searchID]);

  return (
    <div>
      {loading.searched ? (
        loading.awaiting ? (
          <div>Waiting</div>
        ) : Object.keys(searchResults).length ? (
          _looper.map((val) => {
            return <TimeResult />;
          })
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
