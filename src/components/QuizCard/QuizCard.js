import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Questions from "../Questions/Questions";
import Progress from "../Progress/Progress";
import { useNavigate } from "react-router-dom";

import "./QuizCard.css";

const QuizCard = ({ name, questions, score, setQuizData, setScore }) => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [options, setOptions] = useState([]);
  const [progress, setProgress] = useState(0);

  //Modal State
  const [modalOpen, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    // Set options array
    let opt = [
      questions[currentQuestion].correct_answer,
      ...questions[currentQuestion].incorrect_answers,
    ];

    opt = opt.sort(() => Math.random() - 0.5);

    setOptions(questions && [...opt]);
  }, [questions, currentQuestion]);

  const handleRetry = () => {
    navigate("/");
  };

  const handleProgress = () => {
    setProgress((prevProgress) =>
      prevProgress >= 100 ? 0 : prevProgress + 10
    );
  };

  return (
    <>
      <div className="subtitle"> Player, {name}</div>
      <div className="quizInfo">
        <p>Category : {questions[currentQuestion].category}</p>
        <p>Difficulty : {questions[currentQuestion].difficulty}</p>
        <p>Score : {score}</p>
      </div>
      <div className="progress-bar">
        <Progress progress={progress} />
      </div>
      <div className="quiz">
        {questions ? (
          <>
            <Questions
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
              questions={questions}
              options={options}
              score={score}
              setScore={setScore}
              setQuizData={setQuizData}
              correct={questions[currentQuestion].correct_answer}
              handleModalOpen={handleOpen}
              handleProgress={handleProgress}
            />
          </>
        ) : (
          <CircularProgress />
        )}
      </div>
      <Modal
        open={modalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Thank you for playing :)
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your score : {score} / 10
            <br />
            {score > 7 ? "Well Done" : ""}
          </Typography>
          <button className="btn-retry" onClick={handleRetry}>
            Retry
          </button>
        </Box>
      </Modal>
    </>
  );
};

export default QuizCard;
