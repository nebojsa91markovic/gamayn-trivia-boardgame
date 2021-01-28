import { Box, Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import GameBoard from "./GameBoard";
import PlayerInfo from "./PlayerInfo";
import Chat from "./Chat";

const BoardPage = ({
  players,
  setPlayers,
  updateState,
  isOpen,
  onClose,
  onOpen,
  allMessage,
  sendMessage,
  opponentsQuestion,
  getSingleQA,
  sendQuestions,
}) => {
  const myNickname = localStorage.getItem("triviaNickname").toLowerCase();

  // Player info
  const [myInfo, setMyInfo] = useState([]);

  const [nextPlayersName, setNextPlayersName] = useState("");
  const [opponentsInfo, setOpponentsInfo] = useState([]);

  // Alert on tab close

  const alertClose = () => {
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      return (ev.returnValue =
        "Are you sure you want to close? You will lose the game!");
    });
  };

  useEffect(() => {
    if (players.currentPlayer === myNickname) {
      sendQuestions();
    }
  }, []);

  useEffect(() => {
    players.players.map(
      (player) => player.name === myNickname && setMyInfo(player)
    );

    const allOpponents = players.players.filter(
      (player) => player.name !== myNickname
    );
    setOpponentsInfo(allOpponents);
  }, [players]);

  useEffect(() => {
    const index = players.players.findIndex(
      (player) => player.name === myNickname
    );
    const nextPlayer =
      index + 1 === players.players.length
        ? players.players[0].name
        : players.players[index + 1].name;
    setNextPlayersName(nextPlayer);
  }, []);

  return (
    <>
      {alertClose()}
      <Box>
        <Flex w="100vw" h="93vh" flexDirection={{ base: "column", md: "row" }}>
          <Flex w={{ base: "100%", md: "15%" }}>
            <PlayerInfo info={myInfo} />
          </Flex>
          <GameBoard
            players={players}
            setPlayers={setPlayers}
            updateState={updateState}
            myNickname={myNickname}
            onOpen={onOpen}
            isOpen={isOpen}
            onClose={onClose}
            nextPlayersName={nextPlayersName}
            opponentsQuestion={opponentsQuestion}
            getSingleQA={getSingleQA}
          />
          <Flex flexDirection="column" w={{ base: "100%", md: "20%" }}>
            {opponentsInfo.map((opponent, index) => (
              <PlayerInfo info={opponent} key={index} />
            ))}
          </Flex>
          <Chat allMessage={allMessage} sendMessage={sendMessage} />
        </Flex>
      </Box>
    </>
  );
};

export default BoardPage;
