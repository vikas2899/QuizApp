import React, { useState } from "react";
import { Alert } from "@mui/material";
import "./Questions.css";

const Questions = ({
  currentQuestion,
  setCurrentQuestion,
  questions,
  options,
  score,
  setScore,
  setQuizData,
  correct,
  handleModalOpen,
  handleProgress,
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);
  const [isFinished, setFinish] = useState(false);

  const handleSelect = (selectedOpt) => {
    if (selected === selectedOpt && selected === correct) {
      return "select";
    } else if (selected === selectedOpt && selected !== correct) {
      return "wrong";
    } else if (selectedOpt === correct) {
      return "select";
    }
  };

  const handleClick = (opt) => {
    setSelected(opt);
    if (opt === correct) {
      setScore(score + 1);
    }
    setError(false);
  };

  const handleNext = () => {
    if (currentQuestion == 9 && selected) {
      setFinish(true);
      handleProgress();
      return;
    } else if (selected) {
      setCurrentQuestion(currentQuestion + 1);
      handleProgress();
      setSelected();
    } else {
      setError(true);
    }
  };

  const handleFinish = () => {
    if (isFinished) {
      handleModalOpen(true);
    } else {
      return;
    }
  };

  return (
    <div className="question">
      <h3>Question {currentQuestion + 1}</h3>
      <div className="singleQuestion">
        <h4>{questions[currentQuestion].question}</h4>
        <div className="options">
          {options.map((opt) => {
            return (
              <button
                key={opt}
                onClick={() => handleClick(opt)}
                className={`singleOption ${selected && handleSelect(opt)}`}
                disabled={selected}
              >
                {opt}
              </button>
            );
          })}
        </div>
        <div className="controls">
          <button
            className={`btn-finish ${!isFinished ? `disable` : ``}`}
            onClick={handleFinish}
          >
            Finish
          </button>
          <button
            onClick={handleNext}
            disabled={isFinished}
            className="btn-next"
          >
            Next
          </button>
        </div>
      </div>
      {error ? (
        <Alert severity="warning" style={{ width: 400, marginTop: 10 }}>
          Please select one of the option to continue.
        </Alert>
      ) : null}
    </div>
  );
};

export default Questions;
