import React, { useEffect } from "react";

const Timer = ({ dispatch, secondRemaining }) => {
  const mins = Math.floor(secondRemaining / 60);
  const second = secondRemaining % 60;
  useEffect(() => {
    const id = setInterval(function () {
      dispatch({ type: "trick" });
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [dispatch]);
  return (
    <div className="timer">
      {mins > 10 && "0"}
      {mins}:{second < 10 && "0"}
      {second}{" "}
    </div>
  );
};

export default Timer;
