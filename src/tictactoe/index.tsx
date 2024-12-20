import { FC, useState } from "react";
import "./grid.css";

type GridProps = {
  rows: number;
  cols: number;
};

const Grid: FC<GridProps> = ({ rows, cols }) => {
  const [grid, setGrid] = useState<Array<Array<string | null>>>(
    Array.from({ length: rows }, () => Array.from({ length: cols }, () => null))
  );
  const [isPlayer1, setIsPlayer1] = useState<boolean>(true);

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]);
      if (!newGrid[rowIndex][colIndex]) {
        newGrid[rowIndex][colIndex] = isPlayer1 ? "X" : "O";
        setIsPlayer1(!isPlayer1);
      }
      return newGrid;
    });
  };

  const handleResetClick = () => {
    setGrid(
      Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => null)
      )
    );
  };

  return (
    <>
      <h3>{isPlayer1 ? "Player 1" : "Player 2"} turn</h3>
      <div className="game-grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((col, colIndex) => {
              return (
                <div
                  key={colIndex}
                  className="cell"
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {col}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <button onClick={handleResetClick}>Reset</button>
    </>
  );
};

export const TicTacToe = () => {
  return (
    <>
      <Grid rows={3} cols={3} />
    </>
  );
};
