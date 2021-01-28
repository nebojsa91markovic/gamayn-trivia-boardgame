import { Button, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";
import Scoreboard from "./Scoreboard";

const NavBar = ({ onOpen }) => {


  return (
    <Flex
      h="7vh"
      bg="primary.800"
      justifyContent={{ base: "center", md: "space-between" }}
      alignItems="center"
    >
      <Link to="/">
        <Heading
          ml="3rem"
          display={{ base: "none", md: "block" }}
          color="primary.200"
          fontFamily="Kalam, cursive"
        >
          Gamayun
        </Heading>
      </Link>
      <Flex alignItems="center" justifyContent="center">
        <Button
          bg="primary.400"
          mr={{ base: "2rem", md: "3rem" }}
          color="primary.100"
        >
          <Scoreboard />
        </Button>
        <Button
          onClick={onOpen}
          bg="primary.400"
          mr={{ base: "0", md: "3rem" }}
          color="primary.100"
        >
          How to play
        </Button>
      </Flex>
    </Flex>
  );
};

export default NavBar;
