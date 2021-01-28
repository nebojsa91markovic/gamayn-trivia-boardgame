import React from "react";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <Flex
      bg="primary.800"
      w="100vw"
      h="93vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        h="50vh"
        w={{ base: "100vw", md: "30vw" }}
        flexDirection="column"
        alignItems="center"
      >
        <Heading mt="2rem" mb="2rem" color="primary.100" fontSize="80px" fontFamily="Kalam, cursive">
          Gamayun
        </Heading>
        <Text
          fontSize="20px"
          textAlign="center"
          color="primary.100"
          mb={{ base: "2rem", md: "1rem" }}
        >
          Online multiplayer boardgame to play with your friend! Answer to more
          trivia questions than your friend and win!
        </Text>
        <Flex
          h="30%"
          w="100%"
          flexDirection={{ base: "column", md: "row" }}
          justifyContent={{ base: "space-between", md: "space-evenly" }}
          alignItems="center"
        >
          <Link to="/create">
            <Button color="primary.100" bg="primary.400" w="8rem">
              Play
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LandingPage;
