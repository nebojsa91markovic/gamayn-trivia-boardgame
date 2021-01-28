import { Box, Flex, Grid, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import BoardSpace from "./BoardSpace";
import ReactDice from "react-dice-complete";
import "react-dice-complete/dist/react-dice-complete.css";
import Quiz from "./Quiz";
import * as Categories from "../Reducer/actionsTypes";
import useSound from "use-sound";
import dicesEffect from "../sounds/dice_throw_on_game_board.mp3";
import slideEffect from "../sounds/piece-slide.mp3";
import GameMessage from "./GameMessage";

const GameBoard = ({
  players,
  setPlayers,
  updateState,
  myNickname,
  nextPlayersName,
  opponentsQuestion,
  onOpen,
  isOpen,
  onClose,
  getSingleQA,
}) => {
  const [squares, setSquares] = useState([]);
  const [isDiff, setIsDiff] = useState(false);
  const [diff, setDiff] = useState("easy");
  const [category, setCategory] = useState(Categories.ADD_GENERALKNOWLEDGE);
  const [isMyTurn, setIsMyTurn] = useState(false);

  //sound effects
  const [dicesOnBoardEffect] = useSound(dicesEffect);
  const [pawnSlideEffect] = useSound(slideEffect);

  const gridSize = 9;
  const background = [
    "yellow.400",
    "green.600",
    "red.500",
    "orange.400",
    "blue.500",
    "teal.200",
    "purple.500",
    "red.200",
  ];

  useEffect(() => {
    setSquares(createSquares());
  }, []);

  const createSquares = () => {
    const squares = [
      {
        row: 1,
        col: 1,
        type: background[0],
      },
    ];

    let i = 1;
    let j = 1;
    let row = 1;
    let col = 2;
    const totalSquares = gridSize * 2 + (gridSize - 2) * 2;

    while (squares.length < totalSquares) {
      const square = {
        row,
        col,
      };

      if (j === 8) {
        j = 0;
      }
      square.type = background[j];

      squares.push(square);
      i++;
      j++;

      if (i < gridSize) {
        col++;
      } else if (i < 2 * gridSize - 1) {
        row++;
      } else if (i < 3 * gridSize - 2) {
        col--;
      } else {
        row--;
      }
    }
    return squares;
  };

  let playerLocations = [];

  if (squares.length > 0) {
    playerLocations = players.players.map(
      (player) => squares[player.location % squares.length]
    );
  }

  const setPlayersCategory = (player) => {
    const parentCard = document
      .querySelectorAll(".cards")
      [player.location % squares.length].getAttribute("category");
    setCategory(parentCard);
  };

  const movePlayer = (number) => {
    players.players.map((player) => {
      if (player.name === myNickname) {
        player.location += number;
        pawnSlideEffect();
        setPlayersCategory(player);
      }
    });
    updateState(players);
  };

  const rollDoneCallback = (num) => {
    dicesOnBoardEffect();
    if (!isDiff) {
      movePlayer(num);
      setIsDiff(true);
    } else {
      let difficulty = "easy";
      switch (num) {
        case 1:
        case 2:
          difficulty = "easy";
          break;
        case 3:
        case 4:
          difficulty = "medium";
          break;
        case 5:
        case 6:
          difficulty = "hard";
          break;
        default:
          difficulty = "easy";
          break;
      }

      setIsDiff(false);
      getSingleQA(category, difficulty, players);

      const tmp = { ...players, isHeAnswering: true };
      updateState(tmp);
    }
  };

  useEffect(() => {
    players.currentPlayer === myNickname
      ? setIsMyTurn(true)
      : setIsMyTurn(false);
  }, [players.currentPlayer]);

  return (
    <Flex
      bgGradient="linear(to-b, primary.200, gray.500)"
      border="2px solid gray"
      h={{ base: "100%", md: "100%" }}
      w={{ base: "100%", md: "70%" }}
      justifyContent="center"
      alignItems="center"
      boxShadow="inset 0 0 4px black"
    >
      <Grid
        rowGap="0"
        columnGap="0"
        w={{ base: "360px", md: "630px" }}
        h={{ base: "360px", md: "630px" }}
        // boxShadow="0px 0px 5px 0.2px gray"
      >
        {squares.map((square, index) => (
          <BoardSpace square={square} index={index} key={index} />
        ))}
        {playerLocations.map((location, index) => {
          const player = players.players[index];
          return (
            <Box
              key={player.number}
              playername={player.name}
              gridRow={location.row}
              gridColumn={location.col}
              h={{ base: "25px", md: "46px" }}
              w={{ base: "25px", md: "46px" }}
              transition="all 1s"
              ml={{ base: index, md: index === 0 ? index : index * 2 }}
              mt="0.5rem"
            >
              <Image
                w="100%"
                h="100%"
                src={`/images/pawns/${player.pawn}-pawn.png`}
                alt={player.number}
              />
            </Box>
          );
        })}
        <Box
          pt="1.5rem"
          w={{ base: "40px", md: "70px" }}
          h={{ base: "40px", md: "70px" }}
          gridRow="5"
          gridColumn="5"
        >
          {isMyTurn && (
            <ReactDice
              numDice={1}
              rollDone={rollDoneCallback}
              defaultRoll
              rollTime={1}
              faceColor="#C53030"
              dotColor="#FFFFFF"
              outline={false}
            />
          )}
        </Box>
        <GameMessage currentPlayer={players.currentPlayer} />
      </Grid>
      <Quiz
        category={category}
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        setPlayers={setPlayers}
        players={players}
        myNickname={myNickname}
        updateState={updateState}
        setIsDiff={setIsDiff}
        nextPlayersName={nextPlayersName}
        opponentsQuestion={opponentsQuestion}
      />
    </Flex>
  );
};

export default GameBoard;
