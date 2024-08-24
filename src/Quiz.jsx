import React from "react";
import "./css/quiz.css";
import { useState, useRef, useEffect } from "react";
import Start from "./Start";
import quizData from "./quizData.js";
import Questions from "./Questions";
import Display from "./Display.jsx";
import Heading from "./Heading.jsx";
import Next from "./Next.jsx";
import Result from "./Result.jsx";

const Quiz = () => {
  let [start, setstart] = useState(false);
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(quizData[index]);
  let [isSelected, setIsSelected] = useState(false);
  let [score, setScore] = useState(0);
  let [isComplete, setIsComplete] = useState(false);
  let [timer, setTimer] = useState(15);
  let [isTimeUp, setIsTimeUp] = useState(true);
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);
  const [currentSong, setCurrentSong] = useState("./assets/backgroumd.mp3");
  let options_array = [option1, option2, option3, option4];

  //   const startGame = () => {
  //     setstart(true);
  //     setIsPlaying(true);
  //     setIsTimeUp(false);
  //     //more actions to execute will come later
  //   };

  const startGame = () => {
    audioRef.current.play();
    setCurrentSong("./assets/background.mp3");
    setstart(true);
    setIsTimeUp(false);
    setIsPlaying(true);
    setIndex(0);
    setQuestion(quizData[0]);
    setIsSelected(false);
    setScore(0);
    setTimer(15);
    setIsComplete(false);
  };
  function createStars(e) {
    let size = Math.random() * 40;
    for (let index = 0; index < 300; index++) {
      let star = index;
      star = document.createElement("span");
      let color = Math.floor(Math.random() * 360);
      let perspective = Math.floor(Math.random() * 1200);
      let size = Math.random() * 80;

      star.style.perspective = perspective + "px";
      star.style.filter = `hue-rotate(${color}deg)`;
      star.style.rotate = `${color}deg`;
      star.style.width = size + 20 + "px";
      star.style.height = size + 20 + "px";
      star.style = `--i:${color}`;
      star.style.animationDelay = index * 0.05 + "s";

      e.target.appendChild(star);

      setTimeout(function () {
        star.remove();
      }, 2000);
    }
  }
  const checkSelectedOption = (e, ans) => {
    if (!isSelected) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setScore((score += timer * 2));
        setCurrentSong("./assets/correct.mp3");
        createStars(e);
      } else {
        e.target.classList.add("wrong");
        options_array[question.ans - 1].current.classList.add("corrected");
        setCurrentSong("./assets/wrong.mp3");
      }
      setIsSelected(true);
      setIsTimeUp(true);
    }
  };

  const handleTimeUp = () => {
    options_array[question.ans - 1].current.classList.add("corrected");
    setTimer(`time up`);
    setIsSelected(true);
    setIsTimeUp(true);
    setCurrentSong("./assets/time-up.mp3");
  };

  const next = () => {
    if (isSelected) {
      if (index === quizData.length - 1) {
        setIsComplete(true);
        setCurrentSong("./assets/background.mp3");

        return 0;
      }
      setIsSelected(false);
      setIndex(++index);
      setQuestion(quizData[index]);
      setIsTimeUp(false);
      setTimer(15);
      setCurrentSong("./assets/background.mp3");
      options_array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        option.current.classList.remove("corrected");
      });
    }
  };

  const restart = () => {
    setIsComplete(false);
    setIsPlaying(false);
    setstart(false);
  };

  useEffect(() => {
    const countDownInterval = setInterval(() => {
      if (timer >= 0 && !isTimeUp && start) {
        setTimer(timer--);
      } else if (timer <= 0) {
        handleTimeUp();
        clearInterval(countDownInterval);
      } else {
        clearInterval(countDownInterval);
      }
    }, 1000);

    return () => {
      clearInterval(countDownInterval);
    };
  }, [isTimeUp, start]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  return (
    <div>
      <audio ref={audioRef} src={currentSong}></audio>
      {!start && (
        <Start
          startGame={startGame}
          audioRef={audioRef}
          currentSong={currentSong}
        />
      )}
      {!isComplete && start && (
        <div className="container">
          <Heading />
          <Display
            setIsPlaying={setIsPlaying}
            isPlaying={isPlaying}
            score={score}
            timer={timer}
          />

          <Questions
            question={question}
            index={index}
            checkSelectedOption={checkSelectedOption}
            audioRef={audioRef}
            currentSong={currentSong}
            option1={option1}
            option2={option2}
            option3={option3}
            option4={option4}
          />
          <Next isSelected={isSelected} next={next} />
        </div>
      )}{" "}
      {isComplete && (
        <>
          <Result
            restart={restart}
            score={score}
            isComplete={isComplete}
            audioRef={audioRef}
            isPlaying={isPlaying}
            currentSong={currentSong}
          />
        </>
      )}
      <svg>
        <filter id="wavy">
          <feTurbulence
            x="0"
            y="0"
            baseFrequency="0.009"
            numOctaves="5"
            seed="2"
          >
            <animate
              attributeName="baseFrequency"
              dur="60s"
              values="0.02;0.005;0.02"
              repeatCount="indefinite"
            >
              {" "}
            </animate>
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="30"></feDisplacementMap>
        </filter>
      </svg>
    </div>
  );
};

export default Quiz;
