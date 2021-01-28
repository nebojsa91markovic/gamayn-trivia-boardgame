import {
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import CorrectAnswer from "../sounds/game_retro_musical_ascend_advance_correct.mp3";
import WrongAnswer from "../sounds/game_sound_basic_digital_retro_incorrect_error_negative.mp3";
import Timer from "./Timer";

const Question = ({
  isOpen,
  onClose,
  question,
  setPlayers,
  players,
  myNickname,
  updateState,
  setIsDiff,
  nextPlayersName,
  singleQA,
  opponentsQuestion,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [correctAnswerEffect] = useSound(CorrectAnswer);
  const [wrongAnswerEffect] = useSound(WrongAnswer);

  const [newQuestion, setNewQuestion] = useState([]);

  const arrOfColors = [
    { color: "secondary.600" },
    { color: "secondary.600" },
    { color: "secondary.600" },
    { color: "secondary.600" },
  ];

  const [backgroundColor, setBackgroundColor] = useState(arrOfColors);

  const checkAnswer = (index) => {
    const playerAnswer = players.answers[index].answer;

    let points = 0;
    switch (question.difficulty) {
      case "easy":
        points = 5;
        break;
      case "medium":
        points = 10;
        break;
      case "hard":
        points = 15;
        break;
      default:
        break;
    }

    setIsDiff(false);

    if (players.answers[index].isTrue) {
      correctAnswerEffect();
      const tmp = players.players.map((player) =>
        player.name === myNickname
          ? { ...player, score: player.score + points }
          : player
      );
      const newTmp = {
        ...players,
        players: tmp,
        isHeAnswering: false,
        currentPlayer: nextPlayersName,
        playerAnswer,
      };
      setPlayers(newTmp);
      updateState(newTmp);
      setTimeout(() => {
        setIsClicked(false);
        setBackgroundColor(arrOfColors);
        onClose();
      }, 3000);
    } else {
      wrongAnswerEffect();

      const tmp = {
        ...players,
        isHeAnswering: false,
        currentPlayer: nextPlayersName,
        playerAnswer,
      };

      updateState(tmp);
      setTimeout(() => {
        setIsClicked(false);
        setBackgroundColor(arrOfColors);
        onClose();
      }, 3000);
    }
  };

  // const sendQuestion = () => {
  //   if (players.currentPlayer === myNickname) {
  //     const tmp = { ...players, currentQuestion: newQuestion };

  //     updateState(tmp);

  //     opponentsQuestion(tmp);
  //   }
  // };

  const getNewQA = () => {
    setNewQuestion(singleQA());
  };

  // useEffect(() => {
  //   if (players.currentPlayer === myNickname) {
  //     sendQuestion();
  //   }
  // }, [newQuestion]);

  useEffect(() => {
    getNewQA();
    setBackgroundColor(arrOfColors);
  }, [isOpen]);

  useEffect(() => {
    setIsClicked(true);
    const indexOfCorrectAnswer = players.answers.findIndex(
      (elem) => elem.isTrue
    );

    const indexOfAnswer = players.answers.findIndex(
      (elem) => elem.answer === players.playerAnswer
    );
    if (indexOfAnswer === indexOfCorrectAnswer) {
      setBackgroundColor((prevState) =>
        prevState.map((elem, i) =>
          i === indexOfAnswer ? { color: "green.400" } : elem
        )
      );
    } else {
      setBackgroundColor((prevState) =>
        prevState.map((elem, i) =>
          i === indexOfAnswer
            ? { color: "red.400" }
            : i === indexOfCorrectAnswer
            ? { color: "green.400" }
            : elem
        )
      );
    }
  }, [players.playerAnswer]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent bg="primary.800">
        <ModalHeader color="primary.400">
          {players.question.category}: {players.question.difficulty}
          <p>{isOpen && <Timer />}</p>
        </ModalHeader>
        <ModalBody>
          <Text
            mb="1rem"
            fontWeight="600"
            color="primary.200"
            fontWeight="bold"
            dangerouslySetInnerHTML={{
              __html: players.question.question,
            }}
          ></Text>
          <Divider />
          {players.answers !== undefined &&
            players.answers.map((answer, index) => (
              <Flex
                key={index}
                bg={!isClicked ? "secondary.600" : backgroundColor[index].color}
                pl="1rem"
                pr="1rem"
                mt="1rem"
                h="50px"
                w="100%"
                fontWeight="bold"
                color="primary.100"
                justifyContent="space-between"
                borderRadius="15px"
                alignItems="center"
                onClick={() =>
                  players.currentPlayer === myNickname ? checkAnswer(index) : ""
                }
              >
                <Text
                  className="questionAnswers"
                  index={index}
                  key={index}
                  dangerouslySetInnerHTML={{ __html: answer.answer }}
                ></Text>
              </Flex>
            ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Question;
