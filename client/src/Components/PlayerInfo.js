import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

const PlayerInfo = ({ info }) => {
  return (
    <Flex
      h={{ base: "100%", md: "100%" }}
      w={{ base: "100%", md: "100%" }}
      bg="primary.800"
      justifyContent="center"
    >
      <Flex
        flexDirection={{ base: "row", md: "column" }}
        w={{ base: "50%", md: "100%" }}
        justifyContent={{ base: "space-between", md: "space-evenly" }}
        alignItems="center"
      >
        <Flex flexDirection={{ base: "row", md: "column" }} alignItems="center">
          <Image
            src={`/images/pawns/${info.pawn}-pawn.png`}
            alt={info.pawn}
            mr={{ base: "1rem", md: "0" }}
            mb={{ base: "0", md: "1rem" }}
            boxSize={{ base: "25px", md: "70px" }}
          />
          <Text color="primary.100" fontSize="30px" casing="capitalize">
            {info.name}
          </Text>
        </Flex>
        <Heading
          ml={{ base: "2rem", md: "0" }}
          textAlign="right"
          color="primary.300"
        >
          {info.score}
        </Heading>
      </Flex>
    </Flex>
  );
};

export default PlayerInfo;
