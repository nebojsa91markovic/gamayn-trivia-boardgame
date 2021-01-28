import React, { useState } from "react";
import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

const SetUsername = ({ redirectToRoom }) => {
  const [nickname, setNickname] = useState();
  const history = useHistory();

  const handleNickname = () => {
    localStorage.setItem("triviaNickname", nickname.toLowerCase());
    redirectToRoom();
  };

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      w="100%"
    >
      <Flex
        alignItems="center"
        cursor="pointer"
        justifyContent="center"
        mr="0.5rem"
        mb="1rem"
        onClick={() => history.push("/")}
      >
        <ArrowBackIcon color="primary.400" />
        <Text color="primary.400" fontSize="20px">
          BACK
        </Text>
      </Flex>
      <Heading
        color="primary.100"
        mb="2rem"
        fontSize={{ base: "40px", md: "50px" }}
      >
        Choose a nickname
      </Heading>
      <form onSubmit={handleNickname}>
        <Flex flexDirection="column" alignItems="center">
          <Input
            onChange={(e) => setNickname(e.target.value)}
            mb="2rem"
            color="primary.100"
            maxLength="15"
            variant="outline"
            isRequired={true}
          />
          <Button type="submit" color="primary.100" bg="primary.400" w="5rem">
            Save
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default SetUsername;
