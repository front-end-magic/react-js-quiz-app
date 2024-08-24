import React from "react";
import "./css/display.css";
import { useState } from "react";
const Display = ({ score, timer, isPlaying, setIsPlaying }) => {
  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };
  return (
    <div className="display">
      <div className="count-down">
        {timer != "time up" ? `time: ${timer}s` : "time up"}
      </div>
      <div className="play" onClick={handlePlay}>
        play/pause
      </div>
      <div className="show-score">score: {score}</div>
    </div>
  );
};

export default Display;
