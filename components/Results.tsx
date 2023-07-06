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
  Dest1?: string;
  Dest2?: string;
  Wait0: string;
  Wait1?: string;
  Wait2?: string;
  Carriages0: string;
  Carriages1?: string;
  Carriages2?: string;
  MessageBoard: String;
}

interface Props {
  url: string;
}

const Results = ({ url }: Props) => {
  const [searchID, updateSearchID] = useContext(CTX);
  const [searchResults, updateResults] = useState<StopObj>();
  const [loading, updateLoading] = useState<LoadingObj>({
    searched: false,
    awaiting: false,
  });
  const [err, updateErr] = useState<Boolean>(false);

  const _looper = [0, 1, 2, 3];

  useEffect(() => {
    const fetchData = async () => {
      const results = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ stop: searchID }),
      });
      const stops = await results.json();
      return JSON.parse(stops);
    };
    if (searchID) {
      updateLoading({ searched: true, awaiting: true });
      fetchData()
        .then((res) => {
          console.log(res);
          updateLoading({ searched: true, awaiting: false });
          if (res.error) {
            // the metrolink api itself can return an error but the lambda function is still working
            console.error(res.error);
            updateErr(true);
            generateErrContent();
          } else {
            // if you have had an error but it is now working again, reset the error state
            updateErr(false);
            updateResults(res);
          }
        })
        .catch((err) => {
          console.error(err);
          updateErr(true);
          updateLoading({ searched: true, awaiting: false });
          generateErrContent();
        });
    }
  }, [searchID]);

  function generateErrContent(): void {
    console.log("err");
    updateResults({
      Id: 127854,
      StationLocation: "Manchester Airport",
      Direction: "Incoming",
      Dest0: "Victoria",
      Wait0: "0",
      Carriages0: "Double",
      Dest1: "Victoria",
      Carriages1: "Single",
      Wait1: "11",
      Dest2: "",
      Carriages2: "",
      Wait2: "",
      MessageBoard:
        "Weather Warning - Take care when you travel stay hydrated and allow more time for your journey",
    });
  }

  return (
    <div>
      {loading.searched ? (
        loading.awaiting ? (
          <div className="w-100 text-center">
            <p className="">Waiting</p>
          </div>
        ) : Object.keys(searchResults).length ? (
          <div>
            {err && (
              <div className="w-100 text-center">
                <p>The stop ID is no longer valid, app needs update</p>
                <p>Here is a sample response:</p>
              </div>
            )}
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
            <div className="z-0 relative md:w-2/5 w-4/5 text-center first:mt-10 mx-auto border-2 bg-gray-300 border-r-gray-500 border-b-gray-500 border-l-gray-100 border-t-gray-100 filter drop-shadow-xl">
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
