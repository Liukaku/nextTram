import React from "react";

interface TimeObj {
  Dest: string;
  Carriages: string;
  Wait: string;
}

const TimeResult = (props: TimeObj) => {
  return (
    <div>
      <h1>{props.Dest}</h1>
      <h1>{props.Carriages}</h1>
      <h1>{props.Wait}</h1>
    </div>
  );
};

export default TimeResult;
