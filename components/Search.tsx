import React, { useEffect, useState } from "react";
import stops from "./util/stops.json";

interface StopObj {
  Id: number;
  StationLocation: string;
  Direction: string;
  Dest0: string;
}

const Search = (props) => {
  const [searchVal, updateSearch] = useState<string>("");
  const [searchResults, updateResults] = useState<Array<StopObj>>([]);

  useEffect(() => {
    console.log(stops.value);
  }, []);

  useEffect(() => {
    let stopArr = [];
    stops.value.forEach((val: StopObj, n: number) => {
      if (val.StationLocation.toLowerCase().includes(searchVal.toLowerCase())) {
        stopArr.push(val);
      }
    });
    updateResults(stopArr);
  }, [searchVal]);

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  const mouseOver = (e: React.MouseEvent, upDown: Boolean) => {
    const target = e.target as HTMLParagraphElement;
    if (upDown) {
      target.parentElement.classList.add("bg-red-300");
    } else {
      target.parentElement.classList.remove("bg-red-300");
    }
  };

  const selectOption = (e: React.MouseEvent) => {
    const target = e.target as HTMLParagraphElement;
    if (target.tagName !== "DIV") {
      console.log(target.parentElement.id);
    } else {
      console.log(target.id);
    }
  };

  return (
    <div>
      <input
        type={"text"}
        placeholder="Begin typing to Search"
        value={searchVal}
        onChange={(e) => {
          updateSearch(e.target.value);
        }}
      />
      <div className="w-auto absolute">
        {searchVal
          ? searchResults.map((val: StopObj, n: number) => {
              return (
                <div
                  id={val.Id.toString()}
                  className="flex"
                  onMouseEnter={(e) => {
                    mouseOver(e, true);
                  }}
                  onMouseLeave={(e) => {
                    mouseOver(e, false);
                  }}
                  onClick={(e) => {
                    selectOption(e);
                  }}
                >
                  <span>{val.StationLocation}</span>
                  <span>&nbsp;to&nbsp;</span>
                  <span>{val.Dest0}</span>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default Search;
