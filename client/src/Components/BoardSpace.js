import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import * as Categories from "../Reducer/actionsTypes";

const BoardSpace = ({ square, index }) => {
  const squareType = (color) => {
    switch (color) {
      case "yellow.400":
        return Categories.ADD_GENERALKNOWLEDGE;

      case "green.600":
        return Categories.ADD_SPORTS;

      case "red.500":
        return Categories.ADD_HISTORY;

      case "orange.400":
        return Categories.ADD_GEOGRAPHY;

      case "blue.500":
        return Categories.ADD_ANIMALS;

      case "teal.200":
        return Categories.ADD_FILM;

      case "purple.500":
        return Categories.ADD_MUSIC;

      case "red.200":
        return Categories.ADD_BOOK;

      default:
        return Categories.ADD_GENERALKNOWLEDGE;
    }
  };

  const topBorder = () => {
    if (
      square.row === 1 ||
      (square.row === 9 && square.col !== 1 && square.col !== 9)
    )
      return true;
    else return false;
  };

  const rightBorder = () => {
    if (
      (square.col === 1 && square.row !== 1 && square.row !== 9) ||
      square.col === 9
    )
      return true;
    else return false;
  };

  return (
    <Flex
      w={{ base: "40px", md: "70px" }}
      h={{ base: "40px", md: "70px" }}
      justifyContent="center"
      alignItems="center"
      gridRow={square.row}
      gridColumn={square.col}
      bg={square.type}
      key={index}
      className="cards"
      category={squareType(square.type)}
      borderBottom="2px solid black"
      borderLeft="2px solid black"
      borderRight={rightBorder() ? "2px solid black" : null}
      borderTop={topBorder() ? "2px solid black" : null}
      borderRadius="5px"
    >
      <Image
        w="70%"
        h="70%"
        src={`/images/cards/${squareType(square.type)}.png`}
      />
    </Flex>
  );
};

export default BoardSpace;
