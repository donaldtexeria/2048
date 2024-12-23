import "./Game.css";
import { initializeGrid, moveTiles, mergeTiles } from "./utils/gameLogic";
import React, { useState, useEffect } from "react";
function Game() {
  const [grid, setGrid] = useState(initializeGrid());
  const [score, setScore] = useState(0);

  const handleMove = (direction) => {
    console.log("move triggered");
    const res = moveTiles(grid, direction, score);
    setGrid(res.newGrid);
    setScore(res.s);
  };

  const handleNewGame = () => {
    setGrid(initializeGrid());
    setScore(0);
  };

  const getTileStyle = (value) => {
    const tileColors = {
      0: "#cdc1b4",
      2: "#eee4da",
      4: "#ede0c8",
      8: "#f2b179",
      16: "#f59563",
      32: "#f67c5f",
      64: "#f65e3b",
      128: "#edcf72",
      256: "#edcc61",
      512: "#edc850",
      1024: "#edc53f",
      2048: "#edc22e",
    };

    return {
      backgroundColor: tileColors[value] || "#3c3a32",
      color: value > 4 ? "#f9f6f2" : "#776e65",
      fontWeight: "bold",
    };
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case "ArrowUp":
          handleMove("up");
          break;
        case "w":
          handleMove("up");
          break;
        case "ArrowRight":
          handleMove("right");
          break;
        case "d":
          handleMove("right");
          break;
        case "ArrowLeft":
          handleMove("left");
          break;
        case "a":
          handleMove("left");
          break;
        case "ArrowDown":
          handleMove("down");
          break;
        case "s":
          handleMove("down");
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [grid]);

  return (
    <div className="container">
      <div className="head-row">
        <h1 className="title">2048</h1>
        <div className="score">
          Score <br /> {score}
        </div>
      </div>
      <div className="info-row">
        <p style={{ textAlign: "left" }}>
          <span>Play 2048 Game Online</span> <br />
          Join the numbers and get to the <span>2048 Tile!</span>
        </p>

        <button onClick={handleNewGame}>New Game</button>
      </div>
      <div className="box">
        {grid.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((tile, colIndex) => (
              <div className="tile" key={colIndex} style={getTileStyle(tile)}>
                {tile === 0 ? "" : tile}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Game;
