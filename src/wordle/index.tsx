import { useEffect, useState } from "react";
import "./index.css";

type LetterState = "correct" | "present" | "absent";

type Letter = {
  value: string;
  state: LetterState;
};

type WordRow = {
  letters: Letter[];
};

const RANDOM_WORD = "react";
const MAX_ATTEMPTS = 6;

const validate = (guess: string): WordRow => {
  const targetArr = RANDOM_WORD.toLowerCase().split("");
  const feedback: Letter[] = guess
    .toLowerCase()
    .split("")
    .map((letter, idx) => {
      if (letter === targetArr[idx]) {
        return { value: letter, state: "correct" };
      } else if (targetArr.includes(letter)) {
        return { value: letter, state: "present" };
      } else {
        return { value: letter, state: "absent" };
      }
    });

  return { letters: feedback };
};

export const Wordle = () => {
  const [grid, setGrid] = useState<Array<WordRow>>(
    Array.from({ length: 6 }, () => ({
      letters: Array.from({ length: 5 }, () => ({
        value: "",
        state: "absent",
      })),
    }))
  );
  const [currentRowIndex, setCurrentRowIndex] = useState<number>(0);
  const [guess, setGuess] = useState<string>("");
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      console.log("key pressed", key);
      if (key === "Enter" && guess.length === RANDOM_WORD.length) {
        const newRow = validate(guess);
        setGrid((prevGrid) => {
          const updatedGrid = prevGrid;
          updatedGrid[currentRowIndex] = newRow;
          return updatedGrid;
        });

        if (guess === RANDOM_WORD) {
          setGameOver(true);
        } else if (currentRowIndex + 1 === MAX_ATTEMPTS) {
          setGameOver(true);
        } else {
          setCurrentRowIndex((prev) => prev + 1);
          setGuess("");
        }
      } else if (key === "Backspace") {
        setGuess((prev) => prev.slice(0, -1));
      } else if (/^[a-z]$/i.test(key) && guess.length < RANDOM_WORD.length) {
        console.log("current row has all letters");
        setGuess((prev) => prev + key);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentRowIndex, guess]);

  return (
    <div className="container">
      <h4>{gameOver ? "Game Over" : "Continue"}</h4>
      <div className="grid">
        {grid.map((row, rowIdx) =>
          row.letters.map((letter, idx) => {
            const value =
              rowIdx === currentRowIndex && idx < guess.length
                ? guess[idx]
                : letter.value;
            return (
              <div
                key={`${rowIdx}-${idx}`}
                className={`grid-cell ${letter.state}`}
              >
                {value}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
