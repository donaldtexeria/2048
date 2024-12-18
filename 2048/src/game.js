import "./Game.css";
import { initializeGrid, moveTiles, mergeTiles } from "./utils/gameLogic";
import React, { useState, useEffect } from "react";
function Game() {
  const [grid, setGrid] = useState(initializeGrid());

  const handleMove = (direction) => {
    const newGrid = moveTiles(grid, direction);
    setGrid(newGrid);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case "ArrowUp":
          handleMove("up");
          break;
        case "ArrowRight":
          handleMove("right");
          break;
        case "ArrowLeft":
          handleMove("left");
          break;
        case "ArrowDown":
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
      <div className="box">
        {grid.map((rowTiles, rowIndex) => (
          <Row key={rowIndex} tiles={rowTiles} />
        ))}
      </div>
    </div>
  );
}

export default Game;
