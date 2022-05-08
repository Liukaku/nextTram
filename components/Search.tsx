import React, { useContext, useEffect, useRef, useState } from "react";
import stops from "./util/stops.json";
import CTX from "./util/store";

interface StopObj {
  Id: number;
  StationLocation: string;
  Direction: string;
  Dest0: string;
}

const Search = (props) => {
  const [searchID, updateSearchID] = useContext(CTX);
  const [searchVal, updateSearch] = useState<string>("");
  const [searchResults, updateResults] = useState<Array<StopObj>>([]);
  const [openSeach, toggleSeach] = useState<Boolean>(false);
  const wrapperRef = useRef(null);

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
    if (searchVal.split("").length) {
      toggleSeach(true);
    } else if (searchVal.split("").length === 0) {
      toggleSeach(false);
    }
  }, [searchResults]);

  const useOutsideAlerter = (ref: React.RefObject<any>) => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target) && !openSeach) {
          toggleSeach(false);
        }
      };
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  const mouseOver = (e: React.MouseEvent, upDown: Boolean) => {
    const target = e.target as HTMLParagraphElement;
    if (upDown) {
      target.parentElement.classList.add("bg-yellow-200");
      target.parentElement.classList.remove("bg-white");
    } else {
      target.parentElement.classList.remove("bg-yellow-200");
      target.parentElement.classList.add("bg-white");
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

  useOutsideAlerter(wrapperRef);

  return (
    <div>
      <input
        className="text-black w-64 border-2 border-t-gray-600 border-r-gray-600 border-l-gray-400 border-b-gray-400"
        type={"text"}
        placeholder="Begin typing to Search"
        value={searchVal}
        onChange={(e) => {
          updateSearch(e.target.value);
        }}
      />
      <div
        ref={wrapperRef}
        className={`w-auto absolute border ${openSeach ? `border-black` : ``}`}
      >
        {openSeach
          ? searchResults.map((val: StopObj, n: number) => {
              return (
                <div
                  key={val.Id.toString()}
                  id={val.Id.toString()}
                  className={`flex bg-white cursor-pointer ${
                    val.Id == searchID
                      ? `border border-dotted border-black`
                      : ``
                  }`}
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
