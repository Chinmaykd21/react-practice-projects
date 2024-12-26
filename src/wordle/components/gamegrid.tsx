import { FC } from "react";
import "./gamegrid.css";

export type LetterState = "present" | "absent" | "correct";

export type Letter = {
  value: string;
  state: LetterState;
};

export type WordRow = {
  letters: Letter[];
};

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
    <div className="game-board">
      {rows.map((row, rowIdx) => (
        <div className="word-row" key={rowIdx}>
          {row.letters.map((letter, idx) => {
            const value =
              rowIdx === currentRowIndex && idx < currentGuess.length
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
