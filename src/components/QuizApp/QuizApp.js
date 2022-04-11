import React, { useEffect, useState } from "react";
import QuizCard from "../QuizCard/QuizCard";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import quiz from "../../api/quiz";
import { getDisplayName } from "@mui/utils";

const QuizApp = ({ isAllowed }) => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState([]);
  const [score, setScore] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const location = useLocation();
  var { name, category, difficulty, categoryCode } = location.state
    ? location.state
    : [undefined, undefined, undefined, undefined];

  useEffect(() => {
    if (!name) {
      navigate("/");
    }

    const fetchquiz = async () => {
      const response = await quiz.get("", {
        params: { amount: 10, category: categoryCode, difficulty: difficulty },
      });
      setQuizData(response.data.results);
      setLoading(false);
    };
    fetchquiz();
  }, []);

  return (
    <div>
      {!isLoading ? (
        <QuizCard
          name={name}
          questions={quizData}
          score={score}
          setQuizData={setQuizData}
          setScore={setScore}
        />
      ) : null}
    </div>
  );
};

export default QuizApp;
