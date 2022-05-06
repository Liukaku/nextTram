import React, { useContext, useEffect, useState } from "react";
import stops from "./util/stops.json";
import CTX from "./util/store";

interface StopObj {
  Id: number;
  StationLocation: string;
  Direction: string;
  Dest0: string;
}

const Search = (props) => {
  const [seachID, updateSearchID] = useContext(CTX);
  const [searchVal, updateSearch] = useState<string>("");
  const [searchResults, updateResults] = useState<Array<StopObj>>([]);
  const [openSeach, toggleSeach] = useState<Boolean>(false);

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
    if (searchVal.split("").length === 1) {
      toggleSeach(true);
    }
  }, [searchResults]);

  const mouseOver = (e: React.MouseEvent, upDown: Boolean) => {
    const target = e.target as HTMLParagraphElement;
    if (upDown) {
      target.parentElement.classList.add("bg-red-300");
    } else {
      target.parentElement.classList.remove("bg-red-300");
    }
  };

  const selectOption = (e: React.MouseEvent, theStop: StopObj) => {
    const target = e.target as HTMLParagraphElement;
    if (target.tagName !== "DIV") {
      updateSearchID(target.parentElement.id);
      toggleSeach(false);
      updateSearch(`${theStop.StationLocation} to ${theStop.Dest0}`);
    } else {
      updateSearchID(target.id);
      toggleSeach(false);
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
        {openSeach
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
                    selectOption(e, val);
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
