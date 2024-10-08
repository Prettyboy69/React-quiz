import React from "react";

const FinishingTest = ({ points, maxPossiblePoints, highscore, dispatch }) => {
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉🥂";
  if (percentage >= 50 && percentage < 80) emoji = "😊";
  if (percentage >= 30 && percentage < 50) emoji = "🤦‍♂️🤦‍♀️";
  if (percentage >= 0 && percentage < 30) emoji = "😭";
  return (
    <>
      <p className="result">
        <span>{emoji}</span> you scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(highscored: {highscore} points )</p>

      <button
        className="btn btn ui"
        onClick={() => dispatch({ type: "RestartQuize" })}
      >
        RestartQuize
      </button>
    </>
  );
};

export default FinishingTest;
