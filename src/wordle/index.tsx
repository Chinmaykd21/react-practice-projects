import { useEffect, useState } from "react";
import "./index.css";

type LetterState = "present" | "absent" | "correct";

type Letter = {
  state: LetterState;
  value: string;
};

type WordRow = {
  letters: Letter[];
};

const TARGET = "react";
const MAX_ATTEMPTS = 6;

const validate = (guess: string): WordRow => {
  const targetArray = TARGET.split("");
  const feedback: Letter[] = guess
    .toLowerCase()
    .split("")
    .map((letter, idx) => {
      if (letter === targetArray[idx]) {
        return { state: "correct", value: letter };
      } else if (targetArray.includes(letter)) {
        return { state: "present", value: letter };
      } else {
        return { state: "absent", value: letter };
      }
    });
  return { letters: feedback };
};

export const Wordle = () => {
  const [grid, setGrid] = useState<WordRow[]>(() =>
    Array.from({ length: 6 }, () => ({
      letters: Array.from({ length: 5 }, () => ({
        state: "absent",
        value: "",
      })),
    }))
  );
  const [guess, setGuess] = useState<string>("");
  const [currentRowIndex, setCurrentRowIndex] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      console.log("guess", guess);
      if (guess.length === TARGET.length && key === "Enter") {
        const newRow = validate(guess);
        setGrid((prevGrid) => {
          const updatedGrid = [...prevGrid];
          updatedGrid[currentRowIndex] = newRow;
          return updatedGrid;
        });

        if (guess === TARGET) {
          setGameOver(true);
        } else if (currentRowIndex + 1 === MAX_ATTEMPTS) {
          setGameOver(true);
        } else {
          setCurrentRowIndex((prev) => prev + 1);
          setGuess("");
        }
      } else if (key === "Backspace") {
        setGuess((prev) => prev.slice(0, -1));
      } else if (/^[a-zA-Z0-9]$/i.test(key) && guess.length < TARGET.length) {
        setGuess((prev) => prev + key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentRowIndex, grid, guess]);

  return (
    <div className="wordle-container">
      <h4>
        Game Status:{" "}
        {gameOver
          ? guess === TARGET
            ? "Game Over: You correctly guessed the word"
            : `Game Over: correct word was ${TARGET}`
          : "In Progress"}
      </h4>
      <div className="grid">
        {grid.map((row, rowIdx) =>
          row.letters.map((letter, idx) => {
            const value =
              currentRowIndex === rowIdx && idx < guess.length
                ? guess[idx]
                : letter.value;

            return (
              <div
                key={`${letter}-${idx}-${rowIdx}`}
                className={`${letter.state} grid-cell ${
                  currentRowIndex === rowIdx ? "current-row" : ""
                }`}
              >
                <span className={`letter-state`}>{value}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
