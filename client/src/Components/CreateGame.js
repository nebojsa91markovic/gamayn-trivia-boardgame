import React from "react";
import SetUsername from "./SetUsername";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Box, Flex } from "@chakra-ui/react";
const CreateGame = () => {
  const history = useHistory();
  const roomId = uuidv4();

  const isNicknameSet = () => {
    if (localStorage.getItem("triviaNickname") === null) {
      return false;
    } else return true;
  };

  const redirectToRoom = () => {
    history.push(`/game/${roomId}`);
  };

  return (
    <Box>
      <Flex
        h="93vh"
        w="100vw"
        bg="primary.800"
        justifyContent="center"
        alignItems="center"
      >
        {!isNicknameSet() ? (
          <SetUsername redirectToRoom={redirectToRoom} />
        ) : (
          redirectToRoom()
        )}
      </Flex>
    </Box>
  );
};

export default CreateGame;
