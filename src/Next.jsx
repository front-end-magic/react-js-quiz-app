import React from "react";
import "./css/next.css";
const Next = ({ next, isSelected }) => {
  return (
    <div>
      <button className={isSelected ? "next-active" : " "} onClick={next}>
        Next
      </button>
    </div>
  );
};

export default Next;
