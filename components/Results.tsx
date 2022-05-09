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
      updateLoading({ searched: true, awaiting: true });
      fetchData().then((res) => {
        updateLoading({ searched: true, awaiting: false });
        updateResults(res);
      });
    }
  }, [searchID]);

  return (
    <div>
      {loading.searched ? (
        loading.awaiting ? (
          <div>Waiting</div>
        ) : Object.keys(searchResults).length ? (
          <div>
            {_looper.map((val) => {
              if (searchResults[`Dest${val}`] !== "") {
                return (
                  <TimeResult
                    key={`${val}`}
                    Dest={searchResults[`Dest${val}`]}
                    Carriages={searchResults[`Carriages${val}`]}
                    Wait={searchResults[`Wait${val}`]}
                  />
                );
              }
            })}
            <div className="z-0 md:w-2/5 w-4/5 text-center first:mt-10 mx-auto border-2 bg-gray-300 border-r-gray-500 border-b-gray-500 border-l-gray-100 border-t-gray-100 filter drop-shadow-xl">
              <p>{searchResults.MessageBoard}</p>
            </div>
          </div>
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
