import React from "react";

interface TimeObj {
  Dest: string;
  Carriages: string;
  Wait: string;
}

const TimeResult = (props: TimeObj) => {
  return (
    <div className="z-0 w-2/5 text-center first:mt-10 mx-auto border-2 bg-gray-300 border-r-gray-500 border-b-gray-500 border-l-gray-100 border-t-gray-100">
      <h1>
        Destination: <strong>{props.Dest}</strong>
      </h1>
      <h1>
        Carriage Type: <strong>{props.Carriages}</strong>
      </h1>
      <h1>
        Estimated Arrival: <strong>{props.Wait}</strong>
      </h1>
    </div>
  );
};

export default TimeResult;
