import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useParams, Redirect, useHistory } from "react-router-dom";
import io from "socket.io-client";
import BoardPage from "./BoardPage";
import GetQuestions from "./GetQuestions";
import { ArrowBackIcon } from "@chakra-ui/icons";
import storeQuestions from "../Store/QuestionStore";
import { ADD_TO_SCOREBOARD } from "../Reducer/scoreboardTypes";
import scoreboardStore from "../Store/ScoreboardStore";
const GameRoom = () => {
  const history = useHistory();
  const [gameStarted, setGameStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const roomId = useParams().roomId;

  const myUserName = localStorage.getItem("triviaNickname");
  const [currentPlayer, setCurrentPlayer] = useState("");
  const socket = useRef(null);
  // const ENDPOINT = "http://localhost:5000/";
  const ENDPOINT = "https://gamayun-boardgame-server.herokuapp.com/";
  const pawns = ["red", "yellow", "blue", "green"];

  const [allMessage, setAllMessages] = useState([
    { user: "Admin", msg: "Welcome and have fun!" },
  ]);
  const [usersWhoJoinedRoom, setUsersWhoJoinedRoom] = useState([]);
  // How to play modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Room link copy
  const roomUrlRef = useRef(null);
  const urlCopyToast = useToast();
  const roomIsFullToast = useToast();
  const gameIsFinishedToast = useToast();
  const waitForPlayersToast = useToast();

  const [players, setPlayers] = useState([]);

  const finishGame = (name) => {
    gameIsFinishedToast({
      position: "top",
      title: "Game is finished!",
      description: `${name} has won!`,
      status: name === myUserName ? "success" : "warning",
      duration: 5000,
      isClosable: true,
    });

    players.players.forEach(
      (player) =>
        player.name === myUserName &&
        scoreboardStore.dispatch({
          type: ADD_TO_SCOREBOARD,
          payload: {
            nickname: player.name,
            points: player.score,
            win: name === myUserName ? 1 : 0,
          },
        })
    );
    setTimeout(() => {
      history.push("/");
    }, 2000);
  };

  const checkIsFinished = () => {
    if (players.players === undefined) return;
    players.players.map(
      (player) => player.score > 100 && finishGame(player.name)
    );
  };

  useEffect(() => {
    checkIsFinished();
  }, [players.currentPlayer]);

  useEffect(() => {
    socket.current = io(ENDPOINT);

    if (localStorage.getItem("triviaNickname") !== null) {
      socket.current.on("welcome", () => {
        socket.current.emit(
          "create_game",
          {
            nickname: localStorage.getItem("triviaNickname"),
            room: roomId,
          },
          (callback) => {
            if (callback) {
              if (callback.type === "ERROR") {
                waitForPlayersToast({
                  position: "top",
                  title: "Warning!",
                  description: callback.msg,
                  status: "warning",
                  duration: 5000,
                  isClosable: true,
                });

                // IMPORTANT!!! HISTORY PUSH CHANGE NICKNAME
                history.push("/");
                // !IMPORTANT
              } else if (callback.type === "FULL_ROOM") {
                if (callback.nickname === myUserName) {
                  roomIsFullToast({
                    position: "top",
                    title: "Room is full!",
                    description: callback.msg,
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                  });
                  history.push("/");
                }
              }
            }
          }
        );
      });
    }

    socket.current.on("youCanStart", (users) => {
      let tmp = players;
      users.users.forEach((user, index) => {
        if (index === 0) setCurrentPlayer(user.nickname);
        tmp.push({
          number: index + 1,
          name: user.nickname,
          pawn: pawns[index],
          location: 0,
          score: 0,
        });
      });

      const gameState = {
        currentPlayer: tmp[0].name,
        isHeAnswering: false,
        players: tmp,
        currentQuestion: [],
        answers: [],
        playerAnswer: "",
        question: [],
      };
      setPlayers(gameState);
      setGameStarted(true);
    });

    socket.current.on("usoJeDrugiIgrac", ({ msg, nickname, users }) => {
      setUsersWhoJoinedRoom(users);
    });

    socket.current.on("updatedState", ({ players }) => {
      setPlayers(players);
    });

    socket.current.on("currentPlayerUpdated", ({ newPlayer }) => {
      setCurrentPlayer(newPlayer);
    });

    socket.current.on("newMessageRecived", ({ user, message }) => {
      setAllMessages((prevState) => [...prevState, { user, msg: message }]);
    });

    socket.current.on(
      "respondSingleQA",
      ({ singleQ, prevStatePlayers, answers }) => {
        console.log(singleQ, prevStatePlayers, answers);
        updateState({
          ...prevStatePlayers,
          //currentQuestion: singleQ,
          isHeAnswering: true,
          answers,
        });
        console.log(players);
      }
    );
  }, []);

  const startGame = () => {
    if (usersWhoJoinedRoom.length < 2) {
      waitForPlayersToast({
        position: "top",
        title: "Warning!",
        description: "You need to wait for another player to start a game!",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    socket.current.emit("gameStarting", { message: "mozes da pocnes" });
  };

  const sendQuestions = () => {
    const questions = storeQuestions.getState();
    socket.current.emit("sendQuestionsToServer", {
      questions,
    });
  };

  useEffect(() => {
    isLoading && sendQuestions();
  }, [isLoading]);

  const getSingleQA = (category, diff, players) => {
    socket.current.emit("getSingle", { category, diff, players });
  };

  const updateState = (players) => {
    socket.current.emit("updatePlayersState", {
      players,
    });
  };

  const updateCurrentPlayer = (newPlayer) => {
    const tmp = { ...players, currentPlayer: newPlayer, isHeAnswering: false };
    updateState(tmp);
  };

  const copyRoomUrl = (e) => {
    roomUrlRef.current.select();
    document.execCommand("copy");

    e.target.focus();

    urlCopyToast({
      title: "Link copied!",
      description: "Send the link to your friend.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const changeNickname = () => {
    localStorage.removeItem("triviaNickname");
    history.push("/create");
  };

  const sendMessage = (message) => {
    socket.current.emit("newMessage", {
      message,
    });
  };

  const opponentsQuestion = (question) => {
    socket.current.emit("opponentsQuestion", {
      question,
    });
  };

  return (
    <>
      {myUserName === null ? <Redirect to="/create" /> : null}
      {!gameStarted ? (
        <Box>
          <Flex
            h="85vh"
            w="100vw"
            bg="primary.800"
            justifyContent="center"
            alignItems="center"
          >
            <Flex flexDirection="column" alignItems="center" w="95%">
              <Flex
                alignItems="center"
                cursor="pointer"
                justifyContent="center"
                mr="0.5rem"
                onClick={() => history.push("/")}
              >
                <ArrowBackIcon color="primary.400" />
                <Text color="primary.400" fontSize="20px">
                  BACK
                </Text>
              </Flex>
              <Heading
                color="primary.100"
                mt="1rem"
                mb="2rem"
                fontSize={{ base: "40px", md: "50px" }}
                textAlign="center"
              >
                Invite a friend
              </Heading>
              <Text
                textAlign="center"
                color="primary.100"
                mb="2rem"
                fontSize="25px"
              >
                Send a link to your friend to invite them to your game
              </Text>
              <Flex
                flexDirection={{ base: "column", md: "row" }}
                alignItems="center"
              >
                <InputGroup size="md">
                  <Input
                    mb={{ base: "1.5rem", md: "0" }}
                    pr="6rem"
                    value={`https://gamayun-trivia-boardgame.herokuapp.com/game/${roomId}`}
                    ref={roomUrlRef}
                    color="primary.100"
                    isReadOnly={true}
                  />
                  <InputRightElement>
                    <Button
                      color="primary.100"
                      bg="primary.400"
                      mr="1rem"
                      pr="1.5rem"
                      pl="1.5rem"
                      size="sm"
                      onClick={copyRoomUrl}
                    >
                      Copy
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Flex>
              <Flex
                h="12rem"
                justifyContent="space-evenly"
                alignItems="center"
                flexDirection="column"
                w="100%"
              >
                <Flex
                  flexDirection="column"
                  alignItems="flex-start"
                  w={{ base: "50%", md: "40%" }}
                >
                  {usersWhoJoinedRoom.length === 0 ? (
                    <Flex
                      justifyContent="space-between"
                      alignItems="center"
                      w="100%"
                    >
                      <Text
                        h="1rem"
                        mb="1rem"
                        color="primary.100"
                        textAlign="left"
                        fontSize="20px"
                      >
                        {myUserName}
                      </Text>
                      <CircularProgress
                        color="green.400"
                        value={100}
                        size="30px"
                      />
                    </Flex>
                  ) : (
                      usersWhoJoinedRoom.map((user, index) => (
                        <Flex
                          justifyContent="space-between"
                          alignItems="center"
                          w="100%"
                          key={index}
                        >
                          <Text
                            h="1rem"
                            mb="1rem"
                            color="primary.100"
                            textAlign="left"
                            fontSize="20px"
                          >
                            {user}
                          </Text>
                          <CircularProgress
                            color="green.400"
                            value={100}
                            size="30px"
                          />
                        </Flex>
                      ))
                    )}
                </Flex>
                <Button
                  color="primary.100"
                  bg="primary.400"
                  w="7rem"
                  onClick={startGame}
                >
                  Start Game
                </Button>
              </Flex>
            </Flex>
          </Flex>
          <Flex h="8vh" bg="primary.800">
            <Text
              ml={{ base: "2rem", md: "10rem" }}
              h="20px"
              color="primary.400"
              onClick={changeNickname}
              cursor="pointer"
            >
              Change Nickname
            </Text>
          </Flex>
        </Box>
      ) : !isLoading ? (
        <BoardPage
          players={players}
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          setPlayers={setPlayers}
          updateState={updateState}
          updateCurrentPlayer={updateCurrentPlayer}
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          allMessage={allMessage}
          sendMessage={sendMessage}
          opponentsQuestion={opponentsQuestion}
          getSingleQA={getSingleQA}
          sendQuestions={sendQuestions}
        />
      ) : (
            <GetQuestions setIsLoading={setIsLoading} />
          )}
    </>
  );
};
export default GameRoom;
