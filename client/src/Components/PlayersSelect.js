import React, { useState } from "react";

const PlayerSelect = ({
  setGameStarted,
  gameStarted,
  players,
  setPlayers,
  startGame,
}) => {
  const [currentPlayerSelect, setCurrentPlayerSelect] = useState(1);

  const pawns = ["red", "yellow", "blue", "green"];

  const setPlayer = (pawn) => {
    setPlayers((prevState) => [
      ...prevState,
      { number: currentPlayerSelect, pawn },
    ]);
    setCurrentPlayerSelect((prevState) => prevState + 1);

    players.length === 1 && startGame();
  };

  return (
    <div className="main">
      <div className="nameWrapper">
        <label>Type your name: </label>
        <input type="text" placeholder="anonymous" />
        <button>OK</button>
      </div>
      <h1>Player {currentPlayerSelect}, select a pawn:</h1>
      <div className="playersSelected">
        {players.map(({ number, pawn }) => (
          <div className="selected-wrapper">
            Player {number}
            <img
              className="pawnImg"
              src={`/images/pawns/${pawn}-pawn.png`}
              alt={pawn}
            />
          </div>
        ))}
      </div>
      <div className="pawns-wrapper">
        {gameStarted ? (
          <div className="startingGame-wrapper">
            <h1>
              Click <button onClick={() => startGame}>Start</button> to begin
            </h1>
            <p>
              <h3>
                Go <button>Back</button> to player selection
              </h3>
            </p>
          </div>
        ) : (
          pawns.map((pawn, index) => (
            <img
              key={index}
              className="pawnImg"
              src={`/images/pawns/${pawn}-pawn.png`}
              alt={pawn}
              onClick={() =>
                !players.some((el) => el.pawn === pawn) && setPlayer(pawn)
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PlayerSelect;
