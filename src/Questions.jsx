import React from "react";
import "./css/questions.css";

const Questions = ({
  index,
  question,
  checkSelectedOption,
  option1,
  option2,
  option3,
  option4,
  audioRef,
  currentSong,
}) => {
  return (
    <div className="wrapper">
      <audio ref={audioRef} src={currentSong}></audio>

      <h2 className="question">
        {index + 1}). {question.question}
      </h2>
      <ol>
        <li
          ref={option1}
          onClick={(e) => {
            checkSelectedOption(e, 1);
          }}
        >
          {question.option1}
        </li>
        <li
          ref={option2}
          onClick={(e) => {
            checkSelectedOption(e, 2);
          }}
        >
          {question.option2}
        </li>
        <li
          ref={option3}
          onClick={(e) => {
            checkSelectedOption(e, 3);
          }}
        >
          {question.option3}
        </li>
        <li
          ref={option4}
          onClick={(e) => {
            checkSelectedOption(e, 4);
          }}
        >
          {question.option4}
        </li>
      </ol>
    </div>
  );
};

export default Questions;
