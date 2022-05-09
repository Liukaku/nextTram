import React from "react";

interface TimeObj {
  Dest: string;
  Carriages: string;
  Wait: string;
}

const TimeResult = (props: TimeObj) => {
  return (
    <div className="z-0 md:w-2/5 w-4/5 text-center first:mt-10 mx-auto border-2 bg-gray-300 border-r-gray-500 border-b-gray-500 border-l-gray-100 border-t-gray-100 filter drop-shadow-xl">
      <h1 className="border-b border-dashed border-black">
        Destination: <strong>{props.Dest}</strong>
      </h1>
      <h1 className="border-b border-dashed border-black">
        Carriage Type: <strong>{props.Carriages}</strong>
      </h1>
      <h1>
        Estimated Arrival: <strong>{props.Wait}</strong>
      </h1>
    </div>
  );
};

export default TimeResult;
