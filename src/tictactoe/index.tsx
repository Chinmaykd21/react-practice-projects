import { FC, memo, useState } from "react";
import "./index.css";

type TicTacToeProps = {
  rows?: number;
  cols?: number;
};

const validate = (grid: Array<Array<string | null>>) => {
  const flattenedGrid = grid.flat();

  const possibleOutComes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of possibleOutComes) {
    if (
      flattenedGrid[a] &&
      flattenedGrid[a] === flattenedGrid[b] &&
      flattenedGrid[a] === flattenedGrid[c]
    ) {
      return flattenedGrid[a];
    }
  }
  return null;
};

const isGameTied = (grid: Array<Array<string | null>>) => {
  return grid.flat().every((cell) => cell !== null);
};

const GridCell = memo(
  ({
    value,
    onClick,
    className,
    isGameOver,
  }: {
    value: string | null;
    onClick: () => void;
    className?: string;
    isGameOver?: boolean;
  }) => {
    return (
      <button
        onClick={onClick}
        className={className}
        disabled={value ? true : isGameOver}
      >
        {value}
      </button>
    );
  }
);

export const TicTacToe: FC<TicTacToeProps> = ({ rows = 3, cols = 3 }) => {
  const [grid, setGrid] = useState<Array<Array<string | null>>>(
    Array.from({ length: rows }, () => Array.from({ length: cols }, () => null))
  );

  const [isPlayer1, setIsPlayer1] = useState<boolean>(true);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const handleClick = (rowIdx: number, colIdx: number) => {
    if (isGameOver || grid[rowIdx][colIdx]) return;

    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[rowIdx] = [...newGrid[rowIdx]];
      newGrid[rowIdx][colIdx] = isPlayer1 ? "X" : "O";

      // Validate the new grid
      const gameStatus = validate(newGrid);
      if (gameStatus) {
        setIsGameOver(true);
        return newGrid;
      }

      // Check for a tie
      if (isGameTied(newGrid)) {
        setIsGameOver(true);
      }

      setIsPlayer1(!isPlayer1); // Switch player
      return newGrid;
    });
  };

  return (
    <div className="container">
      <h4>{isGameOver ? "Game Over" : "Continue"}</h4>
      <h4>{isPlayer1 ? "Player 1 (X)" : "Player 2 (O)"}</h4>
      <div className="game-grid">
        {grid.map((row, rowIdx) =>
          row.map((col, colIdx) => (
            <div key={`${rowIdx}-${colIdx}`}>
              <GridCell
                value={col}
                onClick={() => handleClick(rowIdx, colIdx)}
                className="grid-cell"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
