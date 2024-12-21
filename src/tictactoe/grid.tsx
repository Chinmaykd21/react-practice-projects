import { FC, useState } from "react";
import "./grid.css";

export type GridProps = {
  rows: number;
  cols: number;
};

export const Grid: FC<Readonly<GridProps>> = ({ rows, cols }) => {
  const [grid, setGrid] = useState<Array<Array<string | null>>>(
    Array.from({ length: rows }, () => Array.from({ length: cols }, () => null))
  );

  const [isPlayer1, setIsPlayer1] = useState<boolean>(true);
  const [winner, setWinner] = useState<boolean>(false);
  const [isTie, setIsTie] = useState<boolean>(false);

  const isGameTied = (gameGrid: Array<Array<string | null>>) => {
    return gameGrid.flat().every((gridCell) => gridCell !== null);
  };

  const gameState = (gameGrid: Array<Array<string | null>>) => {
    const flattenedGameGrid = gameGrid.flat();

    const possibleCells = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    for (const [a, b, c] of possibleCells) {
      if (
        flattenedGameGrid[a] &&
        flattenedGameGrid[a] === flattenedGameGrid[b] &&
        flattenedGameGrid[a] === flattenedGameGrid[c]
      ) {
        return flattenedGameGrid[a];
      }
    }

    return null;
  };

  const handleButtonClick = (rowIndex: number, colIndex: number) => {
    if (!grid[rowIndex][colIndex] && !winner) {
      const newGrid = [...grid];
      newGrid[rowIndex] = [...newGrid[rowIndex]];
      newGrid[rowIndex][colIndex] = isPlayer1 ? "X" : "O";
      const possibleWinner = gameState(newGrid);
      setGrid(newGrid);
      if (possibleWinner) {
        setWinner(true);
      } else if (isGameTied(newGrid)) {
        setIsTie(true);
      } else {
        setIsPlayer1(!isPlayer1);
      }
    }
  };

  const resetGame = () => {
    setGrid(
      Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => null)
      )
    );
    setIsPlayer1(true);
    setWinner(false);
    setIsTie(false);
  };

  return (
    <div className="grid-container">
      <h3>Turn: {isPlayer1 ? "Player 1" : "Player 2"}</h3>
      {winner ? (
        <h4 className="grid-game-status">
          {isPlayer1 ? "Player 1" : "Player 2"} won
        </h4>
      ) : isTie ? (
        <h4 className="grid-game-status">Game Tied</h4>
      ) : (
        <div className="grid">
          {grid.map((row, rowIndex) =>
            row.map((col, colIndex) => (
              <button
                onClick={() => handleButtonClick(rowIndex, colIndex)}
                key={`${rowIndex}-${colIndex}`}
                className="grid-cell"
                disabled={grid[rowIndex][colIndex] ? true : false}
              >
                {col}
              </button>
            ))
          )}
        </div>
      )}
      <button className="grid-reset" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};
