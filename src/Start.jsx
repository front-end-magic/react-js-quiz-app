import "./css/start.css";
import Heading from "./Heading";

const Start = ({ startGame, audioRef, currentSong }) => {
  return (
    <>
      <div className="overlay">
        <audio ref={audioRef} src={currentSong}></audio>
        <Heading />
        <div className="instructions">
          <p>test your knowledge of CSS gradients</p>
          <p>
            click{" "}
            <a href="https://dev.to/kemiowoyele1/mastering-gradients-in-css-a-beginners-guide-4gak">
              here
            </a>{" "}
            to read the article first
          </p>
          <p>
            you will be scored according to your speed in providing the correct
            answers.
          </p>
        </div>
        <button className="start" onClick={startGame}>
          start quiz
        </button>
      </div>
    </>
  );
};
export default Start;
