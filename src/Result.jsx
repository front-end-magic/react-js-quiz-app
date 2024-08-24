import { useRef, useEffect } from "react";
import Heading from "./Heading";
import "./css/result.css";
const Result = ({ score, restart, audioRef, isComplete, currentSong }) => {
  const resultElement = useRef();
  const rainStars = () => {
    let amount = 260;
    let i = 0;
    while (i < amount) {
      let stars = document.createElement("i");
      stars.className = "star-rain";
      let size = Math.random() * 50;
      let size2 = Math.random() * 100;
      let posX = Math.floor(Math.random() * window.innerWidth);
      let delay = Math.random() * 2;
      let color = Math.floor(Math.random() * 360);
      let perspective = Math.floor(Math.random() * 1200);

      stars.style.width = size + "px";
      stars.style.height = size + "px";
      stars.style.left = posX + "px";
      stars.style.animationDelay = delay + "s";
      stars.style.animationDuration = 2 + delay + "s";
      stars.style.background = ` hsl(${color}deg, 50%, 50%)`;

      resultElement.current.appendChild(stars);
      i++;
    }
  };

  useEffect(() => {
    if (isComplete && score >= 120) {
      rainStars();
    }
  }, [isComplete]);

  return (
    <>
      <div ref={resultElement} className="result">
        <audio ref={audioRef} src={currentSong}></audio>
      </div>
      <div className="wrapper">
        <Heading />

        <div className="final-score">score: {score}</div>
        <div className="reward">
          {score >= 120 ? " excellent ):" : "you can do better (:"}
        </div>
        <button onClick={restart} className="restart">
          restart
        </button>
      </div>
    </>
  );
};
export default Result;
