import React from "react";

const Ready = ({ numQuestions, dispatch }) => {
  return (
    <div className="start">
      <h2>Welcome to React quize</h2>
      <h3>{numQuestions} questions to test your mastery </h3>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "start" });
        }}
      >
        let start
      </button>
    </div>
  );
};

export default Ready;
