import React, { useEffect, useReducer } from "react";
import Header from "./Component/Header";
import Main from "./Component/Main";
import Loader from "./Component/Loader";
import Error from "./Component/Error";
import Ready from "./Component/Ready";
import Question from "./Component/Question";
import NextButton from "./Component/NextButton";
import Progress from "./Component/Progress";
import FinishingTest from "./Component/FinishingTest";
import Timer from "./Component/Timer";
import Footer from "./Component/Footer";

// import DataCounter from "./Component/DataCounter";
const SEC_PER_QUESTION = 10;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondRemaining: 10,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "datafailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * SEC_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + 10
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "RestartQuize":
      return {
        ...initialState,
        questions: state.questions,
        answer: null,
        status: "ready",
      };
    // return {
    //   ...state,
    //   points: 0,
    //   answer: null,
    //   index: 0,
    //   highscore: 0,
    //   status: "ready",
    // };
    case "trick":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action UNKNOW");
  }
}

const App = () => {
  // useEffect(function () {
  //   async function fetchQuestion =() => {
  //     const res = await fetch("http://localhost:9000/questions")
  //     const data = await res.json();

  //   }
  //   fetchQuestion()

  // })
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondRemaining,
  } = state;
  const numQuestions = questions.length;
  // const numQuestion = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "datafailed" }));
  }, []);
  return (
    <div className="app">
      {/* <DataCounter /> */}
      <Header />
      <Main className="main">
        {state.status === "loading" && <Loader />}
        {state.status === "error" && <Error />}
        {state.status === "ready" && (
          <Ready numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {state.status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              index={index}
              maxPossiblePoints={maxPossiblePoints}
              points={points}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondRemaining={secondRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishingTest
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
