import { FC } from "react";
import { WordRow } from "..";
import "./gamegrid.css";

export type GameGridProps = {
  rows: WordRow[];
  currentGuess: string;
  currentRowIndex: number;
};

export const GameGrid: FC<GameGridProps> = ({
  rows,
  currentGuess,
  currentRowIndex,
}) => {
  return (
    <div className="game-grid">
      {rows.map((row, rowIdx) => (
        <div key={`${row.letters.length}-${rowIdx}`} className="word-row">
          {row.letters.map((letter, idx) => {
            const value =
              currentRowIndex === rowIdx && rowIdx < currentGuess.length
                ? currentGuess[idx]
                : letter.value;
            return (
              <span
                key={`${letter}-${idx}`}
                className={`letter ${letter.state}`}
              >
                {value}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};
