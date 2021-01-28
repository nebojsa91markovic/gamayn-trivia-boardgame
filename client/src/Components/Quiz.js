import React, { useEffect } from "react";
import store from "../Store/QuestionStore";
import Question from "./Question";

const Quiz = ({
  category,
  isOpen,
  onOpen,
  onClose,
  setPlayers,
  players,
  myNickname,
  updateState,
  setIsDiff,
  nextPlayersName,
  opponentsQuestion,
}) => {
  const getQuestionFor = (type) => {
    const allQA = store.getState().filter((elem) => elem.type === type)[0].qa;
    return allQA;
  };

  const singleQA = () => {
    const arr = getQuestionFor(category);

    return arr[Math.floor(Math.random() * arr.length)];
  };

  useEffect(() => {
    if (players.isHeAnswering)
      setTimeout(() => {
        onOpen();
      }, 1000);
    else
      setTimeout(() => {
        onClose();
      }, 1000);
  }, [players.isHeAnswering]);

  return (
    <Question
      isOpen={isOpen}
      onClose={onClose}
      question={singleQA()}
      singleQA={singleQA}
      setPlayers={setPlayers}
      players={players}
      myNickname={myNickname}
      updateState={updateState}
      setIsDiff={setIsDiff}
      nextPlayersName={nextPlayersName}
      opponentsQuestion={opponentsQuestion}
    />
  );
};

export default Quiz;
